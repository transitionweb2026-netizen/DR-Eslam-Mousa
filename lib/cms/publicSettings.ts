import "server-only";
import { getPublicClient } from "./publicClient";
import { siteContent } from "@/data/site";
import { navigationItems as fallbackNavigationItems, type NavItem } from "@/data/navigation";
import { contactInfo as fallbackContactInfo, socialLinks as fallbackSocialLinks, type SocialLink } from "@/data/contact";
import { finalCtaContent } from "@/data/cta";
import { contactFormContent } from "@/data/contactForm";
import type { Localized } from "@/lib/types";

/**
 * Global site settings, navigation, social links, footer, the one Final
 * CTA, contact info and the contact form's editable copy — every "Global
 * Settings" screen in the CMS admin. Each function is Supabase-first with a
 * typed fallback to the matching /data/*.ts constant, so an unconfigured or
 * unreachable Supabase project never breaks a page — see publicClient.ts.
 */

export interface SiteBranding {
  name: Localized;
  credentials: Localized;
}

export async function getSiteBranding(): Promise<SiteBranding> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
      if (data) {
        return {
          name: { en: data.org_name_en, ar: data.org_name_ar },
          credentials: { en: data.doctor_credentials_en, ar: data.doctor_credentials_ar },
        };
      }
    } catch (error) {
      console.error("[cms] getSiteBranding failed:", error);
    }
  }
  return { name: siteContent.brand.nameLocalized, credentials: siteContent.brand.credentials };
}

export async function getNavigationItems(): Promise<NavItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("navigation_items").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((row) => ({
          key: row.id,
          label: { en: row.label_en, ar: row.label_ar },
          path: row.url === "/" ? "" : row.url.replace(/^\/+/, ""),
        }));
      }
    } catch (error) {
      console.error("[cms] getNavigationItems failed:", error);
    }
  }
  return fallbackNavigationItems;
}

// Icon.tsx only draws glyphs for these platforms — a CMS row using a
// platform outside this set (tiktok/twitter/linkedin) is intentionally
// skipped here rather than rendered with no icon.
const SOCIAL_ICON_PLATFORMS = new Set<SocialLink["key"]>(["phone", "whatsapp", "facebook", "instagram", "youtube"]);

export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("social_links").select("*").order("display_order");
      if (data && data.length > 0) {
        return data
          .filter((row) => SOCIAL_ICON_PLATFORMS.has(row.platform as SocialLink["key"]))
          .map((row) => ({ key: row.platform as SocialLink["key"], label: { en: row.label_en, ar: row.label_ar }, href: row.value }));
      }
    } catch (error) {
      console.error("[cms] getSocialLinks failed:", error);
    }
  }
  return fallbackSocialLinks;
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  address: Localized;
  workingHours: Localized;
  mapUrl: string;
}

export async function getContactInfo(): Promise<ContactInfo> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("contact_settings").select("*").eq("id", true).maybeSingle();
      // Empty strings are the column defaults on an unseeded row — treat
      // that the same as "not configured yet" rather than showing blanks.
      if (data && data.phone_display && data.email) {
        return {
          phoneDisplay: data.phone_display,
          phoneHref: data.phone_href,
          whatsappHref: `https://wa.me/${data.whatsapp_number}`,
          email: data.email,
          emailHref: `mailto:${data.email}`,
          address: { en: data.address_en, ar: data.address_ar },
          workingHours: { en: data.working_hours_en ?? "", ar: data.working_hours_ar ?? "" },
          mapUrl: data.map_url,
        };
      }
    } catch (error) {
      console.error("[cms] getContactInfo failed:", error);
    }
  }
  return fallbackContactInfo;
}

export interface FooterContent {
  tagline: Localized;
  rights: Localized;
}

export async function getFooterContent(): Promise<FooterContent> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("footer_settings").select("*").eq("id", true).maybeSingle();
      if (data) {
        return {
          tagline: {
            en: data.description_en || siteContent.footer.tagline.en,
            ar: data.description_ar || siteContent.footer.tagline.ar,
          },
          rights: { en: data.copyright_en, ar: data.copyright_ar },
        };
      }
    } catch (error) {
      console.error("[cms] getFooterContent failed:", error);
    }
  }
  return { tagline: siteContent.footer.tagline, rights: siteContent.footer.rights };
}

/**
 * The one Final CTA shown verbatim on every page. `eyebrow` has no
 * `cta_settings` column (a small, stable chip label — out of scope per the
 * CMS spec's "not every word needs a controller"), so it always comes from
 * the bundled copy; everything else — heading, description, both buttons,
 * and whether the section shows at all — is fully CMS-driven.
 */
export interface FinalCtaSettings {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  primaryLabel: Localized;
  primaryUrl: string;
  secondaryLabel: Localized;
  secondaryUrl: string;
  isVisible: boolean;
}

export async function getFinalCtaSettings(): Promise<FinalCtaSettings> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("cta_settings").select("*").eq("id", true).maybeSingle();
      if (data) {
        return {
          eyebrow: finalCtaContent.eyebrow,
          title: { en: data.heading_en, ar: data.heading_ar },
          description: {
            en: data.description_en || finalCtaContent.description.en,
            ar: data.description_ar || finalCtaContent.description.ar,
          },
          primaryLabel: { en: data.primary_label_en, ar: data.primary_label_ar },
          primaryUrl: data.primary_url,
          secondaryLabel: { en: data.secondary_label_en, ar: data.secondary_label_ar },
          secondaryUrl: data.secondary_url,
          isVisible: data.is_visible,
        };
      }
    } catch (error) {
      console.error("[cms] getFinalCtaSettings failed:", error);
    }
  }
  return {
    ...finalCtaContent,
    primaryLabel: siteContent.actions.bookAppointment,
    primaryUrl: "/contact",
    secondaryLabel: siteContent.actions.contactUs,
    secondaryUrl: "/contact",
    isVisible: true,
  };
}

export interface ContactFormFieldLabels {
  fullName: { label: Localized; placeholder: Localized };
  phone: { label: Localized; placeholder: Localized };
  preferredContact: { label: Localized };
  preferredDate: { label: Localized };
  message: { label: Localized; placeholder: Localized };
}

export interface ContactFormSettings {
  fieldLabels: ContactFormFieldLabels;
  successMessage: Localized;
  errorMessage: Localized;
  whatsappTemplate: Localized;
}

function looksLikeFieldLabels(value: unknown): value is ContactFormFieldLabels {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return Boolean(v.fullName && v.phone && v.preferredContact && v.preferredDate && v.message);
}

export async function getContactFormSettings(): Promise<ContactFormSettings> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("contact_form_settings").select("*").eq("id", true).maybeSingle();
      if (data && looksLikeFieldLabels(data.field_labels)) {
        return {
          fieldLabels: data.field_labels,
          successMessage: { en: data.success_message_en, ar: data.success_message_ar },
          errorMessage: { en: data.error_message_en, ar: data.error_message_ar },
          whatsappTemplate: { en: data.whatsapp_template_en, ar: data.whatsapp_template_ar },
        };
      }
    } catch (error) {
      console.error("[cms] getContactFormSettings failed:", error);
    }
  }
  return {
    fieldLabels: contactFormContent.fields,
    successMessage: contactFormContent.success.description,
    errorMessage: contactFormContent.validation.fixErrors,
    whatsappTemplate: {
      en: "Hello Dr. Islam Moussa,\n\nI would like to request an appointment.\n\nName: {{name}}\nPhone: {{phone}}\nPreferred Contact Method: {{contactMethod}}\nPreferred Date: {{date}}\nMessage: {{message}}",
      ar: "مرحبًا د. إسلام موسى،\n\nأرغب في حجز موعد.\n\nالاسم: {{name}}\nرقم الهاتف: {{phone}}\nطريقة التواصل المفضلة: {{contactMethod}}\nالتاريخ المفضل: {{date}}\nالرسالة: {{message}}",
    },
  };
}
