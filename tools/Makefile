.PHONY: install build clean dev test help

# Default target
help:
	@echo "EvalGuard CLI - Available commands:"
	@echo ""
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the TypeScript project"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make dev        - Run in development mode"
	@echo "  make test       - Run tests"
	@echo "  make model      - Generate TypeScript models from schemas"
	@echo "  make generate file=<path> - Generate tasks and metrics from lm-eval report"
	@echo "  make generate folder=<path> - Generate tasks and metrics from all JSON files in folder"
	@echo "  make validate   - Validate all config files"
	@echo "  make validate tasks    - Validate task files"
	@echo "  make validate metrics  - Validate metric files"
	@echo "  make validate thresholds - Validate threshold files"
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

# Generate TypeScript models
model: build
	@echo "📝 Generating TypeScript models..."
	node dist/index.js model

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
	@echo "  make model              # Generate TypeScript models"
	@echo "  make validate           # Validate all config files"
	@echo "  make validate tasks     # Validate task files"
	@echo "  make validate metrics   # Validate metric files"
	@echo "  make validate thresholds # Validate threshold files"
	@echo "  make dev               # Run in development mode" 