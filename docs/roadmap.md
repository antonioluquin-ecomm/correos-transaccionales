# Roadmap

Estado actual: plataforma consolidada para catalogar, visualizar y navegar plantillas por plataforma, canal, tienda, evento y escenario. El Simulador QA queda como herramienta secundaria de validación interna.

## Prioridad alta

- Completar la anonimización revisada de cualquier nuevo JSON antes de publicarlo.
- Mantener Handlebars como dependencia local versionada en `assets/js/vendor/`.
- Agregar cada nuevo escenario de ejemplo en `EXAMPLE_SCENARIOS` dentro de `config.js`.
- Usar `docs/crear-nueva-plantilla.md` como flujo base para sumar correos nuevos.
- Usar el mapa de `Flujo de Correos` para priorizar qué plantillas faltantes crear primero.
- Mantener `docs/auditoria-escenarios.md` actualizado cuando se agreguen o reemplacen escenarios.

## Prioridad media

- Sumar más plantillas VTEX siguiendo `templates/<plataforma>/<nombre-correo>.html`.
- Revisar con negocio si los nodos del flujo son definitivos o si falta alguna comunicación.
- Documentar responsables funcionales reales en el catálogo.
- Evaluar exportación PDF/PNG cuando exista una necesidad operativa concreta y una solución robusta de captura.

## Prioridad baja

- Evaluar una limpieza controlada de archivos temporales o históricos cuando el equipo confirme que ya no son necesarios.
- Revisar si conviene separar CSS por componentes cuando crezcan los módulos.
- Mantener el Simulador QA solo si aporta casos de prueba que no cubre el Visualizador.
- No crear ni editar plantillas de Andreani/OCASA salvo que el negocio confirme que pasan a ser gestionables por el equipo.
