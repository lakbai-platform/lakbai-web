import ChatBox from "@/components/chat/ChatArea";
import MapArea from "@/components/map/MapArea";

export default function ChatPage() {
  return (
    <div className="flex h-full w-full bg-gray-50 overflow-hidden">
      {/* Chat area - Fixed width or percentage */}
      <div className="flex h-full w-[400px] min-w-[350px] shrink-0 flex-col border-r border-gray-200 bg-white lg:w-[35%]">
        <ChatBox />
      </div>

      {/* Map area - Fluid */}
      <div className="h-full flex-1 p-4">
        <div className="h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 shadow-sm">
          <MapArea />
        </div>
      </div>
    </div>
  );
}
