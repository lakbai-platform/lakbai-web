'use client';

import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from '@/components/ui/map';
import { useEffect, useState } from 'react';
import { MapPin, Utensils, Coffee, Mountain, Bike, Landmark, Bed, Leaf, type LucideIcon } from 'lucide-react';

const getTagIcon = (tags: any[]): { icon: LucideIcon; color: string } => {
  if (!tags || tags.length === 0) return { icon: MapPin, color: 'bg-blue-500' };
  
  const tagName = tags[0].name.toLowerCase();
  
  if (['restaurant', 'bakery'].includes(tagName)) return { icon: Utensils, color: 'bg-orange-500' };
  if (tagName === 'cafe') return { icon: Coffee, color: 'bg-amber-600' };
  if (['hill', 'mountain', 'mountain_biking'].includes(tagName)) return { icon: Mountain, color: 'bg-emerald-600' };
  if (['park', 'atv'].includes(tagName)) return { icon: Bike, color: 'bg-green-500' };
  if (['tourist_attraction', 'historical_landmark', 'church'].includes(tagName)) return { icon: Landmark, color: 'bg-purple-500' };
  if (['hotel', 'resort'].includes(tagName)) return { icon: Bed, color: 'bg-indigo-500' };
  if (tagName === 'spa') return { icon: Leaf, color: 'bg-teal-500' };
  
  return { icon: MapPin, color: 'bg-blue-500' };
};

export default function MapArea() {
  const [pois, setPois] = useState<any[]>([]);

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
    <div className='flex h-full w-full flex-col'>
      {/* 
        This is using mapcn built on MapLibre. 
        It points to the free OpenStreetMap tiles. 
      */}
      <Map
        center={[123.734, 13.139]} // Legazpi City Coordinates
        zoom={12}
        theme="light" // Force light mode to keep it always white 
        styles={{
          light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        }}
      >
        <MapControls />
        {pois.map((poi) => {
          const { icon: Icon, color } = getTagIcon(poi.tags);
          
          return (
            <MapMarker
              key={poi.id}
              longitude={poi.longitude}
              latitude={poi.latitude}
            >
              <MarkerContent>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 ${color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </MarkerContent>
              <MarkerPopup className="w-[200px] p-4 flex flex-col gap-1">
                <h3 className="font-semibold text-sm leading-tight text-foreground">{poi.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{poi.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {poi.tags?.map((tag: any) => (
                    <span key={tag.id} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-xs mt-2 border-t pt-2 border-border/50">
                  <span className="font-medium text-primary">👍 {poi.vouchCount} Vouches</span>
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}
