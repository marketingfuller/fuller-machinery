"use client";

import { motion } from "framer-motion";

export default function GarantiaSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Badge visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative shrink-0"
          >
            <div className="size-44 rounded-full border-4 border-primary flex items-center justify-center bg-white shadow-2xl relative z-10">
              <div className="text-center">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-0.5">
                  Garantía
                </p>
                <p className="font-display font-black text-5xl text-primary leading-none">
                  12
                </p>
                <p className="text-primary text-sm font-bold uppercase tracking-wide">
                  Meses
                </p>
                <p className="text-primary/50 text-[10px] uppercase tracking-widest mt-0.5">
                  Fuller
                </p>
              </div>
            </div>
            {/* Offset shadow ring */}
            <div className="absolute inset-0 bg-accent/20 rounded-full translate-x-3 translate-y-3 -z-0" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">
              Garantía Real, Sin Letra Pequeña
            </p>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-5 leading-tight">
              Tu inversión está protegida
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Todos nuestros equipos cuentan con una{" "}
              <strong className="text-slate-900">
                cobertura total de 12 meses
              </strong>{" "}
              en motor y estructura. Sin intermediarios, sin burocracia y sin
              costos ocultos.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Si algo falla por defecto de fábrica, nosotros lo reparamos o lo
              cambiamos. Así de simple.
            </p>
            <a
              href="#contacto-soporte"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wide transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[16px]">
                verified_user
              </span>
              Activar mi garantía
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
