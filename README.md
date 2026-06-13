# Correos Transaccionales

Plataforma estática para centralizar, documentar, visualizar y estandarizar las plantillas de correos transaccionales utilizadas por la operación (VTEX, PIM y futuras plataformas).

## Qué es

Un único lugar donde el equipo puede ver:

- qué correos existen y qué plataforma los envía;
- en qué momento del flujo se disparan;
- cómo se ven (HTML real, no capturas);
- qué variables y datos usan;
- qué versiones existen y quién es responsable de cada una.

## Cómo se usa

Sitio estático (HTML + CSS + JS, sin backend) pensado para GitHub Pages. Se navega desde [`index.html`](index.html) hacia los módulos:

- `modules/catalogo/` — **Biblioteca de Plantillas**: listado con filtros (plataforma, canal, tienda, logística, estado), búsqueda, KPIs reactivos, ficha con previsualización por dispositivo, descarga de HTML y exportación CSV.
- `modules/visualizador/` — **Visualizador de Plantillas**: preview de cada plantilla con escenarios de datos reales. Filtros por canal/tienda/logística/faceta, compare mode (dos escenarios lado a lado), switch de dispositivo y overlay de variables. Escenarios enriquecidos incluyen 2 productos (uno con descuento), envío gratis y despacho desde 2 depósitos.
- `modules/flujo/` — **Flujo de Correos**: mapa del recorrido de comunicaciones por plataforma y flujo. Incluye vista backlog (qué falta por flujo con filtros), porcentaje de cobertura por tab y exportación CSV de faltantes.

Para sumar una plantilla nueva, usar [`docs/crear-nueva-plantilla.md`](docs/crear-nueva-plantilla.md). El insumo clave es un JSON real o representativo del evento: puede estar sanitizado, pero debe conservar la estructura de datos original para validar que el HTML sea funcional.

## Estructura

```txt
modules/      -> páginas funcionales por módulo
templates/    -> plantillas HTML reales, agrupadas por plataforma
examples/     -> pedidos de ejemplo (JSON) usados como datos de prueba
assets/       -> css, js y logos compartidos
docs/         -> roadmap, matriz de pruebas, decisiones
config.js     -> catálogo de plantillas (metadata), versión y changelog
```

## Cómo se valida

No hay build ni dependencias instalables, pero los módulos de preview usan `fetch`, por lo que la validación debe hacerse sirviendo el repo por HTTP. Opción local:

```powershell
node .tmp-static-server.js
```

Después abrir `http://127.0.0.1:8723/index.html`. Antes de publicar, hacer un smoke visual: carga de cada módulo, filtros y ficha del catálogo, render del Visualizador con los escenarios enriquecidos (2 productos / descuento / multipaquete), y navegación entre tabs del Flujo. La consola debe quedar sin errores.

## Estado

Plataforma operativa con auditoría de calidad completa (v1.21.0).

| Módulo | Estado |
|---|---|
| Biblioteca de Plantillas | Operativo — filtros, KPIs reactivos, chips de filtros activos, badge "Reciente", previsualización por dispositivo, exportación CSV |
| Visualizador de Plantillas | Operativo — render VTEX/PIM, compare mode, overlay de variables, spinner de carga, label de escenario, filtros con sincronización de URL |
| Flujo de Correos | Operativo — stage-grid por plataforma, vista backlog con filtros y scope, porcentaje de cobertura por tab, exportación CSV de faltantes |

**Cobertura de plantillas:** 3 VTEX Sporting · 3 VTEX Woker · 1 B2B · 14 PIM compartidas (todas en v2). El Flujo de Correos mapea el gap por flujo y plataforma.

**Escenarios de ejemplo:** 49 JSONs en `examples/`, incluyendo escenarios enriquecidos con 2 productos (uno con descuento), envío gratis vía `alternativeTotals` y despacho desde 2 depósitos distintos.

**Calidad:** todos los módulos pasaron auditoría técnica. Sin colores hardcodeados funcionales, sin referencias rotas, funciones CT.* consistentes con sus exportaciones, y encoding UTF-8 verificado.
