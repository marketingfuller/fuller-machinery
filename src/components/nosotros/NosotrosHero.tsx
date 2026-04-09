"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "30+", label: "Años de experiencia" },
  { value: "15k+", label: "Clientes equipados" },
  { value: "6", label: "Líneas de negocio" },
  { value: "5k+", label: "Repuestos en stock" },
];

export default function NosotrosHero() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* BG */}
      <div className="relative h-[480px] md:h-[560px]">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=800&fit=crop&q=80"
          alt="Instalaciones Fuller Machinery"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-bg-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
        {/* Dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[14px]">groups</span>
              Desde 1995
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Más que Máquinas,
              <br />
              <span className="text-accent">Somos Socios de tu Crecimiento</span>
            </h1>
            <p className="text-white/65 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Equipando el sueño de miles de emprendedores gastronómicos desde
              1995.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
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
