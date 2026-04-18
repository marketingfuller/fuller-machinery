"use client";

import { motion } from "framer-motion";
import { Wrench, Video, GraduationCap } from "lucide-react";
import { cn } from "@/lib/cn";

const WHATSAPP_BASE = "https://wa.me/573228534925?text=";

const services = [
  {
    icon: Wrench,
    accentText: "text-accent",
    accentBg: "bg-accent/10 border-accent/30",
    title: "Reparación en sede (Bogotá)",
    desc: "Diagnóstico y reparación en nuestras instalaciones de Bogotá. Recibes tu equipo revisado, con repuestos originales instalados y prueba de funcionamiento.",
    cta: "Agendar revisión",
    whatsapp:
      WHATSAPP_BASE +
      encodeURIComponent(
        "Hola, necesito llevar mi equipo Fuller a servicio técnico en Bogotá. ¿Me indican proceso y cita?"
      ),
  },
  {
    icon: Video,
    accentText: "text-secondary",
    accentBg: "bg-secondary/10 border-secondary/30",
    title: "Soporte remoto nacional",
    desc: "Si estás fuera de Bogotá te acompañamos por WhatsApp y videollamada para diagnosticar la falla, enviarte el repuesto y guiarte en la reparación.",
    cta: "Solicitar soporte",
    whatsapp:
      WHATSAPP_BASE +
      encodeURIComponent(
        "Hola, estoy fuera de Bogotá y necesito soporte técnico remoto para mi equipo Fuller"
      ),
  },
  {
    icon: GraduationCap,
    accentText: "text-accent",
    accentBg: "bg-accent/10 border-accent/30",
    title: "Capacitación de operación",
    desc: "Entrenamos a tu equipo para operar la máquina correctamente: presencial en Bogotá al momento de la entrega, o remota por videollamada para el resto del país.",
    cta: "Agendar capacitación",
    whatsapp:
      WHATSAPP_BASE +
      encodeURIComponent(
        "Hola, necesito capacitación para operar mi equipo Fuller. ¿Me indican opciones presencial en Bogotá o remota?"
      ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export default function ServicioServices() {
  return (
    <section className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Nuestros servicios
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
            Lo que sí hacemos
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">
            Tres modalidades claras. Sin promesas de visita a otras ciudades —
            lo presencial se atiende en Bogotá y el resto se cubre con soporte
            remoto efectivo.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 hover:border-transparent transition-all duration-300 flex flex-col"
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center mb-6 border ${s.accentBg}`}
                >
                  <Icon size={26} className={s.accentText} />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                  {s.desc}
                </p>
                <a
                  href={s.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 font-bold text-sm transition-all group-hover:gap-2.5",
                    s.accentText
                  )}
                >
                  {s.cta}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
