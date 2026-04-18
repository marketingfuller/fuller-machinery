import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RefrigeraciónHero from "@/components/refrigeracion/RefrigeraciónHero";
import RefrigeraciónCategories from "@/components/refrigeracion/RefrigeraciónCategories";
import EnergiaSection from "@/components/refrigeracion/EnergiaSection";
import ProductosRefrigeracion from "@/components/refrigeracion/ProductosRefrigeracion";
import TropicalizadoBanner from "@/components/refrigeracion/TropicalizadoBanner";
import RefrigeraciónFAQ from "@/components/refrigeracion/RefrigeraciónFAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Refrigeración Comercial: Congeladores, Fabricadoras de Hielo y Vitrinas | Fuller Machinery",
  description:
    "Congeladores industriales de 460L y 538L, fabricadoras de hielo de 30–90 kg, botelleros y trituradoras. Refrigeración comercial tropicalizada para el clima colombiano.",
  path: "/negocios/refrigeracion",
  image: "/images/negocios/refrigeracion y exhibicion negocios.webp",
  keywords: [
    "congelador industrial Colombia",
    "congelador vertical 460L",
    "fabricadora de hielo industrial",
    "fabricadora hielo 90 kg",
    "refrigeración comercial Bogotá",
    "botellero industrial",
    "trituradora de hielo",
    "equipos de refrigeración tropicalizados",
    "vitrina refrigerada",
    "congeladores para restaurante",
    "máquinas para hielo Colombia",
  ],
});

export default function RefrigeracionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Refrigeración", path: "/negocios/refrigeracion" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <RefrigeraciónHero />
        <RefrigeraciónCategories />
        <EnergiaSection />
        <ProductosRefrigeracion />
        <TropicalizadoBanner />
        <RelatedCategories current="refrigeracion" />
        <RefrigeraciónFAQ />
      </main>
      <Footer />
    </>
  );
}
