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

// Add config command
const configCommand = program
  .command('config')
  .description('Configuration management commands');

configCommand
  .command('validate')
  .description('Validate files in config folders against schemas')
  .option('-t, --type <type>', 'Validate specific type: metrics, tasks, or thresholds')
  .option('-f, --file <path>', 'Validate specific file path')
  .option('-r, --root <path>', 'Root directory containing config and schemas folders')
  .action(validateCommand);

// Add lm-eval command
const lmEvalCommand = program
  .command('lm-eval')
  .description('LM-Eval report processing commands');

lmEvalCommand
  .command('gen')
  .description('Generate tasks and metrics from lm-eval report(s)')
  .option('-f, --file <path>', 'Path to lm-eval report JSON file')
  .option('-d, --folder <path>', 'Path to folder containing lm-eval report JSON files')
  .action(generateCommand);



// Add API command
addApiCommand(program);

program.parse(); 