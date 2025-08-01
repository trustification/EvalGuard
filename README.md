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

- **Schema Definitions**: Formal definitions for tasks, metrics, and thresholds
- **Validation Rules**: Comprehensive validation requirements and constraints
- **File Organization**: Schema versioning and file structure guidelines
- **Implementation Requirements**: Conformance requirements for implementations

The specification follows industry standards and uses RFC 2119 terminology for clarity and precision.

---

## Repository Structure

```text
evalguard/
├── schemas/           # Schema definitions (see SPECIFICATION.md)
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
