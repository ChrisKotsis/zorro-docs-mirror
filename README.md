# Zorro Documentation Crawler

Downloads and converts the Zorro Trading Platform documentation from https://zorro-project.com/manual/ into self-contained HTML files for offline use.

## Quick Start

### Option 1: Markdown Format (Recommended for LLM use)

```bash
# Complete pipeline: Download HTML + Convert to Markdown
./update-docs-to-markdown.sh
```

This will:
- Download all documentation pages from zorro-project.com
- Download all images
- Convert HTML to clean Markdown format
- Create outputs in `./zorro-docs-markdown/` (Markdown) and `./zorro-docs-output/` (HTML)
- Optionally copy to `~/ats/docs/06-zorro-markdown/` and `~/ats/docs/06-zorro/`

### Option 2: HTML Only

```bash
# Download HTML documentation only
./update-docs.sh
```

This will:
- Download all documentation pages from zorro-project.com
- Download all images
- Create self-contained HTML files in `./zorro-docs-output/`
- Optionally copy to `~/ats/docs/06-zorro/`

## Manual Usage

### Prerequisites

- Node.js 18+ installed
- npm
- Internet connection

### Installation

```bash
npm install
```

### Update Documentation

```bash
# Complete pipeline: HTML + Markdown conversion
./update-docs-to-markdown.sh

# Or download HTML only
node crawler-complete.js

# Convert existing HTML to Markdown
python3 convert-to-markdown.py zorro-docs-output zorro-docs-markdown

# Basic crawler (docs only, no images)
node crawler-v2.js

# Test on single page
node test-crawler.js
```

## Output Structure

### HTML Output
```
zorro-docs-output/
├── content/       # All documentation HTML files
├── images/        # All diagrams and screenshots
├── index.html     # Main documentation index
└── doc_index.json # Searchable documentation index
```

### Markdown Output (for LLM consumption)
```
zorro-docs-markdown/
├── content/       # All documentation in Markdown format
├── images/        # All diagrams and screenshots (copied)
└── index.md       # Main documentation index
```

## Scripts

### Main Scripts
- **`update-docs-to-markdown.sh`** - Complete pipeline (HTML + Markdown) ⭐ RECOMMENDED
- **`update-docs.sh`** - HTML only update
- **`convert-to-markdown.py`** - Convert HTML to Markdown

### Node.js Crawlers
- **`crawler-complete.js`** - Main crawler (downloads everything)
- **`crawler-v2.js`** - Basic version (HTML only)
- **`crawler-with-images.js`** - Downloads docs + images separately
- **`test-crawler.js`** - Test single page

## Features

- ✅ Downloads all 276 documentation pages
- ✅ Downloads all images with original filenames
- ✅ Creates self-contained offline documentation
- ✅ Respects rate limiting (polite crawling)
- ✅ Progress tracking
- ✅ Error recovery

## Updating Your Offline Docs

### For LLM Use (Recommended)

```bash
cd ~/ats/zorro-docs-mirror
./update-docs-to-markdown.sh
```

The script will:
1. Backup existing docs (HTML and Markdown)
2. Download latest HTML from zorro-project.com
3. Convert HTML to clean Markdown
4. Offer to copy to `~/ats/docs/06-zorro-markdown/` (Markdown) and `~/ats/docs/06-zorro/` (HTML)

### For HTML Only

```bash
cd ~/ats/zorro-docs-mirror
./update-docs.sh
```

The script will:
1. Backup existing docs
2. Download latest from zorro-project.com
3. Offer to copy to ~/ats/docs/06-zorro/

## Notes

- First run will take 5-10 minutes (downloads ~276 files + images)
- Subsequent runs are faster (only updates changed files)
- Respects zorro-project.com server with rate limiting
- Output is fully self-contained (works offline)

## Troubleshooting

**If download fails:**
- Check internet connection
- Verify zorro-project.com is accessible
- Try reducing concurrent downloads in crawler-complete.js

**If images are missing:**
- Run: `node download-images-fixed.js`
- Or rerun: `node crawler-complete.js`

## License

Crawler tool is provided as-is. Zorro documentation © oP group Germany.
