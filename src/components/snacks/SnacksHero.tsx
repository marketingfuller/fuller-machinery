"use client";

import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";

export default function SnacksHero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[640px] w-full bg-slate-950">
      {/* LEFT — full-bleed food image */}
      <div className="relative lg:w-3/5 min-h-[420px] lg:min-h-0 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('/images/Snacks y fast food/Hero snacks.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-slate-950/90" />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
            <Flame size={16} className="text-accent" />
            <span className="text-white text-sm font-semibold">
              Crispeteras, algodoneras y asadores
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — dark content panel */}
      <div className="relative lg:w-2/5 bg-bg-dark text-white p-8 lg:p-14 xl:p-16 flex flex-col justify-center overflow-hidden">
        {/* Red top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />

        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="material-symbols-outlined text-[18px] text-accent">
              fastfood
            </span>
            <span className="text-accent text-sm font-bold uppercase tracking-widest">
              Comida Rápida & Alta Rentabilidad
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-5xl leading-[1.1] mb-6"
          >
            Pequeños Espacios,{" "}
            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              Grandes Ganancias
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/65 text-lg leading-relaxed mb-10 max-w-md"
          >
            Crispeteras, algodoneras y asadores de salchichas que generan ventas
            continuas en parques, centros comerciales y eventos. Sin cocina, sin
            chef, sin complicaciones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="https://tienda.fullermachinery.com/index.php/categoria-producto/comida-divertida/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              Ver Catálogo de Snacks
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 gap-6 border-t border-white/10 mt-12 pt-8"
          >
            <div>
              <p className="text-accent font-black text-3xl font-display tracking-tight">
                300%+
              </p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">
                Margen de Ganancia
              </p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display tracking-tight">
                $105k
              </p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">
                Precio de Entrada
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
