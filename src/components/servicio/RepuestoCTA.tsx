"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Camera } from "lucide-react";

const checks = [
  "Identificación visual por expertos en minutos",
  "Cotización en menos de 2 horas hábiles",
  "Envío express el mismo día si hay stock",
];

export default function RepuestoCTA() {
  return (
    <section className="relative py-20 md:py-24 bg-bg-dark overflow-hidden">
      {/* Blueprint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <span className="material-symbols-outlined text-[14px]">
                extension
              </span>
              Repuestos Originales
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              ¿Buscas un repuesto específico?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl">
              No pierdas tiempo buscando códigos complicados. Envíanos una foto
              de la pieza o del equipo y nuestro equipo de ingeniería
              identificará exactamente lo que necesitas.
            </p>
            <ul className="flex flex-col gap-4">
              {checks.map((c, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — WhatsApp card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:w-2/5 w-full max-w-sm"
          >
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 text-center">
              <div className="size-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Camera size={28} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Método más rápido
              </h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Toma una foto de la pieza dañada y envíala por WhatsApp.
                Respuesta en minutos.
              </p>
              <a
                href="#"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbc5a] text-white font-bold py-4 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-green-900/30 text-sm uppercase tracking-wide"
              >
                <span className="material-symbols-outlined text-[18px]">
                  photo_camera
                </span>
                Cotizar Repuesto por Foto
              </a>
              <p className="text-white/30 text-xs mt-3">
                Lun–Sáb · 8am–8pm
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
