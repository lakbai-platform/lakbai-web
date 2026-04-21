'use client';

import { X } from 'lucide-react';

import type { POIGallery } from '@/components/map-area/types';

type PoiFullscreenGalleryProps = {
  isOpen: boolean;
  title: string;
  images: POIGallery[];
  onClose: () => void;
};

export default function PoiFullscreenGallery({
  isOpen,
  title,
  images,
  onClose
}: PoiFullscreenGalleryProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-60 overflow-y-auto bg-black/95'>
      <div className='sticky top-0 z-10 flex items-center justify-between border-b border-white/15 bg-black/80 px-4 py-3 backdrop-blur sm:px-6'>
        <h3 className='truncate pr-4 text-sm font-semibold text-white sm:text-base'>
          {title}
        </h3>
        <button
          type='button'
          onClick={onClose}
          className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20'
          aria-label='Close full-screen gallery'
        >
          <X className='h-5 w-5' />
        </button>
      </div>

      <div className='mx-auto flex w-full max-w-6xl flex-col gap-3 p-4 sm:p-6'>
        {images.length === 0 ? (
          <div className='flex h-56 items-center justify-center rounded-xl bg-white/5 text-sm text-white/80'>
            No gallery images available for this location.
          </div>
        ) : (
          images.map((image, index) => (
            <figure
              key={image.id || `${image.imageUrl}-${index}`}
              className='overflow-hidden rounded-xl bg-black/40'
            >
              <img
                src={image.imageUrl}
                alt={`${title} image ${index + 1}`}
                className='max-h-[85vh] w-full object-contain'
              />
            </figure>
          ))
        )}
      </div>
    </div>
  );
}
