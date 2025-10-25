#!/usr/bin/env sh

set -e

GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_info "Linting..."
bunx biome ci

log_info "Typechecking..."
bunx tsc --noEmit

log_info "Lint Dockerfile..."
docker run --rm -i hadolint/hadolint < Dockerfile
