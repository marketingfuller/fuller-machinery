// Utilidades del catálogo SEGURAS PARA CLIENTE (sin dependencias server-only).
// Los Client Components importan de aquí, no de "@/lib/products" (que ahora
// arrastra la lectura de Supabase / server-only).

import type { ProductCategory } from "@/content/products/types";

export type { Product, ProductCategory, ProductSpec } from "@/content/products/types";

/** Formatea un precio en pesos colombianos: 8399900 → "$8.399.900". */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

// ── Calculadora de rentabilidad: supuestos por defecto por categoría ──
// Solo categorías que generan ingreso por unidad vendida tienen calculadora.
export type CalcDefault = {
  unitLabel: string;
  price: number;
  unitsDay: number;
  daysMonth: number;
  cost: number;
  fixed: number;
  priceMax: number;
  unitsMax: number;
};

// Supuestos por defecto realistas para el mercado colombiano (el usuario los edita).
// Costos fijos calibrados para el EMPRENDEDOR que arranca (carrito, kiosco, local
// pequeño o desde casa), no para un local establecido grande — así el payback es
// creíble y el equilibrio se alcanza a volúmenes razonables sin inflar resultados.
export const CALC_DEFAULTS: Partial<Record<ProductCategory, CalcDefault>> = {
  bebidas: { unitLabel: "vaso", price: 6000, unitsDay: 45, daysMonth: 26, cost: 2500, fixed: 900000, priceMax: 20000, unitsMax: 300 },
  snacks: { unitLabel: "porción", price: 7000, unitsDay: 40, daysMonth: 26, cost: 2800, fixed: 900000, priceMax: 25000, unitsMax: 300 },
  panaderia: { unitLabel: "unidad", price: 2500, unitsDay: 180, daysMonth: 26, cost: 1100, fixed: 1800000, priceMax: 15000, unitsMax: 800 },
  carnicos: { unitLabel: "kg", price: 22000, unitsDay: 30, daysMonth: 26, cost: 16500, fixed: 1500000, priceMax: 60000, unitsMax: 150 },
};
