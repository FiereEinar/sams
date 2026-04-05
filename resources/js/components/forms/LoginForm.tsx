import { useForm } from '@inertiajs/react';
import { SubmitEvent } from 'react';

export default function LoginForm() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/login');
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Organization Email</label>
        <div className="group relative">
          <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
            mail
          </span>
          <input
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-white/10 dark:bg-background-dark/50 dark:text-white dark:placeholder:text-slate-600"
            placeholder="orgname@buksu.edu.ph"
            type="email"
            name="email"
          />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <label className="ml-1 text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
        <div className="group relative">
          <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-primary">
            lock
          </span>
          <input
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            className="w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 dark:border-white/10 dark:bg-background-dark/50 dark:text-white dark:placeholder:text-slate-600"
            placeholder="••••••••"
            type="password"
          />
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="group flex cursor-pointer items-center gap-2">
          <input
            className="size-4 rounded border-slate-300 bg-white text-primary transition-all focus:ring-primary/50 focus:ring-offset-0 dark:border-white/10 dark:bg-background-dark/50"
            type="checkbox"
          />
          <span className="text-slate-600 transition-colors group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-300">Remember me</span>
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
