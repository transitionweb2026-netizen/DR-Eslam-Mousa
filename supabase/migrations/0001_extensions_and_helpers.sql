-- ============================================================================
-- 0001: Extensions and shared helpers
-- ============================================================================
-- Foundational pieces every later migration depends on: UUID generation, the
-- `updated_at` auto-touch trigger, and the `is_admin()` helper used by every
-- RLS policy in this schema.

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- updated_at: every table below has this trigger attached individually so
-- `updated_at` never has to be set manually by application code.
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Trigger function: stamps updated_at = now() on every UPDATE.';
