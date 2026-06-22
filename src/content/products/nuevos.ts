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
];
