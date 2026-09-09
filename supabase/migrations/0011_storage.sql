-- ============================================================================
-- 0011: Storage buckets and policies
-- ============================================================================
-- Three public-read buckets, split by content type so size limits and
-- allowed MIME types can differ:
--   media          — all images (hero, doctor, services, conditions,
--                    certificates, articles, OG/SEO images)
--   video-covers   — video thumbnail images only
--   videos         — actual video files (much larger size limit)
--
-- Every bucket is publicly READABLE (the whole site is public marketing
-- content) but writes are restricted to authenticated CMS admins/editors.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']),
  ('video-covers', 'video-covers', true, 5242880, array['image/png', 'image/jpeg', 'image/webp']),
  ('videos', 'videos', true, 524288000, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do nothing;

create policy "Public can read media bucket"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Public can read video-covers bucket"
  on storage.objects for select
  using (bucket_id = 'video-covers');

create policy "Public can read videos bucket"
  on storage.objects for select
  using (bucket_id = 'videos');

create policy "Admins can upload to media bucket"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admins can update media bucket"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

create policy "Admins can delete from media bucket"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());

create policy "Admins can upload to video-covers bucket"
  on storage.objects for insert
  with check (bucket_id = 'video-covers' and public.is_admin());

create policy "Admins can update video-covers bucket"
  on storage.objects for update
  using (bucket_id = 'video-covers' and public.is_admin())
  with check (bucket_id = 'video-covers' and public.is_admin());

create policy "Admins can delete from video-covers bucket"
  on storage.objects for delete
  using (bucket_id = 'video-covers' and public.is_admin());

create policy "Admins can upload to videos bucket"
  on storage.objects for insert
  with check (bucket_id = 'videos' and public.is_admin());

create policy "Admins can update videos bucket"
  on storage.objects for update
  using (bucket_id = 'videos' and public.is_admin())
  with check (bucket_id = 'videos' and public.is_admin());

create policy "Admins can delete from videos bucket"
  on storage.objects for delete
  using (bucket_id = 'videos' and public.is_admin());
