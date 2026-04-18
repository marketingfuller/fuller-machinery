"use client";

import { motion } from "framer-motion";
import { Package, ArrowRight, BadgeCheck } from "lucide-react";

export default function EmpaqueHero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[640px] w-full bg-slate-950">
      {/* LEFT — full-bleed packaging image */}
      <div className="relative lg:w-3/5 min-h-[420px] lg:min-h-0 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('/images/empaque/Hero empaques.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-slate-950/90" />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
            <BadgeCheck size={16} className="text-accent" />
            <span className="text-white text-sm font-semibold">
              Acero inoxidable — Sellado hermético
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — dark content panel */}
      <div className="relative lg:w-2/5 bg-bg-dark text-white p-8 lg:p-14 xl:p-16 flex flex-col justify-center overflow-hidden">
        {/* Purple top accent stripe for empaque */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#4ab84c]" />

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
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Package size={18} className="text-[#4ab84c]" />
            <span className="text-[#4ab84c] text-sm font-bold uppercase tracking-widest">
              Empaque y Automatización
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-5xl leading-[1.1] mb-6"
          >
            Detén el Tiempo,{" "}
            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              Alarga la Vida de tus Alimentos
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/65 text-lg leading-relaxed mb-10 max-w-md"
          >
            Sistemas de empaque al vacío y sellado continuo que eliminan el
            oxígeno, reducen el desperdicio y elevan la presentación de tu
            marca.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://tienda.fullermachinery.com/index.php/categoria-producto/equipos-de-empaque/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              Ver Catálogo de Empaque
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
                150<span className="text-lg">/min</span>
              </p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">
                Sellos por minuto
              </p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display tracking-tight">
                16
              </p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">
                Modelos en catálogo
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
