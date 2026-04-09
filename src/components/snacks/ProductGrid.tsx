"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Crispetera Cinema Pro 8oz",
    badge: "Best Seller",
    badgeColor: "bg-secondary",
    image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=600&h=500&fit=crop&q=80",
    price: "$320.00",
    originalPrice: "$390.00",
    specs: ["8 oz / ciclo", "Motor 800W", "Acero Inox"],
  },
  {
    name: "Wafflera Giratoria Belga",
    badge: "Top Ventas",
    badgeColor: "bg-accent text-bg-dark",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&h=500&fit=crop&q=80",
    price: "$185.00",
    originalPrice: null,
    specs: ["Placa 360°", "Temp. ajustable", "Antiadherente"],
  },
  {
    name: "Asador de Salchichas 11R",
    badge: "Locales de Paso",
    badgeColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1612392062631-94f9ea97ac8a?w=600&h=500&fit=crop&q=80",
    price: "$245.00",
    originalPrice: "$290.00",
    specs: ["11 rodillos", "2 zonas calor", "110V"],
  },
  {
    name: "Máquina Algodón de Azúcar XL",
    badge: "Eventos",
    badgeColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1527905416024-a9a82ad2ae59?w=600&h=500&fit=crop&q=80",
    price: "$299.00",
    originalPrice: null,
    specs: ["Bowl 46cm", "Motor Silencioso", "Uso continuo"],
  },
];

export default function ProductGrid() {
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
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors shrink-0">
            Ver todo el catálogo
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <span className="absolute top-4 right-4 z-10 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-200 uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">local_shipping</span>
                    Envío Seguro
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-base text-slate-900 mb-3 leading-snug">{p.name}</h3>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.specs.map((s, j) => (
                      <span key={j} className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      {p.originalPrice && (
                        <span className="text-slate-400 line-through text-xs">{p.originalPrice}</span>
                      )}
                      <span className="text-secondary font-black text-xl">{p.price}</span>
                    </div>
                    <button className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-1 transition-colors">
                      Ficha Técnica
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
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
