import { useTheme } from '@/hooks/use-theme';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function BrandingSettings() {
  const { props } = usePage();
  const organizationName = (props as any).tenantOrganizationName || 'My Organization';
  const university = (props as any).tenantUniversity || 'University';
  const userPermissions: string[] = (props as any).userPermissions || [];

  const canEditBranding = userPermissions.includes('SETTINGS_BRANDING_UPDATE');

  const { sidebarLogoType, setSidebarLogoType, sidebarLogoIcon, setSidebarLogoIcon, sidebarLogoImage, sidebarName, setSidebarName } = useTheme();

  // Branding local state
  const [brandingName, setBrandingName] = useState(sidebarName || organizationName);
  const [brandingUniversity, setBrandingUniversity] = useState(university);
  const [logoUploading, setLogoUploading] = useState(false);

  return (
    <div className="animate-in space-y-10 duration-300 fade-in slide-in-from-bottom-2">
      {!canEditBranding && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">lock</span>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">You don't have permission to change branding settings.</p>
        </div>
      )}
      <div className={!canEditBranding ? 'pointer-events-none opacity-60' : ''}>
        <section id="settings-branding">
          <h2 className="mb-1 text-lg font-semibold">Sidebar Branding</h2>
          <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
            Customize the sidebar header with your organization's name, university, and logo.
          </p>

          <div className="space-y-6">
            {/* Sidebar Name */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Organization Name</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={brandingName}
                  onChange={(e) => setBrandingName(e.target.value)}
                  placeholder={organizationName}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
                />
                <button
                  onClick={() => setSidebarName(brandingName)}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Save
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">This appears as the main title in the sidebar header.</p>
            </div>

            {/* University */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">University</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={brandingUniversity}
                  onChange={(e) => setBrandingUniversity(e.target.value)}
                  placeholder="University"
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all focus:border-primary focus:ring-2 focus:ring-primary/40 dark:border-white/10 dark:bg-surface-dark dark:text-white"
                />
                <button
                  onClick={() => {
                    router.put('/settings/university', { university: brandingUniversity }, { preserveScroll: true, preserveState: true });
                  }}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Save
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">This appears as the subtitle below the organization name.</p>
            </div>

            {/* Logo Type Toggle */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Logo Type</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSidebarLogoType('icon')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    sidebarLogoType === 'icon'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  Icon
                </button>
                <button
                  onClick={() => setSidebarLogoType('image')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
                    sidebarLogoType === 'image'
                      ? 'border-primary bg-primary/5 font-semibold text-primary shadow-sm'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                  }`}
                >
                  Image
                </button>
              </div>
            </div>

            {/* Icon Selection (only visible when logoType is 'icon') */}
            {sidebarLogoType === 'icon' && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Select Icon</h3>
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
                  {[
                    'account_balance',
                    'school',
                    'groups',
                    'shield',
                    'workspace_premium',
                    'stars',
                    'emoji_events',
                    'deployed_code',
                    'psychology',
                    'hub',
                    'diversity_3',
                    'military_tech',
                  ].map((icon) => {
                    const isActive = sidebarLogoIcon === icon;
                    return (
                      <button
                        key={icon}
                        onClick={() => setSidebarLogoIcon(icon)}
                        className={`flex items-center justify-center rounded-xl border-2 p-3 transition-all ${
                          isActive
                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/25'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">{icon}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Image Upload (only visible when logoType is 'image') */}
            {sidebarLogoType === 'image' && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Upload Logo</h3>
                {sidebarLogoImage && (
                  <div className="mb-4 flex items-center gap-4 rounded-xl bg-slate-100 p-4 dark:bg-white/5">
                    <img src={sidebarLogoImage} alt="Current logo" className="size-12 rounded-lg object-cover" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">Current logo</span>
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
                    {logoUploading ? 'Uploading...' : 'Click to upload a logo (max 2MB)'}
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
                          headers: {
                            'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
                          },
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
        </section>
      </div>
    </div>
  );
}
