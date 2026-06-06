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

- `modules/catalogo/` — Biblioteca de Plantillas: listado, filtros, búsqueda y ficha por plantilla (descarga de HTML, variables).
- `modules/visualizador/` — Visualizador de Plantillas: preview de cada plantilla en distintos escenarios.
- `modules/flujo/` — Flujo de Correos: mapa del recorrido de comunicaciones al cliente.
- `modules/simulador/` — Simulador QA: herramienta interna para probar variantes sobre un pedido base.

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

Después abrir `http://127.0.0.1:8723/index.html`. Antes de publicar, hacer un smoke visual: carga de cada módulo, filtros y ficha del catálogo, render del Visualizador y, si aplica, prueba del Simulador QA con sus distintos escenarios. La consola debe quedar sin errores.

## Estado

MVP operativo — foco principal: Biblioteca de Plantillas y Visualizador funcional.
