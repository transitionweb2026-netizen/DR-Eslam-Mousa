"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

/**
 * Centralizes the animation system's global defaults. `reducedMotion="user"`
 * makes every Framer Motion animation in the app automatically respect
 * `prefers-reduced-motion` without extra checks in each component.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: EASE_PREMIUM }}>
      {children}
    </MotionConfig>
  );
}
