'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Map as MapIcon,
  MessageSquare,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  TextDisplay,
  TextHeading,
  TextSubheading,
  TextBody
} from '@/components/text';
import { Modal } from '@/app/(marketing)/_components/UserAuthModal';
import { GithubLogo } from '@/components/icons/GithubLogo';

export default function LandingPage() {
  // State for pop-up modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-white font-sans text-slate-900 selection:bg-blue-100'>
      <nav className='bg-surface border-border fixed top-0 z-50 w-full border-b'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-2'>
            <div className='relative h-9 w-9'>
              <Image
                src='/logos/lakbai.svg'
                alt='Lakbai'
                fill
                className='object-contain'
              />
            </div>
            <TextSubheading className='text-primary-500 font-bold'>
              lakbai
            </TextSubheading>
          </div>

          <div className='flex items-center gap-2 md:gap-4'>
            <button
              onClick={() => setIsLoginOpen(true)}
              className='hover:text-primary-500 text-text main px-3 py-2 text-sm font-semibold transition-colors md:px-4'
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className='bg-primary-500 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95 md:px-6'
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className='relative flex min-h-[75vh] flex-col justify-center px-6 pt-32 pb-16'>
          <div className='mx-auto w-full max-w-7xl'>
            <div className='max-w-5xl text-left'>
              <TextDisplay className='mb-6 tracking-tighter text-slate-900 md:mb-8 md:text-[100px] md:leading-[0.95]'>
                Plan your <br />
                <span className='text-primary-500'>
                  perfect journey
                </span>
              </TextDisplay>

              <TextSubheading className='mb-12 max-w-2xl leading-relaxed text-text-muted md:text-[28px]'>
                Smart itineraries for the modern <span className='text-primary-500 font-semibold'>local</span> explorer
              </TextSubheading>

              <div className='flex items-center justify-start'>
                {/* Changed to button to trigger Sign Up pop-up */}
                <button
                  onClick={() => setIsSignUpOpen(true)}
                  className='group bg-primary-500 text-background flex items-center gap-3 rounded-full px-10 py-5 text-lg font-semibold hover:cursor-pointer hover:opacity-90'
                >
                  Start your journey
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className='py-16 md:py-24'>
          <div className='mx-auto max-w-7xl px-4 md:px-6'>
            <div className='scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:px-0 md:pb-0'>
              <div className='group w-[88vw] shrink-0 snap-center rounded-[2.5rem] border border-slate-100 bg-white/60 p-10 backdrop-blur-sm transition-all hover:border-blue-200 hover:bg-white md:w-auto'>
                <div className='mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl'>
                  <MessageSquare size={28} />
                </div>
                <TextHeading className='mb-4 text-slate-900'>
                  AI Concierge
                </TextHeading>
                <TextBody className='text-base leading-relaxed text-slate-500'>
                  Smart chat assistance that understands your preferences and
                  plans your day instantly.
                </TextBody>
              </div>

              <div className='group w-[88vw] shrink-0 snap-center rounded-[2.5rem] border border-slate-100 bg-white/60 p-10 backdrop-blur-sm transition-all hover:border-orange-200 hover:bg-white md:w-auto'>
                <div className='mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-xl'>
                  <MapIcon size={28} />
                </div>
                <TextHeading className='mb-4 text-slate-900'>
                  Interactive Map
                </TextHeading>
                <TextBody className='text-base leading-relaxed text-slate-500'>
                  Live points of interest curated for travelers, including the
                  best food and sights in Legazpi.
                </TextBody>
              </div>

              <div className='group w-[88vw] shrink-0 snap-center rounded-[2.5rem] border border-slate-100 bg-white/60 p-10 backdrop-blur-sm transition-all hover:border-emerald-200 hover:bg-white md:w-auto'>
                <div className='mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl'>
                  <Compass size={28} />
                </div>
                <TextHeading className='mb-4 text-slate-900'>
                  Seamless Itinerary
                </TextHeading>
                <TextBody className='text-base leading-relaxed text-slate-500'>
                  A centralized place to manage your basecamp, daily schedules,
                  and trip history.
                </TextBody>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className='w-full bg-white/50 pt-16 pb-12 backdrop-blur-md'>
        <div className='mx-auto max-w-7xl px-6 md:px-4'>
          <div className='mb-10 h-px w-full bg-slate-200/60' />
          <div className='flex flex-col gap-10'>
            {/* Top Layer */}
            <div className='flex flex-col md:flex-row justify-between items-start gap-8'>
              <div className='flex flex-col gap-4 max-w-2xl'>
                <div className='relative h-9 w-9'>
                  <Image
                    src='/logos/lakbai.svg'
                    alt='Lakbai'
                    fill
                    className='object-contain'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-3 md:text-right'>
                <a href='#' className='font-medium text-text-muted hover:text-slate-900 transition-colors'>About</a>
                <a href='#' className='font-medium text-text-muted   hover:text-slate-900 transition-colors'>Team</a>
                <a href='#' className='font-medium text-text-muted hover:text-slate-900 transition-colors'>Contact</a>
              </div>
            </div>

            {/* Bottom Layer */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-slate-200/60'>
              <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8'>
                <TextBody className='font-medium text-text-muted'>
                  © 2026 Lakbai
                </TextBody>
                <div className='flex items-center gap-4 md:gap-6'>
                  <a href='#' className='text-sm font-medium text-text-muted hover:text-text-main transition-colors'>Privacy Policy</a>
                  <a href='#' className='text-sm font-medium text-text-muted hover:text-text-main transition-colors'>Terms of Service</a>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <a href='https://github.com/lakbai-platform/lakbai-web' target='_blank' rel='noreferrer' className='text-text-muted hover:text-text-main transition-colors'>
                  <span className="sr-only">GitHub</span>
                  <GithubLogo size={24} className='hover:text-primary-400' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title='Welcome Back'
      >
        <div className='space-y-6'>
          <div className='space-y-2'>
            <TextBody className='font-semibold text-slate-600'>
              Email Address
            </TextBody>
            <input
              type='email'
              placeholder='name@example.com'
              className='focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all outline-none focus:bg-white focus:ring-2'
            />
          </div>
          <button className='bg-primary-500 shadow-primary-500/30 w-full rounded-2xl py-4 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]'>
            Sign In
          </button>
          <div className='text-center'>
            <TextBody className='text-slate-500'>
              New to Lakbai?{' '}
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsSignUpOpen(true);
                }}
                className='text-primary-500 font-bold hover:underline'
              >
                Create an account
              </button>
            </TextBody>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        title='Join Lakbai'
      >
        <div className='space-y-6'>
          <div className='space-y-2'>
            <TextBody className='font-semibold text-slate-600'>
              Full Name
            </TextBody>
            <input
              type='text'
              placeholder='Christian Morga'
              className='focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all outline-none focus:bg-white focus:ring-2'
            />
          </div>
          <div className='space-y-2'>
            <TextBody className='font-semibold text-slate-600'>Email</TextBody>
            <input
              type='email'
              placeholder='name@example.com'
              className='focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all outline-none focus:bg-white focus:ring-2'
            />
          </div>
          <button className='bg-primary-500 shadow-primary-500/30 w-full rounded-2xl py-4 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]'>
            Create Account
          </button>
          <div className='text-center'>
            <TextBody className='text-slate-500'>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsSignUpOpen(false);
                  setIsLoginOpen(true);
                }}
                className='text-primary-500 font-bold hover:underline'
              >
                Sign in
              </button>
            </TextBody>
          </div>
        </div>
      </Modal>
    </div>
  );
}
