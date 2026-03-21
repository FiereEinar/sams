export default function ImportInformation() {
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-surface-dark p-4">
        <div className="mt-1 text-primary">
          <span className="material-symbols-outlined">info</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Avoid Duplicates</p>
          <p className="text-xs leading-relaxed text-slate-400">System automatically detects existing IDs to prevent double entries.</p>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-surface-dark p-4">
        <div className="mt-1 text-primary">
          <span className="material-symbols-outlined">verified</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Validation Check</p>
          <p className="text-xs leading-relaxed text-slate-400">All rows are validated against the official BukSU course naming conventions.</p>
        </div>
      </div>
      <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-surface-dark p-4">
        <div className="mt-1 text-primary">
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Data Privacy</p>
          <p className="text-xs leading-relaxed text-slate-400">Student data is encrypted and used only for internal organization purposes.</p>
        </div>
      </div>
    </div>
  );
}
