# Zorro Documentation Crawler - Automation Setup

This guide explains how to set up automated daily updates for the Zorro documentation crawler.

## Prerequisites

- Node.js 18+ installed
- Git installed and configured
- Write access to the repository (if pushing changes)

## Setup Options

### Option 1: GitHub Actions (Recommended for GitHub repos)

If this repository is hosted on GitHub, the automation is already configured via GitHub Actions.

The workflow will:
- Run daily at 2 AM UTC
- Can be manually triggered from the Actions tab
- Automatically commit and push documentation changes
- Create an issue if the crawler fails

No additional setup needed - just ensure the repository has Actions enabled.

### Option 2: Windows Task Scheduler

For Windows systems, use the provided PowerShell script:

1. Open PowerShell as Administrator
2. Navigate to the project directory:
   ```powershell
   cd C:\ats\public-repos\zorro-docs-crawler
   ```
3. Run the setup script:
   ```powershell
   .\automation\setup-windows-task.ps1
   ```
4. Optional: Specify a custom time (default is 2:00 AM):
   ```powershell
   .\automation\setup-windows-task.ps1 -Time "03:30"
   ```

The task will appear in Task Scheduler as "ZorroDocsUpdater".

### Option 3: Linux Systemd Service

For Linux systems with systemd:

1. Copy the service files to systemd directory:
   ```bash
   sudo cp automation/zorro-docs-updater.service /etc/systemd/system/
   sudo cp automation/zorro-docs-updater.timer /etc/systemd/system/
   ```

2. Reload systemd and enable the timer:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable zorro-docs-updater.timer
   sudo systemctl start zorro-docs-updater.timer
   ```

3. Check the timer status:
   ```bash
   sudo systemctl status zorro-docs-updater.timer
   ```

### Option 4: Cron Job (Unix/Linux/macOS)

For systems without systemd, use cron:

1. Open crontab editor:
   ```bash
   crontab -e
   ```

2. Add this line for daily execution at 2 AM:
   ```
   0 2 * * * /mnt/c/ats/public-repos/zorro-docs-crawler/automation/update-docs.sh
   ```

## Manual Execution

To run the crawler manually:

### Windows:
```batch
cd C:\ats\public-repos\zorro-docs-crawler
automation\update-docs.bat
```

### Linux/macOS:
```bash
cd /mnt/c/ats/public-repos/zorro-docs-crawler
./automation/update-docs.sh
```

### Direct Node.js:
```bash
cd /mnt/c/ats/public-repos/zorro-docs-crawler
npm ci
node crawler-complete.js
```

## Monitoring

### Logs Location
- Windows: `C:\ats\public-repos\zorro-docs-crawler\logs\`
- Linux/macOS: `/mnt/c/ats/public-repos/zorro-docs-crawler/logs/`

### Log Rotation
Logs older than 30 days are automatically deleted.

### Checking Status

#### Windows Task Scheduler:
```powershell
Get-ScheduledTask -TaskName "ZorroDocsUpdater" | Get-ScheduledTaskInfo
```

#### Linux Systemd:
```bash
sudo systemctl status zorro-docs-updater.timer
sudo journalctl -u zorro-docs-updater.service -n 50
```

#### GitHub Actions:
Check the Actions tab in your GitHub repository.

## Troubleshooting

### Common Issues

1. **Node.js not found**: Ensure Node.js is installed and in PATH
2. **Permission denied**: Check file permissions and user rights
3. **Git push fails**: Ensure Git credentials are configured
4. **Crawler timeout**: Increase timeout in scripts if needed

### Debug Mode

To run with verbose output:
```bash
node crawler-complete.js --verbose
```

## Configuration

The crawler can be configured by editing:
- `crawler-complete.js` - Main crawler settings
- `package.json` - Dependencies and scripts
- Automation scripts in `automation/` directory

## Disabling Automation

### Windows:
```powershell
Disable-ScheduledTask -TaskName "ZorroDocsUpdater"
```

### Linux Systemd:
```bash
sudo systemctl disable zorro-docs-updater.timer
sudo systemctl stop zorro-docs-updater.timer
```

### GitHub Actions:
Disable the workflow from the Actions tab or delete `.github/workflows/daily-update.yml`

## Support

For issues or questions:
1. Check the logs in the `logs/` directory
2. Review the crawler output for specific errors
3. Ensure all dependencies are up to date with `npm update`