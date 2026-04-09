"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Sierra Cinta Industrial",
    badge: "Carnicerías",
    badgeColor: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1588347818036-c65e4d8e4b5e?w=600&h=500&fit=crop&q=80",
    originalPrice: "$2,150.00",
    salePrice: "$1,850.00",
    hasStrikethrough: true,
    desc: "Ideal para carnicerías de alto volumen. Corte preciso de hueso y congelados.",
    specs: ["Motor 1HP", "Hoja 45cm", "Acero 304"],
  },
  {
    name: "Molino de Carne #22",
    badge: "Más Vendido",
    badgeColor: "bg-accent text-bg-dark",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=500&fit=crop&q=80",
    originalPrice: null,
    salePrice: "$890.00",
    hasStrikethrough: false,
    desc: "Cuerpo en acero inoxidable. Capacidad de 250 kg/hora. Motor 1.5HP.",
    specs: ["250 kg/h", "Motor 1.5HP", "Platos: 3,5,8mm"],
  },
  {
    name: "Procesador de Vegetales",
    badge: "Cocinas",
    badgeColor: "bg-primary",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=500&fit=crop&q=80",
    originalPrice: "$1,350.00",
    salePrice: "$1,120.00",
    hasStrikethrough: true,
    desc: "Incluye 5 discos de corte intercambiables. Entrada doble boca.",
    specs: ["5 discos", "2 bocas", "120 kg/h"],
  },
  {
    name: "Embutidora Hidráulica",
    badge: "Charcutería",
    badgeColor: "bg-secondary",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=500&fit=crop&q=80",
    originalPrice: null,
    salePrice: "$2,450.00",
    hasStrikethrough: false,
    desc: "Control de velocidad variable y pedal de accionamiento. 15 litros.",
    specs: ["15 litros", "Pedal incluido", "Velocidad variable"],
  },
];

export default function CarnicosProducts() {
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
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors shrink-0"
          >
            Ver todo el catálogo
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  {/* "Envío seguro" chip */}
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
