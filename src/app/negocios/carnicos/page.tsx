import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarnicosHero from "@/components/carnicos/CarnicosHero";
import CarnicosNiches from "@/components/carnicos/CarnicosNiches";
import CarnicosTrust from "@/components/carnicos/CarnicosTrust";
import CarnicosProducts from "@/components/carnicos/CarnicosProducts";
import MiseEnPlaceBanner from "@/components/carnicos/MiseEnPlaceBanner";
import CarnicosFAQ from "@/components/carnicos/CarnicosFAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Máquinas para Carnicería: Molinos de Carne, Sierras y Embutidoras | Fuller Machinery",
  description:
    "Molino de carne industrial #32, sierra de hueso, embutidora 7L, clipadora y procesador de vegetales. Maquinaria profesional para carnicerías, famas y plantas cárnicas en Colombia.",
  path: "/negocios/carnicos",
  image: "/images/negocios/carniceria y procesos.webp",
  keywords: [
    "molino de carne industrial #32",
    "molino de carne Colombia",
    "sierra de hueso industrial",
    "embutidora 7 litros",
    "máquinas para carnicería Colombia",
    "maquinaria cárnica industrial",
    "procesador de vegetales 5 discos",
    "clipadora embutidos",
    "equipos para famas",
    "procesamiento de carnes Colombia",
    "carnicería industrial Bogotá",
  ],
});

export default function CarnicosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Cárnicos y Procesamiento", path: "/negocios/carnicos" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <CarnicosHero />
        <CarnicosNiches />
        <CarnicosTrust />
        <CarnicosProducts />
        <MiseEnPlaceBanner />
        <RelatedCategories current="carnicos" />
        <CarnicosFAQ />
      </main>
      <Footer />
    </>
  );
}
