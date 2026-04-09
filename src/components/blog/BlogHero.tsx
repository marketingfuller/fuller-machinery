"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const trending = ["#Granizados", "#PanaderíaArtesanal", "#MantenimientoPreventivo", "#BubbleWaffles"];

export default function BlogHero() {
  return (
    <section className="relative bg-bg-dark overflow-hidden py-24 px-4">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Bottom fade into white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-7"
        >
          <span className="material-symbols-outlined text-[15px]">school</span>
          Academia Fuller Machinery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5 tracking-tight"
        >
          Aprende a Construir un{" "}
          <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
            Negocio Rentable
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Guías técnicas, análisis de mercado y consejos de expertos para
          proteger tu inversión y maximizar tus ganancias.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="¿Qué quieres aprender? Ej: cómo limpiar mi amasadora..."
            className="w-full pl-14 pr-16 py-5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-xl"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </motion.div>

        {/* Trending tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          <span className="text-white/40 text-xs font-medium self-center">Tendencias:</span>
          {trending.map((tag) => (
            <a
              key={tag}
              href="#"
              className="text-xs font-bold text-accent hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-1 rounded-full transition-all"
            >
              {tag}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
