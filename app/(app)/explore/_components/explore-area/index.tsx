'use client';

import { useState } from 'react';
import {
  Heart,
  Info,
  Landmark,
  Plus,
  Search,
  SlidersHorizontal,
  Star
} from 'lucide-react';
import { TextBody, TextHeading } from '@/components/text';
import { cn } from '@/lib/cn';
import LocationPicker from './LocationPicker';

const categories = ['For You', 'Locations', 'Spots', 'Eats', 'Lodgings'];

// Dynamic data note:
// Replace this mocked array with API data from your backend.
// Dynamic fields per card: title, rating, reviewCount, typeLabel, location,
// sourceName, sourceAvatarText, imagePlaceholderTone and gallery images.
const mockExploreCards = [
  {
    id: '1',
    title: 'CamSur Watersports Complex',
    rating: 4.4,
    reviewCount: '2.3k',
    typeLabel: 'Attraction',
    location: 'Pili, Bicol',
    sourceName: 'MI JALBUENA',
    sourceAvatarText: 'MJ',
    imagePlaceholderTone: 'from-primary-100 to-primary-300'
  },
  {
    id: '2',
    title: 'Minor Basilica and National Shrine of Our Lady of Penafrancia',
    rating: 4.8,
    reviewCount: '2.2k',
    typeLabel: 'Attraction',
    location: 'Naga, Bicol',
    sourceName: 'CITY GUIDE',
    sourceAvatarText: 'CG',
    imagePlaceholderTone: 'from-secondary-100 to-primary-200'
  },
  {
    id: '3',
    title: 'Historic Church Interior',
    rating: 4.6,
    reviewCount: '1.1k',
    typeLabel: 'Spot',
    location: 'Naga, Bicol',
    sourceName: 'HERITAGE PH',
    sourceAvatarText: 'HP',
    imagePlaceholderTone: 'from-primary-50 to-secondary-200'
  },
  {
    id: '4',
    title: 'Central Plaza Landmark',
    rating: 4.5,
    reviewCount: '980',
    typeLabel: 'Location',
    location: 'Naga, Bicol',
    sourceName: 'LOCAL STORIES',
    sourceAvatarText: 'LS',
    imagePlaceholderTone: 'from-secondary-50 to-primary-200'
  }
];

export default function ExploreArea() {
  const [activeCategory, setActiveCategory] = useState('For You');
  const [selectedLocation, setSelectedLocation] = useState('Naga');

  return (
    <div className='scrollbar-invisible bg-surface text-text-main h-full w-full overflow-y-auto'>
      <div className='w-full px-4 py-6 sm:px-6 sm:py-8'>
        <LocationPicker
          location={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />

        <div className='mb-5 flex flex-col gap-3 sm:flex-row'>
          <div className='relative flex-1'>
            <Search
              className='text-text-muted absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2'
              strokeWidth={2.2}
            />
            <input
              type='text'
              placeholder='Search'
              className='border-border text-text-main placeholder:text-text-muted focus:border-primary-300 bg-background h-12 w-full rounded-xl border py-3 pr-4 pl-11 text-[15px] outline-none'
            />
          </div>

          <button
            type='button'
            className='border-border text-text-main hover:bg-surface-light bg-background inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition'
          >
            <SlidersHorizontal className='h-4 w-4' />
            Filters
          </button>
        </div>

        <div className='mb-7 flex flex-wrap items-center gap-2.5'>
          {categories.map(category => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type='button'
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-border bg-background text-text-muted hover:bg-primary-50'
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <section>
          {/* Dynamic data note: section heading can come from selected category */}
          <TextHeading className='text-text-main mb-5'>
            Things To Do
          </TextHeading>

          <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            {mockExploreCards.map(card => (
              <article key={card.id} className='min-w-0'>
                <div
                  className={cn(
                    'relative h-60 overflow-hidden rounded-2xl bg-linear-to-br',
                    card.imagePlaceholderTone
                  )}
                >
                  {/* Dynamic data note: replace this colored div with image carousel/media */}
                  <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_45%,rgba(1,31,36,0.14)_100%)]' />

                  <div className='absolute top-3 right-3 flex items-center gap-2'>
                    <button
                      type='button'
                      className='text-text-main border-border bg-background/90 hover:bg-surface-light flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition'
                    >
                      <Heart className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      className='text-text-main border-border bg-background/90 hover:bg-surface-light flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition'
                    >
                      <Plus className='h-4 w-4' />
                    </button>
                  </div>

                  <div className='absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5'>
                    {[0, 1, 2, 3, 4].map(dot => (
                      <span
                        key={dot}
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          dot === 0 ? 'bg-primary-700' : 'bg-primary-700/45'
                        )}
                      />
                    ))}
                  </div>

                  <button
                    type='button'
                    className='text-text-main hover:text-primary-700 absolute right-3 bottom-3'
                  >
                    <Info className='h-4 w-4' />
                  </button>
                </div>

                <div className='mt-3 space-y-1.5'>
                  <div className='flex items-start justify-between gap-3'>
                    {/* Dynamic data note: place title field here */}
                    <h3 className='text-text-main text-[20px] leading-snug font-semibold'>
                      {card.title}
                    </h3>

                    {/* Dynamic data note: rating and review count */}
                    <p className='text-text-main mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold'>
                      <Star className='h-3.5 w-3.5 fill-current' />
                      {card.rating}{' '}
                      <span className='text-text-muted'>
                        ({card.reviewCount})
                      </span>
                    </p>
                  </div>

                  <p className='text-text-muted flex items-center gap-1.5 text-sm'>
                    <Landmark className='text-text-muted h-4 w-4' />
                    {card.typeLabel}
                  </p>

                  <TextBody className='text-text-muted leading-5'>
                    {card.location}
                  </TextBody>

                  <div className='pt-1.5'>
                    {/* Dynamic data note: source avatar/name from user or curator */}
                    <p className='text-text-muted inline-flex items-center gap-2 text-sm'>
                      <span className='bg-primary-100 text-primary-700 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold'>
                        {card.sourceAvatarText}
                      </span>
                      Mentioned by {card.sourceName}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
