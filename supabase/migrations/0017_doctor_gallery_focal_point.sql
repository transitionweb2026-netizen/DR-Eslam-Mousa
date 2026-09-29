-- ============================================================================
-- 0017: Per-photo focal point for the Doctor Photo Gallery
-- ============================================================================
-- Cards crop to a fixed 3:4 aspect with object-cover (see
-- DoctorGallerySection.tsx). A photo whose subject isn't already centered in
-- its own frame (e.g. a wide TV-interview screenshot) gets cropped off-center
-- by default. Same mechanism as hero/contact_cta's `image_position` field —
-- an optional CSS object-position value, defaulting to plain "center" when
-- unset so every existing photo keeps rendering exactly as it does today.

alter table public.doctor_gallery
  add column if not exists image_position text;

comment on column public.doctor_gallery.image_position is
  'Optional CSS object-position (e.g. "25% center") to re-center a photo whose subject isn''t already centered in its own frame. Defaults to "center" when null.';
