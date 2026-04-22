import type { Metadata } from "next";
import Header from "@/components/Header";
import SplitHero from "@/components/SplitHero";
import TrustBar from "@/components/TrustBar";
import BentoCategories from "@/components/BentoCategories";
import ViralCarousel from "@/components/ViralCarousel";
import StarterKits from "@/components/StarterKits";
import TechnicalAuthority from "@/components/TechnicalAuthority";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Fuller Machinery | Equipos y Maquinaria para la Industria Alimentaria",
  description:
    "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración. Equipos de tendencia para emprendedores con servicio técnico en Bogotá, Colombia.",
  alternates: {
    canonical: "https://www.fullermachinery.com",
  },
};

export default async function Home() {
  const settings = await getSettings();
  return (
    <>
      <Header />
      <main>
        <SplitHero left={settings.heroLeft} right={settings.heroRight} />
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
