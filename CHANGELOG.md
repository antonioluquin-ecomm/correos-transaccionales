# Changelog

Formato: versión, fecha, resumen del cambio principal.

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
