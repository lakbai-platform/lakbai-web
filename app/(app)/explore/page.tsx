import SearchBox from './_components/searchbox';
{
  /*import MapArea from './_components/maparea';*/
}

export default function ExplorePage() {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
      {/* LEFT 50% */}
      <div className='w-1/2 border-r bg-white'>
        <SearchBox />
      </div>

      {/* RIGHT 50% */}
      <div className='w-1/2'>{/*<MapArea />*/}</div>
    </div>
  );
}
