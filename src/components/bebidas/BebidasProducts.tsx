"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Granizadora Triple Tanque 12L",
    badge: "Best Seller",
    badgeColor: "bg-secondary",
    image: "/images/Bebidas y cafe/granizadora 3 tanques.webp",
    specs: ["3x12 Litros", "Motor 1.200W", "Hasta -9°C", "Refrigerante R290"],
    fichaHref: "https://tienda.fullermachinery.com/index.php/producto/granizadora-3-tanques-12-litros/",
    whatsapp: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20conocer%20el%20precio%20de%20la%20Granizadora%20Triple%20Tanque%2012L",
  },
  {
    name: "Licuadora Industrial 2.7L",
    badge: "Silenciosa",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/Bebidas y cafe/Licuadora encapsulada.webp",
    specs: ["Capacidad 2.7L", "Motor 1.800W", "Aislador de Ruido", "110V"],
    fichaHref: "https://tienda.fullermachinery.com/index.php/producto/licuadora-industrial-2-7-litros-aislador-ruido/",
    whatsapp: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20conocer%20el%20precio%20de%20la%20Licuadora%20Industrial%202.7L",
  },
  {
    name: "Capuchinera 1 Grupo",
    badge: "Cafeterías",
    badgeColor: "bg-primary",
    image: "/images/Bebidas y cafe/capuchinera 1 grupo.webp",
    specs: ["1 Grupo Profesional", "Potencia 2.500W", "Tanque 3 Litros", "220V"],
    fichaHref: "https://tienda.fullermachinery.com/index.php/producto/capuchinera-barismo-magister-1-grupo/",
    whatsapp: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20conocer%20el%20precio%20de%20la%20Capuchinera%201%20Grupo",
  },
  {
    name: "Selladora de Vasos Manual",
    badge: "Delivery",
    badgeColor: "bg-purple-600",
    image: "/images/Bebidas y cafe/selladora de vasos.webp",
    specs: ["7 a 22 Oz", "140-160 Vasos/h", "Contador Digital", "110V"],
    fichaHref: "https://tienda.fullermachinery.com/index.php/producto/selladora-de-vasos-manual-contador-digital/",
    whatsapp: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20conocer%20el%20precio%20de%20la%20Selladora%20de%20Vasos%20Manual",
  },
];

export default function BebidasProducts() {
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
            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">Equipamiento Estrella</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">Equipos Estrella</h2>
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
            <a href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors">
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
                className="w-[300px] md:w-[320px] bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group"
              >
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <Image src={p.image} alt={`${p.name} — Maquinaria para bebidas y café | Fuller Machinery Colombia`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}>{p.badge}</span>
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">local_shipping</span>
                    Envío Seguro
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-base text-slate-900 mb-3 leading-snug">{p.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.specs.map((s, j) => (
                      <span key={j} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">sell</span>
                      Ver Precio
                    </a>
                    <a
                      href={p.fichaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      Ficha Técnica
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
