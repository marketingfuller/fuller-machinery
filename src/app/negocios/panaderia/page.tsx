import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BakeryHero from "@/components/panaderia/BakeryHero";
import ProductionScale from "@/components/panaderia/ProductionScale";
import MassLab from "@/components/panaderia/MassLab";
import BreadCycle from "@/components/panaderia/BreadCycle";
import KitBundle from "@/components/panaderia/KitBundle";
import Testimonial from "@/components/panaderia/Testimonial";
import FAQ from "@/components/panaderia/FAQ";

export const metadata: Metadata = {
  title: "Panadería y Pastelería | Fuller Machinery",
  description:
    "Hornos de precisión térmica y amasadoras de alto torque diseñadas para proteger la estructura del gluten. Eleva tu producción con maquinaria que respeta tu receta.",
};

export default function PanaderiaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <BakeryHero />
        <ProductionScale />
        <MassLab />
        <BreadCycle />
        <KitBundle />
        <Testimonial />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
