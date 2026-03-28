'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { TextHeading, TextBody } from '@/components/text';
import { cn } from '@/lib/cn';

const categories = ['Locations', 'Restaurants', 'Hotels', 'Activities'];

export default function SearchBox() {
  const [activeCategory, setActiveCategory] = useState('Locations');

  return (
    <div className='flex h-full flex-col p-6'>
      {/* Header */}
      <div className='mb-6'>
        <TextHeading className='text-text-main'>Province of Albay</TextHeading>
        <TextBody className='text-text-muted'>
          Discover places around you.
        </TextBody>
      </div>

      {/* Search Input with Icon */}
      <div className='relative mb-5'>
        <Search
          className='text-text-muted absolute top-1/2 left-4 -translate-y-1/2'
          size={18}
        />

        <input
          type='text'
          placeholder='Search places...'
          className='border-border focus:ring-primary-300 w-full rounded-xl border bg-white py-3 pr-4 pl-11 text-sm outline-none focus:ring-2'
        />
      </div>

      {/* Category Tabs */}
      <div className='mb-6 flex flex-wrap gap-3'>
        {categories.map(category => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'border-border text-text-muted hover:bg-primary-50 border bg-white'
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results Area */}
      <div className='border-border flex-1 overflow-y-auto rounded-xl border bg-white p-4'>
        <TextBody className='text-text-muted'>
          Showing results for{' '}
          <span className='text-text-main font-semibold'>{activeCategory}</span>
        </TextBody>

        <div className='mt-4 space-y-4'>
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className='border-border rounded-lg border p-4 transition hover:shadow-sm'
            >
              <p className='text-text-main text-sm font-medium'>
                Sample {activeCategory} {item}
              </p>
              <p className='text-text-muted mt-1 text-xs'>
                Description placeholder.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
