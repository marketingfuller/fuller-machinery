"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Qué voltaje requieren los equipos cárnicos?",
    a: "La mayoría de nuestros equipos operan en 110V/60Hz estándar. Los molinos industriales de mayor potencia (3HP+) y las sierras de cinta grandes requieren 220V trifásico. En la ficha técnica de cada equipo encontrarás la especificación eléctrica exacta. Si necesitas orientación, nuestro equipo técnico puede visitar tu local.",
  },
  {
    q: "¿Los equipos cumplen con normativas INVIMA y sanitarias?",
    a: "Sí. Todos nuestros equipos de procesamiento cárnico están fabricados en acero inoxidable 304 certificado (también conocido como 18/8), sin zonas de acumulación de bacteria. Las superficies son lisas, fáciles de desmontar y lavar según protocolos HACCP. Podemos proveer fichas técnicas y certificados de materiales para auditorías.",
  },
  {
    q: "¿Incluyen capacitación y soporte técnico post-venta?",
    a: "Sí. Con cada equipo incluimos una jornada de arranque operativo en la que nuestros técnicos instalan el equipo, realizan las pruebas de funcionamiento y capacitan a los operarios. Adicionalmente ofrecemos soporte remoto sin costo durante los primeros 12 meses y red de servicio técnico autorizado a nivel nacional.",
  },
];

export default function CarnicosFAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="group bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden transition-colors duration-200"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-display font-bold text-slate-800 text-base select-none">
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-300 shrink-0 text-xl">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-4">
                  {faq.a}
                </p>
              </div>
            </motion.details>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">
            ¿Tienes una pregunta que no aparece aquí?
          </p>
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
