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
- `modules/flujo/` — Flujo de Correos: mapa del recorrido de comunicaciones al cliente.
- `modules/visualizador/` — Visualizador de Plantillas: preview de cada plantilla en distintos escenarios.
- `modules/simulador/` — Simulador de Datos: combina escenarios (envío, productos, promociones) sobre un pedido base para previsualizar cada plantilla sin necesitar un JSON distinto por caso.

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

No hay build ni dependencias: alcanza con abrir `index.html` en un navegador o servirlo con cualquier servidor estático. Antes de publicar, hacer un smoke visual: carga de cada módulo, filtros y ficha del catálogo, render del Visualizador y el Simulador con sus distintos escenarios, y consola sin errores.

## Estado

MVP en construcción — primer foco: Módulo 2 (Biblioteca de Plantillas).
