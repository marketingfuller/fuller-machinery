-- ============================================================
-- Fuller Machinery — catálogo de productos editable desde /admin.
-- Mueve el catálogo (hoy en código) a la base de datos.
-- Ejecutar una vez en Supabase SQL Editor.
-- ============================================================

create table if not exists public.products (
  slug              text primary key,
  name              text not null,
  category          text not null,
  category_label    text not null,
  type              text,

  short_description text not null default '',
  description       text,
  description_html  text,
  highlights        text[]  not null default '{}',

  images            text[]  not null default '{}',
  specs             jsonb   not null default '[]',
  badge             jsonb,
  variants          jsonb,

  -- Comercial
  sku               text,
  price             numeric,
  currency          text,
  stock_status      text,
  available         boolean not null default true,

  -- SEO
  meta_title        text,
  meta_description  text,
  keywords          text[]  not null default '{}',

  -- Enlaces / config
  woo_url           text,
  woo_id            integer,
  whatsapp_message  text,
  hide_calculator   boolean not null default false,
  sort_order        integer,
  published         boolean not null default true,

  updated_at        timestamptz not null default now(),
  updated_by        uuid references auth.users (id) on delete set null
);

create index if not exists products_category_idx on public.products (category);

alter table public.products enable row level security;

-- Lectura pública (el sitio, el sitemap y el endpoint de ZOCAM la consumen sin login).
drop policy if exists "products readable by anyone" on public.products;
create policy "products readable by anyone"
  on public.products for select
  using (true);

-- Escritura solo admins. El server usa la service_role key (bypass de RLS)
-- tras verificar admin; esta política protege el acceso vía PostgREST.
drop policy if exists "products writable by admins" on public.products;
create policy "products writable by admins"
  on public.products for all
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Trigger para updated_at + updated_by (mismo patrón que site_settings).
create or replace function public.touch_products()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists trg_products_touch on public.products;
create trigger trg_products_touch
  before update on public.products
  for each row execute function public.touch_products();

-- ── Storage: bucket product-images (ya existe; se asegura y se abre a admins) ──
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product-images public read" on storage.objects;
create policy "product-images public read"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "product-images admin write" on storage.objects;
create policy "product-images admin write"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );

drop policy if exists "product-images admin update" on storage.objects;
create policy "product-images admin update"
  on storage.objects for update
  using (
    bucket_id = 'product-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );

drop policy if exists "product-images admin delete" on storage.objects;
create policy "product-images admin delete"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and exists (select 1 from public.admins a where a.user_id = auth.uid())
  );
