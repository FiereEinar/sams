import { Link, usePage, router } from '@inertiajs/react';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from '../SidebarHeader';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useTheme } from '@/hooks/use-theme';

const allSidebarLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    permission: 'DASHBOARD_VIEW',
  },
  {
    title: 'Events',
    href: '/events',
    icon: 'calendar_today',
    permission: 'EVENTS_VIEW',
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: 'how_to_reg',
    permission: 'ATTENDANCE_VIEW',
  },
  {
    title: 'Masterlist',
    href: '/masterlist',
    icon: 'groups',
    permission: 'MASTERLIST_VIEW',
  },
  {
    title: 'Users',
    href: '/users',
    icon: 'person',
    permission: 'USERS_VIEW',
  },
  {
    title: 'Roles',
    href: '/roles',
    icon: 'admin_panel_settings',
    permission: 'ROLES_VIEW',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'settings',
    permission: 'SETTINGS_VIEW',
  },
];

export default function Sidebar() {
  const { url, props } = usePage();
  const { sidebarPosition, isSidebarCollapsed, sidebarLogoType, sidebarLogoIcon, sidebarLogoImage, sidebarName } = useTheme();

  const organizationName = (props as any).tenantOrganizationName || 'My Organization';
  const university = (props as any).tenantUniversity || 'University';
  const userPermissions: string[] = (props as any).userPermissions || [];

  const displayName = sidebarName || organizationName;

  // Filter links by user permissions
  const sidebarLinks = allSidebarLinks.filter((link) => userPermissions.includes(link.permission));

  if (isSidebarCollapsed) return null;

  const isVertical = sidebarPosition === 'left' || sidebarPosition === 'right';
  const isHorizontal = !isVertical;

  let asideClasses = "shrink-0 border-slate-200 bg-background-light dark:border-white/10 dark:bg-background-dark ";
  
  if (isVertical) {
    asideClasses += "sticky top-0 flex h-screen w-72 flex-col ";
    asideClasses += sidebarPosition === 'left' ? "border-r" : "border-l";
  } else {
    asideClasses += sidebarPosition === 'top' 
      ? "sticky top-0 z-50 border-b flex flex-row items-center w-full px-4 overflow-x-auto custom-scrollbar" 
      : "sticky bottom-0 z-50 border-t flex flex-row items-center w-full px-4 overflow-x-auto custom-scrollbar";
  }

  return (
    <aside className={asideClasses}>
      <SidebarHeader
        icon={sidebarLogoIcon}
        title={displayName}
        subtitle={university}
        logoType={sidebarLogoType}
        logoImageUrl={sidebarLogoImage}
        isHorizontal={isHorizontal}
      />

      <nav className={isVertical ? "flex-1 space-y-1 px-4" : "flex flex-row items-center gap-2 mx-auto"}>
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.title} {...link} isActive={url.startsWith(link.href)} isHorizontal={isHorizontal} />
        ))}
      </nav>

      {isVertical ? (
        <>
          <div className="px-4 pb-2">
            <ConfirmDialog
              title="Log Out"
              description="Are you sure you want to log out of your account?"
              confirmText="Log Out"
              onConfirm={() => router.post('/logout')}
              trigger={(open) => (
                <button
                  onClick={open}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-red-100 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              )}
            />
          </div>
          <SidebarFooter />
        </>
      ) : (
        <div className="pl-4 ml-auto">
          <ConfirmDialog
            title="Log Out"
            description="Are you sure you want to log out of your account?"
            confirmText="Log Out"
            onConfirm={() => router.post('/logout')}
            trigger={(open) => (
              <button
                onClick={open}
                className="flex items-center justify-center rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-red-100 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                title="Log Out"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            )}
          />
        </div>
      )}
    </aside>
  );
}

type SidebarLinkProps = {
  title: string;
  icon: string;
  href: string;
  isActive: boolean;
  isHorizontal?: boolean;
};

export function SidebarLink({ title, icon, href, isActive, isHorizontal }: SidebarLinkProps) {
  return (
    <Link
      className={`${isActive ? 'bg-primary/10 !text-primary' : ''} flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-primary/10 ${isHorizontal ? 'whitespace-nowrap' : ''}`}
      href={href}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}
