// Inventario de tipos de equipo por categoría, con ejemplos reales de nombres.
// Reusa la MISMA lógica getType del compose para reflejar la realidad del catálogo.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getType(slug, name) {
  const s = (slug + " " + name).toLowerCase();
  if (/erotic|pene|vagina/.test(s)) return "novelty";
  if (/waflera|wafflera|waffle/.test(s)) return "wafflera";
  if (/freidor/.test(s)) return "freidora";
  if (/crispeter|crispeta|palomit/.test(s)) return "crispetera";
  if (/algodoner/.test(s)) return "algodonera";
  if (/salchicha/.test(s)) return "asador-salchichas";
  if (/chocolate/.test(s)) return "chocolate";
  if (/helado|galleta de cono/.test(s)) return "helado";
  if (/sandwich|sanduch/.test(s)) return "sandwichera";
  if (/plancha|parrilla/.test(s)) return "plancha";
  if (/deshidratador/.test(s)) return "deshidratador";
  if (/egg roller/.test(s)) return "egg-roller";
  if (/vending|dispensadora de snack/.test(s)) return "vending";
  if (/formador de hamburguesa/.test(s)) return "hamburguesa";
  if (/calentador de papa|vaporizador/.test(s)) return "calientes";
  if (/\bhorno/.test(s)) return "horno";
  if (/amasadora/.test(s)) return "amasadora";
  if (/batidora/.test(s)) return "batidora";
  if (/escabiladero/.test(s)) return "escabiladero";
  if (/empacadora|empaque al vac/.test(s)) return "empacadora";
  if (/selladora de bolsa/.test(s)) return "selladora-bolsas";
  if (/rollo|sello para|porta alimento/.test(s)) return "consumible-empaque";
  if (/dosificad/.test(s)) return "dosificadora";
  if (/b[aá]scula|balanza|gramera/.test(s)) return "bascula";
  if (/tall[ií]metro/.test(s)) return "tallimetro";
  if (/vitrina.*(calefacc|caliente|sushi|exhib)/.test(s)) return "vitrina-caliente";
  if (/refrigerador|congelador|nevera|vitrina.*refriger|enfriad|botellero/.test(s)) return "refrigeracion";
  if (/ba[ñn]o.*mar|samovar|azafate|chafing|bandeja/.test(s)) return "buffet";
  if (/molino de carne|embutidora|sierra|chorizo|clipadora|shawarma|kebab/.test(s)) return "carnicos";
  if (/peladora|procesador|rallador|tajadora|cortador|laminadora|\bpasta|olla a presi/.test(s)) return "procesamiento";
  if (/mesa de trabajo|fregadero|estanter|utensilio|\bpala|pinza|cuchar|dispensador de sal/.test(s)) return "mobiliario";
  // Bebidas (no estaban en getType porque bebidas usa compose-bebidas-seed)
  if (/granizadora|raspado/.test(s)) return "granizadora";
  if (/capuchin|cafeter|caf[eé]|express|espresso|molino de caf/.test(s)) return "cafe";
  if (/licuadora/.test(s)) return "licuadora";
  if (/exprimidor|extractor|jugo/.test(s)) return "exprimidor";
  if (/dispensador de (jugo|bebida|refresco)|cofre|surtidora/.test(s)) return "dispensador-bebida";
  if (/hielo/.test(s)) return "maquina-hielo";
  if (/fuente de soda|soda|gaseosa|post mix/.test(s)) return "soda";
  return "generico";
}

const verticals = ["bebidas","snacks","panaderia","empaque","pesaje","exhibicion","procesamiento","buffet","refrigeracion","mobiliario","carnicos"];
const byType = {};
for (const v of verticals) {
  let raw;
  try { raw = JSON.parse(await readFile(join(__dirname, "data", `${v}-raw.json`), "utf8")); }
  catch { continue; }
  for (const p of raw) {
    const t = getType(p.slug, p.name);
    (byType[t] ||= { vertical: v, count: 0, names: [] });
    byType[t].count++;
    if (byType[t].names.length < 6) byType[t].names.push(p.name.replace(/\s+/g, " ").trim());
  }
}
const sorted = Object.entries(byType).sort((a, b) => b[1].count - a[1].count);
console.log(`TIPOS: ${sorted.length} | PRODUCTOS: ${sorted.reduce((n, [, d]) => n + d.count, 0)}\n`);
for (const [type, d] of sorted) {
  console.log(`### ${type} (${d.count}) — cat:${d.vertical}`);
  for (const n of d.names) console.log(`   · ${n}`);
}
