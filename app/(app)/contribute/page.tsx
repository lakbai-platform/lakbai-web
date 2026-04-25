'use client';

import { useRef } from 'react';
import MapArea from '@/components/map-area';

export default function ContributePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className='relative h-full w-full overflow-hidden bg-surface-light'>
      <MapArea mode='contribute' overlayContainerRef={containerRef} />
    </div>
  );
}
