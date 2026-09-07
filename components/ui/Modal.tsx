"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/icons/Icon";
import { EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  className?: string;
  children: ReactNode;
}

/**
 * Accessible dialog primitive shared by the Article Modal and the Video
 * Modal — one liquid-glass overlay implementation, reused everywhere.
 */
export function Modal({ open, onClose, closeLabel, className, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={cn(
              "glass-card-strong relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-3xl outline-none",
              className
            )}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="glass-panel absolute end-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-ink transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
