"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductBadge } from "@/content/products/types";

export default function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: ProductBadge;
}) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const go = (i: number) => setActive((i + total) % total);

  return (
    <div>
      {/* Imagen principal — object-contain para mostrar el equipo completo, sin recortes */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 group">
        <Image
          key={active}
          src={images[active]}
          alt={`${name} — foto ${active + 1} de ${total} | Fuller Machinery Colombia`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-contain p-4"
        />

        {badge && (
          <span
            className={`absolute top-5 left-5 z-10 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${badge.color}`}
          >
            {badge.text}
          </span>
        )}

        {/* Sello de confianza real superpuesto */}
        <span className="absolute bottom-5 left-5 z-10 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
          Garantía Fuller
        </span>

        {/* Flechas (solo si hay más de una foto) */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => go(active - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => go(active + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_right</span>
            </button>
          </>
        )}
      </div>

      {/* Miniaturas clicables (desktop/tablet) */}
      {total > 1 && (
        <div className="mt-4 hidden sm:grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square rounded-lg overflow-hidden bg-white border-2 transition-colors ${
                i === active
                  ? "border-primary"
                  : "border-slate-100 hover:border-slate-300"
              }`}
            >
              <Image
                src={img}
                alt={`${name} — miniatura ${i + 1}`}
                fill
                sizes="100px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots (móvil) */}
      {total > 1 && (
        <div className="mt-4 flex sm:hidden items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir a foto ${i + 1}`}
              className={`size-2.5 rounded-full transition-colors ${
                i === active ? "bg-primary" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
