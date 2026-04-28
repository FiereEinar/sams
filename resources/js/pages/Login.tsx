import LoginForm from '@/components/forms/LoginForm';
import TrustedBy from '@/components/TrustedBy';
import { Tenant } from '@/types/tenant';

type LoginPageProps = {
  tenant?: Tenant;
};

export default function LoginPage({ tenant }: LoginPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-background-light text-slate-900 dark:bg-background-dark dark:text-white">
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
      <div className="pointer-events-none fixed right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"></div>
      <div className="relative z-10 mx-4 flex h-175 w-full max-w-6xl overflow-hidden lg:mx-auto lg:rounded-3xl lg:shadow-2xl lg:shadow-black/50">
        <LeftCard tenant={tenant} />
        <div className="flex w-full flex-col justify-center border-l border-slate-200 bg-white/50 p-8 backdrop-blur-xl dark:border-white/5 dark:bg-surface-dark/50 md:p-16 lg:w-1/2">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined font-bold">account_balance</span>
              </div>
              <h1 className="text-xl font-bold">SAMS</h1>
            </div>
            <div className="mb-10">
              <h3 className="mb-2 text-3xl font-bold">Welcome Back</h3>
              <p className="text-slate-500 dark:text-slate-400">Please sign in to your organization account.</p>
            </div>

            <LoginForm />

            <div className="mt-12 text-center">
              <p className="text-sm text-slate-500">
                New organization?
                <a className="ml-1 font-bold text-primary transition-colors hover:text-primary-hover" href="/signup">
                  Create an Account
                </a>
              </p>
            </div>
          </div>
          <div className="mt-auto pt-8 text-center lg:text-left">
            <p className="text-center text-[10px] font-bold tracking-widest text-slate-600 uppercase">
              © 2024 SAMS • Student Attendance Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftCard({ tenant }: { tenant?: Tenant }) {
  return (
    <div className="relative hidden flex-col justify-end overflow-hidden bg-slate-100 p-12 dark:bg-slate-900 lg:flex lg:w-1/2">
      <div className="absolute inset-0 opacity-40">
        <img
          alt="Campus Collaboration"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX9E5D2WEuaBL8lcWCWAsfMBu40Y_QyL3IRGP-oBxhu3kIAhDIkNeKzNHKmNNP5isFrWg9qkNfJrsWjCZQGuaG31yhDvMkeA4I9_1QSKbxmmBDbwNpw8gD2esReENDApsCJlT5_QTwaFrBfuxs_0dEJrVL8G8NporV9T3pZ6GJj3eScBUTcGJG0Xaw3KZHziMZf85xkvNpKmduowChj1v0DhihA7ANH2LbYXdl-UC0yCL49QZC7rthpoObsCxm3Iz75MkO-du50VhG"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background-light via-background-light/40 to-transparent dark:from-background-dark dark:via-background-dark/40"></div>
      </div>
      <div className="absolute top-12 left-12 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
        </div>
        <div>
          <h1 className="text-xl leading-none font-bold tracking-tight">{tenant?.organization_name || 'SAMS'}</h1>
          <p className="text-xs font-semibold tracking-wider text-primary/80 uppercase">Attendance System</p>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="mb-4 text-4xl leading-tight font-black">
          {tenant?.organization_name ? `Welcome to ${tenant.organization_name}` : 'Smart Attendance'} <br />
          <span className="text-primary">Management System</span>
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Streamline your organization's attendance tracking with our powerful multi-tenant platform built for student organizations.
        </p>
        <TrustedBy />
      </div>
    </div>
  );
}
