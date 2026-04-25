'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { Map, MapControls, MapMarker, MarkerContent, MarkerHoverPopup } from '@/components/ui/map';
import type { MapRef } from '@/components/ui/map';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';

import { LEGAZPI_MAP_CENTER, MAP_LIGHT_STYLE_URL } from './constants';
import { getTagIcon } from './get-tag-icon';
import type { POI } from './types';

export type PickedLocation = {
  latitude: number;
  longitude: number;
};

type ContributeMapAreaProps = {
  /** Existing approved POIs shown as read-only reference */
  pois: POI[];
  /** Currently pinned location from a user click */
  pickedLocation: PickedLocation | null;
  /** Called when the user clicks the map to place/move a pin */
  onLocationPick: (loc: PickedLocation) => void;
  /** Called when user clicks an existing POI to suggest an edit */
  onSuggestEdit?: (poi: POI) => void;
  mapRef?: RefObject<MapRef | null>;
  isAddMode: boolean;
  hiddenPoiIds?: string[];
};

export default function ContributeMapArea({
  pois,
  pickedLocation,
  onLocationPick,
  onSuggestEdit,
  mapRef,
  isAddMode,
  hiddenPoiIds = [],
}: ContributeMapAreaProps) {
  // Keep a stable ref to callbacks so the effect doesn't re-register
  const onLocationPickRef = useRef(onLocationPick);
  onLocationPickRef.current = onLocationPick;

  const isAddModeRef = useRef(isAddMode);
  isAddModeRef.current = isAddMode;

  // Attach/detach the map click listener imperatively (the Map component
  // doesn't expose an onClick prop — it uses MapLibre's native event system)
  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;

    const handleClick = (e: maplibregl.MapMouseEvent) => {
      if (!isAddModeRef.current) return;
      onLocationPickRef.current({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  // Re-attach whenever the map instance changes (ref is stable, so this runs once)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef?.current]);

  return (
    <Map
      ref={mapRef}
      className={isAddMode ? '[&_.maplibregl-canvas]:cursor-crosshair' : ''}
      center={
        pickedLocation
          ? [pickedLocation.longitude, pickedLocation.latitude]
          : LEGAZPI_MAP_CENTER
      }
      zoom={12}
      theme='light'
      styles={{ light: MAP_LIGHT_STYLE_URL }}
    >
      <MapControls className='[&_button]:cursor-default' />

      {/* Existing POIs — read-only reference markers */}
      {pois.map(poi => {
        if (hiddenPoiIds.includes(poi.id)) {
          return null;
        }

        const { icon: Icon, color } = getTagIcon(poi.tags || [], poi.primaryTagId);
        return (
          <MapMarker
            key={poi.id}
            longitude={poi.longitude}
            latitude={poi.latitude}
            onClick={onSuggestEdit ? () => onSuggestEdit(poi) : undefined}
          >
            <MarkerContent>
              <div
                className={cn(
                  'relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow opacity-70 transition-opacity hover:opacity-100',
                  color
                )}
              >
                <Icon className='h-3.5 w-3.5 text-white' />
              </div>
            </MarkerContent>
            {onSuggestEdit && (
              <MarkerHoverPopup delay={200}>
                <div className='bg-background rounded-lg px-3 py-2 text-xs font-medium shadow'>
                  <p className='text-text-main font-semibold'>{poi.name}</p>
                  <p className='text-text-muted mt-0.5'>Click to suggest an edit</p>
                </div>
              </MarkerHoverPopup>
            )}
          </MapMarker>
        );
      })}

      {/* User-placed pin */}
      {pickedLocation && (
        <MapMarker
          longitude={pickedLocation.longitude}
          latitude={pickedLocation.latitude}
          draggable
          onDragEnd={({ lng, lat }) =>
            onLocationPickRef.current({ latitude: lat, longitude: lng })
          }
        >
          <MarkerContent>
            <div className='relative flex flex-col items-center'>
              <div className='bg-background/95 text-text-main mb-1.5 max-w-56 rounded-lg border px-2.5 py-1.5 text-center text-[11px] leading-tight shadow-sm'>
                Drag this marker to update latitude and longitude.
              </div>
              <div className='bg-primary-500 flex h-9 w-9 animate-bounce items-center justify-center rounded-full border-2 border-white shadow-lg'>
                <MapPin className='h-5 w-5 text-white' />
              </div>
            </div>
          </MarkerContent>
        </MapMarker>
      )}
    </Map>
  );
}
