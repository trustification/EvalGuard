#!/bin/bash

# Publish API Models Script
# This script helps test the publishing process locally

set -e

# Default values
API_VERSION=${1:-v1}
PUBLISH_TYPE=${2:-both}

echo "Publishing API models for version: $API_VERSION"
echo "Publish type: $PUBLISH_TYPE"

# Function to publish Java models
publish_java() {
    echo "📦 Publishing Java models..."
    cd api-models/java
    mvn clean generate-sources compile -Dapi.version=$API_VERSION
    echo "✅ Java models built successfully"
    echo "Note: To actually publish to GitHub Packages, run:"
    echo "  mvn deploy -Dapi.version=$API_VERSION"
}

# Function to publish TypeScript models
publish_typescript() {
    echo "📦 Publishing TypeScript models..."
    cd api-models/typescript
    npm install
    npm run generate -- --version $API_VERSION
    npm run build
    echo "✅ TypeScript models built successfully"
    echo "Note: To actually publish to GitHub Packages, run:"
    echo "  npm publish"
}

# Main execution
case $PUBLISH_TYPE in
    "java")
        publish_java
        ;;
    "typescript")
        publish_typescript
        ;;
    "both")
        publish_java
        echo ""
        publish_typescript
        ;;
    *)
        echo "Usage: $0 [version] [type]"
        echo "  version: API version (default: v1)"
        echo "  type: java|typescript|both (default: both)"
        exit 1
        ;;
esac

echo ""
echo "🎉 Model generation completed!"
echo ""
echo "To publish to GitHub Packages:"
echo "1. For Java: cd api-models/java && mvn deploy"
echo "2. For TypeScript: cd api-models/typescript && npm publish"
echo ""
echo "Or use the GitHub Actions workflow for automatic publishing:"
echo "  - Go to Actions > Publish API Models"
echo "  - Configure version and which models to publish" 