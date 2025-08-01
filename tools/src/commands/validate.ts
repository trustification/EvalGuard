import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import Ajv2020 from 'ajv/dist/2020';
import { CommandOptions } from '../types';
import { ValidationResult } from '../types/validation';

interface ValidationContext {
  allMetrics: Set<string>;
  allTasks: Set<string>;
  taskMetrics: Map<string, Set<string>>; // task ID -> set of metric IDs
  thresholdTasks: Set<string>; // track unique task IDs in thresholds
  validators: any;
}

export async function validateCommand(options: CommandOptions): Promise<void> {
  try {
    console.log('🔍 Validating configuration files...');
    
    const configDir = path.resolve(__dirname, '../../../config');
    const schemasDir = path.resolve(__dirname, '../../../schemas');
    
    // Initialize AJV validator
    const ajv = new Ajv2020({ 
      allErrors: true,
      validateSchema: false
    });
    
    // Load versioned schemas
    const schemas = {
      tasks: loadVersionedSchema(schemasDir, 'task'),
      metrics: loadVersionedSchema(schemasDir, 'metric'),
      thresholds: loadVersionedSchema(schemasDir, 'threshold')
    };
    
    // Compile validators
    const validators = {
      tasks: ajv.compile(schemas.tasks),
      metrics: ajv.compile(schemas.metrics),
      thresholds: ajv.compile(schemas.thresholds)
    };
    
    const context: ValidationContext = {
      allMetrics: new Set<string>(),
      allTasks: new Set<string>(),
      taskMetrics: new Map<string, Set<string>>(),
      thresholdTasks: new Set<string>(),
      validators
    };
    
    let validationResults: ValidationResult[] = [];
    
    if (options.file) {
      validationResults = await validateSingleFile(options.file, context);
    } else if (options.type) {
      validationResults = await validateSpecificType(options.type, configDir, context);
    } else {
      validationResults = await validateAllTypes(configDir, context);
    }
    
    // Report results
    reportValidationResults(validationResults);
    
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  }
}

async function validateSingleFile(filePath: string, context: ValidationContext): Promise<ValidationResult[]> {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ File not found: ${resolvedPath}`);
    process.exit(1);
  }
  
  const result = await validateFile(resolvedPath, context.validators);
  return [result];
}

async function validateSpecificType(type: string, configDir: string, context: ValidationContext): Promise<ValidationResult[]> {
  const normalizedType = type.toLowerCase();
  if (!['metrics', 'tasks', 'thresholds'].includes(normalizedType)) {
    console.error(`❌ Invalid type: ${type}. Must be one of: metrics, tasks, thresholds`);
    process.exit(1);
  }
  
  const typeDir = path.join(configDir, normalizedType);
  if (!fs.existsSync(typeDir)) {
    console.warn(`⚠️  Directory not found: ${typeDir}`);
    return [];
  }
  
  const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
  const results: ValidationResult[] = [];
  
  for (const file of files) {
    const filePath = path.join(typeDir, file);
    const result = await validateFile(filePath, context.validators, normalizedType);
    results.push(result);
  }
  
  return results;
}

async function validateAllTypes(configDir: string, context: ValidationContext): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  // First pass: collect metrics and tasks for cross-reference validation
  await collectMetricsAndTasks(configDir, context, results);
  
  // Second pass: validate tasks and thresholds with cross-references
  await validateTasksAndThresholds(configDir, context, results);
  
  return results;
}

async function collectMetricsAndTasks(configDir: string, context: ValidationContext, results: ValidationResult[]): Promise<void> {
  for (const type of ['metrics', 'tasks'] as const) {
    const typeDir = path.join(configDir, type);
    if (!fs.existsSync(typeDir)) {
      console.warn(`⚠️  Directory not found: ${typeDir}`);
      continue;
    }
    
    const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
    for (const file of files) {
      const filePath = path.join(typeDir, file);
      const result = await validateFile(filePath, context.validators, type);
      
      // Collect for cross-reference validation
      if (result.valid && result.data) {
        const id = result.data.id;
        if (id) {
          if (type === 'metrics') {
            context.allMetrics.add(id);
          } else if (type === 'tasks') {
            context.allTasks.add(id);
            // Store task metrics mapping
            const metrics = result.data.metrics || [];
            context.taskMetrics.set(id, new Set(metrics));
          }
        }
      }
      
      results.push(result);
    }
  }
}

async function validateTasksAndThresholds(configDir: string, context: ValidationContext, results: ValidationResult[]): Promise<void> {
  for (const type of ['tasks', 'thresholds'] as const) {
    const typeDir = path.join(configDir, type);
    if (!fs.existsSync(typeDir)) {
      console.warn(`⚠️  Directory not found: ${typeDir}`);
      continue;
    }
    
    const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
    for (const file of files) {
      const filePath = path.join(typeDir, file);
      const result = await validateFile(filePath, context.validators, type);
      
      // Add cross-reference validation
      if (result.valid && result.data) {
        validateCrossReferences(result, type, context);
      }
      
      results.push(result);
    }
  }
}

function validateCrossReferences(result: ValidationResult, type: string, context: ValidationContext): void {
  if (type === 'tasks') {
    validateTaskReferences(result, context);
  } else if (type === 'thresholds') {
    validateThresholdReferences(result, context);
  }
}

function validateTaskReferences(result: ValidationResult, context: ValidationContext): void {
  const metrics = result.data.metrics || [];
  for (const metricId of metrics) {
    if (!context.allMetrics.has(metricId)) {
      result.valid = false;
      result.errors.push(`Task references non-existent metric: '${metricId}'`);
    }
  }
}

function validateThresholdReferences(result: ValidationResult, context: ValidationContext): void {
  // Validate that threshold task exists
  const taskId = result.data.task;
  if (taskId && !context.allTasks.has(taskId)) {
    result.valid = false;
    result.errors.push(`Threshold references non-existent task: '${taskId}'`);
    return; // Don't validate metrics if task doesn't exist
  }
  
  // Validate that threshold task ID is unique
  if (taskId && context.thresholdTasks.has(taskId)) {
    result.valid = false;
    result.errors.push(`Duplicate threshold task ID: '${taskId}' - all threshold metrics for a task must be grouped together`);
    return;
  }
  
  // Add task ID to set for future duplicate checking
  if (taskId) {
    context.thresholdTasks.add(taskId);
  }
  
  // Validate that threshold metrics exist
  const thresholds = result.data.thresholds || {};
  for (const metricId of Object.keys(thresholds)) {
    if (!context.allMetrics.has(metricId)) {
      result.valid = false;
      result.errors.push(`Threshold references non-existent metric: '${metricId}'`);
    }
  }
}

function reportValidationResults(validationResults: ValidationResult[]): void {
  const validCount = validationResults.filter(r => r.valid).length;
  const totalCount = validationResults.length;
  
  console.log(`\n📊 Validation Results:`);
  console.log(`✅ Valid files: ${validCount}/${totalCount}`);
  
  if (validCount === totalCount) {
    console.log('🎉 All files are valid!');
  } else {
    console.log('❌ Some files have validation errors:');
    validationResults
      .filter(r => !r.valid)
      .forEach(result => {
        console.log(`\n📁 ${result.file}:`);
        result.errors.forEach(error => {
          console.log(`  ❌ ${error}`);
        });
      });
    process.exit(1);
  }
}

function loadVersionedSchema(schemasDir: string, schemaName: string): any {
  // Load versioned schemas (v1, v2, etc.)
  const versionedPaths = [
    path.join(schemasDir, 'v1', `${schemaName}.schema.yaml`),
    path.join(schemasDir, 'v1', `${schemaName}.schema.json`)
  ];
  
  for (const schemaPath of versionedPaths) {
    if (fs.existsSync(schemaPath)) {
      try {
        const content = fs.readFileSync(schemaPath, 'utf-8');
        if (schemaPath.endsWith('.yaml')) {
          return yaml.load(content);
        } else {
          return JSON.parse(content);
        }
      } catch (error) {
        console.warn(`⚠️  Could not parse schema ${schemaPath}, trying next option`);
      }
    }
  }
  
  throw new Error(`No schema file found for ${schemaName} in versioned schemas`);
}

async function validateFile(filePath: string, validators: any, expectedType?: string): Promise<ValidationResult> {
  const content = fs.readFileSync(filePath, 'utf-8');
  let data: any;
  
  // Parse file content - prefer YAML for config files
  if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    try {
      data = yaml.load(content);
    } catch (error) {
      return {
        file: filePath,
        valid: false,
        errors: [`Failed to parse YAML: ${error}`]
      };
    }
  } else if (filePath.endsWith('.json')) {
    try {
      data = JSON.parse(content);
    } catch (error) {
      return {
        file: filePath,
        valid: false,
        errors: [`Failed to parse JSON: ${error}`]
      };
    }
  } else {
    return {
      file: filePath,
      valid: false,
      errors: ['Unsupported file format. Only JSON and YAML files are supported.']
    };
  }
  
  // Determine which validator to use
  let validator: any;
  let type: string;
  
  if (expectedType) {
    type = expectedType;
    validator = validators[type];
  } else {
    // Try to determine type from file path or content
    const fileName = path.basename(filePath);
    if (fileName.includes('task')) {
      type = 'tasks';
      validator = validators.tasks;
    } else if (fileName.includes('metric')) {
      type = 'metrics';
      validator = validators.metrics;
    } else if (fileName.includes('threshold')) {
      type = 'thresholds';
      validator = validators.thresholds;
    } else {
      // Try all validators
      for (const [t, v] of Object.entries(validators)) {
        if ((v as any)(data)) {
          type = t;
          validator = v;
          break;
        }
      }
      
      if (!validator) {
        return {
          file: filePath,
          valid: false,
          errors: ['Could not determine schema type for this file.']
        };
      }
    }
  }
  
  // Validate
  const valid = validator(data);
  const errors = valid ? [] : validator.errors?.map((e: any) => `${e.instancePath} ${e.message}`) || ['Unknown validation error'];
  
  return {
    file: filePath,
    valid,
    errors,
    data: valid ? data : undefined
  };
} 