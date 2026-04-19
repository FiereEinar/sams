import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Layout from './Layout';
import Header from '@/components/ui/Header';

type Ticket = {
  id: number;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  user_name: string;
  latest_message: string | null;
  latest_message_at: string | null;
  tenant_id: string;
  tenant_name: string;
  created_at: string;
  updated_at: string;
};

type PageProps = {
  tickets: Ticket[];
};

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  open: { label: 'Open', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', icon: 'radio_button_checked' },
  in_progress: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', icon: 'pending' },
  resolved: { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: 'check_circle' },
  closed: { label: 'Closed', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400', icon: 'cancel' },
};

const statusFilters = ['all', 'open', 'in_progress', 'resolved', 'closed'] as const;

export default function Support({ tickets }: PageProps) {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);

  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    in_progress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  };

  return (
    <Layout>
      <Head title="Support Tickets" />

      <div className="space-y-6">
        <div>
          <Header>Support Tickets</Header>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage support requests from all tenants.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((s) => {
            const label = s === 'all' ? 'All' : (statusConfig[s]?.label || s);
            const isActive = filter === s;

            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-surface-dark dark:text-slate-400 dark:hover:bg-white/5'
                } border border-slate-200 dark:border-white/10`}
              >
                {label}
                <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/10'}`}>
                  {counts[s as keyof typeof counts]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tickets */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-surface-dark">
            <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5">
              <span className="material-symbols-outlined text-3xl text-slate-400">support_agent</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">No Tickets Found</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {filter === 'all' ? 'No support tickets have been submitted yet.' : `No tickets with status "${statusConfig[filter]?.label || filter}".`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ticket) => {
              const status = statusConfig[ticket.status] || statusConfig.open;

              return (
                <Link
                  key={`${ticket.tenant_id}-${ticket.id}`}
                  href={`/admin/support/${ticket.tenant_id}/${ticket.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg dark:border-white/10 dark:bg-surface-dark"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <span className="material-symbols-outlined text-xl text-primary">confirmation_number</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="truncate font-semibold text-slate-800 dark:text-white">{ticket.subject}</h3>
                      <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${status.color}`}>
                        <span className="material-symbols-outlined text-xs">{status.icon}</span>
                        {status.label}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold dark:bg-white/10">
                        {ticket.tenant_name}
                      </span>
                      <span>·</span>
                      <span>{ticket.user_name}</span>
                      <span>·</span>
                      <span>{new Date(ticket.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    {ticket.latest_message && (
                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{ticket.latest_message}</p>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-slate-300 transition-colors group-hover:text-primary dark:text-slate-600">
                    chevron_right
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
