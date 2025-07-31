#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Testing EvalGuard CLI...\n');

// Test model command
console.log('1. Testing model command...');
try {
  execSync('npm run dev model', { stdio: 'inherit' });
  console.log('✅ Model command works!\n');
} catch (error) {
  console.log('❌ Model command failed:', error.message);
}

// Test validate command
console.log('2. Testing validate command...');
try {
  execSync('npm run dev validate', { stdio: 'inherit' });
  console.log('✅ Validate command works!\n');
} catch (error) {
  console.log('❌ Validate command failed:', error.message);
}

// Test validate with type
console.log('3. Testing validate with type...');
try {
  execSync('npm run dev validate -t tasks', { stdio: 'inherit' });
  console.log('✅ Validate with type works!\n');
} catch (error) {
  console.log('❌ Validate with type failed:', error.message);
}

// Test validate with file
console.log('4. Testing validate with file...');
try {
  execSync('npm run dev validate -f ../config/tasks/sample-task.yaml', { stdio: 'inherit' });
  console.log('✅ Validate with file works!\n');
} catch (error) {
  console.log('❌ Validate with file failed:', error.message);
}

console.log('🎉 CLI testing completed!'); 