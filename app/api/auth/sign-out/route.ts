import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/sign-out
 * Signs the current user out and redirects to the landing page.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const origin = request.nextUrl.origin;
  return NextResponse.redirect(new URL('/', origin), { status: 302 });
}
