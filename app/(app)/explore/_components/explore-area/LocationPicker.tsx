'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { TextHeading } from '@/components/text';

type LocationPickerProps = {
  location: string;
  onLocationSelect: (location: string) => void;
};

export default function LocationPicker({
  location,
  onLocationSelect
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const handleSubmitSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    onLocationSelect(trimmedQuery);
    setIsOpen(false);
  };

  const handleUseCurrentLocation = () => {
    // Dynamic data note:
    // Replace this label with reverse-geocoded location from navigator.geolocation.
    onLocationSelect('Current location');
    setIsOpen(false);
  };

  return (
    <div ref={pickerRef} className='relative mb-5'>
      <button
        type='button'
        onClick={() => setIsOpen(prev => !prev)}
        className='inline-flex items-center gap-2 text-gray-900 dark:text-gray-100'
      >
        <TextHeading className='text-gray-900 dark:text-gray-100'>
          {location}
        </TextHeading>
        <ChevronDown className='h-5 w-5 text-gray-500 dark:text-gray-400' />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 z-30 m-0 mt-0 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-base leading-tight text-gray-900 shadow-xl outline-hidden dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-100'>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
            <input
              type='text'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSubmitSearch();
              }}
              placeholder='Search location...'
              className='h-10 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-10 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-gray-500 dark:border-gray-600 dark:bg-zinc-950 dark:text-gray-100 dark:placeholder:text-gray-400'
            />
          </div>

          <div className='mt-4 flex flex-col gap-2'>
            <button
              type='button'
              onClick={handleSubmitSearch}
              className='rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
            >
              Set location
            </button>

            <button
              type='button'
              onClick={handleUseCurrentLocation}
              className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-zinc-800'
            >
              <MapPin className='h-4 w-4' />
              Use current location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
