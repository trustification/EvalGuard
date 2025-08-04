import { Command } from 'commander';
import { EvalGuardApiClient } from '@trustification/evalguard-api-model';

interface ApiOptions {
  baseUrl?: string;
  apiKey?: string;
  model?: string;
  task?: string;
  limit?: number;
}

export async function apiCommand(options: ApiOptions): Promise<void> {
  try {
    console.log('🔌 Connecting to EvalGuard API...');
    
    const client = new EvalGuardApiClient(options.baseUrl || 'http://localhost:8080', options.apiKey);
    
    // Get reports with optional filtering
    const reportParams: any = {};
    if (options.model) reportParams.modelName = options.model;
    if (options.task) reportParams.taskRef = options.task;
    if (options.limit) reportParams.limit = options.limit;
    
    console.log('📊 Fetching reports...');
    const reports = await client.getReports(reportParams);
    
    console.log(`\n📈 Found ${reports.data.reports.length} reports`);
    console.log(`📄 Total available: ${reports.data.pagination.total}`);
    
    if (reports.data.reports.length > 0) {
      console.log('\n📋 Recent Reports:');
      reports.data.reports.slice(0, 5).forEach((report: any, index: number) => {
        console.log(`  ${index + 1}. ${report.context?.model_name || 'Unknown Model'}`);
        console.log(`     ID: ${report.id}`);
        console.log(`     Date: ${report.context?.date ? new Date(report.context.date * 1000).toISOString() : 'Unknown'}`);
        console.log(`     Tasks: ${report.tasks?.length || 0}`);
        console.log(`     Results: ${report.results?.length || 0}`);
        console.log('');
      });
    }
    
    // Get available models
    console.log('🤖 Fetching available models...');
    const models = await client.getModels();
    console.log(`\n📊 Available Models (${models.data.models?.length || 0}):`);
    models.data.models?.slice(0, 10).forEach((model: any, index: number) => {
      console.log(`  ${index + 1}. ${model.name} (${model.source})`);
      console.log(`     Reports: ${model.report_count || 0}`);
      console.log(`     Latest: ${model.latest_evaluation || 'N/A'}`);
      console.log('');
    });
    
    // Get available tasks
    console.log('📝 Fetching available tasks...');
    const tasks = await client.getTasks();
    console.log(`\n📋 Available Tasks (${tasks.data.tasks?.length || 0}):`);
    tasks.data.tasks?.slice(0, 10).forEach((task: any, index: number) => {
      console.log(`  ${index + 1}. ${task.name} (${task.id})`);
      console.log(`     Category: ${task.category || 'N/A'}`);
      console.log(`     Metrics: ${task.metrics?.length || 0}`);
      console.log('');
    });
    
    console.log('✅ API connection successful!');
    
  } catch (error) {
    console.error('❌ API Error:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
    process.exit(1);
  }
}

export function addApiCommand(program: Command): void {
  program
    .command('api')
    .description('Interact with EvalGuard API')
    .option('-u, --base-url <url>', 'API base URL', 'http://localhost:8080')
    .option('-k, --api-key <key>', 'API key for authentication')
    .option('-m, --model <model>', 'Filter by model name')
    .option('-t, --task <task>', 'Filter by task reference')
    .option('-l, --limit <number>', 'Limit number of results', '10')
    .action(async (options) => {
      await apiCommand({
        baseUrl: options.baseUrl,
        apiKey: options.apiKey,
        model: options.model,
        task: options.task,
        limit: parseInt(options.limit)
      });
    });
} 