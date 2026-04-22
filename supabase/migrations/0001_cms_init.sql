-- ============================================================
-- Fuller Machinery CMS — initial schema
-- Run this once in Supabase SQL Editor (or via CLI).
-- ============================================================

-- 1) site_settings: single-row table, id = 'main'.
create table if not exists public.site_settings (
  id text primary key default 'main',
  whatsapp_commercial text not null,
  whatsapp_support    text not null,

  -- Hero izquierdo (Emprendimiento)
  hero_left_enabled     boolean not null default true,
  hero_left_image_url   text,
  hero_left_eyebrow     text,
  hero_left_title       text,
  hero_left_title_accent text,
  hero_left_subtitle    text,
  hero_left_button_text text,
  hero_left_button_url  text,

  -- Hero derecho (Industrial)
  hero_right_enabled     boolean not null default true,
  hero_right_image_url   text,
  hero_right_eyebrow     text,
  hero_right_title       text,
  hero_right_title_accent text,
  hero_right_subtitle    text,
  hero_right_button_text text,
  hero_right_button_url  text,

  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

-- Seed con valores actuales del sitio.
insert into public.site_settings (id, whatsapp_commercial, whatsapp_support,
  hero_left_image_url, hero_left_eyebrow, hero_left_title, hero_left_title_accent,
  hero_left_subtitle, hero_left_button_text, hero_left_button_url,
  hero_right_image_url, hero_right_eyebrow, hero_right_title, hero_right_title_accent,
  hero_right_subtitle, hero_right_button_text, hero_right_button_url)
values (
  'main',
  '573244247198',
  '573228534925',
  '/images/Hero-iniciatupropionegocio.webp',
  'Alta Rentabilidad',
  'Inicia tu propio',
  'Negocio Viral',
  'Equipos de tendencia para waffles, helados y bebidas que garantizan filas de clientes.',
  'VER EQUIPOS PARA EMPRENDER',
  'https://tienda.fullermachinery.com/index.php/categoria-producto/comida-divertida/page/3/',
  '/images/Hero-potencia.webp',
  'Línea Industrial',
  'Potencia y',
  'Estandarización',
  'Soluciones de empaque al vacío y procesamiento para maximizar la eficiencia de tu planta.',
  'VER LÍNEA INDUSTRIAL',
  'https://tienda.fullermachinery.com/index.php/categoria-producto/preparacion-de-alimentos/equipos-industriales-preparacion-de-alimentos/'
)
on conflict (id) do nothing;

-- 2) admins: whitelist of users allowed to edit settings.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- 3) RLS
alter table public.site_settings enable row level security;
alter table public.admins        enable row level security;

-- Lectura pública de site_settings (el sitio la consume sin login).
drop policy if exists "site_settings readable by anyone" on public.site_settings;
create policy "site_settings readable by anyone"
  on public.site_settings for select
  using (true);

-- Solo admins pueden update. No permitimos insert/delete desde el cliente;
-- el registro 'main' ya existe por el seed.
drop policy if exists "site_settings updatable by admins" on public.site_settings;
create policy "site_settings updatable by admins"
  on public.site_settings for update
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- admins: solo admins pueden leer la lista (nadie puede modificarla vía PostgREST;
-- se gestiona con la service_role key desde el server).
drop policy if exists "admins readable by admins" on public.admins;
create policy "admins readable by admins"
  on public.admins for select
  using (user_id = auth.uid());

-- 4) Trigger para updated_at + updated_by
create or replace function public.touch_site_settings()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_touch on public.site_settings;
create trigger trg_site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_site_settings();

-- 5) Storage bucket para imágenes del hero.
insert into storage.buckets (id, name, public)
values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

-- Lectura pública del bucket.
drop policy if exists "hero-images public read" on storage.objects;
create policy "hero-images public read"
  on storage.objects for select
  using (bucket_id = 'hero-images');

-- Solo admins pueden subir/actualizar/borrar.
drop policy if exists "hero-images admin write" on storage.objects;
create policy "hero-images admin write"
  on storage.objects for insert
  with check (
    bucket_id = 'hero-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );

drop policy if exists "hero-images admin update" on storage.objects;
create policy "hero-images admin update"
  on storage.objects for update
  using (
    bucket_id = 'hero-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );

drop policy if exists "hero-images admin delete" on storage.objects;
create policy "hero-images admin delete"
  on storage.objects for delete
  using (
    bucket_id = 'hero-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );
