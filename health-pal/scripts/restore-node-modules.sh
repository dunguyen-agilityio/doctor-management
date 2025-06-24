#!/bin/bash
CACHE_DIR="~/cache"
PROJECT_DIR="$PWD"

if [ -d "$CACHE_DIR/node_modules" ]; then
  echo "Restoring node_modules cache..."
  cp -r "$CACHE_DIR/node_modules" "$PROJECT_DIR/node_modules"
else
  echo "No node_modules cache found."
fi