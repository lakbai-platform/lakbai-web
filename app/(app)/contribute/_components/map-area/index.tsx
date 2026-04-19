'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  type MapRef
} from '@/components/ui/map';
import {
  MapPin,
  Utensils,
  Coffee,
  Mountain,
  Bike,
  Landmark,
  Bed,
  Leaf,
  Eye,
  MapPinPlusInside,
  type LucideIcon
} from 'lucide-react';

type POITag = {
  id: string;
  name: string;
};

type POI = {
  id: string;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  vouchCount: number;
  tags?: POITag[];
};

const getTagIcon = (tags: POITag[]): { icon: LucideIcon; color: string } => {
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

export default function ContributeMapArea() {
  const [pois, setPois] = useState<POI[]>([]);
  const [isAddLocationMode, setIsAddLocationMode] = useState(false);
  const mapRef = useRef<MapRef | null>(null);

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

      <Map
        ref={mapRef}
        className={
          isAddLocationMode ? '[&_.maplibregl-canvas]:cursor-crosshair' : ''
        }
        center={[123.734, 13.139]}
        zoom={12}
        theme='light'
        styles={{
          light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        }}
      >
        <MapControls className='[&_button]:cursor-default' />
        {pois.map(poi => {
          const { icon: Icon, color } = getTagIcon(poi.tags || []);

          return (
            <MapMarker
              key={poi.id}
              longitude={poi.longitude}
              latitude={poi.latitude}
            >
              <MarkerContent
                className={isAddLocationMode ? 'cursor-default' : ''}
              >
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
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}
