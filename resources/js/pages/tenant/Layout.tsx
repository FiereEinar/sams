import Sidebar from '@/components/sidebars/tenant/Sidebar';
import Topbar from '@/components/topbar/tenant/Topbar';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-white">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col bg-background-light dark:bg-background-dark">
        <Topbar />
        <div className="space-y-8 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
