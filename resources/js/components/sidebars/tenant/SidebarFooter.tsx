export default function SidebarFooter() {
  return (
    <div className="mt-auto p-4">
      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Premium Organization</span>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Advanced analytics and multi-tenant reporting enabled.</p>
        <button className="w-full rounded-lg bg-primary py-2 text-xs font-bold text-white transition-all hover:bg-primary-hover">MANAGE PLAN</button>
      </div>
    </div>
  );
}
