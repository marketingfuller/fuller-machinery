import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AlimentecHero from "@/components/alimentec/AlimentecHero";
import CalculatorTeaser from "@/components/alimentec/CalculatorTeaser";
import StandPreview from "@/components/alimentec/StandPreview";
import WhyFuller from "@/components/alimentec/WhyFuller";
import LeadSection from "@/components/alimentec/LeadSection";
import ClientGallery from "@/components/alimentec/ClientGallery";
import FairClose from "@/components/alimentec/FairClose";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";
import { FAIR } from "@/content/alimentec";

export const metadata = buildMetadata({
  title: "Fuller Machinery en Alimentec 2026 · Pabellón 4, Stand 415A | Corferias",
  description:
    "Visítanos en Alimentec 2026 (Pabellón 4, Stand 415A, Corferias · 9–12 jun). Calcula la rentabilidad de tu negocio con maquinaria alimentaria: variedad, stock y servicio técnico propio en Bogotá. Cotiza por WhatsApp.",
  path: "/alimentec",
  image: "/images/Hero-potencia.webp",
  keywords: [
    "Alimentec 2026",
    "Fuller Machinery Alimentec",
    "feria alimentos Corferias",
    "maquinaria alimentaria Bogotá",
    "equipos para emprender Colombia",
    "calculadora rentabilidad maquinaria",
    "stand Alimentec maquinaria",
    "maquinaria industrial alimentaria Colombia",
  ],
});

// Event JSON-LD — evento real (fechas/lugar confirmados), elegible como rich result.
function fairEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: `Fuller Machinery en ${FAIR.name}`,
    description:
      "Fuller Machinery presenta su maquinaria para la industria alimentaria en Alimentec 2026: calculadora de rentabilidad, demos en vivo y asesoría.",
    startDate: FAIR.startDate,
    endDate: FAIR.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${FAIR.venue} — ${FAIR.pavilion}, ${FAIR.stand}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: FAIR.address,
        addressLocality: FAIR.city,
        addressCountry: "CO",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Fuller Machinery",
      url: SITE_URL,
    },
    url: `${SITE_URL}/alimentec`,
  };
}

export default async function AlimentecPage() {
  const products = await getAllProducts();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Inicio", path: "/" },
            { name: "Alimentec 2026", path: "/alimentec" },
          ]),
          fairEventJsonLd(),
        ]}
      />
      <Header />
      <main className="min-h-screen">
        <AlimentecHero />
        <StandPreview />
        <CalculatorTeaser />
        <WhyFuller productCount={products.length} />
        <LeadSection />
        <ClientGallery />
        <FairClose />
      </main>
      <Footer />
    </>
  );
}
