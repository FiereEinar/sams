export default function TrustedBy() {
  return (
    <div className="mt-8 flex items-center gap-6">
      <div className="flex -space-x-3">
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-xs font-bold dark:border-background-dark dark:bg-slate-800">
          SC
        </div>
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-xs font-bold dark:border-background-dark dark:bg-slate-800">
          SSG
        </div>
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-xs font-bold dark:border-background-dark dark:bg-slate-800">
          ITS
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500">Trusted by 50+ organizations</p>
    </div>
  );
}
