import { useEffect, useState } from 'react';

/**
 * A global overlay banner that shows when a system update is in progress.
 * Reads from sessionStorage so the state persists across Inertia page navigations.
 */
export default function UpdateOverlay() {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsUpdating(sessionStorage.getItem('system_updating') === 'true');
    };

    check();

    // Listen for custom event dispatched when update state changes
    window.addEventListener('system-update-state', check);

    // Also poll sessionStorage in case the event is missed
    const interval = setInterval(check, 1000);

    return () => {
      window.removeEventListener('system-update-state', check);
      clearInterval(interval);
    };
  }, []);

  if (!isUpdating) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-primary to-primary/90 px-4 py-2.5 shadow-lg shadow-primary/20">
      <span className="material-symbols-outlined animate-spin text-lg text-white">progress_activity</span>
      <span className="text-sm font-semibold text-white">System update in progress — please do not close this window</span>
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/75" />
        <span className="relative inline-flex size-2 rounded-full bg-white" />
      </span>
    </div>
  );
}

/** Call this to signal update started */
export function setUpdating(value: boolean): void {
  if (value) {
    sessionStorage.setItem('system_updating', 'true');
  } else {
    sessionStorage.removeItem('system_updating');
  }
  window.dispatchEvent(new Event('system-update-state'));
}
