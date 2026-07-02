import type { NextConfig } from "next";

// En desarrollo, React + Turbopack requieren eval() para HMR y debugging.
// En producción NUNCA se usa eval, así que mantenemos el CSP estricto.
const isDev = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js hydration y framer-motion requieren inline scripts.
  // 'unsafe-eval' solo en dev (HMR de React/Turbopack); en prod se omite.
  // zocam.app: carga de zocam-analytics.js
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://zocam.app`,
  // Framer Motion / Tailwind / Material Symbols requieren inline styles + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Imágenes: propias + data/blob + tienda.fullermachinery.com + Unsplash (2 refs pendientes de reemplazar)
  "img-src 'self' data: blob: https://images.unsplash.com https://tienda.fullermachinery.com https://awxewohsgzpvnkxffmgj.supabase.co",
  // Iframes permitidos: Google Maps (/nosotros) + TikTok embed (/negocios/bebidas)
  "frame-src https://www.google.com https://maps.google.com https://www.tiktok.com",
  // Impedir que el sitio sea incrustado en iframes de terceros (anti-clickjacking)
  "frame-ancestors 'self'",
  // Supabase para auth + datos del CMS (navegación de WhatsApp sigue siendo ok)
  // zocam.app: POST de pings de analítica al endpoint /collect
  "connect-src 'self' https://awxewohsgzpvnkxffmgj.supabase.co wss://awxewohsgzpvnkxffmgj.supabase.co https://zocam.app",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

// Hotlink / hotcopy deterrent para archivos estáticos de /images
const imageHeaders = [
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  // Evita que Google indexe las imágenes como recursos separados en Images search
  { key: "X-Robots-Tag", value: "noimageindex" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Subida de fotos de productos: el límite default de Server Actions es 1MB,
  // que bloquea fotos normales. Subimos a 25MB (varias fotos de hasta 5MB c/u).
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    // Las imágenes ya están comprimidas a WebP livianos en Supabase
    // (scripts/compress-images-webp.mjs). Servimos directo sin pasar por el
    // optimizador de Vercel, cuya cuota se agotó y devolvía 402
    // (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) rompiendo imágenes.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "awxewohsgzpvnkxffmgj.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: imageHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/emprende", permanent: true },
      {
        source: "/blog/:slug*",
        destination: "/emprende/:slug*",
        permanent: true,
      },
      // Algodonera negro/rosado fusionadas en una sola ficha con selector de
      // color (variantes). La antigua ficha del color negro ahora redirige.
      {
        source: "/productos/algodonera-con-carro-negra",
        destination: "/productos/maquina-algodonera-industrial-para-eventos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
