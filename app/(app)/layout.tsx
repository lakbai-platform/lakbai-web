import type { Metadata } from 'next';
import { Sidebar } from './_components/Sidebar';
import GlobalChatbarWrapper from './_components/GlobalChatbarWrapper';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Lakbai App',
  description: 'AI-powered travel planning and navigation'
};

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: 'desc' }
  });
  
  const journeys = await prisma.journey.findMany({
    orderBy: { createdAt: 'desc' }
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
