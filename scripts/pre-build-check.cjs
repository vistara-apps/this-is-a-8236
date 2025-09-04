#!/usr/bin/env node

/**
 * Pre-build check script
 * Validates environment and dependencies before building
 */

const fs = require('fs');
const path = require('path');

function preBuildCheck() {
  console.log('🔍 Running pre-build checks...');
  
  // Check if package.json exists
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Pre-build check failed: package.json not found');
    process.exit(1);
  }
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.error('❌ Pre-build check failed: node_modules not found. Run npm install first.');
    process.exit(1);
  }
  
  // Check if src directory exists
  const srcPath = path.join(__dirname, '..', 'src');
  if (!fs.existsSync(srcPath)) {
    console.error('❌ Pre-build check failed: src directory not found');
    process.exit(1);
  }
  
  // Check if main entry point exists
  const mainPath = path.join(srcPath, 'main.jsx');
  if (!fs.existsSync(mainPath)) {
    console.error('❌ Pre-build check failed: src/main.jsx not found');
    process.exit(1);
  }
  
  // Check if App component exists
  const appPath = path.join(srcPath, 'App.jsx');
  if (!fs.existsSync(appPath)) {
    console.error('❌ Pre-build check failed: src/App.jsx not found');
    process.exit(1);
  }
  
  // Check if index.html exists
  const indexPath = path.join(__dirname, '..', 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Pre-build check failed: index.html not found');
    process.exit(1);
  }
  
  // Check if vite.config.js exists
  const viteConfigPath = path.join(__dirname, '..', 'vite.config.js');
  if (!fs.existsSync(viteConfigPath)) {
    console.error('❌ Pre-build check failed: vite.config.js not found');
    process.exit(1);
  }
  
  console.log('✅ Pre-build checks passed');
  return true;
}

if (require.main === module) {
  preBuildCheck();
}

module.exports = { preBuildCheck };
