import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmprendeHero from "@/components/emprende/EmprendeHero";
import EmprendeFeatured from "@/components/emprende/EmprendeFeatured";
import EmprendeGrid from "@/components/emprende/EmprendeGrid";
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
  const grid = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <EmprendeHero />
        <div id="articulos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {featured && <EmprendeFeatured post={featured} />}
          {grid.length > 0 && <EmprendeGrid posts={grid} />}
        </div>
        <EmprendeNewsletter />
      </main>
      <Footer />
    </>
  );
}
