# Zorro Documentation Mirror - Public Repository Setup Guide

## Overview

This repository automatically mirrors the Zorro Trading Platform documentation daily, making it available for offline use and integration with modern documentation tools.

## Quick Start

### 1. Create GitHub Repository

```bash
# Create a new public repository on GitHub
# Repository name: zorro-docs-mirror

# Clone this repository
cd /mnt/c/ats/public-repos/
git clone https://github.com/YOUR_USERNAME/zorro-docs-mirror.git

# Copy the crawler files
cp -r zorro-docs-crawler/* zorro-docs-mirror/
cd zorro-docs-mirror

# Initialize git
git init
git add .
git commit -m "Initial commit: Zorro documentation crawler"
git remote add origin https://github.com/YOUR_USERNAME/zorro-docs-mirror.git
git push -u origin main
```

### 2. Enable GitHub Actions

The repository includes a GitHub Actions workflow that:
- Runs daily at 2 AM UTC
- Downloads all documentation and images
- Commits changes automatically
- Creates issues if crawling fails

No additional setup needed - just push to GitHub and Actions will be enabled automatically.

### 3. First Run

To trigger the first documentation crawl:
1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Select "Daily Zorro Documentation Update"
4. Click "Run workflow" button

## Alternative: Local Automation

If you prefer to run the crawler locally and push changes:

### Windows (Task Scheduler)
```powershell
cd C:\ats\public-repos\zorro-docs-crawler
.\automation\setup-windows-task.ps1
```

### Linux/macOS (Cron)
```bash
crontab -e
# Add this line:
0 2 * * * cd /mnt/c/ats/public-repos/zorro-docs-crawler && ./automation/update-docs.sh
```

## How It Works

1. **Daily Crawl**: The crawler runs automatically every day
2. **Smart Updates**: Only commits when documentation changes
3. **Image Support**: Downloads all images with correct filenames
4. **Resume Support**: Can resume if interrupted
5. **Error Handling**: Creates GitHub issues on failure

## Repository Structure

```
zorro-docs-mirror/
├── .github/workflows/     # GitHub Actions automation
├── automation/            # Local automation scripts
├── zorro-docs-output/     # Generated documentation
│   ├── docs/             # Markdown files
│   ├── images/           # Downloaded images
│   ├── README.md         # Documentation index
│   ├── SUMMARY.md        # Table of contents
│   └── context7.json     # Integration config
├── crawler-complete.js    # Main crawler script
└── package.json          # Dependencies
```

## Configuration

### Customize Schedule

Edit `.github/workflows/daily-update.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # Change this to your preferred time
```

### Manual Updates

```bash
# Install dependencies
npm install

# Run crawler
node crawler-complete.js

# Commit and push
git add .
git commit -m "docs: Update Zorro documentation"
git push
```

## Monitoring

### GitHub Actions
- Check Actions tab for run history
- Failed runs create GitHub issues automatically

### Local Logs
- Location: `./logs/`
- Rotation: 30 days
- Check health: `node automation/check-health.js`

## Integration

The generated documentation in `zorro-docs-output/` includes:
- **context7.json**: For Context7 integration
- **SUMMARY.md**: GitBook-style table of contents
- **Markdown files**: Clean, portable documentation
- **Images**: All diagrams and screenshots

## License

This crawler is provided as-is for educational and archival purposes. The Zorro documentation remains the property of oP group Germany.

## Contributing

Issues and pull requests welcome! Please ensure:
1. The crawler remains respectful of server resources
2. No copyright content is modified
3. Attribution to original source is maintained

## Troubleshooting

### Common Issues

**Crawler fails with 404 errors**
- The Zorro website structure may have changed
- Open an issue with the error details

**Images not downloading**
- Check `failed-image-downloads.json` for details
- Some images may require authentication

**Git push fails**
- Ensure you have write access to the repository
- Check your Git credentials

### Getting Help

1. Check the logs in `./logs/`
2. Run health check: `node automation/check-health.js`
3. Open an issue with:
   - Error message
   - Log output
   - Steps to reproduce