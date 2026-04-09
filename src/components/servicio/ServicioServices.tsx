"use client";

import { motion } from "framer-motion";
import { Wrench, Zap, GraduationCap } from "lucide-react";
import { cn } from "@/lib/cn";

const services = [
  {
    icon: Wrench,
    accentText: "text-accent",
    accentBg: "bg-accent/10 border-accent/30",
    title: "Mantenimiento Preventivo",
    desc: "Alarga la vida útil y evita paradas sorpresivas mediante revisiones programadas antes de que el problema ocurra.",
    cta: "Programar revisión",
  },
  {
    icon: Zap,
    accentText: "text-secondary",
    accentBg: "bg-secondary/10 border-secondary/30",
    title: "Reparación Correctiva",
    desc: "Diagnóstico preciso y solución rápida para minimizar el tiempo de inactividad cuando algo falla inesperadamente.",
    cta: "Solicitar reparación",
  },
  {
    icon: GraduationCap,
    accentText: "text-accent",
    accentBg: "bg-accent/10 border-accent/30",
    title: "Instalación y Capacitación",
    desc: "Te enseñamos a operar tu equipo desde el día 1 para maximizar su rendimiento y reducir el desgaste prematuro.",
    cta: "Agendar capacitación",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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

export default function ServicioServices() {
  return (
    <section className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Nuestros Servicios
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
            Soluciones Integrales
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-transparent transition-all duration-300 flex flex-col"
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center mb-6 border ${s.accentBg}`}
                >
                  <Icon size={26} className={s.accentText} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                  {s.desc}
                </p>
                <a
                  href="#contacto-soporte"
                  className={cn(
                    "inline-flex items-center gap-1.5 font-bold text-sm transition-all group-hover:gap-2.5",
                    s.accentText
                  )}
                >
                  {s.cta}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
