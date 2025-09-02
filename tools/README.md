# EvalGuard CLI

A TypeScript CLI tool for managing EvalGuard schemas, validating configuration files, and generating missing configuration from evaluation reports.

## Purpose

The EvalGuard CLI serves as the primary interface for:
- **Schema Validation**: Validating all EvalGuard configuration files against their respective schemas
- **Configuration Generation**: Automatically generating missing tasks, metrics, and model information from evaluation reports
- **API Model Generation**: Creating language-specific models from OpenAPI schemas
- **Cross-Reference Validation**: Ensuring consistency between related schemas and configurations

## Architecture

### Core Components

The CLI is built with a modular command architecture:

- **Command Registry**: Central registry for all available commands
- **Schema Validation Engine**: Validates YAML configurations against JSON Schema definitions
- **Report Parser**: Parses lm-evaluation-harness reports to extract task and metric information
- **Configuration Generator**: Creates missing configuration files based on report data
- **OpenAPI Integration**: Generates language-specific models from API schemas

### Type System

The CLI leverages TypeScript models generated from EvalGuard schemas:
- **Schema Types**: Generated from `schemas/v1/*.schema.yaml` files
- **API Types**: Generated from `schemas/v1/api.schema.yaml` OpenAPI specification
- **Runtime Validation**: Uses JSON Schema validation for configuration files

## Development

### Quick Setup

```bash
cd tools
make setup
```

### Available Make Targets

```bash
# Quick setup (install + build)
make setup

# Install dependencies
make install

# Build TypeScript project
make build

# Run in development mode
make dev

# Clean build artifacts
make clean

# Run tests
make test

# Build standalone binary
make package

# Show all available commands
make help
```

### Development Workflow

1. **Install Dependencies**: `make install`
2. **Build Project**: `make build` (or `make dev` for watch mode)
3. **Run Tests**: `make test`
4. **Create Binary**: `make package`

## Project Structure

```
tools/
├── src/
│   ├── commands/          # CLI command implementations
│   │   ├── config/        # Configuration validation commands
│   │   ├── lm-eval/       # lm-evaluation-harness report processing
│   │   └── api/           # API model generation commands
│   ├── types/             # TypeScript type definitions
│   ├── validation/        # Schema validation logic
│   ├── generators/        # Configuration generation logic
│   └── index.ts           # CLI entry point
├── dist/                  # Compiled JavaScript output
├── bin/                   # Standalone binaries (after make package)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── Makefile              # Development commands
└── README.md             # This file
```

## Dependencies

### Core Dependencies
- **TypeScript**: Language and compiler
- **Commander**: CLI framework for command parsing
- **js-yaml**: YAML parsing and validation
- **ajv**: JSON Schema validation engine

### Development Dependencies
- **@types/node**: Node.js type definitions
- **ts-node**: TypeScript execution for development
- **pkg**: Binary packaging for standalone executables

## Schema Integration

The CLI tool automatically integrates with the EvalGuard schema system:

- **Schema Discovery**: Automatically discovers and loads schemas from `schemas/v1/`
- **Cross-Reference Validation**: Validates references between schemas
- **Dynamic Loading**: Loads schemas at runtime for validation
- **Error Reporting**: Provides detailed error messages for schema violations

## Binary Distribution

The CLI can be packaged as standalone binaries for multiple platforms:

- **macOS**: `evalguard-macos` (x64, ARM64)
- **Linux**: `evalguard-linux` (x64, ARM64)
- **Windows**: `evalguard-win.exe` (x64)

Binary creation is handled by the `make package` target, which uses `pkg` to create platform-specific executables.

## Testing

The CLI includes comprehensive testing:

- **Unit Tests**: Individual command and utility function tests
- **Integration Tests**: End-to-end CLI workflow testing
- **Schema Validation Tests**: Ensures all schemas are valid
- **Cross-Reference Tests**: Validates schema relationships

Run tests with `make test` or `npm test`.

## Contributing to the CLI

When contributing to the CLI tool:

1. **Follow TypeScript Best Practices**: Use strict typing and proper error handling
2. **Add Tests**: Include tests for new commands and functionality
3. **Update Documentation**: Keep this README current with new features
4. **Validate Schemas**: Ensure new features work with existing schemas
5. **Cross-Platform Support**: Test on multiple operating systems

## Integration with EvalGuard

The CLI tool is designed to work seamlessly with the broader EvalGuard ecosystem:

- **Schema Validation**: Validates all configuration files against EvalGuard schemas
- **Report Processing**: Integrates with lm-evaluation-harness output formats
- **Configuration Management**: Maintains consistency across all EvalGuard components
- **API Generation**: Creates models for EvalGuard API consumers

For usage instructions and examples, see the [main README](../README.md) in the project root. 