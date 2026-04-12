'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Chatbox from './_components/chatbox';
import MapArea from './_components/map-area';

export default function ChatClientLayout({ initialChats, initialJourneys }: { initialChats: any[], initialJourneys: any[] }) {
  const params = useParams();
  const chatId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();

  // Automatically manage redirect if on /chat randomly
  useEffect(() => {
    if (!chatId) {
      if (initialChats?.length > 0) {
        // Auto-redirect to the most recent chat
        router.replace(`/chat/${initialChats[0].id}`);
      } else {
        // Automatically create a blank chat if no chats exist
        const createBlankChat = async () => {
          try {
            const res = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ isNewContext: true, isBlank: true })
            });
            const data = await res.json();
            if (data.chat) {
              router.refresh();
              router.replace(`/chat/${data.chat.id}`);
            }
          } catch(e) { console.error(e); }
        };
        createBlankChat();
      }
    }
  }, [chatId, initialChats, router]);

  // We can open the global NewJourneyModal if the user clicks "Plan a New Journey" natively
  const triggerNewJourneyModal = () => {
    // The `<GlobalChatbarWrapper>` manages the modal globally now.
    // Wait, the new journey modal in GlobalChatbar is attached to the GlobalChatbar itself.
    // To trigger it from Chatbox, we can dispatch a custom event.
    window.dispatchEvent(new CustomEvent('open-new-journey-modal'));
  };

  return (
    <div className='flex h-full w-full overflow-hidden'>
      {/* LEFT: Chatbox (Full fixed width or percentage) */}
      <div className='h-full w-1/2 border-r bg-white transition-all'>
        <Chatbox 
          onOpenNewJourneyModal={triggerNewJourneyModal}
        />
      </div>

      {/* RIGHT: MapArea */}
      <div className='flex-1 bg-gray-100 h-full'>
        <MapArea />
      </div>
    </div>
  );
}
