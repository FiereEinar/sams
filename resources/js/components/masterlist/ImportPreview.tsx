import type { ImportPreviewData } from '@/types/student';

type Props = {
  data: ImportPreviewData;
  onConfirm: () => void;
  onCancel: () => void;
  isImporting: boolean;
};

const COLUMN_ORDER = ['student_id', 'last_name', 'first_name', 'middle_name', 'sex', 'course', 'year', 'units', 'section'] as const;

const STATUS_STYLES: Record<string, { row: string; badge: string; label: string }> = {
  valid: {
    row: 'bg-card-dark/20 hover:bg-primary/5',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Valid',
  },
  invalid: {
    row: 'bg-red-500/5 hover:bg-red-500/10',
    badge: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'Invalid',
  },
  duplicate: {
    row: 'bg-amber-500/5 hover:bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Duplicate',
  },
};

export default function ImportPreview({ data, onConfirm, onCancel, isImporting }: Props) {
  const visibleColumns = COLUMN_ORDER.filter((col) => col in data.detected_headers);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="material-symbols-outlined text-primary">visibility</span>
          Import Preview
        </h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
            <span className="text-xs font-medium text-slate-400">
              <span className="font-bold text-emerald-400">{data.summary.valid}</span> valid
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            <span className="text-xs font-medium text-slate-400">
              <span className="font-bold text-red-400">{data.summary.invalid}</span> invalid
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
            <span className="text-xs font-medium text-slate-400">
              <span className="font-bold text-amber-400">{data.summary.duplicate}</span> duplicate
            </span>
          </div>
        </div>
      </div>

      {/* Detected Columns */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500">Detected columns:</span>
        {visibleColumns.map((col) => (
          <span key={col} className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {data.detected_headers[col]}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-surface-dark shadow-2xl">
        <div className="overflow-x-auto">
          {/* Scrollable table body with 5-row height */}
          <div className="custom-scrollbar max-h-[480px] overflow-y-auto">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-primary text-xs font-bold tracking-wider text-white uppercase">
                <tr>
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">#</th>
                  {visibleColumns.map((col) => (
                    <th key={col} className="border-primary-dark/30 border-b px-4 py-3">
                      {data.detected_headers[col]}
                    </th>
                  ))}
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {data.rows.map((row, idx) => {
                  const style = STATUS_STYLES[row.status] ?? STATUS_STYLES.valid;
                  return (
                    <tr key={idx} className={`transition-colors ${style.row}`}>
                      <td className="px-4 py-3 text-center font-mono text-xs text-slate-500">{row.row_number}</td>
                      {visibleColumns.map((col) => (
                        <td key={col} className="px-4 py-3 text-slate-300">
                          {row.data[col] ?? <span className="text-slate-600">—</span>}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${style.badge}`}>{style.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/50 px-6 py-4">
          <p className="text-xs text-slate-400">
            {data.rows.length} total rows • {data.summary.valid} ready to import
          </p>
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              disabled={isImporting}
              className="text-sm font-bold text-slate-400 transition-colors hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isImporting || data.summary.valid === 0}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover disabled:opacity-50"
            >
              {isImporting ? (
                <>
                  <span className="material-symbols-outlined animate-spin !text-[16px]">progress_activity</span>
                  Importing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined !text-[16px]">check_circle</span>
                  Confirm Import ({data.summary.valid})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
