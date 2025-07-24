#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const PROJECT_DIR = path.resolve(__dirname, '..');
const LOGS_DIR = path.join(PROJECT_DIR, 'logs');
const OUTPUT_DIR = path.join(PROJECT_DIR, 'zorro-docs-output');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

async function checkLastRun() {
  try {
    const files = await fs.readdir(LOGS_DIR);
    const logFiles = files.filter(f => f.startsWith('update-') && f.endsWith('.log'));
    
    if (logFiles.length === 0) {
      return { status: 'warning', message: 'No update logs found' };
    }
    
    // Get the most recent log file
    const latestLog = logFiles.sort().reverse()[0];
    const logPath = path.join(LOGS_DIR, latestLog);
    const stats = await fs.stat(logPath);
    const content = await fs.readFile(logPath, 'utf-8');
    
    const hoursSinceRun = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
    const hasErrors = content.includes('ERROR:');
    const hasCompleted = content.includes('completed successfully');
    
    return {
      status: hasErrors ? 'error' : hasCompleted ? 'success' : 'warning',
      lastRun: stats.mtime,
      hoursSinceRun: hoursSinceRun.toFixed(1),
      logFile: latestLog,
      hasErrors,
      hasCompleted
    };
  } catch (error) {
    return { status: 'error', message: `Failed to check logs: ${error.message}` };
  }
}

async function checkOutputDirectory() {
  try {
    const stats = await fs.stat(OUTPUT_DIR);
    const files = await fs.readdir(OUTPUT_DIR);
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    
    return {
      exists: true,
      fileCount: htmlFiles.length,
      lastModified: stats.mtime
    };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

async function checkGitStatus() {
  try {
    const { stdout: status } = await execAsync('git status --porcelain', { cwd: PROJECT_DIR });
    const { stdout: branch } = await execAsync('git branch --show-current', { cwd: PROJECT_DIR });
    const { stdout: lastCommit } = await execAsync('git log -1 --oneline', { cwd: PROJECT_DIR });
    
    return {
      hasUncommittedChanges: status.trim().length > 0,
      changedFiles: status.trim().split('\n').filter(l => l).length,
      currentBranch: branch.trim(),
      lastCommit: lastCommit.trim()
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function checkScheduledTasks() {
  const tasks = [];
  
  // Check for systemd timer (Linux)
  try {
    const { stdout } = await execAsync('systemctl is-enabled zorro-docs-updater.timer 2>/dev/null');
    tasks.push({ type: 'systemd', enabled: stdout.trim() === 'enabled' });
  } catch (e) {
    // Not a systemd system or timer not installed
  }
  
  // Check for Windows scheduled task
  if (process.platform === 'win32') {
    try {
      const { stdout } = await execAsync('schtasks /query /tn "ZorroDocsUpdater" 2>nul');
      tasks.push({ type: 'windows', enabled: !stdout.includes('ERROR:') });
    } catch (e) {
      // Task not found
    }
  }
  
  // Check for cron job
  try {
    const { stdout } = await execAsync('crontab -l 2>/dev/null | grep -q "update-docs.sh"');
    tasks.push({ type: 'cron', enabled: true });
  } catch (e) {
    // No cron job found
  }
  
  return tasks;
}

async function main() {
  log('\\n=== Zorro Documentation Crawler Health Check ===\\n', colors.bright + colors.cyan);
  
  // Check last run
  log('📅 Last Run Status:', colors.bright);
  const lastRun = await checkLastRun();
  if (lastRun.lastRun) {
    const statusColor = lastRun.status === 'success' ? colors.green : 
                       lastRun.status === 'error' ? colors.red : colors.yellow;
    log(`   Status: ${lastRun.status.toUpperCase()}`, statusColor);
    log(`   Last run: ${lastRun.lastRun.toLocaleString()}`);
    log(`   Hours since run: ${lastRun.hoursSinceRun}`);
    log(`   Log file: ${lastRun.logFile}`);
    
    if (parseFloat(lastRun.hoursSinceRun) > 25) {
      log('   ⚠️  Warning: Last run was more than 25 hours ago', colors.yellow);
    }
  } else {
    log(`   ${lastRun.message}`, colors.yellow);
  }
  
  // Check output directory
  log('\\n📁 Output Directory:', colors.bright);
  const output = await checkOutputDirectory();
  if (output.exists) {
    log(`   Files: ${output.fileCount} HTML documents`, colors.green);
    log(`   Last modified: ${output.lastModified.toLocaleString()}`);
  } else {
    log('   ❌ Output directory not found', colors.red);
  }
  
  // Check Git status
  log('\\n🔄 Git Repository:', colors.bright);
  const git = await checkGitStatus();
  if (!git.error) {
    log(`   Branch: ${git.currentBranch}`);
    log(`   Last commit: ${git.lastCommit}`);
    if (git.hasUncommittedChanges) {
      log(`   ⚠️  Uncommitted changes: ${git.changedFiles} files`, colors.yellow);
    } else {
      log('   ✓ Working directory clean', colors.green);
    }
  } else {
    log(`   Error: ${git.error}`, colors.red);
  }
  
  // Check scheduled tasks
  log('\\n⏰ Scheduled Tasks:', colors.bright);
  const tasks = await checkScheduledTasks();
  if (tasks.length === 0) {
    log('   ⚠️  No automated tasks found', colors.yellow);
  } else {
    tasks.forEach(task => {
      const status = task.enabled ? '✓ Enabled' : '✗ Disabled';
      const color = task.enabled ? colors.green : colors.red;
      log(`   ${task.type}: ${status}`, color);
    });
  }
  
  // Overall health summary
  log('\\n📊 Summary:', colors.bright);
  const isHealthy = lastRun.status === 'success' && 
                   output.exists && 
                   output.fileCount > 0 &&
                   parseFloat(lastRun.hoursSinceRun || 999) < 48;
  
  if (isHealthy) {
    log('   ✅ System is healthy', colors.green);
  } else {
    log('   ⚠️  System needs attention', colors.yellow);
    
    if (lastRun.status === 'error' || lastRun.hasErrors) {
      log('   - Check error logs for crawler issues', colors.yellow);
    }
    if (!output.exists || output.fileCount === 0) {
      log('   - Output directory is missing or empty', colors.yellow);
    }
    if (parseFloat(lastRun.hoursSinceRun || 999) > 48) {
      log('   - Crawler hasn\\'t run recently', colors.yellow);
    }
    if (tasks.length === 0) {
      log('   - Set up automated scheduling', colors.yellow);
    }
  }
  
  log('\\n', colors.reset);
}

// Run the health check
main().catch(error => {
  log(`\\n❌ Health check failed: ${error.message}`, colors.red);
  process.exit(1);
});