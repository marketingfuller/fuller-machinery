"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/573228534925?text=Hola%2C%20necesito%20soporte%20t%C3%A9cnico%20para%20mi%20equipo%20Fuller";

export default function ServicioHero() {
  return (
    <section className="relative flex flex-col lg:flex-row min-h-[640px] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary z-20" />

      <div className="relative lg:w-3/5 h-72 lg:h-auto bg-slate-100">
        <Image
          src="/images/servicio tecnico/hero-servicio-tecnico.webp"
          alt="Servicio técnico Fuller Machinery — soporte presencial en Bogotá y remoto a nivel nacional"
          fill
          className="object-cover"
          priority
        />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-dark" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-bg-dark/70 to-transparent" />
      </div>

      <div className="relative lg:w-2/5 bg-bg-dark flex items-center py-16 px-8 lg:px-12">
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
            Soporte Fuller
          </div>

          <h1 className="font-display font-black text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
            Cuando tu equipo se para,{" "}
            <span className="text-accent">respondemos.</span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            Servicio técnico presencial en Bogotá y soporte remoto a nivel nacional
            por WhatsApp y videollamada. Repuestos originales Fuller y garantía de
            6 meses a 1 año según el equipo.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-accent font-black text-3xl font-display">6–12m</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Garantía</p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display">Bogotá</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Presencial</p>
            </div>
            <div>
              <p className="text-accent font-black text-3xl font-display">Remoto</p>
              <p className="text-white/45 text-xs mt-1 uppercase tracking-wide">Nacional</p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Hablar con servicio técnico
          </a>
        </motion.div>
      </div>
    </section>
  );
}
