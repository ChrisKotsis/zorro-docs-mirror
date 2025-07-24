#!/bin/bash
set -euo pipefail

# Zorro Documentation Update Script
# This script crawls the Zorro documentation and commits changes

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/logs/update-$(date +%Y%m%d-%H%M%S).log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to send notification on failure
notify_failure() {
    local error_msg="$1"
    log "ERROR: $error_msg"
    
    # Send desktop notification if available
    if command -v notify-send &> /dev/null; then
        notify-send "Zorro Docs Update Failed" "$error_msg" -i error
    fi
    
    # Create failure marker file
    echo "$error_msg" > "$PROJECT_DIR/logs/last-failure.txt"
}

# Main update process
main() {
    log "Starting Zorro documentation update"
    
    cd "$PROJECT_DIR"
    
    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        notify_failure "Node.js is not installed"
        exit 1
    fi
    
    # Install/update dependencies
    log "Installing dependencies..."
    if ! npm ci >> "$LOG_FILE" 2>&1; then
        notify_failure "Failed to install dependencies"
        exit 1
    fi
    
    # Run the crawler
    log "Running documentation crawler..."
    if ! node crawler-complete.js >> "$LOG_FILE" 2>&1; then
        notify_failure "Crawler failed"
        exit 1
    fi
    
    # Check for changes
    if git diff --quiet && git diff --cached --quiet; then
        log "No changes detected"
        exit 0
    fi
    
    # Commit changes
    log "Committing changes..."
    git add -A
    git commit -m "chore: Automated documentation update $(date +%Y-%m-%d)" >> "$LOG_FILE" 2>&1
    
    # Push changes if remote is configured
    if git remote get-url origin &> /dev/null; then
        log "Pushing changes to remote..."
        if ! git push >> "$LOG_FILE" 2>&1; then
            log "WARNING: Failed to push changes to remote"
        fi
    fi
    
    log "Documentation update completed successfully"
    
    # Clean up old logs (keep last 30 days)
    find "$PROJECT_DIR/logs" -name "update-*.log" -mtime +30 -delete
}

# Run main function
main "$@"