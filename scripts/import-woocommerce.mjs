// ────────────────────────────────────────────────────────────
// Importador WooCommerce → datos + imágenes (Supabase Storage).
//
// Uso:  node --env-file=.env.local scripts/import-woocommerce.mjs bebidas
//
// 1) Trae los 253 productos paginando la API REST de WooCommerce.
// 2) Filtra por el set de categorías de la vertical pedida (slug).
// 3) Mapea atributos→specs, precio, stock, descripción HTML.
// 4) Descarga cada imagen y la re-aloja en Supabase Storage (bucket
//    `product-images`), quedando independiente de la tienda vieja.
// 5) Escribe scripts/data/<vertical>-raw.json para revisar y generar
//    luego las descripciones SEO con IA.
// ────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { classify, CATEGORY_LABELS } from "./classify-rules.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const { WC_STORE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET = "product-images";

if (!WC_STORE_URL || !WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
  console.error("Faltan credenciales WC_* en .env.local");
  process.exit(1);
}

const vertical = process.argv[2] || "bebidas";
if (!CATEGORY_LABELS[vertical]) {
  console.error(`Vertical desconocida: ${vertical}. Opciones: ${Object.keys(CATEGORY_LABELS).join(", ")}`);
  process.exit(1);
}

const authHeader =
  "Basic " +
  Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");

async function wcGet(path) {
  const res = await fetch(`${WC_STORE_URL}/wp-json/wc/v3/${path}`, {
    headers: { Authorization: authHeader },
  });
  if (!res.ok) throw new Error(`WC ${path} → ${res.status}`);
  return res;
}

async function fetchAllProducts() {
  const all = [];
  let page = 1;
  while (true) {
    const res = await wcGet(`products?per_page=100&page=${page}&status=publish`);
    const batch = await res.json();
    all.push(...batch);
    const totalPages = Number(res.headers.get("x-wp-totalpages") || "1");
    if (page >= totalPages || batch.length === 0) break;
    page++;
  }
  return all;
}

function extToFromUrl(url, contentType) {
  const m = url.split("?")[0].match(/\.(jpg|jpeg|png|webp|gif|avif)$/i);
  if (m) return m[1].toLowerCase();
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("webp")) return "webp";
  return "jpg";
}

let supabase = null;
async function ensureBucket() {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
  });
  if (error && !/already exists/i.test(error.message)) {
    console.warn("createBucket:", error.message);
  }
}

async function uploadImage(srcUrl, destPath) {
  const res = await fetch(srcUrl);
  if (!res.ok) throw new Error(`img ${srcUrl} → ${res.status}`);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extToFromUrl(srcUrl, contentType);
  const fullPath = `${destPath}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fullPath, buf, { contentType, upsert: true });
  if (error) throw new Error(`upload ${fullPath}: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fullPath);
  return data.publicUrl;
}

function dedupe(arr, keyFn) {
  const seen = new Set();
  return arr.filter((x) => {
    const k = keyFn(x);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

async function main() {
  console.log(`→ Trayendo productos de WooCommerce…`);
  const products = await fetchAllProducts();
  console.log(`  ${products.length} productos en total.`);

  const matched = products.filter((p) => classify(p) === vertical);
  console.log(`  ${matched.length} clasificados en "${vertical}" (${CATEGORY_LABELS[vertical]}).`);

  await ensureBucket();

  const out = [];
  for (const [i, p] of matched.entries()) {
    const images = dedupe(p.images || [], (im) => im.src);
    const hostedImages = [];
    for (const [j, im] of images.entries()) {
      try {
        const url = await uploadImage(im.src, `${vertical}/${p.slug}/${j}`);
        hostedImages.push({ url, alt: im.alt || "" });
      } catch (e) {
        console.warn(`  ! img ${p.slug}#${j}: ${e.message}`);
      }
    }

    out.push({
      wooId: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price ? Number(p.price) : null,
      regularPrice: p.regular_price ? Number(p.regular_price) : null,
      stockStatus: p.stock_status, // instock / outofstock / onbackorder
      currency: "COP",
      categories: (p.categories || []).map((c) => c.slug),
      specs: (p.attributes || []).map((a) => ({
        label: a.name,
        value: (a.options || []).join(", "),
      })),
      shortDescriptionHtml: p.short_description || "",
      descriptionHtml: p.description || "",
      images: hostedImages,
      wooUrl: p.permalink,
    });
    console.log(`  [${i + 1}/${matched.length}] ${p.name} (${hostedImages.length} img)`);
  }

  const dir = join(__dirname, "data");
  await mkdir(dir, { recursive: true });
  const file = join(dir, `${vertical}-raw.json`);
  await writeFile(file, JSON.stringify(out, null, 2), "utf8");
  console.log(`\n✓ Guardado ${out.length} productos en ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
