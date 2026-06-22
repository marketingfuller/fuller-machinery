import type { Product } from "./types";

// ────────────────────────────────────────────────────────────
// Productos AÑADIDOS A MANO (no vienen del import de WooCommerce).
// Fuente: fichas técnicas Fuller (specs/precio reales). Imágenes en Supabase
// (WebP, subidas con scripts/upload-product-photos.mjs).
// Este archivo NO lo regenera ningún composer — editar a mano.
// ────────────────────────────────────────────────────────────

export const nuevosProducts: Product[] = [
  {
    slug: "maquina-hamburguesa-ufo",
    name: "Máquina para Hamburguesa Tipo UFO · Prensa de Gofres Rellenos",
    category: "snacks",
    categoryLabel: "Snacks y Comida Rápida",
    shortDescription:
      "Máquina eléctrica para hamburguesas y gofres tipo UFO: sella y cocina relleno de forma uniforme. Producto novedoso y rentable para comidas rápidas.",
    description:
      "## Hamburguesas y gofres tipo UFO, sellados y rellenos en minutos\n\n" +
      "La **Máquina para Hamburguesa Tipo UFO** prensa, sella y cocina gofres rellenos tipo *UFO* de forma uniforme, con moldes de cocción que dan una presentación redonda perfecta y un sellado parejo en cada preparación.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Comidas rápidas, food trucks, cafeterías, restaurantes y emprendimientos gastronómicos que buscan un producto diferente, llamativo y de alto margen.\n\n" +
      "### Por qué conviene\n" +
      "- **Calienta hasta 300 °C** para sellar y cocinar rápido, con buena textura.\n" +
      "- **Temporizador y control de temperatura** por perilla para resultados consistentes.\n" +
      "- **Compacta (8,95 kg)**: ocupa poco espacio en cocina o barra.\n" +
      "- **110V / 1.6 kW**: se conecta a un tomacorriente estándar.",
    highlights: [
      "Sella y cocina hasta 300 °C",
      "Moldes de cocción para gofre UFO",
      "Temporizador + control de temperatura",
      "Compacta, 110V (toma estándar)",
    ],
    images: [
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-hamburguesa-ufo/0.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-hamburguesa-ufo/1.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-hamburguesa-ufo/2.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-hamburguesa-ufo/3.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-hamburguesa-ufo/4.webp",
    ],
    specs: [
      { label: "Voltaje", value: "110 V" },
      { label: "Potencia", value: "1.6 kW" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Peso", value: "8,95 kg" },
      { label: "Temperatura máxima", value: "300 °C" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 783900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: [
      "máquina hamburguesa UFO",
      "gofre relleno UFO",
      "prensa de gofres",
      "máquina UFO waffle",
      "comida rápida UFO",
    ],
    whatsappMessage:
      "Hola, me interesa la Máquina para Hamburguesa Tipo UFO. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "camara-fermentacion-16-bandejas",
    name: "Cámara de Fermentación para Panadería · 16 Bandejas",
    category: "panaderia",
    categoryLabel: "Panadería y Repostería",
    shortDescription:
      "Cámara de fermentación (leudado) con control de temperatura y humedad para 16 bandejas. Masas que crecen parejas y a tiempo, todos los días.",
    description:
      "## Fermentación controlada para panes que crecen parejos\n\n" +
      "La **Cámara de Fermentación para Panadería** (también llamada cámara de *crecimiento* o de *leudado*) controla con precisión la **temperatura (30–60 °C)** y la **humedad (70–90 % RH)** para que tus masas leuden de forma uniforme y en el tiempo justo, sin depender del clima ni de la hora del día.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Panaderías, pastelerías y puntos de horneado que necesitan fermentación constante y predecible para producir pan, hojaldre y bollería con calidad pareja.\n\n" +
      "### Por qué conviene\n" +
      "- **16 bandejas** de capacidad para producción seria.\n" +
      "- **Control de temperatura y humedad** para un leudado uniforme.\n" +
      "- **Acero inoxidable** con puerta de visor para vigilar el proceso.\n" +
      "- Estructura vertical (49 × 69 × 188 cm): **aprovecha el alto, no el piso**.\n\n" +
      "> Nota: es una cámara de fermentación, **no hornea** — se complementa con tu horno.",
    highlights: [
      "Capacidad para 16 bandejas",
      "Temperatura 30–60 °C controlada",
      "Humedad 70–90 % RH",
      "Acero inoxidable con puerta visor",
    ],
    images: [
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/0.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/1.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/2.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/3.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/4.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/panaderia/camara-fermentacion-16-bandejas/5.webp",
    ],
    specs: [
      { label: "Capacidad", value: "16 bandejas" },
      { label: "Temperatura", value: "30–60 °C" },
      { label: "Humedad", value: "70–90 % RH" },
      { label: "Voltaje", value: "110 V" },
      { label: "Potencia", value: "1.6 kW" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Dimensiones", value: "49 × 69 × 188 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 2458540,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: [
      "cámara de fermentación",
      "cámara de crecimiento panadería",
      "cámara de leudado",
      "fermentadora de masas",
      "proofer panadería",
      "cámara fermentación 16 bandejas",
    ],
    whatsappMessage:
      "Hola, me interesa la Cámara de Fermentación para Panadería (16 bandejas). ¿Me das precio y disponibilidad?",
  },
  {
    slug: "maquina-corn-dogs-coreanos",
    name: "Máquina para Corn Dogs Coreanos · Perros de Maíz",
    category: "snacks",
    categoryLabel: "Snacks y Comida Rápida",
    shortDescription:
      "Máquina eléctrica para corn dogs coreanos (perros de maíz): 6 unidades por tanda, placa moldeada y cocción uniforme. Producto viral y de alta rotación.",
    description:
      "## Corn dogs coreanos: el snack viral, listo en minutos\n\n" +
      "La **Máquina para Corn Dogs Coreanos** (perros de maíz) trae una **placa especial moldeada para 6 unidades por tanda**, con cocción pareja y control automático de temperatura hasta **250 °C**. Prepara el snack de moda con una presentación atractiva y consistente en cada ronda.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Comidas rápidas, ferias, food trucks, heladerías y emprendimientos que buscan un producto llamativo, de alta rotación y excelente margen.\n\n" +
      "### Por qué conviene\n" +
      "- **6 corn dogs por tanda** para atender alta demanda.\n" +
      "- **Hasta 250 °C** con calentamiento rápido y cocción uniforme.\n" +
      "- **Temporizador 0–5 min** para resultados parejos sin estar pendiente.\n" +
      "- **Compacta (31 × 22 × 23 cm)** y de uso comercial: cabe en cualquier barra.",
    highlights: [
      "Placa para 6 corn dogs por tanda",
      "Calienta hasta 250 °C",
      "Temporizador integrado 0–5 min",
      "Compacta, 110V (toma estándar)",
    ],
    images: [
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-corn-dogs-coreanos/0.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-corn-dogs-coreanos/1.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-corn-dogs-coreanos/2.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-corn-dogs-coreanos/3.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/snacks/maquina-corn-dogs-coreanos/4.webp",
    ],
    specs: [
      { label: "Capacidad", value: "6 unidades por tanda" },
      { label: "Temperatura máxima", value: "250 °C" },
      { label: "Temporizador", value: "0–5 minutos" },
      { label: "Voltaje", value: "110 V" },
      { label: "Potencia", value: "1.5 kW" },
      { label: "Frecuencia", value: "60 Hz" },
      { label: "Peso", value: "9 kg" },
      { label: "Dimensiones", value: "31.2 × 22.2 × 23 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 998900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: [
      "máquina corn dog coreano",
      "máquina perros de maíz",
      "corn dog coreano",
      "waflera corn dog",
      "máquina hot dog de maíz",
      "snack coreano máquina",
    ],
    whatsappMessage:
      "Hola, me interesa la Máquina para Corn Dogs Coreanos (perros de maíz). ¿Me das precio y disponibilidad?",
  },
  {
    slug: "selladora-de-latas-manual",
    name: "Selladora de Latas Manual · Sistema de Palanca",
    category: "bebidas",
    categoryLabel: "Bebidas y Café",
    type: "selladora-latas",
    shortDescription:
      "Selladora de latas y botellas manual por palanca, con pantalla digital y contador. Sella hasta 7 unidades por minuto: la opción económica para arrancar.",
    description:
      "## Sella tus latas con presentación profesional, sin complicarte\n\n" +
      "Selladora **manual** para latas y botellas mediante **sistema de palanca**, con **pantalla digital y contador** de sellados. Práctica y segura, sella hasta **7 unidades por minuto** — ideal para empezar tu línea de bebidas con una inversión menor.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Emprendimientos de bebidas, cafeterías, jugueras y negocios que venden bebidas selladas con buena presentación y volúmenes moderados.\n\n" +
      "### Por qué conviene\n" +
      "- **Sistema de palanca** sencillo y resistente.\n" +
      "- **Pantalla digital con contador** para llevar control.\n" +
      "- **Hasta 7 latas/min** para arrancar tu operación.\n" +
      "- **Compacta (33.5 × 22 × 47.5 cm)** y de bajo consumo (200W).",
    highlights: [
      "Sellado manual por palanca",
      "Pantalla digital con contador",
      "Hasta 7 latas por minuto",
      "Compacta y de bajo consumo",
    ],
    images: [
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/0.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/1.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/2.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/3.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/4.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-manual/5.webp",
    ],
    specs: [
      { label: "Capacidad", value: "7 latas/min" },
      { label: "Operación", value: "Manual (palanca)" },
      { label: "Pantalla", value: "Digital con contador" },
      { label: "Voltaje", value: "110 V" },
      { label: "Potencia", value: "200 W" },
      { label: "Dimensiones", value: "33.5 × 22 × 47.5 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 1786900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: [
      "selladora de latas manual",
      "selladora de latas",
      "selladora de bebidas",
      "selladora de botellas",
      "máquina selladora de latas",
    ],
    whatsappMessage:
      "Hola, me interesa la Selladora de Latas Manual. ¿Me das precio y disponibilidad?",
  },
  {
    slug: "selladora-de-latas-full-automatica",
    name: "Selladora de Latas Full Automática · Elevación Automática",
    category: "bebidas",
    categoryLabel: "Bebidas y Café",
    type: "selladora-latas",
    shortDescription:
      "Selladora de latas y botellas totalmente automática, con elevación automática y panel digital. Sella hasta 8 unidades por minuto para alta rotación.",
    description:
      "## Sella latas en serie, rápido y parejo\n\n" +
      "Selladora **totalmente automática** para latas y botellas, con **sistema de elevación automática** y **panel de control digital**. Sella de forma rápida, segura y uniforme hasta **8 unidades por minuto** — pensada para negocios con alta demanda.\n\n" +
      "### ¿Para qué negocios es ideal?\n" +
      "Marcas de bebidas, cervecerías artesanales, jugueras y operaciones que sellan grandes volúmenes y necesitan ritmo constante.\n\n" +
      "### Por qué conviene\n" +
      "- **Elevación automática**: colocas la lata y la máquina hace el resto.\n" +
      "- **Panel de control digital** para ajustes precisos.\n" +
      "- **Hasta 8 latas/min** para sostener alta rotación.\n" +
      "- **Acero y estructura robusta** (45 × 25.4 × 60 cm) para uso intensivo.",
    highlights: [
      "Operación 100% automática",
      "Elevación automática de lata",
      "Panel de control digital",
      "Hasta 8 latas por minuto",
    ],
    images: [
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/0.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/1.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/2.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/3.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/4.webp",
      "https://awxewohsgzpvnkxffmgj.supabase.co/storage/v1/object/public/product-images/bebidas/selladora-de-latas-full-automatica/5.webp",
    ],
    specs: [
      { label: "Capacidad", value: "8 latas/min" },
      { label: "Operación", value: "Automática (elevación automática)" },
      { label: "Panel", value: "Control digital" },
      { label: "Voltaje", value: "110 V" },
      { label: "Potencia", value: "220 W" },
      { label: "Dimensiones", value: "45 × 25.4 × 60 cm" },
    ],
    badge: { text: "Nuevo", color: "bg-accent" },
    price: 3879900,
    currency: "COP",
    stockStatus: "in_stock",
    keywords: [
      "selladora de latas automática",
      "selladora de latas full automática",
      "selladora de bebidas automática",
      "selladora de latas",
      "máquina selladora de latas",
    ],
    whatsappMessage:
      "Hola, me interesa la Selladora de Latas Full Automática. ¿Me das precio y disponibilidad?",
  },
];
