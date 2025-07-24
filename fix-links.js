#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const OUTPUT_DIR = './zorro-docs-output';

// Function to fix links in markdown content
function fixLinks(content, currentFile) {
  // Pattern to match the problematic absolute paths
  const absolutePathPattern = /\/mnt\/c\/ats\/ph1t\/el2za\/zorro-docs-crawler\/zorro-docs-output\/docs\/([^\.]+)\.htm/g;
  
  // Replace absolute paths with relative markdown links
  content = content.replace(absolutePathPattern, (match, filename) => {
    // Convert to proper markdown filename
    const mdFilename = filename + '.md';
    return mdFilename;
  });
  
  // Also fix any remaining .htm links that might be relative
  content = content.replace(/\(([^)]+)\.htm\)/g, (match, filename) => {
    // Skip if it's an external URL
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return match;
    }
    return `(${filename}.md)`;
  });
  
  // Fix links in format [text](../en/something.htm) to [text](something.md)
  content = content.replace(/\((\.\.\/en\/)?([^)]+)\.htm\)/g, (match, prefix, filename) => {
    // Skip if it's an external URL
    if (match.includes('http://') || match.includes('https://')) {
      return match;
    }
    return `(${filename}.md)`;
  });
  
  return content;
}

// Function to create a mapping of original filenames to sanitized filenames
async function createFilenameMapping() {
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mapping = {};
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      // Extract the original title from the filename
      // Format is like: 099_enterLong,_enterShort.md
      const match = file.match(/^\d+_(.+)\.md$/);
      if (match) {
        const title = match[1].replace(/_/g, ' ');
        // Create various possible link formats
        mapping[title.toLowerCase()] = file;
        mapping[title.toLowerCase().replace(/[^a-z0-9]/g, '')] = file;
        mapping[title.toLowerCase().replace(/\s+/g, '_')] = file;
        mapping[title.toLowerCase().replace(/\s+/g, '-')] = file;
      }
    }
  }
  
  return mapping;
}

// Enhanced link fixing with filename mapping
async function fixLinksEnhanced(content, filenameMapping) {
  // First do the basic fixes
  content = fixLinks(content);
  
  // Now try to fix any broken internal links by matching titles
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    // Skip external URLs and already correct .md links
    if (url.startsWith('http') || url.endsWith('.md')) {
      return match;
    }
    
    // Try to find the correct file
    const searchKey = url.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (filenameMapping[searchKey]) {
      return `[${linkText}](${filenameMapping[searchKey]})`;
    }
    
    return match;
  });
  
  return content;
}

async function processAllFiles() {
  console.log(chalk.bold('🔧 Fixing internal links in Zorro documentation\n'));
  
  try {
    const docsDir = path.join(OUTPUT_DIR, 'docs');
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    console.log(chalk.cyan(`Found ${mdFiles.length} markdown files to process\n`));
    
    // Create filename mapping
    const filenameMapping = await createFilenameMapping();
    
    let fixedCount = 0;
    let totalFixed = 0;
    
    for (const file of mdFiles) {
      const filePath = path.join(docsDir, file);
      let content = await fs.readFile(filePath, 'utf8');
      const originalContent = content;
      
      // Count problematic links before fixing
      const absoluteLinks = (content.match(/\/mnt\/c\/ats\/ph1t\/el2za\/zorro-docs-crawler\/zorro-docs-output\/docs\//g) || []).length;
      const htmLinks = (content.match(/\([^)]+\.htm\)/g) || []).length;
      
      if (absoluteLinks > 0 || htmLinks > 0) {
        // Fix the links
        content = await fixLinksEnhanced(content, filenameMapping);
        
        // Only write if content changed
        if (content !== originalContent) {
          await fs.writeFile(filePath, content, 'utf8');
          console.log(chalk.green(`✓ Fixed ${file} - ${absoluteLinks} absolute links, ${htmLinks} .htm links`));
          fixedCount++;
          totalFixed += absoluteLinks + htmLinks;
        }
      }
    }
    
    // Also fix SUMMARY.md
    const summaryPath = path.join(OUTPUT_DIR, 'SUMMARY.md');
    if (await fs.pathExists(summaryPath)) {
      let summaryContent = await fs.readFile(summaryPath, 'utf8');
      const originalSummary = summaryContent;
      summaryContent = fixLinks(summaryContent);
      
      if (summaryContent !== originalSummary) {
        await fs.writeFile(summaryPath, summaryContent, 'utf8');
        console.log(chalk.green('✓ Fixed SUMMARY.md'));
        fixedCount++;
      }
    }
    
    console.log(chalk.bold.green(`\n✅ Fixed ${totalFixed} links in ${fixedCount} files!`));
    
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error);
    process.exit(1);
  }
}

// Run the fixer
processAllFiles();