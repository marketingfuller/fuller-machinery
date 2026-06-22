/**
 * Sube fotos LOCALES de un producto a Supabase Storage como WebP livianos.
 *   node --env-file=.env.local scripts/upload-product-photos.mjs <categoria/slug> <foto1> <foto2> ...
 * Ej:
 *   node --env-file=.env.local scripts/upload-product-photos.mjs snacks/maquina-hamburguesa-ufo "/c/Users/.../14.png" "/c/.../14 - 1.png"
 *
 * Comprime (sharp, max 1200px, q82) y sube a product-images/<categoria/slug>/<i>.webp
 * (i = orden de los argumentos; la 0 es la principal). Imprime las URLs públicas
 * para pegar en el array `images` del producto.
 */
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "product-images";
const MAX_WIDTH = 1200;
const QUALITY = 82;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;

const [destPrefix, ...files] = process.argv.slice(2);
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Faltan envs. Corre con --env-file=.env.local");
  process.exit(1);
}
if (!destPrefix || files.length === 0) {
  console.error('Uso: scripts/upload-product-photos.mjs <categoria/slug> <foto1> [foto2 ...]');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const PUBLIC = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;

const urls = [];
let i = 0;
for (const file of files) {
  const buf = await readFile(file);
  const webp = await sharp(buf)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  const dest = `${destPrefix}/${i}.webp`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(dest, webp, { contentType: "image/webp", upsert: true });
  if (error) {
    console.error(`✗ ${file}: ${error.message}`);
    process.exit(1);
  }
  const url = `${PUBLIC}${dest}`;
  urls.push(url);
  console.log(`✓ [${i}] ${(buf.length / 1024 / 1024).toFixed(1)}MB → ${(webp.length / 1024).toFixed(0)}KB  ${url}`);
  i++;
}

console.log("\n// images: pega esto en el producto");
console.log(JSON.stringify(urls, null, 2));
