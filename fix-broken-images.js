#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const OUTPUT_DIR = './zorro-docs-output';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

async function fixBrokenImages() {
  console.log(chalk.bold.cyan('🔧 Fixing Broken Image References\n'));
  
  // Get list of successfully downloaded images
  const existingImages = await fs.readdir(IMAGES_DIR).catch(() => []);
  const existingSet = new Set(existingImages);
  
  console.log(chalk.green(`Found ${existingImages.length} successfully downloaded images\n`));
  
  // Process each markdown file
  const docsDir = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(docsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  let totalFixed = 0;
  let totalBroken = 0;
  
  for (const file of mdFiles) {
    const filePath = path.join(docsDir, file);
    let content = await fs.readFile(filePath, 'utf8');
    const originalContent = content;
    
    // Find all image references
    const imgPattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    let brokenInFile = 0;
    
    while ((match = imgPattern.exec(originalContent)) !== null) {
      const fullMatch = match[0];
      const altText = match[1];
      const imgPath = match[2];
      
      if (imgPath.includes('../images/')) {
        const imageName = path.basename(imgPath);
        
        if (!existingSet.has(imageName)) {
          // Image doesn't exist - replace with a placeholder
          brokenInFile++;
          totalBroken++;
          
          const placeholder = `[Image not available: ${altText || imageName}]`;
          content = content.replace(fullMatch, placeholder);
        }
      }
    }
    
    if (content !== originalContent) {
      await fs.writeFile(filePath, content, 'utf8');
      totalFixed++;
      console.log(chalk.yellow(`✓ Fixed ${file} (${brokenInFile} broken references)`));
    }
  }
  
  console.log(chalk.bold.green(`\n✅ Summary:`));
  console.log(chalk.green(`   - Files processed: ${mdFiles.length}`));
  console.log(chalk.green(`   - Files fixed: ${totalFixed}`));
  console.log(chalk.green(`   - Broken references replaced: ${totalBroken}`));
  
  // Create a summary of what images are missing
  const missingImagesSummary = {
    totalFiles: mdFiles.length,
    filesWithBrokenImages: totalFixed,
    totalBrokenReferences: totalBroken,
    successfullyDownloadedImages: existingImages.length,
    recommendation: "Consider manually downloading critical diagrams from the Zorro documentation website"
  };
  
  await fs.writeJson('./missing-images-summary.json', missingImagesSummary, { spaces: 2 });
  console.log(chalk.cyan('\n📄 Summary saved to: missing-images-summary.json'));
}

// Also create an alternative version that preserves image references but adds a note
async function addImageWarnings() {
  console.log(chalk.bold.cyan('\n🏷️  Adding Image Warnings (Alternative Approach)\n'));
  
  const docsDir = path.join(OUTPUT_DIR, 'docs-with-warnings');
  await fs.ensureDir(docsDir);
  
  const sourceDocs = path.join(OUTPUT_DIR, 'docs');
  const files = await fs.readdir(sourceDocs);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  for (const file of mdFiles) {
    const sourceFile = path.join(sourceDocs, file);
    const targetFile = path.join(docsDir, file);
    let content = await fs.readFile(sourceFile, 'utf8');
    
    // Add warning at the top if file contains images
    if (content.includes('![')) {
      const warning = `> **Note**: Some images in this documentation may not be available in the offline version. Please refer to the [online documentation](https://zorro-project.com/manual) for complete visual content.\n\n`;
      
      // Insert after frontmatter if it exists
      if (content.startsWith('---')) {
        const endOfFrontmatter = content.indexOf('---', 3);
        if (endOfFrontmatter !== -1) {
          content = content.slice(0, endOfFrontmatter + 3) + '\n\n' + warning + content.slice(endOfFrontmatter + 3);
        }
      } else {
        content = warning + content;
      }
    }
    
    await fs.writeFile(targetFile, content, 'utf8');
  }
  
  console.log(chalk.green(`✓ Created alternative documentation with warnings in: ${docsDir}`));
}

// Run both approaches
async function main() {
  await fixBrokenImages();
  await addImageWarnings();
}

main().catch(console.error);