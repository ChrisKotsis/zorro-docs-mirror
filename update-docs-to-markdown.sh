#!/bin/bash
# Complete Zorro Documentation Update Pipeline
# Downloads HTML docs and converts to Markdown for LLM consumption

set -e

echo "🔄 Zorro Documentation Update Pipeline"
echo "======================================="
echo ""

# Navigate to script directory
cd "$(dirname "$0")"

# Step 1: Check dependencies
echo "📋 Step 1: Checking dependencies..."
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python3 not found"
    exit 1
fi

# Check Python packages (use venv if available)
if [ -f ".venv/bin/python3" ]; then
    PYTHON=".venv/bin/python3"
else
    PYTHON="python3"
fi

if ! $PYTHON -c "import bs4, html2text" 2>/dev/null; then
    echo "📦 Installing Python dependencies..."
    if [ -f ".venv/bin/pip" ]; then
        .venv/bin/pip install beautifulsoup4 html2text lxml
    else
        pip install beautifulsoup4 html2text lxml
    fi
fi

echo "✅ All dependencies OK"
echo ""

# Step 2: Backup existing files
echo "📦 Step 2: Backing up existing documentation..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

if [ -d "zorro-docs-output" ]; then
    mv zorro-docs-output "zorro-docs-backup-html-$TIMESTAMP"
    echo "   Backed up HTML to: zorro-docs-backup-html-$TIMESTAMP"
fi

if [ -d "zorro-docs-markdown" ]; then
    mv zorro-docs-markdown "zorro-docs-backup-md-$TIMESTAMP"
    echo "   Backed up Markdown to: zorro-docs-backup-md-$TIMESTAMP"
fi
echo ""

# Step 3: Install Node dependencies
if [ ! -d "node_modules" ]; then
    echo "📥 Step 3: Installing Node.js dependencies..."
    npm install
    echo ""
fi

# Step 4: Download HTML documentation
echo "🕷️  Step 4: Downloading documentation from zorro-project.com..."
echo "   This will take 5-10 minutes..."
echo ""

node crawler-complete.js

if [ $? -ne 0 ]; then
    echo "❌ Crawler failed. Check errors above."
    exit 1
fi

echo ""
echo "✅ HTML documentation downloaded"
echo ""

# Step 5: Convert to Markdown
echo "📝 Step 5: Converting HTML to Markdown..."
echo ""

$PYTHON convert-to-markdown.py zorro-docs-output zorro-docs-markdown

if [ $? -ne 0 ]; then
    echo "❌ Conversion failed. Check errors above."
    exit 1
fi

echo ""

# Step 6: Generate statistics
echo "📊 Step 6: Documentation Statistics"
echo "===================================="

HTML_COUNT=$(find zorro-docs-output -name "*.htm" -o -name "*.html" | wc -l)
MD_COUNT=$(find zorro-docs-markdown -name "*.md" | wc -l)
IMG_COUNT=$(find zorro-docs-markdown/images -type f 2>/dev/null | wc -l || echo 0)

echo "   HTML files: $HTML_COUNT"
echo "   Markdown files: $MD_COUNT"
echo "   Images: $IMG_COUNT"
echo ""

# Step 7: Copy to target locations
echo "📋 Step 7: Copying to target locations..."
echo ""

# Copy HTML to docs/06-zorro (existing location)
if [ -d ~/ats/docs/06-zorro ]; then
    read -p "   Copy HTML to ~/ats/docs/06-zorro/? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rsync -av --delete zorro-docs-output/ ~/ats/docs/06-zorro/
        echo "   ✅ HTML copied to ~/ats/docs/06-zorro/"
    fi
fi

# Copy Markdown to new location
if [ ! -d ~/ats/docs/06-zorro-markdown ]; then
    mkdir -p ~/ats/docs/06-zorro-markdown
fi

read -p "   Copy Markdown to ~/ats/docs/06-zorro-markdown/? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rsync -av --delete zorro-docs-markdown/ ~/ats/docs/06-zorro-markdown/
    echo "   ✅ Markdown copied to ~/ats/docs/06-zorro-markdown/"
fi

echo ""
echo "🎉 Complete! Documentation updated successfully"
echo ""
echo "📁 Locations:"
echo "   HTML:     ./zorro-docs-output/"
echo "   Markdown: ./zorro-docs-markdown/"
echo "   Target:   ~/ats/docs/06-zorro-markdown/"
echo ""
echo "💡 The Markdown version is optimized for LLM consumption"
