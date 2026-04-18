"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Qué diferencia hay entre una empacadora de cámara y una selladora de banda?",
    a: "La empacadora al vacío de cámara extrae el aire del interior de la bolsa y sella herméticamente — ideal para carnes, quesos y líquidos. La selladora de banda continua sella térmicamente bolsas pre-llenadas a alta velocidad sin hacer vacío — perfecta para snacks secos, café molido y productos en polvo. Si tu producto es húmedo o perecedero, necesitas la cámara de vacío.",
  },
  {
    q: "¿Cuánto extiende el vacío la vida útil de los alimentos?",
    a: "Depende del producto y de la temperatura de almacenamiento. En términos generales: carnes frescas pasan de 3-5 días a 21-25 días en refrigeración; quesos de 2 semanas a 3-4 meses; embutidos de 1 semana a 6 semanas. El vacío elimina el oxígeno que necesitan las bacterias aeróbicas para crecer, deteniendo la oxidación y el enranciamiento.",
  },
  {
    q: "¿Las bolsas de vacío son compatibles con cocción sous vide?",
    a: "Sí. Nuestras bolsas gofradas están certificadas para uso en cocción sous vide hasta 85°C sin liberar plastificantes. Son las mismas que usan los restaurantes de cocina de autor. Si necesitas temperaturas mayores (hasta 121°C para esterilización), tenemos bolsas de nylon multilayer de alta resistencia disponibles en nuestro catálogo de insumos.",
  },
  {
    q: "¿Manejan repuestos y capacitación de uso?",
    a: "Sí. Los repuestos (barras de sellado, sellos de vacío y piezas de desgaste) están sujetos a disponibilidad en stock y solo aplican para equipos Fuller Machinery. La capacitación de uso es sin costo: presencial en Bogotá al entregar el equipo, o remota por videollamada si estás en otra ciudad de Colombia.",
  },
];

export default function EmpaqueFAQ() {
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
          <span className="text-[#4ab84c] font-bold text-xs uppercase tracking-widest block mb-3">
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
