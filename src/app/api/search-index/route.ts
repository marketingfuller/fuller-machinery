import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/products";
import type { SearchItem } from "@/lib/search";

// Índice estático y liviano para la búsqueda instantánea del cliente.
// Datos de las semillas (estáticos) → se sirve como asset estático.
export const dynamic = "force-static";

export async function GET() {
  const products = await getCatalogProducts();
  const index: SearchItem[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryLabel: p.categoryLabel,
    type: p.type,
    price: p.price ?? null,
    image: p.images?.[0] ?? null,
    keywords: p.keywords ?? [],
  }));
  return NextResponse.json(index, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
