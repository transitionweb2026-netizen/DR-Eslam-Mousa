"use client";

import type { ConditionItem } from "@/data/conditions";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ConditionCard } from "@/components/home/ConditionCard";
import { ContentModal } from "@/components/services/ContentModal";
import { useHashSelection } from "@/lib/useHashSelection";
import type { Locale } from "@/lib/i18n/config";

/**
 * Every condition as an interactive grid — clicking a card opens its detail
 * modal instead of navigating away. Also honors a `#condition-{slug}` hash
 * (e.g. arriving from the Home page's condition cards) by opening that
 * condition's modal automatically on load.
 */
export function WhatWeTreatGrid({ locale, conditions }: { locale: Locale; conditions: ConditionItem[] }) {
  const { selected, select, close } = useHashSelection("condition", conditions);

  return (
    <>
      <Stagger className="mt-12 flex flex-wrap justify-center gap-6">
        {conditions.map((condition) => (
          <StaggerItem
            key={condition.id}
            id={`condition-${condition.slug}`}
            className="w-full scroll-mt-28 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ConditionCard condition={condition} locale={locale} onSelect={() => select(condition)} />
          </StaggerItem>
        ))}
      </Stagger>

      <ContentModal item={selected} open={selected !== null} onClose={close} locale={locale} />
    </>
  );
}
