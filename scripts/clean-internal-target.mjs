// ────────────────────────────────────────────────────────────
// Quita target="_blank" / rel="noopener noreferrer" de los <a> que ahora son
// INTERNOS (catálogo/colecciones), dejando intactos los externos (WhatsApp,
// http, TikTok, mailto, tel). Conservador y por líneas.
//   node scripts/clean-internal-target.mjs           (dry-run)
//   node scripts/clean-internal-target.mjs --write    (aplica)
// ────────────────────────────────────────────────────────────

import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WRITE = process.argv.includes("--write");

// Marcadores de enlace EXTERNO (mantienen target/rel). Cubre WhatsApp en todas
// sus formas (waUrl, WHATSAPP_URL, rewrite/build/getWhatsApp), http, redes, tel.
const EXTERNAL = /wa\.me|whatsapp|waurl|rewritewhatsapp|buildwhatsapp|getwhatsapp|https?:\/\/|tiktok|mailto:|tel:|social\.|leftHref|rightHref|\burl\b/i;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(join(ROOT, "src/components"));
let removed = 0;
const report = [];

for (const file of files) {
  const txt = await readFile(file, "utf8");
  if (!txt.includes('target="_blank"')) continue;
  const lines = txt.split("\n");
  const drop = new Set();
  const rel = file.replace(ROOT + "\\", "").replace(ROOT + "/", "");

  for (let i = 0; i < lines.length; i++) {
    if (!/target=\{?["']_blank["']\}?/.test(lines[i])) continue;
    // Busca el href del mismo <a>: hacia atrás hasta abrir la etiqueta o ~8 líneas.
    let hrefLine = null;
    for (let j = i; j >= Math.max(0, i - 8); j--) {
      if (/href=/.test(lines[j])) { hrefLine = lines[j]; break; }
      if (/<(a|motion\.a|Link)\b/.test(lines[j]) && j !== i) break;
    }
    if (hrefLine === null) continue;
    const isExternal = EXTERNAL.test(hrefLine);
    if (isExternal) continue; // dejar como está

    // Interno → marcar target (línea i) y rel adyacente para borrar.
    drop.add(i);
    for (const k of [i - 1, i + 1]) {
      if (lines[k] && /^\s*rel=\{?["']noopener noreferrer["']\}?,?\s*$/.test(lines[k])) drop.add(k);
    }
    report.push(`  ${rel}:${i + 1}\n      href → ${hrefLine.trim().slice(0, 80)}`);
    removed++;
  }

  if (drop.size && WRITE) {
    const kept = lines.filter((_, idx) => !drop.has(idx));
    await writeFile(file, kept.join("\n"), "utf8");
  }
}

console.log(`${WRITE ? "APLICADO" : "DRY-RUN"}: ${removed} enlaces internos limpiados de target/rel.\n`);
console.log(report.join("\n"));
