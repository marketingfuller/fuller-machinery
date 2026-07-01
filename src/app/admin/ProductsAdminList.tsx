"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  setProductPublished,
  importSeedCatalog,
} from "./products-actions";

type Item = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number | null;
  image: string | null;
  published: boolean;
};

type CategoryOption = { value: string; label: string };

function formatCOP(v: number | null): string {
  if (v === null) return "—";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(v);
}

export default function ProductsAdminList({
  items,
  categories,
  imported,
}: {
  items: Item[];
  categories: CategoryOption[];
  imported: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!cat || i.category === cat) &&
        (!q ||
          i.name.toLowerCase().includes(q) ||
          i.slug.toLowerCase().includes(q)),
    );
  }, [items, query, cat]);

  function togglePublished(item: Item) {
    setBusy(item.slug);
    setError(null);
    startTransition(async () => {
      const res = await setProductPublished(item.slug, !item.published);
      setBusy(null);
      if (!res.ok) setError(res.message ?? "No se pudo actualizar.");
      else router.refresh();
    });
  }

  function remove(item: Item) {
    if (
      !window.confirm(
        `¿Eliminar "${item.name}" de forma permanente? Esta acción no se puede deshacer.`,
      )
    )
      return;
    setBusy(item.slug);
    setError(null);
    startTransition(async () => {
      const res = await deleteProduct(item.slug);
      setBusy(null);
      if (!res.ok) setError(res.message ?? "No se pudo eliminar.");
      else router.refresh();
    });
  }

  function runImport() {
    setBusy("__import__");
    setError(null);
    startTransition(async () => {
      const res = await importSeedCatalog();
      setBusy(null);
      if (!res.ok) setError(res.message ?? "No se pudo importar.");
      else router.refresh();
    });
  }

  return (
    <div>
      {!imported && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-amber-800">
            El catálogo todavía no está en la base de datos. Impórtalo una vez
            para empezar a editarlo (verás los {items.length} productos actuales).
          </p>
          <button
            type="button"
            onClick={runImport}
            disabled={busy === "__import__"}
            className="shrink-0 bg-amber-600 text-white font-bold px-4 py-2 rounded-lg disabled:opacity-60 hover:bg-amber-700 transition-colors"
          >
            {busy === "__import__" ? "Importando…" : "Importar catálogo inicial"}
          </button>
        </div>
      )}

      <p className="text-slate-500 text-sm mb-3">
        Toca <strong>Editar</strong> para cambiar fotos, precio o descripción de
        un producto. Los cambios se ven en la web en segundos.
        <strong>Ocultar</strong> lo quita de la web sin borrarlo;{" "}
        <strong>Eliminar</strong> lo borra para siempre.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto por nombre…"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Mostrando {filtered.length} de {items.length} productos.
      </p>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

      <div className="space-y-1.5">
        {filtered.map((item) => (
          <div
            key={item.slug}
            className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-2.5"
          >
            <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-slate-100">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 truncate">
                {item.name}
              </p>
              <p className="text-xs text-slate-400">
                {item.categoryLabel} · {formatCOP(item.price)}
              </p>
            </div>
            {!item.published && (
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                Oculto
              </span>
            )}
            <button
              type="button"
              onClick={() => togglePublished(item)}
              disabled={busy === item.slug}
              className="text-xs text-slate-600 hover:text-slate-900 disabled:opacity-50 px-2"
              title={item.published ? "Ocultar de la web" : "Publicar"}
            >
              {item.published ? "Ocultar" : "Publicar"}
            </button>
            <Link
              href={`/admin/productos/${item.slug}`}
              className="text-xs font-semibold text-primary hover:underline px-2"
            >
              Editar
            </Link>
            <button
              type="button"
              onClick={() => remove(item)}
              disabled={busy === item.slug}
              className="text-xs text-red-600 hover:text-red-800 disabled:opacity-50 px-2"
            >
              Eliminar
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400 py-6 text-center">
            Ningún producto coincide con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
