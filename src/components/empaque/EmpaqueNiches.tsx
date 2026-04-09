"use client";

import { motion } from "framer-motion";

const niches = [
  {
    title: "Al Vacío",
    label: "Conservación Máxima",
    desc: "Extrae el oxígeno al 99.9%. Ideal para carnes, quesos y salsas: extiende la vida útil hasta 5 veces sin conservantes.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&q=80",
    icon: "inventory_2",
  },
  {
    title: "Sellado Continuo",
    label: "Alta Velocidad",
    desc: "Bandas de sellado térmico para snacks, café y polvos. Hasta 12 metros por minuto con impresión de fecha integrada.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=1000&fit=crop&q=80",
    icon: "local_shipping",
  },
  {
    title: "Fechado y Loteo",
    label: "Trazabilidad Total",
    desc: "Codificadoras de tinta y térmica para imprimir fecha de vencimiento y número de lote de forma indeleble.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=1000&fit=crop&q=80",
    icon: "calendar_today",
  },
  {
    title: "Sellado de Vasos",
    label: "Delivery Sin Derrames",
    desc: "Equipos de termoformado para vasos y bandejas. Garantiza hermeticidad total para bebidas y postres a domicilio.",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&h=1000&fit=crop&q=80",
    icon: "local_cafe",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

export default function EmpaqueNiches() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-[#4ab84c] text-sm font-bold uppercase tracking-widest block mb-3">
            Líneas de Empaque
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            Una solución para cada formato de negocio
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {niches.map((niche, i) => (
            <motion.a
              key={i}
              variants={itemVariants}
              href="#productos"
              className="group relative h-[440px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Background image — starts grayscale, gains color on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 scale-105"
                style={{ backgroundImage: `url('${niche.image}')` }}
              />
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Purple underline on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4ab84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="size-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-[#4ab84c]/80 group-hover:border-[#4ab84c] transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">
                    {niche.icon}
                  </span>
                </div>
                <h3 className="text-white font-display font-black text-2xl mb-1">
                  {niche.title}
                </h3>
                <p className="text-[#4ab84c] font-bold uppercase text-xs tracking-widest mb-3">
                  {niche.label}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                  {niche.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
