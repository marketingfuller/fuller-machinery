import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Product } from "@/content/products/types";

// ────────────────────────────────────────────────────────────
// Disponibilidad de productos (inventario simple on/off).
//
// Fuente de verdad: tabla Supabase `product_availability` (slug → available),
// editable desde el panel /admin. Si un producto no tiene fila, cae al valor
// del seed (Product.available → stockStatus → true por defecto).
//
// Así el equipo pone/quita inventario desde la web sin tocar código ni
// redeployar, y sobrevive a regeneraciones del catálogo (los seeds se
// regeneran; esta tabla no).
// ────────────────────────────────────────────────────────────

export const AVAILABILITY_TAG = "product-availability";

const fetchFromDb = unstable_cache(
  async (): Promise<Record<string, boolean>> => {
    try {
      const supabase = createSupabaseAdminClient();
      const { data, error } = await supabase
        .from("product_availability")
        .select("slug, available");
      if (error || !data) return {};
      const map: Record<string, boolean> = {};
      for (const row of data as { slug: string; available: boolean }[]) {
        map[row.slug] = row.available;
      }
      return map;
    } catch {
      return {};
    }
  },
  ["product-availability"],
  { tags: [AVAILABILITY_TAG], revalidate: 3600 },
);

/** Overrides de disponibilidad por slug (solo los productos editados en el panel). */
export const getAvailabilityMap = cache(
  async (): Promise<Record<string, boolean>> => fetchFromDb(),
);

/** Disponibilidad efectiva: override de Supabase → flag del seed → stockStatus → true. */
export function resolveAvailable(
  p: Product,
  overrides: Record<string, boolean>,
): boolean {
  if (p.slug in overrides) return overrides[p.slug];
  if (p.available !== undefined) return p.available;
  if (p.stockStatus) return p.stockStatus !== "out_of_stock";
  return true;
}
