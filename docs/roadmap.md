# Roadmap

Estado actual: MVP operativo para catalogar y visualizar plantillas VTEX iniciales. El Simulador QA queda como herramienta secundaria de validación interna.

## Prioridad alta

- Completar la anonimización revisada de cualquier nuevo JSON antes de publicarlo.
- Mantener Handlebars como dependencia local versionada en `assets/js/vendor/`.
- Agregar cada nuevo escenario de ejemplo en `EXAMPLE_SCENARIOS` dentro de `config.js`.
- Usar `docs/crear-nueva-plantilla.md` como flujo base para sumar correos nuevos.

## Prioridad media

- Sumar más plantillas VTEX siguiendo `templates/<plataforma>/<nombre-correo>.html`.
- Completar el módulo `Flujo de Correos` con etapas reales y variantes de logística inversa.
- Documentar responsables funcionales reales en el catálogo.

## Prioridad baja

- Evaluar una limpieza controlada de archivos temporales o históricos cuando el equipo confirme que ya no son necesarios.
- Revisar si conviene separar CSS por componentes cuando crezcan los módulos.
- Mantener el Simulador QA solo si aporta casos de prueba que no cubre el Visualizador.
