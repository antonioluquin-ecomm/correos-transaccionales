# Changelog

Formato: versión, fecha, resumen del cambio principal.

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
