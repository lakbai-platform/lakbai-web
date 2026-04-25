'use client';

import { useRef, useState } from 'react';
import {
  MapPin,
  MapPinPlusInside,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { TextBody, TextHeading } from '@/components/text';
import ContributeMapArea, { type PickedLocation } from '@/components/map-area/ContributeMapArea';
import { usePois } from '@/components/map-area/use-pois';
import type { MapRef } from '@/components/ui/map';
import type { POI } from '@/components/map-area/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type FormState = {
  name: string;
  description: string;
  street: string;
  barangay: string;
  cityMunicipality: string;
  province: string;
};

const INITIAL_FORM: FormState = {
  name: '',
  description: '',
  street: '',
  barangay: '',
  cityMunicipality: '',
  province: '',
};

// ---------------------------------------------------------------------------
// ContributePage
// ---------------------------------------------------------------------------

export default function ContributePage() {
  const mapRef = useRef<MapRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { pois } = usePois();

  // Map interaction state
  const [isAddMode, setIsAddMode]               = useState(false);
  const [pickedLocation, setPickedLocation]     = useState<PickedLocation | null>(null);
  const [editingPoi, setEditingPoi]             = useState<POI | null>(null);

  // Form state
  const [form, setForm]             = useState<FormState>(INITIAL_FORM);
  const [showAddress, setShowAddress] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleLocationPick = (loc: PickedLocation) => {
    setPickedLocation(loc);
    // Auto-open the sidebar if it was closed
    if (!isAddMode) setIsAddMode(false);
  };

  const handleSuggestEdit = (poi: POI) => {
    setEditingPoi(poi);
    setPickedLocation({ latitude: poi.latitude, longitude: poi.longitude });
    setForm(prev => ({
      ...prev,
      name: poi.name,
      description: poi.description,
      street: poi.address?.street ?? '',
      barangay: poi.address?.barangay ?? '',
      cityMunicipality: poi.address?.cityMunicipality ?? '',
      province: poi.address?.province ?? '',
    }));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setPickedLocation(null);
    setEditingPoi(null);
    setForm(INITIAL_FORM);
    setShowAddress(false);
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickedLocation) {
      setErrorMessage('Please click the map to place a pin first.');
      setSubmitStatus('error');
      return;
    }

    if (!form.name.trim()) {
      setErrorMessage('Location name is required.');
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage('');

    const proposedData = {
      name: form.name.trim(),
      description: form.description.trim(),
      latitude: pickedLocation.latitude,
      longitude: pickedLocation.longitude,
      address: {
        street: form.street.trim() || undefined,
        barangay: form.barangay.trim() || undefined,
        cityMunicipality: form.cityMunicipality.trim() || undefined,
        province: form.province.trim() || undefined,
      },
    };

    try {
      const res = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: editingPoi ? 'UPDATE' : 'CREATE',
          poiId: editingPoi?.id ?? undefined,
          proposedData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Submission failed');
      }

      setSubmitStatus('success');
      // Reset after a short delay so the user sees the success message
      setTimeout(handleReset, 2500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setSubmitStatus('error');
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const hasPin = Boolean(pickedLocation);

  return (
    <div ref={containerRef} className='relative flex h-full w-full overflow-hidden'>
      {/* ------------------------------------------------------------------ */}
      {/* LEFT: Contribution Sidebar                                          */}
      {/* ------------------------------------------------------------------ */}
      <aside className='bg-surface border-border flex h-full w-96 shrink-0 flex-col border-r'>
        {/* Header */}
        <div className='border-border border-b px-5 py-4'>
          <TextHeading className='text-text-main text-lg font-bold'>
            {editingPoi ? 'Suggest an Edit' : 'Add a Location'}
          </TextHeading>
          <TextBody className='text-text-muted mt-1 text-xs leading-snug'>
            {editingPoi
              ? `Proposing changes to "${editingPoi.name}". An admin will review before it goes live.`
              : 'Enable pin mode, click the map to place a marker, then fill in the details below.'}
          </TextBody>
        </div>

        {/* Pin Mode Toggle */}
        <div className='border-border border-b px-5 py-3'>
          <button
            type='button'
            onClick={() => setIsAddMode(prev => !prev)}
            aria-pressed={isAddMode}
            className={cn(
              'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition',
              isAddMode
                ? 'bg-primary-500 text-white shadow-sm'
                : 'border-border bg-background text-text-main border hover:bg-surface-light'
            )}
          >
            <MapPinPlusInside className='h-4 w-4' />
            {isAddMode ? 'Click the map to place pin…' : 'Enable Pin Mode'}
          </button>

          {hasPin && (
            <p className='text-text-muted mt-2 flex items-center gap-1.5 text-xs'>
              <MapPin className='text-primary-500 h-3.5 w-3.5 shrink-0' />
              {pickedLocation!.latitude.toFixed(5)}, {pickedLocation!.longitude.toFixed(5)}
              <button
                type='button'
                onClick={() => setPickedLocation(null)}
                className='text-text-muted hover:text-error-500 ml-auto transition'
                aria-label='Remove pin'
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-1 flex-col overflow-y-auto'>
          <div className='flex flex-1 flex-col gap-4 px-5 py-4'>
            {/* Name */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-text-main text-xs font-semibold' htmlFor='contrib-name'>
                Location Name <span className='text-error-500'>*</span>
              </label>
              <input
                id='contrib-name'
                type='text'
                required
                placeholder='e.g. Cagsawa Ruins'
                value={form.name}
                onChange={e => handleFieldChange('name', e.target.value)}
                className='border-border text-text-main placeholder:text-text-muted bg-background focus:border-primary-400 rounded-lg border px-3 py-2 text-sm outline-none transition'
              />
            </div>

            {/* Description */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-text-main text-xs font-semibold' htmlFor='contrib-desc'>
                Description
              </label>
              <textarea
                id='contrib-desc'
                rows={3}
                placeholder='Brief description of this location…'
                value={form.description}
                onChange={e => handleFieldChange('description', e.target.value)}
                className='border-border text-text-main placeholder:text-text-muted bg-background focus:border-primary-400 resize-none rounded-lg border px-3 py-2 text-sm outline-none transition'
              />
            </div>

            {/* Address — collapsible */}
            <div className='border-border rounded-lg border'>
              <button
                type='button'
                onClick={() => setShowAddress(p => !p)}
                className='text-text-main flex w-full items-center justify-between px-3 py-2.5 text-xs font-semibold'
              >
                Address (optional)
                {showAddress ? (
                  <ChevronUp className='h-3.5 w-3.5' />
                ) : (
                  <ChevronDown className='h-3.5 w-3.5' />
                )}
              </button>

              {showAddress && (
                <div className='border-border flex flex-col gap-3 border-t px-3 pb-3 pt-3'>
                  {(
                    [
                      ['street',          'Street'],
                      ['barangay',        'Barangay'],
                      ['cityMunicipality','City / Municipality'],
                      ['province',        'Province'],
                    ] as [keyof FormState, string][]
                  ).map(([field, label]) => (
                    <div key={field} className='flex flex-col gap-1'>
                      <label className='text-text-muted text-xs' htmlFor={`contrib-${field}`}>
                        {label}
                      </label>
                      <input
                        id={`contrib-${field}`}
                        type='text'
                        value={form[field]}
                        onChange={e => handleFieldChange(field, e.target.value)}
                        className='border-border text-text-main placeholder:text-text-muted bg-background focus:border-primary-400 rounded-md border px-2.5 py-1.5 text-xs outline-none transition'
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status banners */}
          {submitStatus === 'error' && (
            <div className='mx-5 mb-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700'>
              <AlertCircle className='h-4 w-4 shrink-0' />
              {errorMessage}
            </div>
          )}

          {submitStatus === 'success' && (
            <div className='mx-5 mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700'>
              <CheckCircle className='h-4 w-4 shrink-0' />
              Submitted! An admin will review your contribution soon.
            </div>
          )}

          {/* Footer actions */}
          <div className='border-border border-t px-5 py-3 flex gap-2'>
            <button
              type='button'
              onClick={handleReset}
              className='border-border text-text-muted hover:bg-surface-light flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition'
            >
              Reset
            </button>
            <button
              type='submit'
              disabled={submitStatus === 'loading' || submitStatus === 'success'}
              className='bg-primary-500 hover:bg-primary-600 flex flex-[2] items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60'
            >
              {submitStatus === 'loading' && <Loader2 className='h-4 w-4 animate-spin' />}
              {editingPoi ? 'Submit Edit' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT: Map                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className='relative h-full flex-1'>
        {/* Instruction hint overlay when pin mode is active */}
        {isAddMode && !hasPin && (
          <div className='pointer-events-none absolute top-4 left-1/2 z-20 -translate-x-1/2'>
            <div className='bg-background/95 text-text-main rounded-full border px-4 py-2 text-sm font-medium shadow backdrop-blur-sm'>
              Click anywhere on the map to place your pin
            </div>
          </div>
        )}

        <ContributeMapArea
          pois={pois}
          pickedLocation={pickedLocation}
          onLocationPick={loc => {
            handleLocationPick(loc);
            setIsAddMode(false); // exit pin mode after placing
          }}
          onSuggestEdit={handleSuggestEdit}
          mapRef={mapRef}
          isAddMode={isAddMode}
        />
      </div>
    </div>
  );
}
