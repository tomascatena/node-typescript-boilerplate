const fs = require('fs');
const path = require('path');
const { runCmd, hasYarn } = require('./utility-functions');

const cloneRepository = async (repo, folderName) => {
  console.log(`Downloading files from repo ${repo}`);
  await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
  console.log('Cloned successfully.');
  console.log();
};

const installDependencies = async (useYarn) => {
  console.log('Installing dependencies...');
  if (useYarn) {
    await runCmd('yarn install');
  } else {
    await runCmd('npm install');
  }
  console.log('Dependencies installed successfully.');
  console.log();
};

const removeFiles = (appPath, files) => {
  for (const file of files) {
    const filePath = path.join(appPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const setup = async ({ appPath, repo, folderName }) => {
  try {
    await cloneRepository(repo, folderName);
    process.chdir(appPath);
    const useYarn = await hasYarn();
    await installDependencies(useYarn);
    await runCmd('npx rimraf ./.git');
    const filesToRemove = [
      'CHANGELOG.md',
      path.join('bin', 'create-node-ts-app.js'),
      path.join('bin', 'setup.js'),
      path.join('bin', 'utility-functions.js'),
    ];
    removeFiles(appPath, filesToRemove);
  } catch (error) {
    throw new Error(`Setup failed: ${error}`);
  }
};

module.exports = setup;
