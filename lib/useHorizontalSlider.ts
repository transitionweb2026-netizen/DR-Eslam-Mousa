"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Drag-to-scroll + step-by-arrow behavior shared by every horizontal card
 * gallery on the site (Certificates, the Doctor Photo Gallery). Native
 * touch-swipe and scrollbar-drag work out of the box via the track's own
 * `overflow-x-auto`; this adds mouse click-and-drag on desktop plus arrow
 * buttons that step one card at a time via `scrollIntoView`, which
 * sidesteps the well-known cross-browser inconsistency in `scrollLeft`
 * sign conventions under RTL.
 */
export function useHorizontalSlider(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const drag = useRef<{ startX: number; startScroll: number; dragging: boolean } | null>(null);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(itemCount - 1, index));
    setActiveIndex(clamped);
    cardRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    drag.current = { startX: event.clientX, startScroll: trackRef.current.scrollLeft, dragging: true };
    trackRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current?.dragging || !trackRef.current) return;
    const delta = event.clientX - drag.current.startX;
    trackRef.current.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = () => {
    if (drag.current) drag.current.dragging = false;
  };

  return { trackRef, setCardRef, activeIndex, goTo, onPointerDown, onPointerMove, endDrag };
}
