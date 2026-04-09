import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicioHero from "@/components/servicio/ServicioHero";
import ServicioPillars from "@/components/servicio/ServicioPillars";
import ServicioServices from "@/components/servicio/ServicioServices";
import RepuestoCTA from "@/components/servicio/RepuestoCTA";
import GarantiaSection from "@/components/servicio/GarantiaSection";
import ServicioTestimonial from "@/components/servicio/ServicioTestimonial";
import ServicioForm from "@/components/servicio/ServicioForm";

export const metadata: Metadata = {
  title: "Servicio Técnico y Garantía | Fuller Machinery",
  description:
    "Soporte técnico especializado, +5,000 repuestos originales y técnicos certificados. Garantía directa de 12 meses sin letra pequeña para tu maquinaria.",
};

export default function ServicioTecnicoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <ServicioHero />
        <ServicioPillars />
        <ServicioServices />
        <RepuestoCTA />
        <GarantiaSection />
        <ServicioTestimonial />
        <ServicioForm />
      </main>
      <Footer />
    </>
  );
}
