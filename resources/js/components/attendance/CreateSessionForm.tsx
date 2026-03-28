import { ReactNode } from 'react';
import { router } from '@inertiajs/react';
import Dialog from '../ui/Dialog';

interface CreateSessionFormProps {
  eventId: number;
  trigger: (open: () => void) => ReactNode;
}

export default function CreateSessionForm({ eventId, trigger }: CreateSessionFormProps) {
  return (
    <Dialog trigger={trigger}>
      {(close) => {
        let sessionName = '';

        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!sessionName.trim()) return;

          router.post(
            `/events/${eventId}/sessions`,
            { name: sessionName },
            {
              onSuccess: () => close(),
            },
          );
        };

        return (
          <div className="modal-glow flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl md:w-md dark:border-white/5 dark:bg-surface-dark">
            <header className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <span className="material-symbols-outlined text-primary">add_circle</span>
                </div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">New Session</h2>
              </div>
              <button onClick={() => close()} className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </header>
            <form onSubmit={handleSubmit} className="flex-1 px-6 pb-6">
              <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">Session Name</label>
              <input
                type="text"
                placeholder="e.g., Morning Entry, Afternoon Session"
                onChange={(e) => (sessionName = e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/5 dark:bg-background-dark dark:text-white dark:placeholder:text-slate-500"
              />
            </form>
            <footer className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/5 dark:bg-background-dark">
              <button onClick={() => close()} type="button" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/5">
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  const form = (e.target as HTMLElement).closest('div')?.querySelector('form');
                  form?.requestSubmit();
                }}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                Create Session
              </button>
            </footer>
          </div>
        );
      }}
    </Dialog>
  );
}
