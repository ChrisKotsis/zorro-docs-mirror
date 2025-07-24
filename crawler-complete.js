#!/usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import turndownPluginGfm from 'turndown-plugin-gfm';
import chalk from 'chalk';
import pLimit from 'p-limit';
import { URL } from 'url';

// Configuration
const BASE_URL = 'https://zorro-project.com/manual';
const TOC_URL = 'https://zorro-project.com/manual/ht_contents.htm';
const OUTPUT_DIR = './zorro-docs-output';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const MAX_CONCURRENT = 3;
const DELAY_MS = 300;
const PROGRESS_FILE = './zorro-docs-progress.json';

// Initialize Turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```'
});

// Use GFM plugin for better table support
turndownService.use(turndownPluginGfm.gfm);

// Add custom rules for better conversion
turndownService.addRule('codeBlocks', {
  filter: ['pre'],
  replacement: function(content, node) {
    const lang = node.querySelector('code')?.className?.replace('language-', '') || 'c';
    return '\n```' + lang + '\n' + content.trim() + '\n```\n';
  }
});

// Function to introduce delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to fetch a URL with retries
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(DELAY_MS);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      console.log(chalk.yellow(`Retry ${i + 1}/${retries} for ${url}: ${error.message}`));
      if (i === retries - 1) throw error;
      await sleep(DELAY_MS * 2);
    }
  }
}

// Function to download an image
async function downloadImage(imageUrl, targetPath) {
  try {
    const response = await fetchWithRetry(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, buffer);
    console.log(chalk.green(`✓ Downloaded image: ${path.basename(targetPath)}`));
    return true;
  } catch (error) {
    console.error(chalk.red(`✗ Failed to download image ${imageUrl}: ${error.message}`));
    return false;
  }
}

// Function to process images in HTML content
async function processImages(html, pageUrl) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const images = document.querySelectorAll('img');
  const downloadedImages = [];
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (!src) continue;
    
    let imageUrl;
    let imagePath;
    
    if (src.startsWith('http')) {
      imageUrl = src;
      imagePath = path.basename(new URL(imageUrl).pathname);
    } else if (src.startsWith('../images/')) {
      // Handle relative paths like ../images/something.png
      imagePath = src.substring(10); // Remove ../images/
      imageUrl = `${BASE_URL}/images/${imagePath}`;
    } else if (src.startsWith('images/')) {
      imagePath = src.substring(7); // Remove images/
      imageUrl = `${BASE_URL}/images/${imagePath}`;
    } else {
      // Try to resolve relative to current page
      const basePageUrl = pageUrl.substring(0, pageUrl.lastIndexOf('/'));
      imageUrl = new URL(src, basePageUrl).href;
      imagePath = path.basename(new URL(imageUrl).pathname);
    }
    
    // Ensure we have a valid image path
    if (imagePath && imagePath !== '') {
      const localImagePath = path.join(IMAGES_DIR, imagePath);
      const imageDownloaded = await downloadImage(imageUrl, localImagePath);
      
      if (imageDownloaded) {
        // Update the image src to point to local copy
        img.setAttribute('src', `../images/${imagePath}`);
        downloadedImages.push({ url: imageUrl, path: imagePath });
      }
    }
  }
  
  return {
    html: dom.serialize(),
    images: downloadedImages
  };
}

// Function to parse TOC and extract links
async function parseTOC() {
  console.log(chalk.bold('📚 Parsing Table of Contents...\n'));
  
  try {
    const response = await fetchWithRetry(TOC_URL);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    const links = [];
    const anchors = document.querySelectorAll('a[href]');
    
    anchors.forEach(anchor => {
      let href = anchor.getAttribute('href');
      const text = anchor.textContent.trim();
      
      if (href && !href.startsWith('#') && !href.startsWith('javascript:') && 
          !href.includes('mailto:') && text) {
        // Convert relative URLs to absolute
        if (!href.startsWith('http')) {
          if (href.startsWith('en/')) {
            href = `${BASE_URL}/${href}`;
          } else {
            href = `${BASE_URL}/en/${href}`;
          }
        }
        
        links.push({
          url: href,
          title: text,
          level: anchor.closest('ul')?.querySelectorAll('ul').length || 0
        });
      }
    });
    
    // Remove duplicates
    const uniqueLinks = Array.from(new Map(links.map(item => [item.url, item])).values());
    
    console.log(chalk.cyan(`Found ${uniqueLinks.length} unique documentation pages\n`));
    return uniqueLinks;
  } catch (error) {
    console.error(chalk.red('Failed to parse TOC:'), error);
    throw error;
  }
}

// Function to convert HTML page to Markdown
async function convertPage(url, title, index) {
  console.log(chalk.blue(`Processing ${index}: ${title}...`));
  
  try {
    const response = await fetchWithRetry(url);
    let html = await response.text();
    
    // Process images first
    const { html: processedHtml, images } = await processImages(html, url);
    html = processedHtml;
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Remove navigation and other non-content elements
    const elementsToRemove = [
      'script', 'style', 'nav', 'header', 'footer',
      '.navigation', '.nav', '.menu', '.sidebar',
      '#navigation', '#nav', '#menu', '#sidebar'
    ];
    
    elementsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
    
    // Get the main content
    let content = document.querySelector('.content') || 
                  document.querySelector('#content') ||
                  document.querySelector('main') ||
                  document.querySelector('body');
    
    if (!content) {
      console.log(chalk.yellow(`Warning: No content found for ${url}`));
      return null;
    }
    
    // Convert to markdown
    const markdown = turndownService.turndown(content.innerHTML);
    
    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
source: "${url}"
---

`;
    
    // Generate filename
    const safeTitle = title
      .replace(/[^a-z0-9]+/gi, '_')
      .replace(/^_+|_+$/g, '');
    const filename = `${String(index).padStart(3, '0')}_${safeTitle}.md`;
    
    return {
      filename,
      content: frontmatter + `# ${title}\n\n${markdown}`,
      title,
      url,
      images
    };
  } catch (error) {
    console.error(chalk.red(`Failed to convert ${url}:`), error.message);
    return null;
  }
}

// Load progress
async function loadProgress() {
  try {
    if (await fs.pathExists(PROGRESS_FILE)) {
      const data = await fs.readJson(PROGRESS_FILE);
      console.log(chalk.cyan(`Resuming from previous crawl: ${data.completed.length} pages already processed`));
      return data;
    }
  } catch (e) {
    // Ignore
  }
  return { completed: [], failed: [], tocLinks: [], images: [] };
}

// Save progress
async function saveProgress(progress) {
  await fs.writeJson(PROGRESS_FILE, progress, { spaces: 2 });
}

// Function to fix internal links in all markdown files
async function fixInternalLinks() {
  console.log(chalk.bold('\n🔧 Fixing internal links...\n'));
  
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  let totalFixed = 0;
  
  for (const file of mdFiles) {
    const filePath = path.join(docsDir, file);
    let content = await fs.readFile(filePath, 'utf8');
    let fixedCount = 0;
    
    // Fix .htm links to .md
    content = content.replace(/\(([^)]+)\.htm\)/g, (match, filename) => {
      if (filename.startsWith('http://') || filename.startsWith('https://')) {
        return match;
      }
      fixedCount++;
      // Remove any path prefixes and just use the filename
      const baseName = path.basename(filename);
      // Find the corresponding .md file
      const mdFile = mdFiles.find(f => f.toLowerCase().includes(baseName.toLowerCase().replace(/[^a-z0-9]/g, '_')));
      return mdFile ? `(${mdFile})` : `(${baseName}.md)`;
    });
    
    if (fixedCount > 0) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(chalk.green(`✓ Fixed ${fixedCount} links in ${file}`));
      totalFixed += fixedCount;
    }
  }
  
  console.log(chalk.bold.green(`\n✅ Fixed ${totalFixed} internal links!`));
}

// Main crawler function
async function crawlDocs() {
  console.log(chalk.bold.green('🕷️  Zorro Documentation Complete Crawler\n'));
  
  // Ensure output directories exist
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(path.join(OUTPUT_DIR, 'docs'));
  await fs.ensureDir(IMAGES_DIR);
  
  // Load progress
  const progress = await loadProgress();
  
  let tocLinks = progress.tocLinks;
  if (tocLinks.length === 0) {
    // Parse TOC
    tocLinks = await parseTOC();
    progress.tocLinks = tocLinks;
    await saveProgress(progress);
  }
  
  // Set up rate limiting
  const limit = pLimit(MAX_CONCURRENT);
  
  // Track completed URLs
  const completedUrls = new Set(progress.completed.map(p => p.url));
  
  // Process pages
  const results = [];
  const pending = tocLinks.filter(link => !completedUrls.has(link.url));
  
  console.log(chalk.cyan(`\n📄 Processing ${pending.length} remaining pages...\n`));
  
  // Process in batches to show progress
  for (let i = 0; i < pending.length; i += MAX_CONCURRENT) {
    const batch = pending.slice(i, i + MAX_CONCURRENT);
    
    const batchResults = await Promise.all(
      batch.map((link, idx) => 
        limit(() => convertPage(link.url, link.title, completedUrls.size + i + idx + 1))
      )
    );
    
    for (const result of batchResults) {
      if (result) {
        results.push(result);
        progress.completed.push({ 
          url: result.url, 
          filename: result.filename,
          images: result.images 
        });
        
        // Track all images
        result.images.forEach(img => {
          if (!progress.images.find(i => i.path === img.path)) {
            progress.images.push(img);
          }
        });
        
        // Save the markdown file
        const filePath = path.join(OUTPUT_DIR, 'docs', result.filename);
        await fs.writeFile(filePath, result.content);
        console.log(chalk.green(`✓ Saved ${result.filename} (${result.images.length} images)`));
      }
    }
    
    // Save progress after each batch
    await saveProgress(progress);
    
    // Show progress
    const totalProcessed = progress.completed.length;
    const percentage = Math.round((totalProcessed / tocLinks.length) * 100);
    console.log(chalk.bold.yellow(`\nProgress: ${totalProcessed}/${tocLinks.length} (${percentage}%)\n`));
  }
  
  // Fix internal links
  await fixInternalLinks();
  
  // Create README
  const readme = `# Zorro Trading Platform Documentation

This repository contains the complete documentation for the Zorro Trading Platform, converted to Markdown format for better accessibility and integration with modern documentation tools.

## About Zorro

Zorro is a professional trading platform for algorithmic trading, offering:

- **Strategy Development**: Write trading strategies in C/Lite-C
- **Backtesting**: Test strategies on historical data with realistic simulation
- **Live Trading**: Execute strategies with multiple brokers
- **Machine Learning**: Built-in ML capabilities for predictive modeling
- **Portfolio Optimization**: Advanced portfolio and risk management tools
- **High Performance**: Optimized for speed and efficiency

## Documentation Structure

The documentation covers:

- **Getting Started**: Installation, setup, and first steps
- **Programming Guide**: Complete language reference and API
- **Functions Reference**: All built-in functions and indicators
- **Strategy Development**: Best practices and examples
- **Broker Integration**: Connecting to different brokers
- **Machine Learning**: Using Zorro's ML capabilities
- **Examples**: Sample strategies and code snippets

## Navigation

See [SUMMARY.md](SUMMARY.md) for the complete table of contents.

## Images

Documentation images are stored in the \`images/\` directory.

## Original Source

This documentation is sourced from the official Zorro manual at: https://zorro-project.com/manual/

## Last Updated

${new Date().toISOString().split('T')[0]}

## Update Process

To update this documentation with the latest changes from the Zorro website:

\`\`\`bash
# Run the crawler to fetch updates
node crawler-complete.js

# The crawler will:
# - Download any new or updated pages
# - Download all referenced images
# - Fix internal links
# - Update the table of contents
\`\`\`

## License

The Zorro software and its documentation are property of oP group Germany. Please refer to the official Zorro website for licensing information.

## Note

This is an unofficial mirror of the Zorro documentation, created for improved accessibility and integration with modern development tools. For the most up-to-date information, always refer to the official documentation.

## Contributing

If you find any issues with the documentation conversion, please open an issue in this repository.
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), readme);
  
  // Create SUMMARY.md with hierarchy
  const allPages = progress.completed;
  let summary = '# Summary\n\n* [Introduction](README.md)\n\n';
  
  // Sort by filename to maintain order
  allPages.sort((a, b) => a.filename.localeCompare(b.filename));
  
  allPages.forEach(page => {
    const link = tocLinks.find(l => l.url === page.url);
    const indent = '  '.repeat(link?.level || 0);
    const title = link?.title || path.basename(page.filename, '.md');
    summary += `${indent}* [${title}](docs/${page.filename})\n`;
  });
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'SUMMARY.md'), summary);
  
  // Create context7.json
  const context7Config = {
    projectTitle: "Zorro Trading Platform",
    description: "Professional algorithmic trading platform for developing, testing, and executing trading strategies. Features include C/Lite-C scripting, machine learning, portfolio optimization, and multi-broker support.",
    folders: [
      "docs/",
      "images/"
    ],
    excludeFolders: [],
    excludeFiles: [
      "LICENSE"
    ]
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'context7.json'), 
    JSON.stringify(context7Config, null, 2)
  );
  
  // Create update script
  const updateScript = `#!/bin/bash
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
`;
  
  await fs.writeFile('update-docs.sh', updateScript);
  await fs.chmod('update-docs.sh', '755');
  
  // Create image report
  const imageReport = `# Zorro Documentation Images Report

## Summary
- Total unique images: ${progress.images.length}
- Successfully downloaded: ${progress.images.length}

## Image List
${progress.images.map(img => `- ${img.path} (${img.url})`).join('\n')}

## Last Updated
${new Date().toISOString()}
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'IMAGES_REPORT.md'), imageReport);
  
  // Clean up progress file
  await fs.remove(PROGRESS_FILE);
  
  console.log(chalk.bold.green(`\n✅ Crawling complete!`));
  console.log(chalk.cyan(`   📄 Pages converted: ${allPages.length}`));
  console.log(chalk.cyan(`   🖼️  Images downloaded: ${progress.images.length}`));
  console.log(chalk.cyan(`   📁 Output directory: ${path.resolve(OUTPUT_DIR)}`));
  console.log(chalk.cyan(`   🔄 Update script: ./update-docs.sh`));
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});

// Run the crawler
crawlDocs().catch(console.error);