"use client";

import { motion } from "framer-motion";
import { TrendingUp, ClipboardList, BookOpen } from "lucide-react";

const resources = [
  {
    icon: TrendingUp,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    ctaColor: "text-accent",
    title: "Calculadora de ROI",
    desc: "Estima el retorno de inversión de tu maquinaria en tiempo real según tu tipo de negocio.",
    cta: "Usar ahora",
    ctaIcon: "query_stats",
  },
  {
    icon: ClipboardList,
    color: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    ctaColor: "text-secondary",
    title: "Checklist de Apertura",
    desc: "Lista paso a paso de lo que necesitas antes de abrir tu local. Descárgala en PDF.",
    cta: "Descargar PDF",
    ctaIcon: "download",
  },
  {
    icon: BookOpen,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    ctaColor: "text-accent",
    title: "Manuales de Usuario",
    desc: "Biblioteca técnica completa de todos nuestros equipos industriales, siempre actualizada.",
    cta: "Buscar Manual",
    ctaIcon: "search",
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

export default function BlogResources() {
  return (
    <section className="py-20 md:py-24 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-start gap-4 mb-14">
          <div className="size-12 bg-secondary/15 border border-secondary/30 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[24px]">calculate</span>
          </div>
          <div>
            <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-1">
              Herramientas Gratuitas
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white leading-tight">
              Calculadoras y Recursos
            </h2>
          </div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {resources.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.a
                key={i}
                href="#"
                variants={itemVariants}
                className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-8 flex flex-col transition-all duration-300"
              >
                {/* Icon box */}
                <div className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${r.color}`}>
                  <Icon size={28} className={r.iconColor} />
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-3">
                  {r.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                  {r.desc}
                </p>

                <span className={`inline-flex items-center gap-2 font-bold text-sm ${r.ctaColor} group-hover:gap-3 transition-all`}>
                  {r.cta}
                  <span className="material-symbols-outlined text-[16px]">{r.ctaIcon}</span>
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
