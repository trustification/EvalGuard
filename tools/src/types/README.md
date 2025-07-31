# Types Organization

This folder contains all TypeScript type definitions for the EvalGuard CLI.

## Structure

```
types/
├── index.ts          # Main types barrel file
├── validation.ts     # Validation-related types
├── schemas.ts        # Auto-generated schema types (from 'make model')
└── README.md         # This file
```

## Types

### `CommandOptions`
CLI command options interface used by all commands.

### `ValidationResult`
Result of file validation operations.

### `ValidatorMap`
Map of AJV validators for different schema types.

### Schema Types (Auto-generated)
- `Task` - Generated from `task.schema.json`
- `Metric` - Generated from `metric.schema.json`  
- `Threshold` - Generated from `threshold.schema.json`

## Usage

```typescript
import { CommandOptions, ValidationResult } from '../types';
```

## Generation

Run `make model` to regenerate the schema types from JSON schemas. 