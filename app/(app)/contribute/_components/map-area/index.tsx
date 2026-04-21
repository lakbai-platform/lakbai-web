'use client';

import { useEffect, useRef, useState } from 'react';
import type { MapRef } from '@/components/ui/map';
import PoiMapCanvas from '@/components/map-area/PoiMapCanvas';
import { usePois } from '@/components/map-area/use-pois';
import { Eye, MapPinPlusInside } from 'lucide-react';

export default function ContributeMapArea() {
  const { pois } = usePois();
  const [isAddLocationMode, setIsAddLocationMode] = useState(false);
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    const canvas = mapRef.current?.getCanvas();
    if (!canvas) return;

    canvas.style.cursor = isAddLocationMode ? 'crosshair' : '';

    return () => {
      if (canvas.style.cursor === 'crosshair') {
        canvas.style.cursor = '';
      }
    };
  }, [isAddLocationMode]);

  return (
    <div className='relative flex h-full w-full flex-col'>
      <div className='absolute top-2 left-2 z-30'>
        <button
          type='button'
          onClick={() => setIsAddLocationMode(prev => !prev)}
          aria-pressed={isAddLocationMode}
          aria-label='Add new point'
          className={`border-border bg-background/95 text-text-main hover:bg-surface-light relative inline-flex h-9 cursor-default items-center overflow-hidden rounded-full border shadow-sm backdrop-blur-sm transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isAddLocationMode ? 'w-9' : 'w-37'
          }`}
        >
          <span className='bg-primary-500 absolute top-1/2 left-1 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white'>
            <MapPinPlusInside className='h-4 w-4' />
          </span>
          <span
            className={`absolute top-1/2 left-10 -translate-y-1/2 text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out ${
              isAddLocationMode
                ? 'translate-x-1 opacity-0'
                : 'translate-x-0 opacity-100'
            }`}
          >
            Add a location
          </span>
        </button>
      </div>

      <div className='absolute top-2 right-2 z-30'>
        <button
          type='button'
          aria-label='Preview map visibility'
          className='border-border bg-background/95 text-text-main hover:bg-surface-light flex h-8 w-8 cursor-default items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition'
        >
          <Eye className='h-4 w-4' />
        </button>
      </div>

      <PoiMapCanvas
        pois={pois}
        mapRef={mapRef}
        mapClassName={
          isAddLocationMode ? '[&_.maplibregl-canvas]:cursor-crosshair' : ''
        }
        controlsClassName='[&_button]:cursor-default'
        markerContentClassName={isAddLocationMode ? 'cursor-default' : ''}
        renderPopup={poi => (
          <>
            <h3 className='text-foreground text-sm leading-tight font-semibold'>
              {poi.name}
            </h3>
            <p className='text-muted-foreground mt-1 line-clamp-2 text-xs'>
              {poi.description}
            </p>

            <div className='mt-2 flex flex-wrap gap-1'>
              {poi.tags?.map(tag => (
                <span
                  key={tag.id}
                  className='bg-secondary text-secondary-foreground rounded-sm px-1.5 py-0.5 text-[10px]'
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className='border-border/50 mt-2 flex items-center gap-2 border-t pt-2 text-xs'>
              <span className='text-primary font-medium'>
                👍 {poi.vouchCount} Vouches
              </span>
            </div>
          </>
        )}
      />
    </div>
  );
}
