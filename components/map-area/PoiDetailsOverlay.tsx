'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  X,
  ArrowLeft,
  Star,
  Share2,
  Bookmark,
  PlusCircle,
  ExternalLink,
  Phone,
  MapPinned,
  MapPin
} from 'lucide-react';

import PoiMapCanvas from '@/components/map-area/PoiMapCanvas';
import type { POI } from '@/components/map-area/types';
import PoiFullscreenGallery from './PoiFullscreenGallery';
import { getTagIcon } from './get-tag-icon';
import { TextHeading, TextBody } from '@/components/text';

type DetailTab = 'description' | 'reviews' | 'location';

type MockReview = {
  id: string;
  profileName: string;
  date: string;
  rating: string;
  content: string;
  badges: string[];
};

const mockReviews: MockReview[] = [
  {
    id: 'r1',
    profileName: 'Profile Name',
    date: 'Reviewed on Feb 6, 2026',
    rating: '3.9/5',
    content:
      'Too many people. Go when afternoon or evening time. Me do not know why',
    badges: ['Heritage Explorer', 'Hotel Connoisseur']
  },
  {
    id: 'r2',
    profileName: 'Profile Name',
    date: 'Reviewed on Feb 6, 2026',
    rating: '3.9/5',
    content:
      'Too many people. Go when afternoon or evening time. Me do not know why',
    badges: ['Heritage Explorer', 'Hotel Connoisseur']
  },
  {
    id: 'r3',
    profileName: 'Profile Name',
    date: 'Reviewed on Feb 6, 2026',
    rating: '3.9/5',
    content:
      'Too many people. Go when afternoon or evening time. Me do not know why',
    badges: ['Heritage Explorer', 'Hotel Connoisseur']
  }
];

type PoiDetailsOverlayProps = {
  poi: POI;
  copied: boolean;
  onClose: () => void;
  onCopyShareUrl: () => void;
};

export default function PoiDetailsOverlay({
  poi,
  copied,
  onClose,
  onCopyShareUrl
}: PoiDetailsOverlayProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('description');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    setActiveTab('description');
    setIsGalleryOpen(false);
  }, [poi.id]);

  const galleryImages = useMemo(
    () =>
      (poi.galleries ?? []).filter(
        image => Boolean(image.imageUrl) && image.imageUrl.trim().length > 0
      ),
    [poi.galleries]
  );

  const previewImages = galleryImages.slice(0, 3);
  const hasMoreThanThreeImages = galleryImages.length > 3;

  const openFromPreview = () => {
    if (galleryImages.length === 0) {
      return;
    }

    setIsGalleryOpen(true);
  };

  const detailAddress = useMemo(() => {
    const parts = [
      poi.address?.barangay,
      poi.address?.cityMunicipality,
      poi.address?.province,
      'Philippines'
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(', ');
    }

    return `Lat ${poi.latitude.toFixed(5)}, Lng ${poi.longitude.toFixed(5)}`;
  }, [poi]);

  const focusedCenter: [number, number] = [poi.longitude, poi.latitude];

  return (
    <div className='bg-background/95 absolute inset-0 z-40 overflow-y-auto backdrop-blur-sm'>
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4 pt-4 pb-12 sm:px-6 sm:pt-6'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='text-foreground hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full transition'
              aria-label='Close location details'
            >
              <X className='h-5 w-5' />
            </button>
            <button
              type='button'
              onClick={onClose}
              className='text-foreground hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full transition'
              aria-label='Back to map'
            >
              <ArrowLeft className='h-5 w-5' />
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='border-foreground/40 text-foreground inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm'
            >
              <Bookmark className='h-3.5 w-3.5' /> Favorite
            </button>
            <button
              type='button'
              className='border-foreground/40 text-foreground inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm'
            >
              <PlusCircle className='h-3.5 w-3.5' /> Add to Journey
            </button>
            <button
              type='button'
              onClick={onCopyShareUrl}
              className='border-foreground/40 text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full border'
              aria-label='Copy share link'
              title={copied ? 'Copied!' : 'Copy share link'}
            >
              <Share2 className='h-4 w-4' />
            </button>
          </div>
        </div>

        <div className='mt-4'>
          <TextHeading className='text-4xl leading-tight font-extrabold'>
            {poi.name || 'Location Title'}
          </TextHeading>

          {poi.tags && poi.tags.length > 0 && (
            <div className='mt-3 flex flex-wrap gap-2'>
              {poi.tags.map(tag => {
                const { icon: TagIcon, color } = getTagIcon([tag]);
                return (
                  <span
                    key={tag.id}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white ${color}`}
                  >
                    <TagIcon className='h-3.5 w-3.5' />
                    {tag.cluster ? `${tag.cluster.name} • ${tag.name}` : tag.name}
                  </span>
                );
              })}
            </div>
          )}

          <div className='mt-3 flex flex-wrap items-center gap-2 text-sm'>
            <span className='border-foreground/40 inline-flex items-center gap-1 rounded-full border px-2.5 py-1'>
              <Star className='h-3.5 w-3.5 fill-current' /> 4.6 •{' '}
              {poi.vouchCount} reviews
            </span>
            <span className='text-muted-foreground'>{detailAddress}</span>
            {copied && <span className='text-emerald-600'>Link copied</span>}
          </div>
        </div>

        <div className='mt-3 grid grid-cols-1 gap-2 md:grid-cols-[1.3fr_0.85fr]'>
          <button
            type='button'
            onClick={openFromPreview}
            disabled={!previewImages[0]}
            className='group bg-muted relative h-64 overflow-hidden rounded-xl text-left md:h-95'
          >
            {previewImages[0] ? (
              <img
                src={previewImages[0].imageUrl}
                alt={`${poi.name} image 1`}
                className='h-full w-full object-cover transition group-hover:scale-[1.02]'
              />
            ) : (
              <div className='text-muted-foreground flex h-full w-full items-center justify-center text-sm'>
                No image yet
              </div>
            )}
          </button>
          <div className='grid grid-rows-[1fr_1fr] gap-2'>
            <button
              type='button'
              onClick={openFromPreview}
              disabled={!previewImages[1]}
              className='group bg-muted h-46.5 overflow-hidden rounded-xl text-left'
            >
              {previewImages[1] ? (
                <img
                  src={previewImages[1].imageUrl}
                  alt={`${poi.name} image 2`}
                  className='h-full w-full object-cover transition group-hover:scale-[1.02]'
                />
              ) : (
                <div className='text-muted-foreground flex h-full w-full items-center justify-center text-sm'>
                  No image yet
                </div>
              )}
            </button>
            <div
              role='button'
              tabIndex={previewImages[2] ? 0 : -1}
              aria-disabled={!previewImages[2]}
              onClick={() => {
                if (!previewImages[2]) {
                  return;
                }
                openFromPreview();
              }}
              onKeyDown={event => {
                if (!previewImages[2]) {
                  return;
                }

                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openFromPreview();
                }
              }}
              className='group bg-muted relative h-46.5 overflow-hidden rounded-xl text-left'
            >
              {previewImages[2] ? (
                <img
                  src={previewImages[2].imageUrl}
                  alt={`${poi.name} image 3`}
                  className='h-full w-full object-cover transition group-hover:scale-[1.02]'
                />
              ) : (
                <div className='text-muted-foreground flex h-full w-full items-center justify-center text-sm'>
                  No image yet
                </div>
              )}

              <button
                type='button'
                onClick={event => {
                  event.stopPropagation();
                  setIsGalleryOpen(true);
                }}
                disabled={galleryImages.length === 0}
                className='bg-background/95 text-foreground absolute right-3 bottom-3 rounded-full px-3 py-1 text-sm font-medium'
              >
                {hasMoreThanThreeImages
                  ? `See all ${galleryImages.length}`
                  : 'See gallery'}
              </button>
            </div>
          </div>
        </div>

        <div className='mt-6 border-b'>
          <div className='flex items-end gap-5 text-lg'>
            <button
              type='button'
              onClick={() => setActiveTab('description')}
              className={`pb-2 ${activeTab === 'description' ? 'text-foreground border-b-2 font-semibold' : 'text-muted-foreground'}`}
            >
              Description
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 ${activeTab === 'reviews' ? 'text-foreground border-b-2 font-semibold' : 'text-muted-foreground'}`}
            >
              Reviews
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('location')}
              className={`pb-2 ${activeTab === 'location' ? 'text-foreground border-b-2 font-semibold' : 'text-muted-foreground'}`}
            >
              Location
            </button>
          </div>
        </div>

        {activeTab === 'description' && (
          <div className='mt-4 space-y-5'>
            <TextBody className='text-foreground/90 leading-relaxed'>
              {poi.description ||
                'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'}
            </TextBody>

            <div className='grid gap-4 border-y py-5 md:grid-cols-3'>
              <div>
                <TextBody className='text-foreground flex items-center gap-2 font-semibold'>
                  <MapPin className='h-4 w-4' /> Address
                </TextBody>
                <TextBody className='text-foreground/80 mt-1 whitespace-pre-line'>
                  {`${poi.address?.street || 'P5 Rawis'}\n${poi.address?.cityMunicipality || 'Legazpi City'}\n${poi.address?.province || 'Albay'}\nPhilippines`}
                </TextBody>
              </div>

              <div className='space-y-2'>
                <div>
                  <TextBody className='text-foreground flex items-center gap-2 font-semibold'>
                    <ExternalLink className='h-4 w-4' /> Website
                  </TextBody>
                  <TextBody className='text-foreground/80 mt-1'>
                    www.example.com
                  </TextBody>
                </div>
                <div>
                  <TextBody className='text-foreground flex items-center gap-2 font-semibold'>
                    <Phone className='h-4 w-4' /> Phone
                  </TextBody>
                  <TextBody className='text-foreground/80 mt-1'>
                    +69 999 999 9999
                  </TextBody>
                </div>
              </div>

              <div>
                <TextBody className='text-foreground font-semibold'>Operating Hours</TextBody>
                <TextBody className='mt-1 font-semibold text-emerald-600'>
                  Open Now
                </TextBody>
                <TextBody className='text-foreground/80 mt-1'>
                  Daily 6 AM - 6 PM
                </TextBody>
              </div>
            </div>

            <div className='space-y-2'>
              <TextBody className='text-foreground flex items-center gap-2 font-semibold'>
                <MapPinned className='h-4 w-4' /> Location
              </TextBody>
              <TextBody className='text-foreground/80'>
                {`Lat ${poi.latitude.toFixed(5)}, Lng ${poi.longitude.toFixed(5)}`}
              </TextBody>
              <div className='h-64 overflow-hidden rounded-xl'>
                <PoiMapCanvas
                  pois={[poi]}
                  center={focusedCenter}
                  zoom={14}
                  selectedPoiId={poi.id}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className='mt-4'>
            <div className='mb-4 flex justify-end'>
              <button
                type='button'
                className='border-foreground/40 text-foreground inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium'
              >
                <PlusCircle className='h-4 w-4' /> Add a review
              </button>
            </div>

            <div className='space-y-4'>
              {mockReviews.map(review => (
                <article key={review.id} className='border-b pb-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-muted h-12 w-12 rounded-full' />
                      <div>
                        <p className='font-semibold'>{review.profileName}</p>
                        <p className='text-muted-foreground text-sm'>
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <p className='font-medium'>{review.rating}</p>
                  </div>

                  <p className='mt-3 text-sm'>{review.content}</p>

                  <div className='mt-3 flex flex-wrap gap-2'>
                    {review.badges.map((badge, idx) => (
                      <span
                        key={`${review.id}-${badge}`}
                        className={`rounded-full px-2.5 py-0.5 text-xs text-white ${idx === 0 ? 'bg-sky-500' : 'bg-emerald-700'}`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <button
              type='button'
              className='border-foreground/40 text-foreground mt-5 rounded-full border px-4 py-1.5 text-sm'
            >
              Show all 69K reviews
            </button>
          </div>
        )}

        {activeTab === 'location' && (
          <div className='mt-4 space-y-2'>
            <TextBody className='text-foreground flex items-center gap-2 font-semibold'>
              <MapPinned className='h-4 w-4' /> Location
            </TextBody>
            <TextBody className='text-foreground/80'>
              {`Lat ${poi.latitude.toFixed(5)}, Lng ${poi.longitude.toFixed(5)}`}
            </TextBody>
            <div className='h-72 overflow-hidden rounded-xl'>
              <PoiMapCanvas
                pois={[poi]}
                center={focusedCenter}
                zoom={15}
                selectedPoiId={poi.id}
              />
            </div>
          </div>
        )}
      </div>

      <PoiFullscreenGallery
        isOpen={isGalleryOpen}
        title={`${poi.name}`}
        images={galleryImages}
        onClose={() => setIsGalleryOpen(false)}
        onShare={onCopyShareUrl}
      />
    </div>
  );
}
