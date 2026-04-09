"use client";

import { motion } from "framer-motion";
import { Headset, CalendarCheck, ShieldCheck, Clock, Wrench, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "573228534925";

export default function TechnicalAuthority() {
  return (
    <section id="servicio" className="bg-bg-light py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/servicio tecnico inicio.png')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 lg:right-8 bg-white rounded-2xl p-5 shadow-xl shadow-black/10 border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MessageCircle size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-primary font-bold text-lg">WhatsApp</p>
                  <p className="text-gray-500 text-xs">Soporte Rápido</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 w-20 h-20 grid grid-cols-4 gap-1.5 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />
              ))}
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <Wrench size={14} />
              Respaldo Total
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight mb-6">
              Soporte Especializado.{" "}
              <span className="text-primary/60">No te dejamos solo.</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Sabemos que una máquina parada es dinero perdido. Contamos con repuestos originales y técnicos certificados listos para resolver cualquier situación en el menor tiempo posible.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-10">
              {[
                { icon: ShieldCheck, text: "Repuestos originales con garantía de fábrica" },
                { icon: Wrench, text: "Técnicos certificados en todas las líneas" },
                { icon: Clock, text: "Tiempos de respuesta menores a 24 horas" },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <feat.icon size={20} className="text-primary" />
                  </div>
                  <p className="text-gray-700 text-sm font-medium">{feat.text}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera agendar un mantenimiento para mi equipo Fuller Machinery.")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-7 py-4 rounded-full transition-colors duration-300 shadow-lg shadow-primary/20"
              >
                <CalendarCheck size={18} />
                Agendar Mantenimiento
              </motion.a>
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, tengo una consulta sobre mi equipo Fuller Machinery. ¿Pueden ayudarme?")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary/20 hover:border-primary text-primary font-bold text-sm px-7 py-4 rounded-full transition-all duration-300"
              >
                <Headset size={18} />
                Línea de Ayuda
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
