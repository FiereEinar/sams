export default function EngagementTrends() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-surface-light p-6 lg:col-span-2 dark:border-white/5 dark:bg-surface-dark">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold">Engagement Trends</h4>
          <p className="text-sm text-slate-500">Student participation over the last 7 days</p>
        </div>
        <select className="rounded-lg border-none bg-slate-100 py-1.5 text-xs font-bold text-slate-900 focus:ring-0 dark:bg-background-dark dark:text-slate-300">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="relative mt-4 h-60 w-full">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 150">
          <defs>
            <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3"></stop>
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path d="M0,120 Q50,110 80,70 T160,40 T240,90 T320,30 T400,50 L400,150 L0,150 Z" fill="url(#gradient)"></path>
          <path
            d="M0,120 Q50,110 80,70 T160,40 T240,90 T320,30 T400,50"
            fill="none"
            stroke="var(--color-primary)"
            strokeLinecap="round"
            strokeWidth="3"
          ></path>
          <line stroke="currentColor" strokeOpacity="0.05" x1="0" x2="0" y1="0" y2="150"></line>
          <line stroke="currentColor" strokeOpacity="0.05" x1="80" x2="80" y1="0" y2="150"></line>
          <line stroke="currentColor" strokeOpacity="0.05" x1="160" x2="160" y1="0" y2="150"></line>
          <line stroke="currentColor" strokeOpacity="0.05" x1="240" x2="240" y1="0" y2="150"></line>
          <line stroke="currentColor" strokeOpacity="0.05" x1="320" x2="320" y1="0" y2="150"></line>
          <line stroke="currentColor" strokeOpacity="0.05" x1="400" x2="400" y1="0" y2="150"></line>
        </svg>
        <div className="mt-4 flex justify-between px-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
