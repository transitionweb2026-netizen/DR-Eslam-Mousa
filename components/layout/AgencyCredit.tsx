import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";

/** What screen readers announce; the badge itself is decorative artwork. */
const creditLabel = {
  en: "Design and development by Transition",
  ar: "تصميم وتطوير Transition",
} as const satisfies Localized;

/**
 * The agency's signature badge: "Transition", its logo, then "تصميم وتطوير",
 * left to right on both languages. It's fixed artwork, so it never mirrors in
 * RTL, and each word keeps its own font (Manrope / Cairo) whatever the page
 * language is.
 */
export function AgencyCredit({ locale }: { locale: Locale }) {
  return (
    <p>
      <span className="sr-only">{creditLabel[locale]}</span>
      <span
        aria-hidden="true"
        dir="ltr"
        className="bg-gradient-brand shadow-glass inline-flex items-center gap-3 rounded-full px-5 py-2 text-white"
      >
        <span className="font-[family-name:var(--font-manrope)] text-base font-extrabold tracking-tight">Transition</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/15">
          <Image src="/images/brand/transition-logo.png" alt="" width={192} height={161} className="h-5 w-auto" />
        </span>
        <span dir="rtl" lang="ar" className="font-[family-name:var(--font-cairo)] text-base font-bold">
          تصميم وتطوير
        </span>
      </span>
    </p>
  );
}
