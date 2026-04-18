"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import EmprendeFeatured from "./EmprendeFeatured";
import EmprendeGrid from "./EmprendeGrid";
import type { Post } from "@/lib/emprende";

const ALL = "Todos";

export default function EmprendeBrowser({
  posts,
  featured,
}: {
  posts: Post[];
  featured: Post | null;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((p) => unique.add(p.category));
    if (featured) unique.add(featured.category);
    return [ALL, ...Array.from(unique).sort()];
  }, [posts, featured]);

  const normalized = query.trim().toLowerCase();
  const filtering = normalized.length > 0 || category !== ALL;

  const filterFn = (p: Post) => {
    if (category !== ALL && p.category !== category) return false;
    if (!normalized) return true;
    const haystack = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
    return haystack.includes(normalized);
  };

  const filteredGrid = posts.filter(filterFn);
  const showFeatured = !filtering && featured;
  const featuredMatches = featured && filterFn(featured);

  // When filtering, include the featured post in the grid if it matches
  const gridPosts = filtering && featuredMatches ? [featured, ...filteredGrid] : filteredGrid;

  return (
    <div id="articulos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos — ej: waffle, granizados, panadería..."
            className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all ${
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {showFeatured && <EmprendeFeatured post={featured} />}

      {gridPosts.length > 0 ? (
        <EmprendeGrid posts={gridPosts} />
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <div className="text-slate-400 mb-3">
            <Search size={32} className="mx-auto" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-800 mb-1">Sin resultados</h3>
          <p className="text-slate-500 text-sm">
            No encontramos artículos que coincidan con{" "}
            {normalized && <span className="font-semibold">&ldquo;{query}&rdquo;</span>}
            {normalized && category !== ALL && " en "}
            {category !== ALL && <span className="font-semibold">{category}</span>}.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-secondary text-sm font-bold transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
