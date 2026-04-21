'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import ExploreArea from './_components/explore-area';
import MapArea from '@/components/map-area';

export default function ExplorePage() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <div className='flex h-full w-full overflow-hidden'>
      <div
        className={cn(
          'bg-surface border-border h-full transition-all duration-300 ease-in-out',
          isMapExpanded
            ? 'pointer-events-none w-0 overflow-hidden border-r-0 opacity-0'
            : 'w-1/2 border-r opacity-100'
        )}
      >
        <ExploreArea />
      </div>

      <div className='bg-surface-light h-full flex-1'>
        <MapArea
          isExpanded={isMapExpanded}
          onToggleExpand={() => setIsMapExpanded(prev => !prev)}
        />
      </div>
    </div>
  );
}
