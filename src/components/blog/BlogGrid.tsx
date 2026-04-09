"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Download } from "lucide-react";

const articles = [
  {
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&h=500&fit=crop&q=80",
    category: "Mantenimiento",
    categoryStyle: "bg-accent/10 text-primary border-accent/30",
    readTime: "4 min",
    title: "5 Señales de que tu molino necesita cambio de disco",
    excerpt:
      "La consistencia del molido afecta directamente el sabor de tu café. Aprende a identificar el momento crítico antes de que afecte tus ventas.",
  },
  {
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&h=500&fit=crop&q=80",
    category: "Panadería",
    categoryStyle: "bg-primary/8 text-primary border-primary/20",
    readTime: "6 min",
    title: "Masas madre: El secreto para diferenciar tu panadería",
    excerpt:
      "No necesitas equipos costosos para empezar, solo paciencia y técnica. Te explicamos el proceso paso a paso con tiempos reales.",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=500&fit=crop&q=80",
    category: "Finanzas",
    categoryStyle: "bg-secondary/8 text-secondary border-secondary/20",
    readTime: "8 min",
    title: "Costos ocultos al abrir un restaurante y cómo evitarlos",
    excerpt:
      "Desde permisos municipales hasta mermas de inventario. Una auditoría de lo que realmente cuesta abrir puertas al público.",
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=500&fit=crop&q=80",
    category: "Técnico",
    categoryStyle: "bg-accent/10 text-primary border-accent/30",
    readTime: "5 min",
    title: "Protocolo de seguridad para operarios de maquinaria pesada",
    excerpt:
      "Evita accidentes laborales con esta checklist de seguridad indispensable para tu equipo de trabajo en cocinas de alto volumen.",
  },
  {
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=700&h=500&fit=crop&q=80",
    category: "Comida Rápida",
    categoryStyle: "bg-secondary/8 text-secondary border-secondary/20",
    readTime: "3 min",
    title: "El boom de los Bubble Waffles: ¿Moda pasajera o negocio sólido?",
    excerpt:
      "Analizamos las métricas de venta de este producto viral y su proyección para los próximos 2 años en Latinoamérica.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 240, damping: 24 },
  },
};

export default function BlogGrid() {
  return (
    <section className="mb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Articles */}
        {articles.map((article, i) => (
          <motion.article
            key={i}
            variants={itemVariants}
            className="group flex flex-col cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 rounded-2xl overflow-hidden mb-5 bg-slate-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Red accent bar on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${article.categoryStyle}`}
              >
                {article.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={11} />
                {article.readTime}
              </span>
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
              {article.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
              {article.excerpt}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-bold text-sm mt-4 transition-colors"
            >
              Leer más
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </motion.article>
        ))}

        {/* Download CTA card — replaces 6th article */}
        <motion.div
          variants={itemVariants}
          className="relative bg-bg-dark rounded-2xl p-8 flex flex-col justify-between overflow-hidden group"
        >
          {/* Glow spot */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors" />

          <div className="relative z-10">
            <div className="size-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-5">
              <Download size={22} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3 leading-tight">
              ¿Ya tienes la máquina?
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-7">
              Descarga nuestro catálogo de Snacks 2025 y descubre los nuevos
              accesorios que aumentarán tu productividad en un 40%.
            </p>
          </div>

          <a
            href="#"
            className="relative z-10 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-bg-dark font-bold py-3 px-5 rounded-xl text-sm uppercase tracking-wide transition-all hover:-translate-y-0.5"
          >
            <Download size={15} />
            Descargar Catálogo
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
