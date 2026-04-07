import { Head } from '@inertiajs/react';
import Layout from './Layout';
import { Tenant } from '@/types/tenant';

type TenantItem = Tenant & {
  domains: { domain: string }[];
  storage_occupied: number;
  bandwidth_used: number;
  api_requests_count: number;
};

interface Props {
  totalTenants: number;
  totalStorage: number;
  totalBandwidth: number;
  totalApiRequests: number;
  tenants: TenantItem[];
}

const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
};

export default function Monitoring({ totalTenants, totalStorage, totalBandwidth, totalApiRequests, tenants }: Props) {
  return (
    <Layout>
      <Head title="Monitoring" />
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">System Monitoring</h1>
          <p className="mt-1 text-slate-400">Overview of tenant resource usage and system statistics.</p>
        </div>

        {/* Dashbaord Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-surface-dark/50 p-6">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined">domain</span>
              <span className="text-sm font-semibold uppercase tracking-wider">Total Tenants</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatNumber(totalTenants)}</div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-surface-dark/50 p-6">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined">api</span>
              <span className="text-sm font-semibold uppercase tracking-wider">API Requests</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatNumber(totalApiRequests)}</div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-surface-dark/50 p-6">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined">hard_drive</span>
              <span className="text-sm font-semibold uppercase tracking-wider">Total Storage</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatBytes(totalStorage)}</div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-surface-dark/50 p-6">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined">wifi</span>
              <span className="text-sm font-semibold uppercase tracking-wider">Total Bandwidth</span>
            </div>
            <div className="text-3xl font-bold text-white">{formatBytes(totalBandwidth)}</div>
          </div>
        </div>

        {/* Tenants List */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Tenant Usage Details</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-surface-dark/50">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="border-b border-white/5 bg-white/5 text-xs uppercase text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-bold">Organization & Domain</th>
                  <th className="px-6 py-4 font-bold">Plan</th>
                  <th className="px-6 py-4 font-bold">API Requests</th>
                  <th className="px-6 py-4 font-bold">Storage Occupied</th>
                  <th className="px-6 py-4 font-bold">Bandwidth Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="transition-colors hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{tenant.organization_name || tenant.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <span className="material-symbols-outlined text-[14px]">link</span>
                        <a
                          href={`${window.location.protocol}//${tenant.domains?.[0]?.domain}:${import.meta.env.VITE_APP_PORT}/login`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {tenant.domains?.[0]?.domain || 'N/A'}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                          tenant.plan === 'premium' ? 'bg-primary/10 text-primary' : 'bg-slate-700/50 text-slate-400'
                        }`}
                      >
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{formatNumber(tenant.api_requests_count)}</td>
                    <td className="px-6 py-4 font-medium text-white">{formatBytes(tenant.storage_occupied)}</td>
                    <td className="px-6 py-4 font-medium text-white">{formatBytes(tenant.bandwidth_used)}</td>
                  </tr>
                ))}
                {tenants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No tenants found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
