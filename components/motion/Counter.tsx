"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_PREMIUM } from "@/lib/motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  locale?: string;
}

/** Animates 0 -> value once the element scrolls into view. */
export function Counter({ value, suffix = "", duration = 1.8, locale }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_PREMIUM,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  const formatted = display.toLocaleString(locale);

  return (
    <span ref={ref} aria-label={`${value.toLocaleString(locale)}${suffix}`}>
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
