"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Qué voltaje utilizan las máquinas?",
    a: "La mayoría de nuestros equipos de snacks operan a 110V/60Hz, el estándar doméstico en América. Equipos de mayor capacidad pueden requerir 220V. Verifica la ficha técnica de cada producto — nuestro equipo técnico también puede orientarte antes de la compra.",
  },
  {
    q: "¿Cuentan con garantía y repuestos?",
    a: "Sí. Todos los equipos Fuller Machinery incluyen 1 año de garantía por defectos de fábrica. Mantenemos stock permanente de resistencias, termostatos y piezas de desgaste para envío inmediato a cualquier parte del país.",
  },
  {
    q: "¿Ofrecen capacitación de uso?",
    a: "Al comprar cualquier equipo recibes acceso a nuestra biblioteca de videos tutoriales exclusivos: instalación, puesta en marcha, recetas de alto margen y mantenimiento preventivo para maximizar la vida útil del equipo.",
  },
  {
    q: "¿Realizan envíos internacionales?",
    a: "Sí, enviamos a todo el continente americano. Los tiempos de tránsito varían según el país, generalmente entre 5 y 10 días hábiles para entregas estándar. Todos los envíos salen asegurados.",
  },
];

export default function SnacksFAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-3">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">
            Resolvemos tus dudas
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="group bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-display font-bold text-slate-800 text-base select-none">
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-300 shrink-0 text-xl">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-4">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">¿Tienes una pregunta que no aparece aquí?</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
