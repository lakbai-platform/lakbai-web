"use client";

import { MoreVertical, Mic, Send, Info } from "lucide-react";
import Image from "next/image";

export default function ChatArea() {
  return (
    <div className="flex h-full flex-col font-sans">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 bg-[#CCFF00] px-4">
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-medium text-gray-700">Journey to Bahamas</span>
          <h2 className="truncate text-sm font-bold text-black">
            I want to go to the Bahamahas and check out some inter...
          </h2>
        </div>
        <button className="rounded-full p-2 hover:bg-black/5">
          <MoreVertical size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="flex flex-col gap-6">
          
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-800">
              I want to go to the Bahamahas and check out some interesting beaches!
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-3">
             {/* AI Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8BC34A] text-white">
              <span className="text-xs font-bold">L</span> {/* Placeholder for Logo/Icon */}
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="text-sm leading-relaxed text-gray-800">
                The <span className="font-semibold">Bahamas</span> is full of surprises. If you're looking for something specific—maybe a hidden gem, a new itinerary idea, or help with your plans—just let me know!
                <br />
                What would you like to explore or plan next for your trip to the <span className="font-semibold">Bahamas</span>?
              </div>
              
              {/* Image Attachment Example */}
              <div className="relative h-48 w-48 overflow-hidden rounded-xl">
                 <Image 
                   src="/placeholder-beach.jpg" // Note: This image might not exist, using generic placeholder or verify later
                   alt="Bahamas Beach"
                   width={192}
                   height={192}
                   className="h-full w-full object-cover bg-gray-200"
                 />
                 <div className="absolute bottom-2 right-2 rounded-full bg-white/80 p-1 backdrop-blur-sm">
                    <Info size={12} className="text-gray-600"/>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="relative flex items-center rounded-2xl bg-[#CCFF00] px-2 py-2 shadow-sm">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 text-gray-800">
            {/* Some sparkly icon */}
            <span className="text-xl">✨</span> 
          </button>
          
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent px-2 text-sm text-gray-900 placeholder:text-gray-600 outline-none"
          />
          
          <div className="flex items-center gap-1">
             <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 text-gray-800">
                <Mic size={20} />
             </button>
             <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8BC34A] text-white shadow-sm hover:bg-[#7CB342]">
                <Send size={18} />
             </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-400">
            <Info size={10} />
            <span>Lakbai may make errors. Check important information</span>
        </div>
      </div>
    </div>
  );
}
