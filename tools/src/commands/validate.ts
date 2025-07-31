import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as yaml from 'js-yaml';
import Ajv2020 from 'ajv/dist/2020';
import { CommandOptions } from '../types';
import { ValidationResult } from '../types/validation';

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
    // Load schemas
    const schemas = {
      tasks: JSON.parse(fs.readFileSync(path.join(schemasDir, 'task.schema.json'), 'utf-8')),
      metrics: JSON.parse(fs.readFileSync(path.join(schemasDir, 'metric.schema.json'), 'utf-8')),
      thresholds: JSON.parse(fs.readFileSync(path.join(schemasDir, 'threshold.schema.json'), 'utf-8'))
    };
    
    // Compile validators
    const validators = {
      tasks: ajv.compile(schemas.tasks),
      metrics: ajv.compile(schemas.metrics),
      thresholds: ajv.compile(schemas.thresholds)
    };
    
    let validationResults: ValidationResult[] = [];
    
    if (options.file) {
      // Validate specific file
      const filePath = path.resolve(options.file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
      }
      
      const result = await validateFile(filePath, validators, options.type);
      validationResults.push(result);
      
    } else if (options.type) {
      // Validate specific type
      const type = options.type.toLowerCase();
      if (!['metrics', 'tasks', 'thresholds'].includes(type)) {
        console.error(`❌ Invalid type: ${type}. Must be one of: metrics, tasks, thresholds`);
        process.exit(1);
      }
      
      const typeDir = path.join(configDir, type);
      if (!fs.existsSync(typeDir)) {
        console.warn(`⚠️  Directory not found: ${typeDir}`);
        return;
      }
      
      const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
      for (const file of files) {
        const filePath = path.join(typeDir, file);
        const result = await validateFile(filePath, validators, type);
        validationResults.push(result);
      }
      
    } else {
      // Validate all types
      for (const type of ['tasks', 'metrics', 'thresholds']) {
        const typeDir = path.join(configDir, type);
        if (!fs.existsSync(typeDir)) {
          console.warn(`⚠️  Directory not found: ${typeDir}`);
          continue;
        }
        
        const files = glob.sync('**/*.{json,yaml,yml}', { cwd: typeDir });
        for (const file of files) {
          const filePath = path.join(typeDir, file);
          const result = await validateFile(filePath, validators, type);
          validationResults.push(result);
        }
      }
    }
    
    // Report results
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
    
  } catch (error) {
    console.error('❌ Error during validation:', error);
    process.exit(1);
  }
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
    errors
  };
} 