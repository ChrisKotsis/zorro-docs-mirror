#!/usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import turndownPluginGfm from 'turndown-plugin-gfm';
import chalk from 'chalk';
import pLimit from 'p-limit';
import crypto from 'crypto';

// Configuration
const BASE_URL = 'https://zorro-project.com/manual';
const TOC_URL = 'https://zorro-project.com/manual/ht_contents.htm';
const OUTPUT_DIR = './zorro-docs-output';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const MAX_CONCURRENT = 3; // Be respectful to the server
const DELAY_MS = 300; // Delay between requests
const PROGRESS_FILE = './zorro-docs-progress-images.json';

// Create a hash for image filename to ensure uniqueness
function hashUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
}

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
async function downloadImage(imageUrl, imageName) {
  try {
    const response = await fetchWithRetry(imageUrl);
    const buffer = await response.buffer();
    const imagePath = path.join(IMAGES_DIR, imageName);
    await fs.writeFile(imagePath, buffer);
    console.log(chalk.green(`✓ Downloaded image: ${imageName}`));
    return imageName;
  } catch (error) {
    console.error(chalk.red(`✗ Failed to download image ${imageUrl}: ${error.message}`));
    return null;
  }
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

// Function to process images in HTML content
async function processImages(html, pageUrl) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const images = document.querySelectorAll('img');
  const downloadedImages = new Map();
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (!src) continue;
    
    let imageUrl;
    if (src.startsWith('http')) {
      imageUrl = src;
    } else if (src.startsWith('../images/')) {
      imageUrl = `${BASE_URL}/${src.substring(3)}`;
    } else if (src.startsWith('images/')) {
      imageUrl = `${BASE_URL}/${src}`;
    } else {
      // Try to resolve relative to current page
      const basePageUrl = pageUrl.substring(0, pageUrl.lastIndexOf('/'));
      imageUrl = `${basePageUrl}/${src}`;
    }
    
    // Get file extension
    const ext = path.extname(new URL(imageUrl).pathname) || '.png';
    const imageName = `${hashUrl(imageUrl)}${ext}`;
    
    if (!downloadedImages.has(imageUrl)) {
      const downloadedName = await downloadImage(imageUrl, imageName);
      if (downloadedName) {
        downloadedImages.set(imageUrl, downloadedName);
        // Update the image src in the HTML
        img.setAttribute('src', `../images/${downloadedName}`);
      }
    } else {
      // Update with already downloaded image
      img.setAttribute('src', `../images/${downloadedImages.get(imageUrl)}`);
    }
  }
  
  return dom.serialize();
}

// Function to convert HTML page to Markdown
async function convertPage(url, title, index) {
  console.log(chalk.blue(`Processing ${index}: ${title}...`));
  
  try {
    const response = await fetchWithRetry(url);
    let html = await response.text();
    
    // Process images first
    html = await processImages(html, url);
    
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
      url
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
  return { completed: [], failed: [], tocLinks: [] };
}

// Save progress
async function saveProgress(progress) {
  await fs.writeJson(PROGRESS_FILE, progress, { spaces: 2 });
}

// Main crawler function
async function crawlDocs() {
  console.log(chalk.bold.green('🕷️  Zorro Documentation Crawler with Images\n'));
  
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
        progress.completed.push({ url: result.url, filename: result.filename });
        
        // Save the markdown file
        const filePath = path.join(OUTPUT_DIR, 'docs', result.filename);
        await fs.writeFile(filePath, result.content);
        console.log(chalk.green(`✓ Saved ${result.filename}`));
      }
    }
    
    // Save progress after each batch
    await saveProgress(progress);
    
    // Show progress
    const totalProcessed = progress.completed.length;
    const percentage = Math.round((totalProcessed / tocLinks.length) * 100);
    console.log(chalk.bold.yellow(`\nProgress: ${totalProcessed}/${tocLinks.length} (${percentage}%)\n`));
  }
  
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
  
  // Clean up progress file
  await fs.remove(PROGRESS_FILE);
  
  // Count images
  const imageFiles = await fs.readdir(IMAGES_DIR);
  
  console.log(chalk.bold.green(`\n✅ Crawling complete!`));
  console.log(chalk.cyan(`   📄 Pages converted: ${allPages.length}`));
  console.log(chalk.cyan(`   🖼️  Images downloaded: ${imageFiles.length}`));
  console.log(chalk.cyan(`   📁 Output directory: ${path.resolve(OUTPUT_DIR)}`));
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error(chalk.red('Unhandled error:'), error);
  process.exit(1);
});

// Run the crawler
crawlDocs().catch(console.error);