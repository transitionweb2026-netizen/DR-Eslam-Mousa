import Image from "next/image";
import type { CertificateItem } from "@/data/certificates";
import type { Locale } from "@/lib/i18n/config";

export function CertificateCard({ certificate, locale }: { certificate: CertificateItem; locale: Locale }) {
  return (
    <div className="glass-card glass-sheen flex w-[240px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl p-3 select-none sm:w-[270px] sm:p-4">
      <div className="relative aspect-[7/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={certificate.image.src}
          alt={certificate.image.alt[locale]}
          fill
          draggable={false}
          sizes="270px"
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 pt-4">
        <span className="text-xs font-bold uppercase tracking-wide text-brand-blue">{certificate.year}</span>
        <h3 className="mt-1.5 text-base font-bold leading-snug text-brand-ink">{certificate.title[locale]}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">{certificate.institution[locale]}</p>
      </div>
    </div>
  );
}
