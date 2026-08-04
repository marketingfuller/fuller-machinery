import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductSpec,
  ProductVariant,
  StockStatus,
} from "@/content/products/types";

// ────────────────────────────────────────────────────────────
// Lectura del catálogo desde Supabase (tabla `products`).
// Fuente de verdad desde el panel /admin. Si la tabla está vacía o
// Supabase no responde, src/lib/products.ts cae a los seeds de código.
// ────────────────────────────────────────────────────────────

export const PRODUCTS_TAG = "products";

// Fila cruda de la tabla public.products (snake_case).
export type ProductRow = {
  slug: string;
  name: string;
  category: string;
  category_label: string;
  type: string | null;
  short_description: string;
  description: string | null;
  description_html: string | null;
  highlights: string[] | null;
  images: string[] | null;
  specs: ProductSpec[] | null;
  badge: ProductBadge | null;
  variants: ProductVariant[] | null;
  sku: string | null;
  price: number | string | null;
  currency: string | null;
  stock_status: string | null;
  available: boolean | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  woo_url: string | null;
  woo_id: number | null;
  whatsapp_message: string | null;
  hide_calculator: boolean | null;
  sort_order: number | null;
  published: boolean | null;
};

function undef<T>(v: T | null | undefined): T | undefined {
  return v === null || v === undefined ? undefined : v;
}

/** Mapea una fila de la DB al tipo Product del dominio. */
export function rowToProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category as ProductCategory,
    categoryLabel: row.category_label,
    type: undef(row.type),
    shortDescription: row.short_description ?? "",
    description: undef(row.description),
    descriptionHtml: undef(row.description_html),
    highlights: row.highlights?.length ? row.highlights : undefined,
    images: row.images ?? [],
    specs: row.specs ?? [],
    badge: undef(row.badge),
    variants: row.variants?.length ? row.variants : undefined,
    sku: undef(row.sku),
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    currency: undef(row.currency),
    stockStatus: undef(row.stock_status) as StockStatus | undefined,
    available: undef(row.available),
    metaTitle: undef(row.meta_title),
    metaDescription: undef(row.meta_description),
    keywords: row.keywords?.length ? row.keywords : undefined,
    wooUrl: undef(row.woo_url),
    wooId: undef(row.woo_id),
    whatsappMessage: undef(row.whatsapp_message),
    hideCalculator: undef(row.hide_calculator),
    sortOrder: undef(row.sort_order),
    published: undef(row.published),
  };
}

// Columnas escribibles (sin updated_at/updated_by, que las pone el trigger).
export type ProductWriteRow = Omit<ProductRow, "price"> & { price: number | null };

/** Mapea un Product del dominio a fila escribible de la DB (snake_case). */
export function productToRow(p: Product): ProductWriteRow {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    category_label: p.categoryLabel,
    type: p.type ?? null,
    short_description: p.shortDescription ?? "",
    description: p.description ?? null,
    description_html: p.descriptionHtml ?? null,
    highlights: p.highlights ?? [],
    images: p.images ?? [],
    specs: p.specs ?? [],
    badge: p.badge ?? null,
    variants: p.variants ?? null,
    sku: p.sku ?? null,
    price: p.price ?? null,
    currency: p.currency ?? null,
    stock_status: p.stockStatus ?? null,
    available: p.available ?? true,
    meta_title: p.metaTitle ?? null,
    meta_description: p.metaDescription ?? null,
    keywords: p.keywords ?? [],
    woo_url: p.wooUrl ?? null,
    woo_id: p.wooId ?? null,
    whatsapp_message: p.whatsappMessage ?? null,
    hide_calculator: p.hideCalculator ?? false,
    sort_order: p.sortOrder ?? null,
    published: p.published ?? true,
  };
}

const fetchFromDb = unstable_cache(
  async (): Promise<Product[]> => {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase.from("products").select("*");
      if (error || !data) return [];
      return (data as ProductRow[]).map(rowToProduct);
    } catch {
      return [];
    }
  },
  ["products-all"],
  // revalidate:false → el catálogo se cachea indefinidamente y solo se refresca
  // vía revalidateTag (guardados desde /admin). Evita regenerar cientos de
  // páginas ISR cada hora, que disparaba el límite de ISR Writes del plan free.
  { tags: [PRODUCTS_TAG], revalidate: false },
);

/** Todos los productos de la DB (sin filtrar por published). Vacío si no hay tabla/datos. */
export const getProductsFromDb = cache(
  async (): Promise<Product[]> => fetchFromDb(),
);

/**
 * Lectura EN VIVO, sin caché. Para el panel /admin, que debe reflejar siempre
 * el estado real de la DB (ZOCAM y otros procesos pueden escribir directo, sin
 * pasar por revalidateTag). Dedupe por request con React.cache.
 */
export const getProductsFromDbFresh = cache(async (): Promise<Product[]> => {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.from("products").select("*");
    if (error || !data) return [];
    return (data as ProductRow[]).map(rowToProduct);
  } catch {
    return [];
  }
});
