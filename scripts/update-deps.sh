#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "🔄 Updating dependencies in all apps and packages..."

# Update apps
for dir in "$ROOT_DIR"/apps/*/; do
  if [ -f "$dir/package.json" ]; then
    echo "📦 Updating $(basename "$dir") (apps)..."
    (cd "$dir" && ncu -u)
  fi
done

# Update packages
for dir in "$ROOT_DIR"/packages/*/; do
  if [ -f "$dir/package.json" ]; then
    echo "📦 Updating $(basename "$dir") (packages)..."
    (cd "$dir" && ncu -u)
  fi
done

# Update root
echo "📦 Updating root package.json..."
(cd "$ROOT_DIR" && ncu -u)

# Install all dependencies
echo "📥 Installing dependencies..."
(cd "$ROOT_DIR" && npm i)

echo "✅ All dependencies updated!"
