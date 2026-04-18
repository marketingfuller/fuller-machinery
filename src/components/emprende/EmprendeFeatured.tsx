"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/lib/emprende";

export default function EmprendeFeatured({ post }: { post: Post }) {
  const dateFmt = new Date(post.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-400 flex flex-col lg:flex-row"
      >
        <Link href={`/emprende/${post.slug}`} className="relative lg:w-3/5 min-h-[360px] lg:min-h-[440px] overflow-hidden block">
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-white lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />

          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-1.5 bg-accent text-bg-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <span className="material-symbols-outlined text-[13px]">star</span>
              Artículo Destacado
            </span>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Clock size={12} className="text-white/70" />
            <span className="text-white text-xs font-medium">{post.readingTime} de lectura</span>
          </div>
        </Link>

        <div className="lg:w-2/5 p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary bg-primary/8 border border-primary/20 px-3 py-1 rounded-full mb-5 self-start">
            <span className="size-1.5 rounded-full bg-accent inline-block" />
            {post.category}
          </span>

          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-8 text-xs text-slate-400">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[16px]">person</span>
            </div>
            <span className="font-medium text-slate-600">{post.author}</span>
            <span aria-hidden>·</span>
            <span>{dateFmt}</span>
          </div>

          <Link
            href={`/emprende/${post.slug}`}
            className="inline-flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 text-sm uppercase tracking-wide self-start"
          >
            Leer Guía Completa
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
