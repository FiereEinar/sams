export default function AttendanceOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Average Attendance</p>
        <h3 className="text-2xl font-black">76.4%</h3>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-background-dark">
          <div className="h-full w-[76%] bg-primary"></div>
        </div>
        <p className="mt-2 text-[10px] font-medium text-slate-400">Semester Performance</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Total Participation</p>
        <h3 className="text-2xl font-black">12,402</h3>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-500">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span>+2.4% vs last sem</span>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Top Event Rate</p>
        <h3 className="text-2xl font-black">94.2%</h3>
        <p className="mt-2 text-[10px] font-bold text-primary">General Assembly (Oct)</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
        <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">Scanning Uptime</p>
        <h3 className="text-2xl font-black">99.9%</h3>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-primary">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>Systems Operational</span>
        </div>
      </div>
    </div>
  );
}
