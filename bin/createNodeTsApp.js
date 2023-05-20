#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const setup = require('./setup');
const util = require('util');
const { execSync } = require('child_process');

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

const exec = util.promisify(require('child_process').exec);

const runCmd = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);

    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
};

const hasYarn = () => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });

    return true;
  } catch {
    return false;
  }
};

const setup = async () => {
  try {
    // Clone repo
    console.log(`Downloading files from repo ${repo}`);

    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

    console.log('Cloned successfully.');
    console.log('');

    // Change directory
    process.chdir(appPath);

    // Install dependencies
    const useYarn = await hasYarn();
    console.log('Installing dependencies...');

    if (useYarn) {
      await runCmd('yarn install');
    } else {
      await runCmd('npm install');
    }

    console.log('Dependencies installed successfully.');
    console.log();

    // Copy environment variables
    fs.copyFileSync(path.join(appPath, '.env.example'), path.join(appPath, '.env'));
    console.log('Environment files copied.');

    // Delete .git folder
    await runCmd('npx rimraf ./.git');

    // Remove extra files
    fs.unlinkSync(path.join(appPath, 'CHANGELOG.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'createReactTsApp.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));

    console.log('Installation is now complete!');
    console.log();

    console.log('We suggest that you start by typing:');
    console.log(`    cd ${folderName}`);
    console.log(useYarn ? '    yarn dev' : '    npm run dev');
    console.log();
    console.log('Enjoy your NodeJS Typescript boilerplate, which already supports a large number of ready-made features!');
    console.log('Check README.md for more info.');
  } catch (error) {
    console.log(error);
  }
};

setup();
