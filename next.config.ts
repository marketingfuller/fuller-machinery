import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js hydration y framer-motion requieren inline scripts (sin 'unsafe-eval')
  "script-src 'self' 'unsafe-inline'",
  // Framer Motion / Tailwind / Material Symbols requieren inline styles + Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Imágenes: propias + data/blob + tienda.fullermachinery.com + Unsplash (2 refs pendientes de reemplazar)
  "img-src 'self' data: blob: https://images.unsplash.com https://tienda.fullermachinery.com",
  // Iframes permitidos: Google Maps (/nosotros) + TikTok embed (/negocios/bebidas)
  "frame-src https://www.google.com https://maps.google.com https://www.tiktok.com",
  // Impedir que el sitio sea incrustado en iframes de terceros (anti-clickjacking)
  "frame-ancestors 'self'",
  // Sin conexiones salientes externas (todos los WhatsApp son navegación, no fetch)
  "connect-src 'self'",
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
    ];
  },
};

export default nextConfig;
