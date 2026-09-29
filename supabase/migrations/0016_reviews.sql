-- ============================================================================
-- 0016: Patient reviews section
-- ============================================================================
-- A new ordered collection for the About page: review cards with an
-- editable name, bilingual review text, and an uploaded icon (a generic
-- illustration representing a man or woman — never a real photo, and never
-- fabricated by anyone other than the clinic). Starts EMPTY on purpose, same
-- as doctor_gallery/research_papers in 0014 — real patient reviews must be
-- supplied by the clinic, never invented as placeholder content.

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  review_en text not null,
  review_ar text not null,
  icon_media_id uuid references public.media (id) on delete set null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.reviews.icon_media_id is
  'A generic man/woman illustration, not a real patient photo — uploaded via Content -> Reviews. Falls back to a neutral placeholder icon on the public site until one is uploaded.';

create index reviews_display_order_idx on public.reviews (display_order);

create trigger set_reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

alter table public.reviews enable row level security;

create policy "Public can read active reviews"
  on public.reviews for select
  using (is_active = true);

create policy "Admins can manage reviews"
  on public.reviews for all
  using (public.is_admin())
  with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- media: allow "reviews" as a category (see 0015 for why this drops by the
-- known exact constraint name instead of pattern-matching pg_get_constraintdef).
-- ----------------------------------------------------------------------------
alter table public.media
  drop constraint if exists media_category_check;

alter table public.media
  add constraint media_category_check
  check (category in ('doctor', 'services', 'conditions', 'certificates', 'videos', 'articles', 'general', 'seo', 'research', 'reviews'));
