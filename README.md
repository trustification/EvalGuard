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

- **Schemas** for evaluation reports, tasks, metrics, policies, and guardrails
- **Configuration files** for:
  - Model description and information
  - Task descriptions and categories
  - Metric types and interpretations
  - Policies with embedded performance thresholds
  - Guardrails for operational constraints and policies
  - Tags for capabilities, risk types, and domains
- **Annotated evaluation reports** (e.g., in JSON/YAML format)

This enables:
- Consistent comparison across evaluations
- Configurable guidance on model strengths and limitations
- Operational guardrails and policy frameworks
- Risk mitigation and quality enforcement

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
├── config/            # Configuration files for interpretation
│   ├── tasks/         # Task definitions and metadata
│   ├── metrics/       # Metric definitions and types
│   ├── policies/      # Policy definitions
│   └── guardrails/    # Operational guardrails and policies
├── reports/           # Community-contributed model evaluation reports
│   └── lm-eval/       # lm-evaluation-harness reports
├── tools/             # CLI tool for schema management
├── SPECIFICATION.md   # Formal schema specification
├── LICENSE
├── NOTICE
└── README.md
```

## Tools and CLI

EvalGuard provides a CLI tool for schema validation, data generation, and API model generation. The tool helps with:

- **Schema Validation**: Validate configuration files against EvalGuard schemas
- **Data Generation**: Generate tasks and metrics from evaluation reports
- **API Model Generation**: Generate Java and TypeScript models from OpenAPI schemas
- **Cross-Reference Validation**: Ensure consistency between tasks, metrics, and thresholds

The tool implements the requirements defined in the [EvalGuard Schema Specification](SPECIFICATION.md):

## Policies

EvalGuard includes a policy system that defines evaluation contexts and performance thresholds. Policies provide a structured way to organize thresholds and interpret model performance within specific evaluation contexts.

### Policy Features

- **Contextual Organization**: Policies group related thresholds and evaluation criteria
- **Embedded Thresholds**: Performance thresholds are embedded within policy definitions
- **Flexible Application**: Policies can be applied to specific tasks, metrics, or evaluation scenarios
- **Standardized Interpretation**: Consistent threshold definitions across different evaluation contexts

### Example Policy Structure

```yaml
# config/policies/default/policy.yaml
id: default
name: Default Policy
description: Default policy for all contexts that don't define a specific policy.

# config/policies/default/thresholds/truthfulqa_mc1.yaml
task: truthfulqa_mc1
thresholds:
  acc:
    - impact: very_low
      min: 0.85
      interpretation: High factual accuracy
    - impact: moderate
      min: 0.5
      max: 0.85
      interpretation: Moderate accuracy
    - impact: severe
      max: 0.5
      interpretation: Low accuracy
```

### Policy Contextualization

In EvalGuard, both thresholds and guardrails are organized under policies. This means:

- **Policy-Based Organization**: Thresholds and guardrails are embedded within evaluation policies (e.g., "default", "enterprise", "research")
- **Embedded Thresholds**: Thresholds are now part of the policy structure, not separate endpoints
- **Model Card Contextualization**: When you request a model card, you specify a `policy_id` to get thresholds and guardrails appropriate for that specific evaluation context
- **Flexible Interpretation**: Different policies can provide different threshold interpretations and guardrail requirements for the same metrics
- **No Access Control**: Policies do not control API access or permissions - they only affect the content returned in model cards

**Example**: Requesting a model card with `?policy_id=enterprise` will return enterprise-specific thresholds and guardrails, while `?policy_id=research` might return more permissive research-oriented ones.

## Guardrails

EvalGuard includes a guardrails system for defining operational constraints and policies that should be applied during model evaluation or deployment. Guardrails help mitigate risks, enforce quality standards, and guide model behavior.

### Guardrail Features

- **Targeted Application**: Guardrails can target specific tasks, metrics, and models
- **Flexible Scope**: Apply to input processing, output generation, or both
- **Metadata Support**: Include external references and implementation guidance
- **Cross-Reference Validation**: Ensure guardrails reference valid tasks and metrics

### Example Guardrail Configuration

```yaml
id: truthfulness-check
name: Truthfulness Verification
description: Ensures model responses are truthful and avoid hallucination
targets:
  - task: truthfulqa_mc1
    metrics: [acc, acc_norm]
scope: output
instructions: Verify that model responses are factually accurate
external_references:
  - https://arxiv.org/abs/2209.07958
```

## API Specification

EvalGuard defines a REST API specification for accessing evaluation reports. The API is defined in the [OpenAPI Specification](schemas/v1/api.schema.yaml) and supports:

- **Report Retrieval**: Get specific reports by ID or query by model name, source, task, or metric
- **Model Discovery**: List available models and their evaluation history
- **Task Information**: Access task definitions and metadata
- **Metrics Access**: Retrieve performance metrics for specific reports
- **Policy Access**: Get policies with embedded thresholds for interpreting metric results
- **Policy Contextualization**: Thresholds are contextualized based on `policy_id` query parameters
- **Guardrails Access**: Retrieve operational guardrails and policies

> **Note**: This is a **specification only**. The API is not implemented in this repository. Anyone interested in providing EvalGuard API services can implement this specification.

### Example API Usage

```bash
# Get all reports for a specific model
curl "https://api.evalguard.org/v1/reports?model_name=meta-llama/Llama-3.1-8B-Instruct"

# Get a specific report
curl "https://api.evalguard.org/v1/reports/llama-3.1-8b-instruct-eval-2025-01-15"

# Get only metrics for a report
curl "https://api.evalguard.org/v1/reports/llama-3.1-8b-instruct-eval-2025-01-15/metrics"

# Get policies with embedded thresholds for multiple tasks and metrics
curl "https://api.evalguard.org/v1/policies?tasks=truthfulqa_mc1,winogender_schemas&metrics=acc,acc_norm,pct_stereotype"

# Get model card with specific policy thresholds
curl "https://api.evalguard.org/v1/models/llama-3.1-8b-instruct/card?policy_id=default"

# Get specific policy with embedded thresholds
curl "https://api.evalguard.org/v1/policies/default"

# List available models
curl "https://api.evalguard.org/v1/models"

# List guardrails with filtering
curl "https://api.evalguard.org/v1/guardrails?tasks=truthfulqa_mc1&metrics=acc"

# Get specific guardrail
curl "https://api.evalguard.org/v1/guardrails/truthfulness-check"
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
evalguard config validate

# Validate specific types
evalguard config validate -t tasks
evalguard config validate -t metrics
evalguard config validate -t policies
evalguard config validate -t thresholds
evalguard config validate -t guardrails

# Validate from a different root directory
evalguard config validate --root /path/to/evalguard

# Generate tasks/metrics from evaluation reports
evalguard lm-eval gen -f report.json
evalguard lm-eval gen -d reports/

# Generate TypeScript models from schemas
evalguard api gen --type js --spec-version v1
```

### Building Standalone Binaries

```bash
# Build binaries for multiple platforms
make binary

# Available platforms: macOS, Linux, Windows
# Output: bin/evalguard-{platform}
```

### Development

For development instructions, see the [tools README](tools/README.md).
