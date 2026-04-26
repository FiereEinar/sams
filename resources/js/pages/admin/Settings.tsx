import { Head, useForm } from '@inertiajs/react';
import Layout from './Layout';
import Header from '@/components/ui/Header';

interface SettingsProps {
  settings: Record<string, string>;
}

export default function Settings({ settings }: SettingsProps) {
  const { data, setData, post, processing } = useForm({
    settings: {
      allow_tenant_rollbacks: settings.allow_tenant_rollbacks ?? 'true',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/settings');
  };

  return (
    <Layout>
      <Head title="Global Settings" />
      <div className="mb-8">
        <Header>Global Settings</Header>
        <p className="mt-1 text-slate-400">Manage platform-wide configuration and feature toggles.</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-surface-dark p-6">
            <h3 className="mb-4 text-lg font-bold text-white">System Maintenance</h3>
            
            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="pr-8">
                <p className="font-bold text-white">Allow Tenant Rollbacks</p>
                <p className="text-sm text-slate-400 mt-1">
                  Permit tenants to roll back their application version independently. Disabling this hides the Version History module across all tenants.
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center shrink-0">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={data.settings.allow_tenant_rollbacks === 'true'}
                  onChange={(e) =>
                    setData('settings', {
                      ...data.settings,
                      allow_tenant_rollbacks: e.target.checked ? 'true' : 'false',
                    })
                  }
                  disabled={processing}
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-hover disabled:opacity-50"
            >
              {processing ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
