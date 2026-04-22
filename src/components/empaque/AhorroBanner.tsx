"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useWhatsApp } from "@/components/SettingsProvider";

const bullets = [
  {
    icon: Clock,
    title: "Día 3 sin empaque",
    desc: "Oxidación visible, cambio de color y olor. Producto no vendible.",
    bad: true,
  },
  {
    icon: Clock,
    title: "Día 21 con vacío Fuller",
    desc: "Color, textura y sabor intactos. Cero merma, cero reclamos.",
    bad: false,
  },
];

export default function AhorroBanner() {
  const { url: waUrl } = useWhatsApp(
    "commercial",
    "Hola, me interesa conocer las empacadoras al vacío",
  );
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
          {/* LEFT — comparison visual */}
          <div className="lg:w-1/2 relative min-h-[380px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/empaque/empaque al vacio 2.webp')",
              }}
            />
          </div>

          {/* RIGHT — content */}
          <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-[#4ab84c] font-bold uppercase tracking-widest text-xs block mb-4">
                La Ciencia del Ahorro
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4 leading-tight">
                Deja de tirar{" "}
                <span className="text-secondary">dinero a la basura.</span>
              </h2>

              <div className="flex items-start gap-4 mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-5xl font-black text-primary font-display leading-none shrink-0">
                  30%
                </p>
                <p className="text-slate-600 text-sm leading-relaxed pt-1">
                  de los costos operativos en una cocina profesional provienen
                  del desperdicio por mala conservación.
                </p>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Nuestras soluciones de vacío eliminan el oxígeno, deteniendo el
                crecimiento bacteriano y la oxidación. Convierte las mermas en
                ganancias desde el primer mes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://tienda.fullermachinery.com/index.php/producto/empacadora-al-vacio-dz-400/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25"
                >
                  Ver Empacadora al Vacío DZ
                  <ArrowRight size={16} />
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
                >
                  Hablar con un Experto
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
