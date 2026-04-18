import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BakeryHero from "@/components/panaderia/BakeryHero";
import ProductionScale from "@/components/panaderia/ProductionScale";
import MassLab from "@/components/panaderia/MassLab";
import BreadCycle from "@/components/panaderia/BreadCycle";
import KitBundle from "@/components/panaderia/KitBundle";
import Testimonial from "@/components/panaderia/Testimonial";
import FAQ from "@/components/panaderia/FAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Máquinas para Panadería: Hornos Industriales, Amasadoras y Laminadoras | Fuller Machinery",
  description:
    "Hornos industriales de precisión, amasadoras de alto torque, laminadoras y vitrinas para panaderías y pastelerías en Colombia. Kits completos para iniciar o escalar tu panadería.",
  path: "/negocios/panaderia",
  image: "/images/panaderia inicio.webp",
  keywords: [
    "horno industrial panadería Colombia",
    "amasadora industrial",
    "maquinaria para panadería Colombia",
    "laminadora de masa",
    "vitrina para panadería",
    "equipos para panadería Bogotá",
    "kit panadero emprendedor",
    "batidora planetaria industrial",
    "cuarto de crecimiento",
    "horno rotativo panadería",
    "máquinas para pastelería",
  ],
});

export default function PanaderiaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Panadería y Pastelería", path: "/negocios/panaderia" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <BakeryHero />
        <ProductionScale />
        <MassLab />
        <BreadCycle />
        <KitBundle />
        <Testimonial />
        <RelatedCategories current="panaderia" />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
