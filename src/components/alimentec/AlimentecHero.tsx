"use client";

import { CalendarCheck, TrendingUp } from "lucide-react";
import StandHero from "@/components/StandHero";
import { FAIR } from "@/content/alimentec";

/**
 * Hero de la landing /alimentec — mismo diseño que el hero de inicio (StandHero)
 * con la foto del stand, conservando el copy y los CTAs propios de esta página
 * (apartar visita / calcular, que enlazan a sus secciones).
 */
export default function AlimentecHero() {
  return (
    <StandHero
      image="/images/alimentec-stand-hero.webp"
      alt="Stand de Fuller Machinery en Alimentec 2026 — equipos para la industria alimentaria en Corferias"
      objectPosition="object-[center_35%]"
      badge={{ text: `${FAIR.name} · Te esperamos` }}
      title={
        <>
          El origen de tu negocio
          <br />
          <span className="text-gradient-accent">empieza en nuestro stand</span>
        </>
      }
      subtitle={
        <>
          Ven a {FAIR.venue} y calcula, con tus propios números, cuánto puede
          rendir tu equipo. Variedad, stock y servicio técnico propio en un solo
          lugar.
        </>
      }
      actions={
        <>
          <a
            href="#cotizar"
            data-zocam-event="alimentec-hero-visita"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-secondary/30"
          >
            <CalendarCheck size={18} />
            Aparta tu visita
          </a>
          <a
            href="#calculadora"
            data-zocam-event="alimentec-hero-calcular"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] backdrop-blur-sm"
          >
            <TrendingUp size={18} className="text-accent" />
            Calcula tu negocio
          </a>
        </>
      }
    />
  );
}
