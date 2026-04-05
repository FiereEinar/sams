import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTheme, ACCENT_PRESETS } from '@/hooks/use-theme';
import axios from 'axios';
import Layout from './Layout';

export default function Onboarding() {
  const { props } = usePage();
  const organizationName = (props as any).tenantOrganizationName || 'My Organization';
  const university = (props as any).tenantUniversity || 'University';

  const {
    mode,
    setMode,
    accentColor,
    setAccentColor,
    sidebarPosition,
    setSidebarPosition,
    topbarVisibility,
    setTopbarVisibility,
    topbarMenu,
    setTopbarMenu,
    sidebarLogoType,
    setSidebarLogoType,
    sidebarLogoIcon,
    setSidebarLogoIcon,
    sidebarLogoImage,
    sidebarName,
    setSidebarName,
  } = useTheme();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Local state for branding
  const [brandingName, setBrandingName] = useState(sidebarName || organizationName);
  const [brandingUniversity, setBrandingUniversity] = useState(university);
  const [logoUploading, setLogoUploading] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setSidebarName(brandingName);
      router.put('/settings/university', { university: brandingUniversity }, { preserveState: true });
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const completeOnboarding = () => {
    router.post('/onboarding/complete');
  };

  return (
    <Layout>
      <Head title="Welcome Setup" />
      <div>
        <div className="mb-8 animate-in text-center duration-500 fade-in slide-in-from-bottom-4">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/30">
            <span className="material-symbols-outlined text-3xl font-bold">rocket_launch</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Welcome to your new workspace!</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Let's set up your environment before you get started.</p>
        </div>

        <div className="animate-in overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl duration-500 zoom-in-95 dark:border-white/10 dark:bg-surface-dark">
          {/* Progress Bar */}
          <div className="flex h-1.5 w-full bg-slate-100 dark:bg-white/5">
            <div className="bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>

          <div className="p-8 md:p-12">
            {/* Step 1: Branding */}
            {step === 1 && (
              <div className="animate-in space-y-8 duration-300 fade-in slide-in-from-right-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Step 1: Branding</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Customize the identity of your workspace.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Organization Name</label>
                    <input
                      type="text"
                      value={brandingName}
                      onChange={(e) => setBrandingName(e.target.value)}
                      placeholder={organizationName}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">University / Subtitle</label>
                    <input
                      type="text"
                      value={brandingUniversity}
                      onChange={(e) => setBrandingUniversity(e.target.value)}
                      placeholder="University"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-background-dark dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Logo Type</label>
                    <div className="flex gap-3">
                      {(['icon', 'image'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSidebarLogoType(type)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 capitalize transition-all ${
                            sidebarLogoType === type
                              ? 'border-primary bg-primary/5 font-bold text-primary shadow-sm'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {sidebarLogoType === 'icon' && (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Select Icon</label>
                      <div className="grid grid-cols-6 gap-3">
                        {[
                          'account_balance',
                          'school',
                          'groups',
                          'shield',
                          'workspace_premium',
                          'stars',
                          'emoji_events',
                          'deployed_code',
                          'military_tech',
                          'psychology',
                          'hub',
                          'diversity_3',
                        ].map((icon) => (
                          <button
                            key={icon}
                            onClick={() => setSidebarLogoIcon(icon)}
                            className={`flex items-center justify-center rounded-xl border-2 p-3 transition-all ${
                              sidebarLogoIcon === icon
                                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xl">{icon}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {sidebarLogoType === 'image' && (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Upload Logo</label>
                      {sidebarLogoImage && (
                        <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                          <img src={sidebarLogoImage} alt="Logo" className="size-12 rounded-lg object-cover" />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Current Logo</span>
                        </div>
                      )}
                      <label
                        className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${
                          logoUploading
                            ? 'border-primary/50 bg-primary/5'
                            : 'border-slate-300 hover:border-primary hover:bg-primary/5 dark:border-white/15 dark:hover:border-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl text-slate-400">{logoUploading ? 'hourglass_top' : 'cloud_upload'}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {logoUploading ? 'Uploading...' : 'Click to upload a new logo (max 2MB)'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={logoUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setLogoUploading(true);
                            try {
                              const formData = new FormData();
                              formData.append('logo', file);
                              await axios.post('/settings/branding', formData, {
                                headers: { 'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '' },
                              });
                              router.reload();
                            } catch (err) {
                              console.error('Logo upload failed', err);
                            } finally {
                              setLogoUploading(false);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Appearance */}
            {step === 2 && (
              <div className="animate-in space-y-8 duration-300 fade-in slide-in-from-right-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Step 2: Appearance</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Choose your colors and theme preferences.</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">Theme Mode</label>
                    <div className="flex gap-3">
                      {(['light', 'dark', 'system'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setMode(m)}
                          className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                            mode === m
                              ? 'border-primary bg-primary/5 text-primary shadow-sm'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">
                            {m === 'light' ? 'light_mode' : m === 'dark' ? 'dark_mode' : 'desktop_windows'}
                          </span>
                          <span className="text-sm font-bold capitalize">{m}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">Accent Color</label>
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                      {ACCENT_PRESETS.map((preset) => {
                        const isActive = accentColor.name === preset.name;
                        return (
                          <button
                            key={preset.name}
                            onClick={() => setAccentColor(preset)}
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                              isActive
                                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-background-dark dark:hover:border-white/20'
                            }`}
                          >
                            <div className="size-6 rounded-full shadow-inner" style={{ backgroundColor: preset.primary }} />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{preset.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Layout */}
            {step === 3 && (
              <div className="animate-in space-y-8 duration-300 fade-in slide-in-from-right-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Step 3: Layout</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Position your navigation menus to fit your workflow.</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">Sidebar Position</label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {(['left', 'right', 'top', 'bottom'] as const).map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setSidebarPosition(pos)}
                          className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                            sidebarPosition === pos
                              ? 'border-primary bg-primary/5 text-primary shadow-sm'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">
                            {pos === 'left'
                              ? 'dock_to_left'
                              : pos === 'right'
                                ? 'dock_to_right'
                                : pos === 'top'
                                  ? 'vertical_align_top'
                                  : 'vertical_align_bottom'}
                          </span>
                          <span className="text-sm font-bold capitalize">{pos}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">Topbar Visibility</label>
                    <div className="flex gap-3">
                      {(['visible', 'hidden'] as const).map((vis) => (
                        <button
                          key={vis}
                          onClick={() => setTopbarVisibility(vis)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                            topbarVisibility === vis
                              ? 'border-primary bg-primary/5 font-bold text-primary shadow-sm'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                          }`}
                        >
                          <span className="capitalize">{vis}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">Show Menu in Topbar</label>
                    <div className="flex gap-3">
                      {(['visible', 'hidden'] as const).map((vis) => (
                        <button
                          key={vis}
                          onClick={() => setTopbarMenu(vis)}
                          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                            topbarMenu === vis
                              ? 'border-primary bg-primary/5 font-bold text-primary shadow-sm'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-background-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                          }`}
                        >
                          <span className="capitalize">{vis === 'visible' ? 'Yes' : 'No'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 p-6 dark:border-white/10 dark:bg-background-dark/50">
            <button
              onClick={completeOnboarding}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
            >
              Skip Setup
            </button>
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-white/5"
                >
                  Back
                </button>
              )}
              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
                >
                  Continue
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={completeOnboarding}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover"
                >
                  Finish Setup
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
