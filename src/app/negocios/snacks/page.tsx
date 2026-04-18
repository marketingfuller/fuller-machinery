import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SnacksHero from "@/components/snacks/SnacksHero";
import NicheGrid from "@/components/snacks/NicheGrid";
import ViralProducts from "@/components/snacks/ViralProducts";
import ProfitCalc from "@/components/snacks/ProfitCalc";
import ProductGrid from "@/components/snacks/ProductGrid";
import KitCinema from "@/components/snacks/KitCinema";
import SnacksFAQ from "@/components/snacks/SnacksFAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Máquinas para Snacks: Crispeteras, Waffleras Burbuja y Asadores | Fuller Machinery",
  description:
    "Crispeteras industriales de lujo, wafflera burbuja, asadores de salchicha y equipos para negocios de snacks virales en Colombia. Cotización por WhatsApp y servicio técnico propio.",
  path: "/negocios/snacks",
  image: "/images/snacks y fast food inicio.webp",
  keywords: [
    "crispetera industrial Colombia",
    "crispetera de lujo 8 onzas",
    "wafflera burbuja Colombia",
    "asador de salchicha",
    "máquinas para snacks Colombia",
    "maquinaria para fast food",
    "crispeteras colombia",
    "negocio de perros calientes",
    "egg roller",
    "calentador de salsas",
    "bubble waffle Colombia",
    "equipos para emprender snacks",
  ],
});

export default function SnacksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Snacks y Fast Food", path: "/negocios/snacks" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <SnacksHero />
        <NicheGrid />
        <ViralProducts />
        <ProfitCalc />
        <ProductGrid />
        <KitCinema />
        <RelatedCategories current="snacks" />
        <SnacksFAQ />
      </main>
      <Footer />
    </>
  );
}
