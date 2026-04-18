import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmprendeHero from "@/components/emprende/EmprendeHero";
import EmprendeCategoryNav from "@/components/emprende/EmprendeCategoryNav";
import EmprendeFeatured from "@/components/emprende/EmprendeFeatured";
import EmprendeGrid from "@/components/emprende/EmprendeGrid";
import EmprendeResources from "@/components/emprende/EmprendeResources";
import EmprendeNewsletter from "@/components/emprende/EmprendeNewsletter";
import { getAllPosts, getFeaturedPost } from "@/lib/emprende";

export const metadata: Metadata = {
  title: "Emprende | Fuller Machinery",
  description:
    "Guías técnicas, análisis de mercado y consejos para emprendedores gastronómicos. Aprende a construir un negocio de comida rentable con Fuller Machinery.",
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
        <EmprendeCategoryNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {featured && <EmprendeFeatured post={featured} />}
          <EmprendeGrid posts={grid} />
        </div>
        <EmprendeResources />
        <EmprendeNewsletter />
      </main>
      <Footer />
    </>
  );
}
