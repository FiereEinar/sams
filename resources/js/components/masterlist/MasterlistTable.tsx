import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import type { PaginatedStudents, Student } from '@/types/student';
import Dialog from '@/components/ui/Dialog';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import EditStudentForm from '@/components/forms/EditStudentForm';
import AddStudentButton from '@/components/buttons/AddStudentButton';

type Props = {
  students: PaginatedStudents;
};

export default function MasterlistTable({ students }: Props) {
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  });

  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      router.get('/masterlist', { search }, { preserveState: true, replace: true });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const data = students.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Student Masterlist</h2>
          <p className="text-base text-slate-400">
            {students.total} {students.total === 1 ? 'student' : 'students'} registered in the masterlist.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 !text-[20px] text-slate-500">
              search
            </span>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-surface-light py-2.5 pr-4 pl-10 text-sm text-slate-800 placeholder-slate-500 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 md:w-72 dark:border-slate-700 dark:bg-surface-dark dark:text-white"
            />
          </div>
          <AddStudentButton />
        </div>
      </div>

      {data.length === 0 ? (
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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light dark:border-white/5 dark:bg-surface-dark">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-slate-50 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-background-dark/50">
                <tr>
                  <th className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">Student ID</th>
                  <th className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">Last Name</th>
                  <th className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">First Name</th>
                  <th className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">Middle Name</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-center dark:border-slate-800">Sex</th>
                  <th className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">Course</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-center dark:border-slate-800">Year</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-center dark:border-slate-800">Units</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-center dark:border-slate-800">Section</th>
                  <th className="border-b border-slate-200 px-6 py-4 text-right dark:border-slate-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm dark:divide-white/5">
                {data.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={`transition-colors hover:bg-primary/5 dark:hover:bg-primary/5 ${idx % 2 === 0 ? 'dark:bg-card-dark/20' : 'dark:bg-card-dark/40'}`}
                  >
                    <td className="dark:text-primary-light px-4 py-3 font-mono font-medium">{s.student_id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{s.last_name}</td>
                    <td className="px-4 py-3 text-slate-800 dark:text-white">{s.first_name}</td>
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
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog
                          trigger={(open) => (
                            <button
                              onClick={open}
                              className="rounded-lg p-2 text-slate-400 transition-all hover:bg-primary/10 hover:text-primary"
                              title="Edit Student"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                          )}
                        >
                          {(close) => (
                            <div className="flex items-center justify-center">
                              <EditStudentForm student={s} close={close} />
                            </div>
                          )}
                        </Dialog>
                        <ConfirmDialog
                          title="Delete Student"
                          description={`Are you sure you want to delete ${s.first_name} ${s.last_name}?`}
                          confirmText="Delete"
                          onConfirm={(close) => {
                            router.delete(`/masterlist/${s.id}`, {
                              preserveScroll: true,
                              onSuccess: () => close(),
                            });
                          }}
                          trigger={(open) => (
                            <button
                              onClick={open}
                              className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-500"
                              title="Delete Student"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          )}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-surface-light p-6 dark:border-white/5 dark:bg-surface-dark">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              Showing {students.from || 0}-{students.to || 0} of {students.total} Students
            </span>
            <div className="flex flex-wrap gap-2">
              {students.links.map((link, index) => {
                const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                const isPrevious = link.label.includes('&laquo;');
                const isNext = link.label.includes('&raquo;');

                return (
                  <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => {
                      if (link.url) router.get(link.url, { search }, { preserveState: true });
                    }}
                    className={`rounded-lg p-2 text-sm transition-colors ${
                      link.active
                        ? 'border border-primary bg-primary font-bold text-white'
                        : !link.url
                          ? 'cursor-not-allowed border border-slate-200 text-slate-400 dark:border-slate-800'
                          : 'border border-slate-200 text-slate-400 hover:bg-slate-800 hover:text-white dark:border-slate-800'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: isPrevious
                        ? '<span class="material-symbols-outlined text-sm">chevron_left</span>'
                        : isNext
                          ? '<span class="material-symbols-outlined text-sm">chevron_right</span>'
                          : `<span class="px-1 font-bold">${label}</span>`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
