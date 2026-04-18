"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Settings2, MapPin } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Garantía de 6 meses a 1 año",
    desc: "Cobertura según el equipo, directa con Fuller. Aplica a defectos de fábrica y daños no causados por mal uso.",
  },
  {
    icon: Settings2,
    color: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    title: "Repuestos originales Fuller",
    desc: "Solo manejamos repuestos de nuestras propias líneas. No compatibles ni genéricos — compatibilidad y duración garantizadas.",
  },
  {
    icon: MapPin,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Presencial en Bogotá",
    desc: "El mantenimiento se atiende en nuestra sede de Bogotá. Para clientes de otras ciudades despachamos repuestos originales Fuller con guía telefónica.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export default function ServicioPillars() {
  return (
    <section className="py-20 md:py-24 bg-bg-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${p.color}`}
                >
                  <Icon size={28} className={p.iconColor} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
