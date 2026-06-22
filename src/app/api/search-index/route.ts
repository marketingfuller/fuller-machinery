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
    // El navegador revalida en cada carga (max-age=0) para que los productos
    // nuevos aparezcan en el buscador justo tras el deploy; el CDN sí lo cachea
    // (s-maxage) y se refresca solo en cada despliegue. stale-while-revalidate
    // sirve el índice al instante y lo actualiza en segundo plano.
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=60",
    },
  });
}
