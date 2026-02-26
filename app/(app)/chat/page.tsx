import Chatbox from './_components/chatbox';
import MapArea from './_components/map-area';

export default function ChatPage() {
  return (
    <div className='flex h-full w-full overflow-hidden'>
      {/* LEFT: Chatbox (50%) */}
      <div className='h-full w-1/2 border-r bg-white'>
        <Chatbox />
      </div>

      {/* RIGHT: MapArea (50%) */}
      <div className='h-full w-1/2 bg-gray-100'>
        <MapArea />
      </div>
    </div>
  );
}
