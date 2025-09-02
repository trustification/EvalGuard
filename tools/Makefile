.PHONY: install build clean dev test test-coverage test-watch package help

# Default target
help:
	@echo "EvalGuard CLI - Build Commands:"
	@echo ""
	@echo "  make install       - Install dependencies"
	@echo "  make build         - Build the TypeScript project"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make dev           - Run in development mode"
	@echo "  make test          - Run tests"
	@echo "  make test-coverage - Run tests with coverage"
	@echo "  make test-watch    - Run tests in watch mode"
	@echo "  make package       - Build standalone binary"
	@echo ""
	@echo "CLI Usage Examples:"
	@echo "  evalguard config validate           # Validate all config files"
	@echo "  evalguard config validate tasks     # Validate task files"
	@echo "  evalguard lm-eval gen --file <path> # Generate from report"
	@echo "  evalguard api gen --type js         # Generate API models"
	@echo "  evalguard api --help                # API commands"
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
package: install
	@echo "🔨 Building standalone binary..."
	npm run binary
	@echo "✅ Binary build complete!"
	@echo "📦 Binaries created in ./bin directory:"
	@ls -la bin/ 2>/dev/null || echo "   (binaries will be created here)"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist bin
	@echo "✅ Clean complete!"

# Development mode
dev: install
	@echo "🚀 Starting development mode..."
	npm run dev

# Run tests
test: build
	@echo "🧪 Running tests..."
	npm test

# Run tests with coverage
test-coverage: build
	@echo "🧪 Running tests with coverage..."
	npm run test:coverage

# Run tests in watch mode
test-watch: build
	@echo "🧪 Running tests in watch mode..."
	npm run test:watch

# Quick setup for development
setup: install build
	@echo "✅ EvalGuard CLI setup complete!"
	@echo ""
	@echo "Usage examples:"
	@echo "  evalguard config validate           # Validate all config files"
	@echo "  evalguard config validate tasks     # Validate task files"
	@echo "  evalguard lm-eval gen --file <path> # Generate from report"
	@echo "  evalguard api gen --type js         # Generate API models"
	@echo "  evalguard api --help                # API commands"
	@echo "  evalguard dev                       # Run in development mode"
	@echo ""
	@echo "Testing:"
	@echo "  make test                           # Run all tests"
	@echo "  make test-coverage                  # Run tests with coverage"
	@echo "  make test-watch                     # Run tests in watch mode" 

 