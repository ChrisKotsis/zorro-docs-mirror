#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const OUTPUT_DIR = './zorro-docs-output';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

async function analyzeImageFailures() {
  console.log(chalk.bold.cyan('🔍 Analyzing Image Download Failures\n'));
  
  // Find all image references in markdown files
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  const imageRefs = new Map();
  const failedImages = new Set();
  
  // Collect all image references
  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(docsDir, file), 'utf8');
    
    // Match image references: ![alt](url)
    const imgPattern = /!\[[^\]]*\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imgPattern.exec(content)) !== null) {
      const imgPath = match[1];
      if (imgPath.includes('images/')) {
        const imageName = path.basename(imgPath);
        
        if (!imageRefs.has(imageName)) {
          imageRefs.set(imageName, []);
        }
        imageRefs.get(imageName).push({
          file: file,
          path: imgPath,
          fullMatch: match[0]
        });
      }
    }
  }
  
  // Check which images exist locally
  const existingImages = await fs.readdir(IMAGES_DIR).catch(() => []);
  
  console.log(chalk.yellow(`Total unique image references: ${imageRefs.size}`));
  console.log(chalk.green(`Images downloaded successfully: ${existingImages.length}`));
  
  // Find failed images
  for (const [imageName, refs] of imageRefs) {
    if (!existingImages.includes(imageName)) {
      failedImages.add(imageName);
    }
  }
  
  console.log(chalk.red(`Failed to download: ${failedImages.size}\n`));
  
  // Analyze patterns in failed images
  console.log(chalk.bold.cyan('📊 Pattern Analysis:\n'));
  
  // Check if all images follow the hash pattern
  const hashPattern = /^[a-f0-9]{8}\.(png|jpg|gif)$/;
  let hashPatternCount = 0;
  let otherPatternCount = 0;
  
  for (const imageName of failedImages) {
    if (hashPattern.test(imageName)) {
      hashPatternCount++;
    } else {
      otherPatternCount++;
    }
  }
  
  console.log(chalk.yellow(`Images with hash pattern (8 hex chars): ${hashPatternCount}`));
  console.log(chalk.yellow(`Images with other patterns: ${otherPatternCount}\n`));
  
  // Show some examples of failed images
  console.log(chalk.bold.cyan('📋 Sample Failed Images:\n'));
  
  let count = 0;
  for (const [imageName, refs] of imageRefs) {
    if (failedImages.has(imageName) && count < 10) {
      console.log(chalk.red(`❌ ${imageName}`));
      console.log(chalk.gray(`   Found in: ${refs[0].file}`));
      console.log(chalk.gray(`   Reference: ${refs[0].fullMatch}\n`));
      count++;
    }
  }
  
  // Potential solutions
  console.log(chalk.bold.cyan('💡 Potential Solutions:\n'));
  console.log(chalk.green('1. The image URLs might be dynamically generated or require authentication'));
  console.log(chalk.green('2. Images might be stored at a different base URL'));
  console.log(chalk.green('3. The hash pattern suggests images might be content-addressed'));
  console.log(chalk.green('4. Try checking if images are embedded in the HTML as base64'));
  console.log(chalk.green('5. Images might be loaded via JavaScript after page load'));
  
  // Generate a report file
  const report = {
    totalReferences: imageRefs.size,
    successfulDownloads: existingImages.length,
    failedDownloads: failedImages.size,
    failedImages: Array.from(failedImages),
    sampleReferences: Array.from(imageRefs.entries()).slice(0, 20).map(([name, refs]) => ({
      imageName: name,
      references: refs
    }))
  };
  
  await fs.writeJson('./image-failure-analysis.json', report, { spaces: 2 });
  console.log(chalk.cyan('\n📄 Detailed report saved to: image-failure-analysis.json'));
}

analyzeImageFailures().catch(console.error);