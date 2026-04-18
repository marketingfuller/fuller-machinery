"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "+15", label: "Años en el mercado" },
  { value: "+500", label: "Negocios equipados" },
  { value: "3", label: "Sedes en Bogotá" },
  { value: "6", label: "Líneas de negocio" },
];

export default function NosotrosHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-bg-dark">
      <div className="relative h-[460px] md:h-[540px]">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[14px]">
                groups
              </span>
              Fuller Machinery Ltda · Desde 2008
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Equipamos el crecimiento
              <br />
              <span className="text-accent">de +500 negocios en Colombia</span>
            </h1>
            <p className="text-white/65 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Más de 15 años especializados en maquinaria, equipos y accesorios
              para la preparación de alimentos, con tres sedes en Bogotá y
              alcance nacional.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-bg-dark border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10"
          >
            {stats.map((s, i) => (
              <div key={i} className="py-6 px-6 text-center">
                <p className="font-display font-black text-2xl md:text-3xl text-accent">
                  {s.value}
                </p>
                <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
