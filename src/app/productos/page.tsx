import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, Wrench, PackageCheck } from "lucide-react";
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
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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

  // Secciones "hub" (tiles de categoría + destacados): solo en la vista base
  // (sin filtro, sin búsqueda, primera página) para no saturar vistas filtradas.
  const isLanding = !active && !queryStr && current === 1;
  const tiles = isLanding
    ? activeCategories.map((cat) => {
        const inCat = catalogProducts.filter((p) => p.category === cat);
        return {
          cat,
          label: CATEGORY_META[cat].label,
          tagline: CATEGORY_META[cat].tagline,
          image: inCat.find((p) => p.images?.[0])?.images[0] ?? null,
          count: inCat.length,
        };
      })
    : [];
  const withBadge = catalogProducts.filter((p) => p.badge);
  const featured = isLanding
    ? (withBadge.length >= 6 ? withBadge : catalogProducts).slice(0, 10)
    : [];

  // Mosaico del hero: una imagen por categoría (máxima variedad visual).
  const heroMosaic = activeCategories
    .map((cat) => catalogProducts.find((p) => p.category === cat && p.images?.[0]))
    .filter((p): p is NonNullable<typeof p> => !!p)
    .slice(0, 6);

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
        {/* Encabezado (split: texto + mosaico de productos) */}
        <section className="relative bg-bg-dark text-white overflow-hidden">
          {/* Glows de acento de fondo */}
          <div className="pointer-events-none absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Columna izquierda */}
            <div>
              <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-3">
                Catálogo
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-4">
                Maquinaria que hace crecer tu negocio
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Equipos profesionales con garantía, soporte técnico y envío nacional
                desde Bogotá. Cotiza por WhatsApp y recibe asesoría experta.
              </p>

              {/* Stats reales */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="flex items-baseline gap-1.5">
                  <span className="font-display font-black text-xl text-accent">
                    {catalogProducts.length}+
                  </span>
                  <span className="text-white/60">equipos</span>
                </span>
                <span className="hidden sm:block w-px h-5 bg-white/15" />
                <span className="flex items-baseline gap-1.5">
                  <span className="font-display font-black text-xl text-accent">
                    {activeCategories.length}
                  </span>
                  <span className="text-white/60">categorías</span>
                </span>
                <span className="hidden sm:block w-px h-5 bg-white/15" />
                <span className="text-white/60">Envío nacional</span>
              </div>

              <div className="mt-7 max-w-xl">
                <SearchBox
                  variant="page"
                  initialQuery={queryStr}
                  placeholder="Buscar: granizadora, freidora a gas, báscula…"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/colecciones"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                >
                  Explorar por categoría
                </Link>
                <a
                  href={buildWhatsAppUrl(
                    settings.whatsappCommercial,
                    "Hola, quiero asesoría para elegir un equipo para mi negocio.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                >
                  Asesoría por WhatsApp
                </a>
              </div>
            </div>

            {/* Columna derecha: mosaico escalonado de productos reales */}
            {heroMosaic.length >= 4 && (
              <div className="relative hidden lg:grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {heroMosaic
                    .filter((_, i) => i % 2 === 0)
                    .map((p) => (
                      <div
                        key={p.slug}
                        className="rounded-2xl bg-white/95 p-4 shadow-xl shadow-black/30 ring-1 ring-white/10"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="22vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="space-y-4 mt-10">
                  {heroMosaic
                    .filter((_, i) => i % 2 === 1)
                    .map((p) => (
                      <div
                        key={p.slug}
                        className="rounded-2xl bg-white/95 p-4 shadow-xl shadow-black/30 ring-1 ring-white/10"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="22vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Barra de confianza */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5">
            {[
              { Icon: PackageCheck, t: `${catalogProducts.length} equipos`, s: "Catálogo completo" },
              { Icon: ShieldCheck, t: "Garantía Fuller", s: "Respaldo en cada equipo" },
              { Icon: Truck, t: "Envío nacional", s: "Despacho desde Bogotá" },
              { Icon: Wrench, t: "Soporte propio", s: "Servicio técnico postventa" },
            ].map(({ Icon, t, s }) => (
              <div key={t} className="flex items-center gap-3">
                <span className="shrink-0 size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={20} />
                </span>
                <div className="leading-tight">
                  <p className="font-bold text-bg-dark text-sm">{t}</p>
                  <p className="text-slate-500 text-xs">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explora por categoría (solo en la landing base) */}
        {isLanding && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <h2 className="font-display font-black text-2xl md:text-3xl text-bg-dark mb-1">
              Explora por categoría
            </h2>
            <p className="text-slate-500 mb-6">
              Encuentra rápido el tipo de equipo para tu negocio.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tiles.map((t) => (
                <Link
                  key={t.cat}
                  href={`/productos?categoria=${t.cat}`}
                  className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg hover:border-primary transition-all"
                >
                  <div className="relative aspect-[4/3] bg-slate-50">
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.label}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-3.5 border-t border-slate-100">
                    <p className="font-bold text-bg-dark text-sm group-hover:text-primary transition-colors">
                      {t.label}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">{t.count} equipos</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Equipos destacados (solo en la landing base) */}
        {isLanding && featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
            <h2 className="font-display font-black text-2xl md:text-3xl text-bg-dark mb-1">
              Equipos destacados
            </h2>
            <p className="text-slate-500 mb-6">Una selección de nuestros equipos estrella.</p>
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {featured.map((p) => (
                <div key={p.slug} className="w-64 sm:w-72 shrink-0">
                  <ProductCard product={p} whatsappCommercial={settings.whatsappCommercial} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Catálogo completo + filtros */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLanding && (
            <h2 className="font-display font-black text-2xl md:text-3xl text-bg-dark mb-4">
              Todo el catálogo
            </h2>
          )}
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
            <div
              className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"
              data-zocam-results-count={filtered.length}
            >
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
