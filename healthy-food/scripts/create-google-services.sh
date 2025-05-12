#!/bin/sh

# Define the output path
GOOGLE_SERVICES_PATH="./android/app/google-services.json"

# Check if the environment variable exists
if [ -z "$GOOGLE_SERVICES_JSON" ]; then
  echo "❌ GOOGLE_SERVICES_JSON environment variable is missing."
  exit 1
fi

# Write the environment variable content into google-services.json
echo "$GOOGLE_SERVICES_JSON" > "$GOOGLE_SERVICES_PATH"

echo "✅ google-services.json has been created successfully at $GOOGLE_SERVICES_PATH!"
