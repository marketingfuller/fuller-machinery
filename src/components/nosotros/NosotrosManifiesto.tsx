"use client";

import { motion } from "framer-motion";

const values = [
  {
    icon: "handshake",
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Honestidad en la Asesoría",
    desc: "No vendemos la máquina más cara, vendemos la que tu negocio realmente necesita para crecer hoy.",
  },
  {
    icon: "verified_user",
    color: "bg-secondary/15 border-secondary/30",
    iconColor: "text-secondary",
    title: "Respaldo Post-Venta",
    desc: "La venta es solo el comienzo. Nuestra garantía incluye acompañamiento técnico real y humano.",
  },
  {
    icon: "factory",
    color: "bg-accent/15 border-accent/30",
    iconColor: "text-accent",
    title: "Calidad Industrial",
    desc: "Solo trabajamos con acero inoxidable grado alimenticio y componentes de uso rudo certificados.",
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
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export default function NosotrosManifiesto() {
  return (
    <section className="relative py-20 md:py-24 bg-bg-dark overflow-hidden">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-2">
            Manifiesto Fuller
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            En lo que creemos
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center flex flex-col items-center"
            >
              <div
                className={`size-16 rounded-xl flex items-center justify-center mb-6 border ${v.color}`}
              >
                <span
                  className={`material-symbols-outlined text-[28px] ${v.iconColor}`}
                >
                  {v.icon}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                {v.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
