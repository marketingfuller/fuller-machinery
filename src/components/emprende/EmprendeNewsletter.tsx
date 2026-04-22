"use client";

import { motion } from "framer-motion";
import { useWhatsApp } from "@/components/SettingsProvider";

export default function EmprendeNewsletter() {
  const { url: waUrl } = useWhatsApp(
    "commercial",
    "Hola, vi los artículos de Emprende y necesito asesoría para mi negocio",
  );
  return (
    <section className="relative bg-primary py-16 md:py-20 px-4 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-3 py-1 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-widest mb-5">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            Comunidad Fuller
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white mb-4 leading-tight">
            ¿Listo para arrancar tu negocio gastronómico?
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto mb-8">
            Escríbenos por WhatsApp y te ayudamos a escoger el equipo correcto según tu presupuesto y tipo de negocio.
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-green-600/30 text-sm uppercase tracking-wide"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
