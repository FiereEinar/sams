import { Link, usePage, router } from '@inertiajs/react';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from '../SidebarHeader';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const sidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'Events',
    href: '/events',
    icon: 'calendar_today',
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: 'how_to_reg',
  },
  {
    title: 'Masterlist',
    href: '/masterlist',
    icon: 'groups',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
  },
];

export default function Sidebar() {
  const { url } = usePage();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-background-light dark:border-white/10 dark:bg-background-dark">
      <SidebarHeader icon="account_balance" title="SSG Admin" subtitle="Supreme Student Gov." />

      <nav className="flex-1 space-y-1 px-4">
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.title} {...link} isActive={url.startsWith(link.href)} />
        ))}
      </nav>
      <div className="px-4 pb-2">
        <ConfirmDialog
          title="Log Out"
          description="Are you sure you want to log out of your account?"
          confirmText="Log Out"
          onConfirm={() => router.post('/logout')}
          trigger={(open) => (
            <button
              onClick={open}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-red-100 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Log Out</span>
            </button>
          )}
        />
      </div>
      <SidebarFooter />
    </aside>
  );
}

type SidebarLinkProps = {
  title: string;
  icon: string;
  href: string;
  isActive: boolean;
};

export function SidebarLink({ title, icon, href, isActive }: SidebarLinkProps) {
  return (
    <Link
      className={`${isActive ? 'bg-primary/10 !text-primary' : ''} flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10`}
      href={href}
    >
      {/* <a className={`${isActive ? 'active-nav' : ''} flex items-center gap-3 rounded-xl px-3 py-2.5`} href={href}> */}
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}
