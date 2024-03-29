#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const setup = require('./setup');

// Validate arguments
if (process.argv.length < 3) {
  console.log('Please specify the target project directory.');
  console.log('For example:');
  console.log('    npx @pelusa/create-node-ts-boilerplate my-node-ts-project');
  process.exit(1);
}

// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/tomascatena/node-typescript-boilerplate';

// Check if directory already exists
try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('Directory already exists. Please choose another name for the project.');
  } else {
    console.log(err);
  }

  process.exit(1);
}

setup({ appPath, repo, folderName })
  .then(() => {
    console.log('Installation is now complete!');
    console.log();
    console.log('We suggest that you start by typing:');
    console.log(`    cd ${folderName}`);
    console.log('    npm run dev');
    console.log();
    console.log('Enjoy your NodeJS TypeScript boilerplate, which already supports a large number of ready-made features!');
    console.log('Check README.md for more info.');
  })
  .catch((error) => {
    console.log(error);
  });
