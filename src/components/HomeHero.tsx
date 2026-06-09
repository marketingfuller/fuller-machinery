"use client";

import { useEffect, useState } from "react";
import SplitHero from "@/components/SplitHero";
import FairHero from "@/components/FairHero";
import { isFairWindowOpen } from "@/content/alimentec";
import type { HeroSide } from "@/lib/whatsapp";

type Props = {
  left: HeroSide;
  right: HeroSide;
  /** Decisión del servidor (evita mismatch de hidratación); el cliente la reevalúa. */
  fairOpen: boolean;
};

/**
 * Selector de hero de la home: durante Alimentec muestra el FairHero (foto del
 * stand); fuera de la feria, el SplitHero normal. Usa la decisión del servidor
 * como estado inicial y la recalcula en el cliente, de modo que si la caché del
 * servidor quedó desfasada al terminar la feria, nunca quedamos sin hero.
 */
export default function HomeHero({ left, right, fairOpen }: Props) {
  const [fair, setFair] = useState(fairOpen);

  useEffect(() => {
    setFair(isFairWindowOpen());
  }, []);

  return fair ? <FairHero /> : <SplitHero left={left} right={right} />;
}
