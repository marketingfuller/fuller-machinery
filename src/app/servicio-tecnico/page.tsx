import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicioHero from "@/components/servicio/ServicioHero";
import ServicioPillars from "@/components/servicio/ServicioPillars";
import ServicioServices from "@/components/servicio/ServicioServices";
import RepuestoCTA from "@/components/servicio/RepuestoCTA";
import GarantiaSection from "@/components/servicio/GarantiaSection";
import ServicioForm from "@/components/servicio/ServicioForm";

export const metadata: Metadata = {
  title: "Servicio Técnico y Garantía | Fuller Machinery",
  description:
    "Servicio técnico Fuller: reparación presencial en Bogotá, soporte remoto a nivel nacional, repuestos originales Fuller y garantía directa de 6 meses a 1 año.",
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
        <ServicioForm />
      </main>
      <Footer />
    </>
  );
}
