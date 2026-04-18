import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessHero from "@/components/negocios/BusinessHero";
import CategoryGrid from "@/components/negocios/CategoryGrid";
import BusinessKits from "@/components/negocios/BusinessKits";
import ConsultingCTA from "@/components/negocios/ConsultingCTA";
import RegionalInfo from "@/components/negocios/RegionalInfo";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Máquinas para Negocios de Comida: Maquinaria Industrial por Categoría | Fuller Machinery",
  description:
    "Maquinaria industrial para snacks, bebidas, panadería, carnicería, refrigeración y empaque. Kits completos para emprender en Colombia con servicio técnico propio en Bogotá.",
  path: "/negocios",
  image: "/images/Hero-potencia.webp",
  keywords: [
    "máquinas para negocios de comida",
    "maquinaria para emprender Colombia",
    "equipos industriales alimentarios",
    "kits para negocios de comida",
    "maquinaria industrial Bogotá",
    "equipos para restaurante Colombia",
    "maquinaria por industria alimentaria",
    "crispeteras Colombia",
    "granizadora industrial",
    "molino de carne #32",
    "hornos industriales panadería",
    "empacadora al vacío",
  ],
});

export default function NegociosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Negocios", path: "/negocios" },
        ])}
      />
      <Header />
      <main className="min-h-screen">
        <BusinessHero />
        <CategoryGrid />
        <BusinessKits />
        <ConsultingCTA />
        <RegionalInfo />
      </main>
      <Footer />
    </>
  );
}
