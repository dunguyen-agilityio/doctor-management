#!/bin/bash
CACHE_DIR="~/cache"
PROJECT_DIR="$PWD"

echo "Saving node_modules to cache..."
cp -r "$PROJECT_DIR/node_modules" "$CACHE_DIR/node_modules"

echo "Saving Gradle cache..."
cp -r "$HOME/.gradle" "$CACHE_DIR/gradle"

echo "Saving Android build outputs..."
cp -r "$PROJECT_DIR/android/app/build" "$CACHE_DIR/android/app/build"