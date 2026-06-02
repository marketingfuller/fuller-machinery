"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchProducts, type SearchItem } from "@/lib/search";

const fmtCOP = (v: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(v);

// El índice se descarga una sola vez y se comparte entre instancias del buscador.
let indexCache: Promise<SearchItem[]> | null = null;
function loadIndex(): Promise<SearchItem[]> {
  if (!indexCache) {
    indexCache = fetch("/api/search-index")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return indexCache;
}

type Props = {
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  /** "header" = compacto sobre fondo oscuro; "page" = grande. */
  variant?: "header" | "page";
  className?: string;
};

export default function SearchBox({
  initialQuery = "",
  placeholder = "Buscar granizadora, freidora, báscula…",
  autoFocus = false,
  variant = "header",
  className = "",
}: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
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

  // Recalcula resultados con debounce al teclear.
  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      return;
    }
    let active = true;
    const id = setTimeout(async () => {
      const data = index ?? (await ensureIndex());
      if (!active) return;
      setResults(searchProducts(data, term));
    }, 110);
    return () => {
      active = false;
      clearTimeout(id);
    };
  }, [q, index, ensureIndex]);

  // Cierra al hacer click fuera.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = () => {
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    router.push(`/productos?q=${encodeURIComponent(term)}`);
  };

  const shown = results.slice(0, 8);

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className="relative">
        <Search
          size={variant === "page" ? 20 : 16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="search"
          value={q}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onFocus={() => {
            ensureIndex();
            setOpen(true);
          }}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") setOpen(false);
          }}
          aria-label="Buscar productos"
          className={
            variant === "page"
              ? "w-full bg-white text-slate-800 placeholder:text-slate-400 rounded-full pl-11 pr-10 py-3.5 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
              : "w-full bg-white/10 text-white placeholder:text-white/50 rounded-full pl-10 pr-9 py-2 text-sm border border-white/15 focus:outline-none focus:bg-white/15 focus:border-accent transition-colors"
          }
        />
        {q && (
          <button
            type="button"
            aria-label="Limpiar"
            onClick={() => {
              setQ("");
              setResults([]);
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              variant === "page" ? "text-slate-400 hover:text-slate-700" : "text-white/50 hover:text-white"
            }`}
          >
            <X size={variant === "page" ? 18 : 15} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute z-50 mt-2 w-full min-w-[280px] bg-white rounded-2xl shadow-2xl shadow-black/20 border border-slate-100 overflow-hidden">
          {shown.length === 0 ? (
            <p className="px-4 py-6 text-sm text-slate-500 text-center">
              Sin resultados para «{q.trim()}». Prueba con otro término.
            </p>
          ) : (
            <>
              <ul className="max-h-[60vh] overflow-y-auto py-2">
                {shown.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/productos/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors"
                    >
                      <span className="relative shrink-0 size-11 rounded-lg bg-slate-50 overflow-hidden border border-slate-100">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="44px"
                            className="object-contain p-1"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-800 truncate">
                          {p.name}
                        </span>
                        <span className="block text-xs text-slate-400">{p.categoryLabel}</span>
                      </span>
                      {typeof p.price === "number" && p.price > 0 && (
                        <span className="shrink-0 text-sm font-bold text-primary">
                          {fmtCOP(p.price)}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submit}
                className="block w-full text-center bg-slate-50 hover:bg-slate-100 text-primary font-bold text-sm py-3 border-t border-slate-100 transition-colors"
              >
                Ver {results.length} resultado{results.length === 1 ? "" : "s"} de «{q.trim()}» →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
