"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, MapPin } from "lucide-react";
import StandHero from "@/components/StandHero";
import { FAIR, isFairWindowOpen } from "@/content/alimentec";

/**
 * Hero de feria para la home — reemplaza el SplitHero SOLO durante Alimentec.
 * Usa el diseño compartido StandHero con la foto del stand. Se auto-oculta fuera
 * de la ventana de feria (el padre HomeHero vuelve a mostrar el hero normal).
 */
export default function FairHero() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isFairWindowOpen()) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <StandHero
      image="/images/alimentec-hero.webp"
      alt="Stand de Fuller Machinery en Alimentec 2026, Pabellón 4 Stand 415A, Corferias"
      objectPosition="object-[center_28%]"
      badge={{ text: `En vivo · ${FAIR.name}`, live: true }}
      title={
        <>
          Estamos en <span className="text-gradient-accent">Alimentec 2026</span>
        </>
      }
      subtitle={
        <>
          Ven a nuestro stand en {FAIR.venue} hasta el 12 de junio. Calcula la
          rentabilidad de tu negocio con tus números y conoce los equipos en vivo.
        </>
      }
      actions={
        <>
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
          <a
            href={FAIR.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-zocam-event="fairhero-home-comollegar"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.03] backdrop-blur-sm"
          >
            <MapPin size={18} className="text-accent" />
            Cómo llegar a Corferias
          </a>
        </>
      }
    />
  );
}
