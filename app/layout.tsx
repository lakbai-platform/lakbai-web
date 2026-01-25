import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";

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
      <body className="min-h-screen bg-white text-gray-900">
        <Navbar />

        <main className="h-[calc(100vh-4rem)] w-full">{children}</main>
      </body>
    </html>
  );
}
