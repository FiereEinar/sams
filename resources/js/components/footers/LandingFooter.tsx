export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-16 lg:px-20 dark:border-white/5 dark:bg-background-dark/50">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-lg font-bold">event_available</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                BukSU <span className="text-primary">Attendance</span>
              </h2>
            </div>
            <p className="max-w-xs text-center text-sm text-slate-500 md:text-left dark:text-slate-400">
              Empowering student organizations at Bukidnon State University with professional management tools.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="flex gap-8">
              <a className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400" href="#">
                Twitter
              </a>
              <a className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400" href="#">
                Facebook
              </a>
              <a className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary dark:text-slate-400" href="#">
                Instagram
              </a>
            </div>
            <p className="text-xs text-slate-400">© 2024 Bukidnon State University. Built for student leaders.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
