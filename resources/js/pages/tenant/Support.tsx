import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Layout from './Layout';
import Header from '@/components/ui/Header';

type SupportMessage = {
  id: number;
  sender_type: 'tenant' | 'admin';
  sender_name: string;
  body: string;
  created_at: string;
};

type Ticket = {
  id: number;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  user: { name: string };
  latest_message: SupportMessage | null;
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

export default function Support({ tickets }: PageProps) {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];
  const canCreate = userPermissions.includes('SUPPORT_CREATE');

  const [showCreate, setShowCreate] = useState(false);

  return (
    <Layout>
      <Head title="Support" />

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Header>Support</Header>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Submit and track your support requests.
            </p>
          </div>
          {canCreate && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              New Ticket
            </button>
          )}
        </div>

        {tickets.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-surface-dark">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">No Tickets Yet</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Create a support ticket to get help from the admin team.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const status = statusConfig[ticket.status] || statusConfig.open;

              return (
                <Link
                  key={ticket.id}
                  href={`/support/${ticket.id}`}
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
                    {ticket.latest_message && (
                      <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                        {ticket.latest_message.sender_name}: {ticket.latest_message.body}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-400">
                      Created {new Date(ticket.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
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

      {showCreate && <CreateTicketModal onClose={() => setShowCreate(false)} />}
    </Layout>
  );
}

function CreateTicketModal({ onClose }: { onClose: () => void }) {
  const form = useForm({ subject: '', body: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post('/support', { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-surface-dark animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">New Support Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
            <input
              type="text"
              value={form.data.subject}
              onChange={(e) => form.setData('subject', e.target.value)}
              placeholder="Briefly describe your issue"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            {form.errors.subject && <p className="mt-1 text-xs text-red-500">{form.errors.subject}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
            <textarea
              value={form.data.body}
              onChange={(e) => form.setData('body', e.target.value)}
              rows={5}
              placeholder="Describe your issue in detail..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            {form.errors.body && <p className="mt-1 text-xs text-red-500">{form.errors.body}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={form.processing}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:opacity-50"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
