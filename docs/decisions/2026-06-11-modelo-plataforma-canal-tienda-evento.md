# Modelo Plataforma > Canal > Tienda > Evento > Escenario

Fecha: 2026-06-11

## Contexto

El caso Multideposito / Punto de Venta introduce pedidos que no nacen en e-commerce, pero luego comparten gran parte del flujo operativo con las comunicaciones PIM existentes.

Hasta ahora el sitio inferia "tienda" desde rutas como `templates/vtex/sporting/...`, `templates/vtex/woker/...`, `templates/vtex/b2b/...` o `templates/pim/shared/...`. Ese modelo servia para pocas plantillas, pero mezclaba conceptos:

- `plataforma`: sistema que emite o administra el correo (VTEX, PIM, Andreani, OCASA).
- `canal`: origen comercial del pedido (E-commerce, Punto de Venta).
- `tienda`: marca o negocio (Sporting, Woker, B2B).
- `evento`: momento funcional que dispara el correo.
- `escenario`: JSON representativo usado para previsualizar.

## Decision

Adoptamos el modelo **Plataforma > Canal > Tienda > Evento > Escenario**.

PV queda modelado como canal (`punto-de-venta`), no como tienda. B2B se mantiene como tienda/negocio (`b2b`) dentro del canal e-commerce.

La primera etapa es metadata-first:

- no se mueven carpetas en `templates/` ni `examples/`;
- no se modifica el contenido de plantillas productivas;
- `config.js` normaliza `canales`, `tiendas` y `evento` para cada plantilla;
- `EXAMPLE_SCENARIOS` queda enriquecido con `canales`, `tiendas` y `eventoId`.

## Alternativas descartadas

### PV como tienda

Era la opcion mas simple, pero forzaba un concepto operativo incorrecto: PV no es una marca ni negocio, sino un canal de origen del pedido.

### Migracion completa de carpetas

Reorganizar rutas bajo canal/tienda seria mas expresivo a largo plazo, pero implicaria tocar muchos links y referencias sin necesidad inmediata. Se pospone hasta que exista una razon operativa clara.

### Solo documentar sin implementar

Dejaba el problema en los filtros y en el Visualizador. Se descarta porque el volumen actual ya requiere navegar por canal y tienda.

## Consecuencias

- Las plantillas PIM compartidas pueden aparecer bajo Sporting y Woker sin mostrarse como "Compartido".
- El Visualizador y el Simulador filtran por plataforma, canal y tienda.
- El Flujo puede mostrar PV como canal y conectar la confirmacion multideposito con las etapas PIM compartidas.
- Los nuevos escenarios deben declarar o heredar canal, tienda y evento para evitar ambiguedades.
