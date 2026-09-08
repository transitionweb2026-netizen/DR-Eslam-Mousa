"use client";

import { useState, useSyncExternalStore } from "react";

function getHash(): string {
  return typeof window === "undefined" ? "" : window.location.hash;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getServerHash(): string {
  return "";
}

/**
 * Resolves which item (if any) matches `#{prefix}-{slug}` in the URL —
 * e.g. arriving on /services from a Home page card linking to
 * `#service-knee-surgery` — while still letting the caller select or close
 * items manually afterward.
 *
 * Built on `useSyncExternalStore` rather than a `useEffect` + `setState`:
 * the hash is not knowable during SSR, and `useSyncExternalStore` is
 * React's own mechanism for that exact situation (server renders via
 * `getServerHash`, then reconciles with the real value after hydration —
 * no hydration-mismatch warning, no manual effect required).
 */
export function useHashSelection<T extends { slug: string }>(prefix: string, items: T[]) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const [manual, setManual] = useState<T | "closed" | null>(null);

  const expectedPrefix = `#${prefix}-`;
  const hashSlug = hash.startsWith(expectedPrefix) ? hash.slice(expectedPrefix.length) : null;
  const hashMatch = hashSlug ? (items.find((item) => item.slug === hashSlug) ?? null) : null;

  const selected = manual === "closed" ? null : (manual ?? hashMatch);

  return {
    selected,
    select: (item: T) => setManual(item),
    close: () => setManual("closed"),
  };
}
