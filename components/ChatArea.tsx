"use client";

export default function ChatArea() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 text-sm text-gray-600">
        <p className="italic text-gray-400">Chat messages will appear here…</p>
      </div>

      <div className="border-t border-gray-200 px-4 py-3">
        <input
          type="text"
          placeholder="Ask Lakbai something…"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
    </div>
  );
}
