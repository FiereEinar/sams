import { Head, router } from '@inertiajs/react';
import Layout from './Layout';
import TenantDetailsModal from '../../components/admin/TenantDetailsModal';
import _ from 'lodash';
import { Tenant } from '@/types/tenant';

type TenantItem = Tenant & {
  subscription_expires_at: string;
};

export default function Tenants({ tenants }: { tenants: TenantItem[] }) {
  const handleToggle = (e: React.MouseEvent, id: string, currentStatus: string) => {
    e.stopPropagation();
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    if (!confirm(`Are you sure you want to set this tenant to "${newStatus}"?`)) return;
    router.post(`/admin/tenants/${id}/toggle-status`);
  };

  return (
    <Layout>
      <Head title="All Tenants" />
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">All Tenants</h1>
          <p className="mt-1 text-slate-400">Manage all registered organizations and their access status.</p>
        </div>

        {tenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-surface-dark/50 py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-6xl text-slate-600">domain_disabled</span>
            <h2 className="text-xl font-bold text-slate-400">No Tenants</h2>
            <p className="mt-1 text-sm text-slate-500">No organizations have been registered yet.</p>
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
                {tenants.map((tenant) => (
                  <TenantDetailsModal
                    key={tenant.id}
                    tenant={tenant}
                    trigger={(open: () => void) => (
                      <tr onClick={open} className="cursor-pointer transition-colors hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                                tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-500'
                              }`}
                            >
                              <span className="material-symbols-outlined text-xl">domain</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-bold text-white">{tenant.organization_name}</h3>
                                <span
                                  className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                    tenant.plan === 'premium' ? 'bg-primary/10 text-primary' : 'bg-slate-700/50 text-slate-400'
                                  }`}
                                >
                                  {tenant.plan}
                                </span>
                                <span
                                  className={`rounded-lg px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                                    tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                  }`}
                                >
                                  {tenant.status}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center gap-1 text-xs">
                                <span className="material-symbols-outlined text-[14px]">link</span>
                                <a
                                  href={`${window.location.protocol}//${tenant.domain}:${import.meta.env.VITE_APP_PORT}/login`}
                                  target="_blank"
                                  onClick={(e) => e.stopPropagation()}
                                  className="transition-colors hover:text-primary"
                                >
                                  {tenant.domain}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={(e) => handleToggle(e, tenant.id, tenant.status)}
                              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                                tenant.status === 'active'
                                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                            >
                              <span className="material-symbols-outlined text-lg">{tenant.status === 'active' ? 'block' : 'check_circle'}</span>
                              {tenant.status === 'active' ? 'Deactivate' : 'Activate'}
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
