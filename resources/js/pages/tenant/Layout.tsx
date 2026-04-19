import Sidebar from '@/components/sidebars/tenant/Sidebar';
import Topbar from '@/components/topbar/tenant/Topbar';
import { PropsWithChildren } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { UpdateProvider, useUpdate } from '@/hooks/use-update';

function LayoutInner({ children }: PropsWithChildren) {
  const { sidebarPosition, topbarVisibility } = useTheme();
  const { isUpdating } = useUpdate();

  let containerClass = "flex min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-white ";
  if (sidebarPosition === 'left') containerClass += "flex-row";
  if (sidebarPosition === 'right') containerClass += "flex-row-reverse";
  if (sidebarPosition === 'top') containerClass += "flex-col";
  if (sidebarPosition === 'bottom') containerClass += "flex-col"; // Wait, for bottom we probably want flex-col but render Sidebar AFTER main

  return (
    <div className={containerClass}>
      {sidebarPosition !== 'bottom' && <Sidebar />}
      
      <main className="flex min-w-0 flex-1 flex-col bg-background-light dark:bg-background-dark">
        {topbarVisibility === 'visible' && <Topbar />}
        <div className="space-y-8 overflow-y-auto p-8 flex-1">{children}</div>
      </main>

      {sidebarPosition === 'bottom' && <Sidebar />}

      {/* System Update Overlay */}
      {isUpdating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative flex size-24 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
              <span className="material-symbols-outlined text-4xl text-primary">system_update_alt</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">System Update in Progress</h2>
              <p className="mt-3 max-w-md text-sm text-slate-300">
                Please do not close or navigate away from this page. The system is being updated and will be available shortly.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
              <span className="material-symbols-outlined text-lg text-amber-400">warning</span>
              <span className="text-sm font-medium text-amber-300">Do not perform any actions while updating</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <UpdateProvider>
      <LayoutInner>{children}</LayoutInner>
    </UpdateProvider>
  );
}
