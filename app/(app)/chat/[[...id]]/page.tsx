import { Suspense } from 'react';
import ChatClientLayout from '../client-layout';
import { prisma } from '@/lib/prisma';

export default async function ChatPage() {
  const initialChats = await prisma.chat.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  const initialJourneys = await prisma.journey.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  });

  return (
    <Suspense fallback={<div className="flex h-full w-full items-center justify-center">Loading...</div>}>
      <ChatClientLayout initialChats={initialChats} initialJourneys={initialJourneys} />
    </Suspense>
  );
}
