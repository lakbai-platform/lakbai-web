'use client';

import PoiMapCanvas from '@/components/map-area/PoiMapCanvas';
import { usePois } from '@/components/map-area/use-pois';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import PoiDetailsOverlay from './PoiDetailsOverlay';

type MapAreaProps = {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

export default function MapArea({
  isExpanded = false,
  onToggleExpand
}: MapAreaProps) {
  const { pois } = usePois();
  const [selectedPoiId, setSelectedPoiId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const iconTooltipClass =
    'pointer-events-none absolute top-1/2 left-full z-40 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-primary-dark-700 bg-primary-dark-900 px-2.5 py-1.5 text-xs font-medium text-primary-dark-50 opacity-0 shadow-sm transition-opacity group-hover/map-toggle:opacity-100';

  const selectedPoi = useMemo(
    () => pois.find(poi => poi.id === selectedPoiId) ?? null,
    [pois, selectedPoiId]
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
    const poiFromUrl = searchParams.get('poi');

    if (!poiFromUrl) {
      setSelectedPoiId(null);
      return;
    }

    if (pois.length === 0) {
      return;
    }

    const exists = pois.some(poi => poi.id === poiFromUrl);
    if (exists) {
      setSelectedPoiId(poiFromUrl);
      return;
    }

    setSelectedPoiId(null);
  }, [pois, searchParams]);

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

      <PoiMapCanvas
        pois={pois}
        selectedPoiId={selectedPoiId}
        onMarkerClick={poi => handleOpenPoi(poi.id)}
      />

      {selectedPoi && (
        <PoiDetailsOverlay
          poi={selectedPoi}
          copied={copied}
          onClose={handleClosePoi}
          onCopyShareUrl={handleCopyShareUrl}
        />
      )}
    </div>
  );
}
