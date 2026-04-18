"use client";

import { motion } from "framer-motion";
import { Thermometer, ArrowRight, Sparkles } from "lucide-react";

export default function RefrigeraciónHero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-[600px] w-full bg-slate-900">
      {/* LEFT side — background image */}
      <div className="relative lg:w-3/5 min-h-[400px] lg:min-h-0 overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=1200&h=900&fit=crop&q=80')",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        {/* Floating badge bottom-left */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20">
            <Sparkles size={16} className="text-accent" />
            <span className="text-white text-sm font-semibold">
              Iluminación LED de alto contraste
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT side — content */}
      <div className="relative lg:w-2/5 bg-bg-dark text-white p-8 lg:p-16 flex flex-col justify-center overflow-hidden">
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-center">
          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Thermometer size={18} className="text-accent" />
            <span className="text-accent text-sm font-bold uppercase tracking-wider">
              Control Preciso de Temperatura
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-5xl leading-tight mb-6"
          >
            Frío Inteligente:{" "}
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Protege tu Inventario y Exhibe Mejor
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 text-lg leading-relaxed mb-10"
          >
            Congeladores No Frost de hasta 538 L, fabricadoras de hielo de 30 a 90 kg/24h
            y botelleros mini bar. Refrigerante R290 ecológico en toda la línea.
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="https://tienda.fullermachinery.com/?s=refrigerador&post_type=product&product_cat=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm uppercase tracking-wide"
            >
              VER NEVERAS Y CONGELADORES
              <ArrowRight size={18} />
            </a>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 gap-6 border-t border-white/10 mt-12 pt-8"
          >
            <div>
              <p className="text-accent font-bold text-3xl font-display">
                90kg<span className="text-lg">/24h</span>
              </p>
              <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">
                Hielo máximo
              </p>
            </div>
            <div>
              <p className="text-accent font-bold text-3xl font-display">R290</p>
              <p className="text-white/50 text-xs mt-1 uppercase tracking-wider">
                Refrigerante ecológico
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
