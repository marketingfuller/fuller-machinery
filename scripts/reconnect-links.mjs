// ────────────────────────────────────────────────────────────
// Codemod: repinta los enlaces del store WooCommerce viejo al catálogo nativo.
//   node scripts/reconnect-links.mjs          (dry-run: solo reporta)
//   node scripts/reconnect-links.mjs --write   (aplica los cambios)
//
// - /producto/SLUG/  → /productos/SLUG  (resuelto contra slugs nativos reales
//   vía wooUrl; si no existe, se DEJA y se reporta para revisión manual).
// - ?s=KEYWORD / categoria-producto/X → colección o /productos?categoria= (mapa).
// - /shop/ y dominio raíz → /productos.
// Cualquier URL del store no cubierta se reporta (no se rompe nada en silencio).
// ────────────────────────────────────────────────────────────

import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WRITE = process.argv.includes("--write");

// ── 1. Mapa slug-viejo → slug-nativo (desde wooUrl + slugs de los seeds) ──
const prodDir = join(ROOT, "src/content/products");
const nativeSlugs = new Set();
const wooToNative = {};
for (const f of await readdir(prodDir)) {
  if (!f.endsWith(".ts") || f === "types.ts" || f === "collections.ts") continue;
  const txt = await readFile(join(prodDir, f), "utf8");
  for (const o of txt.split(/\{\s*"slug":/).slice(1)) {
    const slug = (o.match(/^\s*"([^"]+)"/) || [])[1];
    const woo = (o.match(/"wooUrl":\s*"([^"]+)"/) || [])[1];
    if (slug) nativeSlugs.add(slug);
    if (woo) {
      const m = woo.match(/\/producto\/([^/]+)\//);
      if (m) wooToNative[m[1]] = slug;
    }
  }
}
const resolveProduct = (slug) =>
  wooToNative[slug] || (nativeSlugs.has(slug) ? slug : null);

// ── 2. Mapa de búsquedas/categorías → destino nativo ──
// (clave = subcadena distintiva en la URL vieja; orden: específico → genérico)
const SEARCH_MAP = [
  ["s=wafflera+erotica", "/productos?categoria=novelty"],
  ["s=selladora+de+vasos", "/colecciones/selladoras-de-vasos"],
  ["s=molino+de+carne", "/colecciones/equipos-para-carniceria"],
  ["s=procesador", "/colecciones/procesamiento-de-alimentos"],
  ["s=embutidora", "/colecciones/equipos-para-carniceria"],
  ["s=granizadora", "/colecciones/granizadoras-industriales"],
  ["s=licuadora", "/colecciones/licuadoras-industriales"],
  ["s=cafe", "/colecciones/capuchineras-maquinas-de-cafe"],
  ["s=crispetera", "/colecciones/crispeteras"],
  ["s=algodonera", "/colecciones/maquinas-de-algodon-de-azucar"],
  ["s=salchichas", "/colecciones/asadores-de-salchichas"],
  ["s=wafflera", "/colecciones/wafleras-industriales"],
  ["s=waffles", "/colecciones/wafleras-industriales"],
  ["s=donas", "/productos?categoria=panaderia"],
  ["s=hornos", "/colecciones/hornos-industriales"],
  ["s=horno", "/colecciones/hornos-industriales"],
  ["s=amasadora", "/colecciones/amasadoras-industriales"],
  ["s=laminadora", "/colecciones/procesamiento-de-alimentos"],
  ["s=camara", "/colecciones/hornos-industriales"],
  ["s=refrigerador", "/colecciones/refrigeracion-comercial"],
  ["s=carne", "/productos?categoria=carnicos"],
  ["s=panaderia", "/productos?categoria=panaderia"],
  // Categorías
  ["categoria-producto/comida-divertida", "/productos?categoria=snacks"],
  ["categoria-producto/preparacion-de-bebidas", "/productos?categoria=bebidas"],
  ["categoria-producto/preparacion-de-alimentos/hornos", "/colecciones/hornos-industriales"],
  ["categoria-producto/preparacion-de-alimentos/equipos-industriales", "/productos"],
  ["categoria-producto/preparacion-de-alimentos", "/productos?categoria=procesamiento"],
  ["categoria-producto/maquinas-de-frio", "/productos?categoria=refrigeracion"],
  ["categoria-producto/equipos-de-empaque", "/productos?categoria=empaque"],
];

const DOMAIN = "https://tienda.fullermachinery.com";
// Captura una URL completa del store (hasta comilla, paréntesis o espacio).
const URL_RE = /https:\/\/tienda\.fullermachinery\.com[^\s"')]*/g;

function mapUrl(url) {
  // Producto puntual
  const pm = url.match(/\/producto\/([^/]+)\/?/);
  if (pm) {
    const native = resolveProduct(pm[1]);
    return native ? { to: `/productos/${native}`, kind: "producto" } : { to: null, kind: "producto-no-encontrado" };
  }
  // Búsqueda / categoría
  for (const [needle, to] of SEARCH_MAP) {
    if (url.includes(needle)) return { to, kind: "busqueda/categoria" };
  }
  // Shop o dominio raíz
  if (/\/shop\/?/.test(url) || url.replace(/\/+$/, "") === DOMAIN) {
    return { to: "/productos", kind: "shop" };
  }
  return { to: null, kind: "sin-mapeo" };
}

// ── 3. Recolectar archivos objetivo ──
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (p.includes(join("content", "products"))) continue; // no tocar seeds
      out.push(...(await walk(p)));
    } else if (/\.(tsx?|md)$/.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}
const files = (await walk(join(ROOT, "src"))).filter((f) => !f.endsWith("settings.ts"));

// ── 4. Procesar ──
let changed = 0;
const unresolved = [];
for (const file of files) {
  let txt = await readFile(file, "utf8");
  if (!txt.includes(DOMAIN)) continue;
  let fileChanges = 0;
  const rel = file.replace(ROOT + "\\", "").replace(ROOT + "/", "");
  txt = txt.replace(URL_RE, (url) => {
    const { to, kind } = mapUrl(url);
    if (!to) {
      unresolved.push(`  [${kind}] ${rel}\n      ${url}`);
      return url;
    }
    fileChanges++;
    console.log(`  [${kind}] ${rel}\n      ${url}\n   -> ${to}`);
    return to;
  });
  if (fileChanges > 0) {
    changed += fileChanges;
    if (WRITE) await writeFile(file, txt, "utf8");
  }
}

console.log(`\n${WRITE ? "APLICADO" : "DRY-RUN"}: ${changed} enlaces repintados en ${files.length} archivos escaneados.`);
if (unresolved.length) {
  console.log(`\n⚠️  ${unresolved.length} sin mapear (revisar a mano):`);
  console.log(unresolved.join("\n"));
}
