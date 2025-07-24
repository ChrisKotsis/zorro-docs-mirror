#!/usr/bin/env node

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs-extra';
import path from 'path';
import { URL } from 'url';
import pLimit from 'p-limit';
import chalk from 'chalk';

// Configuration
const BASE_URL = 'https://manual.zorro-project.com';
const OUTPUT_DIR = './zorro-docs-output';
const MAX_CONCURRENT = 5; // Limit concurrent requests to be respectful

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined'
});

// Add custom rules for better conversion
turndownService.addRule('codeBlocks', {
  filter: ['pre'],
  replacement: function(content, node) {
    const code = node.textContent;
    const lang = node.getAttribute('class') || 'c'; // Default to C for Zorro
    return '\n```' + lang + '\n' + code + '\n```\n';
  }
});

// Track visited URLs to avoid duplicates
const visitedUrls = new Set();
const urlQueue = new Set();

// Create output directory
await fs.ensureDir(OUTPUT_DIR);
await fs.ensureDir(path.join(OUTPUT_DIR, 'docs'));

// Rate limiter
const limit = pLimit(MAX_CONCURRENT);

async function fetchPage(url) {
  try {
    console.log(chalk.blue(`Fetching: ${url}`));
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ZorroDocsCrawler/1.0; +https://github.com/yourusername/zorro-docs)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(chalk.red(`Error fetching ${url}: ${error.message}`));
    return null;
  }
}

function extractLinks($, currentUrl) {
  const links = new Set();
  
  // Find all links in the content
  $('a[href]').each((_, elem) => {
    const href = $(elem).attr('href');
    if (!href) return;
    
    // Skip external links, anchors, and non-HTML files
    if (href.startsWith('http') && !href.startsWith(BASE_URL)) return;
    if (href.startsWith('#')) return;
    if (href.endsWith('.exe') || href.endsWith('.zip') || href.endsWith('.pdf')) return;
    
    // Resolve relative URLs
    let absoluteUrl;
    try {
      absoluteUrl = new URL(href, currentUrl).href;
    } catch (e) {
      return;
    }
    
    // Only process URLs within the manual domain
    if (absoluteUrl.startsWith(BASE_URL)) {
      links.add(absoluteUrl);
    }
  });
  
  return links;
}

function convertToMarkdown($, url) {
  // Remove navigation frames and sidebars
  $('.navigation').remove();
  $('.sidebar').remove();
  $('#toc').remove();
  $('.menu').remove();
  
  // Extract main content
  let content = '';
  let title = '';
  
  // Try different content selectors used by Zorro docs
  const contentSelectors = [
    '#content',
    '.content',
    'body > div:not(.navigation)',
    'body'
  ];
  
  for (const selector of contentSelectors) {
    const element = $(selector);
    if (element.length && element.text().trim()) {
      content = element.html();
      break;
    }
  }
  
  // Extract title
  const titleElement = $('h1').first();
  if (titleElement.length) {
    title = titleElement.text().trim();
  } else {
    title = $('title').text().trim() || 'Untitled';
  }
  
  // Convert to Markdown
  let markdown = turndownService.turndown(content);
  
  // Clean up the markdown
  markdown = markdown
    .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\[([^\]]+)\]\(\)/g, '$1'); // Fix empty links
  
  // Add frontmatter
  const frontmatter = `---
title: "${title}"
source: "${url}"
---

`;
  
  return {
    title,
    content: frontmatter + markdown
  };
}

function urlToFilePath(url) {
  const urlObj = new URL(url);
  let pathname = urlObj.pathname;
  
  // Remove leading slash
  if (pathname.startsWith('/')) {
    pathname = pathname.substring(1);
  }
  
  // Handle index pages
  if (!pathname || pathname === '/' || pathname.endsWith('/')) {
    pathname += 'index';
  }
  
  // Ensure .md extension
  if (!pathname.endsWith('.md')) {
    pathname += '.md';
  }
  
  return path.join(OUTPUT_DIR, 'docs', pathname);
}

async function crawlPage(url) {
  if (visitedUrls.has(url)) return;
  visitedUrls.add(url);
  
  const html = await fetchPage(url);
  if (!html) return;
  
  const $ = cheerio.load(html);
  
  // Extract links and add to queue
  const links = extractLinks($, url);
  links.forEach(link => {
    if (!visitedUrls.has(link)) {
      urlQueue.add(link);
    }
  });
  
  // Convert to Markdown
  const { title, content } = convertToMarkdown($, url);
  
  // Save to file
  const filePath = urlToFilePath(url);
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
  
  console.log(chalk.green(`✓ Saved: ${title} -> ${path.relative(OUTPUT_DIR, filePath)}`));
}

async function crawl() {
  console.log(chalk.bold('\n🕷️  Starting Zorro Documentation Crawler\n'));
  
  // Start with the main page
  urlQueue.add(BASE_URL);
  urlQueue.add(`${BASE_URL}/manual.htm`);
  
  // Process queue
  while (urlQueue.size > 0) {
    const batch = Array.from(urlQueue).slice(0, MAX_CONCURRENT);
    batch.forEach(url => urlQueue.delete(url));
    
    await Promise.all(
      batch.map(url => limit(() => crawlPage(url)))
    );
    
    console.log(chalk.yellow(`\nProgress: ${visitedUrls.size} pages crawled, ${urlQueue.size} in queue\n`));
  }
  
  // Create README.md
  const readme = `# Zorro Trading Platform Documentation

This repository contains the documentation for the Zorro Trading Platform, converted to Markdown format for better accessibility and integration with documentation tools.

## About Zorro

Zorro is a professional trading platform for developing and executing trading strategies. It supports:
- Algorithmic trading
- Backtesting
- Live trading with multiple brokers
- Strategy development in C/Lite-C
- Machine learning capabilities
- Portfolio optimization

## Documentation Structure

The documentation is organized into the following sections:
- Getting Started
- Programming Reference
- Strategy Development
- Indicators and Functions
- Broker Integration
- Examples and Tutorials

## Original Source

This documentation is sourced from the official Zorro manual at: https://manual.zorro-project.com/

## License

Please refer to the original Zorro documentation for licensing information.

## Contributing

If you find any issues with the documentation conversion, please open an issue in this repository.
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), readme, 'utf8');
  
  // Create context7.json
  const context7Config = {
    "projectTitle": "Zorro Trading Platform",
    "description": "Professional algorithmic trading platform documentation. Zorro provides a complete solution for developing, testing, and executing trading strategies with support for multiple brokers, machine learning, and portfolio optimization.",
    "folders": ["docs/"],
    "excludeFolders": [],
    "excludeFiles": ["CHANGELOG.md", "LICENSE"]
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'context7.json'), 
    JSON.stringify(context7Config, null, 2), 
    'utf8'
  );
  
  console.log(chalk.bold.green(`\n✅ Crawling complete! ${visitedUrls.size} pages processed.\n`));
  console.log(chalk.cyan(`Output saved to: ${path.resolve(OUTPUT_DIR)}`));
  console.log(chalk.cyan(`\nNext steps:`));
  console.log(chalk.cyan(`1. Review the generated documentation`));
  console.log(chalk.cyan(`2. Get permission from Zorro's creator`));
  console.log(chalk.cyan(`3. Create a GitHub repository`));
  console.log(chalk.cyan(`4. Push the documentation`));
  console.log(chalk.cyan(`5. Submit to Context7 at https://context7.com/add-package`));
}

// Run the crawler
crawl().catch(error => {
  console.error(chalk.red('\n❌ Crawler failed:'), error);
  process.exit(1);
});