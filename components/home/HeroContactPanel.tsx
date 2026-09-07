import { contactInfo, socialLinks } from "@/data/contact";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n/config";

const callLabel = { en: "Call us now", ar: "اتصل بنا الآن" } as const;

export function HeroContactPanel({ locale, className }: { locale: Locale; className?: string }) {
  const socials = socialLinks.filter((social) => social.key !== "phone");

  return (
    <Reveal delay={0.5} y={22} className={className}>
      <div className="glass-card-strong glass-sheen animate-float-slow flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-3xl p-5 sm:p-6 lg:w-72">
        <a
          href={contactInfo.phoneHref}
          className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 transition-colors duration-300 hover:bg-white/[0.1]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
            <Icon name="phone" className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-medium text-brand-muted">{callLabel[locale]}</span>
            <span dir="ltr" className="block truncate text-sm font-bold text-brand-ink">
              {contactInfo.phoneDisplay}
            </span>
          </span>
        </a>

        <div className="flex items-center justify-between gap-2">
          {socials.map((social) => (
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label[locale]}
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-xl text-brand-purple-glow transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue"
            >
              <Icon name={social.key} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
