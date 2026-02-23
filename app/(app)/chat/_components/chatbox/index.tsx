'use client';

import { useState } from 'react';
import JourneyArea from '../journey-area';
import { 
  Luggage, 
  Share, 
  ChevronDown, 
  Mic, 
  CornerDownRight
} from 'lucide-react';
import { TextBody } from '@/components/text';

export default function Chatbox() {
  const [message, setMessage] = useState('');
  const [journeyOpen, setJourneyOpen] = useState(false);

  return (
    <div className='relative flex h-full w-full flex-col gap-4 bg-surface p-4'>
      {/* Top Action Bar */}
      <div className='flex items-center justify-between'>
        <button
          onClick={() => setJourneyOpen(true)}
          className='flex items-center gap-2 rounded-full border border-text-muted bg-background py-[6px] pl-3 pr-[6px] shadow-sm hover:bg-surface'
        >
          <Luggage size={18} strokeWidth={2} className='text-text-main' />
          <span className='text-[15px] font-medium text-text-main'>Journey</span>
          <div className='flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white'>
            0
          </div>
        </button>

        <button className='flex h-9 w-9 items-center justify-center rounded-full border border-text-muted bg-background text-text-main shadow-sm hover:bg-surface'>
          <Share size={18} strokeWidth={2} className='-mt-0.5' />
        </button>
      </div>

      {/* Main Chat Card */}
      <div className='flex flex-1 flex-col overflow-hidden rounded-[24px] border border-text-muted bg-background'>
        {/* Chat Card Header :
        Take note na contents with placeholders are to be filled with dynamic data from a database 
        */}
        <div className='flex items-center justify-between border-b border-text-muted px-5 py-4'>
          <TextBody className='leading-tight font-bold'>
            5 day trip historical trip in Legazpi City, Albay, Philippines
          </TextBody>
          <button className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-text-muted hover:bg-surface ml-3'>
            <ChevronDown size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Chat Body Area */}
        <div className='flex flex-1 flex-col justify-end'>
          {/* Messages Area (Hidden/Blank for now) */}
          <div className='flex-1 overflow-y-auto p-4' />

          {/* Bottom Input Area */}
          <div className='px-4 pb-4 pt-1'>
            <div className='flex items-center gap-3 rounded-[24px] border border-text-muted bg-background px-5 py-[14px]'>
              <input
                type='text'
                placeholder='Ask anything'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-1 bg-transparent text-[15px] text-text-main placeholder:text-text-muted outline-none'
              />
              <button className='text-text-main hover:text-primary-800 hover:bg-surface p-1 rounded-full'>
                <Mic size={22} strokeWidth={1.5} />
              </button>
              <button className='text-text-main hover:text-primary-800 hover:bg-surface p-1 rounded-full'>
                <CornerDownRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* JOURNEY OVERLAY */}
      <JourneyArea open={journeyOpen} onClose={() => setJourneyOpen(false)} />
    </div>
  );
}
