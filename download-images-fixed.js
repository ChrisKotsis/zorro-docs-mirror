#!/usr/bin/env node

import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import pLimit from 'p-limit';
import crypto from 'crypto';

// Configuration
const BASE_URL = 'https://zorro-project.com/manual';
const OUTPUT_DIR = './zorro-docs-output';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');
const MAX_CONCURRENT = 3;
const DELAY_MS = 300;

// Create a hash for image filename to ensure uniqueness
function hashUrl(url) {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
}

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
    console.log(chalk.green(`✓ Downloaded: ${imageName}`));
    return imageName;
  } catch (error) {
    console.error(chalk.red(`✗ Failed to download ${imageUrl}: ${error.message}`));
    return null;
  }
}

// Find all image references in markdown files
async function findImageReferences() {
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  const imageRefs = new Map();
  
  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(docsDir, file), 'utf8');
    
    // Match image references: ![alt](url) or ![alt](url "title")
    // Updated pattern to properly capture the URL without the title
    const imgPattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]+")?\)/g;
    let match;
    
    while ((match = imgPattern.exec(content)) !== null) {
      const imgPath = match[2]; // The URL is in the second capture group
      
      if (imgPath.includes('images/')) {
        const fullMatch = match[0];
        const altText = match[1];
        
        if (!imageRefs.has(imgPath)) {
          imageRefs.set(imgPath, {
            path: imgPath,
            fullMatch: fullMatch,
            altText: altText,
            files: []
          });
        }
        imageRefs.get(imgPath).files.push(file);
      }
    }
  }
  
  return imageRefs;
}

// Process and download images
async function processImages() {
  console.log(chalk.bold.green('🖼️  Zorro Documentation Image Downloader (Fixed)\n'));
  
  // Ensure images directory exists
  await fs.ensureDir(IMAGES_DIR);
  
  // Find all image references
  console.log(chalk.cyan('🔍 Scanning for image references...'));
  const imageRefs = await findImageReferences();
  console.log(chalk.cyan(`Found ${imageRefs.size} unique image references\n`));
  
  // Set up rate limiting
  const limit = pLimit(MAX_CONCURRENT);
  
  // Process each unique image
  const downloadTasks = [];
  
  for (const [imgPath, refInfo] of imageRefs) {
    let imageUrl;
    const imageName = path.basename(imgPath);
    
    // Try different URL patterns
    if (imgPath.startsWith('../images/')) {
      // First try the direct path
      imageUrl = `${BASE_URL}/images/${imageName}`;
    } else if (imgPath.includes('/images/')) {
      const idx = imgPath.lastIndexOf('/images/');
      imageUrl = `${BASE_URL}${imgPath.substring(idx)}`;
    } else if (imgPath.startsWith('images/')) {
      imageUrl = `${BASE_URL}/${imgPath}`;
    } else {
      console.log(chalk.yellow(`⚠️  Skipping unknown path pattern: ${imgPath}`));
      continue;
    }
    
    // Generate unique filename
    const ext = path.extname(imageName) || '.png';
    const hashedName = `${hashUrl(imageUrl)}${ext}`;
    
    downloadTasks.push(
      limit(async () => {
        const downloaded = await downloadImage(imageUrl, hashedName);
        return { 
          original: imgPath, 
          newName: downloaded,
          fullMatch: refInfo.fullMatch,
          imageUrl: imageUrl,
          imageName: imageName
        };
      })
    );
  }
  
  console.log(chalk.cyan(`\n📥 Downloading ${downloadTasks.length} images...\n`));
  
  const results = await Promise.all(downloadTasks);
  const successCount = results.filter(r => r.newName).length;
  const failedResults = results.filter(r => !r.newName);
  
  console.log(chalk.bold.green(`\n✅ Downloaded ${successCount}/${downloadTasks.length} images`));
  
  if (failedResults.length > 0) {
    console.log(chalk.bold.red(`\n❌ Failed downloads (${failedResults.length}):\n`));
    
    // Group failed images by pattern
    const failurePatterns = new Map();
    
    for (const failed of failedResults) {
      const pattern = failed.imageName.match(/^[a-f0-9]{8}\.(png|jpg|gif)$/) ? 'hash' : 'named';
      if (!failurePatterns.has(pattern)) {
        failurePatterns.set(pattern, []);
      }
      failurePatterns.get(pattern).push(failed);
    }
    
    for (const [pattern, failures] of failurePatterns) {
      console.log(chalk.yellow(`\n${pattern === 'hash' ? 'Hash-named' : 'Descriptive-named'} images:`));
      failures.slice(0, 5).forEach(f => {
        console.log(chalk.red(`  - ${f.imageName} (${f.imageUrl})`));
      });
      if (failures.length > 5) {
        console.log(chalk.gray(`  ... and ${failures.length - 5} more`));
      }
    }
  }
  
  // Update markdown files with new image paths
  console.log(chalk.cyan('\n📝 Updating markdown files...'));
  
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  let updatedCount = 0;
  
  for (const file of mdFiles) {
    const filePath = path.join(docsDir, file);
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    
    // Replace each successful image reference
    for (const result of results) {
      if (result.newName && content.includes(result.original)) {
        const newPath = `../images/${result.newName}`;
        // Use the full match to ensure we replace the entire image reference correctly
        content = content.replace(result.fullMatch, result.fullMatch.replace(result.original, newPath));
        modified = true;
      }
    }
    
    if (modified) {
      await fs.writeFile(filePath, content, 'utf8');
      updatedCount++;
      console.log(chalk.green(`✓ Updated ${file}`));
    }
  }
  
  console.log(chalk.bold.green(`\n✅ Updated ${updatedCount} files with local image paths`));
  console.log(chalk.cyan(`\n📁 Images saved to: ${path.resolve(IMAGES_DIR)}`));
  
  // Save a report of failed downloads
  if (failedResults.length > 0) {
    const failureReport = {
      totalFailed: failedResults.length,
      failures: failedResults.map(f => ({
        imageName: f.imageName,
        url: f.imageUrl,
        originalPath: f.original
      }))
    };
    
    await fs.writeJson('./failed-image-downloads.json', failureReport, { spaces: 2 });
    console.log(chalk.yellow(`\n📄 Failed downloads report saved to: failed-image-downloads.json`));
  }
}

// Run the image downloader
processImages().catch(console.error);