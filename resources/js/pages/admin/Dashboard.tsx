import { Head, Link } from '@inertiajs/react';
import Layout from './Layout';
import Header from '@/components/ui/Header';

interface DashboardProps {
  stats: {
    total_tenants: number;
    active_tenants: number;
    inactive_tenants: number;
    pending_requests: number;
    premium_tenants: number;
    basic_tenants: number;
  };
  recentTenants: {
    id: string;
    organization_name: string;
    organization_type: string;
    plan: string;
    status: string;
    domain: string | null;
    created_at: string;
  }[];
}

const statCards = [
  { key: 'total_tenants', label: 'Total Tenants', icon: 'domain', color: 'primary' },
  { key: 'active_tenants', label: 'Active Tenants', icon: 'check_circle', color: 'emerald' },
  { key: 'pending_requests', label: 'Pending Requests', icon: 'pending_actions', color: 'amber' },
  { key: 'premium_tenants', label: 'Premium Plans', icon: 'workspace_premium', color: 'violet' },
] as const;

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  primary: { bg: 'bg-primary/20', text: 'text-primary', badge: 'text-primary' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', badge: 'text-emerald-400' },
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', badge: 'text-amber-400' },
  violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', badge: 'text-violet-400' },
};

export default function Dashboard({ stats, recentTenants }: DashboardProps) {
  return (
    <Layout>
      <Head title="Admin Dashboard" />
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Header>Dashboard Overview</Header>
          <p className="mt-1 text-slate-400">Central administration panel for BukSU Attendance System</p>
        </div>
        <Link
          href="/admin/requests"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
        >
          <span className="material-symbols-outlined text-lg">pending_actions</span>
          Review Requests
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const colors = colorMap[card.color];
          return (
            <div key={card.key} className="rounded-2xl border border-white/5 bg-surface-dark p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex size-12 items-center justify-center rounded-lg ${colors.bg}`}>
                  <span className={`material-symbols-outlined ${colors.text}`}>{card.icon}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-400">{card.label}</p>
              <h3 className="mt-1 text-2xl font-black">{stats[card.key]}</h3>
            </div>
          );
        })}
      </div>

      {/* Plan Distribution + Quick Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6 lg:col-span-1">
          <h3 className="mb-6 text-lg font-bold">Plan Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">Basic</span>
                <span className="font-bold">{stats.basic_tenants}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-slate-400 transition-all"
                  style={{ width: stats.total_tenants > 0 ? `${(stats.basic_tenants / stats.total_tenants) * 100}%` : '0%' }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-violet-400">Premium</span>
                <span className="font-bold">{stats.premium_tenants}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{ width: stats.total_tenants > 0 ? `${(stats.premium_tenants / stats.total_tenants) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/20">
              <span className="material-symbols-outlined text-emerald-400">trending_up</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Active Rate</p>
              <p className="text-lg font-black">
                {stats.total_tenants > 0 ? Math.round((stats.active_tenants / stats.total_tenants) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Recent Tenants */}
        <div className="rounded-2xl border border-white/5 bg-surface-dark p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Organizations</h3>
            <Link href="/admin/tenants" className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover">
              View All →
            </Link>
          </div>
          {recentTenants.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">No organizations registered yet.</p>
          ) : (
            <div className="space-y-3">
              {recentTenants.map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-lg ${
                        tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-500'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">domain</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">{tenant.organization_name}</p>
                      <p className="text-xs text-slate-500">{tenant.domain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-lg px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                        tenant.plan === 'premium' ? 'bg-violet-500/10 text-violet-400' : 'bg-slate-700/50 text-slate-400'
                      }`}
                    >
                      {tenant.plan}
                    </span>
                    <span
                      className={`rounded-lg px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${
                        tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {tenant.status}
                    </span>
                    <span className="text-xs text-slate-500">{tenant.created_at}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
