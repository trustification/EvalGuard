# EvalGuard TypeScript API Client

This package provides a TypeScript client for the EvalGuard API using axios.

## Installation

```bash
npm install @trustification/evalguard-api-model
```

## Usage

### Basic Usage

```typescript
import EvalGuardApiClient from '@trustification/evalguard-api-model';

const client = new EvalGuardApiClient('http://localhost:8080');

// Get all reports
const reports = await client.getReports();

// Get reports for a specific model
const modelReports = await client.getReports({
  modelName: 'meta-llama/Llama-3.1-8B-Instruct'
});

// Get a specific report
const report = await client.getReport('report-id');

// Get thresholds for tasks
const thresholds = await client.getThresholds(['truthfulqa_mc1', 'winogender_schemas']);

// Get available models
const models = await client.getModels();

// Get available tasks
const tasks = await client.getTasks();
```

### Advanced Usage

```typescript
import { Configuration, DefaultApi } from '@trustification/evalguard-api-model';

// Use the generated API directly
const config = new Configuration({
  basePath: 'http://localhost:8080',
  apiKey: 'your-api-key'
});

const api = new DefaultApi(config);

// Make direct API calls
const reports = await api.listReports(
  'meta-llama/Llama-3.1-8B-Instruct', // modelName
  undefined, // modelSource
  undefined, // taskRef
  undefined, // metric
  10, // limit
  0  // offset
);
```

## Development

### Generate API Client

```bash
npm run generate
```

### Build

```bash
npm run build
```

### Clean Generated Files

```bash
npm run clean
```

## Features

- **Simple**: Uses axios for HTTP requests - no complex runtime fixes needed
- **Type Safe**: Full TypeScript support with generated types
- **Lightweight**: Minimal dependencies, just axios
- **Generated**: Automatically generated from OpenAPI specification 