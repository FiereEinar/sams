import { Head, Link } from '@inertiajs/react';
import Layout from './Layout';

interface PageProps {
  status: 'success' | 'processed' | 'error';
  planName?: string;
}

export default function PlanUpgradeSuccess({ status, planName }: PageProps) {
  return (
    <Layout>
      <Head title="Plan Upgrade" />
      <div className="flex flex-col items-center justify-center py-16">
        {status === 'success' && (
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
            </div>
            <h1 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">Plan Updated!</h1>
            <p className="mb-8 text-slate-500 dark:text-slate-400">
              Your subscription has been upgraded to <span className="font-bold text-primary">{planName}</span>.
              All new features are now active.
            </p>
            <Link
              href="/plans"
              className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            >
              View Plan Details
            </Link>
          </div>
        )}

        {status === 'processed' && (
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
              <span className="material-symbols-outlined text-4xl text-amber-500">info</span>
            </div>
            <h1 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">Already Processed</h1>
            <p className="mb-8 text-slate-500 dark:text-slate-400">
              This payment has already been processed. Your plan should be up to date.
            </p>
            <Link
              href="/plans"
              className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            >
              Go to Plans
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex max-w-md flex-col items-center text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
              <span className="material-symbols-outlined text-4xl text-red-500">error</span>
            </div>
            <h1 className="mb-2 text-2xl font-black text-slate-800 dark:text-white">Something Went Wrong</h1>
            <p className="mb-8 text-slate-500 dark:text-slate-400">
              We couldn't process your plan upgrade. Please try again or contact support.
            </p>
            <Link
              href="/plans"
              className="rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            >
              Try Again
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
