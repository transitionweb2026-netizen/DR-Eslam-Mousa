"use client";

import type { SpecialtyItem } from "@/data/specialties";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ServiceCard } from "@/components/home/ServiceCard";
import { ContentModal } from "@/components/services/ContentModal";
import { useHashSelection } from "@/lib/useHashSelection";
import type { Locale } from "@/lib/i18n/config";

/**
 * Every specialty as an interactive grid — clicking a card opens its detail
 * modal instead of navigating away. Also honors a `#service-{slug}` hash
 * (e.g. arriving from the Home page's specialty cards) by opening that
 * specialty's modal automatically on load.
 */
export function AllServicesGrid({ locale, specialties }: { locale: Locale; specialties: SpecialtyItem[] }) {
  const { selected, select, close } = useHashSelection("service", specialties);

  return (
    <>
      <Stagger className="mt-12 flex flex-wrap justify-center gap-6">
        {specialties.map((specialty) => (
          <StaggerItem
            key={specialty.id}
            id={`service-${specialty.slug}`}
            className="w-full scroll-mt-28 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ServiceCard specialty={specialty} locale={locale} onSelect={() => select(specialty)} />
          </StaggerItem>
        ))}
      </Stagger>

      <ContentModal item={selected} open={selected !== null} onClose={close} locale={locale} />
    </>
  );
}
