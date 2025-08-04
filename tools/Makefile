.PHONY: install build clean dev test help

# Default target
help:
	@echo "EvalGuard CLI - Available commands:"
	@echo ""
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the TypeScript project"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make generate file=<path> - Generate tasks and metrics from lm-eval report"
	@echo "  make generate folder=<path> - Generate tasks and metrics from all JSON files in folder"
	@echo "  make validate   - Validate all config files"
	@echo "  make validate tasks    - Validate task files"
	@echo "  make validate metrics  - Validate metric files"
	@echo "  make validate thresholds - Validate threshold files"
	@echo "  make validate-generate - Validate make generate doesn't create unintended files"
	@echo ""
	@echo "API Model Generation:"
	@echo "  make typescript-models - Generate TypeScript API client"
	@echo "  make java-models      - Generate Java API client"
	@echo "  make java-models version=v2 - Generate Java models from v2 API spec"
	@echo "  make generate-models  - Generate both TypeScript and Java clients"
	@echo "  make clean-models     - Clean generated API models"
	@echo ""

# Install dependencies
install:
	@echo "🔧 Installing dependencies..."
	npm install

# Build the project
build: install
	@echo "🔨 Building TypeScript project..."
	npm run build
	@chmod +x dist/index.js
	@echo "✅ Build complete!"

# Build standalone binary
binary: install
	@echo "🔨 Building standalone binary..."
	npm run binary
	@echo "✅ Binary build complete!"
	@echo "📦 Binaries created in ./bin directory:"
	@ls -la bin/ 2>/dev/null || echo "   (binaries will be created here)"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist
	@echo "✅ Clean complete!"

# Development mode
dev: install
	@echo "🚀 Starting development mode..."
	npm run dev

# Run tests
test: build
	@echo "🧪 Running tests..."
	node test-cli.js



# Generate tasks and metrics from report
generate: build
	@echo "🔧 Generating tasks and metrics from report..."
	@if [ -z "$(file)" ] && [ -z "$(folder)" ]; then \
		echo "❌ Error: Either file or folder parameter is required"; \
		echo "Usage: make generate file=../reports/lm-eval/phi-2.json"; \
		echo "Usage: make generate folder=../reports/lm-eval/"; \
		echo "Example: make generate file=../reports/lm-eval/Llama-3.1-8B-Instruct.json"; \
		echo "Example: make generate folder=../reports/lm-eval/"; \
		exit 1; \
	fi
	@if [ -n "$(file)" ]; then \
		node dist/index.js generate -f $(file); \
	elif [ -n "$(folder)" ]; then \
		node dist/index.js generate -d $(folder); \
	fi

# Validate all config files
validate: build
	@echo "🔍 Validating all config files..."
	node dist/index.js validate

# Validate specific types
validate-%: build
	@echo "🔍 Validating $(subst validate-,,$@) files..."
	node dist/index.js validate -t $(subst validate-,,$@)

# Quick setup for development
setup: install build
	@echo "✅ EvalGuard CLI setup complete!"
	@echo ""
	@echo "Usage examples:"
	@echo "  make typescript-models  # Generate TypeScript API client"
	@echo "  make java-models        # Generate Java API client"
	@echo "  make java-models version=v2  # Generate Java from v2 API spec"
	@echo "  make validate           # Validate all config files"
	@echo "  make validate tasks     # Validate task files"
	@echo "  make validate metrics   # Validate metric files"
	@echo "  make validate thresholds # Validate threshold files"
	@echo "  make validate-generate  # Validate make generate doesn't create unintended files"
	@echo "  make dev               # Run in development mode" 

# --- API Model Generation ---

.PHONY: typescript-models java-models generate-models clean-models install-models

typescript-models:
	cd ../api-models/typescript && npm install && npm run generate$(if $(version), --version $(version)) && npm run build

java-models:
	cd ../api-models/java && mvn clean generate-sources compile -Dapi.version=$(or $(version),v1)

generate-models: typescript-models java-models

install-models:
	cd ../api-models/typescript && npm install
	# Java dependencies are managed by Maven

clean-models:
	rm -rf ../api-models/typescript/dist ../api-models/typescript/src/generated
	rm -rf ../api-models/java/target ../api-models/java/src/main/java/com/evalguard

# Validate that make generate doesn't create unintended files
validate-generate:
	@echo "🔍 Validating make generate doesn't create/modify unintended files..."
	@echo "📸 Storing current Git state..."
	@git status --porcelain > /tmp/before_generate.txt
	@git diff --name-only > /tmp/before_generate_diff.txt
	@echo "🧹 Cleaning previously generated files..."
	@rm -rf ../api-models/typescript/dist ../api-models/typescript/src/generated
	@rm -rf ../api-models/java/target
	@echo "🔨 Running make generate..."
	@make generate-models version=$(or $(version),v1)
	@echo "🔍 Checking for unintended file changes..."
	@git status --porcelain > /tmp/after_generate.txt
	@git diff --name-only > /tmp/after_generate_diff.txt
	@echo "📊 Analyzing file changes..."
	@# Check for new untracked files (excluding expected generated directories)
	@new_files=$$(diff /tmp/before_generate.txt /tmp/after_generate.txt | grep "^+.*" | grep -v "^+++" | cut -c3- | grep -v "api-models/typescript/src/generated/" | grep -v "api-models/java/target/" | grep -v "api-models/typescript/dist/" || true); \
	if [ -n "$$new_files" ]; then \
		echo "❌ make generate created unintended files:"; \
		echo "$$new_files"; \
		exit 1; \
	fi
	@# Check for modified files (excluding timestamps)
	@modified_files=$$(git diff --name-only | grep -v "api-models/typescript/src/generated/" | grep -v "api-models/java/target/" | grep -v "api-models/typescript/dist/" || true); \
	if [ -n "$$modified_files" ]; then \
		echo "❌ make generate modified existing files:"; \
		echo "$$modified_files"; \
		echo ""; \
		echo "Git diff:"; \
		git diff || true; \
		exit 1; \
	fi
	@echo "🔍 Verifying expected generated files..."
	@if [ -d "../api-models/typescript/src/generated" ]; then \
		echo "✅ TypeScript models generated in expected location"; \
		ls -la ../api-models/typescript/src/generated/ | head -5; \
	else \
		echo "❌ TypeScript models not generated"; \
		exit 1; \
	fi
	@if [ -d "../api-models/java/target/generated-sources/openapi" ]; then \
		echo "✅ Java models generated in expected location"; \
		find ../api-models/java/target/generated-sources/openapi -name "*.java" | head -5; \
	else \
		echo "❌ Java models not generated"; \
		exit 1; \
	fi
	@echo "✅ make generate completed successfully without unintended file changes"
	@echo "📊 Summary:"
	@echo "  - No new files created outside expected directories"
	@echo "  - No existing files modified"
	@echo "  - Expected generated files present" 