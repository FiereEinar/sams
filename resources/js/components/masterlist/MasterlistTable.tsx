import { useState } from 'react';
import type { Student } from '@/types/student';

type Props = {
  students: Student[];
};

export default function MasterlistTable({ students }: Props) {
  const [search, setSearch] = useState('');

  const filtered = students.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.student_id.toLowerCase().includes(q) ||
      s.last_name.toLowerCase().includes(q) ||
      s.first_name.toLowerCase().includes(q) ||
      (s.middle_name?.toLowerCase().includes(q) ?? false) ||
      (s.course?.toLowerCase().includes(q) ?? false) ||
      (s.section?.toLowerCase().includes(q) ?? false)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-white">Student Masterlist</h2>
          <p className="text-base text-slate-400">
            {students.length} {students.length === 1 ? 'student' : 'students'} registered in the masterlist.
          </p>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 !text-[20px] text-slate-500">
            search
          </span>
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-surface-dark py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 md:w-72"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-800 bg-surface-dark p-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-slate-800 text-slate-500">
            <span className="material-symbols-outlined !text-[32px]">school</span>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{search ? 'No students found' : 'No Students Yet'}</p>
            <p className="text-sm text-slate-400">{search ? 'Try a different search term.' : 'Import a masterlist to get started.'}</p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-surface-dark shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-primary text-xs font-bold tracking-wider text-white uppercase">
                <tr>
                  <th className="border-primary-dark/30 border-b px-4 py-3">Student ID</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3">Last Name</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3">First Name</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3">Middle Name</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">Sex</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3">Course</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">Year</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">Units</th>
                  <th className="border-primary-dark/30 border-b px-4 py-3 text-center">Section</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {filtered.map((s, idx) => (
                  <tr key={s.id} className={`transition-colors hover:bg-primary/5 ${idx % 2 === 0 ? 'bg-card-dark/20' : 'bg-card-dark/40'}`}>
                    <td className="text-primary-light px-4 py-3 font-mono font-medium">{s.student_id}</td>
                    <td className="px-4 py-3 font-semibold text-white">{s.last_name}</td>
                    <td className="px-4 py-3 text-white">{s.first_name}</td>
                    <td className="px-4 py-3 text-slate-400">{s.middle_name ?? '—'}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{s.sex ?? '—'}</td>
                    <td className="px-4 py-3 text-slate-400">{s.course ?? '—'}</td>
                    <td className="px-4 py-3 text-center">
                      {s.year ? (
                        <span className="text-primary-light rounded border border-primary/30 bg-primary/20 px-2 py-0.5 text-xs font-medium">
                          {s.year}
                        </span>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-400">{s.units ?? '—'}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{s.section ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-800 bg-slate-900/50 px-6 py-3">
            <p className="text-xs text-slate-400">
              Showing {filtered.length} of {students.length} students
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
