import { SignupFormValues } from '@/pages/Signup';
import { useForm } from '@inertiajs/react';

export function Step1Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-0 -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">1</div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">2</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

type Step1CardProps = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  form: ReturnType<typeof useForm<SignupFormValues>>;
};

export default function Step1Card({ activeTab, setActiveTab, form }: Step1CardProps) {
  const { data, setData, post, processing, errors } = form;

  return (
    <div className="space-y-8 p-10">
      <div>
        <h3 className="text-2xl font-bold">Organization Details</h3>
        <p className="mt-1 text-sm text-slate-400">Provide the primary identification details for your organization.</p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">groups</span>
              <input
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="BukSU Computer Studies Society"
                type="text"
                value={data.organization.name}
                onChange={(e) => setData('organization', { ...data.organization, name: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Type</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">category</span>
              <select
                value={data.organization.type}
                onChange={(e) => setData('organization', { ...data.organization, type: e.target.value as SignupFormValues['organization']['type'] })}
                className="w-full appearance-none rounded-xl border-white/10 bg-background-dark py-3.5 pr-10 pl-12 text-sm text-white transition-all"
              >
                <option disabled={undefined} selected={undefined} value="">
                  Select type...
                </option>
                <option value="college-club">College Club</option>
                <option value="departmental">Departmental Organization</option>
                <option value="society">Academic Society</option>
                <option value="interest">Interest-based Group</option>
                <option value="council">Student Council</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Organization Subdomain</label>
          <div className="flex items-center gap-0">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">link</span>
              <input
                value={data.organization.subdomain}
                onChange={(e) => setData('organization', { ...data.organization, subdomain: e.target.value })}
                className="w-full rounded-l-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="my-org"
                type="text"
              />
            </div>
            <div className="rounded-r-xl border-y border-r border-white/10 bg-slate-800 px-4 py-3.5 text-sm font-medium text-slate-400">
              .buksu-sams.com
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 px-1">
            <span className="text-[11px] text-slate-500">Your portal will be available at:</span>
            <span className="text-[11px] font-bold text-primary">{data.organization.subdomain || 'my-org'}.buksu-sams.com</span>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4">
          <span className="material-symbols-outlined mt-0.5 text-primary">help_outline</span>
          <p className="text-xs leading-relaxed text-slate-300">
            The subdomain is unique to your organization. It will be the address students use to access your specific events and attendance logs.
          </p>
        </div>
        <div className="flex items-center justify-end pt-4">
          <button
            onClick={() => setActiveTab(activeTab + 1)}
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            type="button"
          >
            <span>Next Step: Admin Setup</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
