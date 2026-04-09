"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "ac_unit",
    title: "Enfriamiento hasta -7°C",
    desc: "Motor de 500W con sistema de alta velocidad que alcanza -7°C. Granizados perfectos y consistentes incluso en climas tropicales extremos, sin interrupciones.",
  },
  {
    icon: "rotate_right",
    title: "Aspas Antiasentamiento",
    desc: "Sistema giratorio constante que evita la formación de capas de hielo. Textura suave y uniforme desde el primer hasta el último vaso del día.",
  },
  {
    icon: "dashboard",
    title: "Tablero Digital Inteligente",
    desc: "Control preciso de temperatura y operación con pantalla digital. Ajusta la producción según la demanda sin complicaciones técnicas.",
  },
];

export default function BebidasProfit() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* LEFT — profit card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              {/* Rotated badge */}
              <div className="absolute -top-6 -right-6 bg-secondary text-white font-black text-sm px-4 py-2 rounded-xl shadow-lg rotate-3 select-none">
                $4.000 DE GANANCIA
              </div>

              <h3 className="font-display font-bold text-2xl text-primary mb-6">
                La Matemática del Granizado
              </h3>

              <div className="space-y-3">
                {/* Cost rows */}
                {[
                  { label: "Jarabe concentrado (por vaso)", value: "$3.500" },
                  { label: "Vaso + cucharilla", value: "$350" },
                  { label: "Energía (por vaso)", value: "$150" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-slate-600 text-sm">{row.label}</span>
                    <span className="font-semibold text-slate-800 text-sm">{row.value}</span>
                  </div>
                ))}

                {/* Separator */}
                <div className="border-t border-slate-200 my-1" />

                {/* Total */}
                <div className="flex items-center justify-between py-2">
                  <span className="font-bold text-slate-800">Costo Total</span>
                  <span className="font-bold text-slate-800">$4.000</span>
                </div>

                {/* Sale price — highlighted */}
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">
                    Precio de Venta Sugerido
                  </span>
                  <span className="font-black text-xl text-primary">$8.000+</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-5 leading-relaxed">
                *Datos basados en el mercado colombiano 2025 (fuente: Mixies, BigCenter). Los resultados varían según la región y el volumen de ventas.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — tech features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:w-1/2 w-full space-y-8"
          >
            {/* Badge */}
            <span className="inline-block text-accent font-bold text-sm uppercase tracking-widest">
              Ingeniería Superior
            </span>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 leading-tight">
              Granizados Perfectos,{" "}
              <span className="text-primary">Operación sin Pausas.</span>
            </h2>

            {/* Feature rows */}
            <div className="space-y-6">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="shrink-0 w-12 h-12 bg-bg-dark text-white rounded-xl flex items-center justify-center p-3">
                    <span className="material-symbols-outlined text-[22px]">
                      {feat.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">{feat.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
