import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import Layout from './Layout';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

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
  user: { name: string };
  messages: Message[];
  created_at: string;
};

type PageProps = {
  ticket: Ticket;
};

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  open: { label: 'Open', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', icon: 'radio_button_checked' },
  in_progress: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', icon: 'pending' },
  resolved: { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', icon: 'check_circle' },
  closed: { label: 'Closed', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400', icon: 'cancel' },
};

export default function SupportThread({ ticket }: PageProps) {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];
  const canReply = userPermissions.includes('SUPPORT_CREATE') && ticket.status !== 'closed';
  const status = statusConfig[ticket.status] || statusConfig.open;

  const form = useForm({ body: '' });

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(`/support/${ticket.id}/reply`, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Layout>
      <Head title={ticket.subject} />

      <div className="space-y-6">
        {/* Back + Header */}
        <div>
          <Link
            href="/support"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-primary dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Support
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{ticket.subject}</h1>
              <div className="mt-2 flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${status.color}`}>
                  <span className="material-symbols-outlined text-xs">{status.icon}</span>
                  {status.label}
                </span>
                <span className="text-xs text-slate-400">
                  Opened {new Date(ticket.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {ticket.status !== 'closed' && (
              <ConfirmDialog
                title="Close Ticket"
                description="Are you sure you want to close this ticket? You can still view it after closing."
                confirmText="Close Ticket"
                icon="cancel"
                iconClass="text-slate-500 bg-slate-500/10"
                confirmStyle="bg-slate-600 hover:bg-slate-700 shadow-slate-600/20"
                onConfirm={(close) => {
                  router.post(`/support/${ticket.id}/close`, {}, {
                    onSuccess: () => close(),
                  });
                }}
                trigger={(open) => (
                  <button
                    onClick={open}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
                  >
                    <span className="material-symbols-outlined text-lg">cancel</span>
                    Close Ticket
                  </button>
                )}
              />
            )}
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
        {canReply && (
          <form
            onSubmit={handleReply}
            className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-surface-dark"
          >
            <textarea
              value={form.data.body}
              onChange={(e) => form.setData('body', e.target.value)}
              rows={3}
              placeholder="Write a reply..."
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
        )}

        {ticket.status === 'closed' && (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.02]">
            <span className="material-symbols-outlined text-slate-400">lock</span>
            <p className="text-sm text-slate-500 dark:text-slate-400">This ticket has been closed. No further replies can be added.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
