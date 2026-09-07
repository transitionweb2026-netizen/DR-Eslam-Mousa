import { Icon, type IconName } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 w-9 rounded-xl",
  md: "h-12 w-12 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
} as const;

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
} as const;

interface IconBadgeProps {
  icon: IconName;
  size?: keyof typeof sizes;
  className?: string;
  /** Flat glass variant instead of the solid brand-gradient fill. */
  tone?: "solid" | "glass";
}

export function IconBadge({ icon, size = "md", className, tone = "solid" }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors duration-300",
        sizes[size],
        tone === "solid"
          ? "bg-gradient-brand text-white shadow-glass"
          : "glass-panel text-brand-blue",
        className
      )}
    >
      <Icon name={icon} className={iconSizes[size]} />
    </span>
  );
}
