import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from './Layout';

type Message = {
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
  user_name: string;
  tenant_id: string;
  tenant_name: string;
  created_at: string;
  messages: Message[];
};

type Tenant = {
  id: string;
  organization_name: string;
};

type PageProps = {
  ticket: Ticket;
  tenant: Tenant;
};

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  open: { label: 'Open', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', icon: 'radio_button_checked' },
  in_progress: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', icon: 'pending' },
  resolved: { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: 'check_circle' },
  closed: { label: 'Closed', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400', icon: 'cancel' },
};

const statusOptions = ['open', 'in_progress', 'resolved', 'closed'] as const;

export default function SupportThread({ ticket, tenant }: PageProps) {
  const form = useForm({ body: '' });
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const status = statusConfig[ticket.status] || statusConfig.open;

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(`/admin/support/${tenant.id}/${ticket.id}/reply`, {
      onSuccess: () => form.reset(),
    });
  };

  const changeStatus = (newStatus: string) => {
    router.post(`/admin/support/${tenant.id}/${ticket.id}/status`, { status: newStatus });
    setShowStatusMenu(false);
  };

  return (
    <Layout>
      <Head title={`${ticket.subject} - Support`} />

      <div className="space-y-6">
        {/* Back + Header */}
        <div>
          <Link
            href="/admin/support"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Support
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{ticket.subject}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${status.color}`}>
                  <span className="material-symbols-outlined text-xs">{status.icon}</span>
                  {status.label}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-400">
                  <span className="material-symbols-outlined text-xs">domain</span>
                  {ticket.tenant_name}
                </span>
                <span className="text-xs text-slate-400">
                  by {ticket.user_name} · {new Date(ticket.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-lg">swap_vert</span>
                Change Status
              </button>
              {showStatusMenu && (
                <div className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-surface-dark animate-in fade-in slide-in-from-top-2 duration-200">
                  {statusOptions.map((s) => {
                    const cfg = statusConfig[s];
                    const isActive = ticket.status === s;

                    return (
                      <button
                        key={s}
                        onClick={() => changeStatus(s)}
                        disabled={isActive}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-slate-50 text-slate-400 dark:bg-white/5'
                            : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-base ${cfg.color.split(' ').slice(1).join(' ')}`}>{cfg.icon}</span>
                        {cfg.label}
                        {isActive && <span className="ml-auto text-xs text-slate-400">Current</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-5 ${
                msg.sender_type === 'admin'
                  ? 'border-primary/20 bg-primary/5 dark:border-primary/10 dark:bg-primary/5'
                  : 'border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className={`flex size-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                    msg.sender_type === 'admin' ? 'bg-primary' : 'bg-slate-500'
                  }`}
                >
                  {msg.sender_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">{msg.sender_name}</span>
                  {msg.sender_type === 'admin' && (
                    <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">ADMIN</span>
                  )}
                  {msg.sender_type === 'tenant' && (
                    <span className="ml-2 rounded-md bg-slate-500/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">TENANT</span>
                  )}
                </div>
                <span className="ml-auto text-xs text-slate-400">
                  {new Date(msg.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{msg.body}</p>
            </div>
          ))}
        </div>

        {/* Reply Box */}
        {ticket.status !== 'closed' ? (
          <form
            onSubmit={handleReply}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-surface-dark"
          >
            <textarea
              value={form.data.body}
              onChange={(e) => form.setData('body', e.target.value)}
              rows={3}
              placeholder="Write a reply as admin..."
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
            />
            <button
              type="submit"
              disabled={form.processing || !form.data.body.trim()}
              className="self-end rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
            <span className="material-symbols-outlined text-slate-400">lock</span>
            <p className="text-sm text-slate-500 dark:text-slate-400">This ticket is closed. Change the status to reopen it.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
