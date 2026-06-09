import { permanentRedirect } from "next/navigation";

// La calculadora y "arma tu negocio" se fusionaron en una sola herramienta.
// Mantenemos /alimentec/calcular como redirect permanente para no romper enlaces.
export default function CalcularRedirect() {
  permanentRedirect("/alimentec/arma-tu-negocio");
}
