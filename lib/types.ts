/**
 * Shared, CMS-ready content types.
 *
 * Every editable piece of copy on the site is expressed as a `Localized<T>`
 * value so a single content object carries both languages together. This
 * keeps each data file (see `/data`) as ONE logical content group per
 * section, ready to be swapped for real CMS documents later without
 * touching any component.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export type Localized<T = string> = Record<Locale, T>;

/** A link with a localized label. */
export interface LocalizedLink {
  label: Localized;
  href: string;
}

/** Any raster/vector image reference. Swappable without touching layout. */
export interface MediaImage {
  /** Path under /public, or a fully-qualified URL. */
  src: string;
  alt: Localized;
  /** Optional focal point, e.g. "center top" — passed to objectPosition. */
  position?: string;
}

export interface MediaVideo {
  /** Placeholder thumbnail image shown before playback. */
  poster: MediaImage;
  /** Real video src (mp4/hls) — empty string while awaiting real footage. */
  src: string;
  /** External provider URL (e.g. YouTube) used until real footage exists. */
  externalUrl?: string;
  durationLabel?: Localized;
}
