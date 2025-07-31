import * as fs from 'fs';
import * as path from 'path';
import { compile, Options } from 'json-schema-to-typescript';

export async function modelCommand(): Promise<void> {
  try {
    console.log('🔧 Generating TypeScript data models from schemas...');
    
    const schemasDir = path.resolve(__dirname, '../../../schemas');
    const outputDir = path.resolve(__dirname, '../types');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Read schema files
    const schemaFiles = [
      { name: 'Task', file: 'task.schema.json' },
      { name: 'Metric', file: 'metric.schema.json' },
      { name: 'Threshold', file: 'threshold.schema.json' }
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
      const schemaPath = path.join(schemasDir, schema.file);
      
      if (!fs.existsSync(schemaPath)) {
        console.warn(`⚠️  Schema file not found: ${schemaPath}`);
        continue;
      }
      
      const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
      const schemaObj = JSON.parse(schemaContent);
      
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
    
    // Write the generated file to both dist and src folders
    const outputFile = path.join(outputDir, 'schemas.ts');
    const sourceOutputFile = path.join(__dirname, '../../src/types/schemas.ts');
    
    fs.writeFileSync(outputFile, generatedContent);
    fs.writeFileSync(sourceOutputFile, generatedContent);
    
    console.log(`✅ TypeScript models generated successfully!`);
    console.log(`📁 Dist: ${outputFile}`);
    console.log(`📁 Source: ${sourceOutputFile}`);
    
    console.log(`✅ TypeScript models generated successfully!`);
    console.log(`📁 Dist: ${outputFile}`);
    console.log(`📁 Source: ${sourceOutputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating TypeScript models:', error);
    process.exit(1);
  }
} 