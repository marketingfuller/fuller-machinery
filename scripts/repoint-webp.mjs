/**
 * Reapunta las referencias de imágenes del catálogo (Supabase `product-images`)
 * de .png/.jpg/.jpeg → .webp. Solo toca URLs del bucket product-images; no altera
 * otras rutas. Idempotente.
 *
 * Uso:
 *   node scripts/repoint-webp.mjs           # dry-run (muestra cuántas cambiaría)
 *   node scripts/repoint-webp.mjs --write   # aplica los cambios
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "src", "content", "products");
const WRITE = process.argv.includes("--write");

// Cambia la extensión solo dentro de URLs que contienen /product-images/
const RE = /(\/product-images\/[^"'\s)]+?)\.(png|jpe?g)\b/gi;

const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".ts"));
let totalChanges = 0;

for (const f of files) {
  const fp = path.join(CONTENT_DIR, f);
  const txt = await readFile(fp, "utf8");
  let count = 0;
  const out = txt.replace(RE, (_m, base) => {
    count++;
    return `${base}.webp`;
  });
  if (count > 0) {
    totalChanges += count;
    console.log(`${f}: ${count} referencias → .webp`);
    if (WRITE) await writeFile(fp, out, "utf8");
  }
}

console.log(`\nTotal: ${totalChanges} referencias ${WRITE ? "reescritas" : "(dry-run, usa --write para aplicar)"}`);
