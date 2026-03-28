import Header from '@/components/ui/Header';
import Layout from './Layout';
import { Link } from '@inertiajs/react';
import { AttendanceRecord, EventSession } from '@/types/event';

type AttendanceProps = {
  activeSessions: (EventSession & { event?: { id: number; title: string; venue: string }; attendance_records_count: number })[];
  recentRecords: (AttendanceRecord & { session?: { id: number; name: string; event?: { id: number; title: string } } })[];
  totalRecords: number;
  totalSessions: number;
};

export default function Attendance({ activeSessions, recentRecords, totalRecords, totalSessions }: AttendanceProps) {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Attendance Overview</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Monitor participation and manage active scanning sessions.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
          <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase">Total Records</p>
          <h3 className="text-2xl font-black">{totalRecords.toLocaleString()}</h3>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
          <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase">Total Sessions</p>
          <h3 className="text-2xl font-black">{totalSessions}</h3>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
          <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase">Active Now</p>
          <h3 className="text-2xl font-black text-green-400">{activeSessions.length}</h3>
        </div>
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
          <p className="mb-1 text-xs font-bold tracking-widest text-slate-500 uppercase">Today's Records</p>
          <h3 className="text-2xl font-black text-primary">
            {recentRecords.filter((r) => new Date(r.recorded_at).toDateString() === new Date().toDateString()).length}
          </h3>
        </div>
      </div>

      {/* Active Sessions */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
          <h4 className="text-lg font-bold">Active Sessions</h4>
        </div>
        {activeSessions.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
            No active sessions. Start a session from an event's detail page.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="group rounded-2xl border border-white/5 bg-surface-dark p-5 transition-all hover:ring-2 hover:ring-primary/30">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">sensors</span>
                  </div>
                  <span className={`rounded-lg px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${session.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {session.status === 'active' ? 'Live' : 'Paused'}
                  </span>
                </div>
                <h5 className="mb-1 font-bold text-white">{session.name}</h5>
                <p className="mb-4 text-xs text-slate-500">{session.event?.title} • {session.event?.venue}</p>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400">{session.attendance_records_count} Scanned</span>
                </div>
                <Link
                  href={`/events/${session.event_id}`}
                  className="block w-full rounded-xl bg-primary py-2.5 text-center text-sm font-bold text-white transition-colors group-hover:bg-primary-hover"
                >
                  Jump to Session
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Attendance History */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-surface-dark">
        <div className="flex items-center justify-between border-b border-white/5 p-6">
          <div>
            <h4 className="text-lg font-bold">Recent Attendance</h4>
            <p className="text-xs text-slate-500">Latest attendance records across all events.</p>
          </div>
        </div>
        {recentRecords.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">No attendance records yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-dark/50 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Event / Session</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRecords.map((record) => {
                  const initials = record.student
                    ? `${record.student.first_name[0]}${record.student.last_name[0]}`
                    : '??';

                  return (
                    <tr key={record.id} className="transition-colors hover:bg-white/2">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${record.student ? 'bg-primary/10 text-primary' : 'bg-slate-700 text-slate-400'}`}>
                            {initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold">
                              {record.student ? `${record.student.last_name}, ${record.student.first_name}` : 'Unknown'}
                            </p>
                            <p className="text-[10px] tracking-tight text-slate-500 uppercase">ID: {record.student_id_input}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{record.session?.event?.title}</p>
                        <p className="text-[10px] text-slate-400">{record.session?.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{new Date(record.recorded_at).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-500">{new Date(record.recorded_at).toLocaleTimeString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${record.method === 'barcode' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {record.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold ${record.student ? 'border-green-500/20 bg-green-500/10 text-green-400' : 'border-amber-500/20 bg-amber-500/10 text-amber-400'}`}>
                          {record.student ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
