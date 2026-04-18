"use client";

import { useEffect } from "react";

/**
 * Deterrente ligero contra descarga casual de imágenes:
 * - Bloquea click derecho sobre <img>
 * - Bloquea drag sobre <img>
 * No protege contra F12, screenshots, ni inspección de red — eso es imposible en web pública.
 */
export default function ImageGuard() {
  useEffect(() => {
    const isImage = (t: EventTarget | null): boolean =>
      t instanceof HTMLImageElement ||
      (t instanceof HTMLElement && t.tagName === "PICTURE");

    const onContextMenu = (e: MouseEvent) => {
      if (isImage(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isImage(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
