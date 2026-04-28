import { Head, usePage } from '@inertiajs/react';
import Layout from './Layout';
import Header from '@/components/ui/Header';
import { useState } from 'react';
import axios from 'axios';

interface Plan {
  id: number;
  name: string;
  type: 'basic' | 'premium';
  description: string | null;
  price: string;
  is_featured: boolean;
  features: Record<string, number | null> | null;
}

interface PageProps {
  plans: Plan[];
  currentPlan: Plan | null;
  tenantPlan: string;
  paidPlanIds: number[];
}

const featureLabels: Record<string, string> = {
  max_students_per_import: 'Students per Import',
  max_users: 'Max Users',
  max_exports_per_day: 'Exports per Day',
};

export default function ManagePlan() {
  const { plans, currentPlan, tenantPlan, paidPlanIds } = usePage<{ props: PageProps }>().props as unknown as PageProps;
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const upgraded = new URLSearchParams(window.location.search).get('upgraded');
  console.log(paidPlanIds);
  const handleSelectPlan = async (plan: Plan) => {
    if (currentPlan?.id === plan.id) return;

    setLoading(plan.id);
    setError(null);

    try {
      const response = await axios.post('/plans/checkout', { plan_id: plan.id });
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else if (response.data.redirect) {
        window.location.href = response.data.redirect;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process plan change.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Layout>
      <Head title="Manage Plan" />
      <div className="mb-8">
        <Header>Manage Plan</Header>
        <p className="mt-1 text-slate-500 dark:text-slate-400">View your current subscription and upgrade or change your plan.</p>
      </div>

      {upgraded && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <span className="material-symbols-outlined text-emerald-500">check_circle</span>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Your plan has been updated successfully!</p>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <span className="material-symbols-outlined text-red-500">error</span>
          <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Current Plan */}
      {currentPlan && (
        <section className="mb-8">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-6 dark:border-primary/30">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-2xl text-primary">{tenantPlan === 'premium' ? 'workspace_premium' : 'business'}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Plan</p>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">{currentPlan.name}</h2>
                {currentPlan.description && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{currentPlan.description}</p>}
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-black text-primary">
                  {parseFloat(currentPlan.price) === 0 ? 'Free' : `₱${parseFloat(currentPlan.price).toLocaleString()}`}
                </p>
                {parseFloat(currentPlan.price) > 0 && <p className="text-xs text-slate-400">one-time payment</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Available Plans */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-white">Available Plans</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = currentPlan?.id === plan.id;
            const isPremium = plan.type === 'premium';

            return (
              <div
                key={plan.id}
                className={`relative overflow-hidden rounded-2xl border p-6 transition-all ${
                  isCurrent
                    ? 'border-primary/40 bg-primary/5 ring-2 ring-primary/20 dark:border-primary/50 dark:bg-primary/10'
                    : isPremium
                      ? 'border-violet-200 bg-white hover:border-violet-300 hover:shadow-lg dark:border-violet-500/20 dark:bg-surface-dark dark:hover:border-violet-500/40'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg dark:border-white/10 dark:bg-surface-dark dark:hover:border-white/20'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-4 right-4">
                    <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-bold text-white">Current</span>
                  </div>
                )}

                {plan.is_featured && !isCurrent && (
                  <div className="absolute top-4 right-4">
                    <span className="rounded-lg bg-violet-500 px-2.5 py-1 text-xs font-bold text-white">Recommended</span>
                  </div>
                )}

                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      isPremium ? 'bg-violet-500/10' : 'bg-slate-100 dark:bg-white/5'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl ${isPremium ? 'text-violet-500' : 'text-slate-500 dark:text-slate-400'}`}>
                      {isPremium ? 'workspace_premium' : 'business'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{plan.name}</h4>
                    <p className="text-xs text-slate-400 capitalize">{plan.type} plan</p>
                  </div>
                </div>

                {plan.description && <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>}

                <div className="mb-6">
                  <span className="text-3xl font-black text-slate-800 dark:text-white">
                    {parseFloat(plan.price) === 0 ? 'Free' : `₱${parseFloat(plan.price).toLocaleString()}`}
                  </span>
                  {parseFloat(plan.price) > 0 && <span className="ml-1 text-sm text-slate-400">one-time</span>}
                </div>

                {/* Features */}
                {plan.features && (
                  <div className="mb-6 space-y-2.5">
                    {Object.entries(plan.features).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-base text-emerald-500">check_circle</span>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {value === null ? 'Unlimited' : value} {featureLabels[key] || key}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrent || loading === plan.id}
                  className={`w-full rounded-xl py-2.5 text-sm font-bold transition-all disabled:cursor-not-allowed ${
                    isCurrent
                      ? 'bg-primary/10 text-primary'
                      : isPremium
                        ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-600 disabled:opacity-50'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                  }`}
                >
                  {loading === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                      Processing...
                    </span>
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : parseFloat(plan.price) === 0 || paidPlanIds.includes(plan.id) ? (
                    'Switch to This Plan'
                  ) : (
                    'Upgrade Now'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
