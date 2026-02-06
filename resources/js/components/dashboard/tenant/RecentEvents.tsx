export default function RecentEvents() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
      <h4 className="mb-6 text-lg font-bold">Recent Events</h4>
      <div className="flex-1 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-primary/10 font-bold text-primary dark:bg-background-dark">
            <span className="text-[10px] leading-none opacity-70">OCT</span>
            <span className="text-lg leading-none">24</span>
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold">University Intramurals 2024</h5>
            <p className="text-xs text-slate-500">Main Campus Gymnasium</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-background-dark">
                <div className="h-full w-4/5 bg-primary"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">82%</span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-primary/10 font-bold text-primary dark:bg-background-dark">
            <span className="text-[10px] leading-none opacity-70">OCT</span>
            <span className="text-lg leading-none">21</span>
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold">Student General Assembly</h5>
            <p className="text-xs text-slate-500">BukSU Auditorium</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-background-dark">
                <div className="h-full w-[95%] bg-primary"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">95%</span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 opacity-60">
          <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-400 dark:bg-background-dark">
            <span className="text-[10px] leading-none opacity-70">OCT</span>
            <span className="text-lg leading-none">15</span>
          </div>
          <div className="flex-1">
            <h5 className="text-sm font-bold">Leadership Training Seminar</h5>
            <p className="text-xs text-slate-500">Conference Room A</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-background-dark">
                <div className="h-full w-full bg-slate-400"></div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">100%</span>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-6 w-full rounded-xl bg-primary/10 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/20">
        View All Events
      </button>
    </div>
  );
}
