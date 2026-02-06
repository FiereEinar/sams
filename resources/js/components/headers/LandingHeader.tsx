export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/80 px-6 py-4 backdrop-blur-md lg:px-20 dark:border-white/5 dark:bg-background-dark/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined font-bold">event_available</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-buksu-blue dark:text-white">
            BukSU <span className="text-primary">Attendance</span>
          </h2>
        </div>
        <nav className="hidden items-center gap-10 md:flex">
          <a className="text-sm font-semibold transition-colors hover:text-primary" href="#features">
            Features
          </a>
          <a className="text-sm font-semibold transition-colors hover:text-primary" href="#organizations">
            Organizations
          </a>
          <a className="text-sm font-semibold transition-colors hover:text-primary" href="#pricing">
            Pricing
          </a>
          <a className="text-sm font-semibold transition-colors hover:text-primary" href="#">
            Support
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/login">
            <button className="hidden h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-5 text-sm font-bold transition-all hover:bg-slate-200 sm:flex dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              Login
            </button>
          </a>
          <a href="/signup">
            <button className="flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary-hover active:scale-95">
              Get Started
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
