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
import { TextHeading, TextBody } from '@/components/text';

type JourneyAreaProps = {
  open: boolean;
  onClose: () => void;
};

export default function JourneyArea({ open, onClose }: JourneyAreaProps) {
  if (!open) return null;

  return (
    <div className='absolute inset-0 z-10 flex flex-col bg-background'>
      {/* Header */}
      <div className='relative flex items-center justify-between px-6 pb-4 pt-6'>
        <TextHeading className='text-[28px] tracking-tight text-text-main'>
          Journey Title
        </TextHeading>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 text-text-muted hover:text-foreground'
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* 3 Pills */}
      <div className='flex gap-2.5 px-6 pb-5'>
        {['Where', 'When', 'Who'].map((label) => (
          <button
            key={label}
            className='rounded-3xl border border-text-main px-5 py-1 text-[15px] text-text-main hover:bg-surface'
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tabs Row */}
      <div className='flex items-center justify-between border-b border-border px-6 pb-2'>
        <div className='flex items-center gap-4'>
          <span className='cursor-pointer text-[15px] font-bold text-text-main border-b-2 border-text-main rounded-sm pb-[9px] -mb-[10px]'>
            Itinerary
          </span>
          <span className='cursor-pointer text-[15px] text-text-muted hover:text-foreground'>
            Calendar
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <button className='flex h-7 w-7 items-center justify-center rounded-full border border-text-main text-text-main hover:bg-surface'>
            <Undo2 size={15} strokeWidth={1.5} />
          </button>
          <button className='flex h-7 w-7 items-center justify-center rounded-full border border-text-main text-text-main hover:bg-surface'>
            <Redo2 size={15} strokeWidth={1.5} />
          </button>
          <button className='flex h-7 items-center gap-1.5 rounded-3xl border border-text-main px-3 font-medium hover:bg-surface'>
            <Navigation size={14} className='fill-primary-500 text-primary-600' />
            <span className='text-[13px] font-medium text-text-main'>Navigate</span>
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
                <ChevronDown size={20} strokeWidth={2} className='text-foreground' />
              </div>
              <TextBody className='font-bold text-[15px] text-foreground'>Basecamp</TextBody>
              <TextBody className='ml-3 pt-[2px] text-xs font-medium text-text-muted'>
                1 item
              </TextBody>
            </div>
            <div className='flex items-center gap-2'>
              <button className='flex items-center gap-1 rounded-2xl bg-surface pl-3 pr-2 py-1 hover:bg-border'>
                <span className='text-[13px] font-medium text-foreground'>All</span>
                <ChevronDown size={14} strokeWidth={2} className='text-foreground' />
              </button>
              <button className='text-foreground hover:text-primary-800'>
                <MoreHorizontal size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Add Item Card */}
          <div className='ml-7 flex h-[110px] w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-[24px] bg-surface border border-border transition-colors hover:bg-border'>
            <PlusCircle size={28} strokeWidth={1} className='text-text-main' />
            <span className='text-[15px] font-medium text-text-main'>Add</span>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className='mb-4'>
          <div className='mb-4 flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex w-7 items-center justify-start' />
              <TextBody className='font-bold text-[15px] text-foreground'>
                Itinerary
              </TextBody>
              <TextBody className='ml-4 pt-[2px] text-xs font-medium text-text-muted'>
                1 item
              </TextBody>
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-3 w-3 rounded-full bg-border' />
              <button className='text-foreground hover:text-primary-800'>
                <MoreHorizontal size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className='flex cursor-pointer items-center'>
            <div className='flex w-7 items-center justify-start'>
              <ChevronDown size={20} strokeWidth={2} className='text-foreground' />
            </div>
            <TextBody className='font-bold text-[15px] text-foreground'>Day 1</TextBody>
            <TextBody className='ml-3 pt-[1px] text-[13px] text-text-muted'>
              Add a title
            </TextBody>
          </div>
        </div>
      </div>
    </div>
  );
}
