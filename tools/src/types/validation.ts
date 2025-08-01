// Validation-related types

export interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  data?: any; // Parsed data for duplicate ID checking
} 