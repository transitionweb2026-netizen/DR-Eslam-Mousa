/**
 * Substitutes the `{{name}} {{phone}} {{contactMethod}} {{date}} {{message}}`
 * placeholders used by `contact_form_settings.whatsapp_template_en/ar` (see
 * migration 0004). A whole line is dropped rather than left with an empty
 * value when its only placeholder is the optional date/message field — the
 * same behavior the original hardcoded builder in data/contactForm.ts had.
 *
 * No "server-only" import here on purpose: ContactForm (a Client Component)
 * calls this from its submit handler, using a template it received as a
 * prop from a server-fetched value — not by importing the query layer.
 */
export function buildWhatsAppMessage(
  template: string,
  values: { name: string; phone: string; contactMethod: string; date: string; message: string }
): string {
  const lines = template.split("\n").filter((line) => {
    if (line.includes("{{date}}") && !values.date.trim()) return false;
    if (line.includes("{{message}}") && !values.message.trim()) return false;
    return true;
  });

  return lines
    .map((line) =>
      line
        .replaceAll("{{name}}", values.name)
        .replaceAll("{{phone}}", values.phone)
        .replaceAll("{{contactMethod}}", values.contactMethod)
        .replaceAll("{{date}}", values.date)
        .replaceAll("{{message}}", values.message)
    )
    .join("\n");
}

/** Builds a wa.me deep link from a digits-only number and a pre-filled message. */
export function buildWhatsAppUrl(whatsappHref: string, message: string): string {
  const base = whatsappHref.split("?")[0];
  return `${base}?text=${encodeURIComponent(message)}`;
}
