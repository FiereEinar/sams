export default function SidebarHeader() {
  return (
    <div className="flex items-center gap-3 p-6">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
        <span className="material-symbols-outlined font-bold">account_balance</span>
      </div>
      <div>
        <h1 className="text-lg leading-none font-bold">SSG Admin</h1>
        <p className="text-xs text-slate-500 dark:text-primary/70">Supreme Student Gov.</p>
      </div>
    </div>
  );
}
