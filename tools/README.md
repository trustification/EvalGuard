# EvalGuard CLI

A TypeScript CLI tool for managing EvalGuard schemas and validating configuration files.

## Building the CLI

### Quick Setup

```bash
cd tools
make setup
```

### Manual Build

```bash
cd tools
npm install
npm run build
```

### Development

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

## Dependencies

The CLI tool depends on TypeScript models generated from the EvalGuard schemas. These models are automatically generated during the build process from the OpenAPI specification in `schemas/v1/api.schema.yaml`.

## Usage

For detailed usage instructions, see the [main README](../README.md) in the project root.

## Project Structure

```
tools/
├── src/
│   ├── commands/          # CLI command implementations
│   ├── types/             # TypeScript type definitions
│   └── index.ts           # CLI entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── Makefile              # Development commands
└── README.md             # This file
``` 