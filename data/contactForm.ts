import type { Localized } from "@/lib/types";

export type ContactMethod = "phone" | "whatsapp" | "email";

export interface ContactFormValues {
  fullName: string;
  phone: string;
  preferredContact: ContactMethod;
  preferredDate: string;
  message: string;
}

/** One logical content group for the entire patient contact form. */
export const contactFormContent = {
  fields: {
    fullName: {
      label: { en: "Full Name", ar: "الاسم الكامل" } satisfies Localized,
      placeholder: { en: "e.g. Ahmed Hassan", ar: "مثال: أحمد حسن" } satisfies Localized,
    },
    phone: {
      label: { en: "Phone Number", ar: "رقم الهاتف" } satisfies Localized,
      placeholder: { en: "e.g. +20 100 123 4567", ar: "مثال: ٠١٠٠١٢٣٤٥٦٧+٢٠" } satisfies Localized,
    },
    preferredContact: {
      label: { en: "Preferred Contact Method", ar: "طريقة التواصل المفضلة" } satisfies Localized,
      options: {
        phone: { en: "Phone Call", ar: "مكالمة هاتفية" } satisfies Localized,
        whatsapp: { en: "WhatsApp", ar: "واتساب" } satisfies Localized,
        email: { en: "Email", ar: "البريد الإلكتروني" } satisfies Localized,
      },
    },
    preferredDate: {
      label: { en: "Preferred Appointment Date", ar: "تاريخ الموعد المفضل" } satisfies Localized,
    },
    message: {
      label: { en: "Message / Reason for Visit", ar: "الرسالة / سبب الزيارة" } satisfies Localized,
      placeholder: {
        en: "Briefly describe what you'd like to discuss with Dr. Islam Moussa.",
        ar: "صف باختصار ما تود مناقشته مع د. إسلام موسى.",
      } satisfies Localized,
    },
  },

  validation: {
    required: { en: "This field is required.", ar: "هذا الحقل مطلوب." } satisfies Localized,
    invalidPhone: {
      en: "Please enter a valid phone number.",
      ar: "يرجى إدخال رقم هاتف صحيح.",
    } satisfies Localized,
    fixErrors: {
      en: "Please fill in the required fields before continuing.",
      ar: "يرجى تعبئة الحقول المطلوبة قبل المتابعة.",
    } satisfies Localized,
  },

  success: {
    title: { en: "Ready to Send", ar: "جاهز للإرسال" } satisfies Localized,
    description: {
      en: "Your message is ready — press \"Send via WhatsApp\" to deliver it to Dr. Islam Moussa's clinic.",
      ar: "رسالتك جاهزة، اضغط \"إرسال عبر واتساب\" لإرسالها إلى عيادة د. إسلام موسى.",
    } satisfies Localized,
  },

  submit: {
    whatsapp: { en: "Send via WhatsApp", ar: "إرسال عبر واتساب" } satisfies Localized,
  },

  /** Builds the pre-filled WhatsApp message text from the form's values. */
  buildWhatsAppMessage(values: ContactFormValues, locale: "en" | "ar"): string {
    const methodLabels = contactFormContent.fields.preferredContact.options;
    const contactMethodLabel = methodLabels[values.preferredContact][locale];

    if (locale === "ar") {
      return [
        "مرحبًا د. إسلام موسى،",
        "",
        "أرغب في حجز موعد.",
        "",
        `الاسم: ${values.fullName}`,
        `رقم الهاتف: ${values.phone}`,
        `طريقة التواصل المفضلة: ${contactMethodLabel}`,
        values.preferredDate ? `التاريخ المفضل: ${values.preferredDate}` : null,
        values.message ? `الرسالة: ${values.message}` : null,
      ]
        .filter((line): line is string => line !== null)
        .join("\n");
    }

    return [
      "Hello Dr. Islam Moussa,",
      "",
      "I would like to request an appointment.",
      "",
      `Name: ${values.fullName}`,
      `Phone: ${values.phone}`,
      `Preferred Contact Method: ${contactMethodLabel}`,
      values.preferredDate ? `Preferred Date: ${values.preferredDate}` : null,
      values.message ? `Message: ${values.message}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
  },
};
