import { Configuration, DefaultApi } from './generated';

export default class EvalGuardApiClient {
  private api: DefaultApi;

  constructor(baseUrl: string = 'http://localhost:8080', apiKey?: string) {
    const config = new Configuration({
      basePath: baseUrl,
      apiKey: apiKey,
    });
    this.api = new DefaultApi(config);
  }

  // Reports
  async getReports(params?: {
    modelName?: string;
    modelSource?: string;
    taskRef?: string;
    metric?: string;
    limit?: number;
    offset?: number;
  }) {
    return this.api.listReports(
      params?.modelName,
      params?.modelSource,
      params?.taskRef,
      params?.metric,
      params?.limit,
      params?.offset
    );
  }

  async getReport(reportId: string) {
    return this.api.getReport(reportId);
  }

  async getReportMetrics(reportId: string, metric?: string) {
    return this.api.getReportMetrics(reportId, metric);
  }

  // Thresholds
  async getThresholds(tasks: string[], metrics?: string[]) {
    return this.api.getThresholds(tasks.join(','), metrics?.join(','));
  }

  // Models
  async getModels(source?: string) {
    return this.api.listModels(source);
  }

  // Tasks
  async getTasks() {
    return this.api.listTasks();
  }
} 