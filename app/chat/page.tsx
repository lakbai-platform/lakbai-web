import ChatBox from "@/components/ChatArea";
import MapArea from "@/components/MapArea";

export default function ChatPage() {
  return (
    <div className="flex h-full w-full bg-gray-100">
      {/* Chat area */}
      <div className="flex h-full w-[35%] flex-col border-r border-gray-200 bg-white">
        <ChatBox />
      </div>

      {/* Map area */}
      <div className="h-full w-[65%] p-6">
        <div className="h-full w-full overflow-hidden rounded-2xl bg-white shadow">
          <MapArea />
        </div>
      </div>
    </div>
  );
}
