import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RefrigeraciónHero from "@/components/refrigeracion/RefrigeraciónHero";
import RefrigeraciónCategories from "@/components/refrigeracion/RefrigeraciónCategories";
import EnergiaSection from "@/components/refrigeracion/EnergiaSection";
import ProductosRefrigeracion from "@/components/refrigeracion/ProductosRefrigeracion";
import TropicalizadoBanner from "@/components/refrigeracion/TropicalizadoBanner";
import RefrigeraciónFAQ from "@/components/refrigeracion/RefrigeraciónFAQ";

export default function RefrigeracionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <RefrigeraciónHero />
        <RefrigeraciónCategories />
        <EnergiaSection />
        <ProductosRefrigeracion />
        <TropicalizadoBanner />
        <RefrigeraciónFAQ />
      </main>
      <Footer />
    </>
  );
}
