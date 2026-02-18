'use client';

type JourneyAreaProps = {
  open: boolean;
  onClose: () => void;
};

export default function JourneyArea({ open, onClose }: JourneyAreaProps) {
  if (!open) return null;

  return (
    <div className='absolute inset-0 z-10 flex flex-col bg-white'>
      {/* Header */}
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <h2 className='text-lg font-semibold'>Journey</h2>

        <button
          onClick={onClose}
          className='text-sm text-gray-500 hover:text-black'
        >
          ✕
        </button>
      </div>

      {/* Journey Content */}
      <div className='flex-1 overflow-y-auto p-4'>
        {/* Placeholder — Replace later with real Journey UI */}
        <div className='space-y-4'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-semibold'>Journey Planner</h3>
            <p className='mt-1 text-sm text-gray-500'>
              Journey content will appear here.
            </p>
          </div>

          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-semibold'>Itinerary</h3>
            <p className='mt-1 text-sm text-gray-500'>
              Add itinerary items here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
