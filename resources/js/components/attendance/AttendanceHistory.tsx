export default function AttendanceHistory() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center dark:border-white/5">
        <div>
          <h4 className="text-lg font-bold">Attendance History</h4>
          <p className="text-xs text-slate-500">Complete record of past attendance activities.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-background-dark">
            <button className="rounded-lg bg-white px-4 py-1.5 text-xs font-bold shadow-sm dark:bg-surface-dark">All Time</button>
            <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">This Month</button>
          </div>
          <select className="rounded-xl border-none bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 focus:ring-0 dark:bg-background-dark dark:text-slate-300">
            <option>All Events</option>
            <option>Intramurals</option>
            <option>General Assembly</option>
          </select>
          <button className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary/20">
            <span className="material-symbols-outlined text-sm">download</span>
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-background-dark/50">
              <th className="px-6 py-4">Student Info</th>
              <th className="px-6 py-4">Activity Name</th>
              <th className="px-6 py-4">Logged At</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">JD</div>
                  <div>
                    <p className="text-sm font-bold">Juan Dela Cruz</p>
                    <p className="text-[10px] tracking-tight text-slate-500 uppercase">ID: 2101104523</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium">Intramurals Day 2</p>
                <p className="text-[10px] text-slate-400">Gymnasium Entry</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">Oct 24, 2024</p>
                <p className="text-[10px] text-slate-500">09:42:15 AM</p>
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase">QR Scan</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-500">MR</div>
                  <div>
                    <p className="text-sm font-bold">Maria Clara Reyes</p>
                    <p className="text-[10px] tracking-tight text-slate-500 uppercase">ID: 2201405612</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium">Intramurals Day 2</p>
                <p className="text-[10px] text-slate-400">Gymnasium Entry</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">Oct 24, 2024</p>
                <p className="text-[10px] text-slate-500">09:38:02 AM</p>
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase">QR Scan</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 dark:bg-white/5">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-bold">Antonio Santos</p>
                    <p className="text-[10px] tracking-tight text-slate-500 uppercase">ID: 2101104599</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium">Leadership Training</p>
                <p className="text-[10px] text-slate-400">Conf Room A</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm">Oct 15, 2024</p>
                <p className="text-[10px] text-slate-500">02:15:33 PM</p>
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold text-amber-500 uppercase">Manual</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-white/5">
        <span className="text-xs font-medium text-slate-500">Showing 1-10 of 2,402 entries</span>
        <div className="flex gap-2">
          <button className="cursor-not-allowed rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-400 dark:bg-white/5">Prev</button>
          <button className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white">1</button>
          <button className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold transition-colors hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10">
            2
          </button>
          <button className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold transition-colors hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
