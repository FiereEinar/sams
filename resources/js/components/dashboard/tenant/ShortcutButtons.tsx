import { Link, usePage } from '@inertiajs/react';

export default function ShortcutButtons() {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];

  const canImport = userPermissions.includes('MASTERLIST_IMPORT');
  const canCreateEvent = userPermissions.includes('EVENTS_CREATE');

  if (!canImport && !canCreateEvent) return null;

  return (
    <div className="flex gap-3">
      {canImport && (
        <Link
          href="/masterlist"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-surface-light px-5 py-2.5 font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/5 dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-white/5"
        >
          <span className="material-symbols-outlined text-lg">upload_file</span>
          <span>Import Masterlist</span>
        </Link>
      )}
      {canCreateEvent && (
        <Link
          href="/events"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Create Event</span>
        </Link>
      )}
    </div>
  );
}
