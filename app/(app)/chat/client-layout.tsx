'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Chatbox from './_components/chatbox';
import MapArea from './_components/map-area';
import Chatbar from './_components/chatbar';
import NewChatModal from './_components/chatbox/new-chat-modal';

export default function ChatClientLayout({ initialChats, initialJourneys }: { initialChats: any[], initialJourneys: any[] }) {
  const params = useParams();
  const chatId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [chatbarPopupOpen, setChatbarPopupOpen] = useState(!chatId);
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false);
  
  const router = useRouter();

  // Automatically manage sidebar visibility based on URL state
  useEffect(() => {
    if (!chatId) {
      if (initialChats?.length > 0) {
        // Auto-redirect to the most recent chat
        router.replace(`/chat/${initialChats[0].id}`);
        // We still want the popup open so the user can easily see options
        setChatbarPopupOpen(true);
      } else {
        setChatbarPopupOpen(true);
      }
    } else {
      // If navigating explicitly to a valid chatId, close the popup to focus on chat
      setChatbarPopupOpen(false);
    }
  }, [chatId, initialChats, router]);

  useEffect(() => {
    const handleToggle = () => setChatbarPopupOpen(prev => !prev);
    window.addEventListener('toggle-chat-popup', handleToggle);
    return () => window.removeEventListener('toggle-chat-popup', handleToggle);
  }, []);

  const closeChatbarPopup = () => setChatbarPopupOpen(false);

  const handleModalSubmit = async (newJourneyData: any) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isNewContext: true,
          newJourneyData
        })
      });
      const data = await res.json();
      if (data.chat) {
        // Navigate to the newly created chat flow
        router.push(`/chat/${data.chat.id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      {/* POPUP: Chatbar (Now absolute and floats over the chatbox) */}
      {chatbarPopupOpen && (
        <div className='absolute left-0 top-0 bottom-0 z-40 bg-white shadow-xl transition-all w-[420px] border-r border-border rounded-r-[24px] overflow-hidden'>
          <Chatbar 
            chats={initialChats}
            journeys={initialJourneys}
            onNewChat={() => {
              closeChatbarPopup();
              // Simply open the modal instead of routing to null-state /chat
              setNewChatModalOpen(true);
            }} 
          />
        </div>
      )}

      {/* LEFT: Chatbox (Full fixed width or percentage) */}
      <div className='h-full w-1/2 border-r bg-white transition-all'>
        <Chatbox 
          chatbarOpen={chatbarPopupOpen}
          onOpenNewChatModal={() => setNewChatModalOpen(true)}
        />
      </div>

      {/* RIGHT: MapArea */}
      <div className='flex-1 bg-gray-100 h-full'>
        <MapArea />
      </div>
      
      {/* Backdrop for mobile or focusing (optional) */}
      {chatbarPopupOpen && (
         <div 
           className="absolute inset-0 z-30 bg-black/10 backdrop-blur-[1px] cursor-pointer" 
           onClick={closeChatbarPopup}
         />
      )}

      {/* Explicit New Journey Modal */}
      <NewChatModal 
        open={isNewChatModalOpen} 
        onClose={() => setNewChatModalOpen(false)} 
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
