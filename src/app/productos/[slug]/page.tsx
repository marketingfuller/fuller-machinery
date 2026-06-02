import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/productos/ProductCard";
import ProductGallery from "@/components/productos/ProductGallery";
import ProductComparison from "@/components/productos/ProductComparison";
import ProfitCalculator from "@/components/productos/ProfitCalculator";
import {
  buildMetadata,
  breadcrumbJsonLd,
  productJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getFamilyProducts,
  getCollectionForType,
  CATEGORY_META,
  CALC_DEFAULTS,
  formatCOP,
} from "@/lib/products";
import { getSettings } from "@/lib/settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product)
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: false },
    };

  return buildMetadata({
    // El layout añade "| Fuller Machinery" vía title.template; aquí solo el nombre.
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.shortDescription,
    path: `/productos/${product.slug}`,
    image: product.images[0],
    keywords: product.keywords,
  });
}

const STOCK_LABEL: Record<string, string> = {
  in_stock: "Disponible",
  out_of_stock: "Sobre pedido",
  on_request: "Cotiza disponibilidad",
};

// FAQ con datos REALES de Fuller (políticas verificadas). Alimenta el acordeón
// y el FAQPage JSON-LD (rich result en Google).
const FULLER_FAQS = [
  {
    question: "¿El equipo tiene garantía?",
    answer:
      "Sí. Todos los equipos cuentan con garantía Fuller, que va de 6 meses a 1 año según el producto. Usamos repuestos originales Fuller.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, realizamos envío nacional desde Bogotá a toda Colombia con embalaje seguro. Por ahora no realizamos envíos internacionales.",
  },
  {
    question: "¿Cómo compro y qué formas de pago manejan?",
    answer:
      "La compra es asesorada: nos escribes por WhatsApp, te confirmamos disponibilidad, precio final y formas de pago, y coordinamos el envío.",
  },
  {
    question: "¿Ofrecen capacitación para usar el equipo?",
    answer:
      "Sí. Brindamos capacitación en el uso del equipo, presencial en Bogotá o de forma remota, para que tu operación arranque sin contratiempos.",
  },
];

export default async function ProductoPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [settings, related, family, collection] = await Promise.all([
    getSettings(),
    getRelatedProducts(product),
    getFamilyProducts(product),
    getCollectionForType(product.type),
  ]);

  const category = CATEGORY_META[product.category];
  const waMsg =
    product.whatsappMessage ??
    `Hola, me interesa conocer el precio y disponibilidad de ${product.name}.`;
  const waUrl = buildWhatsAppUrl(settings.whatsappCommercial, waMsg);
  const availability =
    product.stockStatus === "out_of_stock" ? "OutOfStock" : "InStock";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Catálogo", path: "/productos" },
            { name: category.label, path: `/productos?categoria=${product.category}` },
            ...(collection
              ? [{ name: collection.label, path: `/colecciones/${collection.slug}` }]
              : []),
            { name: product.name, path: `/productos/${product.slug}` },
          ]),
          productJsonLd({
            name: product.name,
            description: product.shortDescription,
            path: `/productos/${product.slug}`,
            images: product.images,
            sku: product.sku,
            category: category.label,
            price: product.price ?? null,
            currency: product.currency,
            availability,
          }),
          faqPageJsonLd(FULLER_FAQS),
        ]}
      />
      <Header />
      <main className="min-h-screen mt-[80px] bg-white pb-24 lg:pb-0">
        {/* Breadcrumb visual */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/productos" className="hover:text-primary transition-colors">
                Catálogo
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/productos?categoria=${product.category}`}
                className="hover:text-primary transition-colors"
              >
                {category.label}
              </Link>
            </li>
            {collection && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={`/colecciones/${collection.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {collection.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>/</li>
            <li className="text-slate-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Producto */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Galería navegable */}
            <ProductGallery
              images={product.images}
              name={product.name}
              badge={product.badge}
            />

            {/* Info + CTA */}
            <div>
              {/* Insignia de estado sobre el título (efecto halo) + categoría */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                {product.badge && (
                  <span
                    className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white ${product.badge.color}`}
                  >
                    {product.badge.text}
                  </span>
                )}
                <Link
                  href={`/productos?categoria=${product.category}`}
                  className="text-secondary font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  {category.label}
                </Link>
              </div>
              <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900 leading-tight mb-4 text-center lg:text-left">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 text-center lg:text-left">
                {product.shortDescription}
              </p>

              {/* Precio */}
              {typeof product.price === "number" && product.price > 0 && (
                <div className="mb-6 text-center lg:text-left">
                  <span className="font-display font-black text-4xl text-slate-900">
                    {formatCOP(product.price)}
                  </span>
                </div>
              )}

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <ul className="space-y-2 mb-7">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                        check_circle
                      </span>
                      <span className="font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Disponibilidad */}
              <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-full border border-emerald-100">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  {STOCK_LABEL[product.stockStatus ?? "on_request"]}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 font-semibold px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Envío nacional
                </span>
              </div>

              {/* Franja de confianza (señales reales — ver docs/cro-product-pages.md) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 border-y border-slate-100 py-4">
                {[
                  { icon: "verified_user", label: "Garantía Fuller" },
                  { icon: "local_shipping", label: "Envío nacional" },
                  { icon: "support_agent", label: "Soporte técnico" },
                  { icon: "lock", label: "Compra segura" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center text-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[24px]">{t.icon}</span>
                    <span className="text-slate-600 text-xs font-semibold leading-tight">{t.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA principal */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-base px-6 py-4 rounded-xl transition-colors shadow-lg shadow-secondary/20"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Cotizar por WhatsApp
                </a>
                {product.wooUrl && (
                  <a
                    href={product.wooUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary font-bold text-base px-6 py-4 rounded-xl transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">description</span>
                    Ficha técnica
                  </a>
                )}
              </div>

              <p className="text-slate-400 text-xs mt-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">support_agent</span>
                Asesoría experta y garantía Fuller en todos nuestros equipos.
              </p>
            </div>
          </div>
        </section>

        {/* WOW — Calculadora de rentabilidad (solo categorías que generan ingreso) */}
        {typeof product.price === "number" &&
          product.price > 0 &&
          CALC_DEFAULTS[product.category] && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <ProfitCalculator price={product.price} category={product.category} />
            </section>
          )}

        {/* Descripción + Specs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Descripción rica (SEO) */}
            <div className="lg:col-span-2">
              <div className="prose prose-slate md:prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-secondary prose-strong:text-slate-900">
                {product.description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {product.description}
                  </ReactMarkdown>
                ) : product.descriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <p>{product.shortDescription}</p>
                )}
              </div>
            </div>

            {/* Tabla de especificaciones */}
            <aside>
              <div className="sticky top-28 bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4">
                  Especificaciones
                </h2>
                <dl className="divide-y divide-slate-200">
                  {product.specs.map((s, i) => (
                    <div key={i} className="py-3">
                      <dt className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">
                        {s.label}
                      </dt>
                      <dd className="text-slate-900 font-semibold text-sm leading-snug">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Solicitar cotización
                </a>
              </div>
            </aside>
          </div>

          {/* Acordeones: progressive disclosure (zero-JS, accesibles) */}
          <div className="mt-12 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer py-5 list-none">
                <span className="font-display font-bold text-lg text-slate-900">
                  Envío, garantía y pago
                </span>
                <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pb-5 text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong className="text-slate-800">Envío nacional</strong> desde Bogotá a
                  toda Colombia, con embalaje seguro.
                </p>
                <p>
                  <strong className="text-slate-800">Garantía Fuller</strong> de 6 meses a 1
                  año según el producto, con repuestos originales.
                </p>
                <p>
                  <strong className="text-slate-800">Compra asesorada</strong> por WhatsApp:
                  confirmamos disponibilidad, precio final y formas de pago.
                </p>
              </div>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer py-5 list-none">
                <span className="font-display font-bold text-lg text-slate-900">
                  Preguntas frecuentes
                </span>
                <span className="material-symbols-outlined text-slate-400 transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pb-5 space-y-4">
                {FULLER_FAQS.map((f) => (
                  <div key={f.question}>
                    <p className="font-semibold text-slate-800 mb-1">{f.question}</p>
                    <p className="text-slate-600 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>

        {/* Comparativa de familia: "elige tu modelo" */}
        {family.length >= 2 && (
          <ProductComparison family={family} currentSlug={product.slug} />
        )}

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="bg-slate-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 mb-8">
                También te puede interesar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    whatsappCommercial={settings.whatsappCommercial}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Sticky CTA móvil (innegociable — docs/cro-product-pages.md) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        {typeof product.price === "number" && product.price > 0 && (
          <div className="shrink-0">
            <span className="block text-[10px] text-slate-400 leading-none">Precio</span>
            <span className="font-display font-black text-lg text-slate-900">
              {formatCOP(product.price)}
            </span>
          </div>
        )}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Cotizar por WhatsApp
        </a>
      </div>

      <Footer />
    </>
  );
}
