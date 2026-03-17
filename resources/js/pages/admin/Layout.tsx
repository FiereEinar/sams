import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Layout({ children }: PropsWithChildren) {
  const { url, props } = usePage();
  const user = (props as any).auth?.user;

  const navItems = [
    { label: 'Requests', href: '/admin/requests', icon: 'pending_actions' },
    { label: 'Tenants', href: '/admin/tenants', icon: 'domain' },
  ];

  return (
    <div className="flex h-screen bg-background-dark text-white">
      <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-surface-dark/50">
        <div className="flex items-center gap-3 p-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined font-bold">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="text-lg leading-none font-bold">Admin</h1>
            <p className="text-[10px] font-semibold tracking-wider text-primary/70 uppercase">Central Panel</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = url.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pb-6">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Log Out
          </Link>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-background-dark px-8">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">search</span>
              <input
                className="w-full rounded-xl border-none bg-surface-dark py-2 pl-10 text-sm text-white transition-all focus:ring-2 focus:ring-primary/50"
                placeholder="Search tenants, requests..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-white/5">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="mx-2 h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm leading-none font-bold">{user?.name ?? 'Admin'}</p>
                <p className="text-xs text-slate-500">Central Admin</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                <span className="material-symbols-outlined text-lg text-primary">person</span>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 space-y-8 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
