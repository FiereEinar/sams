import { useState } from 'react';

export default function Signup() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark p-6 text-white">
      <div className="grid w-full max-w-6xl items-start gap-8 lg:grid-cols-12">
        <LeftAside />
        <div className="overflow-hidden rounded-4xl border border-white/5 bg-surface-dark shadow-2xl lg:col-span-8">
          {activeTab === 1 ? <Step1Header /> : activeTab === 2 ? <Step2Header /> : <Step3Header />}

          {activeTab === 1 ? (
            <Step1Card activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : activeTab === 2 ? (
            <Step2Card activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <Step3Card activeTab={activeTab} setActiveTab={setActiveTab} />
          )}

          <div className="border-t border-white/5 bg-slate-900/20 px-10 py-6 text-center">
            <p className="text-xs text-slate-500">
              Already have an organization registered?
              <a className="ml-2 font-bold text-primary hover:underline" href="/login">
                Log in to Dashboard
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-0 -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">1</div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">2</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

function Step1Card({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="space-y-8 p-10">
      <div>
        <h3 className="text-2xl font-bold">Organization Details</h3>
        <p className="mt-1 text-sm text-slate-400">Provide the primary identification details for your organization.</p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">groups</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="BukSU Computer Studies Society"
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Type</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">category</span>
              <select className="w-full appearance-none rounded-xl border-white/10 bg-background-dark py-3.5 pr-10 pl-12 text-sm text-white transition-all">
                <option disabled={undefined} selected={undefined} value="">
                  Select type...
                </option>
                <option value="college-club">College Club</option>
                <option value="departmental">Departmental Organization</option>
                <option value="society">Academic Society</option>
                <option value="interest">Interest-based Group</option>
                <option value="council">Student Council</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Subdomain</label>
          <div className="flex items-center gap-0">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">link</span>
              <input
                className="w-full rounded-l-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="my-org"
                type="text"
              />
            </div>
            <div className="rounded-r-xl border-y border-r border-white/10 bg-slate-800 px-4 py-3.5 text-sm font-medium text-slate-400">
              .buksu-ams.com
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 px-1">
            <span className="text-[11px] text-slate-500">Your portal will be available at:</span>
            <span className="text-[11px] font-bold text-primary">my-org.buksu-ams.com</span>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4">
          <span className="material-symbols-outlined mt-0.5 text-primary">help_outline</span>
          <p className="text-xs leading-relaxed text-slate-300">
            The subdomain is unique to your organization. It will be the address students use to access your specific events and attendance logs.
          </p>
        </div>
        <div className="flex items-center justify-end pt-4">
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            type="submit"
          >
            <span>Next Step: Admin Setup</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Step2Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-1/2 -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">1</div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">2</div>
          <span className="text-xs font-bold tracking-wider text-white uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

function Step2Card({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="space-y-8 p-10">
      <div>
        <h3 className="text-2xl font-bold">Admin Account Setup</h3>
        <p className="mt-1 text-sm text-slate-400">Create the primary administrator account for your organization.</p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">person</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="Juan Dela Cruz"
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Student Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">mail</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="juan.dc@buksu.edu.ph"
                type="email"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">lock</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">key</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4">
          <span className="material-symbols-outlined mt-0.5 text-primary">info</span>
          <p className="text-xs leading-relaxed text-slate-300">
            By creating this account, you agree that you are an authorized representative of your organization. All activities will be logged and
            subject to BukSU IT policies.
          </p>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="flex items-center gap-2 px-6 py-3 font-bold text-slate-400 transition-colors hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Previous Step</span>
          </button>
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            type="submit"
          >
            <span>Complete Registration</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Step3Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full origin-left -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">
            <span className="material-symbols-outlined text-base">check</span>
          </div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">
            <span className="material-symbols-outlined text-base">check</span>
          </div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-white uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

function Step3Card({ activeTab, setActiveTab }: { activeTab: number; setActiveTab: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="flex flex-col items-center space-y-8 p-10 text-center">
      <div className="relative">
        <div className="absolute inset-0 scale-75 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="glow-envelope relative flex size-24 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10">
          <span className="material-symbols-outlined text-5xl text-primary">mark_email_unread</span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold tracking-tight">Check your inbox</h3>
        <p className="text-sm text-slate-400">
          We've sent a 6-digit code to
          <span className="font-semibold text-white">j.delacruz@buksu.edu.ph</span>
        </p>
      </div>
      <form className="w-full max-w-sm space-y-8">
        <div className="flex justify-center gap-3">
          <input autoFocus className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <div className="w-2"></div>
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-hover"
            type="submit"
          >
            <span>Verify and Finish</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">task_alt</span>
          </button>
          <div className="flex items-center justify-between px-2">
            <button className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-primary" type="button">
              <span className="material-symbols-outlined text-base">refresh</span>
              Resend Code
            </button>
            <button className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-white" type="button">
              <span className="material-symbols-outlined text-base">edit</span>
              Change Email
            </button>
          </div>
        </div>
      </form>
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-slate-800/50 px-4 py-2">
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Awaiting input</span>
        </div>
      </div>
    </div>
  );
}

function LeftAside() {
  return (
    <div className="space-y-6 lg:col-span-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
        </div>
        <div>
          <h1 className="text-xl leading-none font-black tracking-tight uppercase">BukSU AMS</h1>
          <p className="text-xs font-semibold text-primary/70">Organization Registration</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Choose your journey.</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Join Bukidnon State University's premier attendance management ecosystem. Select your plan to begin the setup.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-surface-dark p-5 transition-all hover:border-primary/40">
          <div className="mb-3 flex items-start justify-between">
            <div className="rounded-lg bg-slate-800 p-2">
              <span className="material-symbols-outlined text-slate-400">inventory_2</span>
            </div>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">FREE</span>
          </div>
          <h3 className="mb-1 text-lg font-bold">Basic Plan</h3>
          <p className="mb-4 text-xs text-slate-400">Perfect for smaller organizations and clubs.</p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-green-500/50">check_circle</span>
              Up to 3 active events
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-green-500/50">check_circle</span>
              CSV export only
            </li>
          </ul>
        </div>
        <div className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-primary bg-primary/5 p-5 transition-all">
          <div className="absolute top-0 right-0 p-3">
            <span className="material-symbols-outlined text-primary">verified</span>
          </div>
          <div className="mb-3 flex items-start justify-between">
            <div className="rounded-lg bg-primary/20 p-2">
              <span className="material-symbols-outlined text-primary">workspace_premium</span>
            </div>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white uppercase">Selected</span>
          </div>
          <h3 className="mb-1 text-lg font-bold">Premium Plan</h3>
          <p className="mb-4 text-xs text-primary/70">Full suite for departments and supreme councils.</p>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Unlimited events &amp; students
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Advanced Analytics Dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Multi-tenant sub-admin roles
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
