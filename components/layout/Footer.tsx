import Link from "next/link";
import { siteContent } from "@/data/site";
import type { NavItem } from "@/data/navigation";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";
import { Icon } from "@/components/icons/Icon";
import type { Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";

interface FooterProps {
  locale: Locale;
  navigationItems: NavItem[];
  socialLinks: SocialLink[];
  brandName: Localized;
  brandCredentials: Localized;
  tagline: Localized;
  rights: Localized;
  contactInfo: ContactInfo;
}

export function Footer({ locale, navigationItems, socialLinks, brandName, brandCredentials, tagline, rights, contactInfo }: FooterProps) {
  const localeRoot = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 px-3 pb-8 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto max-w-7xl rounded-3xl px-6 py-10 sm:px-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-heading text-xl font-extrabold text-brand-ink">
              {brandName[locale]}
            </span>
            <p className="mt-2 text-sm font-semibold text-brand-blue">
              {brandCredentials[locale]}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
              {tagline[locale]}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-ink">
              {siteContent.footer.quickLinksTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigationItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.path ? `${localeRoot}/${item.path}` : localeRoot}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-blue"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-ink">
              {siteContent.footer.contactTitle[locale]}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-muted">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <a href={contactInfo.phoneHref} className="hover:text-brand-blue">
                  {contactInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <a href={contactInfo.emailHref} className="hover:text-brand-blue">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <span>{contactInfo.address[locale]}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                <span>{contactInfo.workingHours[locale]}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-ink">
              {siteContent.footer.followTitle[locale]}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label[locale]}
                  className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-brand-purple-glow transition-all hover:-translate-y-0.5 hover:text-brand-blue"
                >
                  <Icon name={social.key} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-line/70 pt-6 text-center text-xs text-brand-muted sm:flex-row sm:text-start">
          <p>
            © {year} {brandName[locale]} — {rights[locale]}
          </p>
        </div>
      </div>
    </footer>
  );
}
