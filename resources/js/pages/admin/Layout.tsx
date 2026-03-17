import { PropsWithChildren } from 'react';
import Topbar from '@/components/topbar/tenant/Topbar';
import Sidebar from '@/components/sidebars/admin/Sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-background-dark text-white">
      <Sidebar />
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar placeholder="Search tenants, requests..." role="Central Admin" />
        <div className="flex-1 space-y-8 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
