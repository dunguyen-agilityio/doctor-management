#!/bin/bash
CACHE_DIR="~/cache"
PROJECT_DIR="$PWD"

if [ -d "$CACHE_DIR/gradle" ]; then
  echo "Restoring Gradle cache..."
  cp -r "$CACHE_DIR/gradle" "$HOME/.gradle"
else
  echo "No Gradle cache found."
fi

if [ -d "$CACHE_DIR/android/app/build" ]; then
  echo "Restoring Android build outputs..."
  cp -r "$CACHE_DIR/android/app/build" "$PROJECT_DIR/android/app/build"
else
  echo "No Android build cache found."
fi