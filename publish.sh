#!/bin/bash

# Nepali Input Packages - Build and Publish Script
# This script handles building, versioning, and publishing all @verishore packages to npm

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

# Function to check if user is logged in to npm
check_npm_auth() {
    print_status "Checking npm authentication..."
    if ! npm whoami &> /dev/null; then
        print_error "Not logged in to npm. Please run 'npm login' first."
        exit 1
    fi
    local npm_user=$(npm whoami)
    print_success "Logged in to npm as: $npm_user"
}

# Function to check if git working directory is clean
check_git_clean() {
    print_status "Checking git status..."
    if [[ -n $(git status -s) ]]; then
        print_warning "Git working directory is not clean."
        read -p "Continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Aborted by user"
            exit 1
        fi
    else
        print_success "Git working directory is clean"
    fi
}

# Function to get version bump type
get_version_type() {
    echo ""
    echo "Select version bump type:"
    echo "1) patch (1.0.0 -> 1.0.1)"
    echo "2) minor (1.0.0 -> 1.1.0)"
    echo "3) major (1.0.0 -> 2.0.0)"
    echo "4) custom"
    echo "5) skip version bump"
    read -p "Enter choice [1-5]: " choice

    case $choice in
        1) echo "patch" ;;
        2) echo "minor" ;;
        3) echo "major" ;;
        4)
            read -p "Enter custom version (e.g., 1.2.3): " custom_version
            echo "custom:$custom_version"
            ;;
        5) echo "skip" ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Function to bump version in package.json
bump_version() {
    local package_dir=$1
    local version_type=$2

    cd "$package_dir"

    if [[ $version_type == custom:* ]]; then
        local new_version=${version_type#custom:}
        npm version "$new_version" --no-git-tag-version
    elif [[ $version_type != "skip" ]]; then
        npm version "$version_type" --no-git-tag-version
    fi

    cd - > /dev/null
}

# Function to build all packages
build_packages() {
    print_status "Building all packages..."

    if ! pnpm install; then
        print_error "Failed to install dependencies"
        exit 1
    fi

    if ! pnpm -r --filter './packages/*' build; then
        print_error "Failed to build packages"
        exit 1
    fi

    print_success "All packages built successfully"
}

# Function to publish a package
publish_package() {
    local package_dir=$1
    local package_name=$(basename "$package_dir")

    print_status "Publishing @verishore/$package_name..."

    cd "$package_dir"

    # Check if dist directory exists
    if [[ ! -d "dist" ]]; then
        print_error "dist directory not found in $package_name. Build first!"
        cd - > /dev/null
        return 1
    fi

    # Publish to npm
    if npm publish --access public; then
        print_success "Published @verishore/$package_name"
        cd - > /dev/null
        return 0
    else
        print_error "Failed to publish @verishore/$package_name"
        cd - > /dev/null
        return 1
    fi
}

# Function to create git tag and push
git_tag_and_push() {
    local version=$1

    print_status "Creating git commit and tag..."

    git add .
    git commit -m "Release v$version" || true
    git tag "v$version"

    read -p "Push to remote? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin main
        git push origin "v$version"
        print_success "Pushed to remote"
    else
        print_warning "Skipped git push"
    fi
}

# Main script
main() {
    echo ""
    echo "=========================================="
    echo "  @verishore Packages - Publish Script"
    echo "=========================================="
    echo ""

    # Get project root directory
    SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    cd "$SCRIPT_DIR"

    # Check prerequisites
    check_npm_auth
    check_git_clean

    # Ask for version bump
    VERSION_TYPE=$(get_version_type)

    # Package directories
    PACKAGES=(
        "packages/nepali-input"
        "packages/nepali-react"
        "packages/nepali-vue"
        "packages/nepali-svelte"
        "packages/nepali-angular"
    )

    # Bump versions if not skipped
    if [[ $VERSION_TYPE != "skip" ]]; then
        print_status "Bumping package versions..."
        for pkg in "${PACKAGES[@]}"; do
            bump_version "$pkg" "$VERSION_TYPE"
            print_success "Version bumped: $pkg"
        done
    fi

    # Build packages
    build_packages

    # Confirm before publishing
    echo ""
    print_warning "About to publish the following packages to npm:"
    for pkg in "${PACKAGES[@]}"; do
        local package_name=$(basename "$pkg")
        local version=$(node -p "require('./$pkg/package.json').version")
        echo "  - @verishore/$package_name@$version"
    done
    echo ""
    read -p "Continue with publishing? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Aborted by user"
        exit 1
    fi

    # Publish packages
    echo ""
    FAILED_PACKAGES=()
    for pkg in "${PACKAGES[@]}"; do
        if ! publish_package "$pkg"; then
            FAILED_PACKAGES+=("$pkg")
        fi
    done

    # Summary
    echo ""
    echo "=========================================="
    echo "  Publishing Summary"
    echo "=========================================="

    if [[ ${#FAILED_PACKAGES[@]} -eq 0 ]]; then
        print_success "All packages published successfully!"

        # Create git tag if version was bumped
        if [[ $VERSION_TYPE != "skip" ]]; then
            local version=$(node -p "require('./packages/nepali-input/package.json').version")
            git_tag_and_push "$version"
        fi
    else
        print_error "Failed to publish the following packages:"
        for pkg in "${FAILED_PACKAGES[@]}"; do
            echo "  - $pkg"
        done
        exit 1
    fi

    echo ""
    print_success "Done! Your packages are now live on npm."
    echo ""
}

# Run main function
main "$@"
