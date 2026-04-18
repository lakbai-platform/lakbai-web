'use client';

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup
} from '@/components/ui/map';
import { useEffect, useState } from 'react';
import {
  MapPin,
  Utensils,
  Coffee,
  Mountain,
  Bike,
  Landmark,
  Bed,
  Leaf,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  type LucideIcon
} from 'lucide-react';

const getTagIcon = (tags: any[]): { icon: LucideIcon; color: string } => {
  if (!tags || tags.length === 0) return { icon: MapPin, color: 'bg-blue-500' };

  const tagName = tags[0].name.toLowerCase();

  if (['restaurant', 'bakery'].includes(tagName))
    return { icon: Utensils, color: 'bg-orange-500' };
  if (tagName === 'cafe') return { icon: Coffee, color: 'bg-amber-600' };
  if (['hill', 'mountain', 'mountain_biking'].includes(tagName))
    return { icon: Mountain, color: 'bg-emerald-600' };
  if (['park', 'atv'].includes(tagName))
    return { icon: Bike, color: 'bg-green-500' };
  if (['tourist_attraction', 'historical_landmark', 'church'].includes(tagName))
    return { icon: Landmark, color: 'bg-purple-500' };
  if (['hotel', 'resort'].includes(tagName))
    return { icon: Bed, color: 'bg-indigo-500' };
  if (tagName === 'spa') return { icon: Leaf, color: 'bg-teal-500' };

  return { icon: MapPin, color: 'bg-blue-500' };
};

type MapAreaProps = {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

export default function MapArea({
  isExpanded = false,
  onToggleExpand
}: MapAreaProps) {
  const [pois, setPois] = useState<any[]>([]);
  const iconTooltipClass =
    'pointer-events-none absolute top-1/2 left-full z-40 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-primary-dark-700 bg-primary-dark-900 px-2.5 py-1.5 text-xs font-medium text-primary-dark-50 opacity-0 shadow-sm transition-opacity group-hover/map-toggle:opacity-100';

  useEffect(() => {
    async function loadPOIs() {
      try {
        const res = await fetch('/api/pois');
        if (res.ok) {
          const data = await res.json();
          setPois(data.pois || []);
        }
      } catch (err) {
        console.error('Failed to load POIs:', err);
      }
    }
    loadPOIs();
  }, []);

  return (
    <div className='relative flex h-full w-full flex-col'>
      {onToggleExpand && (
        <div className='absolute top-4 left-4 z-30'>
          <button
            type='button'
            onClick={onToggleExpand}
            aria-label={isExpanded ? 'Collapse map' : 'Expand map'}
            className='group/map-toggle border-border bg-background/95 text-text-main hover:bg-surface-light relative flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition'
          >
            {isExpanded ? (
              <ArrowRightFromLine className='h-4 w-4' />
            ) : (
              <ArrowLeftFromLine className='h-4 w-4' />
            )}
            <span className={iconTooltipClass}>
              {isExpanded ? 'Collapse' : 'Expand'}
            </span>
          </button>
        </div>
      )}

      {/* 
        This is using mapcn built on MapLibre. 
        It points to the free OpenStreetMap tiles. 
      */}
      <Map
        center={[123.734, 13.139]} // Legazpi City Coordinates
        zoom={12}
        theme='light' // Force light mode to keep it always white
        styles={{
          light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        }}
      >
        <MapControls />
        {pois.map(poi => {
          const { icon: Icon, color } = getTagIcon(poi.tags);

          return (
            <MapMarker
              key={poi.id}
              longitude={poi.longitude}
              latitude={poi.latitude}
            >
              <MarkerContent>
                <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 ${color}`}
                >
                  <Icon className='h-4 w-4 text-white' />
                </div>
              </MarkerContent>
              <MarkerPopup className='flex w-50 flex-col gap-1 p-4'>
                <h3 className='text-foreground text-sm leading-tight font-semibold'>
                  {poi.name}
                </h3>
                <p className='text-muted-foreground mt-1 line-clamp-2 text-xs'>
                  {poi.description}
                </p>

                <div className='mt-2 flex flex-wrap gap-1'>
                  {poi.tags?.map((tag: any) => (
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
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}
