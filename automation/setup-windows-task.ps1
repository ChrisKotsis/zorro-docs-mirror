# Windows Task Scheduler Setup for Zorro Docs Crawler
# Run this script as Administrator to set up daily updates

param(
    [string]$Time = "02:00",  # Default to 2 AM
    [string]$TaskName = "ZorroDocsUpdater"
)

$ErrorActionPreference = "Stop"

# Get the script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "This script must be run as Administrator. Rerun with elevated privileges."
    exit 1
}

# Create the update script for Windows
$WindowsUpdateScript = @"
@echo off
setlocal enabledelayedexpansion

set PROJECT_DIR=C:\ats\public-repos\zorro-docs-crawler
set LOG_DIR=%PROJECT_DIR%\logs
set LOG_FILE=%LOG_DIR%\update-%date:~-4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%%time:~6,2%.log

:: Create logs directory if it doesn't exist
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

:: Replace spaces in time with zeros for log filename
set LOG_FILE=%LOG_FILE: =0%

echo [%date% %time%] Starting Zorro documentation update >> "%LOG_FILE%"

cd /d "%PROJECT_DIR%"

:: Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [%date% %time%] ERROR: Node.js is not installed >> "%LOG_FILE%"
    exit /b 1
)

:: Install/update dependencies
echo [%date% %time%] Installing dependencies... >> "%LOG_FILE%"
call npm ci >> "%LOG_FILE%" 2>&1
if %errorlevel% neq 0 (
    echo [%date% %time%] ERROR: Failed to install dependencies >> "%LOG_FILE%"
    exit /b 1
)

:: Run the crawler
echo [%date% %time%] Running documentation crawler... >> "%LOG_FILE%"
node crawler-complete.js >> "%LOG_FILE%" 2>&1
if %errorlevel% neq 0 (
    echo [%date% %time%] ERROR: Crawler failed >> "%LOG_FILE%"
    exit /b 1
)

:: Check for changes and commit if needed
git add -A >> "%LOG_FILE%" 2>&1
git diff --staged --quiet
if %errorlevel% neq 0 (
    echo [%date% %time%] Committing changes... >> "%LOG_FILE%"
    git commit -m "chore: Automated documentation update %date%" >> "%LOG_FILE%" 2>&1
    
    :: Push if remote exists
    git remote get-url origin >nul 2>nul
    if %errorlevel% equ 0 (
        echo [%date% %time%] Pushing changes to remote... >> "%LOG_FILE%"
        git push >> "%LOG_FILE%" 2>&1
    )
)

echo [%date% %time%] Documentation update completed >> "%LOG_FILE%"

:: Clean up old logs (older than 30 days)
forfiles /p "%LOG_DIR%" /m "update-*.log" /d -30 /c "cmd /c del @path" 2>nul

exit /b 0
"@

$WindowsUpdateScript | Out-File -FilePath "$ProjectDir\automation\update-docs.bat" -Encoding ASCII

Write-Host "Creating scheduled task: $TaskName" -ForegroundColor Green

# Create the scheduled task action
$Action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$ProjectDir\automation\update-docs.bat`"" -WorkingDirectory $ProjectDir

# Create the trigger (daily at specified time)
$Trigger = New-ScheduledTaskTrigger -Daily -At $Time

# Create the principal (run whether user is logged on or not)
$Principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType S4U -RunLevel Limited

# Create the settings
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RestartInterval (New-TimeSpan -Minutes 10) -RestartCount 3

# Register the task
try {
    Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Principal $Principal -Settings $Settings -Description "Daily update of Zorro documentation" -Force
    Write-Host "Scheduled task created successfully!" -ForegroundColor Green
    Write-Host "The task will run daily at $Time" -ForegroundColor Cyan
    
    # Test run the task
    Write-Host "`nWould you like to test run the task now? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq 'Y' -or $response -eq 'y') {
        Start-ScheduledTask -TaskName $TaskName
        Write-Host "Task started. Check logs in: $ProjectDir\logs" -ForegroundColor Green
    }
} catch {
    Write-Error "Failed to create scheduled task: $_"
    exit 1
}

Write-Host "`nSetup complete! You can manage the task through Task Scheduler." -ForegroundColor Green
Write-Host "Task name: $TaskName" -ForegroundColor Cyan