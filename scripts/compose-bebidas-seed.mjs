// ────────────────────────────────────────────────────────────
// Compone src/content/products/bebidas.ts desde scripts/data/bebidas-raw.json.
//   node scripts/compose-bebidas-seed.mjs
//
// - Productos insignia (OVERRIDES): descripción IA + highlights + keywords + badge.
// - Resto: descripción HTML original de WooCommerce como base (se reescriben luego).
// ────────────────────────────────────────────────────────────

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { KW_RESEARCH, mergeKeywords } from "./keyword-research.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  await readFile(join(__dirname, "data", "bebidas-raw.json"), "utf8"),
);

const stripHtml = (s) =>
  (s || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const titleCase = (s) =>
  s
    .toLocaleLowerCase("es")
    .replace(/\b([a-záéíóúñ])/g, (m) => m.toLocaleUpperCase("es"));

// Si el nombre está TODO EN MAYÚSCULAS, lo pasamos a Title Case.
const cleanName = (name) =>
  /[a-záéíóúñ]/.test(name) ? name : titleCase(name);

const mapStock = (s) =>
  s === "instock" ? "in_stock" : s === "outofstock" ? "out_of_stock" : "on_request";

// ── OVERRIDES insignia (descripciones IA, honestas con specs reales) ──
const O = {
  "granizadora-3-tanques-12-litros": {
    name: "Granizadora Industrial 3 Tanques · 12 Litros",
    badge: { text: "Best Seller", color: "bg-secondary" },
    shortDescription:
      "Granizadora profesional de 3 tanques de 4 litros cada uno (12 litros totales), 1.200W y refrigerante ecológico R290. Tres sabores a la vez para máxima rotación.",
    highlights: [
      "3 tanques de 4 L cada uno (12 L totales)",
      "Refrigerante ecológico R290",
      "Aspas antiasentamiento en acero inoxidable",
      "Apta para bebidas con y sin alcohol",
    ],
    keywords: [
      "granizadora industrial Colombia",
      "granizadora 3 tanques",
      "máquina de granizados profesional",
      "granizadora R290",
      "granizadora bubble tea",
    ],
    description: `## Tres sabores, tres veces más ventas

La **Granizadora Industrial de 3 Tanques** está hecha para negocios que viven de la rotación: heladerías, cafeterías, juguerías y puntos de comida rápida que necesitan ofrecer **tres sabores al mismo tiempo** sin saturar el mostrador.

Sus **tres tanques de 4 litros cada uno** (12 litros en total) trabajan de forma independiente, así mantienes granizado de frutas, café frío y una bebida de temporada listos para servir durante todo el día.

### Por qué la eligen los negocios rentables

- **Refrigerante R290 ecológico**: enfría rápido, consume menos energía y cumple la normativa ambiental.
- **1.200W** de potencia que sostienen la textura cremosa en las horas pico.
- **Aspas antiasentamiento** que mantienen la mezcla homogénea y evitan que el producto se asiente.
- Estructura en **acero inoxidable** y tanques transparentes que **disparan la compra por impulso**.

### Ideal para

Granizados de fruta, frappés, bubble tea, cremas de café frío y cócteles helados. Un solo equipo que se paga con las ventas de los primeros meses.`,
  },

  "granizadora-2-tanques-12-litros": {
    slug: "granizadora-2-tanques-8-litros",
    name: "Granizadora Industrial 2 Tanques · 8 Litros",
    badge: { text: "Dos Sabores", color: "bg-primary" },
    shortDescription:
      "Granizadora profesional de 2 tanques de 4 litros cada uno (8 litros totales) con refrigerante R290. Dos sabores simultáneos para tu negocio de bebidas frías.",
    highlights: [
      "2 tanques de 4 L cada uno (8 L totales)",
      "Refrigerante ecológico R290",
      "Dos sabores al mismo tiempo",
      "Acero inoxidable, fácil de limpiar",
    ],
    keywords: [
      "granizadora 2 tanques",
      "granizadora industrial Colombia",
      "máquina de granizados 2 sabores",
      "granizadora R290",
    ],
    description: `## Dos sabores que duplican tu oferta

La **Granizadora Industrial de 2 Tanques** es el punto justo entre variedad y espacio: con **dos tanques de 4 litros cada uno** (8 litros totales) ofreces dos sabores a la vez sin ocupar de más en el mostrador.

Ideal para el negocio que ya rota bien y quiere ampliar su carta de granizados, frappés y bubble tea.

### Por qué conviene

- **Refrigerante R290 ecológico**: enfría rápido y consume menos energía.
- **Dos tanques independientes** para mantener dos sabores siempre listos.
- **Acero inoxidable** y tanques transparentes que invitan a comprar.

### Ideal para

Cafeterías, juguerías, heladerías y puntos de bebidas frías que quieren crecer su oferta.`,
  },

  "granizadora-1-tanque-12-litros": {
    slug: "granizadora-1-tanque-4-litros",
    name: "Granizadora Industrial 1 Tanque · 4 Litros",
    badge: { text: "Para Empezar", color: "bg-accent text-bg-dark" },
    shortDescription:
      "Granizadora compacta de 1 tanque de 4 litros con refrigerante R290. La opción ideal para arrancar tu negocio de granizados sin ocupar mucho mostrador.",
    highlights: [
      "1 tanque de 4 litros",
      "Refrigerante ecológico R290",
      "Compacta, ahorra espacio",
      "Ideal para emprender",
    ],
    keywords: [
      "granizadora 1 tanque",
      "granizadora pequeña",
      "granizadora para emprender",
      "máquina de granizados Colombia",
    ],
    description: `## Arranca tu negocio de granizados

La **Granizadora Industrial de 1 Tanque** de **4 litros** es la forma más rentable de empezar: ocupa poco, consume lo justo y entrega el mismo granizado cremoso que los modelos grandes.

Perfecta para emprendedores, food trucks y locales pequeños que quieren probar el negocio de bebidas frías con baja inversión.

### Por qué empezar con esta

- **Refrigerante R290 ecológico**: eficiente y amigable con el ambiente.
- **Tanque de 4 litros** suficiente para sostener la venta del día.
- **Compacta** y de **acero inoxidable**, fácil de limpiar y transportar.

### Ideal para

Emprendedores de granizados, frappés y bubble tea que arrancan con baja inversión.`,
  },

  "licuadora-industrial-2-7-litros-aislador-ruido": {
    name: "Licuadora Industrial 2.7 Litros · Aislador de Ruido",
    badge: { text: "Silenciosa", color: "bg-accent text-bg-dark" },
    shortDescription:
      "Licuadora industrial de 2.7L y 1.800W con cubierta aisladora de ruido y vaso de policarbonato. Potencia profesional sin molestar a tus clientes.",
    highlights: [
      "Cubierta aisladora de ruido",
      "Motor de 1.800 W (1.8 kW)",
      "Vaso de policarbonato de 2.7 L",
      "Incluye bastón para mezclas · Garantía 6 meses",
    ],
    keywords: [
      "licuadora industrial Colombia",
      "licuadora silenciosa profesional",
      "licuadora 1800W",
      "licuadora aislador de ruido",
      "licuadora para frappés",
    ],
    description: `## Potencia profesional, en silencio

La **Licuadora Industrial 2.7L** combina un motor de **1.800W** con una **cubierta aisladora de ruido** que cambia la experiencia de tu local: tritura hielo, fruta congelada y semillas en segundos, sin el estruendo que aleja a los clientes.

Su **vaso de policarbonato de 2.7 litros** rinde varias porciones por ciclo y resiste el uso intensivo de una barra ocupada.

### Lo que la hace diferente

- **Aislador de ruido**: ambiente de mostrador tranquilo mientras procesas a máxima potencia.
- **Motor de 1.8 kW** que no se rinde ante el hielo ni los ingredientes más duros.
- **Velocidades variables** para texturas precisas en cada bebida.
- Incluye **manual y bastón para mezclas**. Respaldo con **garantía de 6 meses**.

### Ideal para

Smoothies, frappés, jugos naturales, bases de bubble tea y cremas frías. La aliada silenciosa de tu barra.`,
  },

  "licuadora-vitamix-1-4-litros": {
    name: "Licuadora Vitamix 1.4L · Motor 2.3 HP Comercial",
    badge: { text: "Premium", color: "bg-purple-600" },
    shortDescription:
      "Licuadora Vitamix de 1.4L con motor comercial de 2.3 HP. Calidad de barra profesional para smoothies y bebidas de alto rendimiento.",
    highlights: [
      "Motor comercial de 2.3 HP",
      "Vaso de 1.4 litros",
      "Calidad profesional Vitamix",
      "Texturas perfectas en segundos",
    ],
    keywords: [
      "licuadora Vitamix Colombia",
      "licuadora comercial 2.3 HP",
      "licuadora profesional smoothies",
    ],
  },

  "capuchinera-magister-stella": {
    name: "Capuchinera Magister Stella · 1 Grupo",
    badge: { text: "Cafeterías", color: "bg-primary" },
    shortDescription:
      "Máquina de café espresso Magister Stella en acero inoxidable, con depósito de 3 litros y pulsante manual para control total en cada extracción.",
    highlights: [
      "Pulsante manual para control de extracción",
      "Depósito de agua de 3 litros",
      "Construcción en acero inoxidable",
      "Grupo termosifónico de erogación continua",
    ],
    keywords: [
      "capuchinera Magister Stella",
      "máquina de café 1 grupo Colombia",
      "máquina espresso comercial",
      "capuchinera profesional cafetería",
    ],
    description: `## El corazón de tu cafetería de especialidad

La **Capuchinera Magister Stella** es la base sobre la que se construye una cafetería rentable. Su **pulsante manual** te da control total sobre cada extracción, mientras el **grupo termosifónico** garantiza estabilidad térmica taza tras taza.

Con **depósito de agua de 3 litros** y construcción en **acero inoxidable**, está pensada para el servicio continuo de cafeterías, restaurantes e islas de café.

### Diseñada para vender café premium

- **Extracción precisa y continua** gracias al pulsante manual.
- **Lanza de vapor** para texturizar leche y montar cappuccinos y lattes con crema perfecta.
- **Acero inoxidable** que resiste el uso comercial diario.
- Formato de **un grupo** ideal para emprendimientos que buscan calidad de barista.

### Ideal para

Cafeterías de especialidad, islas de café, panaderías que quieren elevar su ticket y emprendedores del café.`,
  },

  "selladora-vasos-automatica-digital-fuller": {
    name: "Selladora de Vasos Automática Digital Fuller",
    badge: { text: "Delivery", color: "bg-purple-600" },
    shortDescription:
      "Selladora de vasos automática digital Fuller: hasta 500 vasos/hora, contador digital y sensor óptico. El sello que profesionaliza tu delivery.",
    highlights: [
      "Hasta 300–500 vasos por hora",
      "Operación automática con sensor óptico",
      "Contador digital de producción",
      "Estructura robusta · 240W · 110V",
    ],
    keywords: [
      "selladora de vasos automática Colombia",
      "selladora vasos bubble tea",
      "selladora digital 500 vasos hora",
      "selladora de vasos para delivery",
    ],
    description: `## El sello que hace posible el delivery a escala

La **Selladora de Vasos Automática Digital Fuller** convierte tus bebidas en producto listo para domicilio. Con un ritmo de **hasta 500 vasos por hora**, acompaña el crecimiento de tu negocio de bubble tea, granizados y jugos sin volverse un cuello de botella.

Su **operación automática con sensor óptico** detecta el vaso y lo sella herméticamente, evitando derrames en el transporte y dándole a tu marca un acabado profesional.

### Pensada para negocios de alto flujo

- **300–500 vasos/hora**: ritmo ideal para mostrador y delivery simultáneos.
- **Contador digital** para controlar producción y consumo de rollo film.
- **Sensor óptico** que automatiza el sellado y reduce errores del operario.
- **Estructura robusta en acero** (240W, 110V, 20.3 kg) para uso intensivo.

### Ideal para

Bubble tea, granizados, jugos naturales, limonadas y cualquier bebida que vendas para llevar.`,
  },

  "exprimidor-naranjas-mesa-acero-inoxidable": {
    name: "Exprimidor de Naranjas Automático de Mesa · Acero Inoxidable",
    badge: { text: "Jugo al instante", color: "bg-secondary" },
    shortDescription:
      "Exprimidor automático de naranjas de mesa en acero inoxidable. Jugo recién exprimido frente al cliente, con la robustez del uso comercial.",
    highlights: [
      "Exprimido automático continuo",
      "Construcción en acero inoxidable",
      "Formato de mesa, ahorra espacio",
      "Jugo fresco a la vista del cliente",
    ],
    keywords: [
      "exprimidor de naranjas comercial Colombia",
      "exprimidor automático acero inoxidable",
      "máquina de jugo de naranja",
    ],
  },

  "dispensador-bebidas-3-tanques-electrico-control-temperatura": {
    name: "Dispensador de Bebidas Frías · 3 Tanques · Control de Temperatura",
    badge: { text: "Autoservicio", color: "bg-primary" },
    shortDescription:
      "Dispensador eléctrico de 3 tanques con control automático de temperatura. Mantiene jugos y bebidas frías y en movimiento para autoservicio y eventos.",
    highlights: [
      "3 tanques con bebida en circulación",
      "Control automático de temperatura",
      "Ideal para autoservicio y catering",
      "Exhibe el producto y atrae la compra",
    ],
    keywords: [
      "dispensador de bebidas frías Colombia",
      "dispensador de jugos 3 tanques",
      "dispensador eléctrico bebidas",
    ],
  },

  "malteadora-2-puestos": {
    name: "Malteadora Profesional 2 Puestos",
    badge: { text: "Doble rendimiento", color: "bg-secondary" },
    shortDescription:
      "Malteadora profesional de 2 puestos para preparar dos bebidas a la vez. Malteadas, frappés y mezclas cremosas con el doble de velocidad.",
    highlights: [
      "2 puestos de mezcla simultáneos",
      "Motor para uso comercial continuo",
      "Vasos en acero inoxidable",
      "Malteadas, frappés y mezclas cremosas",
    ],
    keywords: [
      "malteadora profesional Colombia",
      "malteadora 2 puestos",
      "máquina de malteadas comercial",
    ],
  },

  "trituradora-de-hielo-con-bodega": {
    name: "Trituradora de Hielo con Bodega",
    badge: { text: "Hielo listo", color: "bg-accent text-bg-dark" },
    shortDescription:
      "Trituradora de hielo con bodega de almacenamiento. Hielo triturado siempre disponible para granizados, cócteles y bebidas frías sin interrupciones.",
    highlights: [
      "Bodega de almacenamiento integrada",
      "Hielo triturado al instante",
      "Para granizados, cócteles y bebidas",
      "Uso comercial continuo",
    ],
    keywords: [
      "trituradora de hielo Colombia",
      "máquina trituradora de hielo comercial",
      "triturador de hielo con bodega",
    ],
  },

  "fabricadora-de-hielo-en-cubo-90kg": {
    name: "Fabricadora de Hielo en Cubo · 90 kg/día",
    badge: { text: "Alta producción", color: "bg-primary" },
    shortDescription:
      "Fabricadora de hielo en cubo con producción de hasta 90 kg al día. Autonomía total de hielo para bares, restaurantes y negocios de bebidas.",
    highlights: [
      "Producción de hasta 90 kg/día",
      "Hielo en cubo limpio y uniforme",
      "Autonomía para bares y restaurantes",
      "Construcción comercial resistente",
    ],
    keywords: [
      "fabricadora de hielo Colombia",
      "máquina de hielo 90kg",
      "fabricadora de hielo en cubo comercial",
    ],
  },

  "molino-para-cafe-1-kg": {
    name: "Molino de Café 1 kg",
    badge: { text: "Barismo", color: "bg-primary" },
    shortDescription:
      "Molino de café con tolva de 1 kg para moler grano al momento. Molienda fresca y consistente, el secreto de un espresso de calidad barista.",
    highlights: [
      "Tolva de 1 kg de capacidad",
      "Molienda fresca al momento",
      "Grano consistente para espresso",
      "Esencial en toda cafetería",
    ],
    keywords: [
      "molino de café Colombia",
      "molino de café profesional 1kg",
      "molino para espresso",
    ],
  },

  "maquina-de-cafe-primax-12-bebidas": {
    name: "Máquina de Café Primax · 12 Bebidas",
    badge: { text: "Automática", color: "bg-purple-600" },
    shortDescription:
      "Máquina de café automática Primax con 12 bebidas programadas. Café, capuchino y especialidades a un botón, ideal para oficinas y autoservicio.",
    highlights: [
      "12 bebidas programadas",
      "Operación automática a un botón",
      "Ideal para oficinas y autoservicio",
      "Consistencia en cada taza",
    ],
    keywords: [
      "máquina de café automática Colombia",
      "máquina de café Primax",
      "máquina de café 12 bebidas oficina",
    ],
  },
};

// ── Nombres SEO (tipo + cualificador + capacidad con números) para no-insignia ──
const NAMES = {
  "maquina-percoladora-de-cafe-100-tazas": "Percoladora de Café Industrial 16L · 100 Tazas",
  "selladora-de-vasos-manual-sin-contador-digital": "Selladora de Vasos Manual · 160 Vasos/Hora",
  "licuadora-industrial-4-litros-uso-comercial": "Licuadora Industrial 4 Litros · Uso Comercial",
  "fabricadora-de-hielo-fuller-machinery-30kg-cubos-110v-c-filtros": "Fabricadora de Hielo en Cubos 30 kg/día · 110V",
  "extractor-industrial-jugos-jp-2000": "Extractor de Jugos Industrial JP 2000 · 550W",
  "gasificadora-de-liquidos-1-litro": "Gasificadora de Líquidos Manual 1 Litro",
  "selladora-de-latas-plasticas": "Selladora de Latas Plásticas · 12 Sellados/Min",
  "capuchinera-barismo-magister-1-grupo": "Capuchinera Profesional Magister · 1 Grupo",
  "maquina-cafe-magister-2-grupos": "Máquina de Café Magister · 2 Grupos · 11.5L",
  "licuadora-industrial-3-6-litros": "Licuadora Industrial 3.6 Litros · 2.2kW",
  "licuadora-comercial-2-7-litros-vaso-policarbonato": "Licuadora Comercial 2.7 Litros · Policarbonato",
  "licuadora-comercial-2-litros-vaso-policarbonato": "Licuadora Comercial 2 Litros · Policarbonato",
  "exprimidor-industrial-manual-jugo-naranja": "Exprimidor de Naranjas Manual Industrial",
  "exprimidor-industrial-naranjas-piso-automatico": "Exprimidor de Naranjas Industrial de Piso · 50/Min",
  "exprimidor-naranjas-industrial-mesa-acrilico-transparente": "Exprimidor de Naranjas de Mesa · Acrílico · 300W",
  "exprimidor-naranjas-semi-automatico-acero-inoxidable-180w": "Exprimidor de Naranjas Semiautomático · Acero Inox · 180W",
  "exprimidor-naranjas-semi-automatico-carcasa-plastica": "Exprimidor de Naranjas Semiautomático · 180W",
  "dispensador-jugos-2-tanques-electrico-acero-inoxidable": "Dispensador de Jugos Eléctrico · 2 Tanques · 17L c/u",
  "dispensador-jugos-1-tanque-17-litros-acero-inoxidable": "Dispensador de Jugos Eléctrico · 1 Tanque · 17 Litros",
  "dispensador-bebidas-manual-3-tanques-8-litros": "Dispensador de Bebidas Manual · 3 Tanques · 8L c/u",
  "dispensador-bebidas-manual-2-tanques-8-litros": "Dispensador de Bebidas Manual · 2 Tanques · 8L c/u",
  "dispensador-de-bebidas-manual-1-tanque": "Dispensador de Bebidas Manual · 1 Tanque",
  "molino-para-cafe-1-5-kg-dosificador": "Molino de Café Dosificador 1.5 kg",
  "maquina-de-cafe-de-goteo-2-jarras": "Cafetera de Goteo Industrial · 2 Jarras · 4L/Hora",
  "maquina-de-cafe-percoladora": "Percoladora de Café Industrial",
  "malteadora-1-puesto": "Malteadora Profesional · 1 Puesto",
  "selladora-de-vasos-semi-automatica-44-negra": "Selladora de Vasos Semiautomática · Negra",
  "selladora-de-vasos-semi-automatica": "Selladora de Vasos Semiautomática",
  "selladora-de-vasos-manual-contador-digital": "Selladora de Vasos Manual · Contador Digital",
  "selladora-de-vasos-full-automatica": "Selladora de Vasos Full Automática",
  "selladora-de-vasos-automatica": "Selladora de Vasos Automática",
  "trituradora-de-hielo-mediana": "Trituradora de Hielo Mediana",
  "trituradora-de-hielo-grande": "Trituradora de Hielo Grande",
  "trituradora-de-hielo-pequena": "Trituradora de Hielo Pequeña",
  "maquina-hielo-45kg-18kg-bodega-fuller": "Fabricadora de Hielo 45 kg/día · Bodega 18 kg",
  "maquina-de-cafe-berna": "Máquina de Café Automática Berna",
  "maquina-de-cafe-lucerna": "Máquina de Café Automática Lucerna",
};

// ── Generador de descripción única por TIPO (teje specs reales + caso de uso) ──
function getType(slug) {
  if (/sello|rollo/.test(slug)) return "consumible-empaque";
  if (slug.includes("granizadora")) return "granizadora";
  if (slug.includes("licuadora")) return "licuadora";
  if (slug.includes("capuchinera") || slug.includes("maquina-cafe-magister")) return "espresso";
  if (slug.includes("percoladora")) return "percoladora";
  if (slug.includes("goteo")) return "goteo";
  if (slug.includes("maquina-de-cafe")) return "cafe-automatica";
  if (slug.includes("molino")) return "molino";
  if (slug.includes("selladora") && slug.includes("lata")) return "selladora-latas";
  if (slug.includes("selladora")) return "selladora-vasos";
  if (slug.includes("dispensador")) return "dispensador";
  if (slug.includes("exprimidor")) return "exprimidor";
  if (slug.includes("extractor")) return "extractor";
  if (slug.includes("malteadora")) return "malteadora";
  if (slug.includes("trituradora")) return "trituradora";
  if (slug.includes("fabricadora") || slug.includes("maquina-hielo")) return "fabricadora";
  if (slug.includes("gasificadora")) return "gasificadora";
  return "generico";
}

const TYPE_COPY = {
  granizadora: { h1: "Granizado cremoso, listo para vender todo el día", use: "Heladerías, cafeterías, juguerías, bares y puntos de comida rápida que venden granizados, frappés, bubble tea y cócteles helados." },
  licuadora: { h1: "Potencia profesional para tu barra", use: "Bares de jugos, cafeterías, restaurantes y negocios de smoothies y frappés que procesan hielo y fruta congelada a diario." },
  espresso: { h1: "El corazón de tu cafetería de especialidad", use: "Cafeterías, restaurantes, panaderías e islas de café que quieren servir espresso, capuchino y latte con calidad barista." },
  percoladora: { h1: "Café caliente por litros, sin complicaciones", use: "Eventos, casinos, oficinas, restaurantes y catering que necesitan servir grandes volúmenes de café tinto." },
  goteo: { h1: "Café de goteo continuo para alto consumo", use: "Restaurantes, hoteles, oficinas y cafeterías que sirven café tinto americano durante todo el día." },
  "cafe-automatica": { h1: "Café de máquina a un botón", use: "Oficinas, salas de espera, autoservicios y negocios que quieren ofrecer varias bebidas de café sin barista." },
  molino: { h1: "Molienda fresca, el secreto del buen espresso", use: "Cafeterías de especialidad y negocios de café que muelen grano al momento para máxima frescura y aroma." },
  "selladora-vasos": { h1: "El sello que profesionaliza tu delivery", use: "Negocios de bubble tea, granizados, jugos y bebidas frías que venden para llevar y domicilio sin derrames." },
  "selladora-latas": { h1: "Presentación profesional en lata", use: "Negocios de bebidas artesanales, cervezas y refrescos que buscan una presentación sellada y profesional." },
  dispensador: { h1: "Bebida fría a la vista que se vende sola", use: "Restaurantes, autoservicios, hoteles, eventos y catering que exhiben y sirven jugos y bebidas frías." },
  exprimidor: { h1: "Jugo de naranja recién exprimido frente al cliente", use: "Cafeterías, restaurantes, hoteles y juguerías que ofrecen jugo de naranja natural como diferencial." },
  extractor: { h1: "Jugos y extractos naturales en segundos", use: "Juguerías, restaurantes saludables y cafeterías que preparan jugos y extractos de fruta y verdura." },
  malteadora: { h1: "Malteadas y mezclas cremosas al instante", use: "Heladerías, cafeterías y negocios de postres que preparan malteadas, frappés y mezclas cremosas." },
  trituradora: { h1: "Hielo triturado siempre listo", use: "Bares, cócteles, granizados y bebidas frías que necesitan hielo triturado de forma continua." },
  fabricadora: { h1: "Autonomía total de hielo para tu negocio", use: "Bares, restaurantes, cafeterías y negocios de bebidas que requieren producción constante de hielo." },
  gasificadora: { h1: "Bebidas gasificadas personalizadas", use: "Bares, cafeterías y negocios que preparan agua con gas y bebidas refrescantes a su gusto." },
  "consumible-empaque": { h1: "Insumos para sellar tus vasos, siempre a mano", use: "Negocios de bubble tea, granizados, jugos y bebidas para llevar que necesitan rollos y sellos compatibles con su selladora de vasos." },
  generico: { h1: "Equipo profesional para tu negocio", use: "Negocios de alimentos y bebidas que buscan equipos confiables, con garantía y respaldo." },
};

// Descripción única: abre con el short factual (único por producto) + caso de uso
// del tipo + specs reales. Garantiza contenido no-duplicado y rico en keywords.
function genDescription(p, displayName) {
  const type = getType(p.slug);
  const t = TYPE_COPY[type] || TYPE_COPY.generico;
  const kw = KW_RESEARCH[type];
  // H2 keyword-rich (front-load del término ganador del SERP); cae al h1 de beneficio.
  const h1 = (kw && kw.h1Seo) || t.h1;
  const short = stripHtml(p.shortDescriptionHtml);
  const specs = (p.specs || []).filter((s) => s.value && s.value.trim());
  const specsBlock = specs.length
    ? "\n\n### Especificaciones principales\n" +
      specs.map((s) => `- **${FIX_SPEC_LABEL[s.label] || s.label}:** ${s.value}`).join("\n")
    : "";
  const intro = short || `${displayName} de uso profesional, con la calidad y el respaldo de Fuller Machinery.`;
  return `## ${h1}\n\n${intro}\n\n### ¿Para qué negocios es ideal?\n${t.use}${specsBlock}\n\n### Compra con respaldo Fuller\nEnvío nacional desde Bogotá, garantía Fuller y asesoría experta. Cotiza por WhatsApp y recibe atención personalizada.`;
}

// metaDescription ~155 car. (geo + CTA), keywords por tipo.
function genMetaDescription(short) {
  const clean = (short || "").replace(/\s+/g, " ").trim();
  const cta = " Envío nacional desde Bogotá. Cotiza por WhatsApp.";
  const room = 158 - cta.length;
  const head = clean.length > room ? clean.slice(0, room - 1).trim() + "…" : clean;
  return head + cta;
}
function genKeywords(name, slug, bespoke) {
  const type = getType(slug);
  // Fusiona bespoke insignia + keywords investigadas (SERP Colombia) por tipo.
  const merged = mergeKeywords(bespoke, type);
  if (merged.length) return merged;
  const map = {
    granizadora: ["granizadora industrial", "máquina de granizados", "granizadora comercial", "granizadora Colombia"],
    licuadora: ["licuadora industrial", "licuadora comercial", "licuadora para jugos", "licuadora Colombia"],
    espresso: ["capuchinera profesional", "máquina de café espresso", "cafetera para cafetería", "máquina de café Colombia"],
    percoladora: ["percoladora de café", "cafetera industrial", "café para eventos"],
    goteo: ["cafetera de goteo industrial", "máquina de café americano", "cafetera comercial"],
    "cafe-automatica": ["máquina de café automática", "cafetera para oficina", "máquina de café vending"],
    molino: ["molino de café", "molino para espresso", "molino de café profesional"],
    "selladora-vasos": ["selladora de vasos", "selladora bubble tea", "selladora de vasos Colombia"],
    "selladora-latas": ["selladora de latas", "selladora de latas plásticas"],
    dispensador: ["dispensador de bebidas", "dispensador de jugos", "dispensador de bebidas frías"],
    exprimidor: ["exprimidor de naranjas", "exprimidor industrial", "máquina de jugo de naranja"],
    extractor: ["extractor de jugos", "extractor de jugos industrial"],
    malteadora: ["malteadora profesional", "máquina de malteadas"],
    trituradora: ["trituradora de hielo", "picadora de hielo comercial"],
    fabricadora: ["fabricadora de hielo", "máquina de hielo", "fabricadora de hielo Colombia"],
    gasificadora: ["gasificadora de líquidos", "máquina de agua con gas"],
    generico: ["maquinaria para negocio Colombia"],
  };
  return map[type] || map.generico;
}

const FIX_SPEC_LABEL = { DImensiones: "Dimensiones" };

const products = raw.map((p, i) => {
  const ov = O[p.slug] || {};
  const name = ov.name || NAMES[p.slug] || cleanName(p.name);
  const short =
    ov.shortDescription || stripHtml(p.shortDescriptionHtml) || name;
  const specs = (p.specs || []).map((s) => ({
    label: FIX_SPEC_LABEL[s.label] || s.label,
    value: s.value,
  }));
  // Descripción: insignia (IA a mano) tiene prioridad; resto, generador por tipo.
  const description = ov.description || genDescription(p, name);
  return {
    slug: ov.slug || p.slug,
    name,
    type: getType(p.slug),
    category: "bebidas",
    categoryLabel: "Bebidas y Café",
    shortDescription: short,
    description, // markdown SEO (siempre presente; ya no usamos descriptionHtml)
    highlights:
      ov.highlights || specs.slice(0, 4).map((s) => `${s.label}: ${s.value}`),
    images: p.images.map((im) => im.url),
    specs,
    badge: ov.badge,
    price: p.price,
    currency: "COP",
    stockStatus: mapStock(p.stockStatus),
    // metaTitle: NO se setea aquí — el layout añade "| Fuller Machinery" vía
    // title.template. El <title> = name + marca del template. Dejar override manual.
    metaDescription: genMetaDescription(short),
    keywords: genKeywords(name, p.slug, ov.keywords),
    wooUrl: p.wooUrl,
    wooId: p.wooId,
    sortOrder: i + 1,
    published: true,
  };
});

// Insignias primero en el orden.
const flagshipSlugs = Object.entries(O).map(([k, v]) => v.slug || k);
products.sort((a, b) => {
  const ai = flagshipSlugs.indexOf(a.slug);
  const bi = flagshipSlugs.indexOf(b.slug);
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return a.sortOrder - b.sortOrder;
});
products.forEach((p, i) => (p.sortOrder = i + 1));

const header = `import type { Product } from "./types";

// ────────────────────────────────────────────────────────────
// GENERADO por scripts/compose-bebidas-seed.mjs — no editar a mano.
// Datos reales importados de WooCommerce; imágenes re-alojadas en Supabase.
// Descripciones insignia escritas con IA; resto usa descriptionHtml original.
// ────────────────────────────────────────────────────────────

export const bebidasProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;

const outFile = join(__dirname, "..", "src", "content", "products", "bebidas.ts");
await writeFile(outFile, header, "utf8");
console.log(`✓ ${products.length} productos → src/content/products/bebidas.ts`);
console.log(`  ${flagshipSlugs.length} insignia (copy a mano) + ${products.length - flagshipSlugs.length} con descripción generada por tipo. Todos con metaTitle/metaDescription/keywords SEO.`);
