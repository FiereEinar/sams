export default function SubscriptionPlan() {
  return (
    <section className="px-6 py-24 lg:px-20" id="pricing">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 lg:text-5xl dark:text-white">Plan for Success</h2>
          <p className="max-w-150 text-lg text-slate-600 dark:text-slate-400">Affordable solutions built for the student leadership ecosystem.</p>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-white/10 dark:bg-white/5">
            <button className="rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/20">Per Semester</button>
            <button className="rounded-xl px-8 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:text-primary dark:text-slate-400">
              Annual (Save 20%)
            </button>
          </div>
        </div>
        <div className="mx-auto grid max-w-240 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-8 rounded-[2.5rem] border border-slate-200 bg-white p-10 transition-all hover:border-primary/30 dark:border-white/5 dark:bg-white/5">
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">Org Basic</h4>
              <p className="text-slate-500 dark:text-slate-400">Essential for small interest groups</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">₱0</span>
                <span className="font-bold text-slate-500">/ sem</span>
              </div>
            </div>
            <button className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 font-bold text-white transition-all hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20">
              Start for Free
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-xl text-primary">check_circle</span>
                <span className="text-slate-700 dark:text-slate-300">Up to 75 students</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-xl text-primary">check_circle</span>
                <span className="text-slate-700 dark:text-slate-300">CSV Attendance Exports</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-xl text-primary">check_circle</span>
                <span className="text-slate-700 dark:text-slate-300">Single Organization Profile</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="material-symbols-outlined text-xl text-slate-300 dark:text-slate-700">cancel</span>
                <span>Advanced Analytics Heatmaps</span>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-8 overflow-hidden rounded-[2.5rem] border-2 border-primary bg-primary/3 p-10 shadow-2xl shadow-primary/10 transition-all">
            <div className="absolute top-0 right-0">
              <div className="rounded-bl-3xl bg-primary px-6 py-2 text-xs font-black tracking-widest text-white uppercase">Most Selected</div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-primary">Org Pro</h4>
              <p className="text-slate-500 dark:text-slate-400">Comprehensive for major councils</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">₱499</span>
                <span className="font-bold text-slate-500">/ sem</span>
              </div>
            </div>
            <button className="flex h-12 w-full items-center justify-center rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:bg-primary-hover">
              Get Premium Access
            </button>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-xl font-bold text-primary">check_circle</span>
                Unlimited students
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-xl font-bold text-primary">check_circle</span>
                Advanced PDF Reporting
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-xl font-bold text-primary">check_circle</span>
                Multi-admin Management
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-xl font-bold text-primary">check_circle</span>
                Custom QR Code Branding
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <span className="material-symbols-outlined text-xl font-bold text-primary">check_circle</span>
                Priority 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
