import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BebidasHero from "@/components/bebidas/BebidasHero";
import BebidasNiches from "@/components/bebidas/BebidasNiches";
import BebidasProfit from "@/components/bebidas/BebidasProfit";
import BubbleTeaBanner from "@/components/bebidas/BubbleTeaBanner";
import BebidasProducts from "@/components/bebidas/BebidasProducts";
import BebidasFAQ from "@/components/bebidas/BebidasFAQ";
import RelatedCategories from "@/components/negocios/RelatedCategories";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Máquinas para Bebidas: Granizadoras, Capuchineras y Selladoras | Fuller Machinery",
  description:
    "Granizadoras industriales, capuchineras profesionales, selladoras de vasos y licuadoras para cafeterías, bubble tea y juguerías en Colombia. Envío nacional desde Bogotá.",
  path: "/negocios/bebidas",
  image: "/images/Bebidas y cafe inicio.webp",
  keywords: [
    "granizadora industrial Colombia",
    "granizadora 3 tanques",
    "capuchinera profesional Colombia",
    "selladora de vasos bubble tea",
    "máquinas para bebidas Colombia",
    "licuadora industrial",
    "equipos para cafetería Bogotá",
    "máquinas para jugos Colombia",
    "selladora de vasos automática",
    "equipos bubble tea",
    "maquinaria bebidas frías",
  ],
});

export default function BebidasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
          { name: "Bebidas y Café", path: "/negocios/bebidas" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <BebidasHero />
        <BebidasNiches />
        <BebidasProfit />
        <BubbleTeaBanner />
        <BebidasProducts />
        <RelatedCategories current="bebidas" />
        <BebidasFAQ />
      </main>
      <Footer />
    </>
  );
}
