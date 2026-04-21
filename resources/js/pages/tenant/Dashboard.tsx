import EngagementTrends from '@/components/dashboard/tenant/EngagementTrends';
import Layout from './Layout';
import RecentEvents from '@/components/dashboard/tenant/RecentEvents';
import RecentSignIns from '@/components/dashboard/tenant/RecentSignIns';
import TopCards from '../../components/dashboard/tenant/TopCards';
import ShortcutButtons from '@/components/dashboard/tenant/ShortcutButtons';
import Header from '@/components/ui/Header';

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Dashboard</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">BukSU Student Attendance Management System</p>
        </div>
        <ShortcutButtons />
      </div>
      <TopCards />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <EngagementTrends />
        <RecentEvents />
      </div>
      <RecentSignIns />
    </Layout>
  );
}
