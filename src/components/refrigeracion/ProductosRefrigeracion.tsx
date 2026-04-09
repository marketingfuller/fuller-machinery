"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const products = [
  {
    name: "Nevera Vertical 3 Puertas",
    badge: "Supermercados",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=700&h=500&fit=crop&q=80",
    originalPrice: "$2,800.00",
    salePrice: "$2,450.00",
    hasStrikethrough: true,
    desc: "Ideal para bebidas y lácteos. Iluminación LED vertical en cada puerta para máxima exhibición.",
  },
  {
    name: "Vitrina Curva 2m",
    badge: "Carnicerías",
    image:
      "https://images.unsplash.com/photo-1547584370-2cc96f4c6b32?w=700&h=500&fit=crop&q=80",
    originalPrice: "$1,950.00",
    salePrice: "$1,680.00",
    hasStrikethrough: true,
    desc: "Vidrio curvo abatible, bodega inferior refrigerada y tope en acero inoxidable.",
  },
  {
    name: "Fabricador de Hielo 50kg",
    badge: "Bares & Restaurantes",
    image:
      "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=700&h=500&fit=crop&q=80",
    originalPrice: null,
    salePrice: "$1,200.00",
    hasStrikethrough: false,
    desc: "Producción continua de cubos cristalinos. Depósito integrado de 20kg.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

export default function ProductosRefrigeracion() {
  return (
    <section id="productos" className="bg-[#f5f5f5] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-2">
              Los más vendidos
            </h2>
            <p className="text-slate-500 text-lg">
              Equipos de alto rendimiento, listos para entregar.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors shrink-0"
          >
            Ver todo el catálogo
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Product cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-slate-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {product.desc}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  {product.hasStrikethrough && product.originalPrice && (
                    <span className="text-slate-400 line-through text-sm">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-secondary font-black text-2xl">
                    {product.salePrice}
                  </span>
                </div>

                <button className="w-full bg-primary hover:bg-bg-dark text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors duration-200">
                  Ver Especificaciones
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
