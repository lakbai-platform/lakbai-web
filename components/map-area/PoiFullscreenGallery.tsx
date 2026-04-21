'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, PlusCircle, Share } from 'lucide-react';

import type { POIGallery } from '@/components/map-area/types';

type PoiFullscreenGalleryProps = {
  isOpen: boolean;
  title: string;
  images: POIGallery[];
  onClose: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onAddToTrip?: () => void;
};

export default function PoiFullscreenGallery({
  isOpen,
  title,
  images,
  onClose,
  onShare,
  onSave,
  onAddToTrip
}: PoiFullscreenGalleryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-[100] overflow-y-auto bg-background'>
      <div className='sticky top-0 z-10 flex items-center justify-between border-b border-text-main/10 bg-surface px-4 py-3 sm:px-10'>
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-text-main  transition hover:bg-text-main/10'
            aria-label='Close full-screen gallery'
          >
            <X className='h-5 w-5' />
          </button>
          <h3 className='truncate text-sm font-semibold text-text-main sm:text-base'>
            {title}
          </h3>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='inline-flex h-9 items-center gap-2 rounded-full border border-text-main bg-surface px-4 text-xs font-medium text-text-main transition hover:bg-text-main/10'
            onClick={onSave}
          >
            <Heart className='h-3.5 w-3.5' /> Save
          </button>
          <button
            type='button'
            className='border-text-main text-text-main inline-flex h-9 items-center gap-1.5 rounded-full border bg-surface px-4 text-xs font-medium hover:bg-text-main/10'
          >
            <PlusCircle className='h-3.5 w-3.5' /> Add to Journey
          </button>
          <button
            type='button'
            className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-text-main bg-transparent text-text-main transition hover:bg-text-main/10'
            onClick={onShare}
            title='Share'
          >
            <Share className='h-3.5 w-3.5 text-text-main' />
          </button>
        </div>
      </div>

      <div className='flex w-full flex-col gap-16 py-10'>
        {images.length === 0 ? (
          <div className='flex h-[calc(100vh-144px)] w-full items-center justify-center bg-black text-sm text-white/80 shrink-0'>
            No gallery images available for this location.
          </div>
        ) : (
          images.map((image, index) => (
            <figure
              key={image.id || `${image.imageUrl}-${index}`}
              className='relative flex h-[calc(100vh-144px)] w-full shrink-0 items-center justify-center bg-background overflow-hidden'
            >
              <img
                src={image.imageUrl}
                alt={`${title} image ${index + 1}`}
                className='h-full w-full object-contain'
              />
            </figure>
          ))
        )}
      </div>
    </div>,
    document.body
  );
}
