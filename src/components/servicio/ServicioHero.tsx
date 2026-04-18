"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/573228534925?text=Hola%2C%20necesito%20soporte%20t%C3%A9cnico%20para%20mi%20equipo%20Fuller";

export default function ServicioHero() {
  return (
    <section className="relative bg-bg-dark overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-20" />

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <span className="material-symbols-outlined text-[14px]">
                engineering
              </span>
              Soporte Fuller
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl text-white leading-tight mb-5">
              Cuando tu equipo se para,{" "}
              <span className="text-accent">respondemos.</span>
            </h1>

            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-lg">
              Servicio técnico presencial en Bogotá y soporte remoto a nivel
              nacional por WhatsApp y videollamada. Repuestos originales Fuller
              y garantía directa de 6 meses a 1 año según el equipo.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10 max-w-md">
              <div>
                <p className="text-accent font-black text-2xl sm:text-3xl font-display">
                  6–12m
                </p>
                <p className="text-white/45 text-[11px] mt-1 uppercase tracking-wide">
                  Garantía
                </p>
              </div>
              <div>
                <p className="text-accent font-black text-2xl sm:text-3xl font-display">
                  Bogotá
                </p>
                <p className="text-white/45 text-[11px] mt-1 uppercase tracking-wide">
                  Presencial
                </p>
              </div>
              <div>
                <p className="text-accent font-black text-2xl sm:text-3xl font-display">
                  Remoto
                </p>
                <p className="text-white/45 text-[11px] mt-1 uppercase tracking-wide">
                  Nacional
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              <span className="material-symbols-outlined text-[18px]">
                chat
              </span>
              Hablar con servicio técnico
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-square w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <Image
                src="/images/Servicio tecnico/hero-servicio-tecnico.webp"
                alt="Técnico Fuller reparando una granizadora en el área de mantenimiento técnico"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 max-w-[220px]">
              <div className="size-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-[20px]">
                  verified
                </span>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm leading-tight">
                  Técnicos Fuller
                </p>
                <p className="text-slate-500 text-[11px] leading-tight mt-0.5">
                  Propios, no tercerizados
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
