import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmprendeHero from "@/components/emprende/EmprendeHero";
import EmprendeBrowser from "@/components/emprende/EmprendeBrowser";
import EmprendeNewsletter from "@/components/emprende/EmprendeNewsletter";
import { getAllPosts, getFeaturedPost } from "@/lib/emprende";

export const metadata: Metadata = {
  title: "Emprende | Fuller Machinery",
  description:
    "Guías, análisis y datos reales para emprendedores gastronómicos en Colombia. Aprende a construir un negocio de comida rentable con Fuller Machinery.",
};

export default function EmprendePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <EmprendeHero />
        <EmprendeBrowser posts={rest} featured={featured} />
        <EmprendeNewsletter />
      </main>
      <Footer />
    </>
  );
}
