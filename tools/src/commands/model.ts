import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { compile, Options } from 'json-schema-to-typescript';

export async function modelCommand(targetVersion: string = 'v1'): Promise<void> {
  try {
    console.log('🔧 Generating TypeScript data models from schemas...');
    
    const schemasDir = path.resolve(__dirname, '../../../schemas');
    const outputDir = path.resolve(__dirname, '../types');
    const versionedOutputDir = path.resolve(__dirname, `../types/${targetVersion}`);
    
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
      { name: 'Threshold', schemaName: 'threshold' },
      { name: 'Report', schemaName: 'report' },
      { name: 'ReportList', schemaName: 'report_list' },
      { name: 'PaginationInfo', schemaName: 'pagination_info' },
      { name: 'ModelInfo', schemaName: 'model_info' },
      { name: 'Error', schemaName: 'error' },
      { name: 'ThresholdsResponse', schemaName: 'thresholds_response' }
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
      patternProperties: true,
      cwd: path.join(schemasDir, targetVersion) // Set working directory for relative path resolution
    } as any;

    for (const schema of schemaFiles) {
      // Load versioned schemas
      let schemaObj: any;
      let schemaPath: string;
      
      // Load versioned schemas (v1, v2, etc.)
      const versionedPaths = [
        path.join(schemasDir, targetVersion, `${schema.schemaName}.schema.yaml`),
        path.join(schemasDir, targetVersion, `${schema.schemaName}.schema.json`)
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
    const sourceVersionedOutputFile = path.join(__dirname, `../../src/types/${targetVersion}/schemas.ts`);
    
    // Ensure source versioned directory exists
    const sourceVersionedDir = path.dirname(sourceVersionedOutputFile);
    if (!fs.existsSync(sourceVersionedDir)) {
      fs.mkdirSync(sourceVersionedDir, { recursive: true });
    }
    
    fs.writeFileSync(versionedOutputFile, generatedContent);
    fs.writeFileSync(sourceVersionedOutputFile, generatedContent);
    
    console.log(`✅ TypeScript models generated successfully!`);
    console.log(`📁 Dist (${targetVersion}): ${versionedOutputFile}`);
    console.log(`📁 Source (${targetVersion}): ${sourceVersionedOutputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating TypeScript models:', error);
    process.exit(1);
  }
} 