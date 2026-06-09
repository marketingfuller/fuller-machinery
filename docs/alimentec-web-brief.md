# Brief — Web Alimentec 2026 (`/alimentec`)

> **Qué es:** spec por fases para construir la sección `/alimentec` de este sitio como
> "la feria que nunca termina" — activo de captura permanente, reusando lo que YA existe.
> **Estrategia completa (fuera del repo):** Zcalaris Vault → `06 - Clientes/fuller-machinery/`
> (`FAIR_ALIMENTEC_2026.md`, `FAIR_ALIMENTEC_2026_PLAYBOOK.md` §A.2/§A.4). Este doc es la
> versión accionable y se mantiene sincronizada con el del Vault.

---

## 0. ⚠️ El repo NO es greenfield — leer antes de tocar nada

La mayoría del trabajo es **reusar y extender**, no crear desde cero.

### Lecturas obligatorias
1. `AGENTS.md` (raíz) — "This is NOT the Next.js you know": **Next.js 16** tiene breaking
   changes; leer `node_modules/next/dist/docs/` antes de escribir código.
2. `docs/cro-product-pages.md` — **estándar CRO obligatorio**.
3. `src/lib/seo.ts` (`buildMetadata`, `breadcrumbJsonLd`) + `src/components/JsonLd.tsx`.
4. `src/app/api/zocam/products/route.ts` — patrón de integración ZOCAM/Supabase existente.
5. `src/lib/supabase/{client,server,proxy}.ts` — clientes Supabase ya configurados.

### Stack (de `package.json`)
Next 16 · React 19 · App Router · Tailwind 4 · Framer Motion 12 · `@supabase/ssr` ·
lucide-react. Productos en `src/content/products/*.ts` (+ `src/lib/products.ts`); blog en
`src/content/emprende/*.md`.

### 🔴 Honestidad (NO negociable — memoria `feedback-honest-data` + CRO doc)
Nunca fabricar: reseñas/ratings, "X vendidos/cotizaron", "IVA incluido" si no aplica,
contadores de urgencia, badges sin respaldo. Sin dato real → bloque desactivado, jamás
inventado. **CTA estándar = "Cotizar por WhatsApp"** (sin carrito todavía).
> El "contador en vivo (47 ya cotizaron)" del playbook solo se monta si hay **feed real**
> del stand. Si no → se omite.

---

## Lo que YA existe y se REUSA (no reconstruir)

| Pieza del plan Alimentec | Ya existe como… | Acción |
|---|---|---|
| "Arma tu negocio" (configurador por negocio) | `src/app/negocios/` + `/negocios/{panaderia,carnicos,bebidas,empaque,refrigeracion,snacks}` con `BusinessKits`, `StarterKits`, `KitBundle`, `CategoryGrid` | **Extender**, no duplicar |
| Calculadora ROI/rentabilidad | `components/productos/ProfitCalculator.tsx`, `components/snacks/ProfitCalc.tsx`, `components/panaderia/ProductionScale.tsx` | **Construir la ROI sobre estos** |
| Captura lead → ZOCAM | `api/zocam/products` (Supabase + ZOCAM cableado) | Replicar para `api/alimentec/lead` |
| Layout / WhatsApp / cursor | `components/{Header,Footer,FloatingWhatsApp,CustomCursor,Preloader}.tsx` | Reusar |
| Contenido "cómo emprender" | `/emprende` (10 `.md`) | Enlazar como apoyo |
| Fichas CRO | `/productos/[slug]` + `docs/cro-product-pages.md` | Enlazar; respetar estándar |

**Alimentec = landing de campaña `/alimentec`** que orquesta piezas existentes + **calculadora
ROI honesta** (sobre `ProfitCalculator`) + **wiring de leads a Supabase/ZOCAM con UTM**.

---

## Orden (acordado con Felipe): FASE 1 = Landing `/alimentec` primero

```
/alimentec                  → landing campaña            [F1] nuevo
/alimentec/calcular         → calculadora ROI standalone [F2] sobre ProfitCalculator
/alimentec/arma-tu-negocio  → entrada configurador       [F3] reusa /negocios + kits
/alimentec/agendar          → slots vendedores            [F4] nuevo
/alimentec/vip/[token]      → página VIP                  [F4] nuevo
/alimentec/gracias          → confirmación                [F5] nuevo

/api/alimentec/lead         → captura → Supabase (patrón api/zocam)
/api/alimentec/roi          → cálculo ROI (server)
/api/alimentec/agendar      → evento Google Calendar (ZOCAM F4)
```

Entregar **una fase a la vez**, verificable.

### FASE 1 — Landing `/alimentec`
Reusar `Header`/`Footer`/layout. Secciones: (1) Hero feria "Te esperamos en Alimentec ·
Pabellón 4 · Stand 415A · 9–12 jun · Corferias" con CTAs *Aparta tu visita* + *Calcula tu ahorro*; (2)
Calculadora ROI (F1 enlazable, F2 embebida); (3) "Lo que vas a ver en el stand" (3 cards:
calculadora · asistente WhatsApp 24/7 · demos c/2h); (4) "El origen de tu negocio está aquí"
(339+ máquinas en bodega · servicio técnico propio · garantía formal · descuentos volumen ·
capacitación — diferenciador = **inventario/variedad/stock**, NO "fabricación" ni "vs China");
(5) Form cotización → `POST /api/alimentec/lead`; (6) Galería de clientes reales (solo con
permiso); (7) Cierre + mapa Corferias. SEO vía `buildMetadata` + breadcrumb JSON-LD (patrón
de `src/app/negocios/page.tsx`). Mobile-first, `next/image`, LCP sano.

### FASE 2 — Calculadora ROI (extender `ProfitCalculator`)
Leer `ProfitCalculator.tsx`/`ProfitCalc.tsx` y extender. 5 pasos (PLAYBOOK §A.2): producto ·
volumen kg/día · operarios · merma actual · máquina actual. Lógica server (`/api/alimentec/roi`):
```
ahorro_merma     = volumen_dia * 30 * precio_kg[producto] * (merma_actual - merma_nueva)/100
ahorro_operarios = (operarios - op_nuevo) * 1_400_000
roi_meses        = inversion / (ahorro_merma + ahorro_operarios)
```
`precio_kg` / máquina recomendada / inversión → **tabla revisada por gerente Fuller** (NO
inventar; reusar precios de `content/products`). Output animado (cuenta 0→total, barra ROI).
CTAs: hablar con asesor · recibir por WhatsApp · agendar demo · compartir. Disclaimer visible;
si ROI = 14 meses, decir 14.

### FASE 3 — "Arma tu negocio" (REUSA `/negocios`)
`/alimentec/arma-tu-negocio` = entrada de campaña a los kits de `/negocios` (panadería,
restaurante/buffet, food truck café, heladería, cárnicos, cafetería bar). Mapear los 6 negocios
del playbook a las páginas/kits existentes; lo que falte, con `BusinessKits`/`KitBundle`. Output
= paquete + precio total (de `content/products`; si falta → **"Cotizar"**) + *Recibir propuesta
por WhatsApp*. Sube ticket ~$5M → $40–60M. PDF de propuesta (branding Fuller) compartido con la
calculadora.

### FASE 4 — Agendar + VIP
`/alimentec/agendar`: slots Angie/Misael/Javier → `api/alimentec/agendar` crea evento Google
Calendar (ZOCAM F4). `/alimentec/vip/[token]`: saludo por nombre + video del asesor + slot
privado + regalo; tokens pre-generados (`vip_tokens`); `if (!vip) return notFound()`.

### FASE 5 — UTM · "3 vidas" · SEO · perf
UTM por canal en `source_utm` (meta/google/linkedin/stand-qr/folleto-qr/whatsapp/instagram).
3 vidas conmutables por fecha: pre-feria → durante (contador live **solo con feed real**) →
post-feria (calculadora 24/7 + "esto mostramos" + SEO 2 años). OG/Twitter card; keywords estilo
CRO doc (tipo + cualificador + capacidad + ciudad).

---

## NO hacer
- ❌ Reconstruir lo existente (`/negocios`, calculadoras, layout, integración ZOCAM).
- ❌ Fabricar datos (reseñas, "X cotizaron", urgencia, "IVA incluido").
- ❌ Inventar precios/specs/modelos → `content/products` / tabla aprobada; si falta → "Cotizar".
- ❌ "Fabricación" / "vs China" → diferenciador es inventario/stock/variedad.
- ❌ Ignorar `cro-product-pages.md` ni los breaking changes de Next 16.
- ❌ Crear esquema Supabase sin confirmar con Felipe.

## Pendientes de Felipe / Fuller (bloqueantes para publicar)
- [x] Stand: **Pabellón 4, Stand 415A**, Corferias.
- [ ] Tabla de máquina recomendada + precios + ROI revisada por gerente.
- [ ] Confirmar esquema Supabase `fair_leads` / `vip_tokens` (o reusar tablas ZOCAM).
- [ ] Video hero, videos de asesores (VIP), logos de clientes con permiso.
- [ ] ¿Feed real para el contador en vivo? Si no → se omite.
