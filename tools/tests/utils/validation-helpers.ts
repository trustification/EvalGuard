import * as fs from 'fs';
import * as path from 'path';

export interface ValidationOutput {
  type: string;
  files: Array<{
    file: string;
    valid: boolean;
    data?: any;
    errors: string[];
  }>;
  summary: {
    total: number;
    valid: number;
    invalid: number;
    errors: string[];
  };
}

export interface ExpectedOutput {
  type: string;
  files: Array<{
    file: string;
    valid: boolean;
    data?: any;
    errors: string[];
  }>;
  summary: {
    total: number;
    valid: number;
    invalid: number;
    errors: string[];
  };
}

/**
 * Captures console output during validation and returns it as a string
 */
export function captureConsoleOutput(fn: () => void | Promise<void>): string {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  
  const output: string[] = [];
  
  console.log = (...args: any[]) => output.push(args.join(' '));
  console.error = (...args: any[]) => output.push(`ERROR: ${args.join(' ')}`);
  console.warn = (...args: any[]) => output.push(`WARN: ${args.join(' ')}`);
  
  try {
    fn();
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
  
  return output.join('\n');
}

/**
 * Loads expected output from a JSON file
 */
export function loadExpectedOutput(type: string): ExpectedOutput {
  const expectedPath = path.join(__dirname, `../fixtures/expected/validation/${type}-output.json`);
  const content = fs.readFileSync(expectedPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Compares actual validation results with expected output
 */
export function compareValidationResults(
  actual: ValidationOutput, 
  expected: ExpectedOutput
): { matches: boolean; differences: string[] } {
  const differences: string[] = [];
  
  // Compare type
  if (actual.type !== expected.type) {
    differences.push(`Type mismatch: expected "${expected.type}", got "${actual.type}"`);
  }
  
  // Compare file count
  if (actual.files.length !== expected.files.length) {
    differences.push(`File count mismatch: expected ${expected.files.length}, got ${actual.files.length}`);
  }
  
  // Compare each file
  expected.files.forEach((expectedFile, index) => {
    const actualFile = actual.files[index];
    if (!actualFile) {
      differences.push(`Missing file at index ${index}: ${expectedFile.file}`);
      return;
    }
    
    // Compare file path
    if (actualFile.file !== expectedFile.file) {
      differences.push(`File path mismatch at index ${index}: expected "${expectedFile.file}", got "${actualFile.file}"`);
    }
    
    // Compare validity
    if (actualFile.valid !== expectedFile.valid) {
      differences.push(`Validity mismatch for ${expectedFile.file}: expected ${expectedFile.valid}, got ${actualFile.valid}`);
    }
    
    // Compare data if both are valid
    if (expectedFile.valid && actualFile.valid) {
      if (JSON.stringify(actualFile.data) !== JSON.stringify(expectedFile.data)) {
        differences.push(`Data mismatch for ${expectedFile.file}`);
      }
    }
    
    // Compare errors
    if (actualFile.errors.length !== expectedFile.errors.length) {
      differences.push(`Error count mismatch for ${expectedFile.file}: expected ${expectedFile.errors.length}, got ${actualFile.errors.length}`);
    }
  });
  
  // Compare summary
  if (actual.summary.total !== expected.summary.total) {
    differences.push(`Total count mismatch: expected ${expected.summary.total}, got ${actual.summary.total}`);
  }
  
  if (actual.summary.valid !== expected.summary.valid) {
    differences.push(`Valid count mismatch: expected ${expected.summary.valid}, got ${actual.summary.valid}`);
  }
  
  if (actual.summary.invalid !== expected.summary.invalid) {
    differences.push(`Invalid count mismatch: expected ${expected.summary.invalid}, got ${actual.summary.invalid}`);
  }
  
  return {
    matches: differences.length === 0,
    differences
  };
}

/**
 * Creates a mock console that captures output
 */
export function createMockConsole() {
  const output: string[] = [];
  
  return {
    log: (...args: any[]) => output.push(args.join(' ')),
    error: (...args: any[]) => output.push(`ERROR: ${args.join(' ')}`),
    warn: (...args: any[]) => output.push(`WARN: ${args.join(' ')}`),
    getOutput: () => output.join('\n'),
    clear: () => output.splice(0, output.length)
  };
}
