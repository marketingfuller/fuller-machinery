"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const bullets = [
  {
    icon: Clock,
    title: "Día 3 sin empaque",
    desc: "Oxidación visible, cambio de color y olor. Producto no vendible.",
    bad: true,
  },
  {
    icon: Clock,
    title: "Día 21 con vacío Fuller",
    desc: "Color, textura y sabor intactos. Cero merma, cero reclamos.",
    bad: false,
  },
];

export default function AhorroBanner() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
          {/* LEFT — comparison visual */}
          <div className="lg:w-1/2 relative min-h-[380px] overflow-hidden">
            {/* Split: grayscale vs color */}
            <div className="absolute inset-0 grid grid-cols-2 h-full">
              {/* Without packaging — grayscale */}
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white/80 font-bold text-sm uppercase tracking-widest border border-white/40 px-3 py-1.5 backdrop-blur-sm">
                    Sin Empaque
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-secondary/90 text-white p-3 text-center">
                  <span className="block text-[10px] uppercase font-bold mb-0.5 tracking-wider">
                    Día 3
                  </span>
                  <span className="font-display font-bold text-sm">
                    Oxidación y Merma
                  </span>
                </div>
              </div>

              {/* With Fuller — full color */}
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent flex items-center justify-center">
                  <span className="text-white font-bold text-sm uppercase tracking-widest border-2 border-accent px-3 py-1.5 bg-accent/10 backdrop-blur-md">
                    Sellado Fuller
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-bg-dark/90 text-white p-3 text-center">
                  <span className="block text-[10px] uppercase font-bold mb-0.5 text-accent tracking-wider">
                    Día 21
                  </span>
                  <span className="font-display font-bold text-sm">
                    Fresco e Intacto
                  </span>
                </div>
              </div>

              {/* Divider line */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/60 -translate-x-1/2 z-10" />
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-[#4ab84c] font-bold uppercase tracking-widest text-xs block mb-4">
                La Ciencia del Ahorro
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                Deja de tirar{" "}
                <span className="text-secondary">dinero a la basura.</span>
              </h2>

              <div className="flex items-start gap-4 mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-5xl font-black text-primary font-display leading-none shrink-0">
                  30%
                </p>
                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                  de los costos operativos en una cocina profesional provienen
                  del desperdicio por mala conservación.
                </p>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Nuestras soluciones de vacío eliminan el oxígeno, deteniendo el
                crecimiento bacteriano y la oxidación. Convierte las mermas en
                ganancias desde el primer mes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#productos"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25"
                >
                  Ver Equipos de Vacío
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  Hablar con un Experto
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
