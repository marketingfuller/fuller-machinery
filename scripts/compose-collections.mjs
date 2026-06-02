// ────────────────────────────────────────────────────────────
// Compone src/content/collections.ts — páginas de colección SEO por TIPO de
// equipo. Toma el término cabeza + keywords del research (keyword-research.mjs)
// y le añade slug, label e intro curados a mano. DRY: las keywords y el H1
// (h1Seo) viven en una sola fuente. Solo se generan colecciones cuyo tipo
// tenga productos suficientes (se valida en runtime, ver lib/products.ts).
//   node scripts/compose-collections.mjs
// ────────────────────────────────────────────────────────────

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { KW_RESEARCH } from "./keyword-research.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Definiciones curadas: type → {slug, label, category, intro}. El eyebrow (primary),
// h1 (h1Seo) y keywords salen de KW_RESEARCH[type].
const DEFS = [
  // Bebidas
  { type: "granizadora", slug: "granizadoras-industriales", label: "Granizadoras industriales", category: "bebidas", intro: "Equipos para vender raspados, cholados y frappés con textura cremosa todo el día. Elige entre 1, 2 o 3 tanques según la rotación de tu negocio." },
  { type: "licuadora", slug: "licuadoras-industriales", label: "Licuadoras industriales", category: "bebidas", intro: "Motores de alto rendimiento que trituran hielo y fruta congelada sin recalentarse, turno tras turno. Para barras de jugos, cafeterías y restaurantes." },
  { type: "exprimidor", slug: "exprimidores-de-naranja", label: "Exprimidores de naranja", category: "bebidas", intro: "Jugo de naranja recién exprimido frente al cliente: modelos manuales, semiautomáticos y automáticos de uso comercial." },
  { type: "espresso", slug: "capuchineras-maquinas-de-cafe", label: "Capuchineras", category: "bebidas", intro: "Máquinas de café espresso de 1 y 2 grupos para servir capuchinos y lattes con calidad de barista en tu cafetería." },
  { type: "cafe-automatica", slug: "maquinas-de-cafe-automaticas", label: "Máquinas de café automáticas", category: "bebidas", intro: "Café a un botón para oficinas y autoservicio: varias bebidas programadas sin necesidad de barista." },
  { type: "selladora-vasos", slug: "selladoras-de-vasos", label: "Selladoras de vasos", category: "bebidas", intro: "Sella bubble tea, jugos y granizados para llevar sin derrames y con acabado profesional. Modelos manuales y automáticos." },
  { type: "dispensador", slug: "dispensadores-de-bebidas", label: "Dispensadores de bebidas", category: "bebidas", intro: "Exhibe y sirve jugos y bebidas frías en movimiento para autoservicio, eventos y catering." },
  { type: "trituradora", slug: "trituradoras-de-hielo", label: "Trituradoras de hielo", category: "bebidas", intro: "Hielo picado al instante y sin interrupciones para granizados, cócteles y bebidas frías." },
  { type: "fabricadora", slug: "maquinas-de-hielo", label: "Máquinas de hielo", category: "bebidas", intro: "Producción autónoma de hielo en cubo para bares, restaurantes y negocios de bebidas que no pueden quedarse sin hielo." },
  // Snacks
  { type: "freidora", slug: "freidoras-industriales", label: "Freidoras industriales", category: "snacks", intro: "Fritura rápida y pareja para papas, pollo y apanados. A gas y eléctricas, de uno o dos tanques, para alto volumen." },
  { type: "crispetera", slug: "crispeteras", label: "Crispeteras", category: "snacks", intro: "Monta tu negocio de crispetas con margen alto: con carro, oil free y de mostrador." },
  { type: "algodonera", slug: "maquinas-de-algodon-de-azucar", label: "Máquinas de algodón de azúcar", category: "snacks", intro: "Algodón de azúcar de alta rotación para eventos, fiestas infantiles, parques y kioscos. Con carro o de mesa." },
  { type: "asador-salchichas", slug: "asadores-de-salchichas", label: "Asadores de salchichas", category: "snacks", intro: "Exhibe y mantén salchichas siempre listas para vender más perros calientes. Modelos de 5 a 11 rodillos." },
  { type: "chocolate", slug: "fuentes-de-chocolate", label: "Fuentes y fundidoras de chocolate", category: "snacks", intro: "Chocolate fundido que vuelve irresistible tu menú: fuentes de cascada por niveles y fundidoras para producción." },
  { type: "wafflera", slug: "wafleras-industriales", label: "Wafleras industriales", category: "snacks", intro: "Waffles recién hechos que llenan tu local: tradicional, de burbuja y de varios puestos." },
  // Panadería
  { type: "horno", slug: "hornos-industriales", label: "Hornos industriales", category: "panaderia", intro: "Horneado parejo y constante para pan, pizza y repostería: hornos a gas, eléctricos, de convección y de pizza." },
  { type: "amasadora", slug: "amasadoras-industriales", label: "Amasadoras industriales", category: "panaderia", intro: "Masa consistente y sin esfuerzo, de 20 a 50 libras, para panaderías y pizzerías que amasan a diario." },
  { type: "batidora", slug: "batidoras-industriales", label: "Batidoras industriales", category: "panaderia", intro: "Cremas y mezclas perfectas batido tras batido: de mesa y de pedestal, para repostería y pastelería." },
  // Empaque
  { type: "empacadora", slug: "empacadoras-al-vacio", label: "Empacadoras al vacío", category: "empaque", intro: "Conserva tus alimentos mucho más tiempo y reduce mermas con sellado al vacío de uso comercial." },
  { type: "selladora-bolsas", slug: "selladoras-de-bolsas", label: "Selladoras de bolsas", category: "empaque", intro: "Sellado hermético y limpio para empacar granos, snacks y alimentos: manuales, de pedal y de banda continua." },
  { type: "consumible-empaque", slug: "rollos-y-consumibles-de-empaque", label: "Rollos y consumibles", category: "empaque", intro: "Rollos al vacío y sellos para vasos compatibles con tus equipos, grado alimenticio y de alto rendimiento." },
  // Pesaje
  { type: "bascula", slug: "basculas-digitales", label: "Básculas digitales", category: "pesaje", intro: "Pesaje exacto para tiendas, fruver, carnicerías y bodegas: grameras, básculas con impresión de precios y de piso." },
  // Exhibición
  { type: "vitrina-caliente", slug: "vitrinas-calientes", label: "Vitrinas calientes", category: "exhibicion", intro: "Exhibe pollo, empanadas, pizza y sushi calientes a la vista del cliente para disparar la compra por impulso." },
  // Procesamiento
  { type: "procesamiento", slug: "procesamiento-de-alimentos", label: "Procesamiento de alimentos", category: "procesamiento", intro: "Pela, corta, rebana y lamina en minutos: peladoras de papa, tajadoras de pan, laminadoras de masa y procesadores." },
  // Buffet
  { type: "buffet", slug: "bano-maria-y-buffet", label: "Baño maría y buffet", category: "buffet", intro: "Mantén la comida caliente y presentable en tu línea de servicio: baño maría, samovares y calentadores." },
  // Refrigeración
  { type: "refrigeracion", slug: "refrigeracion-comercial", label: "Refrigeración comercial", category: "refrigeracion", intro: "Conserva la cadena de frío de tu negocio: congeladores, neveras, vitrinas refrigeradas y botelleros." },
  // Mobiliario
  { type: "mobiliario", slug: "mobiliario-en-acero-inoxidable", label: "Mobiliario en acero", category: "mobiliario", intro: "La base de toda cocina profesional: mesas de trabajo, lavaplatos y poceta en acero inoxidable 304." },
  // Cárnicos
  { type: "carnicos", slug: "equipos-para-carniceria", label: "Equipos para carnicería", category: "carnicos", intro: "Procesa carne con rendimiento y seguridad: molinos, embutidoras de chorizo y sierras para hueso." },
];

const collections = DEFS.map((d, i) => {
  const kw = KW_RESEARCH[d.type];
  if (!kw) throw new Error(`Sin keyword research para tipo "${d.type}"`);
  return {
    slug: d.slug,
    type: d.type,
    category: d.category,
    label: d.label,
    eyebrow: kw.primary,
    h1: kw.h1Seo,
    intro: d.intro,
    keywords: kw.keywords,
    sortOrder: i + 1,
  };
});

const header = `import type { ProductCategory } from "./types";

// ────────────────────────────────────────────────────────────
// GENERADO por scripts/compose-collections.mjs — no editar a mano.
// Páginas de colección SEO por tipo de equipo. eyebrow/h1/keywords salen del
// research (scripts/keyword-research.mjs); slug/label/intro son curados.
// ────────────────────────────────────────────────────────────

export type Collection = {
  slug: string;
  type: string;
  category: ProductCategory;
  label: string;
  eyebrow: string;
  h1: string;
  intro: string;
  keywords: string[];
  sortOrder: number;
};

export const COLLECTIONS: Collection[] = ${JSON.stringify(collections, null, 2)};
`;

const outFile = join(__dirname, "..", "src", "content", "products", "collections.ts");
await writeFile(outFile, header, "utf8");
console.log(`✓ ${collections.length} colecciones → src/content/products/collections.ts`);
