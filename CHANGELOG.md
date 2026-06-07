# Changelog

Formato: versión, fecha, resumen del cambio principal.

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
