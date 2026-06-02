# Estándar CRO — Páginas de Producto (Fuller Machinery)

> **Obligatorio.** Toda página de producto (`/productos/[slug]`) y el catálogo deben
> seguir este manual. Es la referencia de cómo diseñamos y evolucionamos las fichas.
> Fuente: manual de optimización CRO entregado por el cliente (2026-06-01).

## Principio rector
El diseño de conversión es **psicología aplicada a la interfaz, no estética**. La misma
oferta y tráfico rinden 2%–7% de conversión según la arquitectura de persuasión (hasta
3.5x ingresos sin gastar más en adquisición). El trabajo es mover al usuario de
"interesante" a "lo necesito ahora", anticipando fricciones y disolviendo dudas antes
de que se formulen.

## ⚠️ Restricción de honestidad (no negociable)
Ver memoria `feedback-honest-data`. **Nunca fabricar** prueba social ni datos:
- Rating/reseñas ("4.9★ · 221 reseñas"), "500+ vendidos esta semana", reseñas negativas
  selectas → **solo con datos reales**. Sin reseñas reales, dejar el bloque desactivado
  o listo para poblar, jamás inventado.
- "IVA incluido", certificaciones, garantías, números → solo si son verídicos.
- Insignias de estado ("Best Seller") deben corresponder a la realidad del negocio.

## 1. Above the fold (los primeros 3 segundos)
- [ ] **Insignia de estado** sobre el título (Best Seller / Más Vendido) → efecto halo.
- [ ] **Título orientado a beneficio/resultado**, no solo el nombre técnico.
- [ ] **Precio prominente**, cercano al CTA.
- [ ] **CTA dominante** por contraste cromático y proximidad al precio.
- [ ] **Breadcrumbs** activos (catálogo extenso).
- [ ] **Visual hero** de alta calidad que represente el beneficio final.
- [ ] Señales de confianza reales visibles (garantía, envío nacional, soporte).

## 2. Cerrar la "imagination gap" (contenido visual)
- [ ] **Galería navegable**: imagen principal grande + miniaturas clicables / dots en móvil.
- [ ] Las **fotos se ven completas** (sin recortes que mutilen el equipo) y nítidas.
- [ ] Fotos **en contexto de uso** además del producto aislado.
- [ ] **Video / UGC** cuando exista.
- [ ] **Insignias de beneficio** superpuestas en el carrusel (ej. "Garantía Fuller").

## 3. Reducir fricción en la selección
- [ ] **Swatches visuales** (iconos) en vez de dropdowns para variantes.
- [ ] **Tooltips** al hover sobre variantes para resolver la duda en el momento.
- [ ] **Acordeones** para specs extensas / FAQ / detalles → estética limpia, sobre todo móvil.

## 4. Maximizar AOV (cuando haya carrito — fase 2)
- [ ] **Tarjetas de oferta** (no radio buttons), con pack "Más Popular" preseleccionado.
- [ ] **Bundles escalonados** con descuento por volumen.
- [ ] **Upsells** (ej. protección de envío).
- [ ] **Barra de progreso** a envío gratis.

## 5. Móvil y rendimiento (80% de las ventas)
- [ ] **Sticky CTA** persistente al hacer scroll → innegociable.
- [ ] Carruseles con **dots** (no miniaturas) para ahorrar alto.
- [ ] **Título + precio** es lo primero al cargar.
- [ ] **LCP sano**: sin pop-ups de terceros que disparen la carga. La velocidad es venta.

## 6. CTA microcopy
- [ ] El CTA comunica **acción + beneficio**, no un transaccional seco.
  - Nuestro contexto (cotización por WhatsApp): "Cotizar por WhatsApp" / "Solicitar mi cotización".

## Los 5 needle movers
1. Insignias de estado (efecto halo).
2. Swatches visuales (eliminar dropdowns).
3. Especificidad numérica real (4.9 vs 5.0) — **solo con datos**.
4. Bundles escalonados hacia "Best Value".
5. Sticky CTA en móvil.

## ADAPTACIÓN AL CONTEXTO FULLER (clave)
Los manuales fuente son de tiendas **DTC de suplementos** (carrito, suscripción,
bundles, sabores). Fuller es **B2B de maquinaria industrial, venta asesorada por
WhatsApp**, ticket $270K–$15M. Adaptamos los **principios**, no las tácticas literales:
- "Iniciar mi viaje" / swatches de sabor → NO. CTA = "Cotizar por WhatsApp",
  reforzado con beneficio real ("Asesoría experta · Garantía Fuller").
- Bundles/suscripción → reemplazado por **comparación entre modelos de la misma
  familia** (ej. granizadora 1 vs 2 vs 3 tanques) para guiar al "mejor valor" honesto.
- Swatches de variante → cuando un producto tenga variantes reales (capacidad, voltaje).
- AOV vía bundles/upsell/barra de envío → solo aplica con **carrito (fase 2)**.

## Progressive disclosure (acordeones)
- Specs extensas, **FAQ**, envío y garantía van en acordeones `<details>` (zero-JS,
  accesibles) para no crear muros de texto, sobre todo en móvil.
- FAQ con datos **reales** de Fuller (garantía 6m–1año, envío nacional desde Bogotá,
  sin envío internacional, capacitación en Bogotá, repuestos originales, compra por
  WhatsApp) → además genera **FAQPage JSON-LD** (rich result).

## SEO — estructura de títulos y textos (PRIORIDAD)
Validado con búsquedas reales en Colombia (Homecenter, MercadoLibre, Artiq, etc.):
**la gente busca tipo + cualificador + capacidad + ciudad, NO marca ni nombres "bonitos".**
Patrón: `granizadora industrial 3 tanques 12 litros`, `licuadora industrial 15 litros`,
`capuchinera profesional`, `licuadoras industriales bogotá`.

Reglas de estructura (aplican a TODO producto):
- **Nombre / H1**: liderar con el término buscable → `[Tipo] [Industrial/Comercial/Profesional]
  [capacidad/atributo con números]`. Usar números, no palabras ("3 Tanques · 12 Litros",
  no "Triple Tanque"). Un solo `<h1>` por página = el nombre del producto.
- **metaTitle** (~55–60 car.): `[Nombre core] | Fuller Machinery` (+ "Colombia" si cabe).
- **metaDescription** (~150–160 car.): gancho + specs clave + geo ("desde Bogotá, envío
  nacional") + CTA ("Cotiza por WhatsApp"). Única por producto.
- **slug**: minúsculas, con guiones, tipo+atributo (mantener los de WooCommerce, ya son buenos).
- **keywords**: tipo, tipo+industrial/comercial, tipo+capacidad, tipo+ciudad, uso/negocio.
- **Cuerpo (H2)**: encabezados con variaciones de keyword e intención ("¿Para qué negocios
  sirve?", "Especificaciones de la [tipo]"). Texto único por producto (specs reales) — nunca
  duplicado/thin (Google penaliza). Densidad natural, sin keyword stuffing.
- **Alt de imágenes**: `[tipo + cualificador + atributo] — Fuller Machinery Colombia`.
- **Schema**: Product (con precio) + FAQPage + BreadcrumbList. ✅

Próximo gran lever SEO (×10): **páginas de colección por tipo de equipo** (ej.
`/productos/granizadoras-industriales`) que agreguen productos y rankeen por el head term
de categoría (es lo que rankea de Homecenter/MercadoLibre). Enlazan a las fichas (internal linking).

## QA técnico (factor #1 de abandono = velocidad)
- [ ] LCP sano: imágenes `next/image`, SSG, sin pop-ups que bloqueen el render.
- [ ] Prueba multi-dispositivo y **zoom in/out**: precio, título y CTA siempre visibles.
- [ ] Cross-browser (Safari iOS vs Chrome Android) para galería/acordeones.
- [ ] Touch targets ≥ 44px; carga < 3s.

## Estado de implementación en el catálogo Fuller
- ✅ Above-the-fold (badge sobre título / precio / CTA contraste / breadcrumbs).
- ✅ Galería navegable (miniaturas + dots móvil + flechas), fotos sin recorte.
- ✅ Señales de confianza reales (garantía/envío/soporte/compra segura).
- ✅ Sticky CTA móvil. ✅ Acordeones FAQ + envío/garantía + ficha completa (FAQ JSON-LD).
- ✅ Tabla comparativa entre modelos de la misma familia (mejor-valor honesto).
- ⏳ **Bloqueado por datos reales (NO fabricar):** rating/reseñas, "X vendidos",
  contadores de urgencia, UGC, "IVA incluido", badges de prensa/autoridad.
  → Para activarlos: montar sistema de reseñas (pedir reseña por WhatsApp post-venta).
- ⏳ **Fase 2 (carrito):** tarjetas de oferta, bundles/kits, upsells, barra de envío gratis.
