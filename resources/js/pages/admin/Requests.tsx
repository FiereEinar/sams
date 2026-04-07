import { Head, router } from '@inertiajs/react';
import Layout from './Layout';
import TenantDetailsModal from '../../components/admin/TenantDetailsModal';

interface TenantRequest {
  id: string;
  organization_name: string;
  organization_type: string;
  domain: string | null;
  admin_email: string | null;
  created_at: string;
  subscription_expires_at: string;
}

export default function Requests({ requests }: { requests: TenantRequest[] }) {
  console.log(requests);

  const handleApprove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to approve this organization?')) return;
    router.post(`/admin/requests/${id}/approve`);
  };

  const handleReject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
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
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface-dark/50">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="border-b border-white/5 bg-white/5 text-xs uppercase text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-bold">Organization & Domain</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((req) => (
                  <TenantDetailsModal
                    key={req.id}
                    tenant={{
                      id: req.id,
                      organization_name: req.organization_name,
                      organization_type: req.organization_type,
                      domain: req.domain,
                      email: req.admin_email,
                      created_at: req.created_at,
                      subscription_expires_at: req.subscription_expires_at,
                      status: 'inactive',
                      plan: 'basic'
                    }}
                    isRequest={true}
                    trigger={(open: () => void) => (
                      <tr onClick={open} className="cursor-pointer transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                              <span className="material-symbols-outlined text-xl">domain</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{req.organization_name}</h3>
                              <div className="mt-1 flex items-center gap-1 text-xs">
                                <span className="material-symbols-outlined text-[14px]">link</span>
                                <a
                                  href={`${window.location.protocol}//${req.domain}:${import.meta.env.VITE_APP_PORT}/login`}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  className="transition-colors hover:text-primary"
                                >
                                  {req.domain}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={(e) => handleApprove(e, req.id)}
                              className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500/20"
                            >
                              <span className="material-symbols-outlined text-lg">check_circle</span>
                              Approve
                            </button>
                            <button
                              onClick={(e) => handleReject(e, req.id)}
                              className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition-all hover:bg-red-500/20"
                            >
                              <span className="material-symbols-outlined text-lg">cancel</span>
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
