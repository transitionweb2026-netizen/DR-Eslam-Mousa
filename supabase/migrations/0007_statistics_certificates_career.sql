-- ============================================================================
-- 0007: Statistics, Certificates, Career items
-- ============================================================================
-- Three simple, independently-orderable collections. `statistics` is shared
-- verbatim between Home and About (both just query all active rows) —
-- there is no per-page duplication.

create table public.statistics (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'experience',
  value numeric not null,
  prefix text not null default '',
  suffix text not null default '+',
  label_en text not null,
  label_ar text not null,
  description_en text,
  description_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  title_en text not null,
  title_ar text not null,
  institution_en text not null,
  institution_ar text not null,
  year text not null,
  description_en text,
  description_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_items (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  icon text not null default 'experience',
  position_en text not null,
  position_ar text not null,
  institution_en text not null,
  institution_ar text not null,
  description_en text,
  description_ar text,
  image_id uuid references public.media (id) on delete set null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index statistics_display_order_idx on public.statistics (display_order);
create index certificates_display_order_idx on public.certificates (display_order);
create index career_items_display_order_idx on public.career_items (display_order);

create trigger set_statistics_updated_at before update on public.statistics for each row execute function public.set_updated_at();
create trigger set_certificates_updated_at before update on public.certificates for each row execute function public.set_updated_at();
create trigger set_career_items_updated_at before update on public.career_items for each row execute function public.set_updated_at();

alter table public.statistics enable row level security;
alter table public.certificates enable row level security;
alter table public.career_items enable row level security;

create policy "Public can read active statistics" on public.statistics for select using (is_active = true);
create policy "Admins can manage statistics" on public.statistics for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active certificates" on public.certificates for select using (is_active = true);
create policy "Admins can manage certificates" on public.certificates for all using (public.is_admin()) with check (public.is_admin());

create policy "Public can read active career_items" on public.career_items for select using (is_active = true);
create policy "Admins can manage career_items" on public.career_items for all using (public.is_admin()) with check (public.is_admin());
