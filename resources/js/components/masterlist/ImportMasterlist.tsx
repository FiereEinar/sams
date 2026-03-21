export default function ImportMasterlist() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-white">Student Masterlist</h2>
          <p className="text-base text-slate-400">Import and manage the official list of students for your organization.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-slate-800">
            <span className="material-symbols-outlined !text-[18px]">download</span>
            Download Template
          </button>
        </div>
      </div>
      <div className="group flex cursor-pointer flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-blue-500/40 bg-[#111827] p-12 text-center transition-all hover:border-primary hover:bg-[#1e293b]/50">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined !text-[32px]">cloud_upload</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white">Upload New Masterlist</h3>
          <p className="max-w-md text-slate-400">
            Drag and drop your .csv or .xlsx file here, or click to browse. Ensure columns match the template.
          </p>
        </div>
        <button className="hover:bg-primary-dark rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all">
          Select File from Computer
        </button>
        <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Max file size: 5MB</p>
      </div>
    </div>
  );
}
