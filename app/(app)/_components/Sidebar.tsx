'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { TextSubheading } from '@/components/text';
import {
  MessageCircle,
  Luggage,
  Search,
  Navigation,
  MapPin,
  Bell,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'group border-text-muted bg-surface relative flex h-full flex-col border-r transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-22' : 'w-55'
      )}
    >
      {/* Logo Area */}
      <div
        className={cn(
          'group/logo relative flex h-24 items-center px-6',
          isCollapsed && 'cursor-pointer justify-center px-0'
        )}
        onClick={() => isCollapsed && setIsCollapsed(false)}
      >
        {/* Toggle Button Container */}
        <div
          className={cn(
            'absolute top-9 z-50 flex items-center justify-center transition-all duration-200',
            isCollapsed
              ? 'left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100' // Centered
              : 'right-4 opacity-0 group-hover/logo:opacity-100' // Right aligned
          )}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className='border-text-muted bg-surface text-text-muted flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border hover:bg-slate-100 focus:outline-none'
          >
            {isCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </button>
        </div>

        {/* Logo Image */}
        <div
          className={cn(
            'relative h-8 w-8 shrink-0 transition-opacity duration-200',
            isCollapsed && 'group-hover/logo:opacity-0'
          )}
        >
          <Image
            src='/logos/lakbai.svg'
            alt='Lakbai'
            fill
            className='object-contain'
          />
        </div>

        {/* Logo Text */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
          )}
        >
          <TextSubheading className='text-primary-500 font-bold'>
            lakbai
          </TextSubheading>
        </div>
      </div>

      {/* Nav */}
      <nav
        className={cn(
          'flex flex-1 flex-col gap-4 py-4',
          isCollapsed ? 'items-center px-0' : 'px-4'
        )}
      >
        {/* Chat */}
        <Link
          href='/chat'
          className={cn(
            'group/link flex items-center transition-colors',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/chat')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-600'
                : 'text-primary-600 bg-transparent'
              : 'text-text-muted hover:text-text-main hover:bg-slate-100'
          )}
        >
          <MessageCircle size={24} strokeWidth={2} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Chat</span>
          </div>
        </Link>

        {/* Journey */}
        <Link
          href='/journey'
          className={cn(
            'group/link flex items-center transition-colors',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/journey')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-600'
                : 'text-primary-600 bg-transparent'
              : 'text-text-muted hover:text-text-main hover:bg-slate-100'
          )}
        >
          <Luggage size={24} strokeWidth={2} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Journey</span>
          </div>
        </Link>

        {/* Explore */}
        <Link
          href='/explore'
          className={cn(
            'group/link flex items-center transition-colors',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/explore')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-600'
                : 'text-primary-600 bg-transparent'
              : 'text-text-muted hover:text-text-main hover:bg-slate-100'
          )}
        >
          <Search size={24} strokeWidth={2} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Explore</span>
          </div>
        </Link>

        {/* Navigate */}
        <Link
          href='/navigate'
          className={cn(
            'group/link flex items-center transition-colors',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/navigate')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-600'
                : 'text-primary-600 bg-transparent'
              : 'text-text-muted hover:text-text-main hover:bg-slate-100'
          )}
        >
          <Navigation size={24} strokeWidth={2} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Navigate</span>
          </div>
        </Link>

        {/* Contribute */}
        <Link
          href='/contribute'
          className={cn(
            'group/link flex items-center transition-colors',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/contribute')
              ? isCollapsed
                ? 'bg-primary-50 text-primary-600'
                : 'text-primary-600 bg-transparent'
              : 'text-text-muted hover:text-text-main hover:bg-slate-100'
          )}
        >
          <MapPin size={24} strokeWidth={2} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Contribute</span>
          </div>
        </Link>
      </nav>

      {/* Footer */}
      <div
        className={cn(
          'flex flex-col gap-2 pb-8',
          isCollapsed ? 'items-center px-0' : 'px-4'
        )}
      >
        {/* Notifications */}
        <button
          className={cn(
            'text-text-muted flex items-center transition-colors hover:bg-slate-100',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg p-2'
          )}
        >
          <Bell size={24} className='shrink-0' />
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='font-medium whitespace-nowrap'>Notifications</span>
          </div>
        </button>
        {/* Profile */}
        <button
          className={cn(
            'text-text-muted flex items-center transition-colors hover:bg-slate-100',
            isCollapsed
              ? 'h-12 w-12 justify-center rounded-xl'
              : 'w-full rounded-lg p-2'
          )}
        >
          <UserCircle size={24} className='shrink-0' />
          <div
            className={cn(
              'flex flex-col items-start overflow-hidden transition-all duration-300',
              isCollapsed ? 'ml-0 w-0 opacity-0' : 'ml-3 w-auto opacity-100'
            )}
          >
            <span className='text-text-main text-sm font-medium whitespace-nowrap'>
              profile name
            </span>
            <span className='text-text-muted text-xs whitespace-nowrap'>
              @profileexample
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}
