"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Store, CalendarDays } from "lucide-react";
import { FAIR } from "@/content/alimentec";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const chips = [
  { icon: Store, label: `${FAIR.pavilion} · ${FAIR.stand}` },
  { icon: MapPin, label: `${FAIR.venue} · ${FAIR.city}` },
  { icon: CalendarDays, label: FAIR.datesLabel },
];

type Props = {
  /** Ruta de la foto de fondo (en /public). */
  image: string;
  alt: string;
  /** Clase de object-position para encuadrar la foto (ej. "object-[center_28%]"). */
  objectPosition?: string;
  /** Píldora superior: en vivo (rojo + punto pulsante) o "te esperamos" (verde). */
  badge: { text: string; live?: boolean };
  /** Titular (permite <br/> y <span className="text-gradient-accent">). */
  title: ReactNode;
  subtitle: ReactNode;
  /** Botonera (CTAs) — varía por página. */
  actions: ReactNode;
};

/**
 * Hero full-bleed de feria con foto del stand de fondo. Diseño compartido entre
 * el hero de inicio (FairHero) y la landing /alimentec (AlimentecHero): foto +
 * overlays, badge, titular grande, chips de ubicación y CTAs en la base-izquierda.
 */
export default function StandHero({
  image,
  alt,
  objectPosition = "object-[center_28%]",
  badge,
  title,
  subtitle,
  actions,
}: Props) {
  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-screen flex items-end overflow-hidden bg-bg-dark">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${objectPosition}`}
      />

      {/* Overlays para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/55 to-bg-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/80 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16 sm:pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-[0.18em] mb-6 backdrop-blur-sm shadow-lg shadow-black/30 ${
            badge.live
              ? "bg-secondary/90 text-white"
              : "bg-accent/15 border border-accent/30 text-accent"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {badge.live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                badge.live ? "bg-white" : "bg-accent"
              }`}
            />
          </span>
          {badge.text}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight drop-shadow-xl max-w-3xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="mt-5 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed drop-shadow"
        >
          {subtitle}
        </motion.p>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          {actions}
        </motion.div>
      </div>
    </section>
  );
}
