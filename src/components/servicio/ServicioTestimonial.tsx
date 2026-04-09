"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

export default function ServicioTestimonial() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start overflow-hidden"
        >
          {/* Left accent bar */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl" />

          {/* Avatar */}
          <div className="shrink-0 flex justify-center md:justify-start">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
                  alt="Carlos Mendoza — La Pizzería del Barrio"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full">
                <span className="material-symbols-outlined text-[16px]">
                  format_quote
                </span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="flex-1">
            <div className="flex gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <blockquote className="font-display font-bold text-lg md:text-xl text-slate-800 italic leading-relaxed mb-5">
              "Se nos rompió la amasadora un sábado a las 6 PM, plena hora pico.
              Pensé que estábamos perdidos. Llamé a Fuller y en 30 minutos me
              guiaron por videollamada para solucionar un bloqueo de seguridad.
              Salvamos la noche."
            </blockquote>
            <div>
              <p className="font-bold text-slate-900 text-sm">Carlos Mendoza</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Propietario — La Pizzería del Barrio
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
