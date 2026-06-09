// ────────────────────────────────────────────────────────────
// Negocios para "Arma tu negocio" de Alimentec.
//
// Cada negocio = un KIT base de máquinas REALES (recomendadas) + complementos
// (`extras`) reales que el usuario agrega (o cualquier máquina del catálogo vía
// buscador). La INVERSIÓN suma el precio REAL (getProductBySlug) de lo elegido.
// Además, cada negocio vende VARIAS líneas de producto (café, horneados,
// malteadas…) para estimar la utilidad total, no solo un producto.
//
// 🔴 PENDIENTE DE VALIDACIÓN POR FULLER:
//   • Precios de INSUMOS: referencia de supermercado (Éxito) aprox. jun-2026,
//     editables en la UI. NO son dato cerrado.
//   • Precios de venta, unidades/día, costos fijos: supuestos editables.
//   • Composición de kits, complementos y líneas de producto → confirmar.
// La INVERSIÓN sí es precio REAL del catálogo. Se corrige SOLO este archivo.
// ────────────────────────────────────────────────────────────

/** Insumo por unidad vendida — costo de referencia (editable en la UI). */
export type Insumo = { label: string; cost: number };

/** Máquina del kit base. `included` = preseleccionada (el usuario puede quitarla). */
export type BusinessMachine = { slug: string; included: boolean };

/** Línea de producto que vende el negocio (editable, activable). */
export type ProductLineDef = {
  key: string;
  label: string;
  unitLabel: string;
  salePrice: number;
  salePriceMax: number;
  unitsDay: number;
  unitsMax: number;
  /** Desglose de insumos de referencia (suma = costo por unidad por defecto). */
  insumos: Insumo[];
  /** Activa por defecto. */
  enabled: boolean;
};

export type AlimentecBusiness = {
  key: string;
  label: string;
  icon: string;
  blurb: string;
  machines: BusinessMachine[];
  extras: { slug: string }[];
  productLines: ProductLineDef[];
  daysMonth: number;
  fixedMonthly: number;
  fixedMax: number;
};

export const ALIMENTEC_BUSINESSES: AlimentecBusiness[] = [
  {
    key: "cafeteria",
    label: "Cafetería",
    icon: "local_cafe",
    blurb: "Café de especialidad + horneados + bebidas selladas para llevar.",
    machines: [
      { slug: "maquina-de-cafe-berna", included: true },
      { slug: "horno-pizza-electrico-piedra-350c-fuller", included: true },
      { slug: "selladora-vasos-automatica-digital-fuller", included: true },
    ],
    extras: [
      { slug: "molino-para-cafe-1-kg" },
      { slug: "licuadora-industrial-2-7-litros-aislador-ruido" },
      { slug: "malteadora-2-puestos" },
      { slug: "refrigerador-botellero-mini-bar-2-puertas-191l" },
    ],
    productLines: [
      {
        key: "cafe",
        label: "Café / bebida caliente",
        unitLabel: "bebida",
        salePrice: 5000,
        salePriceMax: 16000,
        unitsDay: 60,
        unitsMax: 300,
        insumos: [
          { label: "Café molido (≈18 g)", cost: 540 },
          { label: "Leche (≈200 ml)", cost: 900 },
          { label: "Vaso + tapa", cost: 250 },
          { label: "Azúcar / saborizante", cost: 110 },
        ],
        enabled: true,
      },
      {
        key: "fria",
        label: "Bebida fría / jugo sellado",
        unitLabel: "vaso",
        salePrice: 6000,
        salePriceMax: 16000,
        unitsDay: 25,
        unitsMax: 200,
        insumos: [
          { label: "Pulpa / base de fruta", cost: 700 },
          { label: "Vaso + tapa", cost: 250 },
          { label: "Hielo / agua", cost: 150 },
        ],
        enabled: true,
      },
      {
        key: "horneado",
        label: "Horneado / pastelería",
        unitLabel: "porción",
        salePrice: 4500,
        salePriceMax: 15000,
        unitsDay: 30,
        unitsMax: 200,
        insumos: [
          { label: "Masa / mezcla", cost: 800 },
          { label: "Relleno / topping", cost: 600 },
          { label: "Empaque", cost: 300 },
        ],
        enabled: true,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 2000000,
    fixedMax: 6000000,
  },
  {
    key: "waffles",
    label: "Waffles & Postres",
    icon: "icecream",
    blurb: "Waffle burbuja + malteadas: alta rotación y bajo costo de entrada.",
    machines: [
      { slug: "waflera-burbuja", included: true },
      { slug: "malteadora-2-puestos", included: true },
    ],
    extras: [
      { slug: "congelador-de-piso-5-canastillas-538lt" },
      { slug: "dispensador-bebidas-3-tanques-electrico-control-temperatura" },
      { slug: "licuadora-industrial-4-litros-uso-comercial" },
      { slug: "maquina-de-cafe-berna" },
    ],
    productLines: [
      {
        key: "waffle",
        label: "Waffle",
        unitLabel: "waffle",
        salePrice: 12000,
        salePriceMax: 25000,
        unitsDay: 25,
        unitsMax: 150,
        // Alineado con el dato del catálogo (ProfitCalc: ≈$5.090/waffle con helado).
        insumos: [
          { label: "Mezcla / masa", cost: 1200 },
          { label: "Huevo + leche", cost: 900 },
          { label: "Topping (helado / salsa)", cost: 2500 },
          { label: "Empaque + servilleta", cost: 490 },
        ],
        enabled: true,
      },
      {
        key: "malteada",
        label: "Malteada / bebida",
        unitLabel: "malteada",
        salePrice: 9000,
        salePriceMax: 20000,
        unitsDay: 20,
        unitsMax: 150,
        insumos: [
          { label: "Leche", cost: 800 },
          { label: "Helado", cost: 1500 },
          { label: "Vaso + pitillo", cost: 400 },
        ],
        enabled: true,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 1500000,
    fixedMax: 5000000,
  },
  {
    key: "granizados",
    label: "Granizados & Bebidas frías",
    icon: "local_bar",
    blurb: "Granizadora de 3 sabores + sellado de vasos para venta por impulso.",
    machines: [
      { slug: "granizadora-3-tanques-12-litros", included: true },
      { slug: "selladora-vasos-automatica-digital-fuller", included: true },
    ],
    extras: [
      { slug: "trituradora-de-hielo-con-bodega" },
      { slug: "fabricadora-de-hielo-en-cubo-90kg" },
      { slug: "dispensador-bebidas-3-tanques-electrico-control-temperatura" },
      { slug: "exprimidor-naranjas-mesa-acero-inoxidable" },
    ],
    productLines: [
      {
        key: "granizado",
        label: "Granizado",
        unitLabel: "vaso",
        salePrice: 6000,
        salePriceMax: 18000,
        unitsDay: 45,
        unitsMax: 300,
        insumos: [
          { label: "Pulpa / base de fruta", cost: 700 },
          { label: "Agua + azúcar", cost: 300 },
          { label: "Vaso + tapa", cost: 250 },
          { label: "Pitillo / cuchara", cost: 80 },
        ],
        enabled: true,
      },
      {
        key: "jugo",
        label: "Jugo natural / exprimido",
        unitLabel: "vaso",
        salePrice: 6500,
        salePriceMax: 18000,
        unitsDay: 20,
        unitsMax: 200,
        insumos: [
          { label: "Fruta", cost: 1400 },
          { label: "Vaso + tapa", cost: 250 },
          { label: "Hielo / agua", cost: 150 },
        ],
        enabled: true,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 1500000,
    fixedMax: 5000000,
  },
  {
    key: "panaderia",
    label: "Panadería",
    icon: "bakery_dining",
    blurb: "Amasado, horneado y batido para producción de pan y repostería.",
    machines: [
      { slug: "amasadora-20libras-industrial-2-velocidades", included: true },
      { slug: "horno-conveccion-4-bandejas-60l-fuller", included: true },
      { slug: "batidora-7-litros-11-velocidades", included: true },
    ],
    extras: [
      { slug: "cortadora-de-pan-31-cuchillas" },
      { slug: "escabiladero-de-15-latas" },
      { slug: "refrigerador-vertical-doble-puerta-vidrio-630l" },
      { slug: "microondas-comercial-25l-acero-fuller" },
    ],
    productLines: [
      {
        key: "pan",
        label: "Pan",
        unitLabel: "unidad",
        salePrice: 2500,
        salePriceMax: 12000,
        unitsDay: 180,
        unitsMax: 800,
        insumos: [
          { label: "Harina", cost: 600 },
          { label: "Levadura / mantequilla / huevo", cost: 350 },
          { label: "Empaque", cost: 150 },
        ],
        enabled: true,
      },
      {
        key: "reposteria",
        label: "Pastelería / repostería",
        unitLabel: "porción",
        salePrice: 6000,
        salePriceMax: 20000,
        unitsDay: 30,
        unitsMax: 300,
        insumos: [
          { label: "Masa / mezcla", cost: 1200 },
          { label: "Relleno / crema", cost: 900 },
          { label: "Empaque", cost: 400 },
        ],
        enabled: true,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 2800000,
    fixedMax: 7000000,
  },
  {
    key: "comidas-rapidas",
    label: "Comidas rápidas / Fritos",
    icon: "lunch_dining",
    blurb: "Freidora de piso + plancha para papas, apanados y combos.",
    machines: [
      { slug: "freidora-a-gas-de-piso-2-tanques-30-lt", included: true },
      { slug: "plancha-electrica-industrial-2-zonas-110v-fuller", included: true },
    ],
    extras: [
      { slug: "asador-salchichas-9-rodillos-bodega-pan" },
      { slug: "peladora-de-papas-industrial10-litros-modelo-jcet-x10c" },
      { slug: "cortador-de-papa-en-espiral" },
      { slug: "refrigerador-botellero-mini-bar-2-puertas-191l" },
    ],
    productLines: [
      {
        key: "fritos",
        label: "Papas / fritos",
        unitLabel: "porción",
        salePrice: 9000,
        salePriceMax: 25000,
        unitsDay: 40,
        unitsMax: 250,
        insumos: [
          { label: "Papa / proteína", cost: 1800 },
          { label: "Aceite (prorrateado)", cost: 700 },
          { label: "Salsas + empaque", cost: 500 },
        ],
        enabled: true,
      },
      {
        key: "perro",
        label: "Perro / sándwich / combo",
        unitLabel: "unidad",
        salePrice: 8000,
        salePriceMax: 25000,
        unitsDay: 25,
        unitsMax: 200,
        insumos: [
          { label: "Pan", cost: 600 },
          { label: "Salchicha / proteína", cost: 1500 },
          { label: "Salsas + toppings", cost: 800 },
          { label: "Empaque", cost: 300 },
        ],
        enabled: true,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 2000000,
    fixedMax: 6000000,
  },
  {
    key: "personalizado",
    label: "Otro / a tu medida",
    icon: "tune",
    blurb: "¿Tu negocio no está en la lista? Ármalo desde cero con cualquier máquina del catálogo.",
    machines: [], // sin kit base: el asesor agrega máquinas con el buscador
    extras: [],
    productLines: [
      {
        key: "p1",
        label: "Producto / servicio 1",
        unitLabel: "unidad",
        salePrice: 10000,
        salePriceMax: 60000,
        unitsDay: 40,
        unitsMax: 500,
        insumos: [{ label: "Insumos por unidad (ajústalo)", cost: 4000 }],
        enabled: true,
      },
      {
        key: "p2",
        label: "Producto / servicio 2",
        unitLabel: "unidad",
        salePrice: 8000,
        salePriceMax: 60000,
        unitsDay: 20,
        unitsMax: 500,
        insumos: [{ label: "Insumos por unidad (ajústalo)", cost: 3000 }],
        enabled: false,
      },
      {
        key: "p3",
        label: "Producto / servicio 3",
        unitLabel: "unidad",
        salePrice: 6000,
        salePriceMax: 60000,
        unitsDay: 15,
        unitsMax: 500,
        insumos: [{ label: "Insumos por unidad (ajústalo)", cost: 2500 }],
        enabled: false,
      },
    ],
    daysMonth: 26,
    fixedMonthly: 1500000,
    fixedMax: 7000000,
  },
];

export function getBusiness(key: string): AlimentecBusiness | undefined {
  return ALIMENTEC_BUSINESSES.find((b) => b.key === key);
}

/** Todos los slugs del kit curado de un negocio (base + complementos). */
export function businessSlugs(b: AlimentecBusiness): string[] {
  return [...b.machines.map((m) => m.slug), ...b.extras.map((e) => e.slug)];
}

/** Suma de insumos de una línea = costo por unidad por defecto. */
export function lineInsumoCost(line: { insumos: Insumo[] }): number {
  return line.insumos.reduce((sum, i) => sum + i.cost, 0);
}

// ────────────────────────────────────────────────────────────
// Máquina → línea de producto. Si el asesor agrega una máquina al kit (ej.
// crispetera, granizadora), aparece su línea de ingresos en el cálculo, para
// una propuesta sólida. Se mapea por el `type` del catálogo. `product` es el id
// de dedupe (coincide con las keys de las líneas preset para no duplicar).
// Máquinas de apoyo (selladora, refrigeración, molino, báscula…) no tienen línea.
// ────────────────────────────────────────────────────────────
export type TypeLine = {
  product: string;
  label: string;
  unitLabel: string;
  salePrice: number;
  salePriceMax: number;
  unitsDay: number;
  unitsMax: number;
  insumos: Insumo[];
};

export const TYPE_LINES: Record<string, TypeLine> = {
  "cafe-automatica": { product: "cafe", label: "Café / bebida caliente", unitLabel: "bebida", salePrice: 5000, salePriceMax: 16000, unitsDay: 60, unitsMax: 300, insumos: [{ label: "Café molido (≈18 g)", cost: 540 }, { label: "Leche (≈200 ml)", cost: 900 }, { label: "Vaso + tapa", cost: 250 }, { label: "Azúcar / saborizante", cost: 110 }] },
  espresso: { product: "cafe", label: "Café / bebida caliente", unitLabel: "bebida", salePrice: 5000, salePriceMax: 16000, unitsDay: 60, unitsMax: 300, insumos: [{ label: "Café molido (≈18 g)", cost: 540 }, { label: "Leche (≈200 ml)", cost: 900 }, { label: "Vaso + tapa", cost: 250 }, { label: "Azúcar / saborizante", cost: 110 }] },
  chocolate: { product: "chocolate", label: "Bebida de chocolate", unitLabel: "bebida", salePrice: 5000, salePriceMax: 16000, unitsDay: 30, unitsMax: 200, insumos: [{ label: "Chocolate", cost: 800 }, { label: "Leche", cost: 900 }, { label: "Vaso + tapa", cost: 250 }] },
  granizadora: { product: "granizado", label: "Granizado", unitLabel: "vaso", salePrice: 6000, salePriceMax: 18000, unitsDay: 45, unitsMax: 300, insumos: [{ label: "Pulpa / base de fruta", cost: 700 }, { label: "Agua + azúcar", cost: 300 }, { label: "Vaso + tapa", cost: 250 }, { label: "Pitillo / cuchara", cost: 80 }] },
  exprimidor: { product: "jugo", label: "Jugo natural / exprimido", unitLabel: "vaso", salePrice: 6500, salePriceMax: 18000, unitsDay: 20, unitsMax: 200, insumos: [{ label: "Fruta", cost: 1400 }, { label: "Vaso + tapa", cost: 250 }, { label: "Hielo / agua", cost: 150 }] },
  licuadora: { product: "jugo", label: "Jugo / smoothie", unitLabel: "vaso", salePrice: 6500, salePriceMax: 18000, unitsDay: 20, unitsMax: 200, insumos: [{ label: "Fruta", cost: 1400 }, { label: "Vaso + tapa", cost: 250 }, { label: "Hielo / agua", cost: 150 }] },
  dispensador: { product: "fria", label: "Bebida fría", unitLabel: "vaso", salePrice: 6000, salePriceMax: 16000, unitsDay: 25, unitsMax: 200, insumos: [{ label: "Base / concentrado", cost: 700 }, { label: "Vaso + tapa", cost: 250 }, { label: "Hielo / agua", cost: 150 }] },
  wafflera: { product: "waffle", label: "Waffle", unitLabel: "waffle", salePrice: 12000, salePriceMax: 25000, unitsDay: 25, unitsMax: 150, insumos: [{ label: "Mezcla / masa", cost: 1200 }, { label: "Huevo + leche", cost: 900 }, { label: "Topping (helado / salsa)", cost: 2500 }, { label: "Empaque + servilleta", cost: 490 }] },
  malteadora: { product: "malteada", label: "Malteada / bebida", unitLabel: "malteada", salePrice: 9000, salePriceMax: 20000, unitsDay: 20, unitsMax: 150, insumos: [{ label: "Leche", cost: 800 }, { label: "Helado", cost: 1500 }, { label: "Vaso + pitillo", cost: 400 }] },
  helado: { product: "helado", label: "Helado", unitLabel: "porción", salePrice: 6000, salePriceMax: 18000, unitsDay: 40, unitsMax: 300, insumos: [{ label: "Base de helado", cost: 1500 }, { label: "Cono / vaso", cost: 400 }, { label: "Topping", cost: 600 }] },
  crispetera: { product: "crispetas", label: "Crispetas", unitLabel: "porción", salePrice: 5000, salePriceMax: 15000, unitsDay: 40, unitsMax: 300, insumos: [{ label: "Maíz", cost: 300 }, { label: "Aceite / mantequilla", cost: 250 }, { label: "Saborizante", cost: 150 }, { label: "Cono / empaque", cost: 300 }] },
  algodonera: { product: "algodon", label: "Algodón de azúcar", unitLabel: "unidad", salePrice: 4000, salePriceMax: 12000, unitsDay: 40, unitsMax: 300, insumos: [{ label: "Azúcar", cost: 200 }, { label: "Cono", cost: 150 }, { label: "Palo / bolsa", cost: 100 }] },
  freidora: { product: "fritos", label: "Papas / fritos", unitLabel: "porción", salePrice: 9000, salePriceMax: 25000, unitsDay: 40, unitsMax: 250, insumos: [{ label: "Papa / proteína", cost: 1800 }, { label: "Aceite (prorrateado)", cost: 700 }, { label: "Salsas + empaque", cost: 500 }] },
  plancha: { product: "plancha", label: "Comida a la plancha", unitLabel: "plato", salePrice: 12000, salePriceMax: 30000, unitsDay: 25, unitsMax: 200, insumos: [{ label: "Proteína", cost: 3500 }, { label: "Acompañamiento", cost: 1500 }, { label: "Empaque", cost: 500 }] },
  "asador-salchichas": { product: "perro", label: "Perro caliente", unitLabel: "unidad", salePrice: 8000, salePriceMax: 25000, unitsDay: 25, unitsMax: 200, insumos: [{ label: "Pan", cost: 600 }, { label: "Salchicha", cost: 1500 }, { label: "Salsas + toppings", cost: 800 }, { label: "Empaque", cost: 300 }] },
  sandwichera: { product: "sandwich", label: "Sándwich / panini", unitLabel: "unidad", salePrice: 9000, salePriceMax: 25000, unitsDay: 25, unitsMax: 200, insumos: [{ label: "Pan", cost: 800 }, { label: "Relleno", cost: 2500 }, { label: "Empaque", cost: 400 }] },
  hamburguesa: { product: "hamburguesa", label: "Hamburguesa", unitLabel: "unidad", salePrice: 14000, salePriceMax: 30000, unitsDay: 25, unitsMax: 200, insumos: [{ label: "Carne", cost: 3500 }, { label: "Pan", cost: 800 }, { label: "Toppings", cost: 1500 }, { label: "Empaque", cost: 400 }] },
  donas: { product: "donas", label: "Donas", unitLabel: "unidad", salePrice: 3500, salePriceMax: 12000, unitsDay: 80, unitsMax: 400, insumos: [{ label: "Masa", cost: 500 }, { label: "Glaseado / topping", cost: 400 }, { label: "Empaque", cost: 200 }] },
  horno: { product: "horneado", label: "Horneado / pastelería", unitLabel: "porción", salePrice: 4500, salePriceMax: 15000, unitsDay: 30, unitsMax: 200, insumos: [{ label: "Masa / mezcla", cost: 800 }, { label: "Relleno / topping", cost: 600 }, { label: "Empaque", cost: 300 }] },
  amasadora: { product: "pan", label: "Pan", unitLabel: "unidad", salePrice: 2500, salePriceMax: 12000, unitsDay: 180, unitsMax: 800, insumos: [{ label: "Harina", cost: 600 }, { label: "Levadura / mantequilla / huevo", cost: 350 }, { label: "Empaque", cost: 150 }] },
};

export function typeLine(type: string | undefined): TypeLine | undefined {
  return type ? TYPE_LINES[type] : undefined;
}
