# Taxonomía real de PIM (Canal · Tienda · Logística · Estado)

> **Importante:** todo lo de este doc es específico de **PIM** (el sistema que aparece como "PIM Frontend" en el admin). Los prefijos de `Pedido.NroPedidoCanal` (`VT10-`, `VT9-`, `VT19-`, `VT17-`, `LQ21-`) son una convención interna de PIM para identificar canal+tienda de origen — **VTEX no usa ni conoce estos prefijos**, son una etiqueta que PIM le pone al pedido cuando lo importa.

Fuente: capturas del admin de PIM ("Pedidos por Depósito", filtro "Otros" → Canal | Tienda, Logística, Estado).

---

## Canales

PIM recibe pedidos de 4 canales:

| Canal | Prefijo visto en `NroPedidoCanal` |
| --- | --- |
| **Vtex** | Activo. `VT` + número de tienda (`VT10-`, `VT9-`, `VT19-`, `VT17-`, ver tabla de tiendas) |
| **Luquin** | Activo. `LQ` + número (`LQ21-`) — punto de venta / multidepósito |
| **Dafiti** | Inactivo. |
| **Mercado Libre** | Inactivo. |

Este repo (`correos-transaccionales`) solo tiene plantillas para el canal **Vtex** y **Luquin** (PV) — los únicos activos hoy.

## Tiendas por canal

| Tienda | Canal | Estado |
| --- | --- | --- |
| Sporting | Vtex | Activa |
| Woker | Vtex | Activa |
| Tus Zapatos | Vtex | Inactiva |
| Ventas B2B | Vtex | Activa |
| Adidas | Vtex | Activa |
| Adidas Producteca | Vtex | Activa |
| Cross Selling | Luquin | Activa |

De estas, el repo modela hoy: `sporting`, `woker`, `venta-deportiva` (= Ventas B2B), `seller-adidas` (= Adidas / Adidas Producteca), y `Cross Selling` como caso especial de fallback en las plantillas PIM de multidepósito. **"Tus Zapatos" está inactiva y no está contemplada en ningún módulo de este repo** — si se activa y empieza a generar mails, hay que sumarla a `config.js` (`STORE_OPTIONS`/`TEMPLATE_TAXONOMY`).

## Prefijos confirmados de `Pedido.NroPedidoCanal`

| Prefijo | Canal | Tienda |
| --- | --- | --- |
| `VT10-` | Vtex | Sporting (B2C) |
| `VT9-` | Vtex | Woker (B2C) |
| `VT19-` | Vtex | Adidas / Adidas Producteca (EXT) |
| `VT17-` | Vtex | Ventas B2B |
| `LQ21-` | Luquin | Punto de Venta / multidepósito (todas las tiendas, incluida Cross Selling) |

Sin confirmar todavía: prefijo de "Tus Zapatos" (inactiva), y prefijos de los canales Dafiti / Mercado Libre (inactivos).

## Logística

| Valor | Tipo |
| --- | --- |
| Andreani | Operador de envío |
| OCASA | Operador de envío |
| Propia | Operador de envío (logística propia) |
| Producteca | Operador de envío (adidas) |
| Andreani Bunker | Gestión asistida (Bunker) |
| OCASA Taika | Gestión asistida (Taika) |
| Retiro | Modalidad (retiro en sucursal) |
| Punto Venta | Modalidad (venta multidepósito) |
| B2B | Canal (Ventas B2B) |
| Adidas | Canal / seller (Adidas) |

Esta es la lista de **opciones de filtro** del admin, no necesariamente el literal que guarda `Pedido.Logistica`/`lp_logistica.logistica` en cada pedido — para eso ya confirmamos por separado `"OCASATaika"` y (pendiente de confirmar) `"AndreaniBunker"` como valores reales de dato.

## Estado

Ciclo de vida completo del pedido/comprobante en PIM, más granular que el `Estado` de línea (`"O"`/`"R"`/`"B"`) que usan las plantillas de recepción de cambio/devolución/garantía y quiebre de stock:

| Estado | Etapa |
| --- | --- |
| En edición | Carga |
| Activo | Carga |
| Asignado | Preparación |
| Despachado | Envío |
| En Cola de Facturación | Facturación |
| Facturado | Facturación |
| Baja | Cancelación |
| Conflicto | Cancelación |
| Devolución Pendiente | Devolución |
| Devolución en Tránsito | Devolución |
| Devolución en Warehouse | Devolución |
| Devolución Aceptada | Devolución |
| En Cola de Comprobante de Devolución | Devolución |
| Devolución Rechazada | Devolución |
| Comprobante Nota de Crédito | Devolución |
| Devolución Cancelada | Devolución |
| Resuelto | Cierre |

**Pendiente de reconciliar:** no está confirmado si estos son los mismos valores que terminan mapeados a los códigos de una letra (`O`/`R`/`B`) que usan las plantillas Handlebars de este repo, o si son un estado de nivel superior (pedido/comprobante) distinto del estado de línea que ven las plantillas. Antes de asumir una correspondencia 1 a 1, confirmar con un JSON real de un pedido en cada estado relevante.

## Secciones del admin de PIM (para referencia)

Del menú lateral ("PIM Frontend"): Inicio, Productos, Pedidos por Depósito, Pedidos B2B, Pedidos con Error, Stocks Depósito, Stocks Tienda, Comprobantes, Gift Cards, Reportes.
