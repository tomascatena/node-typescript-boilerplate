const fs = require('fs');
const path = require('path');

const { runCmd, hasYarn } = require('./utilityFunctions');

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

module.exports = setup;