#!/usr/bin/env node

import { Command } from 'commander';
import { modelCommand } from './commands/model';
import { validateCommand } from './commands/validate';
import { generateCommand } from './commands/generate';

const program = new Command();

program
  .name('evalguard')
  .description('CLI tool for EvalGuard schema management and validation')
  .version('1.0.0');

// Add model command
program
  .command('model')
  .description('Generate/update TypeScript data model in ./tools/schema-model')
  .action(modelCommand);

// Add validate command
program
  .command('validate')
  .description('Validate files in config folders against schemas')
  .option('-t, --type <type>', 'Validate specific type: metrics, tasks, or thresholds')
  .option('-f, --file <path>', 'Validate specific file path')
  .action(validateCommand);

// Add generate command
program
  .command('generate')
  .description('Generate tasks and metrics from lm-eval report')
  .requiredOption('-f, --file <path>', 'Path to lm-eval report JSON file')
  .action(generateCommand);

program.parse(); 