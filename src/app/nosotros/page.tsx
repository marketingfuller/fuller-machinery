import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NosotrosHero from "@/components/nosotros/NosotrosHero";
import NosotrosHistoria from "@/components/nosotros/NosotrosHistoria";
import NosotrosManifiesto from "@/components/nosotros/NosotrosManifiesto";
import NosotrosInfra from "@/components/nosotros/NosotrosInfra";
import NosotrosMapa from "@/components/nosotros/NosotrosMapa";

export const metadata: Metadata = {
  title: "Nosotros | Fuller Machinery",
  description:
    "Fuller Machinery Ltda — más de 15 años en Colombia. Especialistas en maquinaria, equipos y accesorios para alimentos, con tres sedes en Bogotá y más de 500 negocios equipados.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <NosotrosHero />
        <NosotrosHistoria />
        <NosotrosManifiesto />
        <NosotrosInfra />
        <NosotrosMapa />
      </main>
      <Footer />
    </>
  );
}
