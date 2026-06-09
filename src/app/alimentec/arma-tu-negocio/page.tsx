import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BusinessBuilder, {
  type ResolvedBusiness,
  type ResolvedMachine,
} from "@/components/alimentec/BusinessBuilder";
import PresentationMode from "@/components/alimentec/PresentationMode";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { getProductBySlug } from "@/lib/products";
import { ALIMENTEC_BUSINESSES, lineInsumoCost } from "@/content/alimentec-roi";
import { FAIR } from "@/content/alimentec";

export const metadata = buildMetadata({
  title: "Arma tu negocio: kit de maquinaria + rentabilidad | Fuller Machinery · Alimentec 2026",
  description:
    "Elige tu negocio, arma tu kit de máquinas y calcula tu utilidad neta y en cuántos meses recuperas la inversión. Precios reales del catálogo Fuller. Recibe tu propuesta por WhatsApp.",
  path: "/alimentec/arma-tu-negocio",
  image: "/images/Hero-potencia.webp",
  keywords: [
    "arma tu negocio maquinaria",
    "kit para montar negocio de comida",
    "calculadora rentabilidad negocio Colombia",
    "cuánto cuesta montar una cafetería",
    "kit panadería precio Colombia",
    "Alimentec 2026 arma tu negocio",
  ],
});

export default async function ArmaTuNegocioPage() {
  // Resuelve cada negocio: kit base + complementos con su PRECIO REAL del
  // catálogo. Máquinas sin precio se omiten (nunca mostramos precio falso).
  const resolved = await Promise.all(
    ALIMENTEC_BUSINESSES.map(async (b) => {
      const baseEntries = b.machines.map((m) => ({ slug: m.slug, included: m.included, group: "base" as const }));
      const extraEntries = b.extras.map((e) => ({ slug: e.slug, included: false, group: "extra" as const }));
      const machines = (
        await Promise.all(
          [...baseEntries, ...extraEntries].map(async (entry) => {
            const product = await getProductBySlug(entry.slug);
            if (!product?.price) return null;
            return {
              slug: product.slug,
              name: product.name,
              price: product.price,
              ...(product.type ? { type: product.type } : {}),
              included: entry.included,
              group: entry.group,
            } satisfies ResolvedMachine;
          }),
        )
      ).filter((m): m is ResolvedMachine => m !== null);
      // No descartamos si el kit queda vacío: el negocio "personalizado" no trae
      // kit base y se arma con el buscador del catálogo.
      // ResolvedBusiness: máquinas con precio real + líneas con su costo de
      // insumos por defecto (suma del desglose de referencia).
      return {
        key: b.key,
        label: b.label,
        icon: b.icon,
        blurb: b.blurb,
        daysMonth: b.daysMonth,
        fixedMonthly: b.fixedMonthly,
        fixedMax: b.fixedMax,
        machines,
        lines: b.productLines.map((l) => ({
          key: l.key,
          label: l.label,
          unitLabel: l.unitLabel,
          salePrice: l.salePrice,
          salePriceMax: l.salePriceMax,
          unitsDay: l.unitsDay,
          unitsMax: l.unitsMax,
          insumos: l.insumos,
          insumoCostDefault: lineInsumoCost(l),
          enabled: l.enabled,
        })),
      } satisfies ResolvedBusiness;
    }),
  );
  const businesses = resolved.filter((b): b is ResolvedBusiness => b !== null);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Alimentec 2026", path: "/alimentec" },
          { name: "Arma tu negocio", path: "/alimentec/arma-tu-negocio" },
        ])}
      />
      <Header />
      <main className="min-h-screen bg-bg-light">
        <section className="at-intro bg-bg-dark text-white pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <Link
              href="/alimentec"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-accent text-sm mb-6 transition"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_back</span>
              Volver a {FAIR.name}
            </Link>
            <span className="inline-flex items-center gap-2 text-accent font-bold tracking-[0.2em] uppercase text-xs mb-5 bg-accent/10 border border-accent/25 px-5 py-2 rounded-full">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>rocket_launch</span>
              Arma tu negocio
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black leading-tight mb-4">
              Arma tu negocio y mira{" "}
              <span className="text-gradient-accent">cuánto deja</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Elige un negocio, configura tu kit de máquinas y estima tu utilidad
              neta y tu payback. Con tus números y precios reales del catálogo.
            </p>
          </div>
        </section>

        <section className="at-tool-section py-12 md:py-16">
          <div className="at-tool-inner container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl -mt-24">
            {businesses.length > 0 ? (
              <PresentationMode>
                <BusinessBuilder businesses={businesses} />
              </PresentationMode>
            ) : (
              <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
                Estará disponible en breve.{" "}
                <Link href="/alimentec#cotizar" className="text-secondary font-semibold">
                  Escríbenos por WhatsApp
                </Link>{" "}
                y te ayudamos a armar tu negocio.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
