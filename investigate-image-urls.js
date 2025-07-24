#!/usr/bin/env node

import fetch from 'node-fetch';
import { load } from 'cheerio';
import chalk from 'chalk';

// Test URLs from the documentation
const testUrls = [
  'https://zorro-project.com/manual/en/start.htm',
  'https://zorro-project.com/manual/en/tutorial.htm',
  'https://zorro-project.com/manual/en/brokers.htm'
];

async function investigateImageUrls() {
  console.log(chalk.bold.cyan('🔍 Investigating Zorro Documentation Image URLs\n'));
  
  for (const url of testUrls) {
    console.log(chalk.yellow(`\nChecking: ${url}`));
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = load(html);
      
      // Find all images
      const images = [];
      $('img').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src) {
          images.push(src);
        }
      });
      
      console.log(chalk.green(`Found ${images.length} images:`));
      
      // Show first 5 image URLs
      images.slice(0, 5).forEach(img => {
        console.log(chalk.gray(`  - ${img}`));
      });
      
      if (images.length > 5) {
        console.log(chalk.gray(`  ... and ${images.length - 5} more`));
      }
      
      // Analyze URL patterns
      const patterns = {
        absolute: 0,
        relative: 0,
        dataUri: 0,
        other: 0
      };
      
      images.forEach(img => {
        if (img.startsWith('data:')) {
          patterns.dataUri++;
        } else if (img.startsWith('http://') || img.startsWith('https://')) {
          patterns.absolute++;
        } else if (img.startsWith('/') || img.startsWith('../')) {
          patterns.relative++;
        } else {
          patterns.other++;
        }
      });
      
      console.log(chalk.cyan('\nURL Patterns:'));
      Object.entries(patterns).forEach(([pattern, count]) => {
        if (count > 0) {
          console.log(chalk.gray(`  ${pattern}: ${count}`));
        }
      });
      
    } catch (error) {
      console.error(chalk.red(`Error fetching ${url}: ${error.message}`));
    }
  }
  
  // Now let's check if the images directory exists at all
  console.log(chalk.yellow('\n\nChecking for images directory...'));
  
  const imagesDirUrl = 'https://zorro-project.com/manual/images/';
  try {
    const response = await fetch(imagesDirUrl);
    console.log(chalk.cyan(`Images directory response: ${response.status} ${response.statusText}`));
    
    if (response.status === 200) {
      const text = await response.text();
      console.log(chalk.green('Directory listing preview:'));
      console.log(chalk.gray(text.substring(0, 500) + '...'));
    }
  } catch (error) {
    console.error(chalk.red(`Error checking images directory: ${error.message}`));
  }
  
  // Try a different approach - check for common image paths
  console.log(chalk.yellow('\n\nTrying alternative image URL patterns...'));
  
  const alternativePatterns = [
    'https://zorro-project.com/manual/img/',
    'https://zorro-project.com/images/',
    'https://zorro-project.com/manual/en/images/',
    'https://www.zorro-project.com/manual/images/',
    'https://zorro-trader.com/manual/images/'
  ];
  
  for (const pattern of alternativePatterns) {
    try {
      const testUrl = pattern + 'test.png';
      const response = await fetch(testUrl, { method: 'HEAD' });
      console.log(chalk.gray(`${pattern} - Status: ${response.status}`));
    } catch (error) {
      console.log(chalk.red(`${pattern} - Error: ${error.message}`));
    }
  }
}

investigateImageUrls().catch(console.error);