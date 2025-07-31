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

## Repository Structure

```text
evalguard/
├── schemas/           # JSON Schemas defining structure of tasks, metrics, and reports
│   ├── task.schema.json
│   ├── metric.schema.json
│   └── report.schema.json
├── configs/           # Configurable metadata for interpretation
│   ├── tasks/
│   ├── metrics/
│   └── thresholds/
├── reports/           # Community-contributed model evaluation reports
│   └── gpt-4-openreport.yaml
├── LICENSE
├── NOTICE
└── README.md
