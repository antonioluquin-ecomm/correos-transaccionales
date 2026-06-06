# Normalización de archivos iniciales (HTML y JSON de ejemplo)

Fecha: 2026-06-06

## Contexto

La carpeta del proyecto tenía 2 plantillas HTML y 7 JSON de pedidos de ejemplo con nombres inconsistentes (mayúsculas, espacios, sin convención). Una auditoría rápida mostró que esos 7 JSON correspondían en realidad a solo 5 pedidos de ejemplo distintos — el resto eran copias o el mismo pedido guardado con nombres diferentes.

## Mapeo aplicado (original -> normalizado)

Los originales **no se modificaron ni se borraron** — quedan en la raíz hasta que el equipo decida limpiarlos.

| Original | Normalizado | Motivo |
| --- | --- | --- |
| `Mail - Pedido Confirmado.html` | `templates/vtex/pedido-confirmado.html` | kebab-case |
| `Mail - Pago Aprobado.html` (= `index.html` preexistente, contenido idéntico) | `templates/vtex/pago-aprobado.html` | kebab-case; el `index.html` viejo era una copia de prueba de esta misma plantilla |
| `Pedido Cancelado.json` | `examples/vtex/pedido-cancelado.json` | único ejemplo de escenario "cancelado" |
| `json pedido realizado.json` (dic-2025, orden 7194697) | `examples/vtex/pedido-realizado.json` | más reciente que `Pedido realizado con exito.json` (nov-2025, orden 7064601); se eligió como vigente |
| `json pago aprobado.json` (dic-2025, orden 7194461) | `examples/vtex/pago-aprobado.json` | pedido de ejemplo distinto al trío de abril/mayo 2026 |
| `pedido confirmado.json` (abr-2026, orden 1625110500336-01) | `examples/vtex/pedido-estandar.json` | pedido más reciente y completo; sirve como muestra "estándar" genérica |

## Duplicados detectados (no migrados, quedan como referencia histórica en la raíz)

- `Pedido realizado con exito.json` — pedido de ejemplo más antiguo que `json pedido realizado.json`; mismo escenario, distinto pedido.
- `orden confirmada.json` y `pedido confirmado.json` — **idénticos byte a byte** entre sí, y mismo pedido que `pago aprobado.json` (orden `1625110500336-01`, creado `2026-04-15T15:19:49Z`), solo que en formatos JSON distintos (uno envuelto en `{ orders: [...] }`, otro como objeto plano). Se conservó una sola copia normalizada (`pedido-estandar.json`) porque es genérica y sirve como dato de ejemplo para múltiples plantillas (pedido confirmado, pago aprobado, orden confirmada).

## Próximo paso recomendado

Cuando el equipo confirme que no necesita los originales como respaldo, se puede hacer una limpieza física explícita de los archivos de la raíz (no como parte de este cambio, según la metodología de freeze zones / limpieza controlada).
