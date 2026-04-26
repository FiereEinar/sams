import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/hooks/use-theme';

type TopbarProps = {
  placeholder?: string;
  role?: string;
};

const allTopbarLinks = [
  { title: 'Dashboard', href: '/dashboard', permission: 'DASHBOARD_VIEW' },
  { title: 'Events', href: '/events', permission: 'EVENTS_VIEW' },
  { title: 'Attendance', href: '/attendance', permission: 'ATTENDANCE_VIEW' },
  { title: 'Masterlist', href: '/masterlist', permission: 'MASTERLIST_VIEW' },
  { title: 'Users', href: '/users', permission: 'USERS_VIEW' },
  { title: 'Roles', href: '/roles', permission: 'ROLES_VIEW' },
  { title: 'Settings', href: '/settings', permission: 'SETTINGS_VIEW' },
];

export default function Topbar({ placeholder = 'Search...', role = 'Admin' }: TopbarProps) {
  const { props, url } = usePage();
  const user = (props as any).auth?.user;
  const userPermissions: string[] = (props as any).userPermissions || [];
  const { toggleSidebar, isSidebarCollapsed, topbarMenu } = useTheme();

  const topbarLinks = allTopbarLinks.filter((link) => userPermissions.includes(link.permission));

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-background-light px-8 dark:border-white/10 dark:bg-background-dark">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="flex size-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          title={isSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
        >
          <span className="material-symbols-outlined text-xl">{isSidebarCollapsed ? 'menu' : 'menu_open'}</span>
        </button>
        <div className="relative w-full max-w-xs">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">search</span>
          <input
            className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 text-sm text-slate-900 transition-all focus:ring-2 focus:ring-primary/50 dark:bg-surface-dark dark:text-white"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>

      {/* Dynamic Topbar Menu */}
      {topbarMenu === 'visible' && (
        <nav className="ml-4 hidden flex-wrap items-center gap-1 xl:flex">
          {topbarLinks.map((link) => {
            const isActive = url.startsWith(link.href);
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>
      )}

      <div className="flex items-center gap-4">
        <button className="relative size-10 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-white/10"></div>
        <Link
          href={url.startsWith('/admin') ? '/admin/profile' : '/profile'}
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
        >
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-none font-bold text-slate-800 dark:text-white">{user?.name ?? 'User'}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
            <span className="material-symbols-outlined text-lg text-primary">person</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
