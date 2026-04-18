import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicioHero from "@/components/servicio/ServicioHero";
import ServicioPillars from "@/components/servicio/ServicioPillars";
import ServicioServices from "@/components/servicio/ServicioServices";
import RepuestoCTA from "@/components/servicio/RepuestoCTA";
import GarantiaSection from "@/components/servicio/GarantiaSection";
import ServicioForm from "@/components/servicio/ServicioForm";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Servicio Técnico para Maquinaria Alimentaria en Bogotá | Fuller Machinery",
  description:
    "Servicio técnico presencial en Bogotá para maquinaria de panadería, bebidas, snacks, cárnicos, refrigeración y empaque. Repuestos originales Fuller con despacho nacional y garantía de 6 a 12 meses.",
  path: "/servicio-tecnico",
  image: "/images/Servicio tecnico/hero-servicio-tecnico.webp",
  keywords: [
    "servicio técnico maquinaria alimentaria Bogotá",
    "reparación maquinaria industrial Bogotá",
    "repuestos maquinaria Fuller",
    "mantenimiento preventivo maquinaria comida",
    "servicio técnico panadería Bogotá",
    "repuestos originales maquinaria alimentaria",
    "garantía maquinaria Fuller",
  ],
});

export default function ServicioTecnicoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicio Técnico", path: "/servicio-tecnico" },
        ])}
      />
      <Header />
      <main className="min-h-screen mt-[80px]">
        <ServicioHero />
        <ServicioPillars />
        <ServicioServices />
        <RepuestoCTA />
        <GarantiaSection />
        <ServicioForm />
      </main>
      <Footer />
    </>
  );
}
