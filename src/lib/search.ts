// ────────────────────────────────────────────────────────────
// Lógica de búsqueda de productos — pura, sin dependencias de server/client.
// La usan el SearchBox (cliente, instantáneo) y /productos?q= (servidor).
//
// Reglas:
//  - Normaliza acentos y mayúsculas ("piña" == "pina", "Café" == "cafe").
//  - Tokeniza la consulta; EXIGE que cada término haga match en algún campo
//    (AND) → resultados precisos ("freidora gas" = freidora Y gas).
//  - Puntúa por campo: nombre (prefijo > palabra > substring) > keywords >
//    categoría/tipo. Bonus si el nombre contiene la frase completa.
// ────────────────────────────────────────────────────────────

export type SearchItem = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  type?: string;
  price?: number | null;
  image?: string | null;
  keywords?: string[];
};

/** minúsculas, sin acentos, sin signos → comparación robusta. */
export function normalize(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  return normalize(query).split(" ").filter(Boolean);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Devuelve los productos que matchean la consulta, ordenados por relevancia.
 * @param limit  0 = sin límite.
 */
export function searchProducts<T extends SearchItem>(
  items: T[],
  query: string,
  limit = 0,
): T[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const phrase = tokens.join(" ");

  const scored: { item: T; score: number }[] = [];
  for (const item of items) {
    const name = normalize(item.name);
    const kw = normalize((item.keywords ?? []).join(" "));
    const cat = normalize(`${item.categoryLabel} ${item.type ?? ""}`);

    let score = 0;
    let allMatch = true;
    for (const t of tokens) {
      let best = 0;
      if (name.startsWith(t)) best = 12;
      else if (new RegExp(`\\b${escapeRe(t)}`).test(name)) best = 9;
      else if (name.includes(t)) best = 6;
      if (best < 5 && kw.includes(t)) best = Math.max(best, 5);
      if (best < 4 && cat.includes(t)) best = Math.max(best, 4);
      if (best === 0) {
        allMatch = false;
        break;
      }
      score += best;
    }
    if (!allMatch) continue;
    if (name.includes(phrase)) score += 8; // frase completa en el nombre
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
  const out = scored.map((s) => s.item);
  return limit > 0 ? out.slice(0, limit) : out;
}
