#!/bin/bash

# Nepali Input Packages - Build Script
# This script builds all packages and optionally runs the demo

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Get project root directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

print_status "Installing dependencies..."
pnpm install

print_status "Building all packages..."
pnpm -r --filter './packages/*' build

print_success "All packages built successfully!"

echo ""
echo "Package sizes:"
find packages -name "dist" -type d -exec sh -c '
    pkg=$(dirname {})
    pkg_name=$(basename $pkg)
    size=$(du -sh {} | cut -f1)
    echo "  - @verishore/$pkg_name: $size"
' \;

echo ""
echo "To run the demo:"
echo "  cd demo && pnpm dev"
echo ""
echo "To publish packages:"
echo "  ./publish.sh"
