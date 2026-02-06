import Layout from './Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Dashboard Overview</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-400">BukSU Student Attendance Management System</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 font-bold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-surface-dark dark:text-white dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-lg">upload_file</span>
            <span>Import Masterlist</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Create Event</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-primary/20 p-2">
              <span className="material-symbols-outlined text-primary">person_check</span>
            </div>
            <span className="text-xs font-bold text-blue-500">+12.4%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Attendance Today</p>
          <h3 className="mt-1 text-2xl font-black">1,248</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-cyan-500/20 p-2">
              <span className="material-symbols-outlined text-cyan-500">event_available</span>
            </div>
            <span className="text-xs font-bold text-cyan-500">Active</span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Ongoing Events</p>
          <h3 className="mt-1 text-2xl font-black">3</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-indigo-500/20 p-2">
              <span className="material-symbols-outlined text-indigo-500">monitoring</span>
            </div>
            <span className="text-xs font-bold text-blue-500">+5.2%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Engagement Rate</p>
          <h3 className="mt-1 text-2xl font-black">88.5%</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-lg bg-sky-500/20 p-2">
              <span className="material-symbols-outlined text-sky-500">group_add</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Stable</span>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Members</p>
          <h3 className="mt-1 text-2xl font-black">4,203</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 lg:col-span-2 dark:border-white/5 dark:bg-surface-dark">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold">Engagement Trends</h4>
              <p className="text-sm text-slate-500">Student participation over the last 7 days</p>
            </div>
            <select className="rounded-lg border-none bg-slate-100 py-1.5 text-xs font-bold text-slate-900 focus:ring-0 dark:bg-background-dark dark:text-slate-300">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="relative mt-4 h-60 w-full">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"></stop>
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,120 Q50,110 80,70 T160,40 T240,90 T320,30 T400,50 L400,150 L0,150 Z" fill="url(#gradient)"></path>
              <path
                d="M0,120 Q50,110 80,70 T160,40 T240,90 T320,30 T400,50"
                fill="none"
                stroke="#3b82f6"
                stroke-linecap="round"
                stroke-width="3"
              ></path>
              <line stroke="currentColor" stroke-opacity="0.05" x1="0" x2="0" y1="0" y2="150"></line>
              <line stroke="currentColor" stroke-opacity="0.05" x1="80" x2="80" y1="0" y2="150"></line>
              <line stroke="currentColor" stroke-opacity="0.05" x1="160" x2="160" y1="0" y2="150"></line>
              <line stroke="currentColor" stroke-opacity="0.05" x1="240" x2="240" y1="0" y2="150"></line>
              <line stroke="currentColor" stroke-opacity="0.05" x1="320" x2="320" y1="0" y2="150"></line>
              <line stroke="currentColor" stroke-opacity="0.05" x1="400" x2="400" y1="0" y2="150"></line>
            </svg>
            <div className="mt-4 flex justify-between px-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
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
      </div>
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
    </Layout>
  );
}
