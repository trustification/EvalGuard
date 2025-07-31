import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { Task, Metric } from '../types/schemas';

interface GenerateOptions {
  file: string;
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

export async function generateCommand(options: GenerateOptions): Promise<void> {
  try {
    console.log('🔧 Generating tasks and metrics from lm-eval report...');
    
    const reportPath = path.resolve(options.file);
    if (!fs.existsSync(reportPath)) {
      console.error(`❌ Report file not found: ${reportPath}`);
      process.exit(1);
    }
    
    // Read and parse the report
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
    
    // Write tasks
    for (const task of tasks) {
      const taskFile = path.join(tasksDir, `${task.id}.yaml`);
      const taskYaml = yaml.dump(task);
      fs.writeFileSync(taskFile, taskYaml);
      console.log(`✅ Generated task: ${taskFile}`);
    }
    
    // Write metrics
    for (const metric of metrics) {
      const metricFile = path.join(metricsDir, `${metric.id}.yaml`);
      const metricYaml = yaml.dump(metric);
      fs.writeFileSync(metricFile, metricYaml);
      console.log(`✅ Generated metric: ${metricFile}`);
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Generated ${tasks.length} tasks`);
    console.log(`✅ Generated ${metrics.length} metrics`);
    console.log(`\n⚠️  Note: Tasks and metrics have minimal data to ensure validation fails.`);
    console.log(`   Users must add descriptions, categories, and other required fields.`);
    
  } catch (error) {
    console.error('❌ Error generating tasks and metrics:', error);
    process.exit(1);
  }
} 