import { Head, useForm } from '@inertiajs/react';
import Header from '@/components/ui/Header';
import { useState } from 'react';

interface ProfileFormProps {
  user: { id: number; name: string; email: string };
  profileAction: string;
  passwordAction: string;
}

export default function ProfileForm({ user, profileAction, passwordAction }: ProfileFormProps) {
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const infoForm = useForm({
    name: user.name,
  });

  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    infoForm.put(profileAction, {
      preserveScroll: true,
      onSuccess: () => {
        setShowSuccess('info');
        setTimeout(() => setShowSuccess(null), 3000);
      },
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    passwordForm.put(passwordAction, {
      preserveScroll: true,
      onSuccess: () => {
        passwordForm.reset();
        setShowSuccess('password');
        setTimeout(() => setShowSuccess(null), 3000);
      },
    });
  };

  return (
    <>
      <Head title="My Profile" />
      <div className="mb-8">
        <Header>My Profile</Header>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Update your personal information and password.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Info */}
        <form onSubmit={handleInfoSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark">
          <h3 className="mb-6 text-lg font-bold text-slate-800 dark:text-white">Profile Information</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={infoForm.data.name}
                onChange={(e) => infoForm.setData('name', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              {infoForm.errors.name && (
                <p className="mt-1 text-xs text-red-500">{infoForm.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                id="profile-email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-500"
              />
              <p className="mt-1 text-xs text-slate-400">Email address cannot be changed.</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {showSuccess === 'info' && (
              <p className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Profile updated successfully.
              </p>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={infoForm.processing}
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-50"
              >
                {infoForm.processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark">
          <h3 className="mb-6 text-lg font-bold text-slate-800 dark:text-white">Change Password</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                value={passwordForm.data.current_password}
                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              {passwordForm.errors.current_password && (
                <p className="mt-1 text-xs text-red-500">{passwordForm.errors.current_password}</p>
              )}
            </div>

            <div>
              <label htmlFor="new-password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={passwordForm.data.password}
                onChange={(e) => passwordForm.setData('password', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              {passwordForm.errors.password && (
                <p className="mt-1 text-xs text-red-500">{passwordForm.errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={passwordForm.data.password_confirmation}
                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {showSuccess === 'password' && (
              <p className="flex items-center gap-1 text-sm font-medium text-emerald-500">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Password changed successfully.
              </p>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={passwordForm.processing}
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-50"
              >
                {passwordForm.processing ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
