"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingDown, Zap } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    color: "bg-[#4ab84c]/15 border-[#4ab84c]/30",
    iconColor: "text-[#4ab84c]",
    title: "Certificación HACCP",
    desc: "Superficies de acero inoxidable 304 sin poros ni recovecos. Desmontables para lavado profundo. Cumplimiento total con normas sanitarias para procesos de alimentos.",
  },
  {
    icon: TrendingDown,
    color: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    title: "30% Menos Desperdicio",
    desc: "El vacío elimina el oxígeno y detiene el crecimiento bacteriano. Convierte las mermas diarias en ganancias reales desde el primer mes de uso.",
  },
  {
    icon: Zap,
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Sellado en Segundos",
    desc: "Ciclos de 15 a 20 segundos en empacadoras de cámara. Bandas continuas a 12 m/min. Volumen industrial sin sacrificar calidad de sellado.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export default function EmpaqueTrust() {
  return (
    <section className="py-20 md:py-28 bg-bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-3xl md:text-4xl relative inline-block"
          >
            La ciencia detrás del ahorro
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#4ab84c] rounded-full" />
          </motion.h2>
        </div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.03)" }}
                />

                {/* Icon box */}
                <div
                  className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${f.color}`}
                >
                  <Icon size={28} className={f.iconColor} />
                </div>

                <h3 className="font-display font-bold text-xl mb-3 text-white">
                  {f.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-white/50 text-sm">
            ¿No sabes qué sistema de empaque necesitas?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#4ab84c] font-bold text-sm hover:text-white transition-colors underline underline-offset-4"
          >
            Habla con un especialista →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
