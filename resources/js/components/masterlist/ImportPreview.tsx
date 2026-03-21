export default function ImportPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="material-symbols-outlined text-primary">visibility</span>
          Import Preview
        </h4>
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
          <span className="text-xs font-medium text-slate-400">Ready to import 1,240 records</span>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-surface-dark shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-primary text-xs font-bold tracking-wider text-white uppercase">
              <tr>
                <th className="border-primary-dark/30 border-b px-6 py-4">Student ID</th>
                <th className="border-primary-dark/30 border-b px-6 py-4">Full Name</th>
                <th className="border-primary-dark/30 border-b px-6 py-4">Course</th>
                <th className="border-primary-dark/30 border-b px-6 py-4 text-center">Year Level</th>
                <th className="border-primary-dark/30 border-b px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              <tr className="bg-card-dark/20 transition-colors hover:bg-primary/5">
                <td className="text-primary-light px-6 py-4 font-mono font-medium">2021-00124</td>
                <td className="px-6 py-4 font-semibold text-white">Dela Cruz, Juan Pedro</td>
                <td className="px-6 py-4 text-slate-400">BS Information Technology</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-primary-light rounded border border-primary/30 bg-primary/20 px-2 py-1 text-xs font-medium">3rd Year</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 transition-colors hover:text-red-400">
                    <span className="material-symbols-outlined !text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
              <tr className="bg-card-dark/40 transition-colors hover:bg-primary/5">
                <td className="text-primary-light px-6 py-4 font-mono font-medium">2022-04591</td>
                <td className="px-6 py-4 font-semibold text-white">Santos, Maria Clara</td>
                <td className="px-6 py-4 text-slate-400">BS Computer Science</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-primary-light rounded border border-primary/30 bg-primary/20 px-2 py-1 text-xs font-medium">2nd Year</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 transition-colors hover:text-red-400">
                    <span className="material-symbols-outlined !text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
              <tr className="bg-card-dark/20 transition-colors hover:bg-primary/5">
                <td className="text-primary-light px-6 py-4 font-mono font-medium">2020-00832</td>
                <td className="px-6 py-4 font-semibold text-white">Bautista, Jose Gabriel</td>
                <td className="px-6 py-4 text-slate-400">BS Information Technology</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-primary-light rounded border border-primary/30 bg-primary/20 px-2 py-1 text-xs font-medium">4th Year</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 transition-colors hover:text-red-400">
                    <span className="material-symbols-outlined !text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/50 px-6 py-4">
          <p className="text-xs text-slate-400">Showing 3 of 1,240 records</p>
          <div className="flex gap-4">
            <button className="text-sm font-bold text-slate-400 transition-colors hover:text-white">Cancel</button>
            <button className="hover:text-primary-light text-sm font-bold text-primary transition-all">Confirm Import</button>
          </div>
        </div>
      </div>
    </div>
  );
}
