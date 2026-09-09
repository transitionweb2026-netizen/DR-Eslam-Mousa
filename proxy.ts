import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { updateAdminSession } from "@/lib/supabase/proxy";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase().slice(0, 2))
    .find((lang) => lang && (locales as readonly string[]).includes(lang));

  return (preferred as Locale) ?? defaultLocale;
}

// Runs before rendering: bare paths (e.g. "/", "/services") are redirected to
// their localized equivalent (e.g. "/en/services"). Paths that already carry
// a locale segment pass through untouched.
//
// /admin/* is a separate, unlocalized zone (the CMS itself is English-only
// chrome around bilingual content) — it never gets a locale prefix and
// instead goes through Supabase session refresh + the signed-in check.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return updateAdminSession(request);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals, API routes and files with an extension
    // (favicon.ico, robots.txt, images, etc.).
    "/((?!_next|api|.*\\..*).*)",
  ],
};
