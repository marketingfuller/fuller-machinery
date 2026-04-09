"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Mezclado",
    label: "Desarrollo del Gluten",
    cta: "Ver Amasadoras",
    image: "/images/panaderia/amasadora panaderia.jpg",
    href: "https://tienda.fullermachinery.com/?s=amasadora&post_type=product&product_cat=0",
    icon: "soup_kitchen",
  },
  {
    number: "02",
    title: "Formado",
    label: "Precisión en Gramaje",
    cta: "Ver Laminadoras",
    image: "/images/panaderia/laminadora panaderia.png",
    href: "https://tienda.fullermachinery.com/?s=laminadora&post_type=product&product_cat=0",
    icon: "straighten",
  },
  {
    number: "03",
    title: "Crecimiento",
    label: "Cámara de Crecimiento",
    cta: "Ver Cámaras",
    image: "/images/panaderia/crecimiento panaderia.png",
    href: "https://tienda.fullermachinery.com/?s=camara&post_type=product&product_cat=0",
    icon: "thermostat",
  },
  {
    number: "04",
    title: "Cocción",
    label: "Corteza Perfecta",
    cta: "Ver Hornos",
    image: "/images/panaderia/horno panaderia.jpg",
    href: "https://tienda.fullermachinery.com/?s=horno&post_type=product&product_cat=0",
    icon: "local_fire_department",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22 } },
};

export default function BreadCycle() {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-bold uppercase tracking-widest block mb-3">Flujo de Trabajo</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            El Ciclo del Pan Perfecto
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.a
              key={i}
              variants={itemVariants}
              href={(step as any).href ?? "#"}
              {...((step as any).href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative h-[450px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 scale-105"
                style={{ backgroundImage: `url('${step.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Step number top-right */}
              <div className="absolute top-5 right-5 z-10 font-display font-black text-4xl text-white/20 leading-none">
                {step.number}
              </div>

              <div className="absolute bottom-0 left-0 p-7 w-full">
                <div className="size-11 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 text-white border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-colors duration-300">
                  <span className="material-symbols-outlined text-xl">{step.icon}</span>
                </div>
                <h3 className="text-white font-display font-black text-xl mb-1">{step.title}</h3>
                <p className="text-accent font-bold uppercase text-xs tracking-widest mb-4">{step.label}</p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 rounded-lg backdrop-blur-sm transition-colors border border-white/20 group-hover:bg-secondary group-hover:border-secondary">
                  {step.cta}
                </button>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
