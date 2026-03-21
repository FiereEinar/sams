export default function ImportCooldown() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-blue-400 bg-blue-600 p-4 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
        <span className="material-symbols-outlined">timer</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">Upload Cooldown Active</p>
        <p className="text-xs opacity-90">Basic plan users can upload a new masterlist every 30 days. Next upload available in 12 days.</p>
      </div>
      <button className="rounded-lg p-1 text-white transition-colors hover:bg-white/20">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}
