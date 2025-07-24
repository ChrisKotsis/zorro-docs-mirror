#!/bin/bash
# Zorro Documentation Update Script
# Run this script to update the documentation with latest changes

echo "🔄 Updating Zorro Documentation..."

# Backup current version
if [ -d "zorro-docs-output" ]; then
  echo "📦 Backing up current documentation..."
  mv zorro-docs-output "zorro-docs-backup-$(date +%Y%m%d-%H%M%S)"
fi

# Run the crawler
echo "🕷️  Running documentation crawler..."
node crawler-complete.js

# Check if successful
if [ $? -eq 0 ]; then
  echo "✅ Documentation updated successfully!"
  echo "📁 Output location: ./zorro-docs-output"
  
  # If in a git repo, show what changed
  if [ -d ".git" ]; then
    echo ""
    echo "📝 Changes detected:"
    git status --short zorro-docs-output/
  fi
else
  echo "❌ Update failed. Check the error messages above."
  exit 1
fi
