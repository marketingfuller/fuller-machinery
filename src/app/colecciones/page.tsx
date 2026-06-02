import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, SITE_URL } from "@/lib/seo";
import {
  getCollections,
  getCatalogProducts,
  CATEGORY_META,
  type ProductCategory,
} from "@/lib/products";

export const metadata = buildMetadata({
  title: "Colecciones de Maquinaria por Tipo de Equipo",
  description:
    "Encuentra el equipo que buscas por tipo: granizadoras, freidoras, hornos, básculas, empacadoras al vacío y más. Maquinaria industrial con garantía y envío nacional desde Bogotá.",
  path: "/colecciones",
  keywords: [
    "maquinaria por tipo de equipo",
    "catálogo de equipos industriales Colombia",
    "granizadoras freidoras hornos básculas",
    "equipos para negocio de alimentos",
  ],
});

export default async function ColeccionesPage() {
  const [collections, catalog] = await Promise.all([
    getCollections(),
    getCatalogProducts(),
  ]);

  // Conteo por tipo para mostrar "N modelos".
  const counts = new Map<string, number>();
  for (const p of catalog) if (p.type) counts.set(p.type, (counts.get(p.type) ?? 0) + 1);

  // Agrupa por categoría, respetando el orden de CATEGORY_META.
  const byCategory = new Map<ProductCategory, typeof collections>();
  for (const c of collections) {
    const arr = byCategory.get(c.category) ?? [];
    arr.push(c);
    byCategory.set(c.category, arr);
  }
  const categoryOrder = Object.keys(CATEGORY_META) as ProductCategory[];
  const grouped = categoryOrder
    .filter((cat) => byCategory.has(cat))
    .map((cat) => ({ cat, items: byCategory.get(cat)! }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Colecciones", path: "/colecciones" },
          ]),
          itemListJsonLd({
            name: "Colecciones de maquinaria por tipo de equipo",
            items: collections.map((c) => ({
              name: c.label,
              url: `${SITE_URL}/colecciones/${c.slug}`,
            })),
          }),
        ]}
      />
      <Header />
      <main className="min-h-screen mt-[80px] bg-slate-50">
        <section className="bg-bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-3">
              Colecciones
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-4">
              Encuentra tu equipo por tipo
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Agrupamos el catálogo por tipo de equipo para que llegues directo a
              lo que buscas: compara modelos y capacidades dentro de cada línea.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-20">
          {grouped.map(({ cat, items }) => (
            <section key={cat}>
              <h2 className="font-display font-black text-2xl text-bg-dark mb-5">
                {CATEGORY_META[cat].label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/colecciones/${c.slug}`}
                    className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-bg-dark group-hover:text-primary transition-colors">
                        {c.label}
                      </h3>
                      <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                        {counts.get(c.type) ?? 0} modelos
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">{c.intro}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
