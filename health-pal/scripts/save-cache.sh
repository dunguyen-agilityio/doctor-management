#!/bin/bash
CACHE_DIR="$HOME/cache"
PROJECT_DIR="$PWD"

if [ ! -d "$CACHE_DIR/node_modules" ]; then
  echo "[CACHE] Creating node_modules cache folder"
  mkdir -p "$CACHE_DIR/node_modules"
fi

if [ ! -d "$CACHE_DIR/gradle" ]; then
  echo "[CACHE] Creating gradle cache folder"
  mkdir -p "$CACHE_DIR/gradle"
fi


echo "Saving node_modules to cache..."
cp -r "$PROJECT_DIR/node_modules" "$CACHE_DIR/node_modules"

# echo "Saving Gradle cache..."
# cp -r "$HOME/.gradle" "$CACHE_DIR/gradle"

# echo "Saving Android build outputs..."
# cp -r "$PROJECT_DIR/android/app/build" "$CACHE_DIR/android/app/build"