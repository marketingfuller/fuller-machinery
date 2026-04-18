"use client";

import { motion } from "framer-motion";
import { Sparkles, Truck, Users, Boxes } from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    title: "Tecnología actual",
    desc: "Seleccionamos equipos que aporten a lo importante: producir más, optimizar tiempos y mantener la calidad en cada preparación.",
  },
  {
    icon: Users,
    title: "Acompañamiento real",
    desc: "Acompañamos a emprendedores y empresas en la elección de maquinaria, organización de la operación y asesoría para mejorar productividad y servicio.",
  },
  {
    icon: Truck,
    title: "Importación propia",
    desc: "Importamos maquinaria de diferentes países para mantenernos a la vanguardia y ofrecer opciones alineadas con las necesidades reales del sector.",
  },
  {
    icon: Boxes,
    title: "Soluciones integrales",
    desc: "Desde equipos hasta accesorios clave para la operación diaria — todo en un solo aliado con respaldo técnico propio en Bogotá.",
  },
];

export default function NosotrosHistoria() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Nuestra historia
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
            Más de 15 años al lado del sector gastronómico colombiano
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-left md:text-center">
            <p>
              En <strong className="text-slate-900">Fuller Machinery Ltda.</strong>{" "}
              llevamos más de 15 años en el mercado. Desde 2008 nos
              especializamos en ofrecer soluciones integrales en maquinaria
              para alimentos, desde equipos hasta accesorios clave para la
              operación diaria.
            </p>
            <p>
              Hoy contamos con <strong className="text-slate-900">tres sedes en Bogotá</strong>{" "}
              y hemos suministrado maquinaria a{" "}
              <strong className="text-slate-900">más de 500 negocios en Colombia</strong>,
              convirtiéndonos en un aliado para quienes buscan iniciar o
              fortalecer su negocio en alimentos.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-6"
              >
                <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
