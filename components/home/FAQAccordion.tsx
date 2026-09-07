"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icons/Icon";
import type { FaqItem } from "@/data/faq";
import type { Locale } from "@/lib/i18n/config";
import { EASE_PREMIUM } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FAQAccordion({ item, locale }: { item: FaqItem; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div
      className={cn(
        "glass-card overflow-hidden rounded-2xl transition-colors duration-500",
        open && "border-brand-blue/40 bg-white/[0.07]"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start sm:px-6 sm:py-5"
      >
        <span
          className={cn(
            "text-sm font-semibold transition-colors duration-300 sm:text-base",
            open ? "text-brand-blue" : "text-brand-ink"
          )}
        >
          {item.question[locale]}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
            open ? "rotate-180 bg-gradient-brand text-white" : "chip-purple"
          )}
        >
          <Icon name="chevron-down" className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-brand-muted sm:px-6 sm:pb-6 sm:text-base">
              {item.answer[locale]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
