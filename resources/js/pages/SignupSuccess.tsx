import { Head, Link } from '@inertiajs/react';

export default function SignupSuccess({ status, subdomain }: { status: string; subdomain?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark p-6 text-white">
      <Head title="Registration Success" />
      <div className="w-full max-w-lg overflow-hidden rounded-4xl border border-white/5 bg-surface-dark p-10 text-center shadow-2xl">
        {status === 'success' ? (
          <>
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10">
              <span className="material-symbols-outlined text-5xl text-primary">verified</span>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Payment Successful!</h1>
            <p className="mb-8 text-slate-400">Welcome aboard! Your premium organization workspace is now active and ready to use.</p>
            <a
              href={`${window.location.protocol}//${subdomain}:${import.meta.env.VITE_APP_PORT}/login`}
              target="_blank"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-hover"
            >
              <span>Go to Login Dashboard</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-800">
              <span className="material-symbols-outlined text-5xl text-slate-400">info</span>
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Already Processed</h1>
            <p className="mb-8 text-slate-400">
              This registration link has already been processed or is invalid. If you have already paid, your account is set up.
            </p>
            <Link
              href="/signup"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 py-4 font-bold text-white transition-all hover:bg-slate-700"
            >
              <span>Go to Registration</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
