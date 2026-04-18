"use client";

import { motion } from "framer-motion";
import { Target, Telescope } from "lucide-react";

export default function NosotrosManifiesto() {
  return (
    <section className="relative py-20 md:py-24 bg-bg-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-2">
            A dónde vamos
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white">
            Misión y Visión
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/8 transition-all"
          >
            <div className="size-14 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-6">
              <Target size={26} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">
              Misión
            </h3>
            <p className="text-white/70 leading-relaxed">
              Brindar soluciones en maquinaria, equipos y accesorios para la
              preparación de alimentos, integrando tecnología de calidad y
              tendencias actuales, con el objetivo de optimizar la operación de
              nuestros clientes y contribuir al crecimiento de sus negocios,
              garantizando siempre su satisfacción.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/8 transition-all"
          >
            <div className="size-14 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center mb-6">
              <Telescope size={26} className="text-secondary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">
              Visión
            </h3>
            <p className="text-white/70 leading-relaxed">
              Para el año 2030, ser una de las empresas líderes en Colombia en
              maquinaria para alimentos, con presencia a nivel nacional y
              proyección regional, reconocidos por ofrecer soluciones que
              realmente mejoran la operación y rentabilidad de nuestros
              clientes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
