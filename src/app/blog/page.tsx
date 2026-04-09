import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogCategoryNav from "@/components/blog/BlogCategoryNav";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogResources from "@/components/blog/BlogResources";
import BlogNewsletter from "@/components/blog/BlogNewsletter";

export const metadata: Metadata = {
  title: "Academia y Recursos | Fuller Machinery",
  description:
    "Guías técnicas, análisis de mercado y consejos de expertos para emprendedores gastronómicos. Aprende a construir un negocio de comida rentable con Fuller Machinery.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[80px]">
        <BlogHero />
        <BlogCategoryNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BlogFeatured />
          <BlogGrid />
        </div>
        <BlogResources />
        <BlogNewsletter />
      </main>
      <Footer />
    </>
  );
}
