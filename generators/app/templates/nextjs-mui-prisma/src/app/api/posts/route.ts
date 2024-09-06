import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import to from 'await-to-js';

// Create a new post
export async function POST(request: Request) {
  const [error, data] = await to(request.json());
  if (error) return NextResponse.json({ success: false, message: error.message });

  const [createError, post] = await to(prisma.post.create({ data }));
  if (createError) return NextResponse.json({ success: false, message: createError.message });

  return NextResponse.json({ success: true, data: post });
}

// Get all posts with pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const skip = (page - 1) * pageSize;

  const [[findError, posts], [countError, totalPosts]] = await Promise.all([
    to(prisma.post.findMany({ skip, take: pageSize })),
    to(prisma.post.count())
  ]);

  if (findError || countError) {
    const message = findError?.message || countError?.message;
    return NextResponse.json({ success: false, message });
  }

  return NextResponse.json({
    success: true,
    data: {
      posts,
      meta: {
        page,
        pageSize,
        totalPosts,
      },
    },
  });
}

// Update a post
export async function PUT(request: Request) {
  const [error, data] = await to(request.json());
  if (error) return NextResponse.json({ success: false, message: error.message });

  const { id, ...updateData } = data;
  const [updateError, post] = await to(prisma.post.update({ where: { id }, data: updateData }));
  if (updateError) return NextResponse.json({ success: false, message: updateError.message });

  return NextResponse.json({ success: true, data: post });
}

// Delete a post
export async function DELETE(request: Request) {
  const [error, data] = await to(request.json());
  if (error) return NextResponse.json({ success: false, message: error.message });

  const { id } = data;
  const [deleteError] = await to(prisma.post.delete({ where: { id } }));
  if (deleteError) return NextResponse.json({ success: false, message: deleteError.message });

  return NextResponse.json({ success: true, message: 'Post deleted' });
}
