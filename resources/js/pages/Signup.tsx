import Step1Card, { Step1Header } from '@/components/forms/signup/Step1Card';
import Step2Card, { Step2Header } from '@/components/forms/signup/Step2Card';
import Step3Card, { Step3Header } from '@/components/forms/signup/Step3Card';
import { Plan } from '@/types/index';
import { useForm, usePage } from '@inertiajs/react';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import z from 'zod';

const organizationSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.enum(['college-club', 'departmental', 'society', 'interest', 'council']),
  address: z.string().min(2).max(100),
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
  plan_id: z.number().optional(),
  organization: organizationSchema,
  admin: adminSchema,
  verification_code: z.string().optional(),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

interface Props {
  plans: Plan[];
  plan_id?: string;
}

export default function Signup({ plans, plan_id }: Props) {
  const [activeTab, setActiveTab] = useState(1);

  // Find the pre-selected plan from the URL
  const preSelectedPlan = plan_id ? plans.find((p) => p.id === parseInt(plan_id)) : null;
  const initialPlanType = preSelectedPlan?.type ?? 'premium';
  const initialPlanId = preSelectedPlan?.id ?? plans.find((p) => p.type === 'premium')?.id;

  const form = useForm<SignupFormValues>({
    plan: initialPlanType,
    plan_id: initialPlanId,
    organization: {
      name: '',
      type: 'college-club',
      address: '',
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
        <LeftAside form={form} plans={plans} />
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

function LeftAside({ form, plans }: { form: ReturnType<typeof useForm<SignupFormValues>>; plans: Plan[] }) {
  const selectedPlanId = form.data.plan_id;

  const selectPlan = (plan: Plan) => {
    form.setData('plan', plan.type);
    form.setData('plan_id', plan.id);
  };

  return (
    <div className="flex flex-col gap-6 lg:col-span-4 lg:max-h-[calc(100vh-3rem)] lg:sticky lg:top-6">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
        </div>
        <div>
          <h1 className="text-xl leading-none font-black tracking-tight uppercase">BukSU SAMS</h1>
          <p className="text-xs font-semibold text-primary/70">Organization Registration</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Choose your journey.</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Join Bukidnon State University's premier attendance management ecosystem. Select your plan to begin the setup.
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1 pb-2" style={{ maxHeight: 'calc(100vh - 20rem)' }}>
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => selectPlan(plan)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-white/5 bg-surface-dark hover:border-primary/40'
              }`}
            >
              {plan.is_featured && (
                <div className="absolute top-0 right-0 p-2">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
              )}
              <div className="mb-3 flex items-start justify-between">
                <div className={`rounded-lg p-2 ${plan.type === 'premium' ? 'bg-primary/20' : 'bg-slate-800'}`}>
                  <span className={`material-symbols-outlined ${plan.type === 'premium' ? 'text-primary' : 'text-slate-400'}`}>
                    {plan.type === 'premium' ? 'workspace_premium' : 'inventory_2'}
                  </span>
                </div>
                {Number(plan.price) === 0 ? (
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400">FREE</span>
                ) : (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">₱{plan.price}/sem</span>
                )}
              </div>
              <h3 className="mb-1 text-base font-bold">{plan.name}</h3>
              <p className={`mb-3 text-xs ${plan.type === 'premium' ? 'text-primary/70' : 'text-slate-400'}`}>
                {plan.description}
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${plan.type === 'premium' ? 'text-primary' : 'text-green-500/50'}`}>check_circle</span>
                  {plan.features?.max_users ? `Up to ${plan.features.max_users} users` : 'Unlimited users'}
                </li>
                <li className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${plan.type === 'premium' ? 'text-primary' : 'text-green-500/50'}`}>check_circle</span>
                  {plan.features?.max_students_per_import ? `Up to ${plan.features.max_students_per_import} students/import` : 'Unlimited imports'}
                </li>
                <li className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${plan.type === 'premium' ? 'text-primary' : 'text-green-500/50'}`}>check_circle</span>
                  {plan.features?.max_exports_per_day ? `${plan.features.max_exports_per_day} exports/day` : 'Unlimited exports'}
                </li>
              </ul>
              {isSelected && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selected
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
