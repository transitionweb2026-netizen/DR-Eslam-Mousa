import type { ReactNode, SVGProps } from "react";

export type IconName =
  // UI
  | "arrow"
  | "chevron-down"
  | "close"
  | "menu"
  | "play"
  | "check"
  | "phone"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "youtube"
  | "mail"
  | "map-pin"
  | "clock"
  // Medical / specialties / conditions
  | "knee"
  | "hip"
  | "shoulder"
  | "joint"
  | "sports"
  | "arthroscopy"
  | "spine"
  | "neck"
  // Stats
  | "experience"
  | "procedures"
  | "patients"
  | "cases"
  // Trust
  | "patient"
  | "technique"
  | "plan"
  | "safety";

/**
 * A single, dependency-free line-icon set drawn to match the brand's
 * "precision" tone — consistent stroke width, rounded caps, 24x24 grid.
 * Centralizing every glyph here keeps the visual language identical across
 * specialties, conditions, trust points, stats and social links.
 */
export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {renderIcon(name)}
    </svg>
  );
}

function renderIcon(name: IconName): ReactNode {
  switch (name) {
    case "arrow":
      return (
        <>
          <path d="M5 12h13" />
          <path d="M13 6l6 6-6 6" />
        </>
      );
    case "chevron-down":
      return <path d="M6 9l6 6 6-6" />;
    case "close":
      return (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      );
    case "menu":
      return (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      );
    case "play":
      return <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" />;
    case "check":
      return <path d="M5 13l4 4 10-11" />;
    case "phone":
      return (
        <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 5 5.1a1.5 1.5 0 0 1 1.5-1.6z" />
      );
    case "whatsapp":
      return (
        <>
          <path d="M7 20l1.1-3.3A7.5 7.5 0 1 1 11.9 19L7 20z" />
          <path d="M9.2 9.6c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .5.4.2.5.6 1.5.6 1.6.1.1.1.3 0 .4-.2.3-.3.5-.5.7-.2.2-.4.4-.2.7.6 1 1.3 1.6 2.3 2.1.2.1.4.1.5-.1.2-.2.6-.7.8-.9.2-.2.3-.2.5-.1l1.4.7c.2.1.3.1.4.3.1.2.1 1-.2 1.3-.4.5-1.3.9-2.3.6-1.7-.4-3.6-1.7-4.9-3.6-.5-.8-.9-1.6-.9-2.5 0-.4.1-.7.3-.9z" fill="currentColor" stroke="none" />
        </>
      );
    case "facebook":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M13.5 9.2h1.3V7h-1.6c-1.4 0-2.4 1-2.4 2.5v1.2H9.5v2.1h1.3V17h2.2v-4.2h1.5l.3-2.1h-1.8V9.7c0-.3.1-.5.5-.5z" fill="currentColor" stroke="none" />
        </>
      );
    case "instagram":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.6" />
          <circle cx="16.6" cy="7.4" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case "youtube":
      return (
        <>
          <rect x="3.5" y="6" width="17" height="12" rx="4" />
          <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="M4.5 7l7.5 6 7.5-6" />
        </>
      );
    case "map-pin":
      return (
        <>
          <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.3" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </>
      );
    case "knee":
      return (
        <>
          <path d="M8 4v6l-3.5 5a3 3 0 0 0 4.9 3.4L11 15l4 3a3 3 0 0 0 4-4.4L15.5 10V4" />
          <circle cx="11.5" cy="13.2" r="1.1" fill="currentColor" stroke="none" />
        </>
      );
    case "hip":
      return (
        <>
          <path d="M7 5c0 3-2 3.5-2 7a4 4 0 0 0 8 0c0-2-1-3-1-5" />
          <path d="M13 7c0 2-1 3-1 5a4 4 0 0 0 8 0c0-3.5-2-4-2-7" />
        </>
      );
    case "shoulder":
      return (
        <>
          <path d="M4 15c1-5 4-9 8-9s7 4 8 9" />
          <circle cx="12" cy="7.5" r="2" />
          <path d="M8 15v5M16 15v5" />
        </>
      );
    case "joint":
      return (
        <>
          <circle cx="9.5" cy="9.5" r="5" />
          <circle cx="14.5" cy="14.5" r="5" />
        </>
      );
    case "sports":
      return (
        <>
          <circle cx="15.5" cy="5.5" r="1.6" fill="currentColor" stroke="none" />
          <path d="M8 20l2.5-5 3-1.5-1-4-3.5 1L7 8" />
          <path d="M10.5 15l4 1 3-4" />
        </>
      );
    case "arthroscopy":
      return (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l5 5" />
          <path d="M8 10.5a2.5 2.5 0 0 1 2.5-2.5" />
        </>
      );
    case "spine":
      return (
        <>
          <path d="M12 3v18" />
          <rect x="9.3" y="4.5" width="5.4" height="2.6" rx="1" />
          <rect x="9.3" y="9" width="5.4" height="2.6" rx="1" />
          <rect x="9.3" y="13.5" width="5.4" height="2.6" rx="1" />
          <rect x="9.3" y="18" width="5.4" height="2.2" rx="1" />
        </>
      );
    case "neck":
      return (
        <>
          <circle cx="12" cy="5.5" r="2.5" />
          <path d="M12 8v9" />
          <rect x="9.6" y="9.2" width="4.8" height="2.2" rx="1" />
          <rect x="9.6" y="13" width="4.8" height="2.2" rx="1" />
        </>
      );
    case "experience":
      return (
        <>
          <circle cx="12" cy="9" r="5" />
          <path d="M9 13.5L7.5 21 12 18.5 16.5 21 15 13.5" />
        </>
      );
    case "procedures":
      return (
        <>
          <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
          <path d="M9.5 12l2 2 3.5-4" />
        </>
      );
    case "patients":
      return (
        <>
          <path d="M12 20s-6.5-4-9-8.3C1.3 8.2 3.2 5 6.3 5c1.8 0 3 1 3.7 2.1C10.7 6 12 5 13.7 5c3.1 0 5 3.2 3.3 6.7C14.5 16 12 20 12 20z" />
          <path d="M8 12h1.5l1-2 1.5 4 1-2H15" />
        </>
      );
    case "cases":
      return (
        <>
          <rect x="4" y="7" width="16" height="12" rx="2.5" />
          <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
          <path d="M4 12h16" />
        </>
      );
    case "patient":
      return (
        <>
          <path d="M12 19.5s-7-4.4-7-9.6C5 6.7 7 4.8 9.3 4.8c1.3 0 2.4.7 2.7 1.7.3-1 1.4-1.7 2.7-1.7C17 4.8 19 6.7 19 9.9c0 5.2-7 9.6-7 9.6z" />
        </>
      );
    case "technique":
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case "plan":
      return (
        <>
          <rect x="5.5" y="4" width="13" height="16" rx="2.5" />
          <path d="M9 8.5h6M9 12h6M9 15.5h4" />
        </>
      );
    case "safety":
      return (
        <>
          <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
          <path d="M9.5 12l2 2 3.5-4" />
        </>
      );
    default:
      return null;
  }
}
