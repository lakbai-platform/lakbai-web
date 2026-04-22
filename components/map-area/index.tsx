'use client';

import { useEffect, useMemo, useState, useRef, type RefObject } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Eye,
  MapPinPlusInside
} from 'lucide-react';
import type { MapRef } from '@/components/ui/map';

import PoiMapCanvas from './PoiMapCanvas';
import { usePois } from './use-pois';
import PoiDetailsOverlay from './PoiDetailsOverlay';
import PoiHoverCard from './PoiHoverCard';
import { getTagLabel, getTagVisual } from './get-tag-icon';
import type { POI } from './types';

type MapAreaProps = {
  mode?: 'view' | 'contribute';
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  overlayContainerRef?: RefObject<HTMLElement | null>;
};

export default function MapArea({
  mode = 'view',
  isExpanded = false,
  onToggleExpand,
  overlayContainerRef
}: MapAreaProps) {
  const { pois, isLoading: isPoisLoading } = usePois();
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isAddLocationMode, setIsAddLocationMode] = useState(false);
  const mapRef = useRef<MapRef | null>(null);

  // Fallback for dynamically fetching a single shared POI not in local bounds
  const [isolatedPoi, setIsolatedPoi] = useState<POI | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isContribute = mode === 'contribute';

  const iconTooltipClass =
    'pointer-events-none absolute top-1/2 left-full z-40 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-primary-dark-700 bg-primary-dark-900 px-2.5 py-1.5 text-xs font-medium text-primary-dark-50 opacity-0 shadow-sm transition-opacity group-hover/map-toggle:opacity-100';

  const combinedPois = useMemo(() => {
    if (isolatedPoi && !pois.some(p => p.id === isolatedPoi.id)) {
      return [...pois, isolatedPoi];
    }
    return pois;
  }, [pois, isolatedPoi]);

  const selectedPoi = useMemo(
    () => combinedPois.find(poi => poi.id === selectedPoiId) ?? null,
    [combinedPois, selectedPoiId]
  );

  const shareUrl = useMemo(() => {
    if (!selectedPoiId) return '';
    if (typeof window === 'undefined')
      return `${pathname}?poi=${selectedPoiId}`;
    return `${window.location.origin}${pathname}?poi=${selectedPoiId}`;
  }, [pathname, selectedPoiId]);

  const updatePoiInUrl = (poiId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (poiId) {
      params.set('poi', poiId);
    } else {
      params.delete('poi');
    }

    const nextQuery = params.toString();
    const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextPath, { scroll: false });
  };

  const handleOpenPoi = (poiId: string) => {
    // If contributing and adding location, don't open details
    if (isContribute && isAddLocationMode) return;
    setSelectedPoiId(poiId);
    updatePoiInUrl(poiId);
  };

  const handleClosePoi = () => {
    setSelectedPoiId(null);
    updatePoiInUrl(null);
  };

  const handleCopyShareUrl = async () => {
    if (!shareUrl || typeof navigator === 'undefined') return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy URL', error);
    }
  };

  useEffect(() => {
    if (!isContribute) return;
    const canvas = mapRef.current?.getCanvas();
    if (!canvas) return;

    canvas.style.cursor = isAddLocationMode ? 'crosshair' : '';

    return () => {
      if (canvas.style.cursor === 'crosshair') {
        canvas.style.cursor = '';
      }
    };
  }, [isAddLocationMode, isContribute]);

  // Handle URL sync and dynamic fetching of shared isolated POIs
  useEffect(() => {
    const poiFromUrl = searchParams.get('poi');

    if (!poiFromUrl) {
      setSelectedPoiId(null);
      return;
    }

    // Wait until initial batch fetch finishes to check if isolated
    if (isPoisLoading) return;

    const existsInBatch = pois.some(poi => poi.id === poiFromUrl);

    if (existsInBatch) {
      setSelectedPoiId(poiFromUrl);
    } else {
      // Dynamic hydration logic for isolated POIs
      fetch(`/api/pois/${poiFromUrl}`)
        .then(res => {
          if (!res.ok) throw new Error('Dynamic POI fetch failed');
          return res.json();
        })
        .then(data => {
          if (data.poi) {
            // Normalize to match types
            const p = data.poi;
            setIsolatedPoi({
              ...p,
              latitude: Number(p.latitude),
              longitude: Number(p.longitude),
              vouchCount: Number(p.vouchCount),
              primaryTagId: p.primaryTagId ?? null,
              tags: p.tags || [],
              galleries: p.galleries || [],
              address: p.address || null
            });
            setSelectedPoiId(poiFromUrl);
          } else {
            setSelectedPoiId(null);
          }
        })
        .catch(err => {
          console.error(err);
          setSelectedPoiId(null);
        });
    }
  }, [pois, searchParams, isPoisLoading]);

  return (
    <div className='relative flex h-full w-full flex-col'>
      {!isContribute && onToggleExpand && (
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

      {isContribute && (
        <>
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
        </>
      )}

      <PoiMapCanvas
        pois={combinedPois}
        mapRef={isContribute ? mapRef : undefined}
        selectedPoiId={selectedPoiId}
        onMarkerClick={poi => handleOpenPoi(poi.id)}
        mapClassName={
          isContribute && isAddLocationMode
            ? '[&_.maplibregl-canvas]:cursor-crosshair'
            : ''
        }
        controlsClassName={isContribute ? '[&_button]:cursor-default' : ''}
        markerContentClassName={
          isContribute && isAddLocationMode ? 'cursor-default' : ''
        }
        renderPopup={
          isContribute
            ? poi => (
                <>
                  <h3 className='text-foreground text-sm leading-tight font-semibold'>
                    {poi.name}
                  </h3>
                  <p className='text-muted-foreground mt-1 line-clamp-2 text-xs'>
                    {poi.description}
                  </p>

                  <div className='mt-2 flex flex-wrap gap-1'>
                    {poi.tags?.map(tag => {
                      const { icon: TagIcon, color } = getTagVisual(tag);

                      return (
                        <span
                          key={tag.id}
                          className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-white ${color}`}
                        >
                          <TagIcon className='h-2.5 w-2.5' />
                          {getTagLabel(tag)}
                        </span>
                      );
                    })}
                  </div>

                  <div className='border-border/50 mt-2 flex items-center gap-2 border-t pt-2 text-xs'>
                    <span className='text-primary font-medium'>
                      👍 {poi.vouchCount} Vouches
                    </span>
                  </div>
                </>
              )
            : undefined
        }
        renderHoverPopup={
          !isContribute || !isAddLocationMode
            ? poi => (
                <PoiHoverCard
                  poi={poi}
                  onFavorite={id => console.log('Favorited', id)}
                  onAdd={id => handleOpenPoi(id)}
                />
              )
            : undefined
        }
      />

      {selectedPoi && !isAddLocationMode && (
        <PoiDetailsOverlay
          poi={selectedPoi}
          copied={copied}
          onClose={handleClosePoi}
          onCopyShareUrl={handleCopyShareUrl}
          portalContainer={overlayContainerRef?.current}
        />
      )}
    </div>
  );
}
