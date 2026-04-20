import React, { useState, ReactNode } from 'react';
import { router } from '@inertiajs/react';
import Dialog from '../ui/Dialog';
import _ from 'lodash';

export interface TenantDetails {
  id: string;
  organization_name: string;
  organization_type: string;
  plan?: string;
  plan_id?: number | null;
  status?: string;
  domain: string | null;
  address?: string | null;
  name?: string | null;
  email: string | null;
  admin_email?: string | null;
  created_at: string;
  subscription_expires_at: string;
}

interface TenantDetailsModalProps {
  tenant: TenantDetails;
  plans?: any[];
  trigger: (open: () => void) => ReactNode;
  isRequest?: boolean;
}

export default function TenantDetailsModal({ tenant, plans = [], trigger, isRequest = false }: TenantDetailsModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [updatingPlan, setUpdatingPlan] = useState(false);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatingPlan(true);
    router.put(
      `/admin/tenants/${tenant.id}/plan`,
      { plan_id: e.target.value },
      { onFinish: () => setUpdatingPlan(false) }
    );
  };

  const handleNotifySubscription = () => {
    if (isSending) return;
    setIsSending(true);
    router.post(
      `/admin/tenants/${tenant.id}/notify-subscription`,
      {},
      {
        onFinish: () => setIsSending(false),
      },
    );
  };

  return (
    <Dialog trigger={trigger}>
      {(close) => (
        <div className="flex w-full max-w-2xl flex-col gap-6 rounded-xl border border-white/5 bg-[#16212b] p-6 shadow-2xl md:min-w-[700px]">
          <div>
            <h2 className="text-2xl font-black text-white">{tenant.organization_name}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <span className="material-symbols-outlined text-[16px]">domain</span>
              {_.startCase(tenant.organization_type)}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Organization Info */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <h3 className="mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-slate-500">Domain / URL</dt>
                  <dd className="font-medium text-white">
                    {tenant.domain ? (
                      <a
                        href={`${window.location.protocol}//${tenant.domain}:${import.meta.env.VITE_APP_PORT}/login`}
                        target="_blank"
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tenant.domain}
                      </a>
                    ) : (
                      <span className="text-slate-500 italic">Pending</span>
                    )}
                  </dd>
                </div>
                {tenant.address && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-slate-500">Address</dt>
                    <dd className="font-medium text-white">{tenant.address}</dd>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <dt className="text-slate-500">Registered On</dt>
                  <dd className="font-medium text-white">{tenant.created_at}</dd>
                </div>
              </dl>
            </div>

            {/* Contact Person */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <h3 className="mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Contact Administrator</h3>
              <dl className="space-y-3 text-sm">
                {tenant.name && (
                  <div className="flex flex-col gap-1">
                    <dt className="text-slate-500">Full Name</dt>
                    <dd className="font-medium text-white">{tenant.name}</dd>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <dt className="text-slate-500">Email Address</dt>
                  <dd className="font-medium text-white">{tenant.email || tenant.admin_email}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="rounded-xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Subscription Details</h3>
              {!isRequest && tenant.plan && (
                <div className="flex items-center gap-2">
                  {updatingPlan && <span className="material-symbols-outlined animate-spin text-sm text-slate-400">progress_activity</span>}
                  <select
                    value={tenant.plan_id || ''}
                    onChange={handlePlanChange}
                    disabled={updatingPlan}
                    className="rounded-lg border border-white/10 bg-slate-800 px-3 py-1 text-xs font-bold text-white focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
                  >
                    {!tenant.plan_id && <option value="" disabled>Select Plan</option>}
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({_.startCase(p.type)})</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-slate-500">Expires On</span>
                <span className="font-bold text-white">{tenant.subscription_expires_at}</span>
              </div>
              {!isRequest && (
                <button
                  onClick={handleNotifySubscription}
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">{isSending ? 'hourglass_empty' : 'send'}</span>
                  {isSending ? 'Sending...' : 'Send Subscription Notice'}
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => close()}
              className="rounded-xl bg-slate-800 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
