const path = require('path');
const { existsSync, readFileSync } = require('fs');
const { homedir } = require('os');
const ini = require('ini');

const getGlobalConfigPath = () => {
  const mainConfigPath = path.resolve(homedir(), '.gitconfig');
  return existsSync(mainConfigPath) ? mainConfigPath : null;
};

exports.getGlobalGitConfig = () => {
  const gcPath = getGlobalConfigPath();
  
  return gcPath ? ini.parse(readFileSync(gcPath, { encoding: 'utf8' })) : {};
};
