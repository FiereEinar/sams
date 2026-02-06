export default function RecentSignIns() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
      <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-white/5">
        <h4 className="text-lg font-bold">Recent Sign-ins</h4>
        <button className="text-xs font-bold tracking-wider text-primary uppercase hover:text-primary-hover">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-background-dark/50">
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4">Event</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">JD</div>
                  <span className="text-sm font-medium">Juan Dela Cruz</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">2101104523</td>
              <td className="px-6 py-4 text-sm">University Intramurals</td>
              <td className="px-6 py-4 text-sm text-slate-500">Today, 09:42 AM</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase">Verified</span>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">MR</div>
                  <span className="text-sm font-medium">Maria Clara Reyes</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">2201405612</td>
              <td className="px-6 py-4 text-sm">University Intramurals</td>
              <td className="px-6 py-4 text-sm text-slate-500">Today, 09:38 AM</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-500 uppercase">Verified</span>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold dark:bg-surface-dark">
                    AS
                  </div>
                  <span className="text-sm font-medium">Antonio Santos</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">2101104599</td>
              <td className="px-6 py-4 text-sm">University Intramurals</td>
              <td className="px-6 py-4 text-sm text-slate-500">Today, 09:35 AM</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-sky-500/10 px-2.5 py-1 text-[10px] font-bold text-sky-500 uppercase">Manual Entry</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
