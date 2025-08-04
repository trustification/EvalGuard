// Export generated API client and types
export * from './generated';
export { default as EvalGuardApiClient } from './client';

// Re-export types for convenience
export type {
  Report,
  ReportList,
  Task,
  Threshold,
  ModelInfo,
  PaginationInfo,
  GetThresholds200Response as ThresholdsResponse,
  ModelError as Error
} from './generated'; 