"use client";

import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";
import { useWhatsApp } from "@/components/SettingsProvider";

const faqs = [
  {
    q: "¿Qué ventajas tiene el gas ecológico R290 en sus equipos?",
    a: "El R290 es propano natural con potencial de calentamiento global casi nulo y sin daño a la capa de ozono. Permite una transferencia de calor más eficiente que los gases sintéticos — hasta 30% menos de consumo eléctrico. Nuestros equipos con R290 cumplen normativa europea F-Gas y están homologados para uso comercial en Colombia.",
  },
  {
    q: "¿Cómo funciona el envío de equipos con partes de vidrio a otras ciudades?",
    a: "Cada equipo sale de nuestra bodega perfectamente embalado en su caja original y protegido con icopor (espuma de alta densidad) en las zonas más sensibles. Hacemos todo lo posible para que el equipo llegue en perfectas condiciones, pero el riesgo propio del transporte queda en manos del operador logístico.",
  },
  {
    q: "¿Cuentan con capacitación de uso e instalación?",
    a: "Sí. La primera capacitación de uso es sin costo adicional: presencial en Bogotá al momento de la entrega, o remota por videollamada si estás en otra ciudad de Colombia. Te guiamos en instalación, puesta en marcha y recomendaciones de uso para que el equipo funcione desde el primer día. Capacitaciones adicionales tienen un costo.",
  },
];

export default function RefrigeraciónFAQ() {
  const { url: waUrl } = useWhatsApp(
    "commercial",
    "Hola, tengo una pregunta sobre los equipos de refrigeración",
  );
  return (
    <section className="py-20 bg-white">
      <JsonLd
        data={faqPageJsonLd(
          faqs.map((f) => ({ question: f.q, answer: f.a }))
        )}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest block mb-3">Preguntas Frecuentes</span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900">Resolvemos tus dudas</h2>
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
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-300 shrink-0 text-xl">expand_more</span>
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
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">¿Tienes una pregunta que no aparece aquí?</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-600/25"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
