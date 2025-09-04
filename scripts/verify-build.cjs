#!/usr/bin/env node

/**
 * Build verification script
 * Ensures the build output is valid and complete
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const REQUIRED_FILES = [
  'index.html',
  'assets'
];

function verifyBuild() {
  console.log('🔍 Verifying build output...');
  
  // Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Build verification failed: dist directory not found');
    process.exit(1);
  }
  
  // Check required files
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(DIST_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Build verification failed: ${file} not found`);
      process.exit(1);
    }
  }
  
  // Check if index.html has content
  const indexPath = path.join(DIST_DIR, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.length < 100) {
    console.error('❌ Build verification failed: index.html appears to be empty or corrupted');
    process.exit(1);
  }
  
  // Check if assets directory has files
  const assetsDir = path.join(DIST_DIR, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);
  if (assetFiles.length === 0) {
    console.error('❌ Build verification failed: no assets found');
    process.exit(1);
  }
  
  // Success
  console.log('✅ Build verification successful');
  console.log(`📁 Found ${assetFiles.length} asset files`);
  console.log(`📄 index.html size: ${Math.round(indexContent.length / 1024 * 100) / 100}KB`);
  
  return true;
}

if (require.main === module) {
  verifyBuild();
}

module.exports = { verifyBuild };
