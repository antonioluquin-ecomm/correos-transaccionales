# Matriz de Validación

Validación base para cambios en el sitio estático.

## Smoke general

| Caso | Esperado |
| --- | --- |
| Abrir `http://127.0.0.1:8723/index.html` | Carga la home y muestra navegación a todos los módulos. |
| Navegar a Biblioteca de Plantillas | Se muestran las plantillas del catálogo y no hay errores de consola. |
| Abrir ficha de plantilla | La ficha muestra metadata, variables, link al HTML y botón de descarga. |
| Filtrar/buscar en catálogo | Los resultados se actualizan y aparece estado vacío si no hay coincidencias. |
| Navegar a Flujo de Correos | El módulo carga sin romper la navegación compartida. |

## Preview

| Caso | Esperado |
| --- | --- |
| Visualizador con cada plantilla y cada escenario de `EXAMPLE_SCENARIOS` | El iframe renderiza contenido y no queda en blanco. |
| Simulador con domicilio, retiro y escenarios multipaquete | El iframe renderiza contenido y recalcula totales. |
| Simulador con escenario multipaquete | El selector fuerza dos productos para evitar datos imposibles. |
| Simulador con promoción aplicada | El resumen muestra beneficio/promoción y totales actualizados. |

## Datos y publicación

| Caso | Esperado |
| --- | --- |
| Parsear todos los JSON de `examples/` | Todos son JSON válidos. |
| Revisar datos sensibles antes de publicar | No quedan IDs reales de cliente, pago, orden, cuenta o dirección. |
| Validar rutas de `config.js` | `archivoHtml` y `ejemplo` apuntan a archivos existentes. |
| Probar sin acceso a CDN externo | Visualizador y Simulador siguen funcionando con Handlebars local. |
