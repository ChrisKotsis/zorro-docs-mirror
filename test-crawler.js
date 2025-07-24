#!/usr/bin/env node

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import chalk from 'chalk';

// Test the crawler on a single page first
const TEST_URL = 'https://manual.zorro-project.com/';

async function testCrawler() {
  console.log(chalk.bold('\n🧪 Testing Zorro Documentation Structure\n'));
  
  try {
    // Fetch the main page
    console.log(chalk.blue(`Fetching: ${TEST_URL}`));
    const response = await fetch(TEST_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    console.log(chalk.green('\n✓ Successfully fetched page\n'));
    
    // Analyze the page structure
    console.log(chalk.yellow('Page Structure Analysis:'));
    console.log(`- Title: ${$('title').text()}`);
    console.log(`- H1 tags: ${$('h1').length}`);
    console.log(`- H2 tags: ${$('h2').length}`);
    console.log(`- Links: ${$('a').length}`);
    console.log(`- Code blocks: ${$('pre').length}`);
    console.log(`- Tables: ${$('table').length}`);
    
    // Check for common content containers
    const containers = ['#content', '.content', '#main', '.main', 'body'];
    console.log(chalk.yellow('\nContent Containers:'));
    containers.forEach(selector => {
      const element = $(selector);
      if (element.length) {
        console.log(chalk.green(`✓ Found: ${selector} (${element.text().slice(0, 50)}...)`));
      }
    });
    
    // Sample some links
    console.log(chalk.yellow('\nSample Links:'));
    $('a[href]').slice(0, 10).each((i, elem) => {
      const href = $(elem).attr('href');
      const text = $(elem).text().trim();
      console.log(`- ${text}: ${href}`);
    });
    
    // Check for frames (common in older documentation)
    const frames = $('frame, iframe');
    if (frames.length) {
      console.log(chalk.yellow('\n⚠️  Found frames - may need special handling:'));
      frames.each((i, elem) => {
        console.log(`- ${elem.name}: ${$(elem).attr('src')}`);
      });
    }
    
  } catch (error) {
    console.error(chalk.red('\n❌ Test failed:'), error);
  }
}

testCrawler();