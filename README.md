# Dr. Islam Moussa — Orthopedic Surgeon Website

A premium, bilingual (Arabic/English) medical website built with Next.js 16
(App Router), React 19 and TypeScript. Home page is fully built; the
architecture is ready for About, Services, Videos, Articles and Contact.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to
`/en` or `/ar` based on the browser's language.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Internationalization

Every route lives under `app/[locale]/` (`en` | `ar`). `proxy.ts` (Next 16's
renamed `middleware.ts`) detects the visitor's preferred language and
redirects bare paths (`/services`) to their localized form (`/en/services`).
`app/[locale]/layout.tsx` sets `dir`/`lang` and is the app's root layout.

RTL is handled with CSS logical properties (`ms-*`, `me-*`, `start-*`,
`end-*`, `text-start`, `rtl:` variants) rather than per-locale conditional
classes, so two-column sections mirror automatically based on DOM order.

## Content architecture (CMS-ready)

All copy, images and structured content live in `/data/*.ts` — one file per
logical content group (hero, stats, specialties, conditions, trust points,
videos, articles, FAQ, CTA, navigation, site-wide chrome, contact/social).
Every string is `{ en, ar }`. Components receive data via props; nothing
important is hardcoded in JSX. Swapping to a real CMS later means changing
these data files' source, not the components.

Selection is data-driven, not duplicated: `featured: true` on a video/article
determines what the Home page shows, while `/videos` and `/articles` (once
built out) list the same underlying array.

## Media placeholders

Every image referenced from `/data` is a temporary, on-brand SVG under
`public/images/**` (see `public/images/*/*.svg`), generated to share one
consistent visual language (brand-gradient line icons on a soft glass
background). Replace a placeholder by changing its path in the relevant
`data/*.ts` file — no component or layout changes needed. The doctor's hero
image and portrait are abstract duotone placeholders, not stock photography;
swap `data/hero.ts` (`heroContent.image`) and `data/trustPoints.ts`
(`trustContent.portrait`) once real photography is available, and re-check
the `objectPosition` value against the new image's framing.

## Design system

- **Brand tokens & liquid-glass utilities**: `app/globals.css` (`@theme`
  block + `.glass-card`, `.glass-panel`, `.glass-card-strong`,
  `.text-gradient-brand`, `.bg-gradient-brand`, animation keyframes).
- **UI primitives**: `components/ui/*` (`Button`, `GlassCard`,
  `SectionHeader`, `IconBadge`, `Modal`, `VideoThumbnail`, `VideoModal`,
  `ComingSoon`).
- **Icons**: `components/icons/Icon.tsx` — one dependency-free line-icon set.
- **Motion**: `components/motion/*` (`Reveal`, `Stagger`/`StaggerItem`,
  `Counter`, `PageTransition`, `MotionProvider`). All animation respects
  `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.
- **Layout**: `components/layout/*` (`Navbar`, `MobileMenu`,
  `LanguageSwitcher`, `Footer`).
- **Home sections**: `components/home/*`, composed in `app/[locale]/page.tsx`.

## Tech notes

This project runs on Next.js 16 / React 19, which introduced some breaking
changes versus older Next.js knowledge (see `AGENTS.md`): `middleware.ts` is
renamed `proxy.ts`, route `params`/`searchParams` are Promises, and
`PageProps<'/route'>` / `LayoutProps<'/route'>` are auto-generated global
type helpers (run `next dev`/`next build` to (re)generate them).
