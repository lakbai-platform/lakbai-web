'use client';

import { type ReactNode, type RefObject } from 'react';

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerHoverPopup,
  type MapRef
} from '@/components/ui/map';
import { cn } from '@/lib/cn';

import { LEGAZPI_MAP_CENTER, MAP_LIGHT_STYLE_URL } from './constants';
import { getTagIcon } from './get-tag-icon';
import type { POI } from './types';

type PoiMapCanvasProps = {
  pois: POI[];
  center?: [number, number];
  zoom?: number;
  mapRef?: RefObject<MapRef | null>;
  mapClassName?: string;
  controlsClassName?: string;
  markerContentClassName?: string;
  showControls?: boolean;
  selectedPoiId?: string | null;
  onMarkerClick?: (poi: POI) => void;
  renderPopup?: (poi: POI) => ReactNode;
  renderHoverPopup?: (poi: POI) => ReactNode;
};

export default function PoiMapCanvas({
  pois,
  center,
  zoom = 12,
  mapRef,
  mapClassName,
  controlsClassName,
  markerContentClassName,
  showControls = true,
  selectedPoiId,
  onMarkerClick,
  renderPopup,
  renderHoverPopup
}: PoiMapCanvasProps) {
  const resolvedCenter =
    center ??
    (pois.length > 0
      ? [pois[0].longitude, pois[0].latitude]
      : LEGAZPI_MAP_CENTER);

  return (
    <Map
      ref={mapRef}
      className={mapClassName}
      center={resolvedCenter}
      zoom={zoom}
      theme='light'
      styles={{ light: MAP_LIGHT_STYLE_URL }}
    >
      {showControls && <MapControls className={controlsClassName} />}

      {pois.map(poi => {
        const { icon: Icon, color } = getTagIcon(poi.tags || []);
        const isSelected = selectedPoiId === poi.id;

        return (
          <MapMarker
            key={poi.id}
            longitude={poi.longitude}
            latitude={poi.latitude}
            onClick={onMarkerClick ? () => onMarkerClick(poi) : undefined}
          >
            <MarkerContent
              className={cn(
                onMarkerClick ? undefined : 'cursor-default',
                markerContentClassName
              )}
            >
              <div
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110',
                  color,
                  isSelected && 'ring-primary ring-2 ring-offset-1'
                )}
              >
                <Icon className='h-4 w-4 text-white' />
              </div>
            </MarkerContent>

            {renderPopup && (
              <MarkerPopup className='flex w-50 flex-col gap-1 p-4'>
                {renderPopup(poi)}
              </MarkerPopup>
            )}

            {renderHoverPopup && (
              <MarkerHoverPopup delay={300}>
                {renderHoverPopup(poi)}
              </MarkerHoverPopup>
            )}
          </MapMarker>
        );
      })}
    </Map>
  );
}
