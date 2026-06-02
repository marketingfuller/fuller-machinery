import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/productos/ProductCard";
import {
  buildMetadata,
  breadcrumbJsonLd,
  itemListJsonLd,
  faqPageJsonLd,
  SITE_URL,
} from "@/lib/seo";
import {
  getCollections,
  getCollectionBySlug,
  getProductsByType,
  CATEGORY_META,
} from "@/lib/products";
import { getSettings } from "@/lib/settings";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return buildMetadata({
    title: `${collection.label} en Colombia`,
    description: collection.intro,
    path: `/colecciones/${collection.slug}`,
    keywords: collection.keywords,
  });
}

/** FAQs honestas por colección (sin inventar precios ni prueba social). */
function collectionFaqs(label: string, eyebrow: string, count: number) {
  return [
    {
      question: `¿Cuánto cuesta una ${eyebrow}?`,
      answer:
        "El precio depende de la capacidad y el modelo. En cada ficha ves el precio de referencia; escríbenos por WhatsApp para confirmar disponibilidad, precio actual y formas de pago.",
    },
    {
      question: `¿Cuántos modelos de ${label.toLowerCase()} tienen?`,
      answer: `Hoy tenemos ${count} modelos disponibles en esta colección, con distintas capacidades para cada tipo y tamaño de negocio.`,
    },
    {
      question: "¿Hacen envíos a toda Colombia?",
      answer:
        "Sí. Despachamos a todo el país con envío nacional desde Bogotá. Coordinamos el despacho al confirmar tu pedido.",
    },
    {
      question: "¿Los equipos tienen garantía y soporte?",
      answer:
        "Sí. Todos nuestros equipos incluyen garantía Fuller y contamos con servicio técnico propio y repuestos para acompañarte después de la compra.",
    },
  ];
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const [products, settings, allCollections] = await Promise.all([
    getProductsByType(collection.type),
    getSettings(),
    getCollections(),
  ]);

  const faqs = collectionFaqs(collection.label, collection.eyebrow, products.length);
  const categoryLabel = CATEGORY_META[collection.category]?.label ?? "Catálogo";
  // Otras colecciones: primero las de la misma categoría, luego el resto.
  const otras = allCollections
    .filter((c) => c.slug !== collection.slug)
    .sort((a, b) => {
      const sameA = a.category === collection.category ? 0 : 1;
      const sameB = b.category === collection.category ? 0 : 1;
      return sameA - sameB || a.sortOrder - b.sortOrder;
    })
    .slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/productos" },
            { name: collection.label, path: `/colecciones/${collection.slug}` },
          ]),
          itemListJsonLd({
            name: collection.label,
            items: products.map((p) => ({
              name: p.name,
              url: `${SITE_URL}/productos/${p.slug}`,
              image: p.images[0],
            })),
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <Header />
      <main className="min-h-screen mt-[80px] bg-slate-50">
        {/* Hero */}
        <section className="bg-bg-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <nav className="text-white/50 text-sm mb-4 flex flex-wrap gap-1.5">
              <Link href="/" className="hover:text-accent">Inicio</Link>
              <span>/</span>
              <Link href="/productos" className="hover:text-accent">Catálogo</Link>
              <span>/</span>
              <span className="text-white/80">{collection.label}</span>
            </nav>
            <span className="text-accent font-bold text-sm uppercase tracking-widest block mb-3">
              {collection.eyebrow}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl leading-tight mb-4 max-w-4xl">
              {collection.h1}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">{collection.intro}</p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Grid de productos */}
          {products.length === 0 ? (
            <p className="text-slate-500 py-20 text-center">
              Pronto agregaremos más modelos en esta colección.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  whatsappCommercial={settings.whatsappCommercial}
                />
              ))}
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16 max-w-3xl">
            <h2 className="font-display font-black text-2xl md:text-3xl text-bg-dark mb-6">
              Preguntas frecuentes sobre {collection.label.toLowerCase()}
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group bg-white rounded-xl border border-slate-200 p-5"
                >
                  <summary className="font-bold text-bg-dark cursor-pointer list-none flex justify-between items-center gap-4">
                    {f.question}
                    <span className="text-accent transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-slate-600 mt-3 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Otras colecciones */}
          {otras.length > 0 && (
            <section className="mt-16 pb-20">
              <h2 className="font-display font-black text-2xl text-bg-dark mb-6">
                Explora más en {categoryLabel} y otras categorías
              </h2>
              <div className="flex flex-wrap gap-2">
                {otras.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/colecciones/${c.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-bold bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
