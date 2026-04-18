"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Flame, MessageCircle, ExternalLink } from "lucide-react";

const WHATSAPP_NUMBER = "573244247198";

interface Product {
  name: string;
  tag: string;
  tagColor: string;
  image: string;
  href: string;
}

const products: Product[] = [
  {
    name: "Wafflera Burbuja",
    tag: "Tendencia",
    tagColor: "#d32f2f",
    image: "/images/wafflera burbuja tendencia inicio.webp",
    href: "https://tienda.fullermachinery.com/index.php/producto/waflera-burbuja/",
  },
  {
    name: "Granizadora 3 Tanques 12 Litros",
    tag: "Popular",
    tagColor: "#ef5350",
    image: "/images/granizadora tendencisas inicio.webp",
    href: "https://tienda.fullermachinery.com/index.php/producto/granizadora-3-tanques-12-litros/",
  },
  {
    name: "Selladora de Vasos",
    tag: "Nuevo",
    tagColor: "#4ab84c",
    image: "/images/selladora de vasos tendencias inicio.webp",
    href: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-vasos-full-automatica/",
  },
  {
    name: "Selladora de Latas",
    tag: "Pro",
    tagColor: "#4ab84c",
    image: "/images/selladora latas tendencia inicio.webp",
    href: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-latas-plasticas/",
  },
];

function getWhatsAppUrl(productName: string) {
  const msg = encodeURIComponent(`Hola, me interesa conocer el precio y disponibilidad de: ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export default function ViralCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="emprende" className="bg-bg-dark py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-widest mb-3">
              <Flame size={14} />
              Lo más buscado
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Tendencias Virales
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => scroll("left")}
                className="size-10 rounded-full border border-white/20 hover:border-accent hover:text-accent text-white/70 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => scroll("right")}
                className="size-10 rounded-full border border-white/20 hover:border-accent hover:text-accent text-white/70 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <a
              href="https://tienda.fullermachinery.com/index.php/shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white text-sm font-medium transition-colors"
            >
              Ver todo →
            </a>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 scroll-smooth"
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              className="snap-start shrink-0 w-[280px] sm:w-[300px] group"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="relative bg-white/[0.08] border border-white/15 rounded-2xl overflow-hidden hover:border-accent/50 hover:bg-white/[0.12] transition-all duration-500"
                data-cursor="food"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Tag */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: product.tagColor }}
                  >
                    {product.tag}
                  </div>

                  {/* Ver producto link */}
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent"
                    aria-label={`Ver ${product.name} en tienda`}
                  >
                    <ExternalLink size={14} className="text-white" />
                  </a>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-semibold text-base mb-4 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={getWhatsAppUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors duration-200"
                    >
                      <MessageCircle size={15} />
                      Consultar precio
                    </a>
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-accent/20 border border-white/10 hover:border-accent/40 flex items-center justify-center transition-colors duration-200"
                      aria-label="Ver en tienda"
                    >
                      <ExternalLink size={15} className="text-white/60 group-hover:text-accent" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="sm:hidden text-center mt-8">
          <a href="https://tienda.fullermachinery.com/index.php/shop/" target="_blank" rel="noopener noreferrer" className="text-accent text-sm font-medium">
            Ver todos los equipos →
          </a>
        </div>
      </div>
    </section>
  );
}
