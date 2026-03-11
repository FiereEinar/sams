import { Event } from '@/types/event';
import Layout from './Layout';
import Header from '@/components/ui/Header';

type EventDetailsProps = {
  event: Event;
};

export default function EventDetails({ event }: EventDetailsProps) {
  console.log(event);
  return (
    <Layout>
      <div className="font-display min-h-screen bg-(--deep-navy) text-slate-300">
        <div className="layout-container flex min-h-screen flex-col">
          <main className="mx-auto w-full max-w-7xl flex-1">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-(--vibrant-azure)">
                  <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
                  <span className="text-sm tracking-widest uppercase">Live Recording</span>
                </div>
                <Header>{event.title}</Header>
                <p className="flex items-center gap-2 text-lg text-slate-400">
                  <span className="material-symbols-outlined text-(--vibrant-azure)">location_on</span>
                  {event.venue}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-surface-light px-6 text-sm font-bold text-slate-300 transition-all hover:bg-slate-800 dark:border-white/5 dark:bg-surface-dark">
                  <span className="material-symbols-outlined mr-2">pause_circle</span>
                  Pause
                </button>
                <button className="flex h-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-600/20 px-6 text-sm font-bold text-red-500 transition-all hover:bg-red-600 hover:text-white">
                  <span className="material-symbols-outlined mr-2">stop_circle</span>
                  End Session
                </button>
              </div>
            </div>
            <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-(--dark-surface) p-6 lg:col-span-2 dark:border-white/5 dark:bg-surface-dark">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <span className="material-symbols-outlined text-(--vibrant-azure)">person_search</span>
                  Manual Entry
                </h3>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">search</span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-surface-light py-4 pr-4 pl-12 text-lg text-white transition-all placeholder:text-slate-500 focus:border-transparent focus:ring-2 focus:ring-(--vibrant-azure) dark:border-white/5 dark:bg-surface-dark"
                      placeholder="Enter Student Name or ID Number"
                      type="text"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-(--vibrant-azure) px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110">
                    <span className="material-symbols-outlined">how_to_reg</span>
                    Check In
                  </button>
                </div>
              </div>
              <div className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-surface-light p-6 text-center transition-all hover:border-(--vibrant-azure) dark:border-white/5 dark:bg-surface-dark">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-(--vibrant-azure) text-white shadow-xl shadow-blue-900/20 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl">barcode_scanner</span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-white">Scan Barcode</h3>
                <p className="text-sm text-slate-400">Use external scanner or camera</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-surface-light px-6 py-5 dark:border-white/5 dark:bg-surface-dark">
                <h3 className="text-xl font-bold text-white">Recent Check-ins</h3>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 rounded-full border border-blue-800/50 bg-blue-900/30 px-3 py-1 text-xs font-bold tracking-wider text-(--vibrant-azure) uppercase">
                    <span className="size-2 animate-pulse rounded-full bg-(--vibrant-azure)"></span>
                    Live Updates
                  </span>
                  <span className="text-sm font-semibold text-slate-400">
                    Total: <span className="text-(--vibrant-azure)">1,248</span>
                    <span className="text-slate-600">/ 3,500</span>
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-sm tracking-wider text-slate-400 uppercase">
                      <th className="border-b border-slate-200 bg-surface-light px-6 py-4 font-bold dark:border-white/5 dark:bg-surface-dark">
                        Student Name
                      </th>
                      <th className="border-b border-slate-200 bg-surface-light px-6 py-4 font-bold dark:border-white/5 dark:bg-surface-dark">
                        Student ID
                      </th>
                      <th className="border-b border-slate-200 bg-surface-light px-6 py-4 font-bold dark:border-white/5 dark:bg-surface-dark">
                        Department
                      </th>
                      <th className="border-b border-slate-200 bg-surface-light px-6 py-4 font-bold dark:border-white/5 dark:bg-surface-dark">
                        Time In
                      </th>
                      <th className="border-b border-slate-200 bg-surface-light px-6 py-4 text-right font-bold dark:border-white/5 dark:bg-surface-dark">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-surface-light dark:divide-white/5 dark:bg-surface-dark">
                    <tr className="transition-colors hover:bg-blue-900/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-surface-light font-bold text-(--vibrant-azure) dark:border-white/5 dark:bg-surface-dark">
                            JD
                          </div>
                          <span className="font-semibold text-white">John Doe</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-400">2021-00124</td>
                      <td className="px-6 py-4 text-slate-500">College of Arts &amp; Sciences</td>
                      <td className="px-6 py-4 font-medium text-slate-400">02:45:12 PM</td>
                      <td className="px-6 py-4 text-right">
                        <span className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-bold text-green-400">
                          Verified
                        </span>
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-blue-900/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-surface-light font-bold text-(--vibrant-azure) dark:border-white/5 dark:bg-surface-dark">
                            MS
                          </div>
                          <span className="font-semibold text-white">Maria Santos</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-400">2022-04592</td>
                      <td className="px-6 py-4 text-slate-500">College of Education</td>
                      <td className="px-6 py-4 font-medium text-slate-400">02:44:58 PM</td>
                      <td className="px-6 py-4 text-right">
                        <span className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-bold text-green-400">
                          Verified
                        </span>
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-blue-900/5">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-surface-light font-bold text-(--vibrant-azure) dark:border-white/5 dark:bg-surface-dark">
                            RL
                          </div>
                          <span className="font-semibold text-white">Robert Lim</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-400">2020-00931</td>
                      <td className="px-6 py-4 text-slate-500">College of Nursing</td>
                      <td className="px-6 py-4 font-medium text-slate-400">02:44:30 PM</td>
                      <td className="px-6 py-4 text-right">
                        <span className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-bold text-green-400">
                          Verified
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-200 bg-surface-light p-4 text-center dark:border-white/5 dark:bg-surface-dark">
                <button className="mx-auto flex items-center justify-center gap-1 text-sm font-bold text-(--vibrant-azure) transition-all hover:brightness-125">
                  View All Attendance Logs
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </main>
          <footer className="mt-10 border-t border-slate-200 bg-surface-light px-6 py-8 md:px-20 dark:border-white/5 dark:bg-surface-dark">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined fill-1 text-green-500">check_circle</span>
                <span className="font-medium text-slate-400">System Online</span>
                <span className="text-slate-700">•</span>
                <span>Latency: 24ms</span>
              </div>
              <div className="font-medium">© 2024 BukSU Student Organizations Attendance System</div>
              <div className="flex gap-6">
                <a className="font-medium transition-colors hover:text-(--vibrant-azure)" href="#">
                  Support
                </a>
                <a className="font-medium transition-colors hover:text-(--vibrant-azure)" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
