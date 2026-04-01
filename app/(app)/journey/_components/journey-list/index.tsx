'use client';

import { BadgePlus, Luggage } from 'lucide-react';
import { TextHeading, TextBody } from '@/components/text';
import JourneyCard from '../journey-card';

type Journey = {
  id: string;
  title: string;
  location: string;
  days: number;
};

export default function JourneyList() {
  // 🔁 Toggle this to test UI
  const journeys: Journey[] = [];

  // const journeys: Journey[] = []; // ← use this to test empty state

  if (journeys.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div className='flex flex-col items-center text-center'>
          {/* Icon */}
          <div className='bg-primary-50 mb-8 flex h-24 w-24 items-center justify-center rounded-full'>
            <Luggage className='text-primary-600 h-12 w-12' />
          </div>

          {/* Title */}
          <TextHeading className='text-text-main mb-3 text-[24px] font-semibold'>
            No journeys yet
          </TextHeading>

          {/* Description */}
          <TextBody className='text-text-muted mb-8 max-w-[380px] text-base'>
            Start planning your next adventure by creating your first journey.
          </TextBody>

          {/* Button */}
          <button className='bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium text-white transition-colors'>
            Create a Journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full w-full flex-col p-6'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <TextHeading className='text-text-main'>My Journeys</TextHeading>

        <button className='bg-primary-600 hover:bg-primary-700 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors'>
          <BadgePlus size={16} />
          New Journey
        </button>
      </div>

      {/* Grid */}
      <div className='flex flex-wrap gap-6'>
        {journeys.map(journey => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>
    </div>
  );
}
