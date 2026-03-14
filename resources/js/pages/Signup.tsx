import Step1Card, { Step1Header } from '@/components/forms/signup/Step1Card';
import Step2Card, { Step2Header } from '@/components/forms/signup/Step2Card';
import Step3Card, { Step3Header } from '@/components/forms/signup/Step3Card';
import { useForm } from '@inertiajs/react';
import _ from 'lodash';
import { useState } from 'react';
import z from 'zod';

const organizationSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['college-club', 'departmental', 'society', 'interest', 'council']),
  subdomain: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/), // lowercase letters, numbers, and hyphens only
});

const adminSchema = z
  .object({
    fullname: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signupSchema = z.object({
  plan: z.enum(['basic', 'premium']),
  organization: organizationSchema,
  admin: adminSchema,
  verification_code: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [activeTab, setActiveTab] = useState(1);

  const form = useForm<SignupFormValues>({
    plan: 'premium',
    organization: {
      name: '',
      type: 'college-club',
      subdomain: '',
    },
    admin: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    verification_code: '',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-dark p-6 text-white">
      <div className="grid w-full max-w-6xl items-start gap-8 lg:grid-cols-12">
        <LeftAside form={form} />
        <div className="overflow-hidden rounded-4xl border border-white/5 bg-surface-dark shadow-2xl lg:col-span-8">
          {activeTab === 1 ? <Step1Header /> : activeTab === 2 ? <Step2Header /> : <Step3Header />}

          {activeTab === 1 ? (
            <Step1Card activeTab={activeTab} setActiveTab={setActiveTab} form={form} />
          ) : activeTab === 2 ? (
            <Step2Card activeTab={activeTab} setActiveTab={setActiveTab} form={form} />
          ) : (
            <Step3Card activeTab={activeTab} setActiveTab={setActiveTab} form={form} />
          )}

          <div className="border-t border-white/5 bg-slate-900/20 px-10 py-6 text-center">
            <p className="text-xs text-slate-500">
              Already have an organization registered?
              <a className="ml-2 font-bold text-primary hover:underline" href="/login">
                Log in to Dashboard
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftAside({ form }: { form: ReturnType<typeof useForm<SignupFormValues>> }) {
  const selectedPlan = form.data.plan;
  const setSelectedPlan = (plan: 'basic' | 'premium') => form.setData('plan', plan);
  const planCardStyles = {
    notSelected:
      'group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-white/5 bg-surface-dark p-5 transition-all hover:border-primary/40',
    selected: 'group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-primary bg-primary/5 p-5 transition-all',
  };

  return (
    <div className="space-y-6 lg:col-span-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
        </div>
        <div>
          <h1 className="text-xl leading-none font-black tracking-tight uppercase">BukSU SAMS</h1>
          <p className="text-xs font-semibold text-primary/70">Organization Registration</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Choose your journey.</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Join Bukidnon State University's premier attendance management ecosystem. Select your plan to begin the setup.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div onClick={() => setSelectedPlan('basic')} className={selectedPlan === 'basic' ? planCardStyles.selected : planCardStyles.notSelected}>
          <div className="mb-3 flex items-start justify-between">
            <div className="rounded-lg bg-slate-800 p-2">
              <span className="material-symbols-outlined text-slate-400">inventory_2</span>
            </div>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">FREE</span>
          </div>
          <h3 className="mb-1 text-lg font-bold">Basic Plan</h3>
          <p className="mb-4 text-xs text-slate-400">Perfect for smaller organizations and clubs.</p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-green-500/50">check_circle</span>
              Up to 3 active events
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-green-500/50">check_circle</span>
              CSV export only
            </li>
          </ul>
        </div>
        <div onClick={() => setSelectedPlan('premium')} className={selectedPlan === 'premium' ? planCardStyles.selected : planCardStyles.notSelected}>
          <div className="absolute top-0 right-0 p-3">
            <span className="material-symbols-outlined text-primary">verified</span>
          </div>
          <div className="mb-3 flex items-start justify-between">
            <div className="rounded-lg bg-primary/20 p-2">
              <span className="material-symbols-outlined text-primary">workspace_premium</span>
            </div>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white uppercase">Selected</span>
          </div>
          <h3 className="mb-1 text-lg font-bold">Premium Plan</h3>
          <p className="mb-4 text-xs text-primary/70">Full suite for departments and supreme councils.</p>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Unlimited events &amp; students
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Advanced Analytics Dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
              Multi-tenant sub-admin roles
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
