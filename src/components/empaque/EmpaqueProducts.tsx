"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Empacadora al Vacío DZ-260",
    badge: "Top Seller",
    badgeColor: "bg-[#4ab84c]",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=500&fit=crop&q=80",
    originalPrice: "$1,050.00",
    salePrice: "$850.00",
    hasStrikethrough: true,
    desc: "Cámara simple para carnes, quesos y salsas. Barra de sellado 260mm, ciclo de 15-20 s.",
    specs: ["Barra 260mm", "Ciclo 20s", "Acero 304"],
  },
  {
    name: "Selladora de Banda Continua",
    badge: "Alta Velocidad",
    badgeColor: "bg-accent text-bg-dark",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=500&fit=crop&q=80",
    originalPrice: null,
    salePrice: "$420.00",
    hasStrikethrough: false,
    desc: "Sellado térmico de alto volumen para snacks, café y polvos. Velocidad 0-12m/min.",
    specs: ["0-12 m/min", "Fecha integrada", "PID digital"],
  },
  {
    name: "Codificadora de Fechas",
    badge: "Trazabilidad",
    badgeColor: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=500&fit=crop&q=80",
    originalPrice: null,
    salePrice: "$320.00",
    hasStrikethrough: false,
    desc: "Impresión indeleble de fecha de vencimiento y número de lote. Compatible con líneas existentes.",
    specs: ["Tinta/Térmico", "Alta velocidad", "Multi-línea"],
  },
  {
    name: "Selladora de Pedal Industrial",
    badge: "Económica",
    badgeColor: "bg-slate-700",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=500&fit=crop&q=80",
    originalPrice: "$240.00",
    salePrice: "$180.00",
    hasStrikethrough: true,
    desc: "Sellado de 450mm con pedal ergonómico reforzado. Ideal para operaciones de bajo volumen.",
    specs: ["450mm", "Pedal incluido", "Uso rudo"],
  },
];

export default function EmpaqueProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="productos" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#4ab84c] font-bold text-sm uppercase tracking-widest block mb-2">
              Equipamiento Destacado
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              Catálogo de Empaque
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
              href="#"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors"
            >
              Ver todo el catálogo
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div ref={scrollRef} className="overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 w-max">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                className="w-[300px] md:w-[340px] bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group"
              >
                {/* Image */}
                <div className="relative h-64 bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}
                  >
                    {p.badge}
                  </span>
                  {/* Envío seguro chip */}
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      local_shipping
                    </span>
                    Envío Seguro
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>

                  {/* Spec tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.specs.map((s, j) => (
                      <span
                        key={j}
                        className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      {p.hasStrikethrough && p.originalPrice && (
                        <span className="text-slate-400 line-through text-xs">
                          {p.originalPrice}
                        </span>
                      )}
                      <span className="text-secondary font-black text-xl">
                        {p.salePrice}
                      </span>
                    </div>
                    <button className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-1 transition-colors">
                      Ficha Técnica
                      <span className="material-symbols-outlined text-[14px]">
                        open_in_new
                      </span>
                    </button>
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
