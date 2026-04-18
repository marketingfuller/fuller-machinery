"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Molino de Carne #32 Industrial",
    badge: "Más Potente",
    badgeColor: "bg-secondary",
    image: "/images/carnicos y procesamiento/Molino Carne 32.webp",
    desc: "Motor reversible 2.200W y 170 rpm. Incluye 2 discos, 2 cuchillas y bandejas en acero inoxidable.",
    specs: ["350 kg/h", "2.200W", "Reversible"],
    fichaUrl: "https://tienda.fullermachinery.com/?s=molino+de+carne&post_type=product&product_cat=0",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Molino%20de%20Carne%20%2332%20Industrial",
  },
  {
    name: "Sierra de Hueso y Carnes",
    badge: "Carnicerías",
    badgeColor: "bg-accent text-bg-dark",
    image: "/images/carnicos y procesamiento/Sierra de Hueso.webp",
    desc: "Sierra industrial de precisión para hueso duro y carnes, ideal para frigoríficos, hoteles y restaurantes.",
    specs: ["750 W", "110V", "70 kg"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/sierra-de-hueso-y-carnes/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Sierra%20de%20Hueso%20y%20Carnes",
  },
  {
    name: "Embutidora de Chorizos 7 Litros",
    badge: "Charcutería",
    badgeColor: "bg-secondary",
    image: "/images/carnicos y procesamiento/Embutidora 7 Litros.webp",
    desc: "Manual con palanca, acero inoxidable grado alimenticio. Incluye 4 boquillas intercambiables y empaque de repuesto.",
    specs: ["7 L", "4 boquillas", "Acero Inox"],
    fichaUrl: "https://tienda.fullermachinery.com/?s=embutidora&post_type=product&product_cat=0",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Embutidora%20de%20Chorizos%207%20Litros",
  },
  {
    name: "Clipadora Amarradora de Embutidos",
    badge: "Acabado",
    badgeColor: "bg-primary",
    image: "/images/carnicos y procesamiento/Clipadora.webp",
    desc: "Cierre seguro de extremos con clips metálicos. Operación manual tipo balancín en acero inoxidable.",
    specs: ["50 clips/min", "Manual", "7 kg"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/clipadora-amarradora-de-embutidos/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20la%20Clipadora%20Amarradora%20de%20Embutidos",
  },
  {
    name: "Procesador de Vegetales 5 Discos",
    badge: "Cocinas",
    badgeColor: "bg-primary",
    image: "/images/carnicos y procesamiento/Procesador Vegetales.webp",
    desc: "Cinco discos intercambiables: rebanadas de 2, 4, 5 y 10 mm más cubos de 10×10×10 mm. Ideal para alto volumen.",
    specs: ["5 discos", "750 W", "300 rpm"],
    fichaUrl: "https://tienda.fullermachinery.com/index.php/producto/procesador-de-vegetales-5-discos/",
    whatsappUrl: "https://wa.me/573244247198?text=Hola%2C%20me%20interesa%20el%20Procesador%20de%20Vegetales%205%20Discos",
  },
];

export default function CarnicosProducts() {
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
            <span className="text-secondary font-bold text-sm uppercase tracking-widest block mb-2">
              Equipamiento Estrella
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
              Catálogo Destacado
            </h2>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {/* Desktop arrow controls */}
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
              href="https://tienda.fullermachinery.com/?s=carne&post_type=product&product_cat=0"
              target="_blank"
              rel="noopener noreferrer"
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
                className="w-[300px] md:w-[340px] bg-white border border-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 bg-slate-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <span
                    className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}
                  >
                    {p.badge}
                  </span>
                  {/* "Envío seguro" chip */}
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      local_shipping
                    </span>
                    Envío Seguro
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-3">
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

                  {/* CTAs */}
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
