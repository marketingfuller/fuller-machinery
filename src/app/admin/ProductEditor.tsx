"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  saveProduct,
  uploadProductImages,
  type ProductActionState,
} from "./products-actions";
import type {
  Product,
  ProductSpec,
  ProductVariant,
} from "@/content/products/types";

type CategoryOption = { value: string; label: string };

const initialState: ProductActionState = { ok: true };
const inputCls =
  "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm";
const labelCls = "block text-xs font-semibold text-slate-600 mb-1";
const sectionCls = "bg-white rounded-2xl shadow p-6";

export default function ProductEditor({
  initial,
  categories,
  mode,
}: {
  initial: Product;
  categories: CategoryOption[];
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveProduct, initialState);

  const [slug, setSlug] = useState(initial.slug);
  const [category, setCategory] = useState(initial.category);
  const [images, setImages] = useState<string[]>(initial.images ?? []);
  const [specs, setSpecs] = useState<ProductSpec[]>(initial.specs ?? []);
  const [variants, setVariants] = useState<ProductVariant[]>(
    initial.variants ?? [],
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const createdRef = useRef(false);

  // Tras crear con éxito, ir a la página de edición del nuevo producto.
  useEffect(() => {
    if (mode === "create" && state.ok && state.slug && !createdRef.current) {
      createdRef.current = true;
      router.push(`/admin/productos/${state.slug}`);
    }
  }, [state, mode, router]);

  async function uploadFiles(files: FileList): Promise<string[]> {
    const fd = new FormData();
    fd.set("slug", slug);
    fd.set("category", category);
    Array.from(files).forEach((f) => fd.append("files", f));
    const res = await uploadProductImages(fd);
    if (!res.ok) {
      setUploadError(res.message ?? "Error al subir imágenes.");
      return [];
    }
    return res.urls ?? [];
  }

  async function onMainFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setUploadError(null);
    const urls = await uploadFiles(files);
    setUploading(false);
    e.target.value = "";
    if (urls.length) setImages((prev) => [...prev, ...urls]);
  }

  async function onVariantFiles(
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setUploadError(null);
    const urls = await uploadFiles(files);
    setUploading(false);
    e.target.value = "";
    if (urls.length) {
      setVariants((prev) =>
        prev.map((v, i) =>
          i === idx ? { ...v, images: [...v.images, ...urls] } : v,
        ),
      );
    }
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      const [m] = next.splice(from, 1);
      next.splice(to, 0, m);
      return next;
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="mode" value={mode} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="specs" value={JSON.stringify(specs)} />
      <input type="hidden" name="variants" value={JSON.stringify(variants)} />

      {/* ── Básico ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">Básico</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Nombre *</label>
            <input
              name="name"
              required
              defaultValue={initial.name}
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>
                Slug (URL) * {mode === "edit" && "· no editable"}
              </label>
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                readOnly={mode === "edit"}
                className={`${inputCls} ${mode === "edit" ? "bg-slate-50 text-slate-500" : ""}`}
              />
            </div>
            <div>
              <label className={labelCls}>Categoría *</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Product["category"])}
                className={inputCls}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>
              Tipo de equipo (agrupa colecciones, ej: granizadora)
            </label>
            <input name="type" defaultValue={initial.type} className={inputCls} />
          </div>
        </div>
      </section>

      {/* ── Descripción ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">Descripción</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Descripción corta (tarjetas) *</label>
            <textarea
              name="shortDescription"
              required
              rows={2}
              defaultValue={initial.shortDescription}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Descripción larga (markdown)</label>
            <textarea
              name="description"
              rows={8}
              defaultValue={initial.description}
              className={`${inputCls} font-mono`}
            />
          </div>
          <div>
            <label className={labelCls}>
              Bullets de venta (uno por línea)
            </label>
            <textarea
              name="highlights"
              rows={4}
              defaultValue={(initial.highlights ?? []).join("\n")}
              className={inputCls}
            />
          </div>
        </div>
      </section>

      {/* ── Imágenes ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-1">Imágenes</h2>
        <p className="text-xs text-slate-400 mb-4">
          La primera es la principal (tarjeta y galería). Sube el slug y la
          categoría antes de subir fotos.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {images.map((url, i) => (
            <div
              key={url}
              className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square bg-slate-100"
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1 left-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => moveImage(i, i - 1)}
                  className="text-white text-xs px-1.5 py-1"
                  title="Mover izquierda"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="text-white text-xs px-1.5 py-1"
                  title="Quitar"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, i + 1)}
                  className="text-white text-xs px-1.5 py-1"
                  title="Mover derecha"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
        <label className="inline-block text-sm">
          <span className="cursor-pointer inline-block bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg font-medium">
            {uploading ? "Subiendo…" : "+ Subir imágenes"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={onMainFiles}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploadError && (
          <p className="text-sm text-red-600 mt-2">{uploadError}</p>
        )}
      </section>

      {/* ── Especificaciones ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">
          Especificaciones
        </h2>
        <div className="space-y-2">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s.label}
                onChange={(e) =>
                  setSpecs(
                    specs.map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Etiqueta (ej: Capacidad)"
                className={`${inputCls} flex-1`}
              />
              <input
                value={s.value}
                onChange={(e) =>
                  setSpecs(
                    specs.map((x, j) =>
                      j === i ? { ...x, value: e.target.value } : x,
                    ),
                  )
                }
                placeholder="Valor (ej: 30 litros)"
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
                className="text-red-500 px-2 shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSpecs([...specs, { label: "", value: "" }])}
          className="mt-3 text-sm text-primary font-semibold"
        >
          + Agregar especificación
        </button>
      </section>

      {/* ── Variantes de color ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-1">
          Variantes de color
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          Opcional. Cada color con su propio set de fotos. Si no usas variantes,
          déjalo vacío.
        </p>
        <div className="space-y-4">
          {variants.map((v, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4">
              <div className="flex gap-2 items-end mb-3">
                <div className="flex-1">
                  <label className={labelCls}>Color</label>
                  <input
                    value={v.label}
                    onChange={(e) =>
                      setVariants(
                        variants.map((x, j) =>
                          j === i ? { ...x, label: e.target.value } : x,
                        ),
                      )
                    }
                    placeholder="Ej: Rosado"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Swatch</label>
                  <input
                    type="color"
                    value={v.swatch || "#000000"}
                    onChange={(e) =>
                      setVariants(
                        variants.map((x, j) =>
                          j === i ? { ...x, swatch: e.target.value } : x,
                        ),
                      )
                    }
                    className="h-9 w-14 rounded border border-slate-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setVariants(variants.filter((_, j) => j !== i))}
                  className="text-red-500 px-2 pb-2"
                >
                  Quitar
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-2">
                {v.images.map((url, k) => (
                  <div
                    key={url}
                    className="relative aspect-square rounded overflow-hidden border border-slate-200 bg-slate-100"
                  >
                    <Image src={url} alt="" fill sizes="80px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() =>
                        setVariants(
                          variants.map((x, j) =>
                            j === i
                              ? { ...x, images: x.images.filter((_, m) => m !== k) }
                              : x,
                          ),
                        )
                      }
                      className="absolute top-0 right-0 bg-black/50 text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <label className="text-xs">
                <span className="cursor-pointer inline-block bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded font-medium">
                  + Fotos de esta variante
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  multiple
                  onChange={(e) => onVariantFiles(e, i)}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setVariants([...variants, { label: "", swatch: "#000000", images: [] }])
          }
          className="mt-3 text-sm text-primary font-semibold"
        >
          + Agregar variante
        </button>
      </section>

      {/* ── Comercial ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">Comercial</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Precio (COP)</label>
            <input
              name="price"
              inputMode="numeric"
              defaultValue={initial.price ?? ""}
              placeholder="Ej: 8399900"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>SKU</label>
            <input name="sku" defaultValue={initial.sku} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Moneda</label>
            <input
              name="currency"
              defaultValue={initial.currency ?? "COP"}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Estado de stock</label>
            <select
              name="stockStatus"
              defaultValue={initial.stockStatus ?? ""}
              className={inputCls}
            >
              <option value="">— (sin especificar)</option>
              <option value="in_stock">Disponible</option>
              <option value="out_of_stock">Agotado</option>
              <option value="on_request">Bajo pedido</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input
            type="checkbox"
            name="available"
            defaultChecked={initial.available !== false}
          />
          Disponible para el agente de ventas (ZOCAM/WhatsApp)
        </label>
      </section>

      {/* ── Insignia ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">Insignia (badge)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Texto (vacío = sin insignia)</label>
            <input
              name="badgeText"
              defaultValue={initial.badge?.text}
              placeholder="Ej: Más vendido"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Color (clase CSS)</label>
            <input
              name="badgeColor"
              defaultValue={initial.badge?.color ?? "bg-secondary"}
              className={inputCls}
            />
          </div>
        </div>
      </section>

      {/* ── SEO ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Meta título</label>
            <input
              name="metaTitle"
              defaultValue={initial.metaTitle}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Meta descripción</label>
            <textarea
              name="metaDescription"
              rows={2}
              defaultValue={initial.metaDescription}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Keywords (una por línea)</label>
            <textarea
              name="keywords"
              rows={3}
              defaultValue={(initial.keywords ?? []).join("\n")}
              className={inputCls}
            />
          </div>
        </div>
      </section>

      {/* ── Avanzado ── */}
      <section className={sectionCls}>
        <h2 className="font-bold text-lg text-slate-900 mb-4">Avanzado</h2>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Mensaje de WhatsApp prellenado</label>
            <input
              name="whatsappMessage"
              defaultValue={initial.whatsappMessage}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Orden (menor = primero)</label>
            <input
              name="sortOrder"
              inputMode="numeric"
              defaultValue={initial.sortOrder ?? ""}
              className={inputCls}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="hideCalculator"
              defaultChecked={initial.hideCalculator === true}
            />
            Ocultar calculadora de rentabilidad
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initial.published !== false}
            />
            Publicado (visible en la web)
          </label>
        </div>
      </section>

      {/* ── Guardar ── */}
      <div className="flex items-center gap-3 sticky bottom-4 bg-white/90 backdrop-blur rounded-xl p-4 shadow">
        <button
          type="submit"
          disabled={pending || uploading}
          className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl disabled:opacity-60 hover:bg-primary/90 transition-colors"
        >
          {pending ? "Guardando…" : mode === "create" ? "Crear producto" : "Guardar cambios"}
        </button>
        {state.message && (
          <p className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
