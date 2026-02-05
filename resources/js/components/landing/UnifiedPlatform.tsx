export default function UnifiedPlatform() {
  return (
    <section className="bg-white px-6 py-24 lg:px-20 dark:bg-slate-900/30" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Unified Platform</h2>
          <h3 className="max-w-200 text-4xl font-extrabold text-slate-900 lg:text-5xl dark:text-white">Designed for Every Organization</h3>
          <p className="max-w-150 text-lg text-slate-600 dark:text-slate-400">
            Professional-grade multi-tenant architecture that ensures your organization's data is private, secure, and uniquely branded.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:border-white/5 dark:bg-white/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Multi-Tenant Access</h4>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              Dedicated workspace for each organization, from the SSG to specialized hobbyist clubs.
            </p>
          </div>
          <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:border-white/5 dark:bg-white/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined text-3xl">insights</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Professional Analytics</h4>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              Beautifully crafted data visualizations that make semester-end reporting a breeze.
            </p>
          </div>
          <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:border-white/5 dark:bg-white/5">
            <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h4 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">University Standards</h4>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              Compliant with BukSU records standards, ensuring accurate student verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
