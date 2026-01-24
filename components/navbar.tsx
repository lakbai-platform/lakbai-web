"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Chat", href: "/chat", primary: true },
  { label: "Explore", href: "/explore" },
  { label: "Journey", href: "/journey" },
  { label: "Hub", href: "/hub" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="h-16 w-full border-b border-gray-200 bg-lime-500">
      <div className="flex h-full w-full items-center justify-between px-8">
        {/* Left logo+logo-text*/}
        <div className="flex items-center gap-2">
          <Image
            src="/lakbai.svg"
            alt="lakbai"
            width={50}
            height={50}
            priority
          />

          <Image
            src="/lakbai-text.svg"
            alt="lakbai text"
            width={90}
            height={44}
            priority
          />
        </div>

        {/* Center buttons */}
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    item.primary
                      ? "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
                      : isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            ☀️
          </button>

          <button
            aria-label="Bag"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            👜
          </button>

          <div className="h-8 w-8 cursor-pointer rounded-full bg-gray-200" />
        </div>
      </div>
    </header>
  );
}
