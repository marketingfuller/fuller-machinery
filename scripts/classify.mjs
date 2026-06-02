// Clasifica cada producto en UNA sola categoría del catálogo (prioridad ordenada).
const { WC_STORE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } = process.env;
const auth = "Basic " + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");
let all = [], page = 1;
while (true) {
  const res = await fetch(`${WC_STORE_URL}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`, { headers: { Authorization: auth } });
  const b = await res.json(); all.push(...b);
  if (page >= Number(res.headers.get("x-wp-totalpages") || 1) || !b.length) break; page++;
}

// Reglas en ORDEN de prioridad. Primera que matchea gana.
// cats: slugs de WooCommerce; re: regex sobre el nombre (fallback para cajón de sastre).
const RULES = [
  { v: "bebidas", cats: ["preparacion-de-bebidas","granizadoras","licuadoras","dispensadores-de-bebidas","exprimidoras-de-naranjas","extractor-de-jugos","maquinas-de-cafe","maquinas-de-cafe-preparacion-de-bebidas","malteadora","gasificadoras","selladoras-de-vasos","rollos-para-selladora-de-vasos","trituradoras-de-hielo","fabricadoras-de-hielo"], re:/granizador|licuadora|capuchin|caf[eé]|exprimidor|extractor de jugo|malteador|dispensador de (bebida|jugo)|selladora de vaso|sello para vaso|rollo.*vaso|triturador.*hielo|fabricadora.*hielo|gasificador|molino.*caf/i },
  { v: "pesaje", cats: ["linea-de-pesaje","basculas-electronicas","basculas-para-bebes","grameras","basculas-de-piso","basculas-inalambricas","bascula-ganadera","medidores-tallimetros"], re:/b[aá]scula|balanza|gramera|tall[ií]metro|pesaje/i },
  { v: "empaque", cats: ["selladora-de-bolsas","empacadoras-al-vacio","rollo-de-empaque-al-vacio","dosificadora","fechadoras-codificadoras"], re:/selladora de bolsa|empacadora|empaque al vac[ií]o|rollo.*vac[ií]o|porta alimentos|dosificador|fechadora|codificadora|selladora de inducci|vinipel/i },
  { v: "carnicos", cats: ["embutidoras"], re:/embutidora|clipadora|molino de carne|sierra|chorizo|llenadora.*pist[oó]n|asador.*(shawarma|kebab)|formador de hamburguesa/i },
  { v: "procesamiento", cats: ["procesador-de-alimentos"], re:/peladora|procesador de (alimento|vegetal|fruta)|rallador|tajadora de (jam|queso)|cortador(a)? (de |en )?(papa|tomate|queso|vegetal|espiral|francesa)|olla a presi[oó]n|laminadora|m[aá]quina.*pasta|tostadora/i },
  { v: "panaderia", cats: ["hornos","amasadoras","batidoras","maquinas-de-donas","escabiladero"], re:/\bhorno|amasadora|batidora|m[aá]quina.*dona|escabiladero|fermentador|divisora|boleadora|cortadora.*pan/i },
  { v: "snacks", cats: ["comida-divertida","waffleras","freidoras","maquina-de-helados","maquinas-de-helado","sandwichera","maquinas-dispensadoras"], re:/waflera|wafflera|waffle|freidor|crispeter|crispeta|helado|sandwich|sanduch|perro|hot dog|arepa|plancha|parrilla|deshidratador|donas?|salchicha|algodoner|vending|dispensadora de snack|fundidora de chocolate|fuente de chocolate|egg roller|galleta de cono|calentador de papa|vaporizador/i },
  { v: "exhibicion", cats: ["vitrinas-de-calefaccion"], re:/vitrina.*(calefacc|sushi|caliente|exhib)|exhibidor.*(caliente|comida)/i },
  { v: "buffet", cats: ["catering","bano-maria","samovar"], re:/ba[ñn]o.*mar[ií]a|samovar|chafing|azafate|olla sopera|calentador de (alimento|salsa)|bandeja/i },
  { v: "refrigeracion", cats: ["maquinas-de-frio","vitrina-de-refrigeracion"], re:/refrigerador|congelador|nevera|vitrina.*refriger|mesa refrigerada|enfriador|exhibidor.*(carne|refriger)/i },
  { v: "mobiliario", cats: ["mesas-de-trabajo","mesas-de-trabajo-2","utensilios-de-cocina"], re:/mesa de trabajo|fregadero|estanter|pala para|pinza|utensilio|cuchar|mes[oó]n/i },
];

const result = {};
const unclassified = [];
for (const p of all) {
  const slugs = new Set((p.categories||[]).map(c=>c.slug));
  let assigned = null;
  for (const r of RULES) { if (r.cats.some(c=>slugs.has(c))) { assigned = r.v; break; } }
  if (!assigned) for (const r of RULES) { if (r.re && r.re.test(p.name)) { assigned = r.v; break; } }
  if (!assigned) { unclassified.push(p.name); continue; }
  (result[assigned] ??= []).push(p.name);
}

const order = ["bebidas","snacks","panaderia","empaque","procesamiento","refrigeracion","carnicos","pesaje","exhibicion","buffet","mobiliario"];
let total=0;
for (const v of order) { const n=(result[v]||[]).length; total+=n; console.log(`\n=== ${v.toUpperCase()} (${n}) ===`); (result[v]||[]).forEach(n=>console.log("   "+n.slice(0,72))); }
console.log(`\n=== SIN CLASIFICAR (${unclassified.length}) ===`); unclassified.forEach(n=>console.log("   "+n.slice(0,72)));
console.log(`\nTOTAL clasificados: ${total} / ${all.length}`);
