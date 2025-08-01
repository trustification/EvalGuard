import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { compile, Options } from 'json-schema-to-typescript';

export async function modelCommand(): Promise<void> {
  try {
    console.log('🔧 Generating TypeScript data models from schemas...');
    
    const schemasDir = path.resolve(__dirname, '../../../schemas');
    const outputDir = path.resolve(__dirname, '../types');
    const versionedOutputDir = path.resolve(__dirname, '../types/v1');
    
    // Ensure output directories exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    if (!fs.existsSync(versionedOutputDir)) {
      fs.mkdirSync(versionedOutputDir, { recursive: true });
    }
    
    // Read schema files (prefer versioned, fallback to legacy)
    const schemaFiles = [
      { name: 'Task', schemaName: 'task' },
      { name: 'Metric', schemaName: 'metric' },
      { name: 'Threshold', schemaName: 'threshold' }
    ];
    
    let generatedContent = `// Auto-generated TypeScript interfaces from EvalGuard schemas
// Generated on: ${new Date().toISOString()}

`;

    // Configure json-schema-to-typescript options
    const options = {
      bannerComment: '',
      style: {
        singleQuote: true,
        trailingComma: 'es5'
      },
      declareExternallyReferenced: false,
      enableConstEnums: true,
      ignoreMinAndMaxItems: false,
      maxItems: 20,
      strictIndexSignatures: false,
      unknownAny: false,
      additionalProperties: false,
      patternProperties: true
    } as any;

    for (const schema of schemaFiles) {
      // Load versioned schemas
      let schemaObj: any;
      let schemaPath: string;
      
      // Load versioned schemas (v1, v2, etc.)
      const versionedPaths = [
        path.join(schemasDir, 'v1', `${schema.schemaName}.schema.yaml`),
        path.join(schemasDir, 'v1', `${schema.schemaName}.schema.json`)
      ];
      
      for (const schemaPath of versionedPaths) {
        if (fs.existsSync(schemaPath)) {
          try {
            const content = fs.readFileSync(schemaPath, 'utf-8');
            if (schemaPath.endsWith('.yaml')) {
              schemaObj = yaml.load(content);
            } else {
              schemaObj = JSON.parse(content);
            }
            console.log(`📄 Using versioned schema: ${path.relative(schemasDir, schemaPath)}`);
            break;
          } catch (error) {
            console.warn(`⚠️  Could not parse schema ${schemaPath}, trying next option`);
          }
        }
      }
      
      if (!schemaObj) {
        console.warn(`⚠️  No valid schema file found for ${schema.name} in versioned schemas`);
        continue;
      }
      
      try {
        const typescriptInterface = await compile(schemaObj, schema.name, options);
        generatedContent += typescriptInterface + '\n\n';
        console.log(`✅ Generated interface for ${schema.name}`);
        
        // Generate interfaces for definitions if they exist
        if (schemaObj.definitions) {
          for (const [defName, defSchema] of Object.entries(schemaObj.definitions)) {
            try {
              const defInterface = await compile(defSchema as any, defName, options);
              generatedContent += defInterface + '\n\n';
              console.log(`✅ Generated interface for ${defName}`);
            } catch (error) {
              console.warn(`⚠️  Error generating interface for ${defName}:`, error);
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  Error generating interface for ${schema.name}:`, error);
      }
    }
    
    // Write the generated file to versioned locations
    const versionedOutputFile = path.join(versionedOutputDir, 'schemas.ts');
    const sourceVersionedOutputFile = path.join(__dirname, '../../src/types/v1/schemas.ts');
    
    // Ensure source versioned directory exists
    const sourceVersionedDir = path.dirname(sourceVersionedOutputFile);
    if (!fs.existsSync(sourceVersionedDir)) {
      fs.mkdirSync(sourceVersionedDir, { recursive: true });
    }
    
    fs.writeFileSync(versionedOutputFile, generatedContent);
    fs.writeFileSync(sourceVersionedOutputFile, generatedContent);
    
    console.log(`✅ TypeScript models generated successfully!`);
    console.log(`📁 Dist (v1): ${versionedOutputFile}`);
    console.log(`📁 Source (v1): ${sourceVersionedOutputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating TypeScript models:', error);
    process.exit(1);
  }
} 