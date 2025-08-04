import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { glob } from 'glob';
import { Task } from '@trustification/evalguard-api-model';

// Local Metric type for generating local YAML files
interface Metric {
  id: string;
  name: string;
  direction: 'higher_is_better' | 'lower_is_better';
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
      tags: config.tag,
      metrics: []
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
      
      // Add metric to task
      task.metrics.push(metricId);
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

export async function generateCommand(options: GenerateOptions): Promise<void> {
  try {
    console.log('🔧 Generating tasks and metrics from lm-eval report(s)...');
    
    let reportPaths: string[] = [];
    
    if (options.file) {
      // Single file mode
      const reportPath = path.resolve(options.file);
      if (!fs.existsSync(reportPath)) {
        console.error(`❌ Report file not found: ${reportPath}`);
        process.exit(1);
      }
      reportPaths = [reportPath];
    } else if (options.folder) {
      // Folder mode - find all JSON files recursively
      const folderPath = path.resolve(options.folder);
      if (!fs.existsSync(folderPath)) {
        console.error(`❌ Folder not found: ${folderPath}`);
        process.exit(1);
      }
      
      const pattern = path.join(folderPath, '**/*.json');
      const files = await glob(pattern, { nodir: true });
      
      if (files.length === 0) {
        console.error(`❌ No JSON files found in folder: ${folderPath}`);
        process.exit(1);
      }
      
      reportPaths = files;
      console.log(`📁 Found ${files.length} JSON files in folder`);
    } else {
      console.error('❌ Either --file or --folder option is required');
      process.exit(1);
    }
    
    const allTasks: Task[] = [];
    const allMetrics: Metric[] = [];
    const seenMetrics = new Set<string>();
    const seenTasks = new Set<string>();
    
    // Process each report file
    for (const reportPath of reportPaths) {
      console.log(`\n📄 Processing: ${path.relative(process.cwd(), reportPath)}`);
      
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
        
        console.log(`✅ Processed: ${tasks.length} tasks, ${metrics.length} metrics`);
      } catch (error) {
        console.error(`⚠️  Error processing ${reportPath}:`, error);
        // Continue with other files
      }
    }
    
    // Write tasks to config directory
    const configDir = path.resolve(__dirname, '../../../config');
    const tasksDir = path.join(configDir, 'tasks');
    const metricsDir = path.join(configDir, 'metrics');
    
    // Ensure directories exist
    if (!fs.existsSync(tasksDir)) {
      fs.mkdirSync(tasksDir, { recursive: true });
    }
    if (!fs.existsSync(metricsDir)) {
      fs.mkdirSync(metricsDir, { recursive: true });
    }
    
    let newTasksCount = 0;
    let updatedTasksCount = 0;
    let newMetricsCount = 0;
    let skippedMetricsCount = 0;
    
    // Write metrics first (they need to exist before tasks reference them)
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
        // Check if we need to add new metrics to existing task
        const existingMetrics = new Set(existingTask.metrics);
        const newMetrics = task.metrics.filter((metricId: string) => !existingMetrics.has(metricId));
        
        if (newMetrics.length > 0) {
          // Update existing task with new metrics
          existingTask.metrics = [...existingTask.metrics, ...newMetrics];
          const taskYaml = yaml.dump(existingTask);
          fs.writeFileSync(taskFile, taskYaml);
          console.log(`🔄 Updated existing task with ${newMetrics.length} new metrics: ${taskFile}`);
          updatedTasksCount++;
        } else {
          console.log(`⏭️  Skipped existing task (no new metrics): ${taskFile}`);
        }
      } else {
        // Create new task
        const taskYaml = yaml.dump(task);
        fs.writeFileSync(taskFile, taskYaml);
        console.log(`✅ Generated new task: ${taskFile}`);
        newTasksCount++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Generated ${newTasksCount} new tasks`);
    console.log(`🔄 Updated ${updatedTasksCount} existing tasks with new metrics`);
    console.log(`✅ Generated ${newMetricsCount} new metrics`);
    console.log(`⏭️  Skipped ${skippedMetricsCount} existing metrics`);
    console.log(`✅ Processed ${reportPaths.length} report file(s)`);
    console.log(`\n⚠️  Note: New tasks and metrics have minimal data to ensure validation fails.`);
    console.log(`   Users must add descriptions, categories, and other required fields.`);
    
  } catch (error) {
    console.error('❌ Error generating tasks and metrics:', error);
    process.exit(1);
  }
} 