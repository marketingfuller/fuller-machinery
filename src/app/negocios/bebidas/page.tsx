import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BebidasHero from "@/components/bebidas/BebidasHero";
import BebidasNiches from "@/components/bebidas/BebidasNiches";
import BebidasProfit from "@/components/bebidas/BebidasProfit";
import BubbleTeaBanner from "@/components/bebidas/BubbleTeaBanner";
import BebidasProducts from "@/components/bebidas/BebidasProducts";
import BebidasFAQ from "@/components/bebidas/BebidasFAQ";

export default function BebidasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <BebidasHero />
        <BebidasNiches />
        <BebidasProfit />
        <BubbleTeaBanner />
        <BebidasProducts />
        <BebidasFAQ />
      </main>
      <Footer />
    </>
  );
}
