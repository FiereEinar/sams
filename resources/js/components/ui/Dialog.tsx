import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

type DialogProps =
  | {
      // Render-prop / trigger pattern (original usage e.g. logout)
      trigger: (open: () => void) => ReactNode;
      children: (close: () => void) => ReactNode;
      isOpen?: never;
    }
  | {
      // Controlled pattern (isOpen/onClose/onConfirm)
      isOpen: boolean;
      onClose: () => void;
      title: string;
      description: string;
      confirmText?: string;
      cancelText?: string;
      onConfirm: () => void;
      variant?: 'danger' | 'default';
      trigger?: never;
      children?: never;
    };

export default function Dialog(props: DialogProps) {
  // Render-prop pattern
  if ('trigger' in props && props.trigger) {
    const { trigger, children } = props;
    return <DialogInternal trigger={trigger} children={children} />;
  }

  // Controlled pattern
  const { isOpen, onClose, title, description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, variant = 'default' } = props as Extract<DialogProps, { isOpen: boolean }>;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 animate-in bg-black/50 backdrop-blur-sm fade-in duration-200"
      />
      <div className="relative z-10 w-full max-w-sm animate-in rounded-2xl bg-white p-6 shadow-xl zoom-in-95 fade-in duration-200 dark:bg-surface-dark">
        <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-surface-dark dark:text-slate-300 dark:hover:bg-white/5"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Internal component for the render-prop pattern
function DialogInternal({ trigger, children }: { trigger: (open: () => void) => ReactNode; children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {trigger(() => setOpen(true))}

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
            />

            {/* Modal */}
            <div className="relative z-10 rounded-xl shadow-xl animate-in zoom-in-95 fade-in">
              {children(() => setOpen(false))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
