"use client";

import { useId, useState, type FormEvent } from "react";
import { contactFormContent, type ContactFormValues, type ContactMethod } from "@/data/contactForm";
import { contactInfo } from "@/data/contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/icons/Icon";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const CONTACT_METHODS: ContactMethod[] = ["whatsapp", "phone", "email"];

const inputClasses =
  "glass-panel w-full rounded-2xl border-transparent px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70 " +
  "outline-none transition-all duration-300 focus-visible:-translate-y-0.5 focus-visible:shadow-glass-lg " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

function buildWhatsAppUrl(message: string): string {
  const base = contactInfo.whatsappHref.split("?")[0];
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const formId = useId();
  const [values, setValues] = useState<ContactFormValues>({
    fullName: "",
    phone: "",
    preferredContact: "whatsapp",
    preferredDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [showFixMessage, setShowFixMessage] = useState(false);
  const [sent, setSent] = useState(false);

  const fields = contactFormContent.fields;
  const validation = contactFormContent.validation;

  function update<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSent(false);
  }

  function validate(): boolean {
    const nextErrors: typeof errors = {};
    if (!values.fullName.trim()) nextErrors.fullName = validation.required[locale];
    const digitsOnly = values.phone.replace(/[^\d]/g, "");
    if (!values.phone.trim()) nextErrors.phone = validation.required[locale];
    else if (digitsOnly.length < 8) nextErrors.phone = validation.invalidPhone[locale];

    setErrors(nextErrors);
    const isValid = Object.keys(nextErrors).length === 0;
    setShowFixMessage(!isValid);
    return isValid;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const message = contactFormContent.buildWhatsAppMessage(values, locale);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <GlassCard hover={false} className="glass-tint-blue flex flex-col gap-5 p-6 sm:p-8">
      <div>
        <label htmlFor={`${formId}-name`} className="mb-2 block text-sm font-semibold text-brand-ink">
          {fields.fullName.label[locale]}
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          placeholder={fields.fullName.placeholder[locale]}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
          className={cn(inputClasses, errors.fullName && "outline outline-2 outline-[#e0574c]/70")}
        />
        {errors.fullName && (
          <p id={`${formId}-name-error`} className="mt-1.5 text-xs font-medium text-[#c8452f]">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="mb-2 block text-sm font-semibold text-brand-ink">
          {fields.phone.label[locale]}
        </label>
        <input
          id={`${formId}-phone`}
          type="tel"
          dir="ltr"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          placeholder={fields.phone.placeholder[locale]}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          className={cn(inputClasses, "text-start", errors.phone && "outline outline-2 outline-[#e0574c]/70")}
        />
        {errors.phone && (
          <p id={`${formId}-phone-error`} className="mt-1.5 text-xs font-medium text-[#c8452f]">
            {errors.phone}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-semibold text-brand-ink">
          {fields.preferredContact.label[locale]}
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {CONTACT_METHODS.map((method) => {
            const active = values.preferredContact === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => update("preferredContact", method)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm",
                  active ? "bg-gradient-brand text-white shadow-glass" : "glass-panel text-brand-ink-soft hover:text-brand-blue"
                )}
              >
                {fields.preferredContact.options[method][locale]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${formId}-date`} className="mb-2 block text-sm font-semibold text-brand-ink">
          {fields.preferredDate.label[locale]}
        </label>
        <input
          id={`${formId}-date`}
          type="date"
          value={values.preferredDate}
          onChange={(event) => update("preferredDate", event.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-2 block text-sm font-semibold text-brand-ink">
          {fields.message.label[locale]}
        </label>
        <textarea
          id={`${formId}-message`}
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={fields.message.placeholder[locale]}
          className={cn(inputClasses, "resize-none")}
        />
      </div>

      {showFixMessage && (
        <p role="alert" className="flex items-start gap-2 text-sm font-medium text-[#c8452f]">
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
          {validation.fixErrors[locale]}
        </p>
      )}

      {sent && (
        <div role="status" className="chip-blue flex items-start gap-3 rounded-2xl p-4">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="text-sm font-bold text-brand-ink">{contactFormContent.success.title[locale]}</p>
            <p className="mt-1 text-xs leading-relaxed text-brand-muted">{contactFormContent.success.description[locale]}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="group relative mt-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-brand px-6 py-3.5 font-heading text-sm font-semibold text-white shadow-glass transition-all duration-500 hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0"
      >
        <Icon name="whatsapp" className="h-4 w-4" />
        {contactFormContent.submit.whatsapp[locale]}
      </button>
      </GlassCard>
    </form>
  );
}
