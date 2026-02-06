export default function TopCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/20">
            <span className="material-symbols-outlined text-primary">person_check</span>
          </div>
          <span className="text-xs font-bold text-blue-500">+12.4%</span>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Attendance Today</p>
        <h3 className="mt-1 text-2xl font-black">1,248</h3>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-lg bg-cyan-500/20">
            <span className="material-symbols-outlined text-cyan-500">event_available</span>
          </div>
          <span className="text-xs font-bold text-cyan-500">Active</span>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Ongoing Events</p>
        <h3 className="mt-1 text-2xl font-black">3</h3>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-lg bg-indigo-500/20">
            <span className="material-symbols-outlined text-indigo-500">monitoring</span>
          </div>
          <span className="text-xs font-bold text-blue-500">+5.2%</span>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Engagement Rate</p>
        <h3 className="mt-1 text-2xl font-black">88.5%</h3>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-lg bg-sky-500/20">
            <span className="material-symbols-outlined text-sky-500">group_add</span>
          </div>
          <span className="text-xs font-bold text-slate-400">Stable</span>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Members</p>
        <h3 className="mt-1 text-2xl font-black">4,203</h3>
      </div>
    </div>
  );
}
