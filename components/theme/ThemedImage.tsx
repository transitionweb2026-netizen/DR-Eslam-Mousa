"use client";

import Image, { type ImageProps } from "next/image";
import { getThemedImageSrc } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

/**
 * Drop-in replacement for `next/image` that swaps in the light-theme
 * variant of a placeholder illustration when the light theme is active.
 * Keeping this as its own small client component (rather than converting
 * every card/section that shows an image into a client component) lets
 * server components keep rendering everything else exactly as before.
 */
export function ThemedImage({ src, alt, ...rest }: ImageProps) {
  const { theme } = useTheme();
  const themedSrc = typeof src === "string" ? getThemedImageSrc(src, theme) : src;
  return <Image src={themedSrc} alt={alt} {...rest} />;
}
