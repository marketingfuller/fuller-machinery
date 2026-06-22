import { cache } from "react";
import { bebidasProducts } from "@/content/products/bebidas";
import { snacksProducts } from "@/content/products/snacks";
import { panaderiaProducts } from "@/content/products/panaderia";
import { empaqueProducts } from "@/content/products/empaque";
import { pesajeProducts } from "@/content/products/pesaje";
import { exhibicionProducts } from "@/content/products/exhibicion";
import { procesamientoProducts } from "@/content/products/procesamiento";
import { buffetProducts } from "@/content/products/buffet";
import { refrigeracionProducts } from "@/content/products/refrigeracion";
import { mobiliarioProducts } from "@/content/products/mobiliario";
import { carnicosProducts } from "@/content/products/carnicos";
import { nuevosProducts } from "@/content/products/nuevos";
import type { Product, ProductCategory } from "@/content/products/types";
import { COLLECTIONS, type Collection } from "@/content/products/collections";

export type { Product, ProductCategory, ProductSpec } from "@/content/products/types";
export type { Collection } from "@/content/products/collections";

// ────────────────────────────────────────────────────────────
// Fuente del catálogo.
//
// HOY: lee de las semillas tipadas en src/content/products/*.
// FASE 2: estas funciones se reapuntan a Supabase (tabla `products`,
// poblada por la importación de WooCommerce) SIN cambiar las páginas,
// porque ya son async. La semilla queda como fallback de build.
// ────────────────────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  ...bebidasProducts,
  ...snacksProducts,
  ...panaderiaProducts,
  ...empaqueProducts,
  ...pesajeProducts,
  ...exhibicionProducts,
  ...procesamientoProducts,
  ...buffetProducts,
  ...refrigeracionProducts,
  ...mobiliarioProducts,
  ...carnicosProducts,
  ...nuevosProducts,
];

/** Categorías ocultas del grid principal y de los chips de filtro (acceso discreto). */
const HIDDEN_CATEGORIES = new Set<ProductCategory>(["novelty"]);

export const CATEGORY_META: Record<
  ProductCategory,
  { label: string; href: string; tagline: string }
> = {
  bebidas: {
    label: "Bebidas y Café",
    href: "/productos?categoria=bebidas",
    tagline: "Granizadoras, capuchineras, licuadoras y selladoras",
  },
  snacks: {
    label: "Snacks y Comida Rápida",
    href: "/productos?categoria=snacks",
    tagline: "Waffleras, freidoras, crispeteras y comida divertida",
  },
  empaque: {
    label: "Empaque y Sellado",
    href: "/productos?categoria=empaque",
    tagline: "Empacadoras al vacío, selladoras de bolsas y rollos",
  },
  panaderia: {
    label: "Panadería y Repostería",
    href: "/productos?categoria=panaderia",
    tagline: "Hornos, amasadoras, batidoras y equipos de panificación",
  },
  pesaje: {
    label: "Pesaje y Básculas",
    href: "/productos?categoria=pesaje",
    tagline: "Básculas, balanzas, grameras y tallímetros",
  },
  exhibicion: {
    label: "Vitrinas y Exhibición",
    href: "/productos?categoria=exhibicion",
    tagline: "Vitrinas de calefacción, sushi y exhibición caliente",
  },
  procesamiento: {
    label: "Procesamiento de Alimentos",
    href: "/productos?categoria=procesamiento",
    tagline: "Peladoras, cortadoras, procesadores y ralladores",
  },
  buffet: {
    label: "Buffet y Autoservicio",
    href: "/productos?categoria=buffet",
    tagline: "Baño maría, samovares y exhibición de buffet",
  },
  refrigeracion: {
    label: "Refrigeración",
    href: "/productos?categoria=refrigeracion",
    tagline: "Neveras, congeladores y vitrinas refrigeradas",
  },
  mobiliario: {
    label: "Mobiliario en Acero",
    href: "/productos?categoria=mobiliario",
    tagline: "Mesas de trabajo, fregaderos y utensilios en acero",
  },
  carnicos: {
    label: "Cárnicos",
    href: "/productos?categoria=carnicos",
    tagline: "Molinos, embutidoras y sierras para carnicería",
  },
  novelty: {
    label: "Novelty",
    href: "/productos?categoria=novelty",
    tagline: "Línea novelty para negocios temáticos",
  },
};

// ── Calculadora de rentabilidad: supuestos por defecto por categoría ──
// Server-safe (no "use client") para que la página pueda decidir si renderiza.
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

/** Formatea un precio en pesos colombianos: 8399900 → "$8.399.900". */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function sortProducts(a: Product, b: Product): number {
  return (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || a.name.localeCompare(b.name);
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  return ALL_PRODUCTS.filter((p) => p.published !== false).sort(sortProducts);
});

export const getProductsByCategory = cache(
  async (category: ProductCategory): Promise<Product[]> => {
    const all = await getAllProducts();
    return all.filter((p) => p.category === category);
  },
);

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    const all = await getAllProducts();
    return all.find((p) => p.slug === slug) ?? null;
  },
);

export function isHiddenCategory(c: ProductCategory): boolean {
  return HIDDEN_CATEGORIES.has(c);
}

/** Categorías visibles con al menos un producto (para chips/filtros), en orden. */
const CATEGORY_ORDER: ProductCategory[] = [
  "bebidas", "snacks", "empaque", "panaderia", "pesaje", "exhibicion",
  "procesamiento", "buffet", "refrigeracion", "mobiliario", "carnicos",
];

export const getActiveCategories = cache(
  async (): Promise<ProductCategory[]> => {
    const all = await getAllProducts();
    const present = new Set<ProductCategory>(all.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => present.has(c) && !HIDDEN_CATEGORIES.has(c));
  },
);

/** Productos del grid principal del catálogo (excluye categorías ocultas). */
export const getCatalogProducts = cache(async (): Promise<Product[]> => {
  const all = await getAllProducts();
  return all.filter((p) => !HIDDEN_CATEGORIES.has(p.category));
});

/**
 * Familia de un producto: mismo tipo de equipo (primer token del slug) dentro de
 * la categoría. Ej: granizadora-1/2/3-tanques. Usado para la tabla comparativa
 * "elige tu modelo" (mejor-valor honesto, sin bundles inventados).
 */
function familyKey(slug: string): string {
  const parts = slug.split("-");
  // "maquina-*" es ambiguo (cafeteras, de hielo…): usamos 2 tokens para no
  // mezclar familias distintas. El resto agrupa bien con el primer token.
  if (parts[0] === "maquina") return `${parts[0]}-${parts[1] ?? ""}`;
  // "selladora-de-latas-*" vs "selladora-de-vasos-*": 3 tokens para no mezclar
  // selladoras de latas con las de vasos en la comparativa "elige tu modelo".
  if (parts[0] === "selladora") return parts.slice(0, 3).join("-");
  return parts[0];
}

export const getFamilyProducts = cache(
  async (product: Product): Promise<Product[]> => {
    const same = await getProductsByCategory(product.category);
    const key = familyKey(product.slug);
    const family = same.filter((p) => familyKey(p.slug) === key);
    // Solo tiene sentido comparar si hay al menos 2 modelos.
    return family.length >= 2 ? family : [];
  },
);

// ────────────────────────────────────────────────────────────
// Colecciones SEO por tipo de equipo (/colecciones/[slug]).
// ────────────────────────────────────────────────────────────

/** Mínimo de productos para que una colección tenga página propia (evita thin pages). */
const COLLECTION_MIN_PRODUCTS = 3;

/** Productos de un tipo de equipo, visibles (excluye ocultos), ordenados. */
export const getProductsByType = cache(
  async (type: string): Promise<Product[]> => {
    const all = await getCatalogProducts();
    return all.filter((p) => p.type === type);
  },
);

/** Colecciones con suficientes productos para publicar, en orden. */
export const getCollections = cache(async (): Promise<Collection[]> => {
  const all = await getCatalogProducts();
  const counts = new Map<string, number>();
  for (const p of all) {
    if (p.type) counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
  }
  return COLLECTIONS.filter(
    (c) => (counts.get(c.type) ?? 0) >= COLLECTION_MIN_PRODUCTS,
  ).sort((a, b) => a.sortOrder - b.sortOrder);
});

export const getCollectionBySlug = cache(
  async (slug: string): Promise<Collection | null> => {
    const published = await getCollections();
    return published.find((c) => c.slug === slug) ?? null;
  },
);

/** Colección publicada que agrupa este tipo de equipo (o null). Para enlazar ficha→colección. */
export const getCollectionForType = cache(
  async (type: string | undefined): Promise<Collection | null> => {
    if (!type) return null;
    const published = await getCollections();
    return published.find((c) => c.type === type) ?? null;
  },
);

/** Productos relacionados: misma categoría, excluyendo el actual. */
export const getRelatedProducts = cache(
  async (product: Product, limit = 3): Promise<Product[]> => {
    const same = await getProductsByCategory(product.category);
    return same.filter((p) => p.slug !== product.slug).slice(0, limit);
  },
);
