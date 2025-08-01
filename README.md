# EvalGuard

**EvalGuard** is an open metadata and schema repository for organizing, interpreting, and standardizing the evaluation of large language models (LLMs). It provides configurable schema definitions, metric descriptions, task annotations, and interpretability thresholds to support reproducible and meaningful evaluation practices.

EvalGuard is **tool-agnostic** but compatible with evaluation outputs from systems such as:
- [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)
- Hugging Face `evaluate`
- Custom or enterprise evaluation pipelines

> EvalGuard does not perform evaluations itself. Instead, it serves as a **structured reference** for interpreting model evaluation data and aligning it with categories, tags, thresholds, and recommended guardrails.

---

## Purpose

EvalGuard provides:

- **Schemas** for evaluation reports, tasks, and metrics
- **Configuration files** for:
  - Task descriptions and categories
  - Metric types and interpretations
  - Thresholds for performance levels
  - Tags for capabilities, risk types, and domains
- **Annotated evaluation reports** (e.g., in JSON/YAML format)

This enables:
- Consistent comparison across evaluations
- Configurable guidance on model strengths and limitations
- Future integration with guardrails and policy frameworks

---

## Specification

The EvalGuard schema system is formally defined in the [**EvalGuard Schema Specification**](SPECIFICATION.md). This specification provides:

- **Schema Definitions**: Formal definitions for tasks, metrics, thresholds, and reports
- **Validation Rules**: Comprehensive validation requirements and constraints
- **File Organization**: Schema versioning and file structure guidelines
- **Implementation Requirements**: Conformance requirements for implementations

The specification follows industry standards and uses RFC 2119 terminology for clarity and precision.

---

## Repository Structure

```text
evalguard/
├── schemas/           # Schema definitions (see SPECIFICATION.md)
│   └── v1/           # Version 1 schemas
│       ├── task.schema.yaml
│       ├── metric.schema.yaml
│       ├── threshold.schema.yaml
│       ├── report.schema.yaml
│       └── api.schema.yaml
├── config/            # Configuration files for interpretation
│   ├── tasks/         # Task definitions and metadata
│   ├── metrics/       # Metric definitions and types
│   └── thresholds/    # Performance thresholds
├── reports/           # Community-contributed model evaluation reports
│   └── lm-eval/       # lm-evaluation-harness reports
├── tools/             # CLI tool for schema management
│   ├── src/
│   ├── dist/
│   └── bin/           # Standalone binaries
├── SPECIFICATION.md   # Formal schema specification
├── LICENSE
├── NOTICE
└── README.md
```

## Tools and CLI

EvalGuard provides a CLI tool for working with schemas and configurations. The tool implements the requirements defined in the [EvalGuard Schema Specification](SPECIFICATION.md):

## API

EvalGuard provides a REST API for accessing evaluation reports. The API is defined in the [OpenAPI Specification](schemas/v1/api.schema.yaml) and supports:

- **Report Retrieval**: Get specific reports by ID or query by model name, source, task, or metric
- **Model Discovery**: List available models and their evaluation history
- **Task Information**: Access task definitions and metadata
- **Metrics Access**: Retrieve performance metrics for specific reports
- **Threshold Access**: Get performance thresholds for interpreting metric results

### Example API Usage

```bash
# Get all reports for a specific model
curl "https://api.evalguard.org/v1/reports?model_name=meta-llama/Llama-3.1-8B-Instruct"

# Get a specific report
curl "https://api.evalguard.org/v1/reports/llama-3.1-8b-instruct-eval-2025-01-15"

# Get only metrics for a report
curl "https://api.evalguard.org/v1/reports/llama-3.1-8b-instruct-eval-2025-01-15/metrics"

# Get thresholds for multiple tasks and metrics
curl "https://api.evalguard.org/v1/thresholds?tasks=truthfulqa_mc1,winogender_schemas&metrics=acc,acc_norm,pct_stereotype"

# List available models
curl "https://api.evalguard.org/v1/models"
```

### Installation

```bash
# Install dependencies
cd tools
npm install

# Build the tool
make build
```

### Usage

```bash
# Validate all configuration files
evalguard validate

# Validate specific types
evalguard validate -t tasks
evalguard validate -t metrics
evalguard validate -t thresholds

# Generate TypeScript models from schemas
evalguard model

# Generate tasks/metrics from evaluation reports
evalguard generate -f report.json
evalguard generate -d reports/
```

### Building Standalone Binaries

```bash
# Build binaries for multiple platforms
make binary

# Available platforms: macOS, Linux, Windows
# Output: bin/evalguard-{platform}
```

### Development

```bash
# Install dependencies
make install

# Build TypeScript
make build

# Clean build artifacts
make clean

# Run in development mode
make dev
```
