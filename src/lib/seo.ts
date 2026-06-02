import type { Metadata } from "next";

export const SITE_URL = "https://www.fullermachinery.com";
export const SITE_NAME = "Fuller Machinery";
export const DEFAULT_OG_IMAGE = "/images/logo-fuller.webp";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
};

/**
 * Unified metadata builder — garantiza canonical + OpenGraph + Twitter Card coherentes.
 * Uso: `export const metadata = buildMetadata({ title, description, path: "/negocios/snacks" })`
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
    keywords,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    section,
    noIndex,
  } = input;

  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_CO",
      type,
      images: [{ url: fullImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImage],
    },
  };
}

// ────────────────────────────────────────────────────────────
// JSON-LD builders
// ────────────────────────────────────────────────────────────

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}): object {
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${SITE_URL}${input.image}`
    : `${SITE_URL}${DEFAULT_OG_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: [image],
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
    author: {
      "@type": "Organization",
      name: input.author ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-fuller.webp`,
      },
    },
    mainEntityOfPage: `${SITE_URL}${input.path}`,
    ...(input.section && { articleSection: input.section }),
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  path: string;
  images?: string[];
  sku?: string;
  brand?: string;
  category?: string;
  // Comercial — opcional. Hoy (modelo WhatsApp) se omite el precio y se
  // declara disponibilidad genérica; en fase 2 se pasa price + currency.
  price?: number | null;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}): object {
  const url = `${SITE_URL}${input.path}`;
  const images = (input.images?.length ? input.images : [DEFAULT_OG_IMAGE]).map(
    (img) => (img.startsWith("http") ? img : `${SITE_URL}${img}`),
  );

  const offers =
    input.price != null
      ? {
          "@type": "Offer",
          price: input.price,
          priceCurrency: input.currency ?? "COP",
          availability: `https://schema.org/${input.availability ?? "InStock"}`,
          url,
          seller: { "@type": "Organization", name: SITE_NAME },
        }
      : {
          // Sin precio público: declaramos la oferta como "consultar" para que
          // el producto sea elegible como rich result sin inventar un precio.
          "@type": "Offer",
          availability: `https://schema.org/${input.availability ?? "InStock"}`,
          url,
          seller: { "@type": "Organization", name: SITE_NAME },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: input.currency ?? "COP",
          },
        };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: images,
    ...(input.sku && { sku: input.sku }),
    ...(input.category && { category: input.category }),
    brand: { "@type": "Brand", name: input.brand ?? SITE_NAME },
    offers,
  };
}

export function itemListJsonLd(input: {
  name: string;
  items: { name: string; url?: string; image?: string }[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url && { url: it.url }),
      ...(it.image && { image: it.image }),
    })),
  };
}
