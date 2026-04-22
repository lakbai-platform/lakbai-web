'use client';

import { useState } from 'react';
import { Heart, Plus, MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { TextHeading, TextBody } from '@/components/text';
import { getTagIcon } from './get-tag-icon';
import type { POI } from './types';

interface PoiHoverCardProps {
  poi: POI;
  onFavorite?: (poiId: string) => void;
  onAdd?: (poiId: string) => void;
}

export default function PoiHoverCard({ poi, onFavorite, onAdd }: PoiHoverCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = poi.galleries || [];
  
  const detailAddress = poi.address
    ? [poi.address.cityMunicipality, poi.address.province]
        .filter(Boolean)
        .join(', ') || 'Unknown Location'
    : 'Unknown Location';

  const { icon: TagIcon } = getTagIcon(poi.tags || []);
  const primaryTag = poi.tags?.[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? Math.max(0, images.length - 1) : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex w-64 flex-col overflow-hidden bg-background">
      {/* Top Half: Image Gallery Wrapper */}
      <div className="group relative h-40 w-full overflow-hidden flex-shrink-0">
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex].imageUrl}
            alt={poi.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )}

        {/* Overlay Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Action Buttons */}
        <div className="absolute right-2 top-2 z-10 flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(poi.id);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition hover:bg-black/50"
          >
            <Heart className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.(poi.id);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 backdrop-blur-md transition hover:bg-black/50"
          >
            <Plus className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Gallery Controls (Shown on hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:bg-black/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:bg-black/50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all",
                    currentImageIndex === idx ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Half: Details */}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-start justify-between gap-2 border-b border-border/50 pb-2">
          <TextHeading className="line-clamp-2 text-sm font-bold leading-tight flex-1">
            {poi.name}
          </TextHeading>
          <div className="flex shrink-0 items-center gap-0.5 text-xs font-semibold">
            <Star className="h-3 w-3 fill-current" />
            {/* hardcoded placeholder similar to PoiDetailsOverlay */}
            4.6 <span className="text-muted-foreground font-normal">({poi.vouchCount})</span>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            {TagIcon && <TagIcon className="h-3.5 w-3.5" />}
            {primaryTag ? primaryTag.name : "Location"}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground line-clamp-1">
            <MapPin className="h-3 w-3 shrink-0" />
            {detailAddress}
          </div>
        </div>

        {poi.description && (
          <TextBody className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {poi.description}
          </TextBody>
        )}
      </div>
    </div>
  );
}
