import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { CTASection } from "@/components/home/CTASection";

const copy = {
  eyebrow: { en: "About the Doctor", ar: "عن الدكتور" },
  title: { en: "About Dr. Islam Moussa", ar: "عن د. إسلام موسى" },
  description: {
    en: "A closer look at Dr. Islam Moussa's background, philosophy of care and qualifications is coming soon.",
    ar: "نظرة أقرب على خلفية د. إسلام موسى وفلسفته في الرعاية ومؤهلاته، قريبًا.",
  },
} satisfies Record<"eyebrow" | "title" | "description", Localized>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return {
    title: copy.title[locale],
    description: copy.description[locale],
    alternates: buildAlternates(locale, "about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <ComingSoon locale={locale} eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <CTASection locale={locale} />
    </>
  );
}
