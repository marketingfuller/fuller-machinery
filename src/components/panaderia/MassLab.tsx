"use client";

import { motion } from "framer-motion";
import { ThermometerSun, Wind, Layers } from "lucide-react";
import { useWhatsApp } from "@/components/SettingsProvider";

const problems = [
  {
    LucideIcon: ThermometerSun,
    iconBoxClass: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    problem: "Sobrecalentamiento",
    problemDesc: "Las amasadoras comunes calientan la masa por fricción, matando la levadura prematuramente.",
    solution: "Amasado con bowl de acero inoxidable de alta resistencia que protege la fermentación.",
  },
  {
    LucideIcon: Wind,
    iconBoxClass: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    problem: "Cocción Irregular",
    problemDesc: "Puntos calientes en el horno resultan en panes quemados de un lado y crudos del otro.",
    solution: "Flujo de aire ciclónico 360° para un dorado perfectamente uniforme.",
  },
  {
    LucideIcon: Layers,
    iconBoxClass: "bg-blue-400/15 border-blue-400/30",
    iconColor: "text-blue-400",
    problem: "Vibración Excesiva",
    problemDesc: "Equipos inestables que se mueven por el taller y requieren mantenimiento constante.",
    solution: "Estructura monobloque antivibración de hierro fundido.",
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

export default function MassLab() {
  const { url: waUrl } = useWhatsApp(
    "commercial",
    "Hola, necesito orientación técnica para mi panadería",
  );
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
            Laboratorio de Masas Fuller
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded-full" />
          </motion.h2>
          <p className="text-white/50 text-sm mt-8 uppercase tracking-widest">
            Ingeniería aplicada al pan
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {problems.map((item, i) => {
            const Icon = item.LucideIcon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-300"
              >
                <div className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${item.iconBoxClass}`}>
                  <Icon size={28} className={item.iconColor} />
                </div>

                <span className="text-xs text-white/35 uppercase tracking-widest font-bold mb-1 block">Problema</span>
                <h3 className="font-display font-bold text-xl text-white mb-2">{item.problem}</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.problemDesc}</p>

                <div className="border-t border-white/10 pt-5 flex items-start gap-3">
                  <span className="material-symbols-outlined text-accent text-xl mt-0.5 shrink-0">check_circle</span>
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-wider block mb-1">Solución Fuller</span>
                    <p className="text-white/70 text-sm leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-white/50 text-sm">¿Necesitas orientación para tu panadería?</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:text-white transition-colors underline underline-offset-4"
          >
            Habla con un especialista →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
