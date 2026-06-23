// ────────────────────────────────────────────────────────────
// Modelo de producto del catálogo Fuller.
// Diseñado para el modelo HÍBRIDO: hoy el CTA va a WhatsApp (cotización),
// pero los campos comerciales (price, sku, stockStatus) ya existen para
// habilitar carrito + checkout en una fase 2 sin migrar el esquema.
// ────────────────────────────────────────────────────────────

export type ProductCategory =
  | "bebidas"
  | "carnicos"
  | "panaderia"
  | "cocina"
  | "snacks"
  | "refrigeracion"
  | "empaque"
  | "pesaje"
  | "exhibicion"
  | "procesamiento"
  | "buffet"
  | "mobiliario"
  | "novelty";

export type StockStatus = "in_stock" | "out_of_stock" | "on_request";

export type ProductSpec = { label: string; value: string };

export type ProductBadge = { text: string; color: string };

/**
 * Variante de color de un producto. Cuando un producto tiene `variants`, la
 * ficha muestra un selector de color (swatches) que cambia la galería de fotos
 * y el color viaja al mensaje de WhatsApp. Evita duplicar fichas por color.
 */
export type ProductVariant = {
  /** Etiqueta visible, ej "Rosado". */
  label: string;
  /** Color CSS para el círculo del swatch, ej "#ec4899". */
  swatch: string;
  /** Imágenes de esta variante (la primera es la principal). */
  images: string[];
};

export type Product = {
  /** Slug único para la URL: /productos/[slug] */
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  /** Tipo de equipo (granizadora, freidora, horno…). Agrupa colecciones SEO. */
  type?: string;

  /** 1–2 líneas para tarjetas y base de la meta description. */
  shortDescription: string;
  /** Cuerpo SEO en markdown (descripción IA optimizada). Tiene prioridad. */
  description?: string;
  /** Descripción HTML original de WooCommerce (fallback si no hay markdown). */
  descriptionHtml?: string;
  /** Bullets de venta rápida mostrados junto a las specs. */
  highlights?: string[];

  /** La primera imagen es la principal (usada en card, OG y galería). */
  images: string[];
  specs: ProductSpec[];
  badge?: ProductBadge;
  /**
   * Variantes de color. Si está presente, la ficha muestra un selector que
   * cambia la galería al color elegido. `images` (arriba) debe coincidir con
   * la primera variante (es el fallback para card/OG/buscador).
   */
  variants?: ProductVariant[];

  // ── Campos comerciales (híbrido — listos para carrito en fase 2) ──
  sku?: string;
  price?: number | null;
  currency?: string;
  stockStatus?: StockStatus;
  /**
   * Disponibilidad para el agente de ventas (ZOCAM/WhatsApp).
   * Default true (lo ofrecemos). Marcar false si está descontinuado/agotado.
   * Fase B: cuando exista control de stock, derivar de stock > 0.
   */
  available?: boolean;

  // ── SEO ──
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];

  // ── Enlaces ──
  /** Ficha técnica original en WooCommerce (mientras migramos). */
  wooUrl?: string;
  /** ID del producto en WooCommerce para sincronización futura. */
  wooId?: number;
  /** Mensaje prellenado para el CTA de WhatsApp. */
  whatsappMessage?: string;

  /**
   * Oculta la calculadora de rentabilidad aunque la categoría la tenga.
   * Para accesorios (termos, sellos, rollos…) que no generan ingreso por
   * unidad vendida: mostrar la calculadora ahí sería engañoso.
   */
  hideCalculator?: boolean;

  /** Orden manual dentro de su categoría (menor = primero). */
  sortOrder?: number;
  /** Si false, no se renderiza ni entra al sitemap. */
  published?: boolean;
};
