import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, SquarePlus, Ellipsis, Trash2} from 'lucide-react';
import { TextBody } from '@/components/text';

type ChatbarProps = { 
  chats: any[]; 
  journeys: any[]; 
  onNewChat: () => void; 
};

export default function Chatbar({ chats, journeys, onNewChat }: ChatbarProps) {
  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDelete = async (type: 'journey' | 'chat', id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
       setOpenDropdownId(null);
       return;
    }
    try {
      await fetch(`/api/chat?type=${type}&id=${id}`, { method: 'DELETE' });
      setOpenDropdownId(null);
      router.refresh();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <div className='flex h-full w-full flex-col bg-surface-light text-text-main overflow-hidden'>
      {/* Search Bar area */}
      <div className='p-4 pr-10'>
        <div className='flex items-center gap-2 rounded-2xl bg-surface px-4 py-2.5 transition-colors border border-border focus-within:border-primary-500'>
          <Search size={18} className='text-text-muted shrink-0' />
          <input 
            type='text' 
            placeholder='Search...' 
            className='w-full bg-transparent text-[15px] text-text-main outline-none placeholder:text-text-muted'
          />
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-2 pb-4 scrollbar-none'>
        {/* Top Actions */}
        <div className='flex flex-col gap-1 mb-6 px-2'>
          <button
            onClick={onNewChat}
            className='flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] font-medium transition-colors hover:bg-surface'
          >
            <Edit size={18} className='text-text-main' />
            <span>New chat</span>
          </button>
          
          <button
            onClick={onNewChat}
            className='flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] font-medium transition-colors hover:bg-surface'
          >
            <SquarePlus size={18} className='text-text-main' />
            <span className='ml-2'>New journey</span>
          </button>
        </div>

        {/* Journey List */}
        <div className='mb-6'>
          <TextBody className='mb-2 px-4 text-[13px] font-medium text-text-muted'>
            Journeys
          </TextBody>
          <div className='flex flex-col gap-1'>
            {journeys?.map((journey) => (
              <div
                key={journey.id}
                className='flex items-center cursor-pointer gap-3 rounded-lg px-4 py-2 transition-colors hover:bg-surface group relative'
              >
                <div className='h-8 w-8 shrink-0 overflow-hidden rounded-md bg-slate-100 border border-border'>
                   {/* Dummy image representation - a placeholder div */}
                </div>
                <span className='flex-1 truncate text-[15px] font-medium text-text-main'>
                  {journey.title || `Journey to ${journey.destination || 'Unknown'}`}
                </span>
                
                <div className='relative flex items-center'>
                  <button 
                    onClick={(e) => {
                       e.stopPropagation();
                       e.preventDefault();
                       setOpenDropdownId(openDropdownId === journey.id ? null : journey.id);
                    }}
                    className={`rounded-md p-1 transition-all ${openDropdownId === journey.id ? 'opacity-100 bg-slate-200' : 'opacity-0 group-hover:opacity-100 hover:bg-slate-200'}`}
                  >
                    <Ellipsis size={18} className='text-text-main' />
                  </button>

                  {openDropdownId === journey.id && (
                     <div className='absolute right-0 top-full mt-1 z-50 w-36 overflow-hidden rounded-lg border border-border bg-white shadow-lg'>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            e.preventDefault(); 
                            handleDelete('journey', journey.id) 
                          }} 
                          className='flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50'
                        >
                          <Trash2 size={14} /> Delete Journey
                        </button>
                     </div>
                  )}
                </div>
              </div>
            ))}
            {!journeys?.length && (
               <div className='px-4 py-2 text-sm text-text-muted'>No journeys yet.</div>
            )}
          </div>
        </div>

        {/* Chats List */}
        <div>
          <TextBody className='mb-2 px-4 text-[13px] font-medium text-text-muted'>
            Chats
          </TextBody>
          <div className='flex flex-col gap-1'>
            {chats?.map((chat) => {
              // Find matching journey for subtitle
              const journey = journeys?.find(j => j.id === chat.journeyId);
              
              return (
                <Link
                  key={chat.id}
                  href={`/chat/${chat.id}`}
                  className='group relative flex items-center justify-between gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-surface'
                >
                  <div className='flex flex-1 flex-col gap-0.5 overflow-hidden'>
                    <span className='truncate text-[15px] font-medium text-text-main'>
                      {chat.title || 'Untitled'}
                    </span>
                    <span className='truncate text-[13px] text-text-muted'>
                      {journey ? `Trip to ${journey.destination || 'Unknown'}` : 'Trip'}
                    </span>
                  </div>

                  <div className='relative flex items-center shrink-0'>
                    <button 
                      onClick={(e) => {
                         e.stopPropagation();
                         e.preventDefault();
                         setOpenDropdownId(openDropdownId === chat.id ? null : chat.id);
                      }}
                      className={`rounded-md p-1 transition-all ${openDropdownId === chat.id ? 'opacity-100 bg-slate-200' : 'opacity-0 group-hover:opacity-100 hover:bg-slate-200'}`}
                    >
                      <Ellipsis size={18} className='text-text-main' />
                    </button>

                    {openDropdownId === chat.id && (
                       <div className='absolute right-0 top-full mt-1 z-50 w-32 overflow-hidden rounded-lg border border-border bg-white shadow-lg'>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              e.preventDefault(); 
                              handleDelete('chat', chat.id) 
                            }} 
                            className='flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50'
                          >
                            <Trash2 size={14} /> Delete Chat
                          </button>
                       </div>
                    )}
                  </div>
                </Link>
              );
            })}
            {!chats?.length && (
               <div className='px-4 py-2 text-sm text-text-muted'>No chats yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
