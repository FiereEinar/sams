import Header from '@/components/ui/Header';
import { ACCENT_PRESETS, useTheme } from '@/hooks/use-theme';
import { useRef, useState } from 'react';
import Layout from './Layout';

type ThemeMode = 'light' | 'dark' | 'system';

const MODES: { key: ThemeMode; label: string; icon: string; description: string }[] = [
  { key: 'light', label: 'Light', icon: 'light_mode', description: 'Clean and bright appearance' },
  { key: 'dark', label: 'Dark', icon: 'dark_mode', description: 'Easy on the eyes at night' },
  { key: 'system', label: 'System', icon: 'desktop_windows', description: 'Follows your device theme' },
];

function deriveHoverColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  const newL = Math.max(0, l - 0.12);

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q2 = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
  const p2 = 2 * newL - q2;

  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(hue2rgb(p2, q2, h + 1 / 3))}${toHex(hue2rgb(p2, q2, h))}${toHex(hue2rgb(p2, q2, h - 1 / 3))}`;
}

export default function Settings() {
  const { mode, setMode, accentColor, setAccentColor, resolvedDark } = useTheme();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [customColor, setCustomColor] = useState(accentColor.name === 'Custom' ? accentColor.primary : '#6366f1');

  const isCustomActive =
    accentColor.name === 'Custom' || !ACCENT_PRESETS.some((p) => p.primary === accentColor.primary);

  return (
    <Layout>
      <div>
        <Header>Settings</Header>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Customize the look and feel of your workspace.</p>
      </div>

      {/* Appearance Mode */}
      <section id="settings-appearance-mode">
        <h2 className="mb-1 text-lg font-semibold">Appearance</h2>
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Choose how the interface looks. Select light, dark, or follow your system preference.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {MODES.map((m) => {
            const isActive = mode === m.key;
            return (
              <button
                key={m.key}
                id={`theme-mode-${m.key}`}
                onClick={() => setMode(m.key)}
                className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all duration-200 ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-surface-dark dark:hover:border-white/20'
                }`}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute top-3 right-3 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75" />
                    <span className="relative inline-flex size-3 rounded-full bg-primary" />
                  </span>
                )}
                <div
                  className={`flex size-14 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-white/10 dark:text-slate-400 dark:group-hover:bg-white/15'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{m.icon}</span>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{m.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{m.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mode preview */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm dark:bg-white/5">
          <span className="material-symbols-outlined text-base text-primary">
            {resolvedDark ? 'dark_mode' : 'light_mode'}
          </span>
          <span className="text-slate-600 dark:text-slate-300">
            Currently using <span className="font-semibold text-primary">{resolvedDark ? 'dark' : 'light'}</span> mode
            {mode === 'system' && ' (following system)'}
          </span>
        </div>
      </section>

      {/* Accent Color */}
      <section id="settings-accent-color">
        <h2 className="mb-1 text-lg font-semibold">Accent Color</h2>
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Pick a primary accent color that highlights buttons, links, and active elements.
        </p>

        {/* Preset swatches */}
        <div className="flex flex-wrap gap-3">
          {ACCENT_PRESETS.map((preset) => {
            const isActive = accentColor.primary === preset.primary && accentColor.name !== 'Custom';
            return (
              <button
                key={preset.name}
                id={`accent-${preset.name.toLowerCase()}`}
                onClick={() => setAccentColor(preset)}
                className={`group flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'border-current shadow-lg'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:hover:border-white/20'
                }`}
                style={isActive ? { borderColor: preset.primary, boxShadow: `0 4px 20px ${preset.primary}25` } : {}}
              >
                <div className="relative">
                  <div
                    className="size-10 rounded-full shadow-inner transition-transform group-hover:scale-110"
                    style={{ backgroundColor: preset.primary }}
                  />
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg text-white drop-shadow">check</span>
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{preset.name}</span>
              </button>
            );
          })}

          {/* Custom color picker */}
          <button
            id="accent-custom"
            onClick={() => colorInputRef.current?.click()}
            className={`group flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
              isCustomActive
                ? 'border-current shadow-lg'
                : 'border-dashed border-slate-300 hover:border-slate-400 hover:shadow-md dark:border-white/15 dark:hover:border-white/25'
            }`}
            style={
              isCustomActive
                ? { borderColor: accentColor.primary, boxShadow: `0 4px 20px ${accentColor.primary}25` }
                : {}
            }
          >
            <div className="relative">
              <div
                className="flex size-10 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{
                  background: isCustomActive
                    ? customColor
                    : 'conic-gradient(from 0deg, #f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6, #f43f5e)',
                }}
              >
                {isCustomActive ? (
                  <span className="material-symbols-outlined text-lg text-white drop-shadow">check</span>
                ) : (
                  <span className="material-symbols-outlined text-lg text-white drop-shadow">colorize</span>
                )}
              </div>
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Custom</span>
          </button>

          {/* Hidden native color input */}
          <input
            ref={colorInputRef}
            type="color"
            value={customColor}
            className="invisible absolute size-0"
            onChange={(e) => {
              const hex = e.target.value;
              setCustomColor(hex);
              setAccentColor({ name: 'Custom', primary: hex, hover: deriveHoverColor(hex) });
            }}
          />
        </div>

        {/* Active color display */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 dark:bg-white/5">
          <div className="size-5 rounded-full" style={{ backgroundColor: accentColor.primary }} />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Active color: <span className="font-mono font-semibold">{accentColor.primary.toUpperCase()}</span>
            <span className="ml-2 text-slate-400">({accentColor.name})</span>
          </span>
        </div>
      </section>
    </Layout>
  );
}
