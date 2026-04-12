'use client';

import { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { TextHeading, TextBody } from '@/components/text';

export default function NewJourneyModal({ 
  open, 
  onClose,
  onSubmit
}: { 
  open: boolean; 
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [companions, setCompanions] = useState('1 person');
  const [destination, setDestination] = useState('');
  const [isFlexible, setIsFlexible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [preferences, setPreferences] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit({
      companions,
      destination,
      dates: isFlexible ? { isFlexible: true } : { from: startDate, to: endDate },
      preferences
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className='w-full max-w-[500px] overflow-hidden rounded-[24px] bg-background shadow-lg'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border px-6 py-4'>
          <TextHeading className='text-xl font-bold'>Plan a new Journey</TextHeading>
          <button onClick={onClose} className='text-text-muted hover:text-foreground'>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className='flex flex-col gap-5 p-6'>
          <div>
            <TextBody className='mb-2 text-sm font-bold text-foreground'>Where to?</TextBody>
            <input
              type='text'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder='e.g., Legazpi City, Japan'
              className='w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-primary-500'
            />
          </div>

          <div>
            <TextBody className='mb-2 text-sm font-bold text-foreground'>Who's going?</TextBody>
            <select
              value={companions}
              onChange={(e) => setCompanions(e.target.value)}
              className='w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-[15px] outline-none focus:border-primary-500'
            >
              <option value='1 person'>1 person</option>
              <option value='1-2 persons'>1-2 persons</option>
              <option value='3-4 persons'>3-4 persons</option>
              <option value='5-8 persons'>5-8 persons</option>
              <option value='9+ persons'>9+ persons</option>
            </select>
          </div>

          <div>
            <div className='mb-2 flex items-center justify-between'>
              <TextBody className='text-sm font-bold text-foreground'>Dates</TextBody>
              <label className='flex items-center gap-2 text-sm'>
                <input 
                  type='checkbox' 
                  checked={isFlexible} 
                  onChange={(e) => setIsFlexible(e.target.checked)} 
                />
                Flexible
              </label>
            </div>
            {!isFlexible && (
              <div className='flex items-center gap-3'>
                <input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className='w-1/2 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none'
                />
                <span className='text-text-muted'>to</span>
                <input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className='w-1/2 rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none'
                />
              </div>
            )}
            {isFlexible && (
              <div className='rounded-xl border border-border bg-surface p-3 text-center text-sm text-text-muted'>
                We'll let the AI recommend the best dates!
              </div>
            )}
          </div>

          <div>
            <TextBody className='mb-2 text-sm font-bold text-foreground'>Journey Preferences</TextBody>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder='Any specific interests, budget constraints, etc?'
              maxLength={20000}
              className='h-24 w-full resize-none rounded-xl border border-border bg-surface p-3 text-[15px] outline-none focus:border-primary-500'
            />
            <div className='mt-1 text-right text-xs text-text-muted'>{preferences.length}/20000</div>
          </div>
        </div>

        {/* Footer */}
        <div className='border-t border-border p-4'>
          <button
            onClick={handleSubmit}
            disabled={!destination}
            className='w-full rounded-xl bg-primary-600 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50'
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
}
