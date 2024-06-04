'use server';

import path from 'node:path';
import { headers } from 'next/headers';
import { plus } from './math';

export const getAppAbsPath = async (a = 1, b = 2) => {
  const absPath = path.resolve(__dirname);
  const num = await plus(a, b);
  const header = headers();
  console.log('=====referer', header.get('referer'));
  return { absPath, num };
};
