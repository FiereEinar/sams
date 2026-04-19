import { Link, usePage, router } from '@inertiajs/react';
import SidebarHeader from '../SidebarHeader';
import { SidebarLink } from '../tenant/Sidebar';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

export default function Sidebar() {
  const { url } = usePage();

    const navItems = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
    { title: 'Requests', href: '/admin/requests', icon: 'pending_actions' },
    { title: 'Tenants', href: '/admin/tenants', icon: 'domain' },
    { title: 'Payments', href: '/admin/payments', icon: 'payments' },
    { title: 'Plans', href: '/admin/plans', icon: 'sell' },
    { title: 'Support', href: '/admin/support', icon: 'support_agent' },
    { title: 'Monitoring', href: '/admin/monitoring', icon: 'monitoring' },
  ];
  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-background-light dark:border-white/10 dark:bg-background-dark">
      <SidebarHeader icon="admin_panel_settings" title="Admin" subtitle="Central Panel" />

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navItems.map((link) => (
          <SidebarLink key={link.title} {...link} isActive={url.startsWith(link.href)} />
        ))}
      </nav>

      <div className="px-4 pb-6">
        <ConfirmDialog
          title="Log Out"
          description="Are you sure you want to log out of your account?"
          confirmText="Log Out"
          onConfirm={() => router.post('/logout')}
          trigger={(open) => (
            <button
              onClick={open}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Log Out</span>
            </button>
          )}
        />
      </div>
    </aside>
  );
}
