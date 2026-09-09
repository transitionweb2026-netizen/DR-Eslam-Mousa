-- ============================================================================
-- 0008: Videos
-- ============================================================================
-- One collection for the entire video library. The Home page's "Featured
-- Videos" section queries `is_featured = true` (exactly 3 in the seed data);
-- the Videos page queries the full active set. Cover image and the actual
-- video file are DELIBERATELY two separate media references — replacing
-- one must never touch the other.

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  category_en text,
  category_ar text,
  cover_media_id uuid references public.media (id) on delete set null,
  cover_alt_en text,
  cover_alt_ar text,
  video_media_id uuid references public.media (id) on delete set null,
  external_url text,
  duration_label text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  published_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.videos.cover_media_id is
  'Thumbnail image shown before playback. Independent of video_media_id — replacing one never replaces the other.';
comment on column public.videos.video_media_id is
  'The actual playable file in the videos storage bucket. Leave null and set external_url to embed a YouTube/Vimeo link instead.';

create index videos_display_order_idx on public.videos (display_order);
create index videos_is_featured_idx on public.videos (is_featured) where is_featured = true;

create trigger set_videos_updated_at before update on public.videos for each row execute function public.set_updated_at();

alter table public.videos enable row level security;

create policy "Public can read active videos" on public.videos for select using (is_active = true);
create policy "Admins can manage videos" on public.videos for all using (public.is_admin()) with check (public.is_admin());
