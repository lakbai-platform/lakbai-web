import Chatbox from './_components/chatbox';
import MapArea from './_components/map-area';

export default function ChatPage() {
  return (
    <div className='flex h-full w-full overflow-hidden'>
      {/* LEFT: Chatbox (40%) */}
      <div className='h-full w-2/5 border-r bg-white'>
        <Chatbox />
      </div>

      {/* RIGHT: MapArea (60%) */}
      <div className='h-full w-3/5 bg-gray-100'>
        <MapArea />
      </div>
    </div>
  );
}
