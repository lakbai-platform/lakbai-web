'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Navigation, 
  Map as MapIcon, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  Compass,
  LayoutGrid,
  MapPin
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] selection:bg-primary-100">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-lg shadow-blue-200">
              <Navigation size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">LAKBAI</span>
          </div>
          
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/explore" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="/hub" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Hub</Link>
            <Link href="/journey" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">My Journeys</Link>
            <Link href="/chat" className="rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95">
              Open App
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden pt-32 pb-20 px-6 lg:pt-48">
          {/* Subtle Background Decor */}
          <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl" />
          
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 border border-blue-100 animate-fade-in">
              <Sparkles size={16} />
              <span>Smart Travel for Legazpi City</span>
            </div>
            <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1]">
              Plan your journey <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">with AI precision.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 leading-relaxed">
              Lakbai combines intelligent chat assistance with interactive mapping to help you 
              discover the best of Albay. From Mayon views to hidden culinary gems.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/chat" className="group flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95">
                Start Chatting <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/explore" className="rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300">
                Explore Places
              </Link>
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* AI CHAT */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:border-blue-200 hover:bg-white hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-blue-200 shadow-lg">
                <MessageSquare size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">AI Concierge</h3>
              <p className="text-slate-600">Tell us what you like, and our AI will build a custom itinerary in seconds.</p>
            </div>

            {/* MAPS */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:border-orange-200 hover:bg-white hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-orange-200 shadow-lg">
                <MapIcon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Interactive Map</h3>
              <p className="text-slate-600">Visualize your trip with tagged POIs for restaurants, parks, and landmarks.</p>
            </div>

            {/* JOURNEY */}
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-emerald-200 shadow-lg">
                <Compass size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Seamless Itinerary</h3>
              <p className="text-slate-600">Organize your days, manage your basecamp, and never miss a destination.</p>
            </div>
          </div>
        </section>

        {/* --- APP MOCKUP PREVIEW --- */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-slate-900 p-4 shadow-2xl md:p-8">
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-white aspect-[16/9] relative">
              {/* This mimics your UI structure */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                 <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 text-blue-600 animate-bounce" />
                    <p className="font-bold text-slate-400">Lakbai Dashboard Preview</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-70">
            <Navigation size={18} fill="currentColor" />
            <span className="font-bold tracking-tight">LAKBAI</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Lakbai App. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
             <Link href="/profile" className="hover:text-slate-600">Profile</Link>
             <Link href="/contribute" className="hover:text-slate-600">Contribute</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
