"use client";

import { createContext, useContext, useState } from "react";
import type { ProductVariant } from "@/content/products/types";

// Comparte el color seleccionado entre la galería (cambia la foto) y los CTA de
// WhatsApp (añaden el color al mensaje). Si un producto no tiene variantes, el
// contexto cae al comportamiento normal (imágenes base, sin color).
type VariantState = {
  variants: ProductVariant[];
  selected: number;
  setSelected: (i: number) => void;
  /** Imágenes a mostrar (de la variante activa, o las base). */
  images: string[];
  /** Etiqueta del color activo, o null si no hay variantes. */
  colorLabel: string | null;
};

const VariantCtx = createContext<VariantState | null>(null);

export function VariantProvider({
  variants = [],
  baseImages,
  children,
}: {
  variants?: ProductVariant[];
  baseImages: string[];
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const hasVariants = variants.length > 0;
  const images =
    hasVariants && variants[selected]?.images?.length
      ? variants[selected].images
      : baseImages;
  const colorLabel = hasVariants ? variants[selected]?.label ?? null : null;

  return (
    <VariantCtx.Provider
      value={{ variants, selected, setSelected, images, colorLabel }}
    >
      {children}
    </VariantCtx.Provider>
  );
}

export function useVariant(): VariantState | null {
  return useContext(VariantCtx);
}
