"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, isTheme, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The theme lives outside React entirely — as the `data-theme` attribute
 * the anti-flash inline script (see `getThemeInitScript`) stamps on <html>
 * before hydration. `useSyncExternalStore` is the React-correct way to
 * subscribe a component tree to state like this: it reads the *real*
 * current value after mount without ever needing a `setState` call inside
 * an effect, and it has built-in handling for the server/client mismatch
 * (via `getServerSnapshot`) so there's nothing to suppress or race.
 */
const listeners = new Set<() => void>();

function notifyListeners() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return isTheme(attr) ? attr : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private browsing, disabled cookies) —
    // the theme still works for the session, it just won't persist.
  }
  notifyListeners();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => applyTheme(next), []);
  const toggleTheme = useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
