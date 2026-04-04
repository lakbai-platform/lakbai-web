import { TextBody } from '@/components/text';

type Journey = {
  id: string;
  title: string;
  location: string;
  days: number;
};

export default function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <div className='group bg-surface-200 relative h-[220px] w-full overflow-hidden rounded-[24px] transition-all hover:shadow-md sm:h-[260px] md:h-[300px] lg:h-[350px] lg:w-[450px]'>
      {/* Placeholder background (future image) */}
      <div className='absolute inset-0 bg-gray-200' />

      {/* Content (bottom-left) */}
      <div className='absolute bottom-0 left-0 w-full p-4'>
        <TextBody className='text-text-main text-sm font-semibold'>
          {journey.title}
        </TextBody>

        <TextBody className='text-text-muted text-xs'>
          {journey.location} • {journey.days} days
        </TextBody>
      </div>
    </div>
  );
}
