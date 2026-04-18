import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmprendeHero from "@/components/emprende/EmprendeHero";
import EmprendeBrowser from "@/components/emprende/EmprendeBrowser";
import EmprendeNewsletter from "@/components/emprende/EmprendeNewsletter";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, getFeaturedPost } from "@/lib/emprende";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Emprende: Guías para Iniciar Negocios de Comida en Colombia | Fuller Machinery",
  description:
    "Guías, análisis y datos reales para emprendedores gastronómicos en Colombia. Aprende a montar panadería, puntos de bubble waffle, carnicerías, negocios de granizados y más.",
  path: "/emprende",
  image: "/images/Hero-iniciatupropionegocio.webp",
  keywords: [
    "cómo emprender negocio de comida Colombia",
    "ideas de negocios gastronómicos",
    "cómo iniciar panadería en Colombia",
    "cómo montar negocio de bubble waffle",
    "cómo iniciar negocio de granizados",
    "guías para emprendedores gastronómicos",
    "costos para abrir restaurante Colombia",
    "ideas de negocio de comida rentable",
  ],
});

export default function EmprendePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Emprende", path: "/emprende" },
        ])}
      />
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
