"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { FAIR, isFairWindowOpen } from "@/content/alimentec";

/**
 * Banner "estamos en la feria" para la home.
 * - Imagen editable en /public/images/alimentec-banner.webp (recomendado 2400x800).
 * - Toda la tarjeta enlaza a /alimentec; además hay un botón explícito.
 * - Auto-gate: se oculta solo fuera de la ventana de feria (ver isFairWindowOpen()).
 *   Empieza visible para no romper hidratación durante la feria; si ya terminó,
 *   el efecto lo retira en el cliente.
 */
export default function FairBanner() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isFairWindowOpen()) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <section className="bg-bg-dark px-4 pt-24 pb-8 sm:pt-28">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/alimentec"
          data-zocam-event="banner-alimentec-home"
          className="group block overflow-hidden rounded-2xl border border-accent/30 shadow-xl shadow-black/30 ring-1 ring-white/5 transition-shadow hover:shadow-accent/20"
        >
          {/* Gráfica de la feria (reemplazable) */}
          <div className="relative w-full h-40 sm:h-52 lg:h-64">
            <Image
              src="/images/alimentec-banner.webp"
              alt="Fuller Machinery en Alimentec 2026 — Pabellón 4, Stand 415A, Corferias"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Barra inferior con datos + CTA (siempre legible, sin tocar la imagen) */}
          <div className="flex flex-col gap-3 bg-gradient-to-r from-bg-dark to-primary-dark px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/90">
              <span className="inline-flex items-center gap-2 font-semibold text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                ¡Estamos en {FAIR.name}!
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/80">
                <MapPin size={15} className="text-accent" />
                {FAIR.pavilion} · {FAIR.stand} · {FAIR.venue}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/80">
                <CalendarDays size={15} className="text-accent" />
                {FAIR.datesLabel}
              </span>
            </div>

            <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-bg-dark transition-all duration-200 group-hover:bg-accent-dark group-hover:text-white">
              Visítanos en la feria
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
