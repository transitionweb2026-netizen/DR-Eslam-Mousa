import { Cairo, Inter, Manrope } from "next/font/google";

// English: Manrope for headings (confident, geometric, editorial) and Inter
// for body copy (exceptionally readable at small sizes).
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Arabic: Cairo covers both headings and body with genuine Arabic letterforms
// (not a Latin font stretched over Arabic glyphs), across a full weight range.
export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const fontVariables = `${manrope.variable} ${inter.variable} ${cairo.variable}`;
