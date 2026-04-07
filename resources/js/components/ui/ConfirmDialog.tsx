import { ReactNode } from 'react';
import Dialog from './Dialog';

export type ConfirmDialogProps = {
  trigger: (open: () => void) => ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: (close: () => void) => void;
  onCancel?: (close: () => void) => void;
  isAlert?: boolean;
  icon?: string;
  iconClass?: string;
  confirmStyle?: string;
};

export default function ConfirmDialog({
  trigger,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed? This action cannot be undone.',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
  isAlert = false,
  icon = isAlert ? 'info' : 'warning',
  iconClass = isAlert ? 'text-blue-500 bg-blue-500/10' : 'text-red-500 bg-red-500/10',
  confirmStyle = isAlert ? 'bg-primary hover:bg-primary-hover shadow-primary/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20',
}: ConfirmDialogProps) {
  return (
    <Dialog trigger={trigger}>
      {(close) => {
        const handleCancel = () => {
          if (onCancel) onCancel(close);
          close();
        };

        const handleConfirm = () => {
          if (onConfirm) onConfirm(close);
          if (isAlert) close();
        };

        return (
          <div className="modal-glow flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-slate-200 bg-surface-light shadow-2xl dark:border-white/5 dark:bg-surface-dark">
            <header className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className={`flex size-12 items-center justify-center rounded-lg ${iconClass.split(' ')[1]}`}>
                  <span className={`material-symbols-outlined ${iconClass.split(' ')[0]}`}>{icon}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight text-slate-800 dark:text-white">{title}</h2>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </header>
            
            <div className="flex-1 px-6 pb-6">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>
            
            <footer className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-white/5 dark:bg-background-dark">
              {!isAlert && (
                <button
                  onClick={handleCancel}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/5"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={handleConfirm}
                className={`rounded-lg px-5 py-2 text-sm font-bold text-white shadow-lg transition-all border border-transparent ${confirmStyle}`}
              >
                {isAlert ? 'OK' : confirmText}
              </button>
            </footer>
          </div>
        );
      }}
    </Dialog>
  );
}
