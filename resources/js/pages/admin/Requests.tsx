import { Head, router } from '@inertiajs/react';
import Layout from './Layout';

interface TenantRequest {
  id: string;
  organization_name: string;
  organization_type: string;
  domain: string | null;
  admin_email: string | null;
  created_at: string;
}

export default function Requests({ requests }: { requests: TenantRequest[] }) {
  const handleApprove = (id: string) => {
    if (!confirm('Are you sure you want to approve this organization?')) return;
    router.post(`/admin/requests/${id}/approve`);
  };

  const handleReject = (id: string) => {
    if (!confirm('Are you sure you want to reject and delete this organization? This cannot be undone.')) return;
    router.post(`/admin/requests/${id}/reject`);
  };

  return (
    <Layout>
      <Head title="Pending Requests" />
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Pending Requests</h1>
          <p className="mt-1 text-slate-400">Review and approve basic plan organization signups.</p>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-surface-dark/50 py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-slate-600">inbox</span>
            <h2 className="text-xl font-bold text-slate-400">No Pending Requests</h2>
            <p className="mt-1 text-sm text-slate-500">All organization signups have been processed.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-surface-dark/50 p-6 transition-all hover:border-white/10 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <span className="material-symbols-outlined text-2xl">domain</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{req.organization_name}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">category</span>
                        {req.organization_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">link</span>
                        {req.domain}
                      </span>
                      {req.admin_email && (
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">mail</span>
                          {req.admin_email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {req.created_at}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500/20"
                  >
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex items-center gap-2 rounded-xl bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20"
                  >
                    <span className="material-symbols-outlined text-lg">cancel</span>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
