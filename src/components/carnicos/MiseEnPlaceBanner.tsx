"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, ChefHat } from "lucide-react";

export default function MiseEnPlaceBanner() {
  return (
    <section className="py-16 md:py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[460px]"
        >
          {/* LEFT — image with overlay content */}
          <div className="relative w-full md:w-1/2 min-h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1547592180-85f173990554?w=900&h=700&fit=crop&q=80')",
              }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-bg-dark/70" />

            {/* Image-side label */}
            <div className="absolute top-8 left-8 z-10">
              <span className="inline-flex items-center gap-2 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <ChefHat size={12} />
                Soluciones para Restaurantes
              </span>
            </div>

            {/* Image-side headline */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <p className="text-accent font-bold uppercase text-xs tracking-widest mb-2">
                Ahorra hasta 3 horas diarias
              </p>
              <p className="text-white font-display font-black text-2xl leading-tight">
                Tus chefs deben crear,<br />no picar.
              </p>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="w-full md:w-1/2 p-10 md:p-14 xl:p-16 flex flex-col justify-center">
            <span className="text-secondary font-bold uppercase text-xs tracking-widest mb-3 block">
              Automatización de Cocina
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
              Automatiza el{" "}
              <span className="text-primary">Mise en Place</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
              Procesadores y peladoras que reducen horas de trabajo manual a
              minutos, garantizando cortes uniformes para una presentación
              impecable en cada servicio.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                { icon: Clock, text: "De 3 horas a 20 minutos de preparación" },
                { icon: ArrowRight, text: "Cortes uniformes en cada plato" },
                { icon: ArrowRight, text: "Reduce accidentes de corte hasta un 80%" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-3 bg-primary hover:bg-bg-dark text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide self-start"
            >
              Ver Ayudantes de Cocina
              <span className="material-symbols-outlined text-[18px]">
                kitchen
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
