import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = SharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = SharedProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-heading font-semibold " +
  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-white shadow-glass hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0 active:shadow-glass",
  secondary:
    "glass-panel text-brand-ink hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0",
  ghost:
    "text-brand-ink hover:text-brand-blue underline-offset-4 hover:underline",
  // For use on top of the brand-gradient itself (e.g. the final CTA card),
  // where the primary/secondary treatments would blend into the background.
  light:
    "bg-white text-brand-purple shadow-glass hover:-translate-y-0.5 hover:bg-brand-lavender active:translate-y-0",
};

/**
 * Single source of truth for every button on the site — primary
 * (brand gradient), secondary (liquid glass) and ghost (text-only).
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", withArrow = false, className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <Icon
          name="arrow"
          className="h-4 w-4 shrink-0 rtl:rotate-180 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
