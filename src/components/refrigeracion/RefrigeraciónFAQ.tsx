"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Qué ventajas tiene el gas ecológico R290 en sus equipos?",
    a: "El R290 es propano natural con potencial de calentamiento global casi nulo y sin daño a la capa de ozono. Permite una transferencia de calor más eficiente que los gases sintéticos — hasta 30% menos de consumo eléctrico. Nuestros equipos con R290 cumplen normativa europea F-Gas y están homologados para uso comercial en Colombia.",
  },
  {
    q: "¿Cómo funciona el envío de vitrinas de vidrio a otras ciudades?",
    a: "Triple protección de embalaje: caja de madera estructurada, esquineros de espuma de alta densidad y film stretch multicapa. Cada vitrina sale asegurada al 100% contra roturas. En caso de daño en tránsito, reponemos el equipo sin costo adicional.",
  },
  {
    q: "¿Cuentan con soporte técnico para instalación?",
    a: "Sí. Red nacional de técnicos certificados en más de 15 ciudades. Para equipos de gran porte (neveras verticales, vitrinas mostrador y fabricadores de hielo), la instalación en ciudades principales está incluida en el precio. Equipos plug-and-play incluyen videollamada de acompañamiento con técnico.",
  },
];

export default function RefrigeraciónFAQ() {
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
          <a href="#" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
