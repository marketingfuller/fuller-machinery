import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SnacksHero from "@/components/snacks/SnacksHero";
import NicheGrid from "@/components/snacks/NicheGrid";
import ViralProducts from "@/components/snacks/ViralProducts";
import ProfitCalc from "@/components/snacks/ProfitCalc";
import ProductGrid from "@/components/snacks/ProductGrid";
import KitCinema from "@/components/snacks/KitCinema";
import SnacksFAQ from "@/components/snacks/SnacksFAQ";

export default function SnacksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <SnacksHero />
        <NicheGrid />
        <ViralProducts />
        <ProfitCalc />
        <ProductGrid />
        <KitCinema />
        <SnacksFAQ />
      </main>
      <Footer />
    </>
  );
}
