import { Command } from 'commander';
import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// Helper function to find project root
function findProjectRoot(): string {
  let currentDir = process.cwd();
  while (currentDir !== '/' && currentDir !== '') {
    if (fs.existsSync(path.join(currentDir, 'schemas')) && 
        fs.existsSync(path.join(currentDir, 'api-models'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error('Could not find project root (directory containing schemas/ and api-models/)');
}

// Helper function to get platform-agnostic temp directory
function getTempDir(): string {
  return os.tmpdir();
}

// Helper function to get git status in a portable way
function getGitStatus(): string {
  try {
    return execSync('git status --porcelain', { encoding: 'utf8' });
  } catch (error) {
    console.warn('⚠️  Could not get git status:', error);
    return '';
  }
}

// Helper function to get git diff in a portable way
function getGitDiff(): string {
  try {
    return execSync('git diff --name-only', { encoding: 'utf8' });
  } catch (error) {
    console.warn('⚠️  Could not get git diff:', error);
    return '';
  }
}

// Helper function to analyze changes using Node.js instead of Unix commands
function analyzeChanges(beforeStatus: string, afterStatus: string, afterDiff: string): { newFiles: string[], modifiedFiles: string[] } {
  const newFiles: string[] = [];
  const modifiedFiles: string[] = [];
  
  // Parse git status output
  const beforeLines = beforeStatus.split('\n').filter(line => line.trim());
  const afterLines = afterStatus.split('\n').filter(line => line.trim());
  
  // Find new files (lines that start with '??' in after but not in before)
  const beforeNewFiles = new Set(beforeLines.filter(line => line.startsWith('??')).map(line => line.substring(3)));
  const afterNewFiles = afterLines.filter(line => line.startsWith('??')).map(line => line.substring(3));
  
  afterNewFiles.forEach(file => {
    if (!beforeNewFiles.has(file) && 
        !file.includes('api-models/typescript/src/generated/') &&
        !file.includes('api-models/java/target/') &&
        !file.includes('api-models/typescript/dist/')) {
      newFiles.push(file);
    }
  });
  
  // Parse git diff output
  const diffLines = afterDiff.split('\n').filter(line => line.trim());
  diffLines.forEach(file => {
    if (!file.includes('api-models/typescript/src/generated/') &&
        !file.includes('api-models/java/target/') &&
        !file.includes('api-models/typescript/dist/')) {
      modifiedFiles.push(file);
    }
  });
  
  return { newFiles, modifiedFiles };
}

// API Model Generation Functions
async function generateApiModels(type: string, version: string): Promise<void> {
  console.log(`🔧 Generating API models (${type}) from version ${version}...`);
  
  const projectRoot = findProjectRoot();
  
  try {
    // Clean previously generated files before generating new ones
    console.log('🧹 Cleaning previously generated files...');
    if (type === 'java' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/java/target')}`, { stdio: 'inherit' });
    }
    if (type === 'js' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/typescript/dist')} ${path.join(projectRoot, 'api-models/typescript/src/generated')}`, { stdio: 'inherit' });
    }
    
    if (type === 'java' || type === 'both') {
      console.log('📦 Generating Java models...');
      execSync(`cd ${path.join(projectRoot, 'api-models/java')} && mvn clean generate-sources compile -Dapi.version=${version}`, { stdio: 'inherit' });
    }
    
    if (type === 'js' || type === 'both') {
      console.log('📦 Generating TypeScript models...');
      execSync(`cd ${path.join(projectRoot, 'api-models/typescript')} && npm install && npm run generate --version ${version} && npm run build`, { stdio: 'inherit' });
    }
    
    console.log('✅ API models generated successfully!');
  } catch (error) {
    console.error('❌ Error generating API models:', error);
    process.exit(1);
  }
}

async function validateApiModels(type: string, version: string): Promise<void> {
  console.log(`🔍 Validating API model generation (${type}) for version ${version}...`);
  
  const projectRoot = findProjectRoot();
  
  try {
    // Store current Git state
    console.log('📸 Storing current Git state...');
    const beforeStatus = getGitStatus();
    const beforeDiff = getGitDiff();
    
    // Clean previously generated files
    console.log('🧹 Cleaning previously generated files...');
    if (type === 'java' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/java/target')}`, { stdio: 'inherit' });
    }
    if (type === 'js' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/typescript/dist')} ${path.join(projectRoot, 'api-models/typescript/src/generated')}`, { stdio: 'inherit' });
    }
    
    // Generate models
    await generateApiModels(type, version);
    
    // Check for unintended file changes
    console.log('🔍 Checking for unintended file changes...');
    const afterStatus = getGitStatus();
    const afterDiff = getGitDiff();
    
    // Analyze changes using Node.js instead of Unix commands
    const { newFiles, modifiedFiles } = analyzeChanges(beforeStatus, afterStatus, afterDiff);
    
    if (newFiles.length > 0) {
      console.error('❌ API generation created unintended files:');
      newFiles.forEach(file => console.error(`  ${file}`));
      process.exit(1);
    }
    
    if (modifiedFiles.length > 0) {
      console.error('❌ API generation modified existing files:');
      modifiedFiles.forEach(file => console.error(`  ${file}`));
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
  
  const projectRoot = findProjectRoot();
  
  try {
    if (type === 'java' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/java/target')}`, { stdio: 'inherit' });
    }
    if (type === 'js' || type === 'both') {
      execSync(`rm -rf ${path.join(projectRoot, 'api-models/typescript/dist')} ${path.join(projectRoot, 'api-models/typescript/src/generated')}`, { stdio: 'inherit' });
    }
    console.log('✅ API models cleaned');
  } catch (error) {
    console.error('❌ Error cleaning API models:', error);
    process.exit(1);
  }
}

async function installApiModels(): Promise<void> {
  console.log('🔧 Installing API model dependencies...');
  
  const projectRoot = findProjectRoot();
  
  try {
    execSync(`cd ${path.join(projectRoot, 'api-models/typescript')} && npm install`, { stdio: 'inherit' });
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
      
      const projectRoot = findProjectRoot();
      execSync(`cd ${path.join(projectRoot, 'api-models/java')} && mvn deploy -Dapi.version=${version}`, { 
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
      
      const projectRoot = findProjectRoot();
      execSync(`cd ${path.join(projectRoot, 'api-models/typescript')} && npm publish`, { 
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