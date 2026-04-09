import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Componentes específicos de la página
import BusinessHero from '@/components/negocios/BusinessHero';
import CategoryGrid from '@/components/negocios/CategoryGrid';
import BusinessKits from '@/components/negocios/BusinessKits';
import ConsultingCTA from '@/components/negocios/ConsultingCTA';
import RegionalInfo from '@/components/negocios/RegionalInfo';

const SITE_URL = "https://www.fullermachinery.com";

export const metadata: Metadata = {
  title: "Negocios de Comida: Maquinaria por Industria | Fuller Machinery",
  description: "Maquinaria industrial para snacks, bebidas, panadería, carnicería, refrigeración y empaque. Kits listos para emprender en Colombia con servicio técnico propio en Bogotá.",
  keywords: [
    "maquinaria para negocios de comida Colombia",
    "equipos para emprendedores Colombia",
    "maquinaria industrial Bogotá",
    "equipos panadería Colombia",
    "equipos carnicería Colombia",
    "maquinaria bebidas Colombia",
    "equipos snacks Colombia",
    "maquinaria empaque industrial Colombia",
    "refrigeración industrial Colombia",
    "kits negocio comida Colombia",
    "perros calientes maquinaria",
    "crispetara industrial Colombia",
    "selladora latas plásticas Colombia",
  ],
  alternates: {
    canonical: `${SITE_URL}/negocios`,
  },
  openGraph: {
    title: "Negocios de Comida: Maquinaria por Industria | Fuller Machinery",
    description: "Maquinaria industrial para snacks, bebidas, panadería, carnicería, refrigeración y empaque. Kits listos para emprender en Colombia.",
    url: `${SITE_URL}/negocios`,
    siteName: "Fuller Machinery",
    locale: "es_CO",
    type: "website",
    images: [{ url: `${SITE_URL}/images/Hero-potencia.png`, width: 1200, height: 630, alt: "Negocios de comida con maquinaria Fuller Machinery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Negocios de Comida: Maquinaria por Industria | Fuller Machinery",
    description: "Maquinaria industrial para snacks, bebidas, panadería, carnicería, refrigeración y empaque en Colombia.",
  },
};

export default function NegociosPage() {
  return (
    <>
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
