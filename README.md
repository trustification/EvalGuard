# EvalGuard

**EvalGuard** is an open metadata and schema repository for organizing, interpreting, and standardizing the evaluation of large language models (LLMs). It provides configurable schema definitions, metric descriptions, task annotations, and interpretability thresholds to support reproducible and meaningful evaluation practices.

EvalGuard is **tool-agnostic** but compatible with evaluation outputs from systems such as:
- [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)
- Hugging Face `evaluate`
- Custom or enterprise evaluation pipelines

> EvalGuard does not perform evaluations itself. Instead, it serves as a **structured reference** for interpreting model evaluation data and aligning it with categories, tags, thresholds, and recommended guardrails.

---

## What EvalGuard Provides

- **REST API specification** for accessing evaluation data
- **Schemas** for evaluation reports, tasks, metrics, policies, and guardrails
- **Configuration files** for model descriptions, task definitions, metric types, and operational guardrails
- **CLI tools** for schema validation, data generation, and API model generation

This enables:
- Consistent comparison across evaluations
- Configurable guidance on model strengths and limitations
- Operational guardrails and policy frameworks
- Risk mitigation and quality enforcement

---

## Repository Structure

```text
evalguard/
├── schemas/           # Schema definitions (see SPECIFICATION.md)
│   └── v1/           # Version 1 schemas
├── config/            # Configuration files for interpretation
│   ├── tasks/         # Task definitions and metadata
│   ├── metrics/       # Metric definitions and types
│   ├── policies/      # Policy definitions with embedded thresholds
│   └── guardrails/    # Operational guardrails and policies
├── reports/           # Community-contributed model evaluation reports
├── tools/             # CLI tool for schema management
├── api-models/        # Generated language-specific models
├── SPECIFICATION.md   # Complete schema specification
└── README.md
```

---

## Key Concepts

### Policies
Policies define evaluation contexts and performance thresholds. They group related thresholds and evaluation criteria, with thresholds embedded within policy definitions.

### Guardrails
Guardrails define operational constraints and policies for model deployment, helping mitigate risks and enforce quality standards.

### Model Cards
Comprehensive documentation of a model's capabilities and evaluation results, with evaluation results contextualized by policy.

---

## Specification

The EvalGuard schema system is formally defined in the [**EvalGuard Schema Specification**](SPECIFICATION.md). This specification provides:

- **Schema Definitions**: Formal definitions for tasks, metrics, thresholds, and reports
- **Validation Rules**: Comprehensive validation requirements and constraints
- **File Organization**: Schema versioning and file structure guidelines
- **Implementation Requirements**: Conformance requirements for implementations
- **API Specification**: Complete REST API interface definition
- **Examples**: Detailed configuration examples and usage patterns

The specification follows industry standards and uses RFC 2119 terminology for clarity and precision.

---

## API Usage

EvalGuard defines a REST API specification for accessing evaluation data. The API supports filtering by model, task, metric, and policy context.

```bash
# Get reports for a specific model
curl "https://api.evalguard.org/v1/reports?model_name=meta-llama/Llama-3.1-8B-Instruct"

# Get model card with specific policy evaluation results
curl "https://api.evalguard.org/v1/models/llama-3.1-8b-instruct/card?policy_id=default"

# Get policies with embedded thresholds
curl "https://api.evalguard.org/v1/policies?tasks=truthfulqa_mc1,winogender_schemas"
```

> **Note**: This is a **specification only**. The API is not implemented in this repository. Anyone interested in providing EvalGuard API services can implement this specification.

---

## Contributing

EvalGuard thrives on community contributions! We welcome contributions of evaluation reports, configuration files, and improvements to the schemas and tools.

### Contributing Evaluation Reports

#### Report Format
Reports must follow the directory structure:
```
reports/<model_org>/<model_name>/<report_format>/report.json
```

**Example**: `reports/meta-llama/Llama-3.1-8B-Instruct/lm-eval/report.json`

#### Supported Formats
- **lm-evaluation-harness** (`lm-eval`): Currently supported with full CLI integration
- **Other formats**: If you have evaluation reports in other formats, please create an issue to discuss integration

#### Adding Missing Data
When adding a new report, you can use the CLI to automatically generate missing tasks, models, and metrics but bear
in mind that some fields will not be filled like friendly name or description so take some time to review what is missing:

```bash
# Generate missing configuration from a single report
evalguard lm-eval gen -f report.json

# Generate missing configuration from multiple reports in a directory
evalguard lm-eval gen -d reports/
```

This will create the necessary configuration files in the appropriate `config/` subdirectories.

#### Ready to Contribute?
**🚀 Create a Pull Request** using our [Report Contribution Template](.github/report_template.md) to submit your evaluation reports!

The template will guide you through:
- Proper report structure and format
- Configuration generation and validation
- Quality assurance steps
- Required checklist items

Simply copy the template content when creating your PR to ensure all requirements are met.

### Contributing Configuration Files

#### Adding New Configurations
You can add new configuration files directly to the appropriate folders:

- **Tasks**: `config/tasks/` - Task definitions and metadata
- **Metrics**: `config/metrics/` - Metric definitions and types  
- **Policies**: `config/policies/` - Policy definitions with embedded thresholds
- **Guardrails**: `config/guardrails/` - Operational guardrails and policies

#### Validation
Always validate your contributions using the CLI:

```bash
# Validate all configuration files
evalguard config validate

# Validate specific types
evalguard config validate -t tasks
evalguard config validate -t metrics
evalguard config validate -t policies
evalguard config validate -t guardrails
```

#### Schema Compliance
All configuration files must follow the schemas defined in `schemas/v1/`. See [SPECIFICATION.md](SPECIFICATION.md) for detailed schema definitions and examples.

#### Ready to Contribute Configurations?
**⚙️ Create a Pull Request** using our [Configuration Update Template](.github/config_template.md) to submit your configuration changes!

The template will guide you through:
- Proper configuration file structure
- Validation and schema compliance
- Quality assurance for configuration updates
- Required checklist items

Simply copy the template content when creating your PR to ensure all requirements are met.

---

## Quick Start

### Installation

```bash
# Install dependencies and build standalone binary
cd tools
# Build binaries for multiple platforms
make package
# Available platforms: macOS, Linux, Windows
# Output: bin/evalguard-{platform}

# Move the binary to a convenient location and add to PATH
# For macOS:
cp bin/evalguard-macos ~/.local/bin/evalguard
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# For Linux:
cp bin/evalguard-linux ~/.local/bin/evalguard
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# For Windows (PowerShell):
# Copy evalguard-win.exe to a directory in your PATH
# Or add the bin directory to your system PATH
```

### Basic Usage

```bash
# Validate all configuration files
evalguard config validate

# Validate specific types
evalguard config validate -t tasks
evalguard config validate -t metrics
evalguard config validate -t policies
evalguard config validate -t guardrails

# Generate tasks/metrics/model_info from evaluation reports
evalguard lm-eval gen -f report.json
evalguard lm-eval gen -d reports/

# Generate API models from schemas
evalguard api gen --type js --spec-version v1
```

---

## Documentation

- **[SPECIFICATION.md](SPECIFICATION.md)**: Complete schema specification with detailed examples
- **[tools/README.md](tools/README.md)**: CLI tool development and usage details
- **[api-models/](api-models/)**: Generated language-specific models and usage examples
