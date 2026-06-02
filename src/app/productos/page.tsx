import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/productos/ProductCard";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, SITE_URL } from "@/lib/seo";
import {
  getAllProducts,
  getCatalogProducts,
  getActiveCategories,
  CATEGORY_META,
  type ProductCategory,
} from "@/lib/products";
import { searchProducts } from "@/lib/search";
import { getSettings } from "@/lib/settings";
import SearchBox from "@/components/SearchBox";

export const metadata = buildMetadata({
  title: "Catálogo de Maquinaria | Equipos para tu Negocio — Fuller Machinery",
  description:
    "Catálogo de maquinaria industrial y para emprender en Colombia: bebidas, café, cárnicos, panadería, snacks, refrigeración y empaque. Cotiza por WhatsApp con envío nacional.",
  path: "/productos",
  keywords: [
    "catálogo maquinaria Colombia",
    "equipos para negocio Colombia",
    "maquinaria industrial alimentos",
    "máquinas para emprender",
    "Fuller Machinery catálogo",
  ],
});

type SearchParams = Promise<{ categoria?: string; page?: string; q?: string }>;

const PAGE_SIZE = 24;

function isCategory(v: string | undefined): v is ProductCategory {
  return !!v && v in CATEGORY_META;
}

/** Ventana compacta de números de página: 1 … 4 5 6 … 20 */
function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { categoria, page, q } = await searchParams;
  const [allProducts, catalogProducts, activeCategories, settings] = await Promise.all([
    getAllProducts(),
    getCatalogProducts(),
    getActiveCategories(),
    getSettings(),
  ]);

  const active = isCategory(categoria) ? categoria : null;
  const queryStr = (q ?? "").trim();
  // Con filtro: esa categoría (incluye ocultas si se entra por enlace directo).
  // Sin filtro: grid principal sin categorías ocultas (novelty).
  const base = active
    ? allProducts.filter((p) => p.category === active)
    : catalogProducts;
  // Búsqueda con lógica de relevancia (misma que el buscador instantáneo).
  const filtered = queryStr ? searchProducts(base, queryStr) : base;

  // Paginación: el grid completo (244) pesaba ~2.3 MB de HTML; servimos de a 24.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requested = Number.parseInt(page ?? "1", 10);
  const current = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), totalPages)
    : 1;
  const products = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;
  const to = Math.min(current * PAGE_SIZE, filtered.length);

  // Enlace de paginación que preserva la categoría activa.
  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (active) params.set("categoria", active);
    if (queryStr) params.set("q", queryStr);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/productos?${qs}` : "/productos";
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/productos" },
          ]),
          itemListJsonLd({
            name: "Catálogo de maquinaria Fuller Machinery",
            items: products.map((p) => ({
              name: p.name,
              url: `${SITE_URL}/productos/${p.slug}`,
              image: p.images[0],
            })),
          }),
        ]}
      />
      <Header />
      <main className="min-h-screen mt-[80px] bg-slate-50">
        {/* Encabezado */}
        <section className="bg-bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-3">
              Catálogo
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-4">
              Maquinaria que hace crecer tu negocio
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Equipos profesionales con garantía, soporte técnico y envío nacional
              desde Bogotá. Cotiza por WhatsApp y recibe asesoría experta.
            </p>
            <div className="mt-7 max-w-xl">
              <SearchBox
                variant="page"
                initialQuery={queryStr}
                placeholder="Buscar: granizadora, freidora a gas, báscula…"
              />
            </div>
          </div>
        </section>

        {/* Filtros por categoría */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link
              href="/colecciones"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              ¿Buscas un tipo de equipo en concreto? Ver colecciones →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/productos"
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                active === null
                  ? "bg-primary text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
              }`}
            >
              Todos
            </Link>
            {activeCategories.map((cat) => (
              <Link
                key={cat}
                href={`/productos?categoria=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  active === cat
                    ? "bg-primary text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                }`}
              >
                {CATEGORY_META[cat].label}
              </Link>
            ))}
          </div>

          {/* Encabezado de resultados de búsqueda */}
          {queryStr && (
            <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display font-black text-2xl text-bg-dark">
                {filtered.length} resultado{filtered.length === 1 ? "" : "s"} para «{queryStr}»
              </h2>
              <Link href={active ? `/productos?categoria=${active}` : "/productos"} className="text-sm font-bold text-primary hover:underline">
                Quitar búsqueda
              </Link>
            </div>
          )}

          {/* Grid */}
          {products.length === 0 ? (
            <p className="text-slate-500 py-20 text-center">
              {queryStr
                ? `Sin resultados para «${queryStr}». Prueba con otro término o explora las categorías.`
                : "Pronto agregaremos productos en esta categoría."}
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-5">
                Mostrando <span className="font-semibold text-slate-700">{from}–{to}</span> de{" "}
                <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
                {queryStr ? "resultados" : "productos"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    whatsappCommercial={settings.whatsappCommercial}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <nav
                  aria-label="Paginación del catálogo"
                  className="flex flex-wrap items-center justify-center gap-1.5 mt-12 pb-20"
                >
                  {current > 1 && (
                    <Link
                      href={pageHref(current - 1)}
                      rel="prev"
                      className="px-4 py-2 rounded-full text-sm font-bold bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      ← Anterior
                    </Link>
                  )}
                  {pageWindow(current, totalPages).map((p, i) =>
                    p === "…" ? (
                      <span key={`e${i}`} className="px-2 text-slate-400 select-none">
                        …
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={pageHref(p)}
                        aria-current={p === current ? "page" : undefined}
                        className={`min-w-10 text-center px-3.5 py-2 rounded-full text-sm font-bold transition-colors ${
                          p === current
                            ? "bg-primary text-white"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {p}
                      </Link>
                    ),
                  )}
                  {current < totalPages && (
                    <Link
                      href={pageHref(current + 1)}
                      rel="next"
                      className="px-4 py-2 rounded-full text-sm font-bold bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      Siguiente →
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
