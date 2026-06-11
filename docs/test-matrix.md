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
| Cambiar pestañas del flujo | Flujo General, entrega, cambio, devolución y garantía renderizan su mapa correspondiente. |
| Revisar carriles del flujo | Se muestran `Vtex`, `PIM`, `Andreani` y `Ocasa` como carriles operativos. |
| Revisar nodos pendientes del flujo | Los candidatos o faltantes aparecen con borde punteado. |
| Revisar nodos referenciales del flujo | Andreani y OCASA aparecen como referencia externa, no como faltantes gestionables. |
| Click en nodo existente del flujo | Se abre ficha con estado, prioridad y botón para ver preview. |
| Click en nodo del flujo | La ficha muestra plataforma, canal, tienda, evento, etapa y plantilla asociada. |
| Click en nodo faltante/candidato del flujo | Se abre ficha con botón para crear plantilla. |
| Abrir Simulador QA | El módulo queda disponible como herramienta secundaria de validación interna. |

## Preview

| Caso | Esperado |
| --- | --- |
| Visualizador con cada plantilla y cada escenario de `EXAMPLE_SCENARIOS` | El iframe renderiza contenido y no queda en blanco. |
| Visualizador con `?template=pedido-confirmado` | Selecciona la plantilla indicada y renderiza su preview. |
| Visualizador con `?template=pedido-confirmado&example=examples/vtex/pedido-estandar.json` | Selecciona plantilla y escenario indicados si existen. |
| Visualizador acciones rápidas | Abrir HTML, descargar HTML y copiar HTML funcionan para la plantilla seleccionada. |
| Visualizador con `pim-sin-stock-pv` | Renderiza el escenario `sin-stock-pv-sporting`, muestra las tres alternativas y no informa reembolso automatico. |
| Simulador QA con domicilio, retiro y escenarios multipaquete | El iframe renderiza contenido y recalcula totales. |
| Simulador QA con escenario multipaquete | El selector fuerza dos productos para evitar datos imposibles. |
| Simulador QA con promoción aplicada | El resumen muestra beneficio/promoción y totales actualizados. |

## Datos y publicación

| Caso | Esperado |
| --- | --- |
| Parsear todos los JSON de `examples/` | Todos son JSON válidos. |
| Revisar datos sensibles antes de publicar | No quedan IDs reales de cliente, pago, orden, cuenta o dirección. |
| Validar rutas de `config.js` | `archivoHtml` y `ejemplo` apuntan a archivos existentes. |
| Probar sin acceso a CDN externo | Visualizador y Simulador siguen funcionando con Handlebars local. |
| Crear una plantilla nueva | Existe JSON real o representativo, sanitizado y documentado en `config.js`. |
