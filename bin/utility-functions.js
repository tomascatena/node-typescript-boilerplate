const { spawnSync } = require('child_process');

const runCmd = async (command) => {
  try {
    const childProcess = spawnSync(command, { shell: true });

    const stdout = childProcess.stdout.toString().trim();
    if (stdout) {
      console.log(stdout);
    }

    const stderr = childProcess.stderr.toString().trim();
    if (stderr) {
      console.error(stderr);
    }

    if (childProcess.status !== 0) {
      throw new Error(`Command execution failed with exit code ${childProcess.status}`);
    }
  } catch (error) {
    throw new Error(`Command execution failed: ${error}`);
  }
};

const hasYarn = () => {
  const result = spawnSync('yarnpkg --version', { stdio: 'ignore', shell: true });
  return result.status === 0;
};

module.exports = {
  runCmd,
  hasYarn,
};
