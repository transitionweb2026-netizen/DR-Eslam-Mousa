"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

/** Fades/slides each new route in — including on a language switch. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
