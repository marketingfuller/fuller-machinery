"use client";

import { useRef, useState } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  // El carrusel usa scroll-snap nativo: en móvil se desliza con el dedo (swipe)
  // y en desktop con flechas/miniaturas. `active` se sincroniza desde el scroll.
  const scrollTo = (i: number) => {
    const idx = (i + total) % total;
    const track = trackRef.current;
    if (track) track.scrollTo({ left: track.clientWidth * idx, behavior: "smooth" });
    setActive(idx);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    setActive(Math.min(Math.max(i, 0), total - 1));
  };

  return (
    <div>
      {/* Imagen principal — carrusel deslizable (swipe en móvil) */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 group">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={`${name} — foto ${i + 1} de ${total} | Fuller Machinery Colombia`}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>

        {badge && (
          <span
            className={`pointer-events-none absolute top-5 left-5 z-10 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-white ${badge.color}`}
          >
            {badge.text}
          </span>
        )}

        {/* Sello de confianza real superpuesto */}
        <span className="pointer-events-none absolute bottom-5 left-5 z-10 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
          Garantía Fuller
        </span>

        {total > 1 && (
          <>
            {/* Contador de fotos (visible siempre — deja claro que hay más) */}
            <span className="pointer-events-none absolute top-5 right-5 z-10 bg-bg-dark/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full tabular-nums">
              {active + 1}/{total}
            </span>

            {/* Flechas: visibles en móvil, hover en desktop */}
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => scrollTo(active - 1)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => scrollTo(active + 1)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 hover:bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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
              onClick={() => scrollTo(i)}
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

      {/* Dots (móvil) — refuerzan que hay varias fotos y permiten saltar */}
      {total > 1 && (
        <div className="mt-4 flex sm:hidden items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir a foto ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === active ? "w-6 bg-primary" : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
