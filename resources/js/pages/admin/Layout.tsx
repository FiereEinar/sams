import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import SidebarHeader from '@/components/sidebars/SidebarHeader';
import { SidebarLink } from '@/components/sidebars/tenant/Sidebar';
import Topbar from '@/components/topbar/tenant/Topbar';

export default function Layout({ children }: PropsWithChildren) {
  const { url } = usePage();

  const navItems = [
    { title: 'Requests', href: '/admin/requests', icon: 'pending_actions' },
    { title: 'Tenants', href: '/admin/tenants', icon: 'domain' },
  ];

  return (
    <div className="flex h-screen bg-background-dark text-white">
      <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-surface-dark/50">
        <SidebarHeader icon="admin_panel_settings" title="Admin" subtitle="Central Panel" />

        <nav className="flex flex-1 flex-col gap-1 px-4">
          {navItems.map((link) => (
            <SidebarLink key={link.title} {...link} isActive={url.startsWith(link.href)} />
          ))}
        </nav>

        <div className="px-4 pb-6">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Log Out</span>
          </Link>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar placeholder="Search tenants, requests..." role="Central Admin" />
        <div className="flex-1 space-y-8 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
