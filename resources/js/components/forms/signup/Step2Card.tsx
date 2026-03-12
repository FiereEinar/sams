import { useToast } from '@/hooks/use-toast';
import { SignupFormValues, signupSchema } from '@/pages/Signup';
import { useForm } from '@inertiajs/react';
import _ from 'lodash';

export function Step2Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-1/2 -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">1</div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">2</div>
          <span className="text-xs font-bold tracking-wider text-white uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-pending flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

type Step2CardProps = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  form: ReturnType<typeof useForm<SignupFormValues>>;
};

export default function Step2Card({ activeTab, setActiveTab, form }: Step2CardProps) {
  const { data, setData, post, processing, errors } = form;
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', data);
    const validationResult = signupSchema.safeParse(data);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      const input = issue.path.join(' ');
      const message = issue.message;
      const errorMessage = _.startCase(`${input} ${message}`);
      console.error('Validation errors:', errorMessage);
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: errorMessage,
      });
      return;
    }

    setActiveTab(activeTab + 1);
  };

  return (
    <div className="space-y-8 p-10">
      <div>
        <h3 className="text-2xl font-bold">Admin Account Setup</h3>
        <p className="mt-1 text-sm text-slate-400">Create the primary administrator account for your organization.</p>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">person</span>
              <input
                value={data.admin.fullname}
                onChange={(e) => setData('admin', { ...data.admin, fullname: e.target.value })}
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="Juan Dela Cruz"
                type="text"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Student Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">mail</span>
              <input
                value={data.admin.email}
                onChange={(e) => setData('admin', { ...data.admin, email: e.target.value })}
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="juan.dc@buksu.edu.ph"
                type="email"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">lock</span>
              <input
                value={data.admin.password}
                onChange={(e) => setData('admin', { ...data.admin, password: e.target.value })}
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">key</span>
              <input
                value={data.admin.confirmPassword}
                onChange={(e) => setData('admin', { ...data.admin, confirmPassword: e.target.value })}
                className="w-full rounded-xl border-white/10 bg-background-dark py-3.5 pl-12 text-sm text-white transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4">
          <span className="material-symbols-outlined mt-0.5 text-primary">info</span>
          <p className="text-xs leading-relaxed text-slate-300">
            By creating this account, you agree that you are an authorized representative of your organization. All activities will be logged and
            subject to BukSU IT policies.
          </p>
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setActiveTab(activeTab - 1)}
            className="flex items-center gap-2 px-6 py-3 font-bold text-slate-400 transition-colors hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Previous Step</span>
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
            type="button"
          >
            <span>Complete Registration</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
}
