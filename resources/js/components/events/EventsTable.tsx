export default function EventsTable() {
  return (
    <>
      <TableFilter />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-background-dark/50">
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Date &amp; Time</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                      <span className="material-symbols-outlined">sports_soccer</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">University Intramurals 2024</span>
                      <span className="text-[10px] text-slate-400">ID: EVT-2024-001</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">Oct 24-27, 2024</div>
                    <div className="text-xs text-slate-500">08:00 AM - 05:00 PM</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Main Campus Gym</td>
                <td className="px-6 py-4">
                  <span className="status-badge border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">Live</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="View Attendance">
                      <span className="material-symbols-outlined text-lg">group</span>
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="Edit Event">
                      <span className="material-symbols-outlined text-lg">edit_square</span>
                    </button>
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover">
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">General Assembly</span>
                      <span className="text-[10px] text-slate-400">ID: EVT-2024-002</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">Nov 05, 2024</div>
                    <div className="text-xs text-slate-500">01:00 PM - 04:00 PM</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">BukSU Auditorium</td>
                <td className="px-6 py-4">
                  <span className="status-badge border border-blue-500/20 bg-blue-500/10 text-blue-500">Upcoming</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="View Attendance">
                      <span className="material-symbols-outlined text-lg">group</span>
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="Edit Event">
                      <span className="material-symbols-outlined text-lg">edit_square</span>
                    </button>
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover">
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">Leadership Training</span>
                      <span className="text-[10px] text-slate-400">ID: EVT-2024-003</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">Nov 12, 2024</div>
                    <div className="text-xs text-slate-500">09:00 AM - 03:00 PM</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Conference Hall B</td>
                <td className="px-6 py-4">
                  <span className="status-badge border border-blue-500/20 bg-blue-500/10 text-blue-500">Upcoming</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="View Attendance">
                      <span className="material-symbols-outlined text-lg">group</span>
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="Edit Event">
                      <span className="material-symbols-outlined text-lg">edit_square</span>
                    </button>
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-primary-hover">
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="opacity-75 transition-colors hover:bg-slate-50 dark:hover:bg-white/2">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-slate-500/10 text-slate-500">
                      <span className="material-symbols-outlined">campaign</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">Org Orientation</span>
                      <span className="text-[10px] text-slate-400">ID: EVT-2024-004</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">Oct 10, 2024</div>
                    <div className="text-xs text-slate-500">10:00 AM - 12:00 PM</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Activity Center</td>
                <td className="px-6 py-4">
                  <span className="status-badge border border-slate-500/20 bg-slate-500/10 text-slate-500">Completed</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="View Attendance">
                      <span className="material-symbols-outlined text-lg">assessment</span>
                    </button>
                    <button className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary" title="Edit Event">
                      <span className="material-symbols-outlined text-lg">edit_square</span>
                    </button>
                    <button className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                      Report
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 p-6 dark:border-white/5">
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Showing 1-4 of 57 Events</span>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:border-white/5 dark:hover:bg-white/5">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="rounded-lg border border-primary bg-primary p-2 text-white transition-colors">
              <span className="px-1 text-xs font-bold">1</span>
            </button>
            <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:border-white/5 dark:hover:bg-white/5">
              <span className="px-1 text-xs font-bold">2</span>
            </button>
            <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:border-white/5 dark:hover:bg-white/5">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function TableFilter() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-surface-light p-4 md:flex-row dark:border-white/5 dark:bg-surface-dark">
      <div className="flex w-full flex-wrap items-center gap-4 md:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Show:</span>
          <select className="rounded-lg border-none bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-900 focus:ring-0 dark:bg-background-dark dark:text-slate-300">
            <option>All Events</option>
            <option>Upcoming</option>
            <option>Live</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Sort by:</span>
          <select className="rounded-lg border-none bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-900 focus:ring-0 dark:bg-background-dark dark:text-slate-300">
            <option>Latest Date</option>
            <option>Name A-Z</option>
            <option>Status</option>
          </select>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 md:w-auto">
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          More Filters
        </button>
      </div>
    </div>
  );
}
