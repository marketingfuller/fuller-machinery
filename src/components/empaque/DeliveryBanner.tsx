"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DeliveryBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden flex flex-col lg:flex-row min-h-[340px]">
          {/* Image side */}
          <div className="lg:w-1/2 relative min-h-[260px] lg:min-h-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/empaque/Domicilio.webp')",
              }}
            />
            <div className="absolute inset-0 bg-bg-dark/60" />

            {/* Floating label */}
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="material-symbols-outlined text-accent text-[18px]">
                  delivery_dining
                </span>
                <span className="text-white text-sm font-semibold">
                  100% Hermético para Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:w-1/2 bg-slate-50 p-10 lg:p-14 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs mb-4">
                <span className="material-symbols-outlined text-[18px]">
                  delivery_dining
                </span>
                Garantía de Entrega
              </div>

              <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                Que tu Domicilio llegue{" "}
                <span className="text-primary">Impecable</span>
              </h2>

              <p className="text-slate-600 text-base mb-8 leading-relaxed">
                Evita derrames y reclamos. Nuestros equipos de sellado de vasos
                y bandejas aseguran que la experiencia de tu cliente en casa sea
                tan buena como en el restaurante.
              </p>

              <a
                href="https://tienda.fullermachinery.com/index.php/producto/selladora-de-vasos-full-automatica/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25"
              >
                Ver Selladora de Vasos
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
