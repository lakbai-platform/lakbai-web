import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ResolveIdentifierBody = {
  identifier?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ResolveIdentifierBody;
    const identifier = body.identifier?.trim();

    if (!identifier) {
      return NextResponse.json({ error: 'Identifier is required.' }, { status: 400 });
    }

    if (emailRegex.test(identifier)) {
      return NextResponse.json({ email: identifier.toLowerCase() });
    }

    const normalizedUsername = identifier.replace(/^@+/, '').toLowerCase();

    const user = await prisma.user.findFirst({
      where: { username: normalizedUsername },
      select: { email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or email.' }, { status: 404 });
    }

    return NextResponse.json({ email: user.email });
  } catch {
    return NextResponse.json({ error: 'Failed to resolve login identifier.' }, { status: 500 });
  }
}
