"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ServicioHero() {
  return (
    <section className="relative flex flex-col lg:flex-row min-h-[640px] overflow-hidden">
      {/* Red top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-20" />

      {/* Image side — 3/5 */}
      <div className="relative lg:w-3/5 h-72 lg:h-auto">
        <Image
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1400&h=900&fit=crop&q=80"
          alt="Técnico especializado reparando maquinaria industrial de alimentos"
          fill
          className="object-cover"
          priority
        />
        {/* Desktop: fade to dark panel on right */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-dark" />
        {/* Mobile: fade to dark at bottom */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-bg-dark/70 to-transparent" />
      </div>

      {/* Content side — 2/5 */}
      <div className="relative lg:w-2/5 bg-bg-dark flex items-center py-16 px-8 lg:px-12">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
            <span className="material-symbols-outlined text-[14px]">engineering</span>
            Soporte Especializado
          </div>

          <h1 className="font-display font-black text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
            Tu Producción No Puede{" "}
            <span className="text-accent">Detenerse.</span>
            <br />
            Nosotros Tampoco.
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            Soporte técnico especializado, stock de repuestos originales y una
            red de expertos listos para proteger tu inversión cuando más lo
            necesites.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-accent font-black text-3xl font-display">24h</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Respuesta</p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display">5k+</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Repuestos</p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display">12m</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Garantía</p>
            </div>
          </div>

          <a
            href="#contacto-soporte"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Solicitar Asistencia Técnica
          </a>
        </motion.div>
      </div>
    </section>
  );
}
