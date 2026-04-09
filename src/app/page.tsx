import type { Metadata } from "next";
import Header from "@/components/Header";
import SplitHero from "@/components/SplitHero";
import TrustBar from "@/components/TrustBar";
import BentoCategories from "@/components/BentoCategories";
import ViralCarousel from "@/components/ViralCarousel";
import StarterKits from "@/components/StarterKits";
import TechnicalAuthority from "@/components/TechnicalAuthority";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fuller Machinery | Equipos y Maquinaria para la Industria Alimentaria",
  description:
    "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración. Equipos de tendencia para emprendedores con servicio técnico en Bogotá, Colombia.",
  alternates: {
    canonical: "https://www.fullermachinery.com",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <SplitHero />
        <TrustBar />
        <BentoCategories />
        <ViralCarousel />
        <StarterKits />
        <TechnicalAuthority />
      </main>
      <Footer />
    </>
  );
}
