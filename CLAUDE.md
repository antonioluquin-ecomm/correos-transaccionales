# Instrucciones para la IA — Correos Transaccionales

Este proyecto sigue la metodología institucional descrita en [`PROJECT_WORKFLOW.md`](PROJECT_WORKFLOW.md). Este archivo agrega convenciones específicas de este repo.

## Qué es el proyecto

Sitio estático (sin backend, sin credenciales) para centralizar plantillas de correos transaccionales (VTEX, PIM y futuras plataformas), su metadata, datos de ejemplo y previsualización. Hosting: GitHub Pages.

## Convenciones de este repo

- Archivos y carpetas en kebab-case, sin espacios ni mayúsculas (`pedido-confirmado.html`, no `Mail - Pedido Confirmado.html`).
- Plantillas HTML reales en `templates/<plataforma>/<nombre-correo>.html`.
- Pedidos de ejemplo en `examples/<plataforma>/<escenario>.json`.
- El catálogo de plantillas (metadata) vive en `config.js`: nombre, plataforma, categoría, estado, responsable, fecha de actualización, descripción, ruta al HTML, variables usadas.
- CSS y JS compartidos en `assets/css/` y `assets/js/` — no duplicar estilos entre módulos.
- Cada módulo es una carpeta bajo `modules/<nombre>/` con su propio `index.html`.

## Freeze zones de este proyecto

- `templates/`: son las plantillas HTML reales que se envían en producción. No modificar su contenido salvo que la tarea sea explícitamente "actualizar/rediseñar plantilla X".
- `config.js`: es la fuente de datos del catálogo. Cambios de esquema (agregar/quitar campos) afectan a todos los módulos — avisar antes de modificarlo de forma estructural.
- `examples/`: son datos de ejemplo reales (anonimizados/de prueba) usados para previsualización. No reemplazar por datos inventados sin avisar.

## Qué puede tocar la IA libremente

- `modules/`, `assets/css/`, `assets/js/`, `docs/`, `README.md`, `CHANGELOG.md`: cambios de UI, organización y documentación de bajo riesgo.

## Validación esperada

No hay build ni tests automatizados. Validación mínima por cambio:

- abrir el módulo afectado en el navegador;
- revisar consola sin errores;
- confirmar que la navegación entre módulos sigue funcionando;
- si se tocó el catálogo o una plantilla: confirmar que el HTML renderiza y que la descarga funciona.
