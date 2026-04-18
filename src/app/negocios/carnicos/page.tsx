import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarnicosHero from "@/components/carnicos/CarnicosHero";
import CarnicosNiches from "@/components/carnicos/CarnicosNiches";
import CarnicosTrust from "@/components/carnicos/CarnicosTrust";
import CarnicosProducts from "@/components/carnicos/CarnicosProducts";
import MiseEnPlaceBanner from "@/components/carnicos/MiseEnPlaceBanner";
import CarnicosFAQ from "@/components/carnicos/CarnicosFAQ";

export default function CarnicosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <CarnicosHero />
        <CarnicosNiches />
        <CarnicosTrust />
        <CarnicosProducts />
        <MiseEnPlaceBanner />
        <CarnicosFAQ />
      </main>
      <Footer />
    </>
  );
}
