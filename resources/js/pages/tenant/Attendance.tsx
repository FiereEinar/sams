import Header from '@/components/ui/Header';
import Layout from './Layout';
import AttendanceHistory from '@/components/attendance/AttendanceHistory';
import ActiveSessions from '@/components/attendance/ActiveSessions';
import AttendanceOverview from '@/components/attendance/AttendanceOverview';

export default function Attendance() {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Attendance Overview</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">Monitor participation and manage active scanning sessions.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 font-bold text-slate-900 transition-colors hover:bg-slate-300 dark:bg-surface-dark dark:text-white dark:hover:bg-white/10">
            <span className="material-symbols-outlined text-lg">history</span>
            <span>Full Logs</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover">
            <span className="material-symbols-outlined text-lg">qr_code_scanner</span>
            <span>Launch Scanner</span>
          </button>
        </div>
      </div>

      <AttendanceOverview />
      <ActiveSessions />
      <AttendanceHistory />
    </Layout>
  );
}
