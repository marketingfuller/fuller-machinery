"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Plus, X } from "lucide-react";
import { searchProducts, type SearchItem } from "@/lib/search";
import { formatCOP } from "@/lib/products-shared";

// Índice del catálogo: se descarga una vez y se comparte entre instancias.
let indexCache: Promise<SearchItem[]> | null = null;
function loadIndex(): Promise<SearchItem[]> {
  if (!indexCache) {
    indexCache = fetch("/api/search-index")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return indexCache;
}

export type AddableMachine = { slug: string; name: string; price: number; type?: string };

/**
 * Buscador (estilo header) para agregar al kit cualquier máquina del catálogo
 * que no esté en las opciones curadas. Al elegir un resultado, lo suma al cálculo.
 */
export default function KitMachineSearch({
  onAdd,
  excludeSlugs,
}: {
  onAdd: (m: AddableMachine) => void;
  excludeSlugs: Set<string>;
}) {
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<SearchItem[] | null>(null);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const ensureIndex = useCallback(async () => {
    if (index) return index;
    const data = await loadIndex();
    setIndex(data);
    return data;
  }, [index]);

  useEffect(() => {
    const term = q.trim();
    let active = true;
    const id = setTimeout(async () => {
      if (!term) {
        if (active) setResults([]);
        return;
      }
      const data = index ?? (await ensureIndex());
      if (!active) return;
      setResults(searchProducts(data, term, 24));
    }, term ? 110 : 0);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [q, index, ensureIndex]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const shown = results
    .filter((r) => typeof r.price === "number" && r.price > 0 && !excludeSlugs.has(r.slug))
    .slice(0, 8);

  function add(item: SearchItem) {
    onAdd({ slug: item.slug, name: item.name, price: item.price as number, type: item.type });
    setQ("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        <input
          type="search"
          value={q}
          placeholder="Busca otra máquina del catálogo…"
          onFocus={() => {
            ensureIndex();
            setOpen(true);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          aria-label="Buscar máquina del catálogo para agregar"
          className="w-full bg-white/10 text-white placeholder:text-white/45 rounded-xl pl-10 pr-9 py-2.5 text-sm border border-white/15 focus:outline-none focus:bg-white/15 focus:border-accent transition-colors"
        />
        {q && (
          <button
            type="button"
            aria-label="Limpiar"
            onClick={() => {
              setQ("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl shadow-black/30 border border-slate-100 overflow-hidden">
          {shown.length === 0 ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              Sin resultados para «{q.trim()}».
            </p>
          ) : (
            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {shown.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => add(p)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="relative shrink-0 size-11 rounded-lg bg-slate-50 overflow-hidden border border-slate-100">
                      {p.image && (
                        <Image src={p.image} alt={p.name} fill sizes="44px" className="object-contain p-1" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-800 truncate">{p.name}</span>
                      <span className="block text-xs text-slate-400">{p.categoryLabel}</span>
                    </span>
                    {typeof p.price === "number" && p.price > 0 && (
                      <span className="shrink-0 text-sm font-bold text-primary">{formatCOP(p.price)}</span>
                    )}
                    <span className="shrink-0 inline-flex items-center justify-center size-7 rounded-full bg-accent/10 text-accent">
                      <Plus size={16} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
