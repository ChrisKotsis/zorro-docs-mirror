#!/usr/bin/env node

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import chalk from 'chalk';

const TOC_URL = 'https://zorro-project.com/manual/toc.php';

async function debugTOC() {
  console.log(chalk.bold('\n🔍 Debugging TOC Structure\n'));
  
  try {
    // Fetch the TOC page
    console.log(chalk.blue(`Fetching: ${TOC_URL}`));
    const response = await fetch(TOC_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    console.log(chalk.green('\n✓ Successfully fetched TOC\n'));
    
    // Save raw HTML for inspection
    const fs = await import('fs-extra');
    await fs.default.writeFile('toc-debug.html', html, 'utf8');
    console.log(chalk.yellow('Saved raw HTML to toc-debug.html\n'));
    
    const $ = cheerio.load(html);
    
    // Debug: Check page structure
    console.log(chalk.yellow('Page Analysis:'));
    console.log(`- Title: ${$('title').text()}`);
    console.log(`- Total links: ${$('a').length}`);
    console.log(`- Links with href: ${$('a[href]').length}`);
    
    // Check different link patterns
    console.log(chalk.yellow('\nLink Patterns:'));
    const patterns = [
      'a[href*=".htm"]',
      'a[href*=".php"]',
      'a[target="content"]',
      'a[target="_parent"]',
      'a[onclick]'
    ];
    
    patterns.forEach(pattern => {
      console.log(`- ${pattern}: ${$(pattern).length} links`);
    });
    
    // Sample first 10 links
    console.log(chalk.yellow('\nFirst 10 Links:'));
    $('a').slice(0, 10).each((i, elem) => {
      const $elem = $(elem);
      const href = $elem.attr('href') || 'no-href';
      const onclick = $elem.attr('onclick') || '';
      const target = $elem.attr('target') || '';
      const text = $elem.text().trim();
      console.log(`${i + 1}. "${text}"`);
      console.log(`   href: ${href}`);
      if (onclick) console.log(`   onclick: ${onclick}`);
      if (target) console.log(`   target: ${target}`);
    });
    
    // Check for iframes or other structures
    console.log(chalk.yellow('\nOther Elements:'));
    console.log(`- Iframes: ${$('iframe').length}`);
    console.log(`- Forms: ${$('form').length}`);
    console.log(`- Scripts: ${$('script').length}`);
    
    // Check body content length
    console.log(`\nBody HTML length: ${$('body').html()?.length || 0} characters`);
    
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error);
  }
}

debugTOC();