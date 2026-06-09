"use client";

import { motion } from "framer-motion";
import { FAIR } from "@/content/alimentec";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const infoChips = [
  { icon: "apartment", label: FAIR.pavilion },
  { icon: "storefront", label: FAIR.stand },
  { icon: "location_on", label: `${FAIR.venue} · ${FAIR.city}` },
  { icon: "event", label: FAIR.datesLabel },
];

export default function AlimentecHero() {
  return (
    <section className="relative w-full min-h-[640px] bg-bg-dark flex items-center justify-center overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[460px] h-[460px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-32 pb-20 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-8 backdrop-blur-sm"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            celebration
          </span>
          {FAIR.name} · Te esperamos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-6 drop-shadow-lg leading-[1.05] tracking-tight"
        >
          El origen de tu negocio
          <br />
          <span className="text-gradient-accent">empieza en nuestro stand</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Ven a {FAIR.venue} y calcula, con tus propios números, cuánto puede
          rendir tu equipo. Variedad, stock y servicio técnico propio en un solo
          lugar.
        </motion.p>

        {/* Info chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {infoChips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/85 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <span
                className="material-symbols-outlined text-accent"
                style={{ fontSize: "16px" }}
              >
                {chip.icon}
              </span>
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <a
            href="#cotizar"
            data-zocam-event="alimentec-hero-visita"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-secondary/30"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              calendar_month
            </span>
            Aparta tu visita
          </a>
          <a
            href="#calculadora"
            data-zocam-event="alimentec-hero-calcular"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-full transition-all duration-200 hover:scale-[1.03]"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              trending_up
            </span>
            Calcula tu negocio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
