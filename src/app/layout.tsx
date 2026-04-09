import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const SITE_URL = "https://www.fullermachinery.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fuller Machinery | Equipos y Maquinaria para la Industria Alimentaria",
    template: "%s | Fuller Machinery",
  },
  description:
    "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración. Equipos de tendencia para emprendedores y soluciones industriales con servicio técnico propio.",
  keywords: [
    "maquinaria alimentaria Colombia",
    "equipos industriales Bogotá",
    "equipos panadería Colombia",
    "máquinas industriales alimentarias",
    "wafflera burbuja Colombia",
    "granizadora industrial",
    "empaque al vacío Colombia",
    "maquinaria snacks tendencia",
    "equipos cárnicos industriales",
    "capuchinera comercial Colombia",
    "congelador industrial Colombia",
    "servicio técnico maquinaria alimentaria",
    "fuller machinery",
    "maquinaria Bogotá",
    "equipos emprendedores alimentaria",
    "selladora de vasos Colombia",
    "molino de carne industrial",
    "refrigeración industrial Colombia",
  ],
  authors: [{ name: "Fuller Machinery", url: SITE_URL }],
  creator: "Fuller Machinery",
  publisher: "Fuller Machinery",
  robots: {
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Fuller Machinery | Equipos para la Industria Alimentaria",
    description:
      "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración. Servicio técnico propio en Bogotá, Colombia.",
    type: "website",
    url: SITE_URL,
    siteName: "Fuller Machinery",
    locale: "es_CO",
    images: [
      {
        url: "/images/logo-fuller.png",
        width: 1200,
        height: 630,
        alt: "Fuller Machinery — Equipos y Maquinaria para la Industria Alimentaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuller Machinery | Equipos para la Industria Alimentaria",
    description:
      "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración en Colombia.",
    images: ["/images/logo-fuller.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Fuller Machinery",
  description:
    "Maquinaria profesional para panadería, bebidas, snacks, cárnicos, empaque y refrigeración. Soluciones integrales para emprendedores y plantas de producción en Colombia.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-fuller.png`,
  image: `${SITE_URL}/images/logo-fuller.png`,
  telephone: ["+573102852053", "+573244247198", "+573228534925"],
  email: "ventasfullermachinery@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 63B #79-35",
    addressLocality: "Bogotá",
    addressRegion: "Cundinamarca",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "4.6482",
    longitude: "-74.1002",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:00",
      closes: "17:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/fullermachinery/",
    "https://www.tiktok.com/@fuller_machinery",
    "https://www.youtube.com/@fullermachinery118",
  ],
  hasMap: "https://maps.google.com/?q=Calle+63B+%2379-35+Bogotá+Colombia",
  areaServed: {
    "@type": "Country",
    name: "Colombia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg-light text-foreground">
        <CustomCursor />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
