-- ============================================================================
-- 0013: Contact locations — a clinic can have more than one branch
-- ============================================================================
-- contact_settings originally held ONE address/map/hours inline (fine for a
-- single-location clinic). That assumption turned out wrong — replace it
-- with a proper ordered collection, the same pattern as every other
-- repeatable content in this schema (services, videos, etc.), so any
-- number of branches works with independent ordering/visibility.

create table public.contact_locations (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  address_en text not null,
  address_ar text not null,
  hours_en text,
  hours_ar text,
  map_url text not null default '',
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.contact_locations is
  'Clinic branches shown on the Contact page and in the Footer. Ordered, independently hideable — see display_order/is_active.';

create index contact_locations_display_order_idx on public.contact_locations (display_order);

create trigger set_contact_locations_updated_at
  before update on public.contact_locations
  for each row execute function public.set_updated_at();

alter table public.contact_locations enable row level security;

create policy "Public can read active contact_locations"
  on public.contact_locations for select
  using (is_active = true);

create policy "Admins can manage contact_locations"
  on public.contact_locations for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- contact_settings keeps only what's genuinely site-wide (phone/WhatsApp/
-- email and general reception hours); the single address/map/location-image
-- columns move to contact_locations above.
-- ----------------------------------------------------------------------------
alter table public.contact_settings
  drop column if exists address_en,
  drop column if exists address_ar,
  drop column if exists location_image_id,
  drop column if exists location_image_alt_en,
  drop column if exists location_image_alt_ar,
  drop column if exists map_url;
