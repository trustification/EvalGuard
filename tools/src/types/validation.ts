// Validation-related types

export interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
}

export interface ValidatorMap {
  tasks: any;
  metrics: any;
  thresholds: any;
} 