const { execSync } = require('child_process');
const util = require('util');

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

module.exports = {
  runCmd,
  hasYarn,
};
