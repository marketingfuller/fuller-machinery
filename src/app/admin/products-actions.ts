"use server";

import { revalidateTag } from "next/cache";
import {
  assertAdmin,
  ALLOWED_IMAGE_EXT,
  uploadImageToBucket,
} from "./shared";
import { CATEGORY_META, SEED_PRODUCTS } from "@/lib/products";
import { productToRow, PRODUCTS_TAG } from "@/lib/products-db";
import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductSpec,
  ProductVariant,
  StockStatus,
} from "@/content/products/types";

const BUCKET = "product-images";

export type ProductActionState = {
  ok: boolean;
  message?: string;
  slug?: string;
};

// ── Helpers de parseo (no exportados: este archivo es "use server") ──

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function text(fd: FormData, key: string, max: number): string | undefined {
  const v = fd.get(key);
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t.slice(0, max) : undefined;
}

function checkbox(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

function lines(fd: FormData, key: string, max = 40): string[] {
  const v = fd.get(key);
  if (typeof v !== "string") return [];
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

function parseJsonArray(fd: FormData, key: string): unknown[] {
  const v = fd.get(key);
  if (typeof v !== "string" || !v) return [];
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function parseSpecs(fd: FormData): ProductSpec[] {
  return parseJsonArray(fd, "specs")
    .map(asRecord)
    .filter((r): r is Record<string, unknown> => !!r)
    .map((r) => ({
      label: String(r.label ?? "").slice(0, 120),
      value: String(r.value ?? "").slice(0, 400),
    }))
    .filter((s) => s.label && s.value);
}

function parseVariants(fd: FormData): ProductVariant[] {
  return parseJsonArray(fd, "variants")
    .map(asRecord)
    .filter((r): r is Record<string, unknown> => !!r)
    .map((r) => ({
      label: String(r.label ?? "").slice(0, 60),
      swatch: String(r.swatch ?? "").slice(0, 40),
      images: Array.isArray(r.images)
        ? (r.images as unknown[]).map(String).filter(Boolean)
        : [],
    }))
    .filter((v) => v.label);
}

function parseImages(fd: FormData): string[] {
  return parseJsonArray(fd, "images").map(String).filter(Boolean);
}

const STOCK_VALUES: StockStatus[] = ["in_stock", "out_of_stock", "on_request"];

// ── Acciones ──

export async function saveProduct(
  _prev: ProductActionState,
  fd: FormData,
): Promise<ProductActionState> {
  const { admin } = await assertAdmin();

  const mode = fd.get("mode") === "create" ? "create" : "edit";
  const slug = normalizeSlug(String(fd.get("slug") ?? ""));
  const name = text(fd, "name", 200);
  const category = String(fd.get("category") ?? "") as ProductCategory;

  if (!slug) return { ok: false, message: "El slug es obligatorio." };
  if (!name) return { ok: false, message: "El nombre es obligatorio." };
  if (!(category in CATEGORY_META)) {
    return { ok: false, message: "Categoría inválida." };
  }

  const priceRaw = String(fd.get("price") ?? "").replace(/[^\d.]/g, "");
  const price = priceRaw ? Number(priceRaw) : null;
  if (price !== null && Number.isNaN(price)) {
    return { ok: false, message: "Precio inválido." };
  }

  const stockRaw = String(fd.get("stockStatus") ?? "");
  const stockStatus = STOCK_VALUES.includes(stockRaw as StockStatus)
    ? (stockRaw as StockStatus)
    : undefined;

  const badgeText = text(fd, "badgeText", 60);
  const badge: ProductBadge | undefined = badgeText
    ? { text: badgeText, color: text(fd, "badgeColor", 40) ?? "bg-secondary" }
    : undefined;

  const sortRaw = String(fd.get("sortOrder") ?? "").replace(/[^\d]/g, "");

  const product: Product = {
    slug,
    name,
    category,
    categoryLabel: CATEGORY_META[category].label,
    type: text(fd, "type", 60),
    shortDescription: text(fd, "shortDescription", 500) ?? "",
    description: text(fd, "description", 20000),
    highlights: lines(fd, "highlights"),
    images: parseImages(fd),
    specs: parseSpecs(fd),
    badge,
    variants: parseVariants(fd),
    sku: text(fd, "sku", 60),
    price,
    currency: text(fd, "currency", 8) ?? (price !== null ? "COP" : undefined),
    stockStatus,
    available: checkbox(fd, "available"),
    metaTitle: text(fd, "metaTitle", 160),
    metaDescription: text(fd, "metaDescription", 320),
    keywords: lines(fd, "keywords"),
    whatsappMessage: text(fd, "whatsappMessage", 500),
    hideCalculator: checkbox(fd, "hideCalculator"),
    sortOrder: sortRaw ? Number(sortRaw) : undefined,
    published: checkbox(fd, "published"),
  };

  if (mode === "create") {
    const { data: existing } = await admin
      .from("products")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (existing) {
      return { ok: false, message: "Ya existe un producto con ese slug." };
    }
  }

  const { error } = await admin
    .from("products")
    .upsert(productToRow(product), { onConflict: "slug" });
  if (error) return { ok: false, message: error.message };

  revalidateTag(PRODUCTS_TAG, "max");
  return { ok: true, message: "Producto guardado.", slug };
}

export async function deleteProduct(
  slug: string,
): Promise<ProductActionState> {
  const { admin } = await assertAdmin();
  if (typeof slug !== "string" || !slug.trim()) {
    return { ok: false, message: "Producto inválido." };
  }

  // Best-effort: borrar imágenes del bucket (no bloquea si falla).
  try {
    const { data: row } = await admin
      .from("products")
      .select("category")
      .eq("slug", slug)
      .maybeSingle();
    const category = (row as { category?: string } | null)?.category;
    if (category) {
      const folder = `${category}/${slug}`;
      const { data: list } = await admin.storage.from(BUCKET).list(folder);
      if (list?.length) {
        await admin.storage
          .from(BUCKET)
          .remove(list.map((f) => `${folder}/${f.name}`));
      }
    }
  } catch {
    // ignorar limpieza de storage
  }

  const { error } = await admin.from("products").delete().eq("slug", slug);
  if (error) return { ok: false, message: error.message };

  revalidateTag(PRODUCTS_TAG, "max");
  return { ok: true, message: "Producto eliminado." };
}

export async function setProductPublished(
  slug: string,
  published: boolean,
): Promise<ProductActionState> {
  const { admin } = await assertAdmin();
  if (typeof slug !== "string" || !slug.trim()) {
    return { ok: false, message: "Producto inválido." };
  }
  const { error } = await admin
    .from("products")
    .update({ published: Boolean(published) })
    .eq("slug", slug);
  if (error) return { ok: false, message: error.message };

  revalidateTag(PRODUCTS_TAG, "max");
  return { ok: true };
}

/** Sube una o varias imágenes al bucket y devuelve sus URLs públicas. */
export async function uploadProductImages(
  fd: FormData,
): Promise<{ ok: boolean; urls?: string[]; message?: string }> {
  const { admin } = await assertAdmin();
  const slug = normalizeSlug(String(fd.get("slug") ?? ""));
  const category =
    String(fd.get("category") ?? "").replace(/[^a-z0-9-]/gi, "") || "general";
  const sub = String(fd.get("sub") ?? "").replace(/[^a-z0-9-]/gi, "");
  if (!slug) {
    return {
      ok: false,
      message: "Escribe primero el nombre del producto antes de subir las fotos.",
    };
  }
  const files = fd
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return { ok: false, message: "No seleccionaste archivos." };

  const urls: string[] = [];
  let i = 0;
  for (const file of files) {
    const ext = (file.name.split(".").pop() ?? "webp").toLowerCase();
    const safeExt = ALLOWED_IMAGE_EXT.has(ext) ? ext : "webp";
    const folder = sub ? `${category}/${slug}/${sub}` : `${category}/${slug}`;
    const path = `${folder}/${Date.now()}-${i}.${safeExt}`;
    const res = await uploadImageToBucket(admin, BUCKET, path, file);
    if (typeof res === "object") return { ok: false, message: res.error };
    urls.push(res);
    i++;
  }
  return { ok: true, urls };
}

/** Importación inicial única: siembra la tabla con los productos de código. */
export async function importSeedCatalog(): Promise<ProductActionState & { count?: number }> {
  const { admin } = await assertAdmin();
  const rows = SEED_PRODUCTS.map(productToRow);
  const { error } = await admin
    .from("products")
    .upsert(rows, { onConflict: "slug" });
  if (error) return { ok: false, message: error.message };

  revalidateTag(PRODUCTS_TAG, "max");
  return { ok: true, message: `Importados ${rows.length} productos.`, count: rows.length };
}
