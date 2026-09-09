-- ============================================================================
-- 0003: Media library
-- ============================================================================
-- One row per uploaded file, regardless of what it's used for. Every image
-- and video reference anywhere else in the schema (hero images, card
-- images, video covers, actual video files, OG images...) is a foreign key
-- into this table rather than a bare storage path, so alt text, file
-- metadata and "where is this used" all live in one place.

create table public.media (
  id uuid primary key default gen_random_uuid(),
  -- A media row resolves to a URL one of two ways: EITHER it was uploaded
  -- through the CMS (bucket_id + storage_path point into Supabase Storage,
  -- set 0011's buckets), OR it's a seed/placeholder asset served straight
  -- from the Next.js app's /public folder (external_url = a root-relative
  -- path like /images/specialties/specialty-knee-placeholder.svg). This is
  -- what lets the seed data below reference the site's real placeholder
  -- images today, with zero file upload required — replacing one through
  -- the CMS later just fills in bucket_id/storage_path and clears
  -- external_url, with no change to any other table's foreign key.
  bucket_id text check (bucket_id in ('media', 'video-covers', 'videos')),
  storage_path text,
  external_url text,
  file_name text not null,
  mime_type text not null,
  file_size bigint,
  kind text not null check (kind in ('image', 'video', 'document')),
  category text not null default 'general'
    check (category in ('doctor', 'services', 'conditions', 'certificates', 'videos', 'articles', 'general', 'seo')),
  alt_text_en text,
  alt_text_ar text,
  width int,
  height int,
  duration_seconds int,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket_id, storage_path),
  constraint media_has_a_source check (
    (bucket_id is not null and storage_path is not null and external_url is null)
    or (bucket_id is null and storage_path is null and external_url is not null)
  )
);

comment on table public.media is
  'Every uploaded file (image or video), one row per file. Referenced by FK from every other table that needs an image/video.';
comment on column public.media.storage_path is
  'Path within the bucket, e.g. services/knee-surgery-cover.webp — combine with bucket_id to build the Supabase Storage public URL. Null for seed/placeholder rows that use external_url instead.';
comment on column public.media.external_url is
  'Root-relative or absolute URL used instead of Supabase Storage — how seed/placeholder media (served from the Next.js /public folder) is represented. Null once the file has been replaced via a real CMS upload.';

create index media_category_idx on public.media (category);
create index media_kind_idx on public.media (kind);

create trigger set_media_updated_at
  before update on public.media
  for each row execute function public.set_updated_at();

alter table public.media enable row level security;

create policy "Public can read media metadata"
  on public.media for select
  using (true);

create policy "Admins can manage media"
  on public.media for all
  using (public.is_admin())
  with check (public.is_admin());
