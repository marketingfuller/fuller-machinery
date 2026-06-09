# ZOCAM — Configuración para la sección Alimentec

> Qué ya está cableado en el sitio y qué hay que configurar/verificar en la plataforma
> ZOCAM para que la captura de leads y la medición del embudo de `/alimentec` funcionen.
> Todo el dato de leads vive en ZOCAM (no usamos base de datos propia para esto).

## 0. Base (verificar)
- **Script** ya cargado en todo el sitio (`zocam-analytics.js`).
- **Site key:** `zcm_4b0793d290f2f5cc502c9c541c8f9359e627` → confirmar que corresponde a la
  cuenta ZOCAM de Fuller y que el dominio **fullermachinery.com** (cookie `.fullermachinery.com`)
  está autorizado para recibir eventos.

## 1. Captura de formularios (`data-zocam-form`)
Hay **dos** formularios marcados con `data-zocam-form`:
1. Landing `/alimentec` (formulario de cotización).
2. Herramienta `/alimentec/arma-tu-negocio` (modal "Datos del cliente").

**Campos que llegan (mismo esquema en ambos):**

| Campo (name) | Significado | Mapear en ZOCAM a |
|---|---|---|
| `name` | Nombre | Nombre del contacto |
| `telefono` | WhatsApp / teléfono | Teléfono |
| `email` | Correo (opcional) | Email |
| `negocio` | Negocio de interés | Campo personalizado "Negocio" |
| `asesor` | (herramienta) Nombre del asesor del stand | **Asignar el lead a este asesor** |
| `asesor_whatsapp` | (herramienta) WhatsApp del asesor | Campo / referencia |
| `mensaje` | (solo landing) Qué equipo busca | Nota / campo |
| `propuesta` | (solo herramienta) Resumen: negocio · inversión · utilidad/mes · payback | Nota / campo |
| `propuesta_link` | (solo herramienta) URL que reconstruye la simulación (la del QR) | Campo / nota |

**Acción:** mapear estos campos a los del Contacto en ZOCAM.

> ⚠️ **Crítico a probar:** el formulario de la herramienta aparece en un **modal dinámico**
> (al hacer clic en "Generar propuesta del cliente"), no está en el HTML inicial. Confirmar
> que la captura `data-zocam-form` de ZOCAM funciona con formularios inyectados después de
> cargar la página (delegación / observación del DOM). **Hacer una prueba real enviando un
> lead desde el modal** antes de la feria.

## 2. Eventos del embudo (`data-zocam-event`)
Eventos que el sitio ya emite (úsalos para conversiones y embudo):

| Evento | Dónde |
|---|---|
| `alimentec-hero-visita` / `alimentec-hero-calcular` | CTAs del hero de la landing |
| `alimentec-calc-cta` | Teaser → abre la herramienta |
| `alimentec-lead-submit` | Botón del formulario de la landing |
| `alimentec-cierre-visita` / `alimentec-cierre-mapa` | Cierre de la landing |
| `armar-generar-propuesta` | Abre el modal de captura (herramienta) |
| **`lead-capturado`** | **Envío del formulario del modal → CONVERSIÓN principal** |
| `armar-pdf` | Descarga del PDF de la propuesta |
| `armar-reset` | "Nueva simulación" |
| `armar-presentacion` | Activa modo presentación (TV) |
| `catalogo-header` / `catalogo-header-movil` | Botón Catálogo del header |

**Acción:** marcar **`lead-capturado`** y `alimentec-lead-submit` como **conversión** en ZOCAM.

## 3. Atribución por canal (UTM)
ZOCAM captura UTM automáticamente de la URL + `firstTouch`. Para distinguir de dónde viene
cada lead, abrir la herramienta con UTM según el canal:

- **TV / kiosko del stand:**
  `https://fullermachinery.com/alimentec/arma-tu-negocio?utm_source=stand&utm_medium=feria&utm_campaign=alimentec2026`
- **QR de folleto:** `...?utm_source=folleto-qr&utm_medium=feria&utm_campaign=alimentec2026`
- **Meta / Google / etc.:** los UTM de cada campaña.

Así cada lead queda atribuido a su canal sin trabajo manual.

## 4. Catálogo (ya cableado)
ZOCAM jala el catálogo: `GET https://fullermachinery.com/api/zocam/products`
con `Authorization: Bearer <ZOCAM_API_KEY>`. Confirmar que la key en ZOCAM coincide con la
variable de entorno `ZOCAM_API_KEY` del despliegue (Vercel).

## 5. Asignación al asesor
Cada asesor define en la herramienta (botón "Definir asesor", se guarda en el equipo del stand)
su **nombre** y **WhatsApp**. En cada lead llegan los campos `asesor` y `asesor_whatsapp`.

**Configurar en ZOCAM:** una automatización/regla que, al recibir el `form_submit`, **asigne el
lead al usuario/propietario cuyo nombre coincide con `asesor`**. Así el lead queda con su dueño
correcto. (Tip: que el nombre que el asesor escribe coincida con su nombre de usuario en ZOCAM.)

El WhatsApp del asesor **ya queda en la propuesta** que se lleva el cliente: aparece en el pie del
**PDF** y como botón "Hablar con tu asesor" cuando el cliente abre el **QR** en su celular.

## 6. Automatizaciones (cuando se definan)
- **Disparador:** evento `lead-capturado` (o el `form_submit` del formulario de Alimentec).
- **Acciones sugeridas (a definir por Fuller):** tag "Alimentec 2026", la asignación por `asesor`
  (arriba), secuencia de seguimiento por WhatsApp/email. El sitio ya entrega el dato y el evento;
  la automatización se arma en ZOCAM sin tocar el código.
