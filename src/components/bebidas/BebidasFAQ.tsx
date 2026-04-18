"use client";

import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

const faqs = [
  {
    q: "¿Qué voltaje requieren los equipos de bebidas?",
    a: "La granizadora, la licuadora y la selladora de vasos operan a 110V — enchufas y listo, sin instalación especial. La excepción es la Capuchinera 1 Grupo que requiere 220V bifásico, por lo que necesitarás un tomacorriente certificado. Si tienes dudas sobre tu instalación eléctrica, te asesoramos sin costo antes de comprar.",
  },
  {
    q: "¿Cuántos granizados produce la Granizadora Triple Tanque al día?",
    a: "Con 3 tanques de 12 litros (36L en total) y vasos de 9 oz (270ml), cada tanque rinde aproximadamente 40 vasos — más de 120 vasos por carga completa. Su motor de 1.200W enfría hasta -9°C con refrigerante R290, lo que garantiza producción continua sin interrupciones en turnos de todo el día.",
  },
  {
    q: "¿La selladora de vasos es compatible con los vasos de mi proveedor?",
    a: "Sí. La Selladora de Vasos Manual trabaja con vasos de 7 a 22 oz (210ml a 650ml), el rango estándar del mercado colombiano. Sella con película PET de uso alimenticio y tiene contador digital integrado para control de producción. Rinde entre 140 y 160 vasos por hora.",
  },
];

export default function BebidasFAQ() {
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
          <a href="https://wa.me/573244247198?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20los%20equipos%20de%20bebidas%20y%20caf%C3%A9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
