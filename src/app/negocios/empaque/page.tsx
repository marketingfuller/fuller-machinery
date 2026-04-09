import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmpaqueHero from "@/components/empaque/EmpaqueHero";
import EmpaqueNiches from "@/components/empaque/EmpaqueNiches";
import EmpaqueTrust from "@/components/empaque/EmpaqueTrust";
import EmpaqueProducts from "@/components/empaque/EmpaqueProducts";
import AhorroBanner from "@/components/empaque/AhorroBanner";
import DeliveryBanner from "@/components/empaque/DeliveryBanner";
import InsumosStrip from "@/components/empaque/InsumosStrip";
import EmpaqueFAQ from "@/components/empaque/EmpaqueFAQ";

export const metadata: Metadata = {
  title: "Empaque y Automatización | Fuller Machinery",
  description:
    "Sistemas de empaque al vacío y sellado continuo que extienden la vida útil de tus alimentos hasta 5 veces, reducen el desperdicio y mejoran la presentación de tu marca.",
};

export default function EmpaquePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <EmpaqueHero />
        <EmpaqueNiches />
        <EmpaqueTrust />
        <EmpaqueProducts />
        <AhorroBanner />
        <DeliveryBanner />
        <InsumosStrip />
        <EmpaqueFAQ />
      </main>
      <Footer />
    </>
  );
}
