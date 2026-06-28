import { SidebarPosition, useTheme } from '@/hooks/use-theme';
import { usePage } from '@inertiajs/react';

export default function LayoutSettings() {
  const { props } = usePage();
  const userPermissions: string[] = (props as any).userPermissions || [];

  const canEditLayout = userPermissions.includes('SETTINGS_LAYOUT_UPDATE');

  const { sidebarPosition, setSidebarPosition, topbarVisibility, setTopbarVisibility, topbarMenu, setTopbarMenu, sidebarName } = useTheme();

  return (
    <div className="animate-in space-y-10 duration-300 fade-in slide-in-from-bottom-2">
      {!canEditLayout && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">lock</span>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">You don't have permission to change layout settings.</p>
        </div>
      )}
      <div className={!canEditLayout ? 'pointer-events-none opacity-60' : ''}>
        {/* Layout Configuration */}
        <section id="settings-layout">
          <h2 className="mb-1 text-lg font-semibold">Layout</h2>
          <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">Customize the placement of your navigation menu and topbar.</p>

          <div className="space-y-6">
            {/* Sidebar Position */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Sidebar Position</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(['left', 'right', 'top', 'bottom'] as SidebarPosition[]).map((pos) => {
                  const isActive = sidebarPosition === pos;
                  return (
                    <button
                      key={pos}
                      onClick={() => setSidebarPosition(pos)}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                        isActive
                          ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {pos === 'left'
                          ? 'dock_to_left'
                          : pos === 'right'
                            ? 'dock_to_right'
                            : pos === 'top'
                              ? 'vertical_align_top'
                              : 'vertical_align_bottom'}
                      </span>
                      <span className="capitalize">{pos}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topbar Visibility */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Topbar Visibility</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setTopbarVisibility('visible')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    topbarVisibility === 'visible'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  <span>Visible</span>
                </button>
                <button
                  onClick={() => setTopbarVisibility('hidden')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    topbarVisibility === 'hidden'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">visibility_off</span>
                  <span>Hidden</span>
                </button>
              </div>
            </div>

            {/* Topbar Menu Visibility */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Show Menu in Topbar</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setTopbarMenu('visible')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    topbarMenu === 'visible'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setTopbarMenu('hidden')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    topbarMenu === 'hidden'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
