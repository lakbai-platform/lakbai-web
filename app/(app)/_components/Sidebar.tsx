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
        'group relative flex flex-col border-r border-text-muted bg-surface transition-all duration-300 ease-in-out h-full',
        isCollapsed ? 'w-[88px]' : 'w-[220px]'
      )}
    >

      {/* Logo Area */}
      <div className={cn('relative flex h-24 items-center px-6 group/logo', isCollapsed && 'justify-center px-0 cursor-pointer')}
           onClick={() => isCollapsed && setIsCollapsed(false)}
      >
        
        {/* Toggle Button Container */}
        <div className={cn(
            'absolute z-50 flex items-center justify-center transition-all duration-200 top-9',
            isCollapsed 
                ? 'left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100' // Centered
                : 'right-4 opacity-0 group-hover/logo:opacity-100' // Right aligned
        )}>
             <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(!isCollapsed);
                }}
                className='flex h-6 w-6 items-center justify-center rounded-full border border-text-muted bg-surface text-text-muted hover:bg-slate-100 focus:outline-none cursor-pointer'
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </div>


        {/* Logo Image */}
        <div className={cn(
            'relative h-8 w-8 shrink-0 transition-opacity duration-200',
             isCollapsed && 'group-hover/logo:opacity-0'
        )}>
          <Image
            src="/logos/lakbai.svg"
            alt="Lakbai"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Logo Text */}
        <div className={cn(
            'overflow-hidden transition-all duration-300',
            isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
        )}>
             <TextSubheading className="font-bold text-primary-500">lakbai</TextSubheading>
        </div>
      </div>

      {/* Nav */}
      <nav className={cn('flex-1 flex flex-col gap-4 py-4', isCollapsed ? 'items-center px-0' : 'px-4')}>
        
        {/* Chat */}
        <Link
          href="/chat"
          className={cn(
            'flex items-center transition-colors group/link',
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/chat')
              ? isCollapsed 
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-transparent text-primary-600'
              : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
          )}
        >
          <MessageCircle size={24} strokeWidth={2} className="shrink-0" />
          <div className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
          )}>
              <span className='font-medium whitespace-nowrap'>Chat</span>
          </div>
        </Link>

        {/* Journey */}
        <Link
          href="/journey"
          className={cn(
            'flex items-center transition-colors group/link',
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/journey')
              ? isCollapsed 
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-transparent text-primary-600'
              : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
          )}
        >
          <Luggage size={24} strokeWidth={2} className="shrink-0" />
          <div className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
          )}>
              <span className='font-medium whitespace-nowrap'>Journey</span>
          </div>
        </Link>

        {/* Explore */}
        <Link
          href="/explore"
          className={cn(
            'flex items-center transition-colors group/link',
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/explore')
              ? isCollapsed 
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-transparent text-primary-600'
              : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
          )}
        >
          <Search size={24} strokeWidth={2} className="shrink-0" />
          <div className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
          )}>
              <span className='font-medium whitespace-nowrap'>Explore</span>
          </div>
        </Link>

        {/* Navigate */}
        <Link
          href="/navigate"
          className={cn(
            'flex items-center transition-colors group/link',
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/navigate')
              ? isCollapsed 
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-transparent text-primary-600'
              : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
          )}
        >
          <Navigation size={24} strokeWidth={2} className="shrink-0" />
          <div className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
          )}>
              <span className='font-medium whitespace-nowrap'>Navigate</span>
          </div>
        </Link>

        {/* Contribute */}
        <Link
          href="/contribute"
          className={cn(
            'flex items-center transition-colors group/link',
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg px-3 py-3',
            pathname.startsWith('/contribute')
              ? isCollapsed 
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-transparent text-primary-600'
              : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
          )}
        >
          <MapPin size={24} strokeWidth={2} className="shrink-0" />
          <div className={cn(
              'overflow-hidden transition-all duration-300',
              isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
          )}>
              <span className='font-medium whitespace-nowrap'>Contribute</span>
          </div>
        </Link>

      </nav>

      {/* Footer */}
      <div className={cn('flex flex-col gap-2 pb-8', isCollapsed ? 'items-center px-0' : 'px-4')}>
         {/* Notifications */}
        <button className={cn('flex items-center transition-colors hover:bg-slate-100 text-text-muted', 
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg p-2'
        )}>
            <Bell size={24} className="shrink-0" />
            <div className={cn(
                  'overflow-hidden transition-all duration-300',
                  isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
              )}>
                 <span className='font-medium whitespace-nowrap'>Notifications</span>
            </div>
        </button>
        {/* Profile */}
         <button className={cn('flex items-center transition-colors hover:bg-slate-100 text-text-muted', 
            isCollapsed 
                ? 'h-12 w-12 justify-center rounded-xl' 
                : 'w-full rounded-lg p-2'
        )}>
            <UserCircle size={24} className="shrink-0" />
             <div className={cn(
                  'flex flex-col items-start overflow-hidden transition-all duration-300',
                  isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-auto opacity-100 ml-3'
              )}>
                     <span className='text-sm font-medium text-text-main whitespace-nowrap'>profile name</span>
                     <span className='text-xs text-text-muted whitespace-nowrap'>@profileexample</span>
             </div>
        </button>
      </div>
    </aside>
  );
}
