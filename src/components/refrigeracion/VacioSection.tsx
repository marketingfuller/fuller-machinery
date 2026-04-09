"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VacioSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-slate-900 to-bg-dark rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden relative"
        >
          {/* Decorative red radial glow */}
          <div
            className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(211,47,47,0.6), transparent, transparent)",
            }}
          />

          {/* LEFT content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:w-1/2 relative z-10"
          >
            <p className="text-secondary uppercase tracking-widest text-sm font-bold mb-4">
              Optimiza tu Cadena de Frío
            </p>

            <h2 className="font-display font-black text-3xl md:text-4xl leading-tight mb-5">
              Empaca al vacío para{" "}
              <span className="text-accent">duplicar la vida útil</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Elimina la quemadura por frío y previene la contaminación cruzada.
              El empaque al vacío es el complemento perfecto de cualquier sistema
              de refrigeración profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-secondary/30"
              >
                Ver Empacadoras
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/30 hover:bg-white/10 text-white font-bold rounded-xl transition-colors duration-200"
              >
                Leer Guía de Conservación
              </a>
            </div>
          </motion.div>

          {/* RIGHT image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="md:w-1/2 relative z-10 flex justify-center"
          >
            <div className="relative">
              {/* Animated glow behind image */}
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse" />
              <Image
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=700&h=500&fit=crop&q=80"
                alt="Empacadora al vacío"
                width={700}
                height={500}
                className="relative rounded-xl shadow-2xl border-4 border-white/10 w-full max-w-md object-cover transform rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
