import { ReactNode } from 'react';
import Dialog from './Dialog';

export type ConfirmDialogProps = {
  trigger: (open: () => void) => ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: (close: () => void) => void;
  onCancel?: (close: () => void) => void;
};

export default function ConfirmDialog({
  trigger,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed? This action cannot be undone.',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog trigger={trigger}>
      {(close) => {
        const handleCancel = () => {
          if (onCancel) onCancel(close);
          close();
        };

        const handleConfirm = () => {
          onConfirm(close);
        };

        return (
          <div className="modal-glow flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-white/5 bg-white shadow-2xl dark:bg-[#16212b]">
            <header className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-500/10 size-12 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-500">warning</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">{title}</h2>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </header>
            
            <div className="flex-1 px-6 pb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
            
            <footer className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-white/10 dark:bg-[#111a22]">
              <button
                onClick={handleCancel}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-white/5"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-red-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600"
              >
                {confirmText}
              </button>
            </footer>
          </div>
        );
      }}
    </Dialog>
  );
}
