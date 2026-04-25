import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { username: true },
  });

  if (!profile?.username) {
    redirect('/profile/settings');
  }

  redirect(`/profile/${profile.username}`);
}
