# Zorro Documentation Crawler

This tool crawls and converts the Zorro Trading Platform documentation into a GitHub-friendly format suitable for Context7 integration.

**Repository Location**: `/mnt/c/ats/public-repos/zorro-docs-crawler`

## 🤖 Automated Daily Updates

This crawler is configured for automated daily updates. See [automation/SETUP_INSTRUCTIONS.md](automation/SETUP_INSTRUCTIONS.md) for setup details.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Internet connection

## Installation

```bash
npm install
```

## Quick Start

```bash
# Navigate to the repository
cd /mnt/c/ats/public-repos/zorro-docs-crawler

# Install dependencies
npm install

# Run the crawler with images
node crawler-complete.js

# Check crawler health
node automation/check-health.js
```

## Usage

### 1. Test the Crawler

First, test on a single page to ensure everything works:

```bash
node test-crawler.js
```

### 2. Run the Full Crawler

To crawl the entire documentation:

```bash
node crawler-v2.js
```

This will:
- Fetch the table of contents from https://zorro-project.com/manual/toc.php
- Download each documentation page
- Convert HTML to clean Markdown
- Create a structured output in `./zorro-docs-output/`
- Generate navigation files (SUMMARY.md)
- Create a context7.json configuration

### 3. Review the Output

Check the generated files in `./zorro-docs-output/`:
- `README.md` - Main documentation readme
- `SUMMARY.md` - Navigation structure
- `context7.json` - Context7 configuration
- `docs/` - All documentation pages in Markdown

## Important: Get Permission First!

**DO NOT** publish the documentation without permission from Zorro's creator. Use the provided email template in `email-template.md`.

## After Getting Permission

1. Create a new GitHub repository (e.g., `zorro-docs-mirror`)
2. Copy the contents of `./zorro-docs-output/` to the repository
3. Commit and push to GitHub
4. Go to https://context7.com/add-package
5. Submit your GitHub repository URL

## Features

- Respectful crawling with rate limiting
- Preserves documentation structure
- Converts code blocks with syntax highlighting
- Generates navigation
- Creates Context7-compatible structure
- Handles special characters and long filenames

## Troubleshooting

If the crawler fails:
- Check your internet connection
- Ensure the Zorro manual website is accessible
- Review error messages in the console
- Try reducing MAX_CONCURRENT in crawler-v2.js

## License

This crawler tool is provided as-is. The Zorro documentation remains the property of the Zorro Project / oP group Germany.