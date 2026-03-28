import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';

type CreateEventFormProps = {
  close: () => void;
};

export default function CreateEventForm({ close }: CreateEventFormProps) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    venue: '',
    start_at: '',
    end_at: '',
  });

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(data);
    // return;
    post('/events');
  }

  return (
    <div className="modal-glow flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl dark:border-white/5 dark:bg-surface-dark">
      <header className="flex items-center justify-between border-b border-slate-200 px-8 py-6 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-primary">calendar_add_on</span>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-white">Create New Event</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">BukSU Student Attendance System</p>
          </div>
        </div>
        <button onClick={close} className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>
      <div className="max-h-[80vh] overflow-y-auto p-8">
        <form id="create-event-form" onSubmit={submit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Event Name</label>
              <input
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="e.g. Annual Student Convocation"
                type="text"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                placeholder="Describe the purpose and agenda of the event..."
                rows={4}
              ></textarea>
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Venue</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-400">location_on</span>
                <input
                  value={data.venue}
                  onChange={(e) => setData('venue', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pr-4 pl-10 text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
                  placeholder="e.g. University Gymnasium"
                  type="text"
                />
                {errors.venue && <p className="text-sm text-red-500">{errors.venue}</p>}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Start Date &amp; Time</label>
                <input
                  value={data.start_at}
                  onChange={(e) => setData('start_at', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 scheme-dark transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white"
                  type="datetime-local"
                />
                {errors.start_at && <p className="text-sm text-red-500">{errors.start_at}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">End Date &amp; Time</label>
                <input
                  value={data.end_at}
                  onChange={(e) => setData('end_at', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-900 scheme-dark transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white"
                  type="datetime-local"
                />
                {errors.end_at && <p className="text-sm text-red-500">{errors.end_at}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Attendance Method</label>
              <select className="w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white">
                <option value="barcode">Barcode / QR Scan</option>
                <option value="manual">Manual Entry</option>
                <option value="hybrid">Hybrid Method</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Event Poster (Optional)</label>
              <div className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-colors hover:border-primary dark:border-white/5 dark:bg-white/5 dark:hover:border-primary">
                <span className="material-symbols-outlined text-3xl text-slate-400 transition-colors group-hover:text-primary">upload_file</span>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag and drop</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">PNG, JPG up to 5MB</p>
                </div>
                <input className="hidden" type="file" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <footer className="flex items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-6 dark:border-white/5 dark:bg-background-dark">
        <button
          onClick={close}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="create-event-form"
          className="flex items-center gap-2 rounded-lg bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          Create Event
        </button>
      </footer>
    </div>
  );
}
