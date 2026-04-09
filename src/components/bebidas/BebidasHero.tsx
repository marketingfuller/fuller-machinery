"use client";

import { motion } from "framer-motion";
import { Droplets, ArrowRight } from "lucide-react";

export default function BebidasHero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[640px] w-full bg-slate-950">
      {/* LEFT — split dual image (slushie top / coffee bottom) */}
      <div className="relative lg:w-3/5 min-h-[420px] lg:min-h-0 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: "url('/images/bebidas y cafe/Hero bebidas y cafe.webp')" }}
        />
        {/* Divider blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-slate-950/80" />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
            <Droplets size={16} className="text-accent animate-pulse" />
            <span className="text-white text-sm font-semibold">
              El negocio más fácil y rentable
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — dark content panel */}
      <div className="relative lg:w-2/5 bg-bg-dark text-white p-8 lg:p-14 xl:p-16 flex flex-col justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Droplets size={18} className="text-accent" />
            <span className="text-accent text-sm font-bold uppercase tracking-widest">
              Bebidas & Café
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-5xl leading-[1.1] mb-6"
          >
            El Margen Más Alto Está en las{" "}
            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              Bebidas
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/65 text-lg leading-relaxed mb-10 max-w-md"
          >
            Granizadoras, cafeteras espresso y selladoras de bubble tea que convierten
            agua, hielo y jarabe en rentabilidad pura desde el primer día.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#productos"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              Ver Catálogo de Bebidas
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 gap-6 border-t border-white/10 mt-12 pt-8"
          >
            <div>
              <p className="text-accent font-black text-3xl font-display tracking-tight">500%</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">Margen de Ganancia</p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display tracking-tight">24/7</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">Operación Continua</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
