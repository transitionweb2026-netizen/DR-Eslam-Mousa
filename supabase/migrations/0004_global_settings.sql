-- ============================================================================
-- 0004: Global settings — everything shared across every page
-- ============================================================================
-- site_settings / navbar_settings / footer_settings / cta_settings /
-- contact_settings / contact_form_settings are all SINGLETON tables (exactly
-- one row). The `id boolean primary key default true check (id)` trick below
-- is the standard Postgres way to enforce "at most one row" — a second
-- INSERT would need id=true again, which the primary key already forbids.
--
-- navigation_items and social_links are real collections (multiple rows,
-- ordered, individually toggleable) rather than singletons.

-- ----------------------------------------------------------------------------
-- site_settings — website identity + global SEO defaults
-- ----------------------------------------------------------------------------
create table public.site_settings (
  id boolean primary key default true check (id),
  website_title text not null default 'Dr. Islam Moussa',
  website_url text not null default 'https://www.dr-islammoussa.com',
  org_name_en text not null default 'Dr. Islam Moussa',
  org_name_ar text not null default 'د. إسلام موسى',
  doctor_credentials_en text not null default 'Orthopedic & Joint Replacement Surgeon',
  doctor_credentials_ar text not null default 'استشاري جراحة العظام والمفاصل',
  logo_media_id uuid references public.media (id) on delete set null,
  favicon_media_id uuid references public.media (id) on delete set null,
  default_meta_description_en text,
  default_meta_description_ar text,
  default_og_image_id uuid references public.media (id) on delete set null,
  default_language text not null default 'en' check (default_language in ('en', 'ar')),
  default_robots text not null default 'index,follow',
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id) values (true);

create table public.navbar_settings (
  id boolean primary key default true check (id),
  appointment_label_en text not null default 'Book an Appointment',
  appointment_label_ar text not null default 'احجز موعدك',
  appointment_url text not null default '/contact',
  updated_at timestamptz not null default now()
);
insert into public.navbar_settings (id) values (true);

create table public.footer_settings (
  id boolean primary key default true check (id),
  description_en text,
  description_ar text,
  copyright_en text not null default 'All rights reserved.',
  copyright_ar text not null default 'جميع الحقوق محفوظة.',
  updated_at timestamptz not null default now()
);
insert into public.footer_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- cta_settings — the ONE Final CTA shared verbatim by every page
-- ----------------------------------------------------------------------------
create table public.cta_settings (
  id boolean primary key default true check (id),
  heading_en text not null default 'Take the First Step Toward Moving Freely Again',
  heading_ar text not null default 'اتخذ خطوتك الأولى نحو الحركة الحرة من جديد',
  description_en text,
  description_ar text,
  primary_label_en text not null default 'Book an Appointment',
  primary_label_ar text not null default 'احجز موعدك',
  primary_url text not null default '/contact',
  secondary_label_en text not null default 'Contact Us',
  secondary_label_ar text not null default 'تواصل معنا',
  secondary_url text not null default '/contact',
  background_image_id uuid references public.media (id) on delete set null,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);
insert into public.cta_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- contact_settings — address, map, phone/WhatsApp/email, hours
-- ----------------------------------------------------------------------------
create table public.contact_settings (
  id boolean primary key default true check (id),
  address_en text not null default '',
  address_ar text not null default '',
  location_image_id uuid references public.media (id) on delete set null,
  location_image_alt_en text,
  location_image_alt_ar text,
  map_url text not null default '',
  phone_display text not null default '',
  phone_href text not null default '',
  whatsapp_number text not null default '', -- digits only, e.g. 201000000000 — used to build wa.me links server + client side
  email text not null default '',
  working_hours_en text,
  working_hours_ar text,
  updated_at timestamptz not null default now()
);
insert into public.contact_settings (id) values (true);

comment on column public.contact_settings.whatsapp_number is
  'Digits only (country code + number, no +). This is the single source of truth for the WhatsApp destination used by the Hero panel, Footer, and the Contact form — never hardcode a number in the frontend.';

-- ----------------------------------------------------------------------------
-- contact_form_settings — the patient form's editable copy + WhatsApp template
-- ----------------------------------------------------------------------------
create table public.contact_form_settings (
  id boolean primary key default true check (id),
  title_en text not null default 'Find Us & Send a Message',
  title_ar text not null default 'موقعنا وإرسال رسالة',
  description_en text,
  description_ar text,
  field_labels jsonb not null default '{
    "fullName": {"label": {"en": "Full Name", "ar": "الاسم الكامل"}, "placeholder": {"en": "e.g. Ahmed Hassan", "ar": "مثال: أحمد حسن"}, "required": true},
    "phone": {"label": {"en": "Phone Number", "ar": "رقم الهاتف"}, "placeholder": {"en": "e.g. +20 100 123 4567", "ar": "مثال: ٠١٠٠١٢٣٤٥٦٧+٢٠"}, "required": true},
    "preferredContact": {"label": {"en": "Preferred Contact Method", "ar": "طريقة التواصل المفضلة"}, "required": false},
    "preferredDate": {"label": {"en": "Preferred Appointment Date", "ar": "تاريخ الموعد المفضل"}, "required": false},
    "message": {"label": {"en": "Message / Reason for Visit", "ar": "الرسالة / سبب الزيارة"}, "placeholder": {"en": "Briefly describe what you would like to discuss.", "ar": "صف باختصار ما تود مناقشته."}, "required": false}
  }'::jsonb,
  success_message_en text not null default 'Your message is ready to send.',
  success_message_ar text not null default 'رسالتك جاهزة للإرسال.',
  error_message_en text not null default 'Please fill in the required fields before continuing.',
  error_message_ar text not null default 'يرجى تعبئة الحقول المطلوبة قبل المتابعة.',
  whatsapp_template_en text not null default
    E'Hello Dr. Islam Moussa,\n\nI would like to request an appointment.\n\nName: {{name}}\nPhone: {{phone}}\nPreferred Contact Method: {{contactMethod}}\nPreferred Date: {{date}}\nMessage: {{message}}',
  whatsapp_template_ar text not null default
    E'مرحبًا د. إسلام موسى،\n\nأرغب في حجز موعد.\n\nالاسم: {{name}}\nرقم الهاتف: {{phone}}\nطريقة التواصل المفضلة: {{contactMethod}}\nالتاريخ المفضل: {{date}}\nالرسالة: {{message}}',
  updated_at timestamptz not null default now()
);
insert into public.contact_form_settings (id) values (true);

comment on column public.contact_form_settings.whatsapp_template_en is
  'Plain-text template with {{name}} {{phone}} {{contactMethod}} {{date}} {{message}} placeholders, substituted client-side before opening wa.me.';

-- ----------------------------------------------------------------------------
-- navigation_items — Navbar / Footer / MobileMenu links (ordered collection)
-- ----------------------------------------------------------------------------
create table public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_ar text not null,
  url text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- social_links — Hero contact panel / Footer / Contact page (ordered collection)
-- ----------------------------------------------------------------------------
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('phone', 'whatsapp', 'facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin')),
  label_en text not null,
  label_ar text not null,
  value text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.social_links.value is
  'Full href — tel:, https://wa.me/..., or a profile URL.';

-- ----------------------------------------------------------------------------
-- triggers
-- ----------------------------------------------------------------------------
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger set_navbar_settings_updated_at before update on public.navbar_settings for each row execute function public.set_updated_at();
create trigger set_footer_settings_updated_at before update on public.footer_settings for each row execute function public.set_updated_at();
create trigger set_cta_settings_updated_at before update on public.cta_settings for each row execute function public.set_updated_at();
create trigger set_contact_settings_updated_at before update on public.contact_settings for each row execute function public.set_updated_at();
create trigger set_contact_form_settings_updated_at before update on public.contact_form_settings for each row execute function public.set_updated_at();
create trigger set_navigation_items_updated_at before update on public.navigation_items for each row execute function public.set_updated_at();
create trigger set_social_links_updated_at before update on public.social_links for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS — all "global settings" content is public-readable (the whole site
-- depends on it rendering for anonymous visitors); only admins write.
-- ----------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.navbar_settings enable row level security;
alter table public.footer_settings enable row level security;
alter table public.cta_settings enable row level security;
alter table public.contact_settings enable row level security;
alter table public.contact_form_settings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.social_links enable row level security;

create policy "Public can read site_settings" on public.site_settings for select using (true);
create policy "Admins can manage site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read navbar_settings" on public.navbar_settings for select using (true);
create policy "Admins can manage navbar_settings" on public.navbar_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read footer_settings" on public.footer_settings for select using (true);
create policy "Admins can manage footer_settings" on public.footer_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read cta_settings" on public.cta_settings for select using (true);
create policy "Admins can manage cta_settings" on public.cta_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read contact_settings" on public.contact_settings for select using (true);
create policy "Admins can manage contact_settings" on public.contact_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read contact_form_settings" on public.contact_form_settings for select using (true);
create policy "Admins can manage contact_form_settings" on public.contact_form_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active navigation_items" on public.navigation_items for select using (is_active = true);
create policy "Admins can manage navigation_items" on public.navigation_items for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active social_links" on public.social_links for select using (is_active = true);
create policy "Admins can manage social_links" on public.social_links for all using (public.is_admin()) with check (public.is_admin());
