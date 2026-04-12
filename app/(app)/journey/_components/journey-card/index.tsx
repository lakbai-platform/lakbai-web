import { TextBody } from '@/components/text';

type Journey = {
  id: string;
  title: string;
  destination: string | null;
  startDate: Date | string | null;
  endDate: Date | string | null;
  createdAt: Date | string;
};

export default function JourneyCard({ journey }: { journey: Journey }) {
  // Compute days if dates exist
  let daysText = 'TBD days';
  if (journey.startDate && journey.endDate) {
    const start = new Date(journey.startDate);
    const end = new Date(journey.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysText = `${diffDays || 1} day${diffDays > 1 ? 's' : ''}`;
  }

  return (
    <div className='group bg-surface-200 relative h-[220px] w-full overflow-hidden rounded-[24px] transition-all hover:shadow-md sm:h-[260px] md:h-[300px] lg:h-[350px] lg:w-[450px] border border-border'>
      {/* Placeholder background gradient */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300' />

      {/* Gradient overlay for text readability */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90' />

      {/* Content (bottom-left) */}
      <div className='absolute bottom-0 left-0 w-full p-5'>
        <TextBody className='text-white text-lg font-bold truncate'>
          {journey.title}
        </TextBody>

        <TextBody className='text-white/80 text-sm mt-0.5'>
          {journey.destination || 'Planning exactly where'} • {daysText}
        </TextBody>
      </div>
    </div>
  );
}
