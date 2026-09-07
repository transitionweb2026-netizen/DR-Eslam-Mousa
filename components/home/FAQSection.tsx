import { faqIntro, faqItems } from "@/data/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";
import { FAQAccordion } from "./FAQAccordion";

export function FAQSection({ locale }: { locale: Locale }) {
  const half = Math.ceil(faqItems.length / 2);
  const columns = [faqItems.slice(0, half), faqItems.slice(half)];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          locale={locale}
          headingId="faq-heading"
          eyebrow={faqIntro.eyebrow}
          title={faqIntro.title}
          description={faqIntro.description}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.05}>
                  <FAQAccordion item={item} locale={locale} />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
