type SidebarHeaderProps = {
  title: string;
  subtitle: string;
  icon: string;
  isHorizontal?: boolean;
};

export default function SidebarHeader({ title, subtitle, icon, isHorizontal }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${isHorizontal ? 'py-3 pr-6' : 'p-6'}`}>
      <div className={`flex items-center justify-center rounded-lg bg-primary text-white ${isHorizontal ? 'size-8' : 'size-10'}`}>
        <span className="material-symbols-outlined font-bold text-sm">{icon}</span>
      </div>
      <div>
        <h1 className={`${isHorizontal ? 'text-base' : 'text-lg'} leading-none font-bold`}>{title}</h1>
        {!isHorizontal && <p className="text-xs text-slate-500 dark:text-primary/70">{subtitle}</p>}
      </div>
    </div>
  );
}
