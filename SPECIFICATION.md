# EvalGuard Schema Specification

## Abstract

This specification defines the EvalGuard schema system for model evaluation tasks, metrics, and performance thresholds. It provides a standardized way to define, validate, and manage evaluation configurations for language models and AI systems.

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Notations and Terminology](#2-notations-and-terminology)
- [3. Schema Versions](#3-schema-versions)
- [4. Schema Definitions](#4-schema-definitions)
  - [4.1 Task Schema](#41-task-schema)
  - [4.2 Metric Schema](#42-metric-schema)
  - [4.3 Policy Schema](#43-policy-schema)
  - [4.4 Report Schema](#44-report-schema)
  - [4.5 Guardrail Schema](#45-guardrail-schema)
  - [4.6 Model Info Schema](#46-model-info-schema)
  - [4.7 Model Card Schema](#47-model-card-schema)
  - [4.8 API Schema](#48-api-schema)
- [5. Validation Rules](#5-validation-rules)
- [6. Schema File Organization](#6-schema-file-organization)
- [7. Schema Implementation](#7-schema-implementation)
- [8. Migration and Versioning](#8-migration-and-versioning)
- [9. Security Considerations](#9-security-considerations)
- [10. Privacy Considerations](#10-privacy-considerations)
- [11. Examples](#11-examples)
- [12. References](#12-references)

## 1. Introduction

### 1.1 Purpose

The EvalGuard Schema Specification defines a standardized format for describing model evaluation tasks, metrics, and performance thresholds. This specification enables consistent evaluation configurations across different AI systems and evaluation frameworks.

### 1.2 Scope

This specification covers:
- Task definitions for model evaluation
- Metric definitions for performance measurement
- Policy definitions for evaluation contexts with embedded thresholds
- Report structures for evaluation results
- Guardrail definitions for operational constraints
- Model information and model card schemas
- REST API specification for data access
- Validation rules and constraints
- File organization and versioning
- CLI tools for schema management
- API model generation capabilities

### 1.3 Conformance

A conforming implementation MUST:
- Validate all files against their respective schemas
- Enforce all validation rules defined in this specification
- Support the current schema version (v1)
- Provide clear error messages for validation failures
- Support CLI tools for schema validation and management
- Enable API model generation for supported languages

## 2. Notations and Terminology

### 2.1 Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

### 2.2 Terminology

- **Task**: A specific evaluation activity that can be performed on a model
- **Metric**: A measurable quantity used to assess model performance
- **Policy**: An evaluation context that groups related thresholds and evaluation criteria
- **Threshold**: A performance boundary that defines interpretation categories, embedded within policies
- **Guardrail**: Operational constraints and policies for model deployment
- **Model Card**: Comprehensive documentation of a model's capabilities and evaluation results
- **Schema**: A formal definition of data structure and validation rules
- **Validation**: The process of verifying data conforms to schema rules
- **CLI**: Command Line Interface for schema management and validation
- **API Models**: Generated language-specific models from OpenAPI schemas

## 3. Schema Versions

### 3.1 Version History

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| v1.0.0 | 2025-08-XX | Initial schema specification | Draft |

### 3.2 Current Version: v1

The current schema version is **v1**, located in `schemas/v1/`. This version provides:

- **Task Schema**: Defines evaluation tasks and their metadata
- **Metric Schema**: Defines evaluation metrics and their properties  
- **Policy Schema**: Defines evaluation contexts and policies with embedded thresholds
- **Report Schema**: Defines evaluation report structures and metadata
- **Guardrail Schema**: Defines operational constraints and policies
- **Model Info Schema**: Defines basic model information and references
- **Model Card Schema**: Defines comprehensive model cards with evaluation results
- **API Schema**: Defines REST API interface for data access
- **API Types Schema**: Defines API-specific data types and responses

### 3.3 Version Compatibility

- **Backward Compatible**: New versions SHOULD not break existing valid data
- **Forward Compatible**: New versions SHOULD gracefully handle unknown fields
- **Migration Tools**: Implementations SHOULD provide tools to migrate between versions

## 4. Schema Definitions

### 4.1 Task Schema

#### 4.1.1 Purpose

The Task Schema defines evaluation tasks that can be performed on language models and AI systems.

#### 4.1.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique task identifier |
| `name` | string | ✅ | Human-readable task name |
| `description` | string | ❌ | Detailed task description |
| `category` | string | ❌ | Task category (e.g., 'question_answering') |
| `metrics` | string[] | ✅ | List of applicable metric IDs |
| `tags` | string[] | ❌ | Task tags (domain, language, difficulty) |
| `languages` | string[] | ❌ | Relevant languages for the task |

#### 4.1.3 Constraints

- `id` MUST be a valid identifier (alphanumeric, underscores, hyphens)
- `metrics` array MUST contain valid metric IDs that reference existing metrics
- `category` SHOULD use standard categories when possible

#### 4.1.4 Example

```yaml
id: truthfulqa_mc1
name: TruthfulQA Multiple Choice
description: Evaluates model's ability to answer questions truthfully
category: question_answering
metrics:
  - acc
  - acc_norm
tags:
  - truthfulness
  - multiple_choice
languages:
  - en
```

### 4.2 Metric Schema

#### 4.2.1 Purpose

The Metric Schema defines evaluation metrics used to measure model performance.

#### 4.2.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique metric identifier |
| `name` | string | ✅ | Human-readable metric name |
| `description` | string | ❌ | Detailed metric description |
| `type` | enum | ❌ | Metric type (percentage, score, count, time, other) |
| `direction` | enum | ✅ | Performance direction (higher_is_better, lower_is_better) |
| `tags` | string[] | ❌ | Metric tags (accuracy, robustness, etc.) |

#### 4.2.3 Metric Types

- `percentage`: Percentage-based metrics (0-100)
- `score`: Raw numerical scores
- `count`: Count-based metrics
- `time`: Time-based metrics (seconds, milliseconds)
- `other`: Other metric types

#### 4.2.4 Constraints

- `id` MUST be a valid identifier
- `type` MUST be one of the defined enum values
- `direction` MUST be `higher_is_better` or `lower_is_better`

#### 4.2.5 Example

```yaml
id: acc
name: Accuracy
description: Percentage of correct predictions
type: percentage
direction: higher_is_better
tags:
  - accuracy
  - performance
```

### 4.3 Policy Schema

#### 4.3.1 Purpose

The Policy Schema defines evaluation contexts and policies that contain embedded performance thresholds for interpreting metric scores. Thresholds are now part of the policy structure rather than separate files.

#### 4.3.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique policy identifier |
| `name` | string | ✅ | Human-readable policy name |
| `description` | string | ✅ | Detailed description of the policy |
| `thresholds` | object | ❌ | Embedded thresholds organized by task ID |

#### 4.3.3 Constraints

- `id` MUST be a valid identifier (alphanumeric, underscores, hyphens)
- `name` SHOULD be descriptive and meaningful
- `description` SHOULD provide clear context for the policy's application

#### 4.3.4 Example

```yaml
id: default
name: Default Policy
description: Default policy for all contexts that don't define a specific policy.
thresholds:
  truthfulqa_mc1:
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

### 4.4 Report Schema

#### 4.4.1 Purpose

The Report Schema defines the structure for model evaluation reports, including context, tasks, and results.

#### 4.4.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ❌ | Unique report identifier |
| `metadata` | object | ❌ | Flexible key-value metadata about the report generation |
| `context` | object | ❌ | Contextual information about the report generation |
| `tasks` | array | ❌ | List of tasks in the report |
| `results` | array | ❌ | List of results in the report |

#### 4.4.3 Context Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `model_name` | string | ❌ | Name of the model being evaluated |
| `model_source` | string | ❌ | Version of the model being evaluated |
| `git_hash` | string | ❌ | Git hash of the model being evaluated |
| `date` | number | ❌ | Timestamp of the report generation |
| `execution` | object | ❌ | Execution information about the report generation |
| `tools` | object | ❌ | Tools used to generate the report |

#### 4.4.4 Execution Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `model_args_plain` | string | ❌ | Arguments used to instantiate the model |
| `model_args_dict` | object | ❌ | Arguments used to instantiate the model (key/value string mapping) |

#### 4.4.5 Task Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `task_ref` | string | ❌ | Reference to the task |
| `dataset_path` | string | ❌ | Path to the dataset |
| `dataset_name` | string | ❌ | Name of the dataset |
| `output_type` | string | ❌ | Type of the output |
| `repeats` | number | ❌ | Number of times the task was repeated |
| `should_decontaminate` | boolean | ❌ | Whether to decontaminate the task |
| `unsafe_code` | boolean | ❌ | Whether the task contains unsafe code |
| `n_shot` | number | ❌ | Number of shots in the task |
| `n_samples` | object | ❌ | Number of samples in the task |
| `version` | number | ❌ | Version of the task result |
| `metadata` | object | ❌ | Metadata about the task result |

#### 4.4.6 Results Properties

Results use a pattern-based structure where metric names (matching `^[a-zA-Z0-9_-]+$`) map to objects with:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `value` | number | ✅ | The metric value |
| `stderr` | number | ❌ | Standard error of the metric |

#### 4.4.7 Example

```yaml
id: "llama-3.1-8b-instruct-eval"
metadata:
  evaluation_date: "2025-01-15"
  evaluator: "lm-eval-harness"
context:
  model_name: "meta-llama/Llama-3.1-8B-Instruct"
  model_source: "hf"
  git_hash: "abc123def456"
  date: 1705312800
  execution:
    model_args_plain: "--model-path /path/to/model"
    model_args_dict:
      model_path: "/path/to/model"
      device: "cuda"
      precision: "fp16"
  tools:
    lm_eval:
      version: "0.4.0"
    transformers:
      version: "4.35.0"
tasks:
  - task_ref: "truthfulqa_mc1"
    dataset_path: "/path/to/dataset"
    dataset_name: "truthful_qa"
    output_type: "multiple_choice"
    repeats: 1
    should_decontaminate: false
    unsafe_code: false
    n_shot: 0
    n_samples:
      original: 817
      effective: 817
    version: 1
    metadata:
      category: "question_answering"
results:
  - acc:
      value: 0.75
      stderr: 0.015
    acc_norm:
      value: 0.72
      stderr: 0.016
```

### 4.5 Guardrail Schema

#### 4.5.1 Purpose

The Guardrail Schema defines operational constraints and policies that should be applied during model evaluation or deployment to mitigate risks and enforce quality standards.

#### 4.5.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique guardrail identifier |
| `name` | string | ✅ | Human-readable guardrail name |
| `description` | string | ✅ | Detailed description of the guardrail |
| `targets` | array | ❌ | List of target tasks and metrics this guardrail applies to |
| `scope` | enum | ❌ | Scope of application (input, output, both) |
| `instructions` | string | ❌ | Implementation instructions for the guardrail |
| `external_references` | array | ❌ | External references and documentation |

#### 4.5.3 Target Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `task` | string | ❌ | Task ID this guardrail applies to |
| `metrics` | string[] | ❌ | List of metric IDs this guardrail applies to |

#### 4.5.4 Scope Values

- `input`: Applied to input processing
- `output`: Applied to output generation
- `both`: Applied to both input and output

#### 4.5.5 Example

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

### 4.6 Model Info Schema

#### 4.6.1 Purpose

The Model Info Schema defines basic information about a model, including identification and reference links.

#### 4.6.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique model identifier |
| `name` | string | ✅ | Model name |
| `namespace` | string | ✅ | Model namespace or organization |
| `aliases` | string[] | ❌ | List of aliases for the model's name |
| `reference_links` | array | ❌ | List of reference links for the model |

#### 4.6.3 Reference Link Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ❌ | Name of the reference link |
| `url` | string | ✅ | URL of the reference link |

#### 4.6.4 Example

```yaml
id: llama-3.1-8b-instruct
name: Llama-3.1-8B-Instruct
namespace: meta-llama
aliases:
  - llama-3.1-8b-instruct
  - llama-3.1-8b
reference_links:
  - name: Hugging Face
    url: https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct
  - name: Paper
    url: https://arxiv.org/abs/2308.12950
```

### 4.7 Model Card Schema

#### 4.7.1 Purpose

The Model Card Schema defines a comprehensive model card that includes model identification, evaluation results with tasks, metrics, thresholds, and recommended guardrails for responsible AI deployment.

#### 4.7.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `model` | object | ✅ | Model information (references Model Info Schema) |
| `tasks` | object | ✅ | Tasks with their definitions, metrics, and evaluation results |
| `guardrails` | array | ❌ | List of recommended guardrails for this model |

#### 4.7.3 Task Result Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `task` | object | ✅ | Task definition (references Task Definition Schema) |
| `metrics` | array | ✅ | List of metrics results for this task |

#### 4.7.4 Metric Result Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `metric` | object | ✅ | Metric definition (references Metric Definition Schema) |
| `report_ref` | object | ❌ | Reference to the report containing full context |
| `value` | number | ✅ | The calculated metric value |
| `stderr` | number | ❌ | Standard error of the metric value |
| `thresholds` | array | ❌ | Applicable threshold ranges for this metric value (contextualized by policy_id) |

#### 4.7.5 Example

```yaml
model:
  id: llama-3.1-8b-instruct
  name: Llama-3.1-8B-Instruct
  namespace: meta-llama
tasks:
  truthfulqa_mc1:
    task:
      id: truthfulqa_mc1
      name: TruthfulQA Multiple Choice
      category: question_answering
      metrics: [acc, acc_norm]
    metrics:
      - metric:
          id: acc
          name: Accuracy
          direction: higher_is_better
        value: 0.75
        stderr: 0.015
        thresholds:
          - impact: high
            max: 0.5
          - impact: moderate
            min: 0.5
            max: 0.6
          - impact: low
            min: 0.6
            max: 0.7
guardrails:
  - id: truthfulness-check
    name: Truthfulness Verification
    scope: output
```

**Note**: The thresholds in the model card are contextualized based on the `policy_id` query parameter. When retrieving model cards, clients can specify a policy to get thresholds appropriate for that evaluation context.

### 4.8 API Schema

#### 4.8.1 Purpose

The API Schema defines the REST API interface for accessing evaluation reports and related data. This OpenAPI specification enables client implementations and provides standardized access to EvalGuard data.

#### 4.8.2 Key Endpoints

- **`GET /reports`**: List evaluation reports with filtering by model name, source, task, or metric
- **`GET /reports/{report_id}`**: Get specific report by ID
- **`GET /reports/{report_id}/metrics`**: Get metrics for a report
- **`GET /policies`**: Get policies
- **`GET /policies/{policy_id}`**: Get specific policy by ID
- **`GET /models`**: List available models
- **`GET /tasks`**: List available tasks
- **`GET /guardrails`**: List available guardrails

#### 4.8.3 Query Parameters

The `/reports` endpoint supports filtering by:
- **`model_name`**: Full model path (e.g., `meta-llama/Llama-3.1-8B-Instruct`)
- **`model_source`**: Model source/organization (e.g., `hf` for Hugging Face)
- **`task_ref`**: Task reference (e.g., `truthfulqa_mc1`)
- **`metric`**: Metric name (e.g., `acc`)
- **`limit`**: Maximum number of reports to return
- **`offset`**: Number of reports to skip for pagination

The `/policies` endpoint supports:
- **`tasks`**: Comma-separated list of task IDs (required, e.g., `truthfulqa_mc1,winogender_schemas`)
- **`metrics`**: Comma-separated list of metric IDs (optional, e.g., `acc,acc_norm,pct_stereotype`)

The `/guardrails` endpoint supports:
- **`tasks`**: Filter guardrails by task ID
- **`metrics`**: Filter guardrails by metric ID

**Note**: The `policy_id` parameter is only used for model card retrieval to contextualize thresholds and guardrails.

#### 4.8.4 Policy Contextualization

The `policy_id` parameter is used specifically for model card retrieval to contextualize thresholds and guardrails:

- **Model Cards**: When retrieving model cards with `?policy_id=default`, thresholds and guardrails are contextualized based on the specified policy
- **Policy-Specific Thresholds**: Different policies provide different threshold interpretations for the same metrics
- **Embedded Thresholds**: Thresholds are embedded within policies
- **No Access Control**: Policies do not control API access or permissions - they only affect the content returned in model cards

**Example Usage**:
```bash
# Get model card with default policy thresholds
curl "https://api.evalguard.org/v1/models/llama-3.1-8b-instruct/card?policy_id=default"

# Get model card with enterprise policy thresholds
curl "https://api.evalguard.org/v1/models/llama-3.1-8b-instruct/card?policy_id=enterprise"

# Get specific policy
curl "https://api.evalguard.org/v1/policies/default"
```

#### 4.8.5 Schema Reuse

The API schema reuses existing schemas:
- **Report**: References `report.schema.yaml`
- **Task**: References `task.schema.yaml`
- **Policy**: References `policy.schema.yaml`
- **Guardrail**: References `guardrail.schema.yaml`
- **Model Info**: References `model_info.schema.yaml`
- **Model Card**: References `model_card.schema.yaml`
- **Additional schemas**: API-specific schemas for pagination, error handling, etc.

## 5. Validation Rules

### 5.1 General Rules

1. **Schema Compliance**: All files MUST validate against their respective schemas
2. **Reference Integrity**: Metric IDs in tasks MUST reference existing metrics
3. **Policy References**: Threshold task IDs MUST reference existing tasks
4. **Threshold Metric Validation**: Thresholds MUST reference existing metrics
5. **Threshold Task Uniqueness**: Each task ID MUST appear only once within a single policy
6. **Policy Structure**: Thresholds MUST be embedded within policies

### 5.2 Task Validation

- Required fields: `id`, `name`, `metrics`
- `id` MUST be a valid identifier (alphanumeric, underscores, hyphens)
- `metrics` array MUST contain valid metric IDs
- `category` SHOULD use standard categories when possible

### 5.3 Metric Validation

- Required fields: `id`, `name`, `direction`
- `id` MUST be a valid identifier
- `type` MUST be one of the defined enum values
- `direction` MUST be `higher_is_better` or `lower_is_better`

### 5.4 Policy Validation

- Required fields: `id`, `name`, `description`
- `id` MUST be a valid identifier (alphanumeric, underscores, hyphens)
- `name` SHOULD be descriptive and meaningful
- `description` SHOULD provide clear context for the policy's application
- Policies MUST contain valid embedded thresholds

### 5.5 Threshold Validation

- Required fields: `task`, `thresholds`
- `task` MUST reference an existing task ID
- `task` MUST be unique within a single policy (all metrics for a task must be grouped together)
- All metric IDs in `thresholds` MUST reference existing metrics
- Threshold ranges MUST have at least `min` or `max` defined
- Ranges SHOULD not overlap within the same metric
- Thresholds MUST be embedded within valid policies

## 6. Schema File Organization

### 6.1 Schema Directory Structure

```
schemas/
└── v1/                    # Version 1 schemas
    ├── task_definition.schema.yaml
    ├── metric_definition.schema.yaml
    ├── policy.schema.yaml
    ├── report.schema.yaml
    ├── guardrail.schema.yaml
    ├── model_info.schema.yaml
    ├── model_card.schema.yaml
    ├── api.schema.yaml
    └── api_types.schema.yaml
```

### 6.2 Schema File Naming Conventions

- Schema files MUST use the pattern: `{type}.schema.yaml`
- Version directories MUST use the pattern: `v{major}.{minor}`
- Schema files MUST be in YAML format for better readability

## 7. Schema Implementation

### 7.1 Schema Validation

Conforming implementations MUST:
- Validate all schema files against their respective schemas
- Enforce all validation rules defined in this specification
- Provide clear error messages for validation failures
- Support cross-reference validation between schemas

### 7.2 Schema Processing

Implementations SHOULD:
- Support YAML schema format for better readability
- Provide tools for schema versioning and migration
- Generate type definitions from schemas
- Support schema evolution with backward compatibility

### 7.3 API Model Generation

The EvalGuard specification includes comprehensive API model generation capabilities:

#### 7.3.1 Supported Languages

- **Java**: Maven-based generation with OpenAPI Generator
- **TypeScript**: npm-based generation with OpenAPI Generator

#### 7.3.2 Generation Process

1. **Schema Validation**: All schemas are validated before generation
2. **Cross-Reference Validation**: Ensures consistency between related schemas
3. **Model Generation**: Creates language-specific models from OpenAPI specification
4. **Build Integration**: Generated models are integrated into build processes

#### 7.3.3 Generated Artifacts

- **Java**: Maven artifacts published to GitHub Packages
- **TypeScript**: npm packages published to GitHub Packages
- **Documentation**: Auto-generated API documentation
- **Type Safety**: Strong typing for all API operations

#### 7.3.4 Usage Examples

```bash
# Generate Java models
cd api-models/java
mvn clean generate-sources compile -Dapi.version=v1

# Generate TypeScript models
cd api-models/typescript
npm install
npm run generate --version v1
npm run build
```

## 8. CLI Tools and Validation

### 8.1 Command Line Interface

EvalGuard provides a comprehensive CLI tool for schema management and validation:

#### 8.1.1 Core Commands

- **`evalguard config validate`**: Validate all configuration files
- **`evalguard config validate -t {type}`**: Validate specific configuration types
- **`evalguard lm-eval gen`**: Generate tasks and metrics from evaluation reports
- **`evalguard api gen`**: Generate API models from schemas

#### 8.1.2 Configuration Validation

The CLI validates:
- **Tasks**: Task definitions and metadata
- **Metrics**: Metric definitions and types
- **Policies**: Policy definitions with embedded thresholds
- **Guardrails**: Operational guardrails and policies
- **Cross-references**: Consistency between related schemas

#### 8.1.3 Report Processing

- **lm-eval Reports**: Parse and extract task/metric information
- **Custom Reports**: Support for custom evaluation report formats
- **Data Generation**: Create configuration files from evaluation data

#### 8.1.4 API Model Generation

- **Language Support**: Java and TypeScript model generation
- **Version Management**: Support for multiple API versions
- **Build Integration**: Integration with Maven and npm build systems

### 8.2 Validation Rules

The CLI enforces comprehensive validation rules:

#### 8.2.1 Schema Compliance

- All files MUST validate against their respective schemas
- Schema files MUST conform to JSON Schema Draft 2020-12
- YAML files MUST be valid YAML 1.2

#### 8.2.2 Reference Integrity

- Metric IDs in tasks MUST reference existing metrics
- Policy IDs MUST be unique and valid
- Threshold task IDs MUST reference existing tasks
- Threshold metrics MUST reference existing metrics
- Guardrail targets MUST reference valid tasks and metrics
- Thresholds in model cards MUST reference valid policies when contextualized
- Policies MUST NOT be used for access control or permissions

#### 8.2.3 Data Consistency

- Policy IDs MUST be unique across all policies
- Threshold task IDs MUST be unique within a single policy
- Metric definitions MUST be consistent across all references
- Task definitions MUST be consistent across all references

## 9. Migration and Versioning

### 9.1 Schema Evolution

- New versions SHOULD maintain backward compatibility
- Breaking changes SHOULD be introduced in major version increments
- Migration tools SHOULD be provided for version transitions

### 8.2 Version Strategy

- **Major versions**: Breaking changes to schema structure
- **Minor versions**: Additive changes (new fields, new types)
- **Patch versions**: Bug fixes and clarifications

## 10. Security Considerations

### 10.1 File Validation

- All schema files MUST be validated before processing
- Implementations SHOULD reject files that fail validation
- File paths SHOULD be sanitized to prevent directory traversal attacks

### 10.2 Data Integrity

- Cross-reference validation MUST be performed
- Implementations SHOULD verify file integrity
- Backup strategies SHOULD be employed for critical data

## 11. Privacy Considerations

### 11.1 Data Handling

- Schema files MAY contain sensitive information
- Implementations SHOULD handle data according to privacy requirements
- Logging SHOULD avoid exposing sensitive schema content

## 12. Examples

### 12.1 Complete Task Example

```yaml
id: winogender_schemas
name: Winogender Schema
description: Evaluates gender bias in coreference resolution
category: bias_evaluation
metrics:
  - acc
  - pct_stereotype
tags:
  - bias
  - coreference
  - gender
languages:
  - en
```

### 12.2 Complete Metric Example

```yaml
id: pct_stereotype
name: Percentage Stereotype
description: Percentage of responses that follow gender stereotypes
type: percentage
direction: lower_is_better
tags:
  - bias
  - stereotype
  - gender
```

### 12.3 Complete Policy with Embedded Thresholds Example

```yaml
# Policy with embedded thresholds
id: default
name: Default Policy
description: Default policy for all contexts that don't define a specific policy.
thresholds:
  truthfulqa_mc1:
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
    acc_norm:
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

## 13. References

### 13.1 Normative References

- [RFC 2119](https://tools.ietf.org/html/rfc2119): Key words for use in RFCs to Indicate Requirement Levels
- [JSON Schema](https://json-schema.org/): JSON Schema specification
- [YAML 1.2](https://yaml.org/spec/1.2/spec.html): YAML specification

### 13.2 Informative References

- [CloudEvents Specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md): Event specification format reference
- [OpenAPI Specification](https://swagger.io/specification/): API specification format reference

---

**Copyright Notice**

This specification is part of the EvalGuard project and follows the same license terms. 