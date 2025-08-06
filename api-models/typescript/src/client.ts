import { Configuration, ReportsApi, GuardrailsApi, ThresholdsApi, ModelsApi, TasksApi, ReportQueryschema } from './generated';

export default class EvalGuardApiClient {
  private reportsApi: ReportsApi;
  private guardrailsApi: GuardrailsApi;
  private thresholdsApi: ThresholdsApi;
  private modelsApi: ModelsApi;
  private tasksApi: TasksApi;

  constructor(baseUrl: string = 'http://localhost:8080', apiKey?: string) {
    const config = new Configuration({
      basePath: baseUrl,
      apiKey: apiKey,
    });
    this.reportsApi = new ReportsApi(config);
    this.guardrailsApi = new GuardrailsApi(config);
    this.thresholdsApi = new ThresholdsApi(config);
    this.modelsApi = new ModelsApi(config);
    this.tasksApi = new TasksApi(config);
  }

  // Reports
  async getReports(params?: {
    modelName?: string;
    modelSource?: string;
    tasks?: string[];
    metrics?: string[];
    reportContext?: { [key: string]: any };
    limit?: number;
    offset?: number;
  }) {
    const query: ReportQueryschema = {
      query: {
        model_name: params?.modelName,
        model_source: params?.modelSource,
        tasks: params?.tasks,
        metrics: params?.metrics,
        report_context: params?.reportContext,
      }
    };
    return this.reportsApi.listReports(query, params?.limit, params?.offset);
  }

  async getReport(reportId: string) {
    return this.reportsApi.getReport(reportId);
  }

  async getReportMetrics(reportId: string, metric?: string) {
    return this.reportsApi.getReportMetrics(reportId, metric);
  }

  // Thresholds
  async getThresholds(tasks: string[], metrics?: string[]) {
    return this.thresholdsApi.getThresholds(tasks.join(','), metrics?.join(','));
  }

  // Models
  async getModels(source?: string) {
    return this.modelsApi.listModels(source);
  }

  // Tasks
  async getTasks() {
    return this.tasksApi.listTasks();
  }

  // Guardrails
  async getGuardrails(params?: {
    tasks?: string[];
    metrics?: string[];
    limit?: number;
    offset?: number;
  }) {
    return this.guardrailsApi.listGuardrails(
      params?.tasks?.join(','),
      params?.metrics?.join(','),
      params?.limit,
      params?.offset
    );
  }

  async getGuardrail(guardrailId: string) {
    return this.guardrailsApi.getGuardrail(guardrailId);
  }
} 