import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { glob } from 'glob';

// Local types for generating local YAML files
interface Task {
  id: string;
  name: string;
  category?: string;
  tags?: string[];
}

interface Metric {
  id: string;
  name: string;
  direction: 'higher_is_better' | 'lower_is_better';
}

interface ModelInfo {
  id: string;
  name: string;
  namespace: string;
  reference_links?: Array<{
    name: string;
    url: string;
  }>;
}

interface GenerateOptions {
  file?: string;
  folder?: string;
}

interface LMEvalReport {
  results: Record<string, any>;
  configs: Record<string, {
    task: string;
    tag: string[];
    metric_list: Array<{
      metric: string;
      higher_is_better: boolean;
    }>;
  }>;
}

async function processReport(reportPath: string): Promise<{ tasks: Task[], metrics: Metric[] }> {
  const reportContent = fs.readFileSync(reportPath, 'utf-8');
  const report: LMEvalReport = JSON.parse(reportContent);
  
  const tasks: Task[] = [];
  const metrics: Metric[] = [];
  const seenMetrics = new Set<string>();
  
  // Extract tasks and metrics from configs
  for (const [taskId, config] of Object.entries(report.configs)) {
    // Create task
    const task: Task = {
      id: taskId,
      name: config.task,
      tags: config.tag
    };
    
    // Extract metrics from metric_list
    for (const metricConfig of config.metric_list) {
      const metricId = metricConfig.metric;
      
      // Add metric if not seen before
      if (!seenMetrics.has(metricId)) {
        const metric: Metric = {
          id: metricId,
          name: metricId,
          direction: metricConfig.higher_is_better ? 'higher_is_better' : 'lower_is_better'
        };
        metrics.push(metric);
        seenMetrics.add(metricId);
      }
    }
    
    tasks.push(task);
  }
  
  return { tasks, metrics };
}

function loadExistingTask(taskId: string, tasksDir: string): Task | null {
  const taskFile = path.join(tasksDir, `${taskId}.yaml`);
  if (fs.existsSync(taskFile)) {
    try {
      const content = fs.readFileSync(taskFile, 'utf-8');
      return yaml.load(content) as Task;
    } catch (error) {
      console.warn(`⚠️  Could not parse existing task file: ${taskFile}`);
      return null;
    }
  }
  return null;
}

function loadExistingMetric(metricId: string, metricsDir: string): Metric | null {
  const metricFile = path.join(metricsDir, `${metricId}.yaml`);
  if (fs.existsSync(metricFile)) {
    try {
      const content = fs.readFileSync(metricFile, 'utf-8');
      return yaml.load(content) as Metric;
    } catch (error) {
      console.warn(`⚠️  Could not parse existing metric file: ${metricFile}`);
      return null;
    }
  }
  return null;
}

function extractReportInfo(reportPath: string): { namespace: string; modelName: string; reportName: string } | null {
  // Extract namespace, model name, and report name from path like:
  // reports/namespace/model-name/lm-eval/arbitrary-report-name.json
  const relativePath = path.relative(process.cwd(), reportPath);
  const pathParts = relativePath.split(path.sep);
  
  // Look for the pattern: reports/namespace/model-name/lm-eval/*.json
  const reportsIndex = pathParts.indexOf('reports');
  if (reportsIndex === -1 || reportsIndex + 3 >= pathParts.length) {
    return null;
  }
  
  const namespace = pathParts[reportsIndex + 1];
  const modelName = pathParts[reportsIndex + 2];
  
  // Verify the structure is correct
  if (pathParts[reportsIndex + 3] !== 'lm-eval') {
    return null;
  }
  
  // Get the report filename (without extension)
  const reportFileName = pathParts[pathParts.length - 1];
  const reportName = path.basename(reportFileName, '.json');
  
  return { namespace, modelName, reportName };
}

async function generateModelInfo(namespace: string, modelName: string): Promise<ModelInfo> {
  // Create a model ID by combining namespace and model name
  const id = `${namespace}/${modelName}`;

  const modelInfo: ModelInfo = {
    id,
    name: modelName,
    namespace
  };

  // Add reference link to Hugging Face
  modelInfo.reference_links = [
    {
      name: 'Hugging Face',
      url: `https://huggingface.co/${id}`
    }
  ];

  return modelInfo;
}

function loadExistingModelInfo(namespace: string, modelName: string, modelsDir: string): ModelInfo | null {
  const modelFile = path.join(modelsDir, namespace, `${modelName}.yaml`);
  if (fs.existsSync(modelFile)) {
    try {
      const content = fs.readFileSync(modelFile, 'utf-8');
      return yaml.load(content) as ModelInfo;
    } catch (error) {
      console.warn(`⚠️  Could not parse existing model file: ${modelFile}`);
      return null;
    }
  }
  return null;
}

interface HuggingFaceModelInfo {
  id: string;
  description?: string;
  tags?: string[];
  author?: string;
  lastModified?: string;
}

export async function generateCommand(options: GenerateOptions): Promise<void> {
  try {
    console.log('🔧 Generating tasks and metrics from lm-eval report(s)...');
    
    let reportPaths: string[] = [];
    
    if (options.file) {
      // Single file
      const reportPath = path.resolve(options.file);
      if (!fs.existsSync(reportPath)) {
        console.error(`❌ Report file not found: ${reportPath}`);
        process.exit(1);
      }
      reportPaths = [reportPath];
    } else if (options.folder) {
      const folderPath = path.resolve(options.folder);
      if (!fs.existsSync(folderPath)) {
        console.error(`❌ Folder not found: ${folderPath}`);
        process.exit(1);
      }
      
      const pattern = path.join(folderPath, '**/lm-eval/*.json');
      const files = await glob(pattern, { nodir: true });
      
      if (files.length === 0) {
        console.error(`❌ No JSON files found in lm-eval folders: ${folderPath}`);
        console.error(`   Expected structure: reports/namespace/model-name/lm-eval/*.json`);
        process.exit(1);
      }
      
      reportPaths = files;
      console.log(`📁 Found ${files.length} JSON files in lm-eval folders`);
    } else {
      console.error('❌ Either --file or --folder option is required');
      process.exit(1);
    }
    
    const allTasks: Task[] = [];
    const allMetrics: Metric[] = [];
    const allModels: ModelInfo[] = [];
    const seenMetrics = new Set<string>();
    const seenTasks = new Set<string>();
    const seenModels = new Set<string>();
    
    // Process each report file
    for (const reportPath of reportPaths) {
      const reportInfo = extractReportInfo(reportPath);
      const relativePath = path.relative(process.cwd(), reportPath);
      
      if (reportInfo) {
        console.log(`\n📄 Processing: ${reportInfo.namespace}/${reportInfo.modelName}/${reportInfo.reportName} (${relativePath})`);
      } else {
        console.log(`\n📄 Processing: ${relativePath}`);
      }
      
      try {
        const { tasks, metrics } = await processReport(reportPath);
        
        // Merge tasks and metrics, avoiding duplicates
        for (const task of tasks) {
          if (!seenTasks.has(task.id)) {
            allTasks.push(task);
            seenTasks.add(task.id);
          }
        }
        
        for (const metric of metrics) {
          if (!seenMetrics.has(metric.id)) {
            allMetrics.push(metric);
            seenMetrics.add(metric.id);
          }
        }
        
        // Collect model info if we have report info
        if (reportInfo) {
          const modelId = `${reportInfo.namespace}/${reportInfo.modelName}`;
          if (!seenModels.has(modelId)) {
            const modelInfo = await generateModelInfo(reportInfo.namespace, reportInfo.modelName);
            allModels.push(modelInfo);
            seenModels.add(modelId);
          }
        }
        
        if (reportInfo) {
          console.log(`✅ Processed: ${tasks.length} tasks, ${metrics.length} metrics from ${reportInfo.namespace}/${reportInfo.modelName}/${reportInfo.reportName}`);
        } else {
          console.log(`✅ Processed: ${tasks.length} tasks, ${metrics.length} metrics`);
        }
      } catch (error) {
        console.error(`⚠️  Error processing ${reportPath}:`, error);
        // Continue with other files
      }
    }
    
    // Write tasks to config directory
    const configDir = path.resolve(__dirname, '../../../config');
    const tasksDir = path.join(configDir, 'tasks');
    const metricsDir = path.join(configDir, 'metrics');
    const modelsDir = path.join(configDir, 'models');
    
    // Ensure directories exist
    if (!fs.existsSync(tasksDir)) {
      fs.mkdirSync(tasksDir, { recursive: true });
    }
    if (!fs.existsSync(metricsDir)) {
      fs.mkdirSync(metricsDir, { recursive: true });
    }
    if (!fs.existsSync(modelsDir)) {
      fs.mkdirSync(modelsDir, { recursive: true });
    }
    
    let newTasksCount = 0;
    let newMetricsCount = 0;
    let newModelsCount = 0;
    let skippedMetricsCount = 0;
    
    // Write metrics
    for (const metric of allMetrics) {
      const metricFile = path.join(metricsDir, `${metric.id}.yaml`);
      const existingMetric = loadExistingMetric(metric.id, metricsDir);
      
      if (existingMetric) {
        console.log(`⏭️  Skipped existing metric: ${metricFile}`);
        skippedMetricsCount++;
      } else {
        const metricYaml = yaml.dump(metric);
        fs.writeFileSync(metricFile, metricYaml);
        console.log(`✅ Generated new metric: ${metricFile}`);
        newMetricsCount++;
      }
    }
    
    // Write tasks
    for (const task of allTasks) {
      const taskFile = path.join(tasksDir, `${task.id}.yaml`);
      const existingTask = loadExistingTask(task.id, tasksDir);
      
      if (existingTask) {
        console.log(`⏭️  Skipped existing task: ${taskFile}`);
      } else {
        // Create new task
        const taskYaml = yaml.dump(task);
        fs.writeFileSync(taskFile, taskYaml);
        console.log(`✅ Generated new task: ${taskFile}`);
        newTasksCount++;
      }
    }
    
    // Write model info files
    for (const model of allModels) {
      const namespaceDir = path.join(modelsDir, model.namespace);
      if (!fs.existsSync(namespaceDir)) {
        fs.mkdirSync(namespaceDir, { recursive: true });
      }
      
      const modelFile = path.join(namespaceDir, `${model.name}.yaml`);
      const existingModel = loadExistingModelInfo(model.namespace, model.name, modelsDir);
      
      if (existingModel) {
        console.log(`⏭️  Skipped existing model: ${modelFile}`);
      } else {
        // Create new model info
        const modelYaml = yaml.dump(model);
        fs.writeFileSync(modelFile, modelYaml);
        console.log(`✅ Generated new model: ${modelFile}`);
        newModelsCount++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Generated ${newTasksCount} new tasks`);
    console.log(`✅ Generated ${newMetricsCount} new metrics`);
    console.log(`✅ Generated ${newModelsCount} new models`);
    console.log(`⏭️  Skipped ${skippedMetricsCount} existing metrics`);
    console.log(`✅ Processed ${reportPaths.length} report file(s)`);
    console.log(`\n⚠️  Note: New tasks, metrics, and models have minimal data to ensure validation fails.`);
    console.log(`   Users must add descriptions, categories, and other required fields.`);
    
  } catch (error) {
    console.error('❌ Error generating config files from LM Eval report(s):', error);
    process.exit(1);
  }
} 