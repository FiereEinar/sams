export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-background-light dark:border-white/10 dark:bg-background-dark">
      <div className="flex items-center gap-3 p-6">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined font-bold">account_balance</span>
        </div>
        <div>
          <h1 className="text-lg leading-none font-bold">SSG Admin</h1>
          <p className="text-xs text-slate-500 dark:text-primary/70">Supreme Student Gov.</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        <a className="active-nav flex items-center gap-3 rounded-xl px-3 py-2.5" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-sm font-medium">Events</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">how_to_reg</span>
          <span className="text-sm font-medium">Attendance</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="text-sm font-medium">Masterlist</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">assessment</span>
          <span className="text-sm font-medium">Analytics</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </a>
      </nav>
      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
            <span className="text-xs font-bold tracking-wider text-primary uppercase">Premium Organization</span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Advanced analytics and multi-tenant reporting enabled.</p>
          <button className="w-full rounded-lg bg-primary py-2 text-xs font-bold text-white transition-all hover:bg-primary-hover">
            MANAGE PLAN
          </button>
        </div>
      </div>
    </aside>
  );
}
