"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Store, CalendarDays, ArrowRight, Calculator } from "lucide-react";
import { FAIR, isFairWindowOpen } from "@/content/alimentec";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const chips = [
  { icon: Store, label: `${FAIR.pavilion} · ${FAIR.stand}` },
  { icon: MapPin, label: `${FAIR.venue} · ${FAIR.city}` },
  { icon: CalendarDays, label: FAIR.datesLabel },
];

/**
 * Hero de feria para la home — reemplaza el SplitHero SOLO durante Alimentec.
 * Foto real del stand a pantalla grande + overlay + CTA a /alimentec.
 * Se auto-oculta fuera de la ventana de feria (isFairWindowOpen): empieza
 * visible para no romper hidratación y, si ya terminó, se retira en el cliente
 * (el padre vuelve a mostrar el hero normal).
 */
export default function FairHero() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isFairWindowOpen()) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-screen flex items-end overflow-hidden bg-bg-dark">
      {/* Foto del stand */}
      <Image
        src="/images/alimentec-hero.webp"
        alt="Stand de Fuller Machinery en Alimentec 2026, Pabellón 4 Stand 415A, Corferias"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_28%]"
      />

      {/* Overlays para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/55 to-bg-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/80 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 bg-secondary/90 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-[0.18em] mb-6 backdrop-blur-sm shadow-lg shadow-black/30"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          En vivo · {FAIR.name}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight drop-shadow-xl max-w-3xl"
        >
          Estamos en{" "}
          <span className="text-gradient-accent">Alimentec 2026</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mt-5 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed drop-shadow"
        >
          Ven a nuestro stand en {FAIR.venue} hasta el 12 de junio. Calcula la
          rentabilidad de tu negocio con tus números y conoce los equipos en vivo.
        </motion.p>

        {/* Chips de ubicación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-7 flex flex-wrap items-center gap-2.5"
        >
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/90 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <chip.icon size={16} className="text-accent" />
              {chip.label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <Link
            href="/alimentec"
            data-zocam-event="fairhero-home-stand"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-secondary/30 group"
          >
            Conoce el stand
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/alimentec/calcular"
            data-zocam-event="fairhero-home-calcular"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] backdrop-blur-sm"
          >
            <Calculator size={18} className="text-accent" />
            Calcula tu ahorro
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
