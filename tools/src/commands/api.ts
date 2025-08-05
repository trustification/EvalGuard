import { Command } from 'commander';
import { execSync } from 'child_process';
import * as path from 'path';

// API Model Generation Functions
async function generateApiModels(type: string, version: string): Promise<void> {
  console.log(`🔧 Generating API models (${type}) from version ${version}...`);
  
  try {
    if (type === 'java' || type === 'both') {
      console.log('📦 Generating Java models...');
      execSync(`cd ${path.join(__dirname, '../../../api-models/java')} && mvn clean generate-sources compile -Dapi.version=${version}`, { stdio: 'inherit' });
    }
    
    if (type === 'js' || type === 'both') {
      console.log('📦 Generating TypeScript models...');
      execSync(`cd ${path.join(__dirname, '../../../api-models/typescript')} && npm install && npm run generate --version ${version} && npm run build`, { stdio: 'inherit' });
    }
    
    console.log('✅ API models generated successfully!');
  } catch (error) {
    console.error('❌ Error generating API models:', error);
    process.exit(1);
  }
}

async function validateApiModels(type: string, version: string): Promise<void> {
  console.log(`🔍 Validating API model generation (${type}) for version ${version}...`);
  
  try {
    // Store current Git state
    console.log('📸 Storing current Git state...');
    execSync('git status --porcelain > /tmp/before_generate.txt', { stdio: 'inherit' });
    execSync('git diff --name-only > /tmp/before_generate_diff.txt', { stdio: 'inherit' });
    
    // Clean previously generated files
    console.log('🧹 Cleaning previously generated files...');
    if (type === 'java' || type === 'both') {
      execSync(`rm -rf ${path.join(__dirname, '../../../api-models/java/target')}`, { stdio: 'inherit' });
    }
    if (type === 'js' || type === 'both') {
      execSync(`rm -rf ${path.join(__dirname, '../../../api-models/typescript/dist')} ${path.join(__dirname, '../../../api-models/typescript/src/generated')}`, { stdio: 'inherit' });
    }
    
    // Generate models
    await generateApiModels(type, version);
    
    // Check for unintended file changes
    console.log('🔍 Checking for unintended file changes...');
    execSync('git status --porcelain > /tmp/after_generate.txt', { stdio: 'inherit' });
    execSync('git diff --name-only > /tmp/after_generate_diff.txt', { stdio: 'inherit' });
    
    // Analyze changes
    const newFiles = execSync('diff /tmp/before_generate.txt /tmp/after_generate.txt | grep "^+.*" | grep -v "^+++" | cut -c3- | grep -v "api-models/typescript/src/generated/" | grep -v "api-models/java/target/" | grep -v "api-models/typescript/dist/" || true', { encoding: 'utf8' });
    const modifiedFiles = execSync('git diff --name-only | grep -v "api-models/typescript/src/generated/" | grep -v "api-models/java/target/" | grep -v "api-models/typescript/dist/" || true', { encoding: 'utf8' });
    
    if (newFiles.trim()) {
      console.error('❌ API generation created unintended files:');
      console.error(newFiles);
      process.exit(1);
    }
    
    if (modifiedFiles.trim()) {
      console.error('❌ API generation modified existing files:');
      console.error(modifiedFiles);
      console.error('\nGit diff:');
      execSync('git diff', { stdio: 'inherit' });
      process.exit(1);
    }
    
    console.log('✅ API generation completed successfully without unintended file changes');
  } catch (error) {
    console.error('❌ Error validating API models:', error);
    process.exit(1);
  }
}

async function cleanApiModels(type: string): Promise<void> {
  console.log(`🧹 Cleaning API models (${type})...`);
  
  try {
    if (type === 'java' || type === 'both') {
      execSync(`rm -rf ${path.join(__dirname, '../../../api-models/java/target')}`, { stdio: 'inherit' });
    }
    if (type === 'js' || type === 'both') {
      execSync(`rm -rf ${path.join(__dirname, '../../../api-models/typescript/dist')} ${path.join(__dirname, '../../../api-models/typescript/src/generated')}`, { stdio: 'inherit' });
    }
    console.log('✅ API models cleaned');
  } catch (error) {
    console.error('❌ Error cleaning API models:', error);
    process.exit(1);
  }
}

async function installApiModels(): Promise<void> {
  console.log('🔧 Installing API model dependencies...');
  
  try {
    execSync(`cd ${path.join(__dirname, '../../../api-models/typescript')} && npm install`, { stdio: 'inherit' });
    console.log('✅ API dependencies installed');
  } catch (error) {
    console.error('❌ Error installing API models:', error);
    process.exit(1);
  }
}

async function publishApiModels(type: string, version: string): Promise<void> {
  console.log(`📦 Publishing API models (${type}) for version ${version}...`);
  
  try {
    if (type === 'java') {
      // Check if GitHub token is available
      const githubToken = process.env.GITHUB_TOKEN;
      const githubActor = process.env.GITHUB_ACTOR;
      
      if (!githubToken || !githubActor) {
        console.error('❌ Error: GITHUB_TOKEN and GITHUB_ACTOR environment variables are required for publishing');
        console.error('   Set these environment variables or run this in a GitHub Actions workflow');
        process.exit(1);
      }
      
      execSync(`cd ${path.join(__dirname, '../../../api-models/java')} && mvn deploy -Dapi.version=${version}`, { 
        stdio: 'inherit',
        env: { ...process.env, GITHUB_TOKEN: githubToken, GITHUB_ACTOR: githubActor }
      });
    } else if (type === 'js') {
      // Check if GitHub token is available
      const githubToken = process.env.GITHUB_TOKEN;
      
      if (!githubToken) {
        console.error('❌ Error: GITHUB_TOKEN environment variable is required for publishing');
        console.error('   Set this environment variable or run this in a GitHub Actions workflow');
        process.exit(1);
      }
      
      execSync(`cd ${path.join(__dirname, '../../../api-models/typescript')} && npm publish`, { 
        stdio: 'inherit',
        env: { ...process.env, NODE_AUTH_TOKEN: githubToken }
      });
    } else {
      console.error('❌ Error: type must be "java" or "js" for publishing');
      process.exit(1);
    }
    console.log('✅ API models published successfully');
  } catch (error) {
    console.error('❌ Error publishing API models:', error);
    process.exit(1);
  }
}

export function addApiCommand(program: Command): void {
  // API management commands
  const apiMgmt = program
    .command('api')
    .description('API model management commands');

  // API model generation
  apiMgmt
    .command('gen')
    .description('Generate API models from OpenAPI specification')
    .option('-t, --type <type>', 'Generate specific type: java, js, or both', 'both')
    .option('-s, --spec-version <version>', 'API specification version', 'v1')
    .action(async (options) => {
      await generateApiModels(options.type, options.specVersion);
    });

  // API model validation
  apiMgmt
    .command('validate')
    .description('Validate API model generation')
    .option('-t, --type <type>', 'Validate specific type: java, js, or both', 'both')
    .option('-s, --spec-version <version>', 'API specification version', 'v1')
    .action(async (options) => {
      await validateApiModels(options.type, options.specVersion);
    });

  // API model cleanup
  apiMgmt
    .command('clean')
    .description('Clean generated API models')
    .option('-t, --type <type>', 'Clean specific type: java, js, or both', 'both')
    .action(async (options) => {
      await cleanApiModels(options.type);
    });

  // API model installation
  apiMgmt
    .command('install')
    .description('Install API model dependencies')
    .action(async () => {
      await installApiModels();
    });

  // API model publishing
  apiMgmt
    .command('publish')
    .description('Publish API models to GitHub Packages')
    .option('-t, --type <type>', 'Publish specific type: java or js', 'js')
    .option('-s, --spec-version <version>', 'API specification version', 'v1')
    .action(async (options) => {
      console.log(`🔧 Publishing API models: type=${options.type}, version=${options.specVersion}`);
      await publishApiModels(options.type, options.specVersion);
    });
} 