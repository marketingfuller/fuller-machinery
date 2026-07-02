import { timingSafeEqual } from "node:crypto";
import { type NextRequest } from "next/server";
import { getAllProducts } from "@/lib/products";
import { resolveAvailable } from "@/lib/availability";
import type { Product } from "@/content/products/types";

// Endpoint de sincronización de catálogo para ZOCAM.
//   GET /api/zocam/products?cursor=<offset>&limit=<n>
//   Authorization: Bearer <ZOCAM_API_KEY>
// Auth-gated → siempre dinámico, nunca cacheado en CDN.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SITE_URL = "https://www.fullermachinery.com";
const BRAND = "Fuller Machinery";
const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

/** Comparación en tiempo constante para no filtrar la API key por timing. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.ZOCAM_API_KEY;
  if (!expected) return false; // sin key configurada, no se autoriza a nadie
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  return safeEqual(match[1].trim(), expected);
}

/** Convierte una ruta de imagen relativa en URL absoluta (Zocam las consume externas). */
function absoluteImage(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

function toZocamProduct(p: Product) {
  return {
    external_id: p.slug,
    sku: p.sku ?? null,
    name: p.name,
    description: p.description ?? p.shortDescription,
    // ProductSpec[] → objeto { label: value } para consumo directo.
    specs: Object.fromEntries(p.specs.map((s) => [s.label, s.value])),
    price: p.price ?? null,
    currency: p.currency ?? "COP",
    // Fase A: sin inventario por unidad (stock null), solo disponibilidad.
    // available sale del panel /admin (Supabase) → seed → stockStatus → true.
    // Fase B: cuando exista control de stock → stock = unidades, available = stock > 0.
    stock: null,
    available: resolveAvailable(p),
    category: p.categoryLabel,
    brand: BRAND,
    images: (p.images ?? []).map(absoluteImage),
    url: `${SITE_URL}/productos/${p.slug}`,
    updated_at: null,
  };
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json(
      { error: "unauthorized" },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
    );
  }

  const params = request.nextUrl.searchParams;

  const cursor = Math.max(0, Number.parseInt(params.get("cursor") ?? "0", 10) || 0);
  const rawLimit = Number.parseInt(params.get("limit") ?? "", 10);
  const limit = Number.isNaN(rawLimit)
    ? DEFAULT_LIMIT
    : Math.min(Math.max(rawLimit, 1), MAX_LIMIT);

  const all = await getAllProducts();
  const total = all.length;

  const slice = all.slice(cursor, cursor + limit);
  const products = slice.map((p) => toZocamProduct(p));

  const nextOffset = cursor + limit;
  const next_cursor = nextOffset < total ? String(nextOffset) : undefined;

  return Response.json({ products, total, next_cursor });
}
