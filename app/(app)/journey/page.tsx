import JourneyList from './_components/journey-list';
import { prisma } from '@/lib/prisma';

export default async function JourneyPage() {
  const journeys = await prisma.journey.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className='bg-surface flex h-full w-full'>
      <JourneyList initialJourneys={journeys} />
    </div>
  );
}
