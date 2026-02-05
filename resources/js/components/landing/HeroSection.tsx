export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden px-6 py-16 lg:px-20 lg:py-28">
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-buksu-blue/30 blur-[120px]"></div>
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="z-10 flex flex-col gap-8 text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Unified Attendance for BukSU Campuses
          </div>
          <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tight text-slate-900 lg:text-7xl dark:text-white">
            Modern Tracking for
            <span className="bg-linear-to-r from-primary to-buksu-blue bg-clip-text text-transparent italic">BukSU</span>
            Leaders
          </h1>
          <p className="max-w-135 text-lg leading-relaxed text-slate-600 lg:text-xl dark:text-slate-400">
            The professional multi-tenant management system for campus organizations. Streamline your events with a sleek, blue-themed university
            experience.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex h-14 items-center justify-center rounded-2xl bg-primary px-8 text-lg font-bold text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-hover">
              Launch Your Org
            </button>
            <button className="flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 text-lg font-bold transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              Watch Demo
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-3">
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300 dark:border-background-dark" data-alt="Student 1"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white bg-primary/40 dark:border-background-dark" data-alt="Student 2"></div>
              <div className="h-8 w-8 rounded-full border-2 border-white bg-buksu-blue/40 dark:border-background-dark" data-alt="Student 3"></div>
            </div>
            <span>Trusted by 50+ campus organizations</span>
          </div>
        </div>
        <div className="group relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/20 opacity-30 blur-3xl transition-opacity group-hover:opacity-50"></div>
          <div className="relative aspect-4/3 overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-slate-800 to-buksu-blue shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9L6rQtQXueycv--dBOD9KEHzvAHhHWPQmOJeWlyIb2bRylaKvkeNDR3wpINx5pjW6Aw_yhnNEWQFMEtTdjgRKAv7ibEpsd31rsMcH7tQWtmTc4i469qTg5FV3oq2cRmgww73D1z3-WitbMWcB_dbY-xYgELvpRowhv8YBYOhgv-arPnPFYxn2eBNekNF3Y77XxGIcbUjZrMIB4VZ6ejGHC4KOWzTQb5Vq1_4UigTsBpe_kEBd0JeIgTDnG8QvVJRTTPF2zMhVmHdw')",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="flex h-full w-full flex-col rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="size-3 rounded-full bg-red-400"></div>
                  <div className="size-3 rounded-full bg-yellow-400"></div>
                  <div className="size-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-1/3 animate-pulse rounded-lg bg-white/20"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-xl bg-white/10"></div>
                    <div className="h-24 rounded-xl bg-white/10"></div>
                    <div className="h-24 rounded-xl bg-white/10"></div>
                  </div>
                  <div className="h-32 w-full rounded-xl bg-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
