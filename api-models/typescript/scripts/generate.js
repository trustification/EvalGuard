#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the version from npm config or default to v1
const version = process.env.npm_config_version || 'v1';
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

console.log(`🔧 Generating TypeScript models for version: ${version}`);

const command = [
  'openapi-generator-cli',
  'generate',
  '-i', `../../schemas/${version}/api.schema.yaml`,
  '-g', 'typescript-axios',
  '-o', './src/generated',
  '--additional-properties=supportsES6=true,npmName=@trustification/evalguard-api-model,npmVersion=' + packageJson.version + ',typescriptThreePlus=true'
].join(' ');

try {
  execSync(command, { stdio: 'inherit' });
  console.log('✅ TypeScript models generated successfully!');
} catch (error) {
  console.error('❌ Error generating TypeScript models:', error.message);
  process.exit(1);
} 