import type { Metadata } from "next";
import { Geist, Rethink_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lakbai",
  description: "AI-powered travel planning and navigation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${rethinkSans.variable} min-h-screen bg-white text-gray-900 antialiased`}
      >
        <Navbar />

        <main className="h-[calc(100vh-4rem)] w-full">{children}</main>
      </body>
    </html>
  );
}
