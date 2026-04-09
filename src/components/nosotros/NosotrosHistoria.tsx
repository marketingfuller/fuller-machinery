"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NosotrosHistoria() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Text — left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Nuestra Historia
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
              De un pequeño taller a líderes nacionales.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Todo comenzó en 1995, en un pequeño garaje en el centro
                industrial. Nuestro fundador, Roberto Fuller, reparaba cafeteras
                con una sola convicción:{" "}
                <em className="text-slate-800 font-semibold">
                  "Una máquina que no funciona, es una familia que no factura."
                </em>
              </p>
              <p>
                Esa empatía por el emprendedor nos impulsó a crecer. No solo
                queríamos reparar, queríamos proveer tecnología que transformara
                vidas. Viajamos por el mundo buscando proveedores que
                compartieran nuestra obsesión por la calidad industrial.
              </p>
              <p>
                Hoy, casi 30 años después, Fuller Machinery es sinónimo de
                confianza, albergando el stock más grande del país y un equipo
                humano que sigue tratando cada proyecto con la misma pasión del
                primer día.
              </p>
            </div>
          </motion.div>

          {/* Image — right with offset border decoration */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full md:w-1/2 relative"
          >
            {/* Offset border */}
            <div className="absolute top-4 -right-4 w-full h-full border-4 border-primary rounded-2xl hidden md:block z-0" />
            {/* Photo */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop&q=80"
                alt="Roberto Fuller en sus primeros años de taller"
                fill
                className="object-cover sepia-[0.2]"
              />
              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold text-sm">
                  Roberto Fuller, 1998
                </p>
                <p className="text-white/60 text-xs">Taller original, CDMX</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
