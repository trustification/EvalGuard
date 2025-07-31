# EvalGuard CLI

A TypeScript CLI tool for managing EvalGuard schemas and validating configuration files.

## Installation

```bash
cd tools
make setup
```

Or manually:
```bash
cd tools
npm install
npm run build
```

## Usage

### Generate TypeScript Models

Generate TypeScript interfaces from JSON schemas using the `json-schema-to-typescript` library:

```bash
make model
# or manually
npm run dev model
# or after building
node dist/index.js model
```

This will create TypeScript interfaces in `./src/types/schemas.ts` based on the schemas in `../schemas/`.

### Validate Configuration Files

Validate files in the config folders against their respective schemas:

```bash
# Validate all files
make validate

# Validate specific types
make validate tasks
make validate metrics
make validate thresholds

# Or manually with specific options
npm run dev validate --type=tasks
npm run dev validate --type=metrics
npm run dev validate --type=thresholds

# Validate specific file
npm run dev validate --file=./config/tasks/my-task.yaml

# Using short flags
npm run dev validate -t tasks
npm run dev validate -f ./config/metrics/my-metric.json
```

## Commands

### `model`

Generates/updates TypeScript data models in `./src/types/schemas.ts` from the JSON schemas.

### `validate`

Validates configuration files against their schemas.

**Options:**
- `-t, --type <type>`: Validate specific type (metrics, tasks, or thresholds)
- `-f, --file <path>`: Validate specific file path

## Development

```bash
# Quick setup
make setup

# Run in development mode
make dev

# Build for production
make build

# Clean build artifacts
make clean

# Run tests
make test

# Show all available commands
make help
```

## File Support

The CLI supports validation of:
- YAML files (`.yaml`, `.yml`) - **preferred format**
- JSON files (`.json`)

Configuration files are recommended to be in YAML format for better readability.

## Schema Types

- **Tasks**: Task definitions and metadata
- **Metrics**: Metric definitions and interpretations  
- **Thresholds**: Performance threshold definitions

## Project Structure

```
tools/
├── src/
│   ├── commands/          # CLI command implementations
│   ├── types/             # TypeScript type definitions
│   │   ├── index.ts       # Main types barrel file
│   │   ├── validation.ts  # Validation-related types
│   │   └── schemas.ts     # Auto-generated schema types
│   └── index.ts           # CLI entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── Makefile              # Development commands
└── README.md             # This file
``` 