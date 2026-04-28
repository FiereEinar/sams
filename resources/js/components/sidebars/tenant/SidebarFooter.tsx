import { usePage, Link } from '@inertiajs/react';

export default function SidebarFooter() {
  const { tenantPlan } = usePage<{ tenantPlan?: 'basic' | 'premium' }>().props;
  const isPremium = tenantPlan === 'premium';

  return (
    <div className="mt-auto p-4">
      {isPremium ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
            <span className="text-xs font-bold tracking-wider text-primary uppercase">Premium Organization</span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Advanced analytics and multi-tenant reporting enabled.</p>
          <Link href="/plans" className="block w-full rounded-lg bg-primary py-2 text-center text-xs font-bold text-white transition-all hover:bg-primary-hover">MANAGE PLAN</Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <div className="mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">business</span>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">Basic Organization</span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Standard features with limited masterlist imports.</p>
          <Link href="/plans" className="block w-full rounded-lg bg-slate-200 py-2 text-center text-xs font-bold text-slate-700 transition-all hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">UPGRADE TO PREMIUM</Link>
        </div>
      )}
    </div>
  );
}

