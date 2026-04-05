import { router } from '@inertiajs/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
export type SidebarPosition = 'left' | 'right' | 'top' | 'bottom';
export type TopbarVisibility = 'visible' | 'hidden';
export type SidebarLogoType = 'icon' | 'image';

type AccentColor = {
  name: string;
  primary: string;
  hover: string;
};

export const ACCENT_PRESETS: AccentColor[] = [
  { name: 'Blue', primary: '#3b82f6', hover: '#2563eb' },
  { name: 'Indigo', primary: '#6366f1', hover: '#4f46e5' },
  { name: 'Violet', primary: '#8b5cf6', hover: '#7c3aed' },
  { name: 'Emerald', primary: '#10b981', hover: '#059669' },
  { name: 'Rose', primary: '#f43f5e', hover: '#e11d48' },
  { name: 'Amber', primary: '#f59e0b', hover: '#d97706' },
];

const DEFAULT_ACCENT = ACCENT_PRESETS[0];

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  resolvedDark: boolean;
  sidebarPosition: SidebarPosition;
  setSidebarPosition: (pos: SidebarPosition) => void;
  topbarVisibility: TopbarVisibility;
  setTopbarVisibility: (vis: TopbarVisibility) => void;
  topbarMenu: TopbarVisibility;
  setTopbarMenu: (vis: TopbarVisibility) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  sidebarLogoType: SidebarLogoType;
  setSidebarLogoType: (type: SidebarLogoType) => void;
  sidebarLogoIcon: string;
  setSidebarLogoIcon: (icon: string) => void;
  sidebarLogoImage: string;
  sidebarName: string;
  setSidebarName: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Derive a darker hover shade from a hex color by reducing lightness.
 */
function deriveHoverColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Convert to HSL
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

  // Darken by ~12%
  const newL = Math.max(0, l - 0.12);

  // HSL to hex
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
  const p = 2 * newL - q;

  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(hue2rgb(p, q, h + 1 / 3))}${toHex(hue2rgb(p, q, h))}${toHex(hue2rgb(p, q, h - 1 / 3))}`;
}

function applyDarkClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
}

function applyAccentColors(primary: string, hover: string) {
  document.documentElement.style.setProperty('--app-primary', primary);
  document.documentElement.style.setProperty('--app-primary-hover', hover);
}

function resolveSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function persistSetting(key: string, value: string) {
  router.put('/settings', { key, value }, { preserveScroll: true, preserveState: true });
}

function resolveAccentFromValue(value: string | undefined): AccentColor {
  if (!value) return DEFAULT_ACCENT;

  // Check if it's a preset name
  const preset = ACCENT_PRESETS.find((p) => p.name === value);
  if (preset) return preset;

  // Otherwise treat as custom hex color
  if (value.startsWith('#') && (value.length === 7 || value.length === 4)) {
    return { name: 'Custom', primary: value, hover: deriveHoverColor(value) };
  }

  return DEFAULT_ACCENT;
}

export function ThemeProvider({ 
  children, 
  initialSettings 
}: { 
  children: React.ReactNode;
  initialSettings?: Record<string, string>;
}) {
  const initialMode = (initialSettings?.theme_mode as ThemeMode) || 'dark';
  const initialAccent = resolveAccentFromValue(initialSettings?.accent_color);
  const initialSidebar = (initialSettings?.layout_sidebar_position as SidebarPosition) || 'left';
  const initialTopbar = (initialSettings?.layout_topbar_visibility as TopbarVisibility) || 'visible';
  const initialTopbarMenu = (initialSettings?.layout_topbar_menu as TopbarVisibility) || 'hidden';
  const initialCollapsed = initialSettings?.layout_sidebar_collapsed === 'true';

  const [mode, setModeState] = useState<ThemeMode>(initialMode);
  const [accentColor, setAccentColorState] = useState<AccentColor>(initialAccent);
  const [sidebarPosition, setSidebarPosState] = useState<SidebarPosition>(initialSidebar);
  const [topbarVisibility, setTopbarVisState] = useState<TopbarVisibility>(initialTopbar);
  const [topbarMenu, setTopbarMenuState] = useState<TopbarVisibility>(initialTopbarMenu);
  const [isSidebarCollapsed, setIsSidebarCollapsedState] = useState<boolean>(initialCollapsed);
  const [sidebarLogoType, setSidebarLogoTypeState] = useState<SidebarLogoType>(
    (initialSettings?.sidebar_logo_type as SidebarLogoType) || 'icon'
  );
  const [sidebarLogoIcon, setSidebarLogoIconState] = useState(
    initialSettings?.sidebar_logo_icon || 'account_balance'
  );
  const sidebarLogoImage = initialSettings?.sidebar_logo_image || '';
  const [sidebarName, setSidebarNameState] = useState(
    initialSettings?.sidebar_name || ''
  );
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined' ? resolveSystemDark() : true,
  );

  const resolvedDark = mode === 'system' ? systemDark : mode === 'dark';

  // Listen for system theme changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Apply dark class whenever resolved state changes
  useEffect(() => {
    applyDarkClass(resolvedDark);
  }, [resolvedDark]);

  // Apply accent colors on mount and change
  useEffect(() => {
    applyAccentColors(accentColor.primary, accentColor.hover);
  }, [accentColor]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    persistSetting('theme_mode', newMode);
  }, []);

  const setAccentColor = useCallback((accent: AccentColor) => {
    setAccentColorState(accent);
    applyAccentColors(accent.primary, accent.hover);
    // Store preset name or custom hex
    const value = accent.name === 'Custom' ? accent.primary : accent.name;
    persistSetting('accent_color', value);
  }, []);

  const setSidebarPosition = useCallback((pos: SidebarPosition) => {
    setSidebarPosState(pos);
    persistSetting('layout_sidebar_position', pos);
  }, []);

  const setTopbarVisibility = useCallback((vis: TopbarVisibility) => {
    setTopbarVisState(vis);
    persistSetting('layout_topbar_visibility', vis);
  }, []);

  const setTopbarMenu = useCallback((vis: TopbarVisibility) => {
    setTopbarMenuState(vis);
    persistSetting('layout_topbar_menu', vis);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsedState(prev => {
      const next = !prev;
      persistSetting('layout_sidebar_collapsed', next ? 'true' : 'false');
      return next;
    });
  }, []);

  const setSidebarLogoType = useCallback((type: SidebarLogoType) => {
    setSidebarLogoTypeState(type);
    persistSetting('sidebar_logo_type', type);
  }, []);

  const setSidebarLogoIcon = useCallback((icon: string) => {
    setSidebarLogoIconState(icon);
    persistSetting('sidebar_logo_icon', icon);
  }, []);

  const setSidebarName = useCallback((name: string) => {
    setSidebarNameState(name);
    persistSetting('sidebar_name', name);
  }, []);

  const value = useMemo(
    () => ({ 
      mode, setMode, 
      accentColor, setAccentColor, 
      resolvedDark,
      sidebarPosition, setSidebarPosition,
      topbarVisibility, setTopbarVisibility,
      topbarMenu, setTopbarMenu,
      isSidebarCollapsed, toggleSidebar,
      sidebarLogoType, setSidebarLogoType,
      sidebarLogoIcon, setSidebarLogoIcon,
      sidebarLogoImage,
      sidebarName, setSidebarName,
    }),
    [mode, setMode, accentColor, setAccentColor, resolvedDark, sidebarPosition, setSidebarPosition, topbarVisibility, setTopbarVisibility, topbarMenu, setTopbarMenu, isSidebarCollapsed, toggleSidebar, sidebarLogoType, setSidebarLogoType, sidebarLogoIcon, setSidebarLogoIcon, sidebarLogoImage, sidebarName, setSidebarName],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
