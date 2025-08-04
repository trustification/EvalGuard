#!/usr/bin/env node

import { Command } from 'commander';

import { validateCommand } from './commands/validate';
import { generateCommand } from './commands/generate';
import { addApiCommand } from './commands/api';

const program = new Command();

program
  .name('evalguard')
  .description('CLI tool for EvalGuard schema management and validation')
  .version('1.0.0');



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
  .description('Generate tasks and metrics from lm-eval report(s)')
  .option('-f, --file <path>', 'Path to lm-eval report JSON file')
  .option('-d, --folder <path>', 'Path to folder containing lm-eval report JSON files')
  .action(generateCommand);

// Add API command
addApiCommand(program);

program.parse(); 