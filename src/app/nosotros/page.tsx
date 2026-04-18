import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NosotrosHero from "@/components/nosotros/NosotrosHero";
import NosotrosHistoria from "@/components/nosotros/NosotrosHistoria";
import NosotrosManifiesto from "@/components/nosotros/NosotrosManifiesto";
import NosotrosEquipo from "@/components/nosotros/NosotrosEquipo";
import NosotrosInfra from "@/components/nosotros/NosotrosInfra";
import NosotrosMapa from "@/components/nosotros/NosotrosMapa";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nosotros: Fuller Machinery Ltda — Maquinaria para Alimentos Desde 2008",
  description:
    "Fuller Machinery Ltda lleva más de 15 años equipando negocios de comida en Colombia. 3 sedes en Bogotá, +500 negocios atendidos y servicio técnico propio para maquinaria alimentaria.",
  path: "/nosotros",
  image: "/images/logo-fuller.webp",
  keywords: [
    "Fuller Machinery",
    "empresa de maquinaria alimentaria Colombia",
    "distribuidor maquinaria comida Bogotá",
    "Fuller Machinery Ltda",
    "maquinaria industrial Colombia historia",
  ],
});

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Nosotros", path: "/nosotros" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <NosotrosHero />
        <NosotrosHistoria />
        <NosotrosManifiesto />
        <NosotrosEquipo />
        <NosotrosInfra />
        <NosotrosMapa />
      </main>
      <Footer />
    </>
  );
}
