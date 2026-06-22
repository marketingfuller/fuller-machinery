import type { Product } from "./types";

// ────────────────────────────────────────────────────────────
// Línea COCINA INDUSTRIAL (estufas de piso/mesa, parrillas char broiler,
// planchas con horno y bases de chef refrigeradas).
// Fuente: ficha "cocina industrial.pdf" (specs reales) + lista de precios
// oficial (con IVA). Imágenes en Supabase (WebP). Sin códigos de modelo
// internos. Editar a mano (no lo regenera ningún composer).
// ────────────────────────────────────────────────────────────

const IMG = "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/cocina";
// `?v=N` rompe la caché del navegador/CDN cuando se reemplazan fotos en la misma
// ruta (subir v al cambiar imágenes de esta línea).
const IMG_VER = 2;
const imgs = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${IMG}/${slug}/${i}.webp?v=${IMG_VER}`);

export const cocinaProducts: Product[] = [
  // ───────── Estufas de mesa ─────────
  {
    slug: "estufa-mesa-2-quemadores",
    name: "Estufa de Mesa Industrial a Gas · 2 Quemadores",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-mesa",
    shortDescription:
      "Estufa de mesa industrial a gas con 2 quemadores de alto rendimiento y parrillas de hierro fundido. Compacta y potente para mesones de trabajo.",
    description:
      "## Estufa de mesa a gas: potencia compacta para tu cocina\n\n" +
      "Estufa de sobremesa industrial a gas con **2 quemadores de alto rendimiento** y **parrillas de hierro fundido**, ideal para cocinas comerciales que necesitan un equipo potente, fácil de instalar sobre mesones o mesas de trabajo.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes, food trucks, cocinas ocultas y emprendimientos que necesitan cocción potente sin ocupar piso.\n\n" +
      "### Por qué conviene\n" +
      "- **2 quemadores** con control independiente (64.000 BTU GLP totales).\n" +
      "- **Parrillas de hierro fundido** resistentes al uso continuo.\n" +
      "- **Bandeja recolectora de grasa** removible y patas ajustables.\n" +
      "- Funciona con **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "2 quemadores de alto rendimiento",
      "Parrillas de hierro fundido",
      "GLP o gas natural · 64.000 BTU",
      "Compacta, va sobre mesón",
    ],
    images: imgs("estufa-mesa-2-quemadores", 6),
    specs: [
      { label: "Quemadores", value: "2" },
      { label: "Potencia total", value: "64.000 BTU (GLP)" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "30.5 × 72.4 × 34 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 1698900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa de mesa a gas", "estufa industrial 2 quemadores", "estufa sobremesa", "estufa de gas comercial", "cocina industrial a gas"],
    whatsappMessage: "Hola, me interesa la Estufa de Mesa Industrial a Gas de 2 Quemadores. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "estufa-mesa-4-quemadores",
    name: "Estufa de Mesa Industrial a Gas · 4 Quemadores",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-mesa",
    shortDescription:
      "Estufa de mesa industrial a gas con 4 quemadores y parrillas de hierro fundido. Mayor capacidad de cocción en un equipo compacto de sobremesa.",
    description:
      "## Estufa de mesa de 4 quemadores: más capacidad sin ocupar piso\n\n" +
      "Estufa de sobremesa industrial a gas con **4 quemadores de alto rendimiento** y **parrillas de hierro fundido**, para cocinas comerciales que necesitan mayor capacidad de cocción en un equipo compacto.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes, asaderos, food trucks y cocinas con alta demanda que trabajan sobre mesón.\n\n" +
      "### Por qué conviene\n" +
      "- **4 quemadores** con control independiente (128.000 BTU GLP totales).\n" +
      "- **Parrillas de hierro fundido** de alta resistencia.\n" +
      "- **Bandeja de grasa** removible y patas ajustables para nivelar.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "4 quemadores de alto rendimiento",
      "Parrillas de hierro fundido",
      "GLP o gas natural · 128.000 BTU",
      "Compacta, va sobre mesón",
    ],
    images: imgs("estufa-mesa-4-quemadores", 5),
    specs: [
      { label: "Quemadores", value: "4" },
      { label: "Potencia total", value: "128.000 BTU (GLP)" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "61 × 72.4 × 34 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 2672900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa de mesa a gas", "estufa industrial 4 quemadores", "estufa sobremesa", "estufa de gas comercial", "cocina industrial a gas"],
    whatsappMessage: "Hola, me interesa la Estufa de Mesa Industrial a Gas de 4 Quemadores. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "estufa-mesa-6-quemadores",
    name: "Estufa de Mesa Industrial a Gas · 6 Quemadores",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-mesa",
    shortDescription:
      "Estufa de mesa industrial a gas con 6 quemadores heavy duty y parrillas de hierro fundido. Para alta producción y preparación simultánea.",
    description:
      "## Estufa de mesa de 6 quemadores: máxima producción en barra\n\n" +
      "Estufa de sobremesa industrial a gas con **6 quemadores de alto rendimiento** y **parrillas de hierro fundido heavy duty**, diseñada para cocinas comerciales que requieren preparar varios platos a la vez.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes de alto volumen, asaderos y cocinas industriales con varios frentes de preparación.\n\n" +
      "### Por qué conviene\n" +
      "- **6 quemadores** con control individual (192.000 BTU GLP totales).\n" +
      "- **Parrillas de hierro fundido heavy duty** para uso intensivo.\n" +
      "- **Bandeja de grasa** removible y patas ajustables.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "6 quemadores heavy duty",
      "Parrillas de hierro fundido",
      "GLP o gas natural · 192.000 BTU",
      "Alta producción sobre mesón",
    ],
    images: imgs("estufa-mesa-6-quemadores", 5),
    specs: [
      { label: "Quemadores", value: "6" },
      { label: "Potencia total", value: "192.000 BTU (GLP)" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "91.4 × 72.4 × 34 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 3578900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa de mesa a gas", "estufa industrial 6 quemadores", "estufa sobremesa", "estufa de gas comercial", "cocina industrial a gas"],
    whatsappMessage: "Hola, me interesa la Estufa de Mesa Industrial a Gas de 6 Quemadores. ¿Me das precio y disponibilidad?",
  },

  // ───────── Estufas de piso con horno ─────────
  {
    slug: "estufa-industrial-4-quemadores-horno",
    name: "Estufa Industrial a Gas · 4 Quemadores con Horno",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-piso",
    shortDescription:
      "Estufa industrial de piso a gas con 4 quemadores y horno integrado con control independiente. Potencia y versatilidad para cocinas profesionales.",
    description:
      "## Estufa de piso con horno: cocina y hornea en un solo equipo\n\n" +
      "Estufa industrial de piso a gas con **4 quemadores superiores** de hierro fundido y **horno inferior** con control independiente de temperatura, para cocinas comerciales que necesitan potencia, durabilidad y versatilidad.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes, asaderos y cocinas profesionales que cocinan y hornean todo el día.\n\n" +
      "### Por qué conviene\n" +
      "- **4 quemadores** + **horno** con control independiente (150.000 BTU GLP totales).\n" +
      "- **Parrillas superiores de hierro fundido** de alto rendimiento.\n" +
      "- **Ruedas** para mover y limpiar con facilidad.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "4 quemadores + horno integrado",
      "Horno con control independiente",
      "GLP o gas natural · 150.000 BTU",
      "Con ruedas para movilidad",
    ],
    images: imgs("estufa-industrial-4-quemadores-horno", 6),
    specs: [
      { label: "Quemadores", value: "4 + horno" },
      { label: "Potencia total", value: "150.000 BTU (GLP)" },
      { label: "Horno", value: "Inferior, control independiente" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "61 × 80 × 142 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 6768900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa industrial con horno", "estufa de piso a gas", "estufa 4 puestos con horno", "estufa profesional gas", "cocina industrial con horno"],
    whatsappMessage: "Hola, me interesa la Estufa Industrial a Gas de 4 Quemadores con Horno. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "estufa-industrial-6-quemadores-horno",
    name: "Estufa Industrial a Gas · 6 Quemadores con Horno",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-piso",
    shortDescription:
      "Estufa industrial de piso a gas con 6 quemadores heavy duty y horno integrado. Máxima capacidad de cocción y alto desempeño.",
    description:
      "## Estufa de piso de 6 quemadores con horno: para alto volumen\n\n" +
      "Estufa industrial de piso a gas con **6 quemadores de alto rendimiento** y **horno inferior** con control independiente, para cocinas comerciales que requieren mayor capacidad de cocción y desempeño constante.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes de alto volumen, asaderos y cocinas industriales exigentes.\n\n" +
      "### Por qué conviene\n" +
      "- **6 quemadores** + **horno** (215.000 BTU GLP totales).\n" +
      "- **Parrillas de hierro fundido heavy duty**.\n" +
      "- **Ruedas con freno** para fácil movilidad.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "6 quemadores + horno integrado",
      "Parrillas heavy duty",
      "GLP o gas natural · 215.000 BTU",
      "Ruedas con freno",
    ],
    images: imgs("estufa-industrial-6-quemadores-horno", 5),
    specs: [
      { label: "Quemadores", value: "6 + horno" },
      { label: "Potencia total", value: "215.000 BTU (GLP)" },
      { label: "Horno", value: "Inferior, control independiente" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "91.4 × 80 × 142 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 7255900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa industrial con horno", "estufa de piso a gas", "estufa 6 puestos con horno", "estufa profesional gas", "cocina industrial con horno"],
    whatsappMessage: "Hola, me interesa la Estufa Industrial a Gas de 6 Quemadores con Horno. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "estufa-industrial-4-quemadores-plancha-horno",
    name: "Estufa Industrial a Gas · 4 Quemadores con Plancha y Horno",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-piso",
    shortDescription:
      "Estufa industrial combinada: 4 quemadores, plancha de cocción y horno integrado. Máxima versatilidad para cocinas profesionales.",
    description:
      "## Estufa combinada: quemadores, plancha y horno en un equipo\n\n" +
      "Estufa industrial de piso con **4 quemadores superiores**, **plancha de acero** de alta resistencia y **horno inferior** integrado, para brindar máxima versatilidad y eficiencia en cocinas profesionales.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes, asaderos y parrillas que necesitan quemadores, plancha y horno sin sumar varios equipos.\n\n" +
      "### Por qué conviene\n" +
      "- **4 quemadores + plancha + horno** (≈183.000 BTU GLP totales).\n" +
      "- **Plancha de acero** de alta resistencia para carnes y desayunos.\n" +
      "- **Controles independientes** y **ruedas con freno**.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "4 quemadores + plancha + horno",
      "Plancha de acero resistente",
      "GLP o gas natural · ~183.000 BTU",
      "3 equipos en uno",
    ],
    images: imgs("estufa-industrial-4-quemadores-plancha-horno", 6),
    specs: [
      { label: "Quemadores", value: "4 + plancha + horno" },
      { label: "Potencia total", value: "≈183.000 BTU (GLP)" },
      { label: "Plancha", value: "1 sección de acero" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "91.4 × 80 × 142 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 7654900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa con plancha y horno", "estufa industrial combinada", "estufa de piso a gas", "estufa 4 quemadores plancha horno", "cocina industrial"],
    whatsappMessage: "Hola, me interesa la Estufa Industrial de 4 Quemadores con Plancha y Horno. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "estufa-industrial-plancha-horno",
    name: "Estufa Industrial a Gas · Plancha y Horno",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "estufa-piso",
    shortDescription:
      "Estufa industrial de piso con plancha de cocción y horno integrado. Ideal para carnes, hamburguesas y desayunos a la plancha.",
    description:
      "## Estufa plancha con horno: todo a la plancha, a alto volumen\n\n" +
      "Estufa industrial de piso con **plancha superior de acero** de alta resistencia y **horno inferior** integrado, ideal para la preparación de carnes, hamburguesas, desayunos y alimentos a la plancha en cocinas profesionales.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Hamburgueserías, asaderos, food trucks y restaurantes con fuerte demanda de plancha.\n\n" +
      "### Por qué conviene\n" +
      "- **Plancha de 2 quemadores** + **horno** (≈82.000 BTU GLP totales).\n" +
      "- **Plancha de acero** de alta resistencia con control independiente.\n" +
      "- **Bandeja recolectora de grasa** y diseño robusto comercial.\n" +
      "- **GLP o gas natural**, en acero inoxidable.",
    highlights: [
      "Plancha de acero + horno integrado",
      "Control independiente de temperatura",
      "GLP o gas natural · ~82.000 BTU",
      "Diseño robusto comercial",
    ],
    images: imgs("estufa-industrial-plancha-horno", 5),
    specs: [
      { label: "Configuración", value: "Plancha (2 quemadores) + horno" },
      { label: "Potencia total", value: "≈82.000 BTU (GLP)" },
      { label: "Plancha", value: "Acero de alta resistencia" },
      { label: "Tipo de gas", value: "GLP / Gas natural" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "61 × 80 × 142 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 6965900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["estufa plancha con horno", "plancha industrial a gas", "estufa de piso plancha", "plancha asadora con horno", "cocina industrial"],
    whatsappMessage: "Hola, me interesa la Estufa Industrial a Gas con Plancha y Horno. ¿Me das precio y disponibilidad?",
  },

  // ───────── Parrillas char broiler ─────────
  {
    slug: "parrilla-char-broiler-2-quemadores",
    name: "Parrilla Char Broiler Radiante a Gas · 2 Quemadores",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "parrilla-char-broiler",
    shortDescription:
      "Parrilla profesional a gas con calor radiante para cocción uniforme de carnes, hamburguesas y pollo. Potente y fácil de limpiar.",
    description:
      "## Parrilla char broiler: el sellado perfecto a la brasa\n\n" +
      "Parrilla profesional a gas con **sistema de calor radiante** para una cocción **uniforme y eficiente** de carnes, hamburguesas, pollo y otros alimentos. Ideal para cocinas comerciales que buscan potencia, durabilidad y fácil limpieza.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Hamburgueserías, asaderos, steak houses y restaurantes con carta a la parrilla.\n\n" +
      "### Por qué conviene\n" +
      "- **2 quemadores** de 35.000 BTU c/u (70.000 BTU totales).\n" +
      "- **Calor radiante** para distribución pareja y buen sellado.\n" +
      "- **Bandeja de grasa** removible y **patas ajustables**.\n" +
      "- **Gas natural o propano**, en acero inoxidable.",
    highlights: [
      "Calor radiante, cocción uniforme",
      "2 quemadores · 70.000 BTU",
      "Bandeja de grasa removible",
      "Gas natural o propano",
    ],
    images: imgs("parrilla-char-broiler-2-quemadores", 5),
    specs: [
      { label: "Quemadores", value: "2" },
      { label: "Potencia total", value: "70.000 BTU/h" },
      { label: "Sistema", value: "Calor radiante" },
      { label: "Tipo de gas", value: "Gas natural / Propano" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "61 × 73 × 39 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 2598900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["parrilla char broiler", "parrilla a gas industrial", "parrilla radiante", "asador de carnes a gas", "char broiler"],
    whatsappMessage: "Hola, me interesa la Parrilla Char Broiler Radiante a Gas de 2 Quemadores. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "parrilla-char-broiler-3-quemadores",
    name: "Parrilla Char Broiler Radiante a Gas · 3 Quemadores",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "parrilla-char-broiler",
    shortDescription:
      "Parrilla profesional a gas de calor radiante con mayor área de cocción. Alto rendimiento para carnes y alimentos a la parrilla.",
    description:
      "## Parrilla char broiler XL: más área, más rendimiento\n\n" +
      "Parrilla profesional a gas con **sistema radiante de mayor capacidad**, diseñada para cocinas comerciales que requieren más **área de cocción** y alto rendimiento en la preparación de carnes y alimentos a la parrilla.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Asaderos de alto volumen, steak houses y restaurantes con fuerte demanda de parrilla.\n\n" +
      "### Por qué conviene\n" +
      "- **3 quemadores** de 35.000 BTU c/u (105.000 BTU totales).\n" +
      "- **Calor radiante** para sellado uniforme.\n" +
      "- **Bandeja de grasa** removible y **patas ajustables**.\n" +
      "- **Gas natural o propano**, en acero inoxidable.",
    highlights: [
      "Calor radiante, mayor área",
      "3 quemadores · 105.000 BTU",
      "Bandeja de grasa removible",
      "Gas natural o propano",
    ],
    images: imgs("parrilla-char-broiler-3-quemadores", 5),
    specs: [
      { label: "Quemadores", value: "3" },
      { label: "Potencia total", value: "105.000 BTU/h" },
      { label: "Sistema", value: "Calor radiante" },
      { label: "Tipo de gas", value: "Gas natural / Propano" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "91 × 73 × 39 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 3061900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: ["parrilla char broiler", "parrilla a gas industrial", "parrilla radiante", "asador de carnes a gas", "char broiler"],
    whatsappMessage: "Hola, me interesa la Parrilla Char Broiler Radiante a Gas de 3 Quemadores. ¿Me das precio y disponibilidad?",
  },

  // ───────── Bases de chef refrigeradas ─────────
  {
    slug: "base-refrigerada-chef-2-cajones",
    name: "Base Refrigerada para Chef · 2 Cajones",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "base-refrigerada",
    shortDescription:
      "Base refrigerada con 2 cajones y superficie de trabajo: mantén los ingredientes fríos y listos en tu estación de cocina.",
    description:
      "## Base refrigerada para chef: tu mise en place siempre frío\n\n" +
      "Base refrigerada con **cajones**, diseñada para mantener ingredientes fríos y listos en cocina. Combina **superficie superior de trabajo** + **almacenamiento refrigerado**, una estación todo-en-uno para servicio ágil.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes, hamburgueserías, pizzerías y cocinas que necesitan ingredientes fríos a la mano en la línea de preparación.\n\n" +
      "### Por qué conviene\n" +
      "- **Control digital de temperatura** (0.5–3.3 °C) y **deshielo automático**.\n" +
      "- **Acero inoxidable** interior y exterior, fácil de limpiar.\n" +
      "- **2 cajones** de alta resistencia y **ruedas con freno**.\n" +
      "- Refrigerante ecológico **R290**, compresor 1/5 HP, 110V.",
    highlights: [
      "Superficie de trabajo + refrigeración",
      "Control digital 0.5–3.3 °C",
      "Deshielo automático",
      "Acero inox · ruedas con freno",
    ],
    images: imgs("base-refrigerada-chef-2-cajones", 5),
    specs: [
      { label: "Cajones", value: "2" },
      { label: "Temperatura", value: "0.5 – 3.3 °C" },
      { label: "Compresor", value: "1/5 HP · refrigerante R290" },
      { label: "Deshielo", value: "Automático" },
      { label: "Energía", value: "110V / 60Hz" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "133 × 81.9 × 63.5 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: null,
    currency: "COP",
    stockStatus: "on_request",
    keywords: ["base refrigerada chef", "mesa refrigerada cajones", "base de trabajo refrigerada", "estación de cocina refrigerada", "cocina industrial"],
    whatsappMessage: "Hola, me interesa la Base Refrigerada para Chef de 2 Cajones. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "base-refrigerada-chef-2-cajones-xl",
    name: "Base Refrigerada para Chef · 2 Cajones · Mayor Capacidad",
    category: "cocina",
    categoryLabel: "Cocina Industrial",
    type: "base-refrigerada",
    shortDescription:
      "Base refrigerada de mayor capacidad con 2 cajones y superficie de trabajo, para cocinas que necesitan más volumen de ingredientes listos.",
    description:
      "## Base refrigerada XL: más volumen, misma eficiencia\n\n" +
      "Base refrigerada de **mayor capacidad**, pensada para cocinas que necesitan más espacio de trabajo y mayor volumen de ingredientes listos para servicio. Mantiene la temperatura estable y mejora la eficiencia en estaciones de preparación.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Restaurantes de alto volumen, cocinas ocultas y operaciones con líneas de preparación exigentes.\n\n" +
      "### Por qué conviene\n" +
      "- **Control digital de temperatura** (0.5–3.3 °C) y **deshielo automático**.\n" +
      "- **Acero inoxidable** interior y exterior, cajones reforzados.\n" +
      "- Capacidad para **bandejas 1/6 (2–18)** según configuración.\n" +
      "- Refrigerante ecológico **R290**, compresor 1/5 HP, 110V.",
    highlights: [
      "Mayor capacidad de almacenamiento",
      "Control digital 0.5–3.3 °C",
      "Cajones reforzados · ruedas con freno",
      "Acero inox · deshielo automático",
    ],
    images: imgs("base-refrigerada-chef-2-cajones-xl", 6),
    specs: [
      { label: "Cajones", value: "2" },
      { label: "Temperatura", value: "0.5 – 3.3 °C" },
      { label: "Capacidad bandejas 1/6", value: "2 – 18" },
      { label: "Compresor", value: "1/5 HP · refrigerante R290" },
      { label: "Energía", value: "110V / 60Hz" },
      { label: "Material", value: "Acero inoxidable" },
      { label: "Dimensiones", value: "133.4 × 81.9 × 63.5 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: null,
    currency: "COP",
    stockStatus: "on_request",
    keywords: ["base refrigerada chef", "mesa refrigerada cajones", "base de trabajo refrigerada mayor capacidad", "estación de cocina refrigerada", "cocina industrial"],
    whatsappMessage: "Hola, me interesa la Base Refrigerada para Chef de 2 Cajones (mayor capacidad). ¿Me das precio y disponibilidad?",
  },
];
