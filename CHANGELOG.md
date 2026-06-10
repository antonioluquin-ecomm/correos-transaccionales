# Changelog

Formato: versión, fecha, resumen del cambio principal.

## v1.4.1 — 2026-06-10

Auditoría de alineación Woker vs Sporting + correcciones:

- **`access-key.v2` Woker**: corrige media query con selector `.header-logo` duplicado. Se restauran las reglas `.brand-logo-sporting/woker/luquin` que necesita el footer para escalar los tres logos corporativos en mobile.
- **`pedido-cancelado.v2` Woker**: botón CTA pasado de gradiente naranja a `#111827` neutro, alineando la decisión UX de Sporting (CTA sobrio en correos de cancelación).
- **`config.js` (metadata Sporting)**: categoría de `access-key` corregida a `'Cuenta'`; agregada variable `aditionalData.userAgent` que faltaba; prefijo `orders.0.*` removido de `pedido-cancelado` (el HTML real usa variables planas).
- **`docs/decisions/2026-06-10-alineacion-marcas.md`**: formaliza las reglas de diseño descubiertas durante la auditoría.
- **`docs/crear-nueva-plantilla.md`**: nueva sección "Variantes de marca" con checklist de alineación inter-marca.

## v1.4.0 - 2026-06-09

Base inicial para plantillas PIM compartidas:

- Se inventarian las 14 plantillas PIM existentes en `docs/pim-inventario.md`, con prioridad, variables, assets actuales y oportunidades de mejora.
- `config.js`: se agregan las 14 plantillas PIM compartidas al catalogo sin cambiar el esquema existente.
- `templates/pim/shared/nuevo-envio/nuevo-envio.v2.html`: primera plantilla base PIM optimizada, con marca dinamica por sitio, tracking, CTA por operador logistico y fallback sin numero de seguimiento.
- `examples/pim/shared/nuevo-envio.sample.json`: escenario representativo y sanitizado para validar `pim-nuevo-envio`.
- `assets/js/shared.js` y `modules/visualizador/index.html`: soporte minimo de render para sintaxis PIM tipo Go, manteniendo Handlebars para VTEX.

## v1.2.3 — 2026-06-08

Estandarización del sistema de diseño en las tres plantillas VTEX principales:

**`pedido-confirmado.html` (Version 2) y `pago-aprobado.html` (Version 2)**:

- **Hero header**: banda verde oscura (`#14532d`) en la parte superior de la card, con ícono ✓ circular (`#166534` + borde `#86efac`), título de acción y greeting. Reemplaza el badge-pill genérico + h1/h2 — impacto visual inmediato al abrir el correo.
- **Barra de progreso segmentada**: cuatro pills de color con 4px de separación + indicador `▼` sobre el segmento activo. Mismo patrón que pedido-cancelado v3, colores adaptados al estado de cada email:
  - pedido-confirmado: 🟢 Recibido · 🔵 Pago (activo) · ⬜ Preparación · ⬜ Retiro/Entrega
  - pago-aprobado: 🟢 Recibido · 🟢 Pago · 🔵 Preparación (activo) · ⬜ Retiro/Entrega
- **Callout con borde izquierdo de acento**: reemplaza el status box plano anterior.
  - pedido-confirmado: borde azul (`#3b82f6`) · fondo `#eff6ff` · "Validando tu pago"
  - pago-aprobado: borde verde (`#16a34a`) · fondo `#f0fdf4` · "Tu pedido ya está en preparación" + fecha estimada condicional (preservada)
- **Descripción simplificada**: reducida al hecho puntual; el callout absorbe el "qué pasa ahora".
- **Mobile fix**: clases `.hero-confirm-td` y `.hero-aprobado-td` con `border-radius: 0 !important` en `@media (max-width: 600px)`.

## v1.2.2 — 2026-06-08

Rediseño visual de `pedido-cancelado.html` (Version 3):

- **Hero header**: banda roja oscura (`#7f1d1d`) en la parte superior de la card, con ícono ✕ circular, título dinámico (`Cancelaste tu pedido` / `Tu pedido fue cancelado` según `requestedByUser`) y greeting + N.º de pedido. Reemplaza el badge-pill genérico — impacto visual inmediato al abrir el correo.
- **Barra de progreso segmentada**: cuatro pills de color con 4px de separación (verde · rojo · gris · gris) + indicador de posición `▼` sobre el segmento activo. Más moderna y compacta que la versión anterior de círculos + líneas.
- **Callout "Reintegro en proceso"**: rediseñado con borde izquierdo de acento rojo (`4px solid #ef4444`) en lugar del box plano, patrón más consistente con estándares de UI modernos.

## v1.2.1 — 2026-06-08

CSS inline en templates VTEX para compatibilidad con Gmail y clientes que stripean `<head>`:

- `pedido-confirmado.html`, `pago-aprobado.html`, `pedido-cancelado.html`: ~76/74/71 elementos tipográficos y de UI reciben `style=""` inline equivalente al CSS del `<head>` (`h1`, `h2`, `text`, `text-sm`, `label`, `value`, `item-name`, `item-meta`, `item-price`, `badge`, `badge-cancel`, `cta-primary`, `cta-dark`, `step-lbl`, `footer-link`, etc.).
- Elementos con `style=""` preexistente reciben el base prepended (sin `margin`) para no pisar overrides intencionales.
- `scripts/inline-css.py`: script utilitario que automatiza el proceso de inlining para futuras actualizaciones de templates.

## v1.2.0 — 2026-06-08

Integración de tres templates nuevos al catálogo:

- **access-key** (`templates/vtex/access-key.html`): Código de acceso a cuenta (verificación de identidad). Variables: `to[0].name`, `aditionalData.accessKey`, `_accountInfo.*`.
- **back-in-stock** (`templates/vtex/back-in-stock.html`): Notificación de restock para suscriptores. Variables: `NotifyRequest.*`, `SkuContext.*`.
- **order-invoiced** (`templates/vtex/order-invoiced.html`): Factura emitida con datos de seguimiento. Variables: `orderId`, `packages[]`, `package.*`, `trackingNumber`, `trackingUrl`.
- Los tres templates quedan en estado `en revisión` (pendiente rediseño para alinear al sistema de diseño).
- `config.js`: 3 nuevas entradas en TEMPLATES, 3 nuevos escenarios en EXAMPLE_SCENARIOS, VERSION → 1.2.0.
- `flujo/index.html`: nodos `access-key` y `order-invoiced` actualizados a `existente`; nuevo nodo `back-in-stock` agregado al carril VTEX.
- `examples/vtex/pedido-estandar.json`: `deliveryIds[0].courierName` = `"Andreani"` (el visualizador ahora muestra el courier en pedido-confirmado.html); `complement` = `"Piso 3, Depto B"` para probar el campo en el visualizador.

## v1.1.0 — 2026-06-08

Nueva plantilla: **Pedido Cancelado** (`templates/vtex/pedido-cancelado.html`):

- Rediseñada desde cero siguiendo el mismo estándar visual que `pedido-confirmado.html`: cards separadas, grid 2×2 de resumen, tipografía consistente (`.label`, `.value`, `.text`, `.text-sm`), responsive mobile con stacking de columnas.
- Badge rojo "✕ Pedido cancelado" + status box "Reintegro en proceso" en lugar del overlay de la v1.
- Barra de progreso HTML/CSS de 4 pasos: Recibido ✓ → Cancelado ✕ → Reintegro ○ → Acreditado ○ (reemplaza la imagen estática).
- Resumen 2×2: N.º de pedido, Fecha de cancelación, Total cancelado, Fecha de compra.
- Sección "¿Cuándo acreditan el reintegro?" con pasos numerados: débito / crédito / gift card (condicional).
- Variables migradas a prefijo `orders.0.*` (consistente con `pedido-confirmado.html`).
- Productos cancelados con imagen ligeramente desaturada (opacity 0.7, grayscale 25%) para reflejar que no se despacharán.
- 2 CTAs: "Ver mi pedido" (oscuro) + "Volver a comprar" (verde) con URL dinámica `{{hostName}}`.
- `config.js`: plantilla registrada en TEMPLATES; se agrega escenario "Pedido cancelado (2 productos, envío gratis)" a EXAMPLE_SCENARIOS.
- `flujo/index.html`: nodo "Pedido cancelado" actualizado de `faltante` → `existente`.

## v1.0.0 — 2026-06-07

Rediseño del módulo Flujo de Correos:

- **Side panel:** el detalle de cada nodo ahora se desliza desde la derecha sin tapar el mapa. En desktop conviven panel y diagrama; en mobile aparece backdrop oscuro. Cierre con botón ×, Escape o click en backdrop.
- **Barra de filtros:** chips sobre el board para mostrar solo Existentes, Faltantes, Candidatos o la combinación con "↑ Prioridad alta". Los filtros de estado y prioridad son independientes y se combinan con AND. Clicar el mismo chip activo vuelve a "Todos".
- **Dot de prioridad:** cada nodo tiene un punto 10px en la esquina superior izquierda: rojo (alta), ámbar (media), gris (baja). Permite escanear prioridades sin abrir la ficha.
- **Arrowheads SVG:** las 17 conexiones del flujo tienen punta de flecha (`<marker>` en `<defs>`), haciendo la dirección del recorrido evidente de un vistazo.
- **Dot de estado:** ícono ✓ / ! / ? en esquina inferior derecha del nodo como segundo indicador visual de estado.
- **Typografía de nodos:** 12px → 11px / line-height 15px → 14px para mejorar legibilidad dentro del ancho fijo.

## v0.9.0 — 2026-06-07

Mejoras de UI/UX en todos los módulos:

- **Catálogo:** las opciones del filtro "Estado" muestran primera letra mayúscula (`Activo` en lugar de `activo`). Las fechas se muestran en formato legible (`6 de jun de 2026`) tanto en cards como en la ficha de detalle.
- **Flujo de Correos:** la leyenda del header ahora incluye los tres estados (✓ Existente, ! Faltante, ? Candidato) junto a los colores de plataforma, haciendo el mapa autoexplicativo. Se agrega estadística de cobertura por flujo (ej. "2 de 17 existentes · 1 candidato · 14 faltantes").
- **Visualizador:** el texto de estado muestra el label del escenario de datos ("Pedido estándar (envío a domicilio)") en lugar de la ruta técnica del JSON. El iframe ajusta su altura al contenido real del correo al cargar.
- **Simulador QA:** el iframe ajusta su altura al contenido real del correo al cargar.
- **Navegación global:** el link "Visualizador" pasa a "Visualizador de Plantillas" para coincidir con el `<h1>` de la página.

## v0.8.0 — 2026-06-07

Auditoría técnica y correcciones de calidad:

- **Semántica de estados en Flujo:** el estado "Faltante" usaba la clase CSS `ct-status-en-revision` (mismo color que "En revisión"). Se creó el token `--ct-status-faltante` (`#f97316`) con color diferenciado.
- **CSS centralizado:** `ct-status-candidato` y `ct-status-faltante` movidos de estilos inline del módulo Flujo a `shared.css`. `text-decoration: none` en `<a class="ct-card">` de la home pasó a regla `a.ct-card` en `shared.css`.
- **Accesibilidad:** se agregó `:focus-visible` a los nodos del mapa de flujo (outline azul al navegar con teclado).
- **Catálogo:** se agregó botón "Limpiar filtros" en el estado vacío de búsqueda.
- **config.js:** se corrigieron tildes en labels de `EXAMPLE_SCENARIOS` visibles en dropdowns ("estándar", "envío", "éxito"). Se documentó `hostName` en el array `variables` de ambas plantillas.
- **Robustez:** `CT.fetchText` incorpora timeout de 8 s via `AbortSignal.timeout` con mensaje descriptivo. `JSON.parse` en Simulador y Visualizador lanza errores con ruta y causa explícitas. El Simulador muestra una nota contextual cuando el escenario multipaquete fuerza el valor de productos a "2".

## v0.7.0 — 2026-06-07

- El módulo `Flujo de Correos` ahora muestra estados operativos por nodo:
  existente, faltante o candidato.
- Cada nodo abre una ficha con plataforma, etapa, prioridad, disparador, nota y acción.
- Los correos existentes abren el Visualizador con la plantilla seleccionada por query params.
- Los correos faltantes o candidatos enlazan a la guía de creación de nuevas plantillas.

## v0.6.0 — 2026-06-06

- Se implementó el módulo `Flujo de Correos` como mapa operativo con pestañas para
  logística de entrega, cambio, devolución y garantía.
- El flujo queda organizado por plataforma/carril (`VTEX`, `PIM`, `Andreani`, `Ocasa`) y
  distingue nodos candidatos o pendientes con borde punteado.
- La home y la documentación mantienen Biblioteca + Visualizador como flujo principal, con
  el mapa como soporte para priorizar nuevas plantillas.

## v0.5.0 — 2026-06-06

- Se reorganizó la orientación funcional: Biblioteca de Plantillas y Visualizador quedan como
  flujo principal para agentes y mantenimiento interno.
- El Simulador pasa a presentarse como `Simulador QA`, herramienta secundaria para validar
  variantes de datos.
- Se agregó `docs/crear-nueva-plantilla.md` con el flujo recomendado para sumar correos nuevos
  usando un JSON real o representativo del evento.

## v0.4.0 — 2026-06-06

- Hardening de datos de ejemplo: se reemplazaron identificadores reales de cliente, orden,
  pago, cuenta y dirección por valores sintéticos manteniendo la forma VTEX.
- Visualizador y Simulador ahora cargan Handlebars desde `assets/js/vendor/` en vez de
  depender del CDN en runtime.
- Los escenarios de ejemplo se centralizaron en `config.js` (`EXAMPLE_SCENARIOS`) para evitar
  listas duplicadas en módulos.
- El Simulador evita estados imposibles: los escenarios multipaquete fuerzan dos productos.
- Se agregó matriz de validación y roadmap vivo; el README ahora indica validación por HTTP.

## v0.3.0 — 2026-06-06

- Simulador de Datos (Módulo 4): parte de un pedido base real y combina escenarios de
  envío (domicilio, retiro, multipaquete mismo/distinto depósito), cantidad de productos
  y promoción aplicada, recalculando totales — sin necesitar un JSON distinto por caso.
  El render de Visualizador y Simulador se unificó en `CT.renderEmailToFrame` (shared.js).
- Fix: el Visualizador renderizaba en blanco las plantillas que esperan `orders.0.*`
  (ej. "Pedido realizado con éxito") al combinarlas con datos de ejemplo guardados sin
  el wrapper `orders[]`. `buildEmailRenderContext` ahora normaliza siempre a la forma
  envuelta antes de fusionar el contexto, y los JSON de ejemplo `pago-aprobado.json` y
  `pedido-cancelado.json` se normalizaron a esa misma forma en el origen.

## v0.2.0 — 2026-06-06

- Visualizador de Plantillas (Módulo 3): selector de plantilla y de escenario de datos,
  render en vivo con Handlebars (helpers `formatCurrency`, `formatDate`, `eq`) sobre un
  iframe sandboxed.

## v0.1.0 — 2026-06-06

- Estructura inicial del proyecto: esqueleto de repo, carpetas, archivos institucionales.
- Primera versión del catálogo de plantillas (Módulo 2 — Biblioteca de Plantillas).
- Migración y normalización de las plantillas HTML y los pedidos de ejemplo (JSON) ya existentes.
