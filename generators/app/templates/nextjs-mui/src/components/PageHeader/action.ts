'use server';

import path from 'node:path';

export const test = async () => {
  const text = path.resolve(__dirname);
  console.log('=====__dirname', __dirname);
  console.log('=====text', text);
  return text;
};
