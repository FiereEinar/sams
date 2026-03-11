import { Link, usePage } from '@inertiajs/react';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

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
    title: 'Analytics',
    href: '/analytics',
    icon: 'assessment',
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
      <SidebarHeader />
      <nav className="flex-1 space-y-1 px-4">
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.title} {...link} isActive={url.startsWith(link.href)} />
        ))}
      </nav>
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

function SidebarLink({ title, icon, href, isActive }: SidebarLinkProps) {
  return (
    <Link
      className={`${isActive ? 'active-nav' : ''} flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10`}
      href={href}
    >
      {/* <a className={`${isActive ? 'active-nav' : ''} flex items-center gap-3 rounded-xl px-3 py-2.5`} href={href}> */}
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}
