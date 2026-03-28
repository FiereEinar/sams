import { useRef } from 'react';

type Props = {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
  isCooldownActive?: boolean;
};

export default function ImportMasterlist({ onFileSelected, isUploading, isCooldownActive = false }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isCooldownActive) return;
    const file = e.target.files?.[0];
    if (file) {
      onFileSelected(file);
      e.target.value = '';
    }
  }

  function handleDrop(e: React.DragEvent) {
    if (isCooldownActive) return;
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelected(file);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    if (isCooldownActive) return;
    e.preventDefault();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-white">Import Masterlist</h2>
          <p className="text-base text-slate-400">Upload a CSV or Excel file to import your student masterlist.</p>
        </div>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`group flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed bg-[#111827] p-12 text-center transition-all ${
          isCooldownActive
            ? 'cursor-not-allowed border-slate-700 opacity-60'
            : isUploading
              ? 'border-primary/60 bg-primary/5'
              : 'cursor-pointer border-primary/40 hover:border-primary hover:bg-[#1e293b]/50'
        }`}
        onClick={() => !isUploading && !isCooldownActive && fileInputRef.current?.click()}
      >
        <div
          className={`flex size-16 items-center justify-center rounded-full text-primary ring-1 ring-primary/20 transition-transform ${isCooldownActive ? 'bg-slate-800 text-slate-500 ring-slate-700' : 'bg-primary/10 group-hover:scale-110'}`}
        >
          {isUploading ? (
            <span className="material-symbols-outlined animate-spin !text-[32px]">progress_activity</span>
          ) : isCooldownActive ? (
            <span className="material-symbols-outlined !text-[32px]">block</span>
          ) : (
            <span className="material-symbols-outlined !text-[32px]">cloud_upload</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white">
            {isCooldownActive ? 'Upload Unavailable' : isUploading ? 'Processing File...' : 'Upload New Masterlist'}
          </h3>
          <p className="max-w-md text-slate-400">
            {isCooldownActive
              ? 'Your basic plan cooldown is active.'
              : isUploading
                ? 'Parsing and validating your file. This may take a moment.'
                : 'Drag and drop your .csv or .xlsx file here, or click to browse. Ensure columns match the template.'}
          </p>
        </div>
        <button
          type="button"
          disabled={isUploading || isCooldownActive}
          className="hover:bg-primary-dark rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
        >
          Select File from Computer
        </button>
        <a
          href="/masterlist/import/template"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:bg-slate-800"
        >
          <span className="material-symbols-outlined !text-[18px]">download</span>
          Download Template
        </a>
        <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">Supports .csv and .xlsx • Max file size: 5MB</p>
        <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}
