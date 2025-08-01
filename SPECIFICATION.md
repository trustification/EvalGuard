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
  - [4.3 Threshold Schema](#43-threshold-schema)
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
- Threshold definitions for performance interpretation
- Validation rules and constraints
- File organization and versioning

### 1.3 Conformance

A conforming implementation MUST:
- Validate all files against their respective schemas
- Enforce all validation rules defined in this specification
- Support the current schema version (v1)
- Provide clear error messages for validation failures

## 2. Notations and Terminology

### 2.1 Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

### 2.2 Terminology

- **Task**: A specific evaluation activity that can be performed on a model
- **Metric**: A measurable quantity used to assess model performance
- **Threshold**: A performance boundary that defines interpretation categories
- **Schema**: A formal definition of data structure and validation rules
- **Validation**: The process of verifying data conforms to schema rules

## 3. Schema Versions

### 3.1 Version History

| Version | Date | Description | Status |
|---------|------|-------------|--------|
| v1.0.0 | 2025-08-XX | Initial schema specification | Draft |

### 3.2 Current Version: v1

The current schema version is **v1**, located in `schemas/v1/`. This version provides:

- **Task Schema**: Defines evaluation tasks and their metadata
- **Metric Schema**: Defines evaluation metrics and their properties  
- **Threshold Schema**: Defines performance thresholds and interpretations

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

### 4.3 Threshold Schema

#### 4.3.1 Purpose

The Threshold Schema defines performance thresholds for interpreting metric scores.

#### 4.3.2 Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `task` | string | ✅ | Task ID these thresholds apply to |
| `thresholds` | object | ✅ | Metric ID to threshold ranges mapping |

#### 4.3.3 Threshold Range Item

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | string | ✅ | Human-readable threshold label |
| `min` | number | ❌ | Inclusive minimum value |
| `max` | number | ❌ | Exclusive maximum value |
| `interpretation` | string | ❌ | Detailed explanation |

#### 4.3.4 Constraints

- `task` MUST reference an existing task ID
- `task` MUST be unique across all thresholds (all metrics for a task must be grouped together)
- All metric IDs in `thresholds` MUST reference existing metrics
- Threshold ranges MUST have at least `min` or `max` defined
- Ranges SHOULD not overlap within the same metric

#### 4.3.5 Example

```yaml
# Correct: All metrics for truthfulqa_mc1 grouped in one threshold file
task: truthfulqa_mc1
thresholds:
  acc:
    - label: Poor
      max: 0.5
      interpretation: Performance below acceptable threshold
    - label: Good
      min: 0.5
      max: 0.8
      interpretation: Acceptable performance
    - label: Excellent
      min: 0.8
      interpretation: Outstanding performance
  acc_norm:
    - label: Poor
      max: 0.5
    - label: Good
      min: 0.5
      max: 0.8
    - label: Excellent
      min: 0.8
```

## 5. Validation Rules

### 5.1 General Rules

1. **Schema Compliance**: All files MUST validate against their respective schemas
2. **Reference Integrity**: Metric IDs in tasks MUST reference existing metrics
3. **Threshold References**: Threshold task IDs MUST reference existing tasks
4. **Threshold Metric Validation**: Thresholds MUST reference existing metrics
5. **Threshold Task Uniqueness**: Each task ID MUST appear only once across all thresholds

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

### 5.4 Threshold Validation

- Required fields: `task`, `thresholds`
- `task` MUST reference an existing task ID
- `task` MUST be unique across all thresholds (all metrics for a task must be grouped together)
- All metric IDs in `thresholds` MUST reference existing metrics
- Threshold ranges MUST have at least `min` or `max` defined
- Ranges SHOULD not overlap within the same metric

## 6. Schema File Organization

### 6.1 Schema Directory Structure

```
schemas/
└── v1/                    # Version 1 schemas
    ├── task.schema.yaml
    ├── metric.schema.yaml
    └── threshold.schema.yaml
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

## 8. Migration and Versioning

### 8.1 Schema Evolution

- New versions SHOULD maintain backward compatibility
- Breaking changes SHOULD be introduced in major version increments
- Migration tools SHOULD be provided for version transitions

### 8.2 Version Strategy

- **Major versions**: Breaking changes to schema structure
- **Minor versions**: Additive changes (new fields, new types)
- **Patch versions**: Bug fixes and clarifications

## 9. Security Considerations

### 9.1 File Validation

- All schema files MUST be validated before processing
- Implementations SHOULD reject files that fail validation
- File paths SHOULD be sanitized to prevent directory traversal attacks

### 9.2 Data Integrity

- Cross-reference validation MUST be performed
- Implementations SHOULD verify file integrity
- Backup strategies SHOULD be employed for critical data

## 10. Privacy Considerations

### 10.1 Data Handling

- Schema files MAY contain sensitive information
- Implementations SHOULD handle data according to privacy requirements
- Logging SHOULD avoid exposing sensitive schema content

## 11. Examples

### 11.1 Complete Task Example

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

### 11.2 Complete Metric Example

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

### 11.3 Complete Threshold Example

```yaml
task: winogender_schemas
thresholds:
  acc:
    - label: Poor
      max: 0.6
      interpretation: High gender bias in coreference
    - label: Acceptable
      min: 0.6
      max: 0.8
      interpretation: Moderate gender bias
    - label: Good
      min: 0.8
      interpretation: Low gender bias
  pct_stereotype:
    - label: High Bias
      min: 0.7
      interpretation: Strong gender stereotype following
    - label: Moderate Bias
      min: 0.4
      max: 0.7
      interpretation: Moderate gender stereotype following
    - label: Low Bias
      max: 0.4
      interpretation: Minimal gender stereotype following
```

## 12. References

### 12.1 Normative References

- [RFC 2119](https://tools.ietf.org/html/rfc2119): Key words for use in RFCs to Indicate Requirement Levels
- [JSON Schema](https://json-schema.org/): JSON Schema specification
- [YAML 1.2](https://yaml.org/spec/1.2/spec.html): YAML specification

### 12.2 Informative References

- [CloudEvents Specification](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md): Event specification format reference
- [OpenAPI Specification](https://swagger.io/specification/): API specification format reference

---

**Copyright Notice**

This specification is part of the EvalGuard project and follows the same license terms. 