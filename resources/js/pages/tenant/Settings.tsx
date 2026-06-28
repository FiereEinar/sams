import Header from '@/components/ui/Header';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from './Layout';
import PlanSettings from '../../components/settings/PlanSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import LayoutSettings from '@/components/settings/LayoutSettings';
import BrandingSettings from '@/components/settings/BrandingSettings';
import OfficersSettings from '@/components/settings/OfficersSettings';

export default function Settings() {
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const defaultTab = (urlParams.get('tab') as 'appearance' | 'layout' | 'branding' | 'plan' | 'officers') || 'appearance';
  const [activeTab, setActiveTab] = useState<'appearance' | 'layout' | 'branding' | 'plan' | 'officers'>(defaultTab);

  return (
    <Layout>
      <div className="mb-8">
        <Header>Settings</Header>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Customize the look and feel of your workspace.</p>

        {/* Tabs */}
        <div className="mt-8 flex gap-6 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={() => {
              setActiveTab('appearance');
              router.get(window.location.pathname, { tab: 'appearance' }, { preserveState: true, replace: true });
            }}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'appearance'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Appearance
          </button>
          <button
            onClick={() => {
              setActiveTab('layout');
              router.get(window.location.pathname, { tab: 'layout' }, { preserveState: true, replace: true });
            }}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'layout'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Layout
          </button>
          <button
            onClick={() => {
              setActiveTab('branding');
              router.get(window.location.pathname, { tab: 'branding' }, { preserveState: true, replace: true });
            }}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'branding'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Branding
          </button>
          <button
            onClick={() => {
              setActiveTab('plan');
              router.get(window.location.pathname, { tab: 'plan' }, { preserveState: true, replace: true });
            }}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'plan'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Plan
          </button>
          <button
            onClick={() => {
              setActiveTab('officers');
              router.get(window.location.pathname, { tab: 'officers' }, { preserveState: true, replace: true });
            }}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === 'officers'
                ? 'border-b-2 border-primary text-primary'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            Officers
          </button>
        </div>
      </div>

      {activeTab === 'appearance' && <AppearanceSettings />}
      {activeTab === 'layout' && <LayoutSettings />}
      {activeTab === 'branding' && <BrandingSettings />}
      {activeTab === 'plan' && <PlanSettings />}
      {activeTab === 'officers' && <OfficersSettings />}
    </Layout>
  );
}
