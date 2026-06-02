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
import { getSettings } from "@/lib/settings";

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

type SearchParams = Promise<{ categoria?: string }>;

function isCategory(v: string | undefined): v is ProductCategory {
  return !!v && v in CATEGORY_META;
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { categoria } = await searchParams;
  const [allProducts, catalogProducts, activeCategories, settings] = await Promise.all([
    getAllProducts(),
    getCatalogProducts(),
    getActiveCategories(),
    getSettings(),
  ]);

  const active = isCategory(categoria) ? categoria : null;
  // Con filtro: esa categoría (incluye ocultas si se entra por enlace directo).
  // Sin filtro: grid principal sin categorías ocultas (novelty).
  const products = active
    ? allProducts.filter((p) => p.category === active)
    : catalogProducts;

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

          {/* Grid */}
          {products.length === 0 ? (
            <p className="text-slate-500 py-20 text-center">
              Pronto agregaremos productos en esta categoría.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {products.map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  whatsappCommercial={settings.whatsappCommercial}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
