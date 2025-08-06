# EvalGuard API Models

This directory contains generated API models for both Java and TypeScript, created from the OpenAPI specification.

## Structure

```
api-models/
├── java/                    # Java models (Maven project)
│   ├── pom.xml             # Maven configuration
│   └── README.md           # Java-specific documentation
├── typescript/              # TypeScript models (npm project)
│   ├── package.json        # npm configuration
│   ├── src/                # Source code
│   └── README.md           # TypeScript-specific documentation
└── README.md               # This file
```

## Publishing to GitHub Packages

### Automatic Publishing

The models are automatically published to GitHub Packages when:

1. **Push to main branch** with changes to:
   - `api-models/**` files
   - `schemas/**` files (including guardrails schemas)
   - Workflow files

2. **Manual trigger** via GitHub Actions with custom API version

### Workflows

- **`.github/workflows/publish-api-models.yml`** - Publishes Java and/or TypeScript models with configurable options
- **`.github/workflows/validate-api-models.yml`** - Validates configurations and model generation (runs on PRs and pushes to main)

### Manual Publishing

To manually trigger publishing:

1. Go to the GitHub repository
2. Navigate to **Actions** tab
3. Select **Publish API Models** workflow
4. Click **Run workflow**
5. Configure the options:
   - **version**: API specification version (e.g., `v1`, `v2`)
   - **publish_java**: Whether to publish Java models (default: true)
   - **publish_typescript**: Whether to publish TypeScript models (default: true)
6. Click **Run workflow**

### Published Packages

#### Java (Maven)
- **Group ID**: `com.trustification`
- **Artifact ID**: `evalguard-api-model`
- **Repository**: `https://maven.pkg.github.com/trustification/evalguard`

#### TypeScript (npm)
- **Package**: `@trustification/evalguard-api-model`
- **Registry**: `https://npm.pkg.github.com`

## Validation

The project includes automatic validation that runs on every PR and push to main:

- **Configuration validation**: Checks that all required files exist and are valid
- **Model generation**: Tests that both Java and TypeScript models can be generated
- **Tools validation**: Validates the tools configuration using the existing validate command
- **Guardrails validation**: Validates guardrail configurations and cross-references
- **make generate validation**: Ensures `make generate` doesn't create unintended files or modify configuration files
- **Generated files validation**: Ensures that the generation process produces the expected files

### Manual Validation

```bash
# Validate configurations and generate models
cd api-models/java && mvn validate
cd ../typescript && npm run validate

# Validate tools configuration
cd ../../tools && npm run build && node dist/index.js validate

# Validate make generate doesn't create unintended files
cd ../../tools && make validate-generate version=v1
```

## Local Development

### Java Models

```bash
cd api-models/java
mvn clean generate-sources compile -Dapi.version=v1
```

### TypeScript Models

```bash
cd api-models/typescript
npm install
npm run generate -- --version v1
npm run build
```

## Usage

### Java

```xml
<dependency>
    <groupId>com.trustification</groupId>
    <artifactId>evalguard-api-model</artifactId>
    <version>1.0.0</version>
</dependency>
```

### TypeScript

```bash
npm install @trustification/evalguard-api-model
```

```typescript
import { Task, Report } from '@trustification/evalguard-api-model';
```

## Versioning

The API models support multiple API specification versions:

- **v1**: Current stable API
- **v2**: Future API versions (when available)

The version is specified during generation and publishing, allowing multiple API versions to coexist. 