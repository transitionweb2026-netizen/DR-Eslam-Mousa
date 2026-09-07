export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

/** Dark liquid-glass is the flagship experience; light is the alternative. */
export const DEFAULT_THEME: Theme = "dark";

export const THEME_STORAGE_KEY = "dr-islam-moussa-theme";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * The decorative placeholder illustrations were authored per theme (a dark
 * canvas for the dark glass design, a light one for the restored light
 * design) since a single flat image can't repaint itself the way CSS
 * tokens do. Dark files are the ones referenced from `/data`; this derives
 * the light sibling by convention (`foo.svg` -> `foo-light.svg`) instead of
 * hardcoding every path twice.
 */
export function getThemedImageSrc(src: string, theme: Theme): string {
  if (theme !== "light") return src;
  if (!src.endsWith(".svg")) return src;
  return `${src.slice(0, -4)}-light.svg`;
}

/**
 * Self-contained script (no imports — it runs before React or any module
 * graph exists) that reads the stored theme and stamps it on <html> before
 * first paint, so the page never flashes the wrong theme on load.
 */
export function getThemeInitScript(): string {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY
  )});if(t!=="light"&&t!=="dark"){t=${JSON.stringify(
    DEFAULT_THEME
  )};}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(
    DEFAULT_THEME
  )});}})();`;
}
