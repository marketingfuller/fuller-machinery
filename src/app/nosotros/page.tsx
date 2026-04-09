import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NosotrosHero from "@/components/nosotros/NosotrosHero";
import NosotrosHistoria from "@/components/nosotros/NosotrosHistoria";
import NosotrosInfra from "@/components/nosotros/NosotrosInfra";
import NosotrosManifiesto from "@/components/nosotros/NosotrosManifiesto";
import NosotrosEquipo from "@/components/nosotros/NosotrosEquipo";
import NosotrosMapa from "@/components/nosotros/NosotrosMapa";

export const metadata: Metadata = {
  title: "Nosotros | Fuller Machinery",
  description:
    "Más que máquinas, somos socios de tu crecimiento. Conoce la historia de Fuller Machinery, nuestro equipo y los valores que nos mueven desde 1995.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <NosotrosHero />
        <NosotrosHistoria />
        <NosotrosInfra />
        <NosotrosManifiesto />
        <NosotrosEquipo />
        <NosotrosMapa />
      </main>
      <Footer />
    </>
  );
}
