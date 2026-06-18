/**
 * Comprime TODAS las imágenes del catálogo (Supabase Storage `product-images`)
 * a WebP y las re-sube al mismo bucket con extensión .webp (NO borra los PNG/JPG
 * originales — es no destructivo y reanudable).
 *
 * Motivo: las fuentes pesan ~1.2 MB promedio (hasta 7 MB) y la cuota de
 * Optimización de Imágenes de Vercel está agotada (HTTP 402). Sirviendo WebP
 * livianos directo desde Supabase (con images.unoptimized) las imágenes cargan
 * siempre y rápido, sin depender del optimizador de Vercel.
 *
 * Uso:
 *   node --env-file=.env.local scripts/compress-images-webp.mjs            # todo
 *   node --env-file=.env.local scripts/compress-images-webp.mjs --limit 5  # prueba
 *   node --env-file=.env.local scripts/compress-images-webp.mjs --force    # re-procesa existentes
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "src", "content", "products");
const BUCKET = "product-images";
const MAX_WIDTH = 1200; // suficiente para retina en ficha (~600px) y cards
const QUALITY = 80;
const CONCURRENCY = 6;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY. Corre con --env-file=.env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : 0;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
const IMG_RE = new RegExp(
  `${SUPABASE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/storage/v1/object/public/${BUCKET}/[^"'\\s)]+?\\.(?:png|jpe?g)`,
  "gi",
);

async function collectUrls() {
  const files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".ts"));
  const set = new Set();
  for (const f of files) {
    const txt = await readFile(path.join(CONTENT_DIR, f), "utf8");
    const matches = txt.match(IMG_RE) || [];
    for (const m of matches) set.add(m);
  }
  return [...set];
}

function storagePathFromUrl(url) {
  return url.slice(PREFIX.length); // p.ej. "carnicos/slug/0.png"
}
function toWebpPath(p) {
  return p.replace(/\.(png|jpe?g)$/i, ".webp");
}

async function exists(webpPath) {
  const res = await fetch(`${PREFIX}${webpPath}`, { method: "HEAD" });
  return res.ok;
}

async function processOne(url) {
  const srcPath = storagePathFromUrl(url);
  const webpPath = toWebpPath(srcPath);

  if (!FORCE && (await exists(webpPath))) {
    return { status: "skip", srcPath, webpPath };
  }

  const res = await fetch(url);
  if (!res.ok) return { status: "fail", srcPath, error: `download ${res.status}` };
  const srcBuf = Buffer.from(await res.arrayBuffer());

  let webpBuf;
  try {
    webpBuf = await sharp(srcBuf)
      .rotate() // respeta orientación EXIF
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
  } catch (e) {
    return { status: "fail", srcPath, error: `sharp ${e.message}` };
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(webpPath, webpBuf, { contentType: "image/webp", upsert: true });
  if (error) return { status: "fail", srcPath, error: `upload ${error.message}` };

  return {
    status: "ok",
    srcPath,
    webpPath,
    srcBytes: srcBuf.length,
    webpBytes: webpBuf.length,
  };
}

async function run() {
  let urls = await collectUrls();
  if (LIMIT > 0) urls = urls.slice(0, LIMIT);
  console.log(`Imágenes a procesar: ${urls.length} (concurrencia ${CONCURRENCY}, force=${FORCE})`);

  let ok = 0, skip = 0, fail = 0, srcTotal = 0, webpTotal = 0;
  const failures = [];
  let i = 0;

  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      const url = urls[idx];
      try {
        const r = await processOne(url);
        if (r.status === "ok") {
          ok++;
          srcTotal += r.srcBytes;
          webpTotal += r.webpBytes;
          if (ok % 25 === 0) console.log(`  ok=${ok} skip=${skip} fail=${fail} (${idx + 1}/${urls.length})`);
        } else if (r.status === "skip") {
          skip++;
        } else {
          fail++;
          failures.push(`${r.srcPath}: ${r.error}`);
        }
      } catch (e) {
        fail++;
        failures.push(`${url}: ${e.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log("\n=== RESUMEN ===");
  console.log(`Convertidas: ${ok} | Ya existían (skip): ${skip} | Fallidas: ${fail}`);
  if (ok > 0) {
    const mb = (n) => (n / 1024 / 1024).toFixed(1);
    console.log(`Peso original convertidas: ${mb(srcTotal)} MB → WebP: ${mb(webpTotal)} MB (${Math.round((1 - webpTotal / srcTotal) * 100)}% menos)`);
  }
  if (failures.length) {
    console.log("\nFallidas:");
    for (const f of failures.slice(0, 50)) console.log("  - " + f);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
