export default function ActiveSessions() {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
        <h4 className="text-lg font-bold">Active Sessions</h4>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="group rounded-2xl border border-slate-200 bg-surface-light p-5 transition-all hover:ring-2 hover:ring-primary/30 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <span className="material-symbols-outlined">sensors</span>
            </div>
            <span className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-green-500 uppercase">Live</span>
          </div>
          <h5 className="mb-1 font-bold text-slate-900 dark:text-white">Morning Entry: Intramurals</h5>
          <p className="mb-4 text-xs text-slate-500">Admin: J. Dela Cruz • Gym Gate 1</p>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="size-7 rounded-full border-2 border-surface-dark bg-slate-300"></div>
              <div className="size-7 rounded-full border-2 border-surface-dark bg-slate-400"></div>
              <div className="flex size-7 items-center justify-center rounded-full border-2 border-surface-dark bg-slate-500 text-[8px] text-white">
                +42
              </div>
            </div>
            <span className="text-sm font-bold text-slate-400">842 Scanned</span>
          </div>
          <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-primary-hover">
            Jump to Session
          </button>
        </div>
        <div className="group rounded-2xl border border-slate-200 bg-surface-light p-5 transition-all hover:ring-2 hover:ring-primary/30 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-500">
              <span className="material-symbols-outlined">event_seat</span>
            </div>
            <span className="rounded-lg bg-green-500/10 px-2 py-1 text-[10px] font-bold tracking-wider text-green-500 uppercase">Live</span>
          </div>
          <h5 className="mb-1 font-bold text-slate-900 dark:text-white">Seminar Session 1</h5>
          <p className="mb-4 text-xs text-slate-500">Admin: M. Reyes • Main Hall</p>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="size-7 rounded-full border-2 border-surface-dark bg-slate-300"></div>
              <div className="size-7 rounded-full border-2 border-surface-dark bg-slate-400"></div>
            </div>
            <span className="text-sm font-bold text-slate-400">128 Scanned</span>
          </div>
          <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-primary-hover">
            Jump to Session
          </button>
        </div>
        <button className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 p-5 text-slate-400 transition-all hover:border-primary/50 hover:text-primary dark:border-white/10">
          <span className="material-symbols-outlined text-3xl">add_circle</span>
          <span className="text-sm font-bold">Start New Session</span>
        </button>
      </div>
    </section>
  );
}
