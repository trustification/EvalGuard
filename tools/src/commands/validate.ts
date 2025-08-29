import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import Ajv2020 from 'ajv/dist/2020';
import { CommandOptions } from '../types';
import { ValidationResult } from '../types/validation';

interface ValidationContext {
  taskIds: Set<string>; // track unique task IDs
  metricIds: Set<string>; // track unique metric IDs
  thresholdTasks: Set<string>; // track unique task IDs in thresholds
  guardrailIds: Set<string>; // track unique guardrail IDs
  validators: any;
}

interface ValidateOptions extends CommandOptions {
  root?: string; // Root directory for config and schemas
}

export async function validateCommand(options: ValidateOptions): Promise<void> {
  try {
    console.log('🔍 Validating configuration files...');
    
    // Determine root directory
    const rootDir = options.root ? path.resolve(options.root) : process.cwd();
    const configDir = path.resolve(rootDir, 'config');
    const schemasDir = path.resolve(rootDir, 'schemas');
    
    console.log(`📁 Using root directory: ${rootDir}`);
    console.log(`📁 Config directory: ${configDir}`);
    console.log(`📁 Schemas directory: ${schemasDir}`);
    
    // Initialize AJV validator
    const ajv = new Ajv2020({ 
      allErrors: true,
      validateSchema: false
    });
    
    // Load versioned schemas
    const schemas = {
      tasks: loadVersionedSchema(schemasDir, 'task_definition'),
      metrics: loadVersionedSchema(schemasDir, 'metric_definition'),
      thresholds: loadVersionedSchema(schemasDir, 'threshold'),
      guardrails: loadVersionedSchema(schemasDir, 'guardrail')
    };
    
    // Compile validators
    const validators = {
      tasks: ajv.compile(schemas.tasks),
      metrics: ajv.compile(schemas.metrics),
      thresholds: ajv.compile(schemas.thresholds),
      guardrails: ajv.compile(schemas.guardrails)
    };
    
    const context: ValidationContext = {
      taskIds: new Set<string>(),
      metricIds: new Set<string>(),
      thresholdTasks: new Set<string>(),
      guardrailIds: new Set<string>(),
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
  if (!['metrics', 'tasks', 'thresholds', 'guardrails'].includes(normalizedType)) {
    console.error(`❌ Invalid type: ${type}. Must be one of: metrics, tasks, thresholds, guardrails`);
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
    
    // Add uniqueness validation
    if (result.valid && result.data) {
      validateUniqueness(result, normalizedType, context);
    }
    
    results.push(result);
  }
  
  return results;
}

async function validateAllTypes(configDir: string, context: ValidationContext): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  
  // Validate all types and check for uniqueness
  for (const type of ['metrics', 'tasks', 'thresholds', 'guardrails'] as const) {
    const typeDir = path.join(configDir, type);
    if (!fs.existsSync(typeDir)) {
      console.warn(`⚠️  Directory not found: ${typeDir}`);
      continue;
    }
    
    const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
    for (const file of files) {
      const filePath = path.join(typeDir, file);
      const result = await validateFile(filePath, context.validators, type);
      
      // Add uniqueness validation
      if (result.valid && result.data) {
        validateUniqueness(result, type, context);
      }
      
      results.push(result);
    }
  }
  
  return results;
}

function validateUniqueness(result: ValidationResult, type: string, context: ValidationContext): void {
  if (type === 'tasks') {
    validateTaskUniqueness(result, context);
  } else if (type === 'metrics') {
    validateMetricUniqueness(result, context);
  } else if (type === 'thresholds') {
    validateThresholdUniqueness(result, context);
  } else if (type === 'guardrails') {
    validateGuardrailUniqueness(result, context);
  }
}

function validateTaskUniqueness(result: ValidationResult, context: ValidationContext): void {
  const taskId = result.data.id;
  if (taskId) {
    if (context.taskIds.has(taskId)) {
      result.valid = false;
      result.errors.push(`Duplicate task ID: '${taskId}'`);
    } else {
      context.taskIds.add(taskId);
    }
  }
}

function validateMetricUniqueness(result: ValidationResult, context: ValidationContext): void {
  const metricId = result.data.id;
  if (metricId) {
    if (context.metricIds.has(metricId)) {
      result.valid = false;
      result.errors.push(`Duplicate metric ID: '${metricId}'`);
    } else {
      context.metricIds.add(metricId);
    }
  }
}

function validateThresholdUniqueness(result: ValidationResult, context: ValidationContext): void {
  const taskId = result.data.task;
  if (taskId) {
    if (context.thresholdTasks.has(taskId)) {
      result.valid = false;
      result.errors.push(`Duplicate threshold task ID: '${taskId}' - all threshold metrics for a task must be grouped together`);
    } else {
      context.thresholdTasks.add(taskId);
    }
  }
}

function validateGuardrailUniqueness(result: ValidationResult, context: ValidationContext): void {
  const guardrailId = result.data.id;
  if (guardrailId) {
    if (context.guardrailIds.has(guardrailId)) {
      result.valid = false;
      result.errors.push(`Duplicate guardrail ID: '${guardrailId}'`);
    } else {
      context.guardrailIds.add(guardrailId);
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
  
  console.log(`🔍 Looking for ${schemaName} schema in:`);
  for (const schemaPath of versionedPaths) {
    console.log(`  📄 ${schemaPath}`);
    if (fs.existsSync(schemaPath)) {
      try {
        const content = fs.readFileSync(schemaPath, 'utf-8');
        if (schemaPath.endsWith('.yaml')) {
          console.log(`✅ Found and loaded: ${schemaPath}`);
          return yaml.load(content);
        } else {
          console.log(`✅ Found and loaded: ${schemaPath}`);
          return JSON.parse(content);
        }
      } catch (error) {
        console.error(`❌ Could not parse schema ${schemaPath}: ${(error as Error).message}`);
        console.error(`Error details: ${error}`);
        throw error;
      }
    } else {
      console.log(`❌ Not found: ${schemaPath}`);
    }
  }
  
  throw new Error(`No schema file found for ${schemaName} in versioned schemas. Searched in: ${schemasDir}/v1/`);
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
    } else if (fileName.includes('guardrail')) {
      type = 'guardrails';
      validator = validators.guardrails;
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