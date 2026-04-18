"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function EmprendeHero() {
  return (
    <section className="relative bg-bg-dark overflow-hidden py-16 md:py-24 px-4">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="material-symbols-outlined text-[15px]">school</span>
          Academia Fuller Machinery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5 tracking-tight"
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
          className="text-white/60 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Guías, análisis de mercado y datos reales para emprendedores gastronómicos en Colombia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#articulos"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 w-full sm:w-auto"
          >
            Ver artículos
            <ArrowDown size={16} />
          </a>
          <a
            href="https://wa.me/573244247198?text=Hola%2C%20necesito%20asesor%C3%ADa%20para%20mi%20negocio%20gastron%C3%B3mico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wide transition-all w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            Asesoría por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
