"use client";

import { motion } from "framer-motion";

const niches = [
  {
    title: "Crispetas & Algodón",
    label: "El Olor Vende Solo",
    icon: "fastfood",
    desc: "El aroma de las crispetas atrae clientes desde 20 metros. Costo por bolsa: menos de $1.000 COP. Venta: $3.000–$5.000. Margen real del 300%+.",
    image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Asadores de Salchichas",
    label: "Sin Chef, Sin Cocina",
    icon: "outdoor_grill",
    desc: "Operación sin capacitación: enciendes el equipo y listo. Ideal para estadios, parques y eventos masivos con alta rotación.",
    image: "https://images.unsplash.com/photo-1612392062631-94f9ea97ac8a?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Waffles & Crepes",
    label: "Contenido en Redes",
    icon: "egg",
    desc: "Formas especiales que generan fotos y videos orgánicos. Clientes que compran para publicar crean publicidad gratuita para tu negocio.",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=1000&fit=crop&q=80",
  },
  {
    title: "Dulces & Postres",
    label: "Espectáculo que Vende",
    icon: "icecream",
    desc: "Fuentes de chocolate que convierten tu punto de venta en un show. Ideal para eventos, bodas y celebraciones donde el postre se vuelve el protagonista.",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=800&h=1000&fit=crop&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
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

export default function NicheGrid() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest block mb-3">
            Líneas de Negocio
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            Explora por Nicho de Mercado
          </h2>
        </div>

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
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 scale-105"
                style={{ backgroundImage: `url('${niche.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/15" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="size-11 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                  <span className="material-symbols-outlined text-xl">{niche.icon}</span>
                </div>
                <h3 className="text-white font-display font-black text-xl md:text-2xl mb-1">{niche.title}</h3>
                <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">{niche.label}</p>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">{niche.desc}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
