"use client";

import { motion } from "framer-motion";
import { Refrigerator, ShoppingBag, Snowflake, Droplets } from "lucide-react";

const categories = [
  {
    Icon: Snowflake,
    iconBoxClass: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Congeladores",
    desc: "Horizontales de 538 L con canastillas y verticales de 460 L No Frost para carnicerías, supermercados y heladerías.",
  },
  {
    Icon: Droplets,
    iconBoxClass: "bg-blue-400/15 border-blue-400/30",
    iconColor: "text-blue-400",
    title: "Fabricadoras de Hielo",
    desc: "De 30 a 90 kg/24h en cubo. Con filtros, bodega integrada o conexión dual para cualquier volumen de operación.",
  },
  {
    Icon: Refrigerator,
    iconBoxClass: "bg-purple-400/15 border-purple-400/30",
    iconColor: "text-purple-400",
    title: "Botelleros & Enfriadores",
    desc: "Refrigeradores mini bar de 2 puertas con vidrio templado para bares, tiendas y licoreras.",
  },
  {
    Icon: ShoppingBag,
    iconBoxClass: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    title: "Procesamiento de Hielo",
    desc: "Trituradoras compactas en acero inoxidable para coctelería, catering y servicio de granizados.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 220, damping: 24 } },
};

export default function RefrigeraciónCategories() {
  return (
    <section className="py-20 md:py-28 bg-bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-3xl md:text-4xl relative inline-block"
          >
            Encuentra tu Equipo Ideal
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded-full" />
          </motion.h2>
          <p className="text-white/50 text-sm mt-8 max-w-md mx-auto">
            Selecciona la categoría según tu necesidad de conservación
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, i) => {
            const Icon = cat.Icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-300 cursor-pointer"
              >
                <div className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${cat.iconBoxClass}`}>
                  <Icon size={28} className={cat.iconColor} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{cat.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{cat.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-accent text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver equipos
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
