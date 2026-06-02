// ────────────────────────────────────────────────────────────
// Motor genérico: compone src/content/products/<vertical>.ts desde
// scripts/data/<vertical>-raw.json. Sirve para TODAS las categorías.
//   node scripts/compose-vertical.mjs snacks
//
// - Nombre SEO: limpia los nombres de WooCommerce (pipes→·, MAYÚSCULAS→Title,
//   recorta colas de marketing). Override manual opcional por slug en NAMES.
// - Descripción única por TIPO (teje specs reales + caso de uso) → no thin.
// - metaDescription (~155c, geo+CTA) y keywords por tipo, automáticos.
// - Detecta "novelty" (wafleras eróticas) → categoría aparte discreta.
// ────────────────────────────────────────────────────────────

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CATEGORY_LABELS } from "./classify-rules.mjs";
import { STAR_COPY } from "./star-copy.mjs";
import { KW_RESEARCH, mergeKeywords } from "./keyword-research.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const vertical = process.argv[2];
if (!vertical || !CATEGORY_LABELS[vertical]) {
  console.error(`Uso: node compose-vertical.mjs <vertical>. Opciones: ${Object.keys(CATEGORY_LABELS).join(", ")}`);
  process.exit(1);
}

const raw = JSON.parse(
  await readFile(join(__dirname, "data", `${vertical}-raw.json`), "utf8"),
);

// Copy "estrella" escrito a mano para los productos insignia de la categoría.
const OVERRIDES = STAR_COPY[vertical] || {};

const stripHtml = (s) =>
  (s || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();

// Conectores que van en minúscula (salvo si son la primera palabra).
const LOWER = new Set(["de","del","la","las","el","los","y","e","o","u","a","al","en","con","por","para","sin","su","sus","the"]);
// Unidades que mantienen su casing correcto.
const UNITS = { kg:"kg", g:"g", mg:"mg", l:"L", lt:"L", ml:"ml", oz:"oz", cm:"cm", mm:"mm", m:"m", w:"W", kw:"kW", hp:"HP", v:"V", hz:"Hz", rpm:"rpm" };
const titleCase = (s) =>
  s
    .split(/\s+/)
    .map((wRaw, i) => {
      const w = wRaw.toLocaleLowerCase("es");
      const u = w.match(/^(\d+)(kg|kw|hp|ml|lt|oz|cm|mm|hz|rpm|mg|[lwvg])$/i); // 30l, 1200w
      if (u && UNITS[u[2]]) return u[1] + UNITS[u[2]];
      if (UNITS[w]) return UNITS[w];
      // Código de modelo (dígito+letra, o sin vocales ≥3) → mayúsculas. Ej. JCETPL-820.
      const letters = wRaw.replace(/[^a-záéíóúñü]/gi, "");
      const isCode =
        (/\d/.test(wRaw) && /[a-z]/i.test(wRaw)) ||
        (letters.length >= 3 && !/[aeiouáéíóú]/i.test(letters));
      if (isCode) return wRaw.toUpperCase();
      if (i > 0 && LOWER.has(w)) return w;
      return w.replace(/^([a-záéíóúñü])/, (m) => m.toLocaleUpperCase("es"));
    })
    .join(" ");

// Cola de marketing que no aporta a SEO (se descarta del nombre si no tiene números).
const FLUFF = /^(alta (capacidad|potencia|precisi[oó]n).*|uso (comercial|dom[eé]stico|rudo).*|eficiente.*|compact[oa].*|profesional|comercial|industrial|f[aá]cil.*|pr[aá]ctic[oa].*|resistente.*|ideal.*|estilo profesional|alta calidad)$/i;

// Limpia el nombre WooCommerce → nombre SEO legible y front-loaded.
function cleanName(name) {
  let n = name.trim();
  // Si está mayormente en MAYÚSCULAS (más mayúsculas que minúsculas) → Title Case.
  const up = (n.match(/[A-ZÁÉÍÓÚÑ]/g) || []).length;
  const lo = (n.match(/[a-záéíóúñ]/g) || []).length;
  if (up > 0 && up >= lo) n = titleCase(n);
  if (n.includes("|")) {
    let parts = n.split("|").map((s) => s.trim()).filter(Boolean);
    // Descarta segmentos de puro marketing (sin dígitos).
    parts = parts.filter((p, i) => i === 0 || /\d/.test(p) || !FLUFF.test(p));
    n = parts.slice(0, 3).join(" · ");
  }
  return n.replace(/\s+/g, " ").trim();
}

const mapStock = (s) => (s === "instock" ? "in_stock" : s === "outofstock" ? "out_of_stock" : "on_request");
const FIX_SPEC_LABEL = { DImensiones: "Dimensiones" };

// ── TIPOS globales (se amplía por categoría conforme escalamos) ──
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
  // Panadería
  if (/dona/.test(s)) return "donas";
  if (/\bhorno/.test(s)) return "horno";
  if (/amasadora/.test(s)) return "amasadora";
  if (/batidora/.test(s)) return "batidora";
  if (/escabiladero/.test(s)) return "escabiladero";
  if (/tostadora/.test(s)) return "tostadora";
  // Empaque (consumibles ANTES que empacadora: "rollo empacadora al vacío" es insumo)
  if (/rollo|sello para|porta alimento/.test(s)) return "consumible-empaque";
  if (/empacadora|empaque al vac/.test(s)) return "empacadora";
  if (/selladora.*bolsa/.test(s)) return "selladora-bolsas";
  if (/dosificad/.test(s)) return "dosificadora";
  if (/dispensador.*(cereal|granel|grano|acr[ií]lico)/.test(s)) return "dispensador-seco";
  // Pesaje
  if (/b[aá]scula|balanza|gramera/.test(s)) return "bascula";
  if (/tall[ií]metro/.test(s)) return "tallimetro";
  // Exhibición (vitrinas calientes)
  if (/vitrina.*(calefacc|caliente|sushi|exhib)/.test(s)) return "vitrina-caliente";
  // Refrigeración
  if (/refrigerador|congelador|nevera|vitrina.*(refriger|enfriam)|enfriad|enfriamiento|botellero/.test(s)) return "refrigeracion";
  // Buffet
  if (/ba[ñn]o.*mar|samovar|azafate|chafing|bandeja|olla sopera|calentador(a)?.*(salsa|alimento)|mesa refrigerada/.test(s)) return "buffet";
  // Cárnicos
  if (/molino de carne|embutidora|sierra|chorizo|clipadora|shawarma|kebab/.test(s)) return "carnicos";
  // Procesamiento de alimentos
  if (/peladora|procesador|rallador|tajadora|cortador|laminadora|\bpasta|olla a presi/.test(s)) return "procesamiento";
  // Mobiliario
  if (/mesa de trabajo|fregadero|estanter|utensilio|\bpala|pinza|cuchar|dispensador de sal/.test(s)) return "mobiliario";
  return "generico";
}

const TYPE_COPY = {
  wafflera: { h1: "Waffles recién hechos que llenan tu local de clientes", use: "Cafeterías, food trucks, heladerías y negocios de postres que venden waffles tradicionales, de burbuja y rellenos.", kw: ["waflera comercial", "máquina de waffles", "waflera de burbuja", "wafflera profesional Colombia"] },
  freidora: { h1: "Fritura rápida y pareja para alto volumen", use: "Comidas rápidas, asaderos, food trucks y restaurantes que fríen papas, pollo, empanadas y apanados todo el día.", kw: ["freidora industrial", "freidora comercial", "freidora de papas", "freidora a gas Colombia"] },
  crispetera: { h1: "Crispetas calientes que se venden por el aroma", use: "Cines, eventos, kioscos, heladerías y negocios de comida divertida que venden crispetas y palomitas.", kw: ["crispetera comercial", "máquina de crispetas", "máquina de palomitas", "crispetera Colombia"] },
  algodonera: { h1: "Algodón de azúcar, pura ganancia por porción", use: "Eventos, fiestas infantiles, parques y kioscos que venden algodón de azúcar de alta rotación.", kw: ["algodonera", "máquina de algodón de azúcar", "algodonera con carro"] },
  "asador-salchichas": { h1: "Salchichas siempre listas y a la vista", use: "Tiendas, kioscos, estaciones y negocios de perros calientes que necesitan exhibir y mantener salchichas calientes.", kw: ["asador de salchichas", "rodillos para salchichas", "máquina de perros calientes"] },
  chocolate: { h1: "Chocolate fundido que vuelve irresistible tu menú", use: "Heladerías, fresas con crema, postres y eventos que bañan fruta, waffles y postres en chocolate.", kw: ["fundidora de chocolate", "fuente de chocolate", "máquina de chocolate"] },
  helado: { h1: "Helado suave y conos al instante", use: "Heladerías, cafeterías y negocios de postres que venden helado suave y conos recién hechos.", kw: ["máquina de helado suave", "máquina de helado", "máquina de conos"] },
  sandwichera: { h1: "Sándwiches y paninis calientes en minutos", use: "Cafeterías, panaderías y comidas rápidas que ofrecen sándwiches, paninis y tostados.", kw: ["sandwichera comercial", "máquina de sándwiches", "sanduchera industrial"] },
  plancha: { h1: "Plancha y parrilla para comida rápida", use: "Asaderos, food trucks y restaurantes que preparan carnes, arepas, hamburguesas y desayunos a la plancha.", kw: ["plancha eléctrica comercial", "parrilla eléctrica", "asador eléctrico"] },
  deshidratador: { h1: "Deshidrata fruta, carne y snacks sin perder rotación", use: "Negocios saludables, snacks y obradores que deshidratan fruta, carne (jerky) y vegetales.", kw: ["deshidratador de alimentos", "deshidratador industrial", "deshidratador de frutas"] },
  "egg-roller": { h1: "Snacks creativos para desayunos y antojos", use: "Cafeterías, food trucks y kioscos que innovan con egg rolls, salchipapas en palito y snacks creativos.", kw: ["egg roller", "máquina egg roller", "snacks creativos"] },
  vending: { h1: "Venta automática 24/7 sin operario", use: "Oficinas, universidades, gimnasios y conjuntos que venden snacks y bebidas por máquina dispensadora.", kw: ["máquina vending", "dispensadora de snacks", "vending Colombia"] },
  hamburguesa: { h1: "Hamburguesas parejas, porción tras porción", use: "Comidas rápidas y food trucks que estandarizan el tamaño y peso de sus carnes de hamburguesa.", kw: ["formador de hamburguesas", "prensa de hamburguesas"] },
  calientes: { h1: "Alimentos calientes, listos para servir", use: "Comidas rápidas y autoservicios que mantienen papas y acompañamientos calientes y crocantes.", kw: ["calentador de papas", "vaporizador de panes"] },
  novelty: { h1: "Waffles novelty para negocios temáticos", use: "Negocios para adultos, despedidas y eventos temáticos que buscan un producto diferenciador y viral.", kw: ["waflera novelty", "waflera divertida"] },
  // Panadería
  horno: { h1: "Horneado parejo y constante para tu producción", use: "Panaderías, pizzerías, pastelerías y asaderos que hornean pan, pizza, pollo y repostería todos los días.", kw: ["horno industrial", "horno para panadería", "horno de pizza", "horno comercial Colombia"] },
  amasadora: { h1: "Masa lista, sin esfuerzo y con la misma textura siempre", use: "Panaderías, pizzerías y obradores que amasan a diario y necesitan consistencia y volumen.", kw: ["amasadora industrial", "amasadora para panadería", "amasadora de masa", "amasadora Colombia"] },
  batidora: { h1: "Mezclas y cremas perfectas, batido tras batido", use: "Panaderías, pastelerías y reposterías que baten cremas, merengues, mezclas y masas livianas.", kw: ["batidora industrial", "batidora de pedestal", "batidora para repostería", "batidora comercial"] },
  escabiladero: { h1: "Organiza y transporta tu producción de horneo", use: "Panaderías y obradores que necesitan ordenar latas y bandejas durante el leudado y el horneo.", kw: ["escabiladero panadería", "carro para latas de pan"] },
  // Empaque
  empacadora: { h1: "Conserva más y reduce desperdicio", use: "Carnicerías, restaurantes, fruver y obradores que empacan al vacío para alargar la vida útil de sus productos.", kw: ["empacadora al vacío", "empacadora al vacío industrial", "selladora al vacío Colombia"] },
  "selladora-bolsas": { h1: "Sellado profesional para tus empaques", use: "Negocios que empacan granos, snacks, alimentos y productos en bolsa con sellado limpio y resistente.", kw: ["selladora de bolsas", "selladora de bolsas plásticas", "máquina selladora de bolsas"] },
  "consumible-empaque": { h1: "Insumos para tu empaque, siempre a mano", use: "Negocios que necesitan rollos y consumibles compatibles para sus equipos de empaque y sellado.", kw: ["rollos para empaque al vacío", "rollos para selladora", "insumos de empaque"] },
  dosificadora: { h1: "Llenado preciso, porción tras porción", use: "Negocios que dosifican y envasan líquidos, salsas o granulados con precisión y rapidez.", kw: ["dosificadora", "llenadora dosificadora", "envasadora"] },
  // Pesaje
  bascula: { h1: "Pesaje exacto en el que puedes confiar", use: "Tiendas, fruver, carnicerías, restaurantes y bodegas que pesan producto para vender o controlar inventario.", kw: ["báscula digital", "balanza comercial", "báscula para negocio", "báscula Colombia"] },
  tallimetro: { h1: "Medición de talla precisa y confiable", use: "Consultorios, IPS, guarderías y programas de salud que miden talla de bebés, niños y adultos.", kw: ["tallímetro", "tallímetro para bebés", "medidor de talla"] },
  // Exhibición
  "vitrina-caliente": { h1: "Exhibe caliente y vende más por impulso", use: "Panaderías, asaderos, pizzerías y autoservicios que exhiben alimentos calientes (pollo, pizza, sushi, empanadas) a la vista del cliente.", kw: ["vitrina de calefacción", "vitrina caliente", "vitrina exhibidora", "vitrina para sushi"] },
  // Refrigeración
  refrigeracion: { h1: "Conserva la cadena de frío de tu negocio", use: "Tiendas, restaurantes, carnicerías y supermercados que conservan y exhiben productos refrigerados o congelados.", kw: ["refrigerador comercial", "congelador industrial", "vitrina refrigerada", "nevera para negocio Colombia"] },
  // Buffet
  buffet: { h1: "Mantén tu buffet caliente y apetecible", use: "Restaurantes, casinos, hoteles y catering que mantienen alimentos calientes en línea de servicio o buffet.", kw: ["baño maría", "samovar", "línea de buffet", "calentador de alimentos"] },
  // Cárnicos
  carnicos: { h1: "Procesa carne con rendimiento y seguridad", use: "Carnicerías, famas, restaurantes y procesadoras que muelen, embuten y porcionan carne a diario.", kw: ["molino de carne", "embutidora", "sierra para huesos", "equipo para carnicería Colombia"] },
  // Procesamiento de alimentos
  procesamiento: { h1: "Prepara más rápido y estandariza tu cocina", use: "Restaurantes, comidas rápidas y obradores que pelan, cortan, rallan y procesan grandes volúmenes de alimento.", kw: ["procesador de alimentos", "peladora de papas", "cortadora de vegetales", "rallador industrial"] },
  // Mobiliario
  mobiliario: { h1: "La base en acero de toda cocina profesional", use: "Cocinas, restaurantes y obradores que necesitan superficies y mobiliario en acero inoxidable resistente e higiénico.", kw: ["mesa de trabajo en acero", "fregadero industrial", "mobiliario en acero inoxidable"] },
  generico: { h1: "Equipo profesional para tu negocio", use: "Negocios de alimentos y bebidas que buscan equipos confiables, con garantía y respaldo Fuller.", kw: ["maquinaria para negocio Colombia"] },
};

function genDescription(p, displayName, type) {
  const t = TYPE_COPY[type] || TYPE_COPY.generico;
  const kw = KW_RESEARCH[type];
  // H2 keyword-rich (front-load del término ganador del SERP); cae al h1 de beneficio.
  const h1 = (kw && kw.h1Seo) || t.h1;
  const short = stripHtml(p.shortDescriptionHtml);
  const specs = (p.specs || []).filter((s) => s.value && s.value.trim());
  const specsBlock = specs.length
    ? "\n\n### Especificaciones principales\n" + specs.map((s) => `- **${FIX_SPEC_LABEL[s.label] || s.label}:** ${s.value}`).join("\n")
    : "";
  const intro = short || `${displayName} de uso profesional, con la calidad y el respaldo de Fuller Machinery.`;
  return `## ${h1}\n\n${intro}\n\n### ¿Para qué negocios es ideal?\n${t.use}${specsBlock}\n\n### Compra con respaldo Fuller\nEnvío nacional desde Bogotá, garantía Fuller y asesoría experta. Cotiza por WhatsApp y recibe atención personalizada.`;
}

function genMetaDescription(short, displayName) {
  const clean = stripHtml(short) || displayName;
  const cta = " Envío nacional desde Bogotá. Cotiza por WhatsApp.";
  const room = 158 - cta.length;
  const head = clean.length > room ? clean.slice(0, room - 1).trim() + "…" : clean;
  return head + cta;
}

const products = raw.map((p, i) => {
  const ov = OVERRIDES[p.slug] || {};
  // Tipo desde el slug/nombre FINAL (el override puede renombrar y desbloquear el tipo).
  const type = getType(ov.slug || p.slug, ov.name || p.name);
  const isNovelty = type === "novelty";
  const name = ov.name || cleanName(p.name);
  const short = ov.shortDescription || stripHtml(p.shortDescriptionHtml) || name;
  const specs = (p.specs || []).map((s) => ({ label: FIX_SPEC_LABEL[s.label] || s.label, value: s.value }));
  return {
    slug: ov.slug || p.slug,
    name,
    type,
    // Novelty → categoría discreta aparte (no aparece en el grid principal).
    category: isNovelty ? "novelty" : vertical,
    categoryLabel: isNovelty ? "Novelty" : CATEGORY_LABELS[vertical],
    shortDescription: short,
    description: ov.description || genDescription(p, name, type),
    highlights:
      ov.highlights || specs.slice(0, 4).map((s) => `${s.label}: ${s.value}`),
    images: p.images.map((im) => im.url),
    specs,
    badge: ov.badge,
    price: p.price,
    currency: "COP",
    stockStatus: mapStock(p.stockStatus),
    metaDescription: genMetaDescription(ov.shortDescription || p.shortDescriptionHtml, name),
    // Keywords investigadas (SERP Colombia) fusionadas con las bespoke de insignia.
    keywords: mergeKeywords(ov.keywords, type).length
      ? mergeKeywords(ov.keywords, type)
      : (TYPE_COPY[type] || TYPE_COPY.generico).kw,
    wooUrl: p.wooUrl,
    wooId: p.wooId,
    sortOrder: ov.sortOrder ?? i + 1,
    published: true,
  };
});

// Insignias primero en el orden del grid.
const starSlugs = Object.values(OVERRIDES).map((o) => o.slug).filter(Boolean)
  .concat(Object.keys(OVERRIDES));
products.sort((a, b) => {
  const ai = starSlugs.indexOf(a.slug);
  const bi = starSlugs.indexOf(b.slug);
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
});
products.forEach((p, i) => (p.sortOrder = i + 1));

const varName = vertical.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + "Products";
const header = `import type { Product } from "./types";

// ────────────────────────────────────────────────────────────
// GENERADO por scripts/compose-vertical.mjs ${vertical} — no editar a mano.
// Datos reales de WooCommerce; imágenes en Supabase. Descripción por tipo.
// ────────────────────────────────────────────────────────────

export const ${varName}: Product[] = ${JSON.stringify(products, null, 2)};
`;

const outFile = join(__dirname, "..", "src", "content", "products", `${vertical}.ts`);
await writeFile(outFile, header, "utf8");
const novelty = products.filter((p) => p.category === "novelty").length;
console.log(`✓ ${products.length} productos → src/content/products/${vertical}.ts (${novelty} novelty aparte)`);
