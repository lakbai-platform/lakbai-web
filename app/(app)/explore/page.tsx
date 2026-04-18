import ExploreArea from './_components/explore-area';
import MapArea from '../chat/_components/map-area';

export default function ExplorePage() {
  return (
    <div className='flex h-full w-full overflow-hidden'>
      <div className='bg-surface border-border h-full w-1/2 border-r transition-all'>
        <ExploreArea />
      </div>

      <div className='bg-surface-light h-full flex-1'>
        <MapArea />
      </div>
    </div>
  );
}
