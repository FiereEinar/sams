import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Layout({ children }: PropsWithChildren) {
  const { url } = usePage();

  const navItems = [
    { label: 'Requests', href: '/admin/requests', icon: 'pending_actions' },
    { label: 'Tenants', href: '/admin/tenants', icon: 'domain' },
  ];

  return (
    <div className="flex min-h-screen bg-background-dark text-white">
      <aside className="flex w-72 flex-col border-r border-white/5 bg-surface-dark/50">
        <div className="flex items-center gap-3 p-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined font-bold">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="text-lg leading-none font-bold">Admin</h1>
            <p className="text-[10px] font-semibold tracking-wider text-primary/70 uppercase">Central Panel</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-4">
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
        <div className="mt-auto pt-6">
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
        <div className="space-y-8 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
