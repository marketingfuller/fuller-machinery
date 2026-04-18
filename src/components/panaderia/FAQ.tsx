"use client";

import { motion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

const faqs = [
  {
    q: "¿Horno de Gas vs Eléctrico, cuál elijo?",
    a: "Depende de tu instalación. El gas suele ser más económico en operación a largo plazo para alto volumen, mientras que los eléctricos ofrecen un control de temperatura más preciso y seco, ideal para pastelería fina. Nuestro equipo técnico puede asesorarte según tu espacio y consumo energético local.",
  },
  {
    q: "¿Qué voltaje requieren los equipos de panadería?",
    a: "Manejamos equipos a 110V (línea hogar/pequeño negocio) y 220V bifásico/trifásico para línea industrial. Las amasadoras de gran capacidad generalmente requieren 220V. Verifica tu instalación eléctrica antes de comprar — podemos orientarte sin costo.",
  },
  {
    q: "¿Las vitrinas exhibidoras funcionan a 110V y tienen luz interna?",
    a: "Sí. Nuestras vitrinas exhibidoras para panadería operan a 110V, ideales para cualquier local sin instalación especial. Incluyen iluminación LED interna que realza la presentación del producto y mantiene la temperatura estable para conservar frescura y calidad visual.",
  },
];

const tags = ["Hornos Eléctricos", "Amasadoras Espiral", "Laminadoras de Mesa", "Cámaras de Crecimiento"];

export default function FAQ() {
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

        <div className="space-y-4 mb-10">
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

        {/* Category tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-4">¿Tienes una pregunta que no aparece aquí?</p>
          <a href="https://wa.me/573244247198" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Contáctanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
