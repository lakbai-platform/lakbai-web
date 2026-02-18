'use client';

import { useState } from 'react';
import JourneyArea from '../journey-area';

export default function Chatbox() {
  const [message, setMessage] = useState('');
  const [journeyOpen, setJourneyOpen] = useState(false);

  return (
    <div className='relative flex h-full w-full flex-col gap-3 bg-gray-50 p-4'>
      {/* ✅ JOURNEY BUTTON — OUTSIDE CHAT CARD */}
      <div>
        <button
          onClick={() => setJourneyOpen(true)}
          className='flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm hover:bg-gray-100'
        >
          🧭 Journey
        </button>
      </div>

      {/* ✅ CHAT CARD */}
      <div className='flex flex-1 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm'>
        {/* CHAT HEADER */}
        <div className='border-b px-4 py-3'>
          <h2 className='text-sm font-semibold text-gray-800'>
            AI Travel Assistant
          </h2>
        </div>

        {/* CHAT BODY */}
        <div className='flex flex-1 flex-col'>
          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-4'>
            <div className='text-sm text-gray-500'>
              Ask your AI travel assistant anything.
            </div>
          </div>

          {/* Input */}
          <div className='p-3'>
            <div className='flex items-center gap-2 rounded-xl border px-3 py-2'>
              <input
                type='text'
                placeholder='Ask anything...'
                value={message}
                onChange={e => setMessage(e.target.value)}
                className='flex-1 bg-transparent text-sm outline-none'
              />
              <button className='rounded-lg bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700'>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* JOURNEY OVERLAY (Future Use — Safe To Keep) */}
      <JourneyArea open={journeyOpen} onClose={() => setJourneyOpen(false)} />
    </div>
  );
}
