import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import ini from 'ini';

const getGlobalConfigPath = () => {
  const mainConfigPath = path.resolve(homedir(), '.gitconfig');
  return existsSync(mainConfigPath) ? mainConfigPath : null;
};

export const getGlobalGitConfig = () => {
  const gcPath = getGlobalConfigPath();
  
  return gcPath ? ini.parse(readFileSync(gcPath, { encoding: 'utf8' })) : {};
};
