import { Head, router } from '@inertiajs/react';
import Layout from './Layout';
import TenantDetailsModal from '../../components/admin/TenantDetailsModal';
import _ from 'lodash';

interface TenantItem {
  id: string;
  organization_name: string;
  organization_type: string;
  plan: string;
  status: string;
  domain: string | null;
  address: string | null;
  name: string | null;
  email: string | null;
  created_at: string;
  subscription_expires_at: string;
}

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
          <div className="grid gap-4">
            {tenants.map((tenant) => (
              <TenantDetailsModal
                key={tenant.id}
                tenant={tenant}
                trigger={(open: () => void) => (
                  <div
                    onClick={open}
                    className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-white/5 bg-surface-dark/50 p-6 transition-all hover:border-white/20 hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                          tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700/50 text-slate-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">domain</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold">{tenant.organization_name}</h3>
                          <span
                            className={`rounded-lg px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                              tenant.plan === 'premium' ? 'bg-primary/10 text-primary' : 'bg-slate-700/50 text-slate-400'
                            }`}
                          >
                            {tenant.plan}
                          </span>
                          <span
                            className={`rounded-lg px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                              tenant.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {tenant.status}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">link</span>
                            <a
                              href={`${window.location.protocol}//${tenant.domain}:${import.meta.env.VITE_APP_PORT}/login`}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="transition-all hover:text-primary"
                            >
                              {tenant.domain}
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={(e) => handleToggle(e, tenant.id, tenant.status)}
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                          tenant.status === 'active'
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{tenant.status === 'active' ? 'block' : 'check_circle'}</span>
                        {tenant.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
