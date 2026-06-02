// ────────────────────────────────────────────────────────────
// Fuente única de verdad: clasifica cada producto de WooCommerce en UNA
// categoría del catálogo. Usado por classify.mjs (reporte) e
// import-woocommerce.mjs (importación sin duplicados).
// Reglas en ORDEN de prioridad — la primera que matchea gana.
// ────────────────────────────────────────────────────────────

export const RULES = [
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
  { v: "mobiliario", cats: ["mesas-de-trabajo","mesas-de-trabajo-2","utensilios-de-cocina"], re:/mesa de trabajo|fregadero|estanter|pala para|pinza|utensilio|cuchar|mes[oó]n|dispensador de sal/i },
];

export const ORDER = ["bebidas","snacks","empaque","panaderia","pesaje","exhibicion","procesamiento","buffet","refrigeracion","mobiliario","carnicos"];

export const CATEGORY_LABELS = {
  bebidas: "Bebidas y Café",
  snacks: "Snacks y Comida Rápida",
  empaque: "Empaque y Sellado",
  panaderia: "Panadería y Repostería",
  pesaje: "Pesaje y Básculas",
  exhibicion: "Vitrinas y Exhibición",
  procesamiento: "Procesamiento de Alimentos",
  buffet: "Buffet y Autoservicio",
  refrigeracion: "Refrigeración",
  mobiliario: "Mobiliario en Acero",
  carnicos: "Cárnicos",
};

/** Devuelve la categoría asignada a un producto WooCommerce, o null. */
export function classify(product) {
  const slugs = new Set((product.categories || []).map((c) => c.slug));
  for (const r of RULES) if (r.cats.some((c) => slugs.has(c))) return r.v;
  for (const r of RULES) if (r.re && r.re.test(product.name)) return r.v;
  return null;
}
