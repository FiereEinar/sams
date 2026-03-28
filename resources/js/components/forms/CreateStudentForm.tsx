import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';
import { useToast } from '@/hooks/use-toast';

type CreateStudentFormProps = {
  close: () => void;
};

export default function CreateStudentForm({ close }: CreateStudentFormProps) {
  const { toast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    student_id: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    sex: '',
    course: '',
    year: '',
    units: '',
    section: '',
  });

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/masterlist', {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Student created successfully.',
        });
        reset();
        close();
      },
    });
  }

  return (
    <div className="modal-glow flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl dark:border-white/5 dark:bg-surface-dark">
      <header className="flex items-center justify-between border-b border-slate-200 px-8 py-6 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary">person_add</span>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-white">Add New Student</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">BukSU Student Attendance System</p>
          </div>
        </div>
        <button onClick={close} className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>
      <div className="custom-scrollbar max-h-[80vh] overflow-y-auto p-8">
        <form id="create-student-form" onSubmit={submit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Column 1: Personal Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Student ID *</label>
              <input
                value={data.student_id}
                onChange={(e) => setData('student_id', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. 2024-0001"
                type="text"
                required
              />
              {errors.student_id && <p className="text-sm text-red-500">{errors.student_id}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">First Name *</label>
              <input
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="First Name"
                type="text"
                required
              />
              {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Last Name *</label>
              <input
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="Last Name"
                type="text"
                required
              />
              {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Middle Name</label>
              <input
                value={data.middle_name}
                onChange={(e) => setData('middle_name', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="Middle Name"
                type="text"
              />
              {errors.middle_name && <p className="text-sm text-red-500">{errors.middle_name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Sex</label>
              <select
                value={data.sex}
                onChange={(e) => setData('sex', e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.sex && <p className="text-sm text-red-500">{errors.sex}</p>}
            </div>
          </div>

          {/* Column 2: Academic Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Course / Program</label>
              <input
                value={data.course}
                onChange={(e) => setData('course', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. BSIT"
                type="text"
              />
              {errors.course && <p className="text-sm text-red-500">{errors.course}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Year Level</label>
              <input
                value={data.year}
                onChange={(e) => setData('year', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. 1"
                type="text"
              />
              {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Section</label>
              <input
                value={data.section}
                onChange={(e) => setData('section', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. A"
                type="text"
              />
              {errors.section && <p className="text-sm text-red-500">{errors.section}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Units</label>
              <input
                value={data.units}
                onChange={(e) => setData('units', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. 21"
                type="text"
              />
              {errors.units && <p className="text-sm text-red-500">{errors.units}</p>}
            </div>
          </div>
        </form>
      </div>
      <footer className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-6 dark:border-white/5 dark:bg-background-dark">
        <button
          onClick={close}
          disabled={processing}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="create-student-form"
          disabled={processing}
          className="flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {processing ? (
            <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          )}
          Create Student
        </button>
      </footer>
    </div>
  );
}
