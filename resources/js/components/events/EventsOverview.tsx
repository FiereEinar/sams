export default function EventsOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-14 items-center justify-center rounded-lg bg-blue-500/20">
            <span className="material-symbols-outlined text-blue-500">upcoming</span>
          </div>
        </div>
        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">Upcoming Events</p>
        <h3 className="mt-1 text-3xl font-black">12</h3>
        <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
          <span className="material-symbols-outlined text-8xl">calendar_month</span>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-14 items-center justify-center rounded-lg bg-emerald-500/20">
            <span className="material-symbols-outlined text-emerald-500">sensors</span>
          </div>
          <span className="flex animate-pulse items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span> LIVE NOW
          </span>
        </div>
        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">Active Events</p>
        <h3 className="mt-1 text-3xl font-black">2</h3>
        <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
          <span className="material-symbols-outlined text-8xl">bolt</span>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-14 items-center justify-center rounded-lg bg-slate-500/20">
            <span className="material-symbols-outlined text-slate-500">task_alt</span>
          </div>
        </div>
        <p className="text-sm font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">Completed (This Sem)</p>
        <h3 className="mt-1 text-3xl font-black">45</h3>
        <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity group-hover:opacity-10">
          <span className="material-symbols-outlined text-8xl">history</span>
        </div>
      </div>
    </div>
  );
}
