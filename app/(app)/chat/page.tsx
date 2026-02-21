import Chatbox from './_components/chatbox';
// import MapArea from "./_components/maparea"; // ← Add later

export default function ChatPage() {
  return (
    <div className='flex h-full w-full overflow-hidden'>
      {/* LEFT: Chatbox (40%) */}
      <div className='h-full w-2/5 border-r bg-white'>
        <Chatbox />
      </div>

      {/* RIGHT: MapArea (60%) */}
      <div className='h-full w-3/5 bg-gray-100'>
        {/* Replace this when MapArea component is created */}
        {/* <MapArea /> */}

        {/* Temporary Placeholder */}
        <div className='flex h-full items-center justify-center text-sm text-gray-400'>
          Map Area
        </div>
      </div>
    </div>
  );
}
