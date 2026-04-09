"use client";

import { motion } from "framer-motion";
import { Zap, MonitorSmartphone, GlassWater } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Zap,
    boxClass: "bg-green-100 text-green-700",
    title: "Motores Ahorradores",
    desc: "Compresores inversores que ajustan su velocidad a la demanda real, eliminando arranques bruscos.",
  },
  {
    icon: MonitorSmartphone,
    boxClass: "bg-blue-100 text-blue-700",
    title: "Control Digital Inteligente",
    desc: "Termostatos programables con alertas en tiempo real para mantener rangos exactos.",
  },
  {
    icon: GlassWater,
    boxClass: "bg-purple-100 text-purple-700",
    title: "Vidrios Templados Low-E",
    desc: "Triple capa con relleno de argón que reduce la transferencia de calor hasta un 65%.",
  },
];

export default function EnergiaSection() {
  return (
    <section className="bg-sky-50 py-20 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            {/* Badge */}
            <span className="inline-block bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider px-4 py-2 mb-5">
              Eficiencia Energética
            </span>

            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 leading-tight mb-5">
              ¿Cansado de facturas de luz impagables?
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              Nuestros equipos operan las 24 horas, 7 días a la semana con gases
              ecológicos R290 y R600a — sin dañar la capa de ozono y con el menor
              consumo eléctrico de su categoría.
            </p>

            <div className="space-y-6">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex gap-4 items-start"
                >
                  <div className={`p-3 rounded-lg shrink-0 ${feat.boxClass}`}>
                    <feat.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{feat.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 relative"
          >
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=900&h=700&fit=crop&q=80"
                alt="Refrigerador comercial eficiente"
                width={900}
                height={700}
                className="rounded-xl w-full h-auto object-cover"
              />
              {/* Badge over image */}
              <div className="absolute -top-4 -right-4 bg-secondary text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg">
                Ahorro hasta 40%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
