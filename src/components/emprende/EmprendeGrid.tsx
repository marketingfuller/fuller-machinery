"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Download } from "lucide-react";
import type { Post } from "@/lib/emprende";

const categoryStyles: Record<string, string> = {
  Panadería: "bg-primary/8 text-primary border-primary/20",
  "Comida Rápida": "bg-secondary/8 text-secondary border-secondary/20",
  Bebidas: "bg-blue-500/8 text-blue-600 border-blue-500/20",
  Técnico: "bg-accent/10 text-primary border-accent/30",
  Finanzas: "bg-slate-800/8 text-slate-800 border-slate-300",
  "Casos de Éxito": "bg-purple-500/8 text-purple-700 border-purple-500/20",
};

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

export default function EmprendeGrid({ posts }: { posts: Post[] }) {
  return (
    <section className="mb-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post) => (
          <motion.article key={post.slug} variants={itemVariants} className="group flex flex-col">
            <Link href={`/emprende/${post.slug}`} className="relative h-56 rounded-2xl overflow-hidden mb-5 bg-slate-100 block">
              {post.cover && (
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  categoryStyles[post.category] ?? "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {post.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={11} />
                {post.readingTime}
              </span>
            </div>

            <Link href={`/emprende/${post.slug}`}>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

            <Link
              href={`/emprende/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-bold text-sm mt-4 transition-colors"
            >
              Leer más
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </motion.article>
        ))}

        {/* Download CTA card */}
        <motion.div
          variants={itemVariants}
          className="relative bg-bg-dark rounded-2xl p-8 flex flex-col justify-between overflow-hidden group"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/30 transition-colors" />
          <div className="relative z-10">
            <div className="size-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-5">
              <Download size={22} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3 leading-tight">¿Necesitas asesoría personalizada?</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-7">
              Escríbenos por WhatsApp y te ayudamos a escoger el equipo ideal para tu negocio gastronómico.
            </p>
          </div>
          <a
            href="https://wa.me/573244247198?text=Hola%2C%20necesito%20asesor%C3%ADa%20para%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-bg-dark font-bold py-3 px-5 rounded-xl text-sm uppercase tracking-wide transition-all hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            Hablar por WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
