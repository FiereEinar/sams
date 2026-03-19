import { Head } from '@inertiajs/react';
import Layout from './Layout';
import Header from '@/components/ui/Header';

interface PaymentItem {
  id: number;
  tenant_id: string;
  organization_name: string | null;
  payer_name: string;
  payer_email: string;
  amount: number;
  currency: string;
  description: string | null;
  payment_method: string | null;
  checkout_ref: string | null;
  status: string;
  created_at: string;
}

function formatAmount(amount: number, currency: string): string {
  return `${currency} ${(amount / 100).toFixed(2)}`;
}

export default function Payments({ payments }: { payments: PaymentItem[] }) {
  return (
    <Layout>
      <Head title="Payments" />
      <div>
        <div className="mb-8">
          <Header>Payments</Header>
          <p className="mt-1 text-slate-500 dark:text-slate-400">View all payment transactions from premium plan signups.</p>
        </div>

        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-surface-light py-20 text-center dark:border-white/5 dark:bg-surface-dark">
            <span className="material-symbols-outlined mb-4 text-6xl text-slate-300 dark:text-slate-600">payments</span>
            <h2 className="text-xl font-bold text-slate-400">No Payments Yet</h2>
            <p className="mt-1 text-sm text-slate-500">Payments will appear here once premium plan signups are completed.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5">
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Organization</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Payer</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Reference</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-slate-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-100 transition-colors last:border-0 dark:border-white/[0.03]">
                    <td className="px-6 py-4">
                      <p className="font-bold">{payment.organization_name ?? payment.tenant_id}</p>
                      <p className="text-xs text-slate-500">{payment.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{payment.payer_name}</p>
                      <p className="text-xs text-slate-500">{payment.payer_email}</p>
                    </td>
                    <td className="px-6 py-4 font-bold">{formatAmount(payment.amount, payment.currency)}</td>
                    <td className="px-6 py-4">
                      <code className="rounded-md bg-slate-100 px-2 py-1 text-xs dark:bg-white/5">{payment.checkout_ref ?? '—'}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold tracking-wider uppercase ${
                          payment.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : payment.status === 'pending'
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                              : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{payment.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
