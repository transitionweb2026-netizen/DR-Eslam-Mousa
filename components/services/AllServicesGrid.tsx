"use client";

import { specialties } from "@/data/specialties";
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
export function AllServicesGrid({ locale }: { locale: Locale }) {
  const { selected, select, close } = useHashSelection("service", specialties);

  return (
    <>
      <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty) => (
          <StaggerItem key={specialty.id} id={`service-${specialty.slug}`} className="h-full scroll-mt-28">
            <ServiceCard specialty={specialty} locale={locale} onSelect={() => select(specialty)} />
          </StaggerItem>
        ))}
      </Stagger>

      <ContentModal item={selected} open={selected !== null} onClose={close} locale={locale} />
    </>
  );
}
