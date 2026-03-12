import { SignupFormValues, signupSchema } from '@/pages/Signup';
import { useForm } from '@inertiajs/react';

export function Step3Header() {
  return (
    <div className="border-b border-white/5 bg-slate-900/50 px-10 py-8">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full -translate-y-1/2 bg-slate-800"></div>
        <div className="absolute top-1/3 left-0 z-0 h-0.5 w-full origin-left -translate-y-1/2 bg-primary"></div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">
            <span className="material-symbols-outlined text-base">check</span>
          </div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Organization</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-complete flex size-10 items-center justify-center rounded-full border-2 font-bold">
            <span className="material-symbols-outlined text-base">check</span>
          </div>
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Admin Setup</span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <div className="step-active flex size-10 items-center justify-center rounded-full border-2 bg-surface-dark font-bold">3</div>
          <span className="text-xs font-bold tracking-wider text-white uppercase">Verification</span>
        </div>
      </div>
    </div>
  );
}

type Step3CardProps = {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  form: ReturnType<typeof useForm<SignupFormValues>>;
};

export default function Step3Card({ activeTab, setActiveTab, form }: Step3CardProps) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', form.data);
    const validationResult = signupSchema.safeParse(form.data);
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.issues);
      return;
    }

    setActiveTab(activeTab + 1);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-10 text-center">
      <div className="relative">
        <div className="absolute inset-0 scale-75 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="glow-envelope relative flex size-24 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10">
          <span className="material-symbols-outlined text-5xl text-primary">mark_email_unread</span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold tracking-tight">Check your inbox</h3>
        <p className="text-sm text-slate-400">
          We've sent a 6-digit code to
          <span className="font-semibold text-white">j.delacruz@buksu.edu.ph</span>
        </p>
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-8">
        <div className="flex justify-center gap-3">
          <input autoFocus className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <div className="w-2"></div>
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
          <input className="verification-input" maxLength={1} type="text" />
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-hover"
            type="submit"
          >
            <span>Verify and Finish</span>
            <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">task_alt</span>
          </button>
          <div className="flex items-center justify-between px-2">
            <button className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-primary" type="button">
              <span className="material-symbols-outlined text-base">refresh</span>
              Resend Code
            </button>
            <button className="flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-white" type="button">
              <span className="material-symbols-outlined text-base">edit</span>
              Change Email
            </button>
          </div>
        </div>
      </form>
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-slate-800/50 px-4 py-2">
          <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Awaiting input</span>
        </div>
      </div>
    </div>
  );
}
