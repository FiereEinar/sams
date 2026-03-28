import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/hooks/use-theme';

type TopbarProps = {
  placeholder?: string;
  role?: string;
};

export default function Topbar({ placeholder = 'Search...', role = 'Admin' }: TopbarProps) {
  const { props } = usePage();
  const user = (props as any).auth?.user;
  const { toggleSidebar, isSidebarCollapsed } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-background-light px-8 dark:border-white/10 dark:bg-background-dark">
      <div className="flex flex-1 items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="flex size-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          title={isSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
        >
          <span className="material-symbols-outlined text-xl">{isSidebarCollapsed ? 'menu' : 'menu_open'}</span>
        </button>
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">search</span>
          <input
            className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 text-sm text-slate-900 transition-all focus:ring-2 focus:ring-primary/50 dark:bg-surface-dark dark:text-white"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-white/10"></div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-none font-bold text-slate-800 dark:text-white">{user?.name ?? 'User'}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
            <span className="material-symbols-outlined text-lg text-primary">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
