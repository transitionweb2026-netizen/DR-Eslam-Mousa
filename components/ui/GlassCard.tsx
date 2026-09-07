import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  /** More pronounced glass treatment — used for hero/CTA centerpieces. */
  strong?: boolean;
  /** Lift + glow on hover. Disable for non-interactive surfaces. */
  hover?: boolean;
  /** Adds the top inner-highlight "reflection". */
  sheen?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * The site's signature liquid-glass surface. Every card, panel and floating
 * element on the site should be built from this one component so the glass
 * language stays perfectly consistent.
 */
export function GlassCard({
  as: Tag = "div",
  strong = false,
  hover = true,
  sheen = true,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        strong ? "glass-card-strong" : "glass-card",
        hover && "glass-card-hover",
        sheen && "glass-sheen overflow-hidden",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
