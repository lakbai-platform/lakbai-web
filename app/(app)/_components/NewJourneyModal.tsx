'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Minus,
  Plus
} from 'lucide-react';
import { TextHeading, TextBody } from '@/components/text';
import { cn } from '@/lib/utils';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const CURRENT_MONTH_INDEX = new Date().getMonth();
const FLEXIBLE_MONTH_OPTIONS = Array.from(
  { length: 12 },
  (_, index) => MONTH_NAMES[(CURRENT_MONTH_INDEX + index) % 12]
);

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function monthLabel(date: Date) {
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function buildMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ day: number; iso: string } | null> = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const current = new Date(year, month, day);
    cells.push({ day, iso: toISODate(current) });
  }

  return cells;
}

function formatDateSelection(startDate: string, endDate: string) {
  if (!startDate || !endDate) return '';

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return `${startDate} - ${endDate}`;
  }

  const sameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  const startMonth = start.toLocaleString('en-US', { month: 'short' });
  const endMonth = end.toLocaleString('en-US', { month: 'short' });

  if (sameMonth) {
    return `${startMonth} ${start.getDate()}-${end.getDate()}`;
  }

  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
}

function sortMonthsByTimeline(months: string[]) {
  const monthOrder = new Map(
    FLEXIBLE_MONTH_OPTIONS.map((monthName, index) => [monthName, index])
  );

  return [...months].sort((a, b) => {
    const aIndex = monthOrder.get(a) ?? 999;
    const bIndex = monthOrder.get(b) ?? 999;
    return aIndex - bIndex;
  });
}

function formatFlexibleSelection(days: number, months: string[]) {
  if (months.length === 0) return '';

  const sortedMonths = sortMonthsByTimeline(months);

  return `${days} days in ${sortedMonths.map(month => month.slice(0, 3)).join(', ')}`;
}

export default function NewJourneyModal({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [companions, setCompanions] = useState('1 person');
  const [destination, setDestination] = useState('');
  const [companionsDropdownOpen, setCompanionsDropdownOpen] = useState(false);

  const [selectedTimingType, setSelectedTimingType] = useState<
    'dates' | 'flexible' | null
  >(null);
  const [timingModalOpen, setTimingModalOpen] = useState(false);
  const [timingModalMode, setTimingModalMode] = useState<'dates' | 'flexible'>(
    'dates'
  );

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flexibleDays, setFlexibleDays] = useState(5);
  const [flexibleMonths, setFlexibleMonths] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [preferences, setPreferences] = useState('');

  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const todayISO = toISODate(todayDate);
  const minCalendarMonth = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    1
  );
  const minMonthKey =
    minCalendarMonth.getFullYear() * 12 + minCalendarMonth.getMonth();

  const nextMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    1
  );
  const calendarMonthKey =
    calendarMonth.getFullYear() * 12 + calendarMonth.getMonth();
  const canGoPrevMonth = calendarMonthKey > minMonthKey;
  const leftMonthCells = buildMonthDays(calendarMonth);
  const rightMonthCells = buildMonthDays(nextMonth);
  const sortedFlexibleMonths = sortMonthsByTimeline(flexibleMonths);
  const dateSummary = formatDateSelection(startDate, endDate);
  const flexibleSummary = formatFlexibleSelection(
    flexibleDays,
    sortedFlexibleMonths
  );
  const hasValidDates = Boolean(startDate && endDate);
  const hasValidFlexible = flexibleMonths.length > 0;
  const hasValidTiming =
    (selectedTimingType === 'dates' && hasValidDates) ||
    (selectedTimingType === 'flexible' && hasValidFlexible);

  if (!open) return null;

  const handleDateSelect = (iso: string) => {
    if (iso < todayISO) return;

    if (selectedTimingType === 'flexible') {
      setFlexibleMonths([]);
    }

    if (!startDate || endDate) {
      setStartDate(iso);
      setEndDate('');
      return;
    }

    if (iso < startDate) {
      setEndDate(startDate);
      setStartDate(iso);
      return;
    }

    setEndDate(iso);
  };

  const handleFlexibleMonthToggle = (month: string) => {
    setFlexibleMonths(currentMonths =>
      currentMonths.includes(month)
        ? currentMonths.filter(currentMonth => currentMonth !== month)
        : [...currentMonths, month]
    );
  };

  const isInSelectedRange = (iso: string) => {
    if (!startDate) return false;
    if (!endDate) return iso === startDate;
    return iso >= startDate && iso <= endDate;
  };

  const handleSubmit = () => {
    if (!hasValidTiming) return;

    onSubmit({
      companions,
      destination,
      dates:
        selectedTimingType === 'flexible'
          ? {
              isFlexible: true,
              days: flexibleDays,
              month: sortedFlexibleMonths[0],
              months: sortedFlexibleMonths
            }
          : {
              isFlexible: false,
              from: startDate,
              to: endDate
            },
      preferences
    });
    onClose();
  };

  return (
    <>
      <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
        <div className='bg-background relative flex h-146 w-full max-w-225 overflow-hidden rounded-[24px] shadow-2xl'>
          <button
            onClick={onClose}
            className='text-text-main hover:text-primary-500 absolute top-5 right-5 z-10 rounded-full p-1.5 transition-colors'
            aria-label='Close journey modal'
          >
            <CircleX size={24} />
          </button>

          <div className='bg-primary-500 relative h-146 w-75 shrink-0 overflow-hidden'>
            <Image
              src='/JourneySideImage.png'
              alt='Journey'
              fill
              className='object-cover object-center'
              sizes='300px'
              priority
            />
          </div>

          <div className='flex h-146 flex-1 flex-col p-8'>
            <div className='mb-6'>
              <TextHeading className='text-3xl font-bold'>
                Plan a new Journey
              </TextHeading>
            </div>

            <div className='flex flex-1 flex-col gap-6 overflow-y-auto rounded-2xl'>
              <div>
                <TextBody className='text-foreground mb-2 text-sm font-bold'>
                  Destination
                </TextBody>
                <input
                  type='text'
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Where's your next adventure?"
                  className='bg-surface/90 focus:ring-primary-500 w-full rounded-full px-5 py-3 text-[15px] outline-none focus:ring-2 focus:ring-inset'
                />
              </div>

              <div>
                <TextBody className='text-foreground mb-2 text-sm font-bold'>
                  Group Size
                </TextBody>
                <div className='relative'>
                  <button
                    onClick={() =>
                      setCompanionsDropdownOpen(!companionsDropdownOpen)
                    }
                    className='bg-surface/90 focus:ring-primary-500 flex w-full cursor-pointer items-center justify-between rounded-full px-5 py-3 text-[15px] transition-all outline-none focus:ring-2 focus:ring-inset'
                  >
                    <span className='text-text-main'>{companions}</span>
                    <ChevronDown
                      size={18}
                      className={cn(
                        'text-text-main transition-transform',
                        companionsDropdownOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {companionsDropdownOpen && (
                    <div className='bg-background border-border absolute top-full z-10 mt-1 w-full rounded-2xl border shadow-lg'>
                      {[
                        '1 person',
                        '1-2 persons',
                        '3-4 persons',
                        '5-8 persons',
                        '9+ persons'
                      ].map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            setCompanions(option);
                            setCompanionsDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full px-5 py-3 text-left text-[15px] transition-colors',
                            'hover:bg-primary-50 text-text-main',
                            companions === option &&
                              'bg-primary-100 text-primary-900 font-semibold',
                            'not-last:border-border not-last:border-b',
                            'first:rounded-t-2xl last:rounded-b-2xl'
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <TextBody className='text-foreground mb-2 text-sm font-bold'>
                  Timing
                </TextBody>
                <div className='flex gap-3'>
                  <button
                    onClick={() => {
                      if (calendarMonthKey < minMonthKey) {
                        setCalendarMonth(minCalendarMonth);
                      }
                      setTimingModalMode('dates');
                      setTimingModalOpen(true);
                    }}
                    className={cn(
                      'bg-surface text-text-main hover:bg-surface-light focus:ring-primary-500 flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center rounded-full border border-transparent px-4 py-3 text-center transition-all focus:ring-2 focus:ring-inset',
                      hasValidDates && 'ring-primary-300 ring-2',
                      selectedTimingType === 'dates' &&
                        'ring-primary-500 shadow-primary-500/25 shadow-lg ring-2'
                    )}
                  >
                    <span
                      className={cn(
                        'max-w-full px-1 text-sm leading-tight wrap-break-word whitespace-normal',
                        hasValidDates ? 'font-semibold' : 'font-medium',
                        selectedTimingType === 'dates' && 'font-bold'
                      )}
                    >
                      {dateSummary || 'Select Date'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setTimingModalMode('flexible');
                      setTimingModalOpen(true);
                    }}
                    className={cn(
                      'bg-surface text-text-main hover:bg-surface-light focus:ring-primary-500 flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center rounded-full border border-transparent px-4 py-3 text-center transition-all focus:ring-2 focus:ring-inset',
                      hasValidFlexible && 'ring-secondary-300 ring-2',
                      selectedTimingType === 'flexible' &&
                        'ring-secondary-500 shadow-secondary-500/25 shadow-lg ring-2'
                    )}
                  >
                    <span
                      className={cn(
                        'max-w-full px-1 text-sm leading-tight wrap-break-word whitespace-normal',
                        hasValidFlexible ? 'font-semibold' : 'font-medium',
                        selectedTimingType === 'flexible' && 'font-bold'
                      )}
                    >
                      {flexibleSummary || 'Flexible'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <TextBody className='text-foreground mb-2 text-sm font-bold'>
                  Journey Preferences
                </TextBody>
                <textarea
                  value={preferences}
                  onChange={e => setPreferences(e.target.value)}
                  placeholder='Any specific interests, budget constraints, etc?'
                  maxLength={20000}
                  className='bg-surface/90 focus:ring-primary-500 h-24 w-full resize-none rounded-xl px-5 py-4 text-[15px] outline-none focus:ring-2 focus:ring-inset'
                />
                <div className='text-text-muted mt-1 text-right text-xs'>
                  {preferences.length}/20000
                </div>
              </div>
            </div>

            <div className='mt-6 shrink-0'>
              <button
                onClick={handleSubmit}
                disabled={!destination || !hasValidTiming}
                className='bg-primary-600 w-full rounded-xl py-3.5 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50'
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {timingModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
          <div className='bg-surface-light text-text-main border-border flex w-full max-w-270 flex-col overflow-hidden rounded-[24px] border shadow-2xl'>
            <div className='border-border flex flex-col border-b px-8 py-5'>
              <div className='flex items-center justify-between'>
                <div />
                <h2 className='text-2xl font-semibold'>When</h2>
                <button
                  onClick={() => setTimingModalOpen(false)}
                  className='text-text-muted hover:text-primary-500 transition-colors'
                  aria-label='Close timing modal'
                >
                  <CircleX size={20} />
                </button>
              </div>
              <p className='text-text-muted mt-2 text-center text-sm'>
                {timingModalMode === 'dates'
                  ? startDate && endDate
                    ? dateSummary
                    : 'Select dates'
                  : flexibleSummary || `${flexibleDays} days`}
              </p>
            </div>

            <div className='flex-1 overflow-y-auto px-8 py-7'>
              <div className='mb-8 flex items-center justify-center'>
                <div className='bg-background inline-flex rounded-full p-1'>
                  <button
                    onClick={() => setTimingModalMode('dates')}
                    className={cn(
                      'rounded-full px-6 py-2 font-semibold transition-colors',
                      timingModalMode === 'dates'
                        ? 'bg-primary-500 text-white'
                        : 'text-text-main hover:text-primary-700'
                    )}
                  >
                    Dates
                  </button>
                  <button
                    onClick={() => setTimingModalMode('flexible')}
                    className={cn(
                      'rounded-full px-6 py-2 font-semibold transition-colors',
                      timingModalMode === 'flexible'
                        ? 'bg-secondary-500 text-white'
                        : 'text-text-main hover:text-secondary-700'
                    )}
                  >
                    Flexible
                  </button>
                </div>
              </div>

              {timingModalMode === 'dates' && (
                <div>
                  <div className='mb-8 flex items-center justify-center gap-3'>
                    <button
                      onClick={() => {
                        if (!canGoPrevMonth) return;
                        const previousMonth = new Date(
                          calendarMonth.getFullYear(),
                          calendarMonth.getMonth() - 1,
                          1
                        );
                        const previousMonthKey =
                          previousMonth.getFullYear() * 12 +
                          previousMonth.getMonth();
                        setCalendarMonth(
                          previousMonthKey < minMonthKey
                            ? minCalendarMonth
                            : previousMonth
                        );
                      }}
                      disabled={!canGoPrevMonth}
                      className='bg-background text-text-main hover:bg-primary-50 hover:text-primary-700 disabled:text-text-muted/40 disabled:bg-background/70 rounded-full p-2 transition-colors disabled:cursor-not-allowed'
                      aria-label='Show previous months'
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className='flex w-full max-w-215 gap-8'>
                      <div className='flex-1'>
                        <h3 className='mb-4 text-center text-lg font-semibold'>
                          {monthLabel(calendarMonth)}
                        </h3>
                        <div className='text-text-muted grid grid-cols-7 gap-y-2 text-center text-xs'>
                          {WEEK_DAYS.map(day => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                        <div className='mt-3 grid grid-cols-7 gap-y-1.5 text-center'>
                          {leftMonthCells.map((cell, index) => {
                            if (!cell) {
                              return (
                                <span
                                  key={`left-empty-${index}`}
                                  className='h-9'
                                />
                              );
                            }

                            const selected = isInSelectedRange(cell.iso);
                            const edge =
                              cell.iso === startDate || cell.iso === endDate;
                            const isPastDate = cell.iso < todayISO;

                            return (
                              <button
                                key={cell.iso}
                                onClick={() => handleDateSelect(cell.iso)}
                                disabled={isPastDate}
                                className={cn(
                                  'mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors',
                                  selected
                                    ? 'bg-primary-100 text-primary-900'
                                    : 'text-text-main hover:bg-primary-50 hover:text-primary-700',
                                  edge &&
                                    'bg-primary-500 hover:bg-primary-500 text-white',
                                  isPastDate &&
                                    'text-text-muted/40 hover:text-text-muted/40 cursor-not-allowed hover:bg-transparent'
                                )}
                              >
                                {cell.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className='flex-1'>
                        <h3 className='mb-4 text-center text-lg font-semibold'>
                          {monthLabel(nextMonth)}
                        </h3>
                        <div className='text-text-muted grid grid-cols-7 gap-y-2 text-center text-xs'>
                          {WEEK_DAYS.map(day => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                        <div className='mt-3 grid grid-cols-7 gap-y-1.5 text-center'>
                          {rightMonthCells.map((cell, index) => {
                            if (!cell) {
                              return (
                                <span
                                  key={`right-empty-${index}`}
                                  className='h-9'
                                />
                              );
                            }

                            const selected = isInSelectedRange(cell.iso);
                            const edge =
                              cell.iso === startDate || cell.iso === endDate;
                            const isPastDate = cell.iso < todayISO;

                            return (
                              <button
                                key={cell.iso}
                                onClick={() => handleDateSelect(cell.iso)}
                                disabled={isPastDate}
                                className={cn(
                                  'mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors',
                                  selected
                                    ? 'bg-primary-100 text-primary-900'
                                    : 'text-text-main hover:bg-primary-50 hover:text-primary-700',
                                  edge &&
                                    'bg-primary-500 hover:bg-primary-500 text-white',
                                  isPastDate &&
                                    'text-text-muted/40 hover:text-text-muted/40 cursor-not-allowed hover:bg-transparent'
                                )}
                              >
                                {cell.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className='bg-background text-text-main hover:bg-primary-50 hover:text-primary-700 rounded-full p-2 transition-colors'
                      aria-label='Show next months'
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {timingModalMode === 'flexible' && (
                <div>
                  <div className='mb-10 flex flex-col items-center gap-5'>
                    <span className='text-xl font-semibold'>
                      How many days?
                    </span>
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() =>
                          setFlexibleDays(Math.max(1, flexibleDays - 1))
                        }
                        className='bg-background text-text-main hover:bg-primary-50 hover:text-primary-700 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                      >
                        <Minus size={18} />
                      </button>
                      <span className='bg-background text-text-main flex h-10 min-w-20 items-center justify-center rounded-full px-5 text-xl font-medium'>
                        {flexibleDays}
                      </span>
                      <button
                        onClick={() => setFlexibleDays(flexibleDays + 1)}
                        className='bg-background text-text-main hover:bg-primary-50 hover:text-primary-700 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div className='mb-10 flex w-full flex-col items-center gap-5'>
                    <span className='text-xl font-semibold'>
                      Travel anytime
                    </span>
                    <div className='grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6'>
                      {FLEXIBLE_MONTH_OPTIONS.map(month => (
                        <button
                          key={month}
                          onClick={() => handleFlexibleMonthToggle(month)}
                          className={cn(
                            'bg-background text-text-main hover:bg-primary-50 hover:text-primary-700 flex h-28 flex-col items-center justify-center gap-3 rounded-2xl transition-colors',
                            flexibleMonths.includes(month) &&
                              'bg-primary-100 text-primary-900 ring-primary-300 ring-2'
                          )}
                        >
                          <CalendarIcon size={22} className='opacity-80' />
                          <span className='text-base'>{month}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='border-border flex shrink-0 items-center justify-end gap-4 border-t px-8 py-5'>
              <button
                onClick={() => {
                  if (timingModalMode === 'dates') {
                    setSelectedTimingType('dates');
                    setFlexibleMonths([]);
                  } else {
                    setSelectedTimingType('flexible');
                    setStartDate('');
                    setEndDate('');
                  }
                  setTimingModalOpen(false);
                }}
                disabled={
                  timingModalMode === 'dates'
                    ? !startDate || !endDate
                    : flexibleMonths.length === 0
                }
                className='bg-primary-500 hover:bg-primary-400 rounded-full px-8 py-3 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
