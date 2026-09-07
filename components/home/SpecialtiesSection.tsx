import { specialties, specialtiesIntro } from "@/data/specialties";
import { siteContent } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Locale } from "@/lib/i18n/config";
import { ServiceCard } from "./ServiceCard";

export function SpecialtiesSection({ locale }: { locale: Locale }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="specialties-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          locale={locale}
          headingId="specialties-heading"
          eyebrow={specialtiesIntro.eyebrow}
          title={specialtiesIntro.title}
          description={specialtiesIntro.description}
        />

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => (
            <StaggerItem key={specialty.id} className="h-full">
              <ServiceCard specialty={specialty} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button href={`/${locale}/services`} variant="secondary" withArrow>
            {siteContent.actions.viewAllServices[locale]}
          </Button>
        </div>
      </div>
    </section>
  );
}
