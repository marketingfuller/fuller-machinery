"use client";

import { useMemo, useState, useTransition } from "react";
import { setAvailability } from "./actions";

export type InventoryItem = {
  slug: string;
  name: string;
  categoryLabel: string;
  available: boolean;
};

export default function InventoryManager({ items }: { items: InventoryItem[] }) {
  // Estado local de disponibilidad por slug (optimista).
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((i) => [i.slug, i.available])),
  );
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.categoryLabel.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Agrupa por categoría conservando el orden de aparición.
  const groups = useMemo(() => {
    const map = new Map<string, InventoryItem[]>();
    for (const i of filtered) {
      const arr = map.get(i.categoryLabel) ?? [];
      arr.push(i);
      map.set(i.categoryLabel, arr);
    }
    return [...map.entries()];
  }, [filtered]);

  const unavailableCount = items.filter((i) => state[i.slug] === false).length;

  function toggle(slug: string) {
    const next = !state[slug];
    setState((s) => ({ ...s, [slug]: next }));
    setError(null);
    setSavingSlug(slug);
    startTransition(async () => {
      const res = await setAvailability(slug, next);
      setSavingSlug(null);
      if (!res.ok) {
        // Revertir el optimista si falló el guardado.
        setState((s) => ({ ...s, [slug]: !next }));
        setError(res.message ?? "No se pudo guardar. Intenta de nuevo.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar producto o categoría…"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <span className="text-sm text-slate-500">
          {items.length} productos ·{" "}
          <span className={unavailableCount ? "text-red-600 font-semibold" : ""}>
            {unavailableCount} agotados
          </span>
        </span>
      </div>

      {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

      <div className="space-y-6 max-h-[32rem] overflow-y-auto pr-1">
        {groups.map(([category, rows]) => (
          <div key={category}>
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
              {category}
            </h3>
            <ul className="space-y-1.5">
              {rows.map((item) => {
                const on = state[item.slug] !== false;
                return (
                  <li
                    key={item.slug}
                    className="flex items-center justify-between gap-3 py-1.5"
                  >
                    <span className="text-sm text-slate-700 truncate">
                      {item.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(item.slug)}
                      disabled={savingSlug === item.slug}
                      role="switch"
                      aria-checked={on}
                      aria-label={`${item.name}: ${on ? "disponible" : "agotado"}`}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                        on ? "bg-green-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          on ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="text-sm text-slate-400 py-4 text-center">
            Sin resultados para “{query}”.
          </p>
        )}
      </div>
    </div>
  );
}
