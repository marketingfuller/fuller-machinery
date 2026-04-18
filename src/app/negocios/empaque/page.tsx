import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmpaqueHero from "@/components/empaque/EmpaqueHero";
import EmpaqueNiches from "@/components/empaque/EmpaqueNiches";
import EmpaqueTrust from "@/components/empaque/EmpaqueTrust";
import EmpaqueProducts from "@/components/empaque/EmpaqueProducts";
import AhorroBanner from "@/components/empaque/AhorroBanner";
import DeliveryBanner from "@/components/empaque/DeliveryBanner";
import InsumosStrip from "@/components/empaque/InsumosStrip";
import EmpaqueFAQ from "@/components/empaque/EmpaqueFAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Empacadoras al Vacío y Selladoras Industriales | Fuller Machinery",
  description:
    "Empacadoras al vacío DZ-400 y doble cámara, selladoras de vasos automáticas, selladora de latas plásticas y banda continua con impresora. Extiende la vida útil de tus alimentos en Colombia.",
  path: "/negocios/empaque",
  image: "/images/empques inicio.webp",
  keywords: [
    "empacadora al vacío Colombia",
    "empacadora al vacío DZ-400",
    "empacadora doble cámara",
    "selladora banda continua",
    "selladora de vasos automática",
    "selladora de latas plásticas",
    "selladora de latas PET",
    "máquinas de empaque industrial Colombia",
    "maquinaria empaque al vacío",
    "empaque para delivery",
    "fechadora de bolsas",
  ],
});

export default function EmpaquePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Empaque y Automatización", path: "/negocios/empaque" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <EmpaqueHero />
        <EmpaqueNiches />
        <EmpaqueTrust />
        <EmpaqueProducts />
        <AhorroBanner />
        <DeliveryBanner />
        <InsumosStrip />
        <RelatedCategories current="empaque" />
        <EmpaqueFAQ />
      </main>
      <Footer />
    </>
  );
}
