# Instrucciones para la IA - Correos Transaccionales

Este proyecto sigue la metodologia institucional descrita en [`PROJECT_WORKFLOW.md`](PROJECT_WORKFLOW.md). Este archivo agrega convenciones especificas de este repo.

## Que es el proyecto

Sitio estatico, sin backend ni credenciales, para centralizar plantillas de correos transaccionales de VTEX, PIM y futuras plataformas, su metadata, datos de ejemplo y previsualizacion. Hosting: GitHub Pages.

## Convenciones de este repo

- Archivos y carpetas en kebab-case, sin espacios ni mayusculas (`pedido-confirmado.html`, no `Mail - Pedido Confirmado.html`).
- Plantillas HTML reales en `templates/<plataforma>/<nombre-correo>.html`.
- Pedidos de ejemplo en `examples/<plataforma>/<escenario>.json`.
- El catalogo de plantillas vive en `config.js`: nombre, plataforma, categoria, estado, responsable, fecha de actualizacion, descripcion, ruta al HTML y variables usadas.
- CSS y JS compartidos en `assets/css/` y `assets/js/`; no duplicar estilos entre modulos.
- Cada modulo es una carpeta bajo `modules/<nombre>/` con su propio `index.html`.

## Freeze zones de este proyecto

- `templates/`: son las plantillas HTML reales que se envian en produccion. No modificar su contenido salvo que la tarea sea explicitamente "actualizar/redisenar plantilla X".
- `config.js`: es la fuente de datos del catalogo. Cambios de esquema, como agregar o quitar campos, afectan a todos los modulos; avisar antes de modificarlo de forma estructural.
- `examples/`: son datos de ejemplo reales, anonimizados o de prueba, usados para previsualizacion. No reemplazar por datos inventados sin avisar.

## Que puede tocar la IA libremente

- `modules/`, `assets/css/`, `assets/js/`, `docs/`, `README.md`, `CHANGELOG.md`: cambios de UI, organizacion y documentacion de bajo riesgo.

## Validacion esperada

No hay build ni tests automatizados. Validacion minima por cambio:

- abrir el modulo afectado en el navegador;
- revisar consola sin errores;
- confirmar que la navegacion entre modulos sigue funcionando;
- si se toco el catalogo o una plantilla: confirmar que el HTML renderiza y que la descarga funciona.
