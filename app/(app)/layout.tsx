import type { Metadata } from 'next';

import { Sidebar } from './_components/Sidebar';

export const metadata: Metadata = {
  title: 'Lakbai App',
  description: 'AI-powered travel planning and navigation'
};

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen w-full flex-row'>
      <Sidebar />
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  );
}
