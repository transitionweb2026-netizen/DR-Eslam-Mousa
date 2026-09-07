"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Set for a subtle scale-in instead of a plain fade/slide. */
  scale?: boolean;
}

/** Fades + slides an element up as it enters the viewport. Runs once. */
export function Reveal({ children, className, delay = 0, y = 28, scale = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
