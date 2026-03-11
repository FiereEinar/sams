import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  trigger: (open: () => void) => ReactNode;
  children: (close: () => void) => ReactNode;
};

export default function Dialog({ trigger, children }: DialogProps) {
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
