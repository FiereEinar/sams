import Sidebar from '@/components/sidebars/tenant/Sidebar';
import Topbar from '@/components/topbar/tenant/Topbar';
import { PropsWithChildren } from 'react';
import { useTheme } from '@/hooks/use-theme';

export default function Layout({ children }: PropsWithChildren) {
  const { sidebarPosition, topbarVisibility } = useTheme();

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
    </div>
  );
}
