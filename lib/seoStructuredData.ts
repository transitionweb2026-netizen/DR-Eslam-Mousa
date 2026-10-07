import { localeTag, type Locale } from "@/lib/i18n/config";
import type { Localized } from "@/lib/types";
import { SITE_URL, absoluteUrl, localizedPath, type JsonLdObject } from "@/lib/seo";
import type { ContactLocation, SocialLink } from "@/data/contact";

interface SiteEntityInput {
  locale: Locale;
  brandName: Localized;
  credentials: Localized;
  phoneHref: string;
  email: string;
  locations: ContactLocation[];
  socialLinks: SocialLink[];
  imageUrl: string;
}

const PROFILE_KEYS = new Set<SocialLink["key"]>(["facebook", "instagram", "youtube"]);

function clinicAddress(location: ContactLocation, locale: Locale): JsonLdObject {
  return { "@type": "PostalAddress", streetAddress: location.address[locale], addressCountry: "EG" };
}

/**
 * Site-wide entities, emitted once per locale from the root layout: the
 * physician (name, specialty, real contact details, real clinic addresses)
 * and the website. Only facts present in the CMS/site content go in — no
 * ratings, credentials or hours beyond what's actually published. Booking
 * times are deliberately NOT emitted as openingHours.
 */
export function siteEntityJsonLd(input: SiteEntityInput): JsonLdObject[] {
  const physicianId = `${SITE_URL}/#physician`;
  const websiteId = `${SITE_URL}/#website`;
  const sameAs = input.socialLinks.filter((link) => PROFILE_KEYS.has(link.key) && link.href.startsWith("https://")).map((link) => link.href);

  const physician: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": physicianId,
    name: input.brandName[input.locale],
    jobTitle: input.credentials[input.locale],
    medicalSpecialty: "Orthopedic",
    url: absoluteUrl(localizedPath(input.locale, "")),
    image: input.imageUrl,
    telephone: input.phoneHref.replace(/^tel:/, ""),
    email: input.email,
    sameAs,
    // The first clinic is also the physician's own address, which Google
    // requires to read the entity as a local business.
    address: input.locations[0] ? clinicAddress(input.locations[0], input.locale) : undefined,
    location: input.locations.map((location) => ({
      "@type": "MedicalClinic",
      name: location.name[input.locale],
      address: clinicAddress(location, input.locale),
    })),
  };

  const website: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_URL}/`,
    // Google shows one site name per domain, so both languages declare the
    // same primary name, with the Arabic name as an alternate.
    name: input.brandName.en,
    alternateName: input.brandName.ar,
    inLanguage: localeTag[input.locale],
    publisher: { "@id": physicianId },
  };

  return [physician, website];
}
