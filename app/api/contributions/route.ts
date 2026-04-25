import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

// ---------------------------------------------------------------------------
// POST /api/contributions — submit a new contribution (auth required)
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, proposedData, poiId } = body;

    if (!type || !proposedData) {
      return NextResponse.json(
        { error: 'Missing required fields: type, proposedData' },
        { status: 400 }
      );
    }

    if (!['CREATE', 'UPDATE'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be CREATE or UPDATE.' },
        { status: 400 }
      );
    }

    if (type === 'UPDATE' && !poiId) {
      return NextResponse.json(
        { error: 'poiId is required for UPDATE contributions' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.create({
      data: {
        userId: user.id,
        type,
        status: 'PENDING',
        proposedData,
        poiId: poiId ?? null,
      },
    });

    return NextResponse.json({ contribution }, { status: 201 });
  } catch (error) {
    console.error('Failed to create contribution', error);
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET /api/contributions — fetch the authenticated user's own contributions
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contributions = await prisma.contribution.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: { poi: { select: { id: true, name: true } } },
    });

    return NextResponse.json({ contributions });
  } catch (error) {
    console.error('Failed to fetch contributions', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}
