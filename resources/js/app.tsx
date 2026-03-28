import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './hooks/use-theme';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    const tenantSettings = (props.initialPage.props.tenantSettings as Record<string, string>) || {};

    root.render(
      <ThemeProvider initialSettings={tenantSettings}>
        <App {...props} />
        <Toaster />
      </ThemeProvider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});
