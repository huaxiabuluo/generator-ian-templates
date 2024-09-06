'use server';

import path from 'node:path';
import { headers } from 'next/headers';
import prisma from '@/utils/prisma';
import { plus } from './math';

export const getAppAbsPath = async (a = 1, b = 2) => {
  const absPath = path.resolve(__dirname);
  const num = await plus(a, b);
  const header = headers();
  console.log('=====referer', header.get('referer'));
  return { absPath, num };
};

export const getPosts = async (params: { take?: number; skip?: number; authorId?: number }) => {
  const { take = 10, skip = 0, authorId } = params;
  const posts = await prisma.post.findMany({
    take,
    skip,
    where: {
      authorId,
    },
  });
  return posts;
};
