# Crear Nueva Plantilla

Esta guía define el flujo recomendado para sumar una plantilla real al repositorio.

## Insumos necesarios

- Nombre funcional del correo.
- Plataforma que lo envía (`VTEX`, `PIM` u otra).
- Momento del flujo en que se dispara.
- Objetivo del mensaje para el cliente.
- HTML base de referencia, si debe mantener una estructura existente.
- JSON real o representativo del evento.

El JSON es necesario para garantizar que el HTML sea funcional. Puede estar sanitizado, pero debe conservar la estructura real de datos que entrega la plataforma.

## Flujo de trabajo

1. Guardar el HTML en `templates/<plataforma>/<nombre-correo>.html`.
2. Guardar el JSON en `examples/<plataforma>/<escenario>.json`.
3. Sanitizar datos sensibles del JSON antes de publicarlo.
4. Agregar la plantilla en `TEMPLATES` dentro de `config.js`.
5. Agregar el escenario en `EXAMPLE_SCENARIOS` si debe estar disponible en el Visualizador.
6. Validar la plantilla desde `modules/visualizador/`.
7. Actualizar `CHANGELOG.md` si el cambio queda publicado.

## Criterios de aceptación

- El HTML compila sin errores de Handlebars.
- El Visualizador renderiza contenido real, no una pantalla vacía.
- No quedan variables importantes sin dato.
- El diseño mantiene la base visual del resto de plantillas.
- La descarga del HTML funciona desde la ficha del catálogo.
- El JSON no contiene datos reales de cliente, pago, orden, cuenta o dirección.

## Nota operativa

Si no hay JSON disponible, se puede crear una maqueta visual, pero no debe marcarse como plantilla funcional hasta validarla contra un ejemplo real o representativo.
