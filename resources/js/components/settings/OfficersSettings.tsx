import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function OfficersSettings() {
  const { props } = usePage();
  const tenantSettings = (props as any).tenantSettings || {};
  
  const [governor, setGovernor] = useState(tenantSettings.officers_governor || '');
  const [viceGovernor, setViceGovernor] = useState(tenantSettings.officers_vice_governor || '');
  const [treasurer, setTreasurer] = useState(tenantSettings.officers_treasurer || '');
  const [auditor, setAuditor] = useState(tenantSettings.officers_auditor || '');
  const [isSaving, setIsSaving] = useState(false);

  const saveOfficer = async (key: string, value: string) => {
    setIsSaving(true);
    try {
      router.put('/settings', { key, value }, { preserveScroll: true, preserveState: true });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <section id="settings-officers">
        <h2 className="mb-1 text-lg font-semibold">Organization Officers</h2>
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Set the current organization officers. These names will be recorded in transactions to maintain a historical record even after elections.
        </p>

        <div className="space-y-6">
          {/* Governor */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Governor / President</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={governor}
                onChange={(e) => setGovernor(e.target.value)}
                placeholder="Full Name"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
              <button
                onClick={() => saveOfficer('officers_governor', governor)}
                disabled={isSaving}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>

          {/* Vice Governor */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Vice Governor / Vice President</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={viceGovernor}
                onChange={(e) => setViceGovernor(e.target.value)}
                placeholder="Full Name"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
              <button
                onClick={() => saveOfficer('officers_vice_governor', viceGovernor)}
                disabled={isSaving}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>

          {/* Treasurer */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Treasurer</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={treasurer}
                onChange={(e) => setTreasurer(e.target.value)}
                placeholder="Full Name"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
              <button
                onClick={() => saveOfficer('officers_treasurer', treasurer)}
                disabled={isSaving}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>

          {/* Auditor */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Auditor</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={auditor}
                onChange={(e) => setAuditor(e.target.value)}
                placeholder="Full Name"
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
              <button
                onClick={() => saveOfficer('officers_auditor', auditor)}
                disabled={isSaving}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
