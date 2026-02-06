export default function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-background-light px-8 dark:border-white/10 dark:bg-background-dark">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">search</span>
          <input
            className="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 text-sm text-slate-900 transition-all focus:ring-2 focus:ring-primary/50 dark:bg-surface-dark dark:text-white"
            placeholder="Search student records, events, or reports..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="mx-2 h-8 w-px bg-slate-200 dark:bg-white/10"></div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-none font-bold">Admin User</p>
            <p className="text-xs text-slate-500">SSG President</p>
          </div>
          <div
            className="size-10 rounded-full border-2 border-primary bg-cover bg-center"
            data-alt="Student organization administrator profile picture"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRpuIXwSqy-B6khUBlncJRwuCa6SGL3jR32Wx7k_dPw7EJwQvIvJF0YAERsFnmIC92FVP0gu3DBsO6OftmOn7JIxwmtp4PqifeD2GRvLSkPirxStSe2GUHpN5vFeyKU_HyQixV0kbQzNyg0tQtFITq61M4W6XJheB_XxwDtY64sNU1INSnPa2QUeCvGijm_uAJHVfl93HAauksnI7Ny3ltFZ3czZkBL5FrJTwb8--nAyPJa-B6HE-TwJGjmAalvRmRaYCfDL2q8Ax3')",
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
