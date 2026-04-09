"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Thermometer, Droplets } from "lucide-react";

export default function TropicalizadoBanner() {
  return (
    <section className="bg-bg-dark text-white py-16 relative overflow-hidden">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Shield icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex p-4 bg-white/10 rounded-full border-2 border-accent mb-6"
        >
          <ShieldCheck size={40} className="text-accent" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-3xl md:text-5xl mb-6 leading-tight"
        >
          Diseñadas para el Trópico
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Todos nuestros equipos cuentan con certificación{" "}
          <strong className="text-accent font-bold">
            Tropicalizado / Heavy Duty
          </strong>
          , garantizando un rendimiento óptimo hasta con 35°C de temperatura
          ambiente y altos niveles de humedad.
        </motion.p>

        {/* Spec badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="bg-white/5 border border-white/20 px-6 py-3 rounded-lg flex items-center gap-2">
            <Thermometer size={20} className="text-accent" />
            <span className="font-semibold text-sm">Hasta 35°C Ambiente</span>
          </div>
          <div className="bg-white/5 border border-white/20 px-6 py-3 rounded-lg flex items-center gap-2">
            <Droplets size={20} className="text-accent" />
            <span className="font-semibold text-sm">65% Humedad Relativa</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
