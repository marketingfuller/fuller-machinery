"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Crispetera 8 oz Mini Comercial",
    badge: "Best Seller",
    badgeColor: "bg-secondary",
    image: "/images/Snacks y fast food/Crispetera 8oz Mini.webp",
    description: "Sistema de agitación, luz interna y tapa imantada. Hasta 3 kg/hora.",
    specs: ["8 oz / ciclo", "3 kg/hora", "Acero Inox"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/crispetera-8-oz-mini-comercial/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Crispetera%208%20oz%20Mini%20Comercial",
  },
  {
    name: "Fuente de Chocolate 5 Niveles",
    badge: "Bodas & Eventos",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/Snacks y fast food/Fuente Chocolate 5 Niveles.webp",
    description: "Derrite y bombea chocolate en flujo continuo para inmersión en eventos.",
    specs: ["21 L", "230 W", "5 Niveles"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/fuente-de-chocolate-grande-5/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Fuente%20de%20Chocolate%205%20Niveles",
  },
  {
    name: "Vaporizador de Salchicha y Pan",
    badge: "Locales de Paso",
    badgeColor: "bg-primary",
    image: "/images/Snacks y fast food/Vaporizador Salchicha.webp",
    description: "Baño María para perros calientes y panes jugosos, listos sin quemarlos.",
    specs: ["5 L", "180 °C", "Termostato"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/vaporizador-de-salchicha-y-pan-12/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Vaporizador%20de%20Salchicha%20y%20Pan",
  },
  {
    name: "Algodonera Mini Comercial",
    badge: "Eventos",
    badgeColor: "bg-purple-600",
    image: "/images/Snacks y fast food/Algodonera Mini.webp",
    description: "Mini máquina compacta y liviana para algodón de azúcar rápido e intuitivo.",
    specs: ["110 V", "29 × 17.5 cm", "Acero Inox"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/algodonera-mini-comercial/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Algodonera%20Mini%20Comercial",
  },
];

export default function ProductGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="productos" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">
              Equipamiento Estrella
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              Favoritos de los Emprendedores
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => scroll("left")}
                className="size-10 rounded-full border border-slate-200 hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => scroll("right")}
                className="size-10 rounded-full border border-slate-200 hover:border-primary hover:text-primary text-slate-500 flex items-center justify-center transition-colors shadow-sm hover:shadow"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <a
              href="https://tienda.fullermachinery.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors"
            >
              Ver todo el catálogo
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 w-max">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 24 }}
                className="w-[300px] md:w-[320px] bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group flex flex-col"
              >
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">local_shipping</span>
                    Envío Seguro
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base text-slate-900 mb-2 leading-snug">{p.name}</h3>
                  <p className="text-slate-600 text-xs mb-3 leading-relaxed">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.specs.map((s, j) => (
                      <span key={j} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={p.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-green-600/25"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Cotizar por WhatsApp
                    </a>
                    <a
                      href={p.fichaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 text-primary hover:text-secondary font-bold text-xs transition-colors"
                    >
                      Ver ficha técnica
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
