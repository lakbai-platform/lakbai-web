import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type CheckUsernameBody = {
  username?: string;
};

function normalizeUsername(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^@+/, '')
    .replace(/[^a-z0-9._-]/g, '');
}

function isValidUsername(value: string): boolean {
  return /^[a-z0-9._-]{3,30}$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckUsernameBody;
    const normalizedUsername = normalizeUsername(body.username ?? '');

    if (!isValidUsername(normalizedUsername)) {
      return NextResponse.json(
        { error: 'Username must be 3-30 chars using letters, numbers, ., _, -.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { username: normalizedUsername },
      select: { id: true },
    });

    return NextResponse.json({ available: !existingUser, username: normalizedUsername });
  } catch (error) {
    console.error('check-username error', error);
    return NextResponse.json(
      {
        error: 'Failed to validate username.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
