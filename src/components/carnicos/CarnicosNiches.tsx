"use client";

import { motion } from "framer-motion";

const niches = [
  {
    title: "Cárnicos",
    label: "La Fuerza",
    desc: "Molinos #22 y #32 (hasta 350 kg/h) más sierra de hueso y carnes para cortes limpios en res, cerdo y cordero.",
    image: "/images/carnicos y procesamiento/carnicos.webp",
    icon: "kebab_dining",
  },
  {
    title: "Vegetales",
    label: "La Velocidad",
    desc: "Procesador de 5 discos y cutter industrial de 750W para rebanar, cubear, emulsionar y mezclar en alto volumen.",
    image: "/images/carnicos y procesamiento/Procesador Vegetales.webp",
    icon: "restaurant",
  },
  {
    title: "Embutidos",
    label: "La Precisión",
    desc: "Embutidoras manuales de 7 L con 4 boquillas más clipadora manual en acero inoxidable grado alimenticio.",
    image: "/images/carnicos y procesamiento/embutidos- carnicos.webp",
    icon: "egg",
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

export default function CarnicosNiches() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest block mb-3">
            Líneas de Negocio
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            Todo lo que necesitas procesar, en un solo proveedor
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {niches.map((niche, i) => (
            <motion.a
              key={i}
              variants={itemVariants}
              href="#productos"
              className="group relative h-[460px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Background image — starts grayscale, gains color on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 scale-105"
                style={{ backgroundImage: `url('${niche.image}')` }}
              />
              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

              {/* Red expanding underline on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="size-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                  <span className="material-symbols-outlined text-2xl">
                    {niche.icon}
                  </span>
                </div>
                <h3 className="text-white font-display font-black text-2xl md:text-3xl mb-1">
                  {niche.title}
                </h3>
                <p className="text-accent font-bold uppercase text-xs tracking-widest mb-3">
                  {niche.label}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 max-w-xs">
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
