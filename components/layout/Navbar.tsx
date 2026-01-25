"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, ShoppingBag, MessageCircle, Telescope, Waypoints, Boxes } from "lucide-react";

const NAV_ITEMS = [
  { label: "Chat", href: "/chat", icon: MessageCircle },
  { label: "Explore", href: "/explore", icon: Telescope },
  { label: "Journey", href: "/journey", icon: Waypoints },
  { label: "Hub", href: "/hub", icon: Boxes },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-16 w-full bg-[#8BC34A] text-white">
      <div className="flex h-full w-full items-center px-6">
        {/* Left Section: Logo + Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1 text-2xl">
               {/* lakbai.svg is the logo icon. */}
               <Image
                  src="/lakbai.svg"
                  alt="Lakbai Logo"
                  width={32}
                  height={32}
                  className="brightness-0 invert" 
               />
               <span className="font-sans font-medium tracking-tight">lakbai</span>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    group flex items-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#CCFF00] text-black shadow-sm"
                        : "text-white/90 hover:bg-white/10"
                    }
                  `}
                >
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? "max-w-5 mr-2 opacity-100" : "max-w-0 mr-0 opacity-0 group-hover:max-w-5 group-hover:mr-2 group-hover:opacity-100" }`}>
                    <Icon size={18} />
                  </div>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-4">
          <button className="text-white/90 hover:text-white transition-colors">
            <Sun size={20} />
          </button>
          <button className="text-white/90 hover:text-white transition-colors">
            <ShoppingBag size={20} />
          </button>
          
          {/* User Profile */}
          <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/20 bg-[#CCFF00]">
             {/* User avatar would go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
