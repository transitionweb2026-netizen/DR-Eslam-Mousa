-- ============================================================================
-- 0006: Services (specialties) and Conditions
-- ============================================================================
-- Both are real, independent collections — each row is referenced by both
-- the Home page (a featured subset) and the Services page (the full list),
-- never duplicated. Each has its own SEO sub-table, matching the Article /
-- Page pattern already established in 0005.

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'knee',
  title_en text not null,
  title_ar text not null,
  short_description_en text not null,
  short_description_ar text not null,
  full_description_en text[] not null default '{}',
  full_description_ar text[] not null default '{}',
  benefits_en text[] not null default '{}',
  benefits_ar text[] not null default '{}',
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  cta_label_en text,
  cta_label_ar text,
  cta_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_seo (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade unique,
  seo_title_en text,
  seo_title_ar text,
  meta_description_en text,
  meta_description_ar text,
  canonical_url text,
  og_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.conditions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'knee',
  title_en text not null,
  title_ar text not null,
  short_description_en text not null,
  short_description_ar text not null,
  full_description_en text[] not null default '{}',
  full_description_ar text[] not null default '{}',
  benefits_en text[] not null default '{}',
  benefits_ar text[] not null default '{}',
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  cta_label_en text,
  cta_label_ar text,
  cta_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.condition_seo (
  id uuid primary key default gen_random_uuid(),
  condition_id uuid not null references public.conditions (id) on delete cascade unique,
  seo_title_en text,
  seo_title_ar text,
  meta_description_en text,
  meta_description_ar text,
  canonical_url text,
  og_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  updated_at timestamptz not null default now()
);

create index services_display_order_idx on public.services (display_order);
create index conditions_display_order_idx on public.conditions (display_order);

create trigger set_services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger set_service_seo_updated_at before update on public.service_seo for each row execute function public.set_updated_at();
create trigger set_conditions_updated_at before update on public.conditions for each row execute function public.set_updated_at();
create trigger set_condition_seo_updated_at before update on public.condition_seo for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.service_seo enable row level security;
alter table public.conditions enable row level security;
alter table public.condition_seo enable row level security;

create policy "Public can read active services" on public.services for select using (is_active = true);
create policy "Admins can manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read service_seo" on public.service_seo for select using (true);
create policy "Admins can manage service_seo" on public.service_seo for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active conditions" on public.conditions for select using (is_active = true);
create policy "Admins can manage conditions" on public.conditions for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read condition_seo" on public.condition_seo for select using (true);
create policy "Admins can manage condition_seo" on public.condition_seo for all using (public.is_admin()) with check (public.is_admin());
