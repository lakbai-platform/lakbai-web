'use client';

import { 
  X, 
  Undo2, 
  Redo2, 
  Navigation, 
  ChevronDown, 
  MoreHorizontal,
  PlusCircle
} from 'lucide-react';

type JourneyAreaProps = {
  open: boolean;
  onClose: () => void;
};

export default function JourneyArea({ open, onClose }: JourneyAreaProps) {
  if (!open) return null;

  return (
    <div className='absolute inset-0 z-10 flex flex-col bg-white'>
      {/* Header */}
      <div className='relative flex items-center justify-between px-6 pb-4 pt-6'>
        <h2 className='text-[28px] font-bold tracking-tight text-[#1a3641]'>
          Journey Title
        </h2>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 text-gray-800 hover:text-black'
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* 3 Pills */}
      <div className='flex gap-2.5 px-6 pb-5'>
        {['Where', 'When', 'Who'].map((label) => (
          <button
            key={label}
            className='rounded-3xl border border-[#1a3641] px-5 py-1 text-[15px] text-[#1a3641] hover:bg-gray-50'
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tabs Row */}
      <div className='flex items-center justify-between border-b border-gray-300 px-6 pb-2'>
        <div className='flex items-center gap-4'>
          <span className='cursor-pointer text-[15px] font-bold text-[#1a3641] border-b-2 border-[#1a3641] rounded-sm pb-[9px] -mb-[10px]'>
            Itinerary
          </span>
          <span className='cursor-pointer text-[15px] text-gray-500 hover:text-gray-700'>
            Calendar
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button className='flex h-7 w-7 items-center justify-center rounded-full border border-[#1a3641] text-[#1a3641] hover:bg-gray-100'>
            <Undo2 size={15} strokeWidth={1.5} />
          </button>
          <button className='flex h-7 w-7 items-center justify-center rounded-full border border-[#1a3641] text-[#1a3641] hover:bg-gray-100'>
            <Redo2 size={15} strokeWidth={1.5} />
          </button>
          <button className='flex h-7 items-center gap-1.5 rounded-3xl border border-[#1a3641] px-3 font-medium hover:bg-gray-50'>
            <Navigation size={14} className='fill-teal-500 text-teal-600' />
            <span className='text-[13px] font-medium text-[#1a3641]'>Navigate</span>
          </button>
        </div>
      </div>

      {/* Journey Content */}
      <div className='flex-1 overflow-y-auto px-6 py-6'>
        {/* Basecamp Section */}
        <div className='group mb-8'>
          <div className='mb-3 flex items-center justify-between'>
            <div className='flex cursor-pointer items-center'>
              <div className='flex w-7 items-center justify-start'>
                <ChevronDown size={20} strokeWidth={2} className='text-black' />
              </div>
              <span className='text-[15px] font-bold text-black'>Basecamp</span>
              <span className='ml-3 pt-[2px] text-xs font-medium text-gray-500'>
                1 item
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <button className='flex items-center gap-1 rounded-2xl bg-[#e5e7eb] pl-3 pr-2 py-1 hover:bg-gray-300'>
                <span className='text-[13px] font-medium text-black'>All</span>
                <ChevronDown size={14} strokeWidth={2} className='text-black' />
              </button>
              <button className='text-black hover:text-black'>
                <MoreHorizontal size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Add Item Card */}
          <div className='ml-7 flex h-[110px] w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-[#dcdcdc] transition-colors hover:bg-gray-300'>
            <PlusCircle size={28} strokeWidth={1} className='text-black' />
            <span className='text-[15px] font-medium text-black'>Add</span>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className='mb-4'>
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex w-7 items-center justify-start' />
              <span className='text-[15px] font-bold text-black'>
                Itinerary
              </span>
              <span className='ml-4 pt-[2px] text-xs font-medium text-gray-500'>
                1 item
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-3 w-3 rounded-full bg-gray-100' />
              <button className='text-black hover:text-black'>
                <MoreHorizontal size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className='flex cursor-pointer items-center'>
            <div className='flex w-7 items-center justify-start'>
              <ChevronDown size={20} strokeWidth={2} className='text-black' />
            </div>
            <span className='text-[15px] font-bold text-black'>Day 1</span>
            <span className='ml-3 pt-[1px] text-[13px] text-gray-400'>
              Add a title
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
