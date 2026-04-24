import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Sidebar } from './_components/Sidebar';
import GlobalChatbarWrapper from './_components/GlobalChatbarWrapper';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Lakbai App',
  description: 'AI-powered travel planning and navigation'
};

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Secondary session guard (middleware is primary)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const chats = await prisma.chat.findMany({
    where: { journey: { userId: user.id } },
    orderBy: { updatedAt: 'desc' },
  });

  const journeys = await prisma.journey.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='flex h-screen w-full flex-row'>
      <Sidebar />
      <div className='flex-1 overflow-hidden relative'>
        <GlobalChatbarWrapper initialChats={chats} initialJourneys={journeys}>
          {children}
        </GlobalChatbarWrapper>
      </div>
    </div>
  );
}
