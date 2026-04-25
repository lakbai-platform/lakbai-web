'use client';

import { useMemo } from 'react';
import { 
  X, 
  Undo2, 
  Redo2, 
  Navigation, 
  ChevronDown, 
  MoreHorizontal,
  PlusCircle,
  MapPin
} from 'lucide-react';
import { TextHeading, TextBody } from '@/components/text';

interface JourneyAreaPOI {
  id: string;
  name: string;
  description: string;
}

interface JourneyAreaItineraryItem {
  id: string;
  journeyId: string;
  poiId: string;
  dayNumber: number | null;
  orderIndex: number;
  startTime: string | null;
  endTime: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  poi?: JourneyAreaPOI | null;
}

interface JourneyAreaJourney {
  id: string;
  title: string;
  destination: string | null;
  isFlexibleDates: boolean;
  startDate: string | null;
  companions: string | null;
  budget: number | null;
  itineraryItems: JourneyAreaItineraryItem[];
}

type JourneyAreaProps = {
  open: boolean;
  onClose: () => void;
  journey?: JourneyAreaJourney | null;
};

export default function JourneyArea({ open, onClose, journey }: JourneyAreaProps) {
  if (!open) return null;

  const itineraryItems = journey?.itineraryItems ?? [];

  const groupedItinerary = useMemo(() => {
    const basecamp: JourneyAreaItineraryItem[] = [];
    const scheduledMap: Record<number, JourneyAreaItineraryItem[]> = {};

    for (const item of itineraryItems) {
      if (item.dayNumber === null) {
        basecamp.push(item);
        continue;
      }

      if (!scheduledMap[item.dayNumber]) {
        scheduledMap[item.dayNumber] = [];
      }

      scheduledMap[item.dayNumber].push(item);
    }

    const sortByTimeThenOrder = (left: JourneyAreaItineraryItem, right: JourneyAreaItineraryItem) => {
      const leftTime = left.startTime ?? '';
      const rightTime = right.startTime ?? '';
      const leftHasTime = leftTime.length > 0;
      const rightHasTime = rightTime.length > 0;

      if (leftHasTime && rightHasTime) {
        if (leftTime < rightTime) return -1;
        if (leftTime > rightTime) return 1;
      } else if (leftHasTime) {
        return -1;
      } else if (rightHasTime) {
        return 1;
      }

      return left.orderIndex - right.orderIndex;
    };

    basecamp.sort(sortByTimeThenOrder);

    const sortedDayNumbers = Object.keys(scheduledMap)
      .map(Number)
      .sort((left, right) => left - right);

    const scheduledDays: Record<number, JourneyAreaItineraryItem[]> = {};
    for (const dayNumber of sortedDayNumbers) {
      scheduledDays[dayNumber] = [...scheduledMap[dayNumber]].sort(sortByTimeThenOrder);
    }

    return {
      basecamp,
      scheduledDays,
      dayNumbers: sortedDayNumbers,
    };
  }, [itineraryItems]);

  const totalItems = itineraryItems.length;
  const totalBasecampItems = groupedItinerary.basecamp.length;

  return (
    <div className='absolute inset-0 z-10 flex flex-col bg-background'>
      {/* Header */}
      <div className='relative flex items-center justify-between px-6 pb-4 pt-6'>
        <TextHeading className='text-[28px] tracking-tight text-text-main pr-10'>
          {journey?.title || 'Journey Title'}
        </TextHeading>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 text-text-muted hover:text-foreground'
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Connected Pills */}
      <div className='px-6 pb-5'>
        <div className='inline-flex items-center rounded-3xl border border-text-main overflow-hidden'>
          <button className='px-5 py-1.5 text-[14px] font-medium border-r border-text-main text-text-main hover:bg-surface'>
            {journey?.destination || 'Where'}
          </button>
          <button className='px-5 py-1.5 text-[14px] font-medium border-r border-text-main text-text-main hover:bg-surface'>
            {journey?.isFlexibleDates ? 'Flexible' : (journey?.startDate ? new Date(journey.startDate).toLocaleDateString() : 'Date')}
          </button>
          <button className='px-5 py-1.5 text-[14px] font-medium border-r border-text-main text-text-main hover:bg-surface'>
            {journey?.companions || 'How many'}
          </button>
          <button className='px-5 py-1.5 text-[14px] font-medium text-text-main hover:bg-surface'>
            {journey?.budget ? `Budget: ${journey.budget}` : 'Budget'}
          </button>
        </div>
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
                {totalBasecampItems} item{totalBasecampItems !== 1 ? 's' : ''}
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
          <div className='ml-7 flex flex-col gap-3 pb-2'>
            {groupedItinerary.basecamp.map(item => (
              <div key={item.id} className='rounded-xl border border-border bg-surface p-3 flex gap-3 items-start'>
                <div className='bg-primary-100 text-primary-800 p-2 rounded-full shrink-0 mt-0.5'>
                  <MapPin size={16} />
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm font-bold'>{item.poi?.name ?? 'Unknown POI'}</span>
                  <span className='text-xs text-text-muted mt-1'>
                    {item.startTime ? `${item.startTime}${item.endTime ? ` - ${item.endTime}` : ''}` : `Order #${item.orderIndex + 1}`}
                  </span>
                </div>
              </div>
            ))}

            <div className='flex h-[100px] w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-[#DFDFDF] transition-colors hover:bg-[#D0D0D0]'>
              <div className='rounded-full border border-text-main p-0.5'>
                <PlusCircle size={18} strokeWidth={1.5} className='text-text-main' />
              </div>
              <span className='text-[13px] font-bold text-text-main'>Add</span>
            </div>
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
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </TextBody>
            </div>
            <div className='flex items-center gap-3'>
              <div className='h-4 w-4 shrink-0 rounded-full bg-slate-100' />
              <button className='text-foreground hover:text-primary-800'>
                <MoreHorizontal size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {groupedItinerary.dayNumbers.length === 0 ? (
            <div className='pl-7 text-sm text-text-muted'>
              No itinerary items yet. Ask AI to generate one or add manually!
            </div>
          ) : (
            groupedItinerary.dayNumbers.map(dayNumber => (
              <div key={dayNumber} className='mb-6'>
                <div className='flex cursor-pointer items-center mb-3'>
                  <div className='flex w-7 items-center justify-start'>
                    <ChevronDown size={20} strokeWidth={2} className='text-foreground' />
                  </div>
                  <TextBody className='font-bold text-[15px] text-foreground'>Day {dayNumber}</TextBody>
                </div>
                
                {/* Items for this day */}
                <div className='ml-7 flex flex-col gap-3 pb-2'>
                  {groupedItinerary.scheduledDays[dayNumber].map(item => (
                    <div key={item.id} className='rounded-xl border border-border bg-surface p-3 flex gap-3 items-start'>
                      <div className='bg-primary-100 text-primary-800 p-2 rounded-full shrink-0 mt-0.5'>
                        <MapPin size={16} />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-bold'>{item.poi?.name ?? 'Unknown POI'}</span>
                        <span className='text-xs text-text-muted mt-1'>
                          {item.startTime
                            ? `${item.startTime}${item.endTime ? ` - ${item.endTime}` : ''}`
                            : `Order #${item.orderIndex + 1}`}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Item Card inline */}
                  <div className='flex h-10 w-28 cursor-pointer flex-row items-center justify-center gap-2 rounded-xl bg-surface border border-border transition-colors hover:bg-border mt-1'>
                    <PlusCircle size={16} strokeWidth={1.5} className='text-text-main' />
                    <span className='text-xs font-medium text-text-main'>Add</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
