import { useForm } from '@inertiajs/react';

export default function LoginForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
  });

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-300">Organization Email</label>
        <div className="group relative">
          <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
            mail
          </span>
          <input
            className="w-full rounded-2xl border-white/10 bg-background-dark/50 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
            placeholder="orgname@buksu.edu.ph"
            type="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-300">Password</label>
        <div className="group relative">
          <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
            lock
          </span>
          <input
            className="w-full rounded-2xl border-white/10 bg-background-dark/50 py-3.5 pr-4 pl-12 text-white transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/50"
            placeholder="••••••••"
            type="password"
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="group flex cursor-pointer items-center gap-2">
          <input
            className="size-4 rounded border-white/10 bg-background-dark/50 text-primary transition-all focus:ring-primary/50 focus:ring-offset-0"
            type="checkbox"
          />
          <span className="text-slate-400 transition-colors group-hover:text-slate-300">Remember me</span>
        </label>
        <a className="font-semibold text-primary transition-colors hover:text-primary-hover" href="#">
          Forgot Password?
        </a>
      </div>
      <button
        className="group mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover"
        type="submit"
      >
        <span>Sign In</span>
        <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
      </button>
    </form>
  );
}
