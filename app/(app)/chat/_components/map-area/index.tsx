'use client';

import { Map, MapControls } from '@/components/ui/map';

export default function MapArea() {
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
      </Map>
    </div>
  );
}
