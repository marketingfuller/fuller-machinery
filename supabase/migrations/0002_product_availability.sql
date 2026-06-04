-- ============================================================
-- Fuller Machinery — control de disponibilidad de productos.
-- Inventario simple on/off, editable desde /admin.
-- Ejecutar una vez en Supabase SQL Editor.
-- ============================================================

-- Solo se guardan los productos cuya disponibilidad se cambió desde el panel.
-- Los que no tienen fila se consideran disponibles (default del seed).
create table if not exists public.product_availability (
  slug text primary key,
  available boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

alter table public.product_availability enable row level security;

-- Lectura pública: el sitio y el endpoint de ZOCAM la consumen sin login.
drop policy if exists "product_availability readable by anyone" on public.product_availability;
create policy "product_availability readable by anyone"
  on public.product_availability for select
  using (true);

-- Escritura solo admins. El server usa la service_role key (bypass de RLS)
-- tras verificar admin; esta política protege el acceso vía PostgREST.
drop policy if exists "product_availability writable by admins" on public.product_availability;
create policy "product_availability writable by admins"
  on public.product_availability for all
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));
