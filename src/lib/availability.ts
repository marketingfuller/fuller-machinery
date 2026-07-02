import type { Product } from "@/content/products/types";

// ────────────────────────────────────────────────────────────
// Disponibilidad de productos (inventario simple on/off).
//
// Fuente de verdad ÚNICA: la columna `available` de la tabla `products`,
// editable desde el panel /admin (interruptor de inventario y ficha de
// producto). El endpoint de ZOCAM y el sitio la leen de ahí.
// ────────────────────────────────────────────────────────────

/** Disponibilidad efectiva: columna available → stockStatus → true por defecto. */
export function resolveAvailable(p: Product): boolean {
  if (p.available !== undefined) return p.available;
  if (p.stockStatus) return p.stockStatus !== "out_of_stock";
  return true;
}
