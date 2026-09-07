import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { buildAlternates } from "@/lib/seo";
import { specialties, specialtiesIntro } from "@/data/specialties";
import { conditions, conditionsIntro } from "@/data/conditions";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceCard } from "@/components/home/ServiceCard";
import { ConditionCard } from "@/components/home/ConditionCard";
import { CTASection } from "@/components/home/CTASection";

const pageCopy = {
  eyebrow: { en: "What We Treat", ar: "ما الذي نعالجه" },
  title: { en: "Services & Conditions", ar: "الخدمات والحالات" },
  description: {
    en: "Every specialty and condition Dr. Islam Moussa treats, in one place. Full individual service pages are coming soon.",
    ar: "كل تخصص وحالة يعالجها د. إسلام موسى في مكان واحد. صفحات تفصيلية لكل خدمة قادمة قريبًا.",
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
    title: pageCopy.title[locale],
    description: pageCopy.description[locale],
    alternates: buildAlternates(locale, "services"),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  return (
    <>
      <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <SectionHeader
          locale={locale}
          eyebrow={pageCopy.eyebrow}
          title={pageCopy.title}
          description={pageCopy.description}
          titleAs="h1"
          className="mx-auto max-w-3xl"
        />
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="all-specialties-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="all-specialties-heading"
            eyebrow={specialtiesIntro.eyebrow}
            title={specialtiesIntro.title}
            description={specialtiesIntro.description}
          />
          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty) => (
              <StaggerItem key={specialty.id} id={`service-${specialty.slug}`} className="h-full scroll-mt-28">
                <ServiceCard specialty={specialty} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="all-conditions-heading">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            locale={locale}
            headingId="all-conditions-heading"
            eyebrow={conditionsIntro.eyebrow}
            title={conditionsIntro.title}
            description={conditionsIntro.description}
          />
          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition) => (
              <StaggerItem key={condition.id} id={`condition-${condition.slug}`} className="h-full scroll-mt-28">
                <ConditionCard condition={condition} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
