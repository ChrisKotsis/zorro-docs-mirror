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
const BASE_URL = 'https://zorro-project.com/manual';
const TOC_URL = 'https://zorro-project.com/manual/ht_contents.htm';  // The actual TOC frame (no 'en/')
const OUTPUT_DIR = './zorro-docs-output';
const MAX_CONCURRENT = 3; // Be respectful to the server

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
    // Try to detect language from class or content
    let lang = 'c'; // Default to C for Zorro
    const className = node.getAttribute('class');
    if (className) {
      if (className.includes('cpp')) lang = 'cpp';
      else if (className.includes('javascript')) lang = 'javascript';
      else if (className.includes('python')) lang = 'python';
    }
    return '\n```' + lang + '\n' + code + '\n```\n';
  }
});

// Track visited URLs to avoid duplicates
const visitedUrls = new Set();
const pageData = new Map(); // Store page data for building navigation

// Create output directory
await fs.ensureDir(OUTPUT_DIR);
await fs.ensureDir(path.join(OUTPUT_DIR, 'docs'));

// Rate limiter
const limit = pLimit(MAX_CONCURRENT);

// Add delay between requests
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchPage(url) {
  try {
    console.log(chalk.blue(`Fetching: ${url}`));
    // Add small delay to be respectful
    await delay(300);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ZorroDocsCrawler/1.0)'
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

async function extractTOCLinks() {
  console.log(chalk.yellow('\nExtracting Table of Contents...'));
  
  const html = await fetchPage(TOC_URL);
  if (!html) {
    throw new Error('Failed to fetch TOC');
  }
  
  const $ = cheerio.load(html);
  const links = [];
  
  // Extract all links from the TOC
  $('a[href]').each((index, elem) => {
    const href = $(elem).attr('href');
    const text = $(elem).text().trim();
    
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    
    // Convert relative URLs to absolute
    let absoluteUrl;
    try {
      if (href.startsWith('http')) {
        absoluteUrl = href;
      } else {
        absoluteUrl = new URL(href, TOC_URL).href;
      }
    } catch (e) {
      return;
    }
    
    // Store link data with hierarchy info
    const level = $(elem).parents('ul').length || 0;
    links.push({
      url: absoluteUrl,
      title: text,
      level: level,
      index: index
    });
  });
  
  console.log(chalk.green(`Found ${links.length} documentation pages`));
  return links;
}

function cleanMarkdown(markdown) {
  return markdown
    .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/\[([^\]]+)\]\(\)/g, '$1') // Fix empty links
    .replace(/\[([^\]]+)\]\(javascript:[^)]+\)/g, '$1'); // Remove javascript links
}

function convertToMarkdown($, url, title) {
  // Remove navigation, ads, and other non-content elements
  $('.navigation, .nav, .menu, .sidebar, .footer, .header, #toc').remove();
  $('script, style, noscript').remove();
  
  // Try to find the main content
  let content = '';
  const contentSelectors = [
    '#content',
    '.content', 
    'div.main',
    'div#main',
    'body'
  ];
  
  for (const selector of contentSelectors) {
    const element = $(selector);
    if (element.length && element.text().trim().length > 100) {
      content = element.html();
      break;
    }
  }
  
  // If no specific content container, get body but clean it
  if (!content) {
    content = $('body').html();
  }
  
  // Convert to Markdown
  let markdown = turndownService.turndown(content);
  markdown = cleanMarkdown(markdown);
  
  // Add frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
source: "${url}"
---

# ${title}

`;
  
  return frontmatter + markdown;
}

function sanitizeFilename(filename) {
  // Remove or replace invalid filename characters
  return filename
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '_')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .substring(0, 200); // Limit length
}

async function crawlPage(linkData) {
  const { url, title, level, index } = linkData;
  
  if (visitedUrls.has(url)) return null;
  visitedUrls.add(url);
  
  const html = await fetchPage(url);
  if (!html) return null;
  
  const $ = cheerio.load(html);
  
  // Convert to Markdown
  const markdown = convertToMarkdown($, url, title);
  
  // Generate filename based on title and index
  const filename = `${String(index).padStart(3, '0')}_${sanitizeFilename(title)}.md`;
  const filePath = path.join(OUTPUT_DIR, 'docs', filename);
  
  // Save to file
  await fs.writeFile(filePath, markdown, 'utf8');
  
  console.log(chalk.green(`✓ Saved: ${title}`));
  
  return {
    title,
    filename,
    level,
    index
  };
}

async function generateSummaryFiles(pages) {
  // Create SUMMARY.md for navigation
  let summary = '# Summary\n\n';
  
  pages.forEach(page => {
    if (page) {
      const indent = '  '.repeat(page.level);
      summary += `${indent}- [${page.title}](docs/${page.filename})\n`;
    }
  });
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'SUMMARY.md'), summary, 'utf8');
  
  // Create comprehensive README
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

## Original Source

This documentation is sourced from the official Zorro manual at: https://zorro-project.com/manual/

## License

The Zorro software and its documentation are property of oP group Germany. Please refer to the official Zorro website for licensing information.

## Note

This is an unofficial mirror of the Zorro documentation, created for improved accessibility and integration with modern development tools. For the most up-to-date information, always refer to the official documentation.

## Contributing

If you find any issues with the documentation conversion, please open an issue in this repository.
`;
  
  await fs.writeFile(path.join(OUTPUT_DIR, 'README.md'), readme, 'utf8');
  
  // Create context7.json
  const context7Config = {
    "projectTitle": "Zorro Trading Platform",
    "description": "Professional algorithmic trading platform for developing, testing, and executing trading strategies. Features include C/Lite-C scripting, machine learning, portfolio optimization, and multi-broker support.",
    "folders": ["docs/"],
    "excludeFolders": [],
    "excludeFiles": ["LICENSE"]
  };
  
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'context7.json'), 
    JSON.stringify(context7Config, null, 2), 
    'utf8'
  );
}

async function crawl() {
  console.log(chalk.bold('\n🕷️  Starting Zorro Documentation Crawler v2\n'));
  
  try {
    // Step 1: Extract all links from TOC
    const tocLinks = await extractTOCLinks();
    
    if (tocLinks.length === 0) {
      throw new Error('No links found in TOC');
    }
    
    // Step 2: Crawl each page
    console.log(chalk.yellow('\nCrawling documentation pages...\n'));
    
    const pages = [];
    for (let i = 0; i < tocLinks.length; i++) {
      const pageData = await limit(() => crawlPage(tocLinks[i]));
      pages.push(pageData);
      
      // Progress update every 10 pages
      if ((i + 1) % 10 === 0) {
        console.log(chalk.cyan(`Progress: ${i + 1}/${tocLinks.length} pages processed`));
      }
    }
    
    // Step 3: Generate summary files
    console.log(chalk.yellow('\nGenerating summary files...'));
    await generateSummaryFiles(pages.filter(p => p !== null));
    
    console.log(chalk.bold.green(`\n✅ Crawling complete! ${visitedUrls.size} pages processed.\n`));
    console.log(chalk.cyan(`Output saved to: ${path.resolve(OUTPUT_DIR)}`));
    console.log(chalk.cyan(`\nNext steps:`));
    console.log(chalk.cyan(`1. Review the generated documentation in ${OUTPUT_DIR}`));
    console.log(chalk.cyan(`2. Contact Zorro's creator for permission to host`));
    console.log(chalk.cyan(`3. Create a GitHub repository (e.g., zorro-docs-mirror)`));
    console.log(chalk.cyan(`4. Push the documentation to GitHub`));
    console.log(chalk.cyan(`5. Submit to Context7 at https://context7.com/add-package`));
    
  } catch (error) {
    console.error(chalk.red('\n❌ Crawler failed:'), error);
    process.exit(1);
  }
}

// Run the crawler
crawl();