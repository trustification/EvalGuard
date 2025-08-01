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

Generate TypeScript interfaces from schemas (YAML or JSON) using the `json-schema-to-typescript` library:

```bash
# Generate for default version (v1)
make model
# or manually
npm run dev model
# or after building
node dist/index.js model

# Generate for specific version
make model version=v2
node dist/index.js model -t v2
node dist/index.js model --target-version v2
```

This will create TypeScript interfaces in `./src/types/{version}/schemas.ts` based on the versioned schemas in `../schemas/{version}/`. The tool prefers YAML schemas but falls back to JSON if YAML is not available.

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

Generates/updates TypeScript data models in `./src/types/{version}/schemas.ts` from the JSON schemas.

**Options:**
- `-t, --target-version <version>`: Target schema version (default: v1)

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

# Generate models for different versions
make model              # Generate for v1 (default)
make model version=v2   # Generate for v2

# Show all available commands
make help
```

## File Support

The CLI supports validation of:
- YAML files (`.yaml`, `.yml`) - **preferred format**
- JSON files (`.json`)

Configuration files are recommended to be in YAML format for better readability.

### Schema Files

The tool supports both YAML and JSON schema files:
- **YAML schemas** (`.yaml`) - **preferred format**
- **JSON schemas** (`.json`) - fallback format

The validation system will automatically prefer YAML schemas when available, falling back to JSON schemas if needed.

## Schema Types

- **Tasks**: Task definitions and metadata
- **Metrics**: Metric definitions and interpretations  
- **Thresholds**: Performance threshold definitions
- **Reports**: Model evaluation report structures
- **API Types**: REST API response types (ReportList, PaginationInfo, ModelInfo, Error, ThresholdsResponse)

## Schema Versioning

The tool supports multiple schema versions (v1, v2, etc.) for managing schema evolution:

- **Versioned schemas**: Located in `../schemas/{version}/`
- **Versioned types**: Generated to `./src/types/{version}/schemas.ts`
- **Default version**: v1 (used when no version is specified)
- **Version targeting**: Use `-t` or `--target-version` to generate for specific versions

## Project Structure

```
tools/
├── src/
│   ├── commands/          # CLI command implementations
│   ├── types/             # TypeScript type definitions
│   │   ├── index.ts       # Main types barrel file
│   │   ├── validation.ts  # Validation-related types
│   │   └── v1/            # Versioned type definitions
│   │       └── schemas.ts # Auto-generated schema types for v1
│   └── index.ts           # CLI entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── Makefile              # Development commands
└── README.md             # This file
``` 