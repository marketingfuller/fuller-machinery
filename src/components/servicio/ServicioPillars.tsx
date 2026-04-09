"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, MapPin } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Stock Real de Repuestos",
    desc: "Almacén centralizado con más de 5,000 partes originales listas para envío inmediato a todo el país.",
  },
  {
    icon: Award,
    color: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    title: "Técnicos Certificados",
    desc: "Profesionales entrenados directamente por los fabricantes para diagnosticar y reparar con precisión.",
  },
  {
    icon: MapPin,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Cobertura Nacional",
    desc: "Red de asistencia en sitio y soporte remoto para resolver problemas donde tu negocio esté.",
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
