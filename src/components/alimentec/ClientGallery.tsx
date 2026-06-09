import Image from "next/image";
import { CLIENT_LOGOS } from "@/content/alimentec";

// Galería de clientes reales. APAGADA mientras no haya logos/fotos con permiso
// explícito (memoria feedback-honest-data: jamás fabricar prueba social).
// Cuando Fuller entregue logos autorizados → poblar CLIENT_LOGOS y se activa sola.
export default function ClientGallery() {
  if (CLIENT_LOGOS.length === 0) return null;

  return (
    <section className="py-16 bg-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        <p className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-10">
          Negocios que ya confían en Fuller
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {CLIENT_LOGOS.map((c) => (
            <Image
              key={c.name}
              src={c.logo}
              alt={`${c.name} — cliente de Fuller Machinery`}
              width={140}
              height={56}
              className="h-12 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
