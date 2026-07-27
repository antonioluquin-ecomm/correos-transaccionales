# Variables PIM disponibles

Diccionario de datos consolidado para la plataforma **PIM** (`templates/pim/shared/`). Relevado desde el uso real de Handlebars en las plantillas `*.v2.html` vigentes, cruzado con `config.js` (`TEMPLATES[].variables`) y los JSON de `examples/pim/shared/`.

Objetivo: saber qué variables existen y en qué plantillas ya se usan antes de armar un mail PIM nuevo. No reemplaza al JSON real del evento — antes de dar por buena una variable nueva, confirmar contra un JSON real o representativo (ver [`docs/crear-nueva-plantilla.md`](crear-nueva-plantilla.md)).

> Motor de render: Handlebars con sintaxis estilo Go (`{{ if/else if/else }}`, `{{ with }}`, `{{ range }}`, `index`, `eq/ne/not/and/or/hasPrefix/hasSuffix/gt/lt/ge/le/len`). Ver detalle en [`docs/pim-inventario.md`](pim-inventario.md).
>
> Taxonomía real de PIM (canales, tiendas por canal, logística, estados, prefijos de `NroPedidoCanal`): [`docs/pim-taxonomia.md`](pim-taxonomia.md).

> **Pendiente de verificar (sellers de gestión asistida Taika/Bunker):** `Pedido.Logistica = "OCASATaika"` / `"AndreaniBunker"` (usado en `envio-despachado`, `recepcion-devolucion`, `recepcion-garantia`, `etiqueta-devolucion`, `quiebre-stock` — **no** en `recepcion-cambio`, esos sellers no ofrecen cambios) se basa en los valores que muestra el panel de filtros del admin ("Pedidos por Depósito" → radio "Logística"), no en un JSON real de un pedido de esos depósitos. Se confirmó que el mail arma `Tienda`/`Pedido` leyendo la tabla `pedidos` (no de la consulta API de ejemplo que se revisó, cuyo esquema es `snake_case`: `id_deposito`, `lineas_pedido[].lp_logistica.logistica`, etc. — completamente distinto al `Tienda.*`/`Pedido.*` que usan las plantillas). Ninguno de los 3 JSON de ejemplo vistos (`id_deposito` 199, 45, 22) era un pedido real de Taika (`id_deposito` 198) o Bunker (`id_deposito` 197). **Falta un JSON real de un pedido con `id_deposito = 198` o `197` para confirmar que `lp_logistica.logistica` dice literalmente `"OCASATaika"`/`"AndreaniBunker"` y que se aplana a un único `Pedido.Logistica` a nivel de pedido** (asumible porque nunca hay pedidos con productos de más de un seller/depósito mezclados). Si al confirmar el valor real difiere, corregir los 5 templates PIM (los valores literales están en el bloque `{{ if (eq .Pedido.Logistica "OCASATaika") }}` / `"AndreaniBunker"` de cada uno) y los 8 escenarios de ejemplo en `examples/pim/shared/*-taika.json` / `*-bunker.json`. El lado VTEX (`order-invoiced`, campo `shippingData.logisticsInfo[0].deliveryIds[0].warehouseId`) ya se confirmó con JSON reales y no depende de esto.

---

## `Tienda.*`

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Tienda.Nombre` | string | Nombre de la marca (`"Sporting"`, `"Woker"`, `"Cross Selling"`, etc.). Se usa como discriminador condicional (`eq .Tienda.Nombre "Cross Selling"`) para fallback de header/footer y copy por marca. | Todas las plantillas PIM |
| `Tienda.Datos.NotificacionesConfig.HeaderURL` | string (URL) | Link del logo/header al sitio de la tienda. | `envio-despachado`, `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b`, `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia`, `quiebre-stock`, `quiebre-stock-pv`, `factura-disponible`, `etiqueta-devolucion` |
| `Tienda.Datos.NotificacionesConfig.HeaderImage` | string (URL) | Imagen del logo del header. | Igual que arriba |

**Nota:** cuando `Tienda.Nombre == "Cross Selling"`, la mayoría de las plantillas hacen fallback (no usan `HeaderURL`/`HeaderImage`/`Nombre` reales) — ver [`docs/pim-inventario.md`](pim-inventario.md) y `docs/decisions/2026-06-10-alineacion-marcas.md` para el criterio.

---

## `Pedido.*` (datos generales)

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Pedido.NroPedidoCanal` | string | Número de pedido visible al cliente. Prefijo real por canal (confirmado): `VT10-` = Sporting B2C, `VT9-` = Woker B2C, `VT19-` = EXT/adidas, `VT17-` = B2B (Venta Deportiva), `LQ21-` = Punto de Venta/multidepósito (todas las tiendas, incluida Cross Selling). | `envio-despachado`, `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b`, `quiebre-stock`, `quiebre-stock-pv`, `factura-disponible` (condicional) |
| `Pedido.FechaPedido` | string (fecha) | Fecha de creación del pedido. | `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b` |
| `Pedido.Logistica` | string | Operador logístico (`"Andreani"`, `"OCASA"`, `"Propia"`, `"Producteca"`). Discrimina copy y CTA de tracking. También se usa como señal de **seller de gestión asistida** (venden desde la cuenta VTEX propia, sin tienda PIM propia): `"OCASATaika"` = Taika (operador real OCASA, mismo botón/link de tracking en despacho; leyenda "Vendido por Taika") y `"AndreaniBunker"` = Bunker (operador real Andreani; leyenda "Vendido por Bunker"). En `recepcion-devolucion`/`recepcion-garantia`/`etiqueta-devolucion`/`quiebre-stock` este campo no tiene rol de logística de envío (son eventos de logística inversa o de stock) — se usa **únicamente** para disparar la leyenda de vendedor, porque el seller es quien recibe/valida la devolución en su propio depósito. **No aplica a `recepcion-cambio` ni a `giftcard-enviada`**: Taika/Bunker/adidas no ofrecen cambios, solo devolución/garantía — y la giftcard-enviada es precisamente la resolución de un cambio, así que tampoco aplica. Tampoco aplica a `retiro-disponible` (Taika/Bunker no operan ese flujo), ni a `factura-disponible` (la factura de estos sellers se envía por el mail VTEX `order-invoiced`, no por PIM). En `order-invoiced` (VTEX, no PIM) la señal equivalente es `shippingData.logisticsInfo[0].deliveryIds[0].warehouseId` (`"1_198"` = Taika, `"1_197"` = Bunker) — ahí no hay tienda ni seller VTEX propios (siempre `sellers[].id = "1"` / Sporting), el depósito de despacho es la única señal disponible. Ver `templates/vtex/sporting/order-invoiced/order-invoiced.v2.html`. | `envio-despachado`, `recepcion-devolucion`, `recepcion-garantia`, `etiqueta-devolucion`, `quiebre-stock` |
| `Pedido.TotalLineas` | number/string | Total monetario del pedido (suma de líneas). | `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b` |

## `Pedido.DatosEnvio.*`

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Pedido.DatosEnvio.Destinatario.Nombres` | string | Nombre del destinatario/cliente. | `envio-despachado`, `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b` |
| `Pedido.DatosEnvio.Etiqueta.NroSeguimiento` | string | Número de tracking. Su formato (prefijo `UR`/`AD`/`CA`, longitud numérica) se usa para inferir el carrier real cuando `Logistica == "Producteca"`. | `envio-despachado` |
| `Pedido.DatosEnvio.Destino.Postal.Calle` | string | Calle de destino. | `envio-despachado`, `pedido-confirmado-pv`, `envio-b2b` |
| `Pedido.DatosEnvio.Destino.Postal.Numero` | string | Altura/número de destino. | Igual que arriba |
| `Pedido.DatosEnvio.Destino.Postal.Localidad` | string | Localidad de destino. | Igual que arriba |
| `Pedido.DatosEnvio.Destino.Postal.Pais` | string | País de destino. | Igual que arriba |
| `Pedido.DatosEnvio.Destino.Postal.CodigoPostal` | string | Código postal de destino. | Igual que arriba |
| `Pedido.DatosEnvio.Destino.Postal.Referencia` | string (opcional) | Referencia/aclaración de dirección. Renderiza condicional (`{{ if ... }}`). | Igual que arriba |

## `Pedido.LineasPedido[]` (tabla de productos)

Se recorre con `{{ with .Pedido.LineasPedido }}{{ range . }}...{{ end }}{{ else }}...{{ end }}` (tiene rama vacía).

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Producto` | string | Nombre del producto. | `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b`, `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia`, `quiebre-stock`, `quiebre-stock-pv`, `etiqueta-devolucion` |
| `SKU` | string | SKU del producto. | Igual que arriba |
| `Cantidad` | number | Cantidad de unidades. | Igual que arriba |
| `Importe` | number/string | Precio unitario. | `pedido-confirmado-pv`, `retiro-disponible`, `envio-b2b` |
| `Subtotal` | number/string | Subtotal de la línea (Importe × Cantidad). | Igual que arriba |
| `Estado` | string (código) | Estado de la línea. Valores vistos: `"O"` = Aceptado/OK, `"R"` = Rechazado, `"B"` = Baja (quiebre de stock). | `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia`, `quiebre-stock`, `quiebre-stock-pv` |
| `Historial[0].Observaciones` | string | Motivo/observación del último evento de la línea (se accede con `{{ (index .Historial 0).Observaciones }}`, solo cuando `Estado == "R"`). | `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia` |

---

## `Deposito.*` (retiro en sucursal / pickup)

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Deposito.DatosDeposito.DatosPickup.NombrePublico` | string | Nombre público de la sucursal de retiro. | `retiro-disponible`, `quiebre-stock-pv` (condicional) |
| `Deposito.DatosDeposito.DatosPickup.Direccion` | string | Dirección de la sucursal. | Igual que arriba |
| `Deposito.DatosDeposito.DatosPickup.Localidad` | string | Localidad de la sucursal. | Igual que arriba |
| `Deposito.DatosDeposito.DatosPickup.Horario` | string | Horario de atención. | Igual que arriba |

**Nota:** para distinguir sellers de gestión asistida (Taika, Bunker) se usa `Pedido.Logistica` en todas las plantillas donde corresponde (ver arriba) — no se usa el id de depósito (`Deposito.Id`, no confirmado por PIM) porque `Pedido.Logistica` ya cubre el caso, incluso en eventos sin logística de envío real (recepción de cambio/devolución/garantía, quiebre de stock), a pedido explícito para esos eventos.

---

## `Proveedor.*` / `Giftcard.*` (flujo de giftcard, sin `Tienda`/`Pedido`)

El flujo de giftcard **no** usa `Tienda.Nombre` ni `Destinatario.Nombres` — el saludo y copyright son genéricos, y los links de marca cuelgan de `Proveedor.*`.

| Variable | Tipo | Descripción | Usada en |
| --- | --- | --- | --- |
| `Proveedor.GetEmailHeaderURL` | string (URL) | Link del header/footer al sitio del proveedor. | `giftcard-enviada` |
| `Proveedor.GetEmailHeaderImage` | string (URL) | Imagen del logo del header. | `giftcard-enviada` |
| `Giftcard.Codigo` | string | Código de la giftcard, destacado visualmente. | `giftcard-enviada` |
| `Giftcard.SaldoInicial` | number/string (opcional) | Saldo inicial, se muestra si viene con dato. | `giftcard-enviada` |
| `Giftcard.Descripcion` | string (opcional) | Descripción/condiciones, se muestra si viene con dato. | `giftcard-enviada` |

---

## Cómo mantener esto al día

Este listado se arma a mano recorriendo `templates/pim/shared/*.v2.html`. Si agregás o modificás una plantilla PIM:

1. Sumá las variables nuevas (o cambios de forma) en la tabla que corresponda.
2. Si es una raíz de dato nueva (algo distinto de `Tienda`/`Pedido`/`Deposito`/`Proveedor`/`Giftcard`), agregá una sección nueva.
3. Actualizá también la columna `variables` de la plantilla en `config.js` y, si aplica, la fila correspondiente en [`docs/pim-inventario.md`](pim-inventario.md).

No hace falta bump de versión en `config.js` por cambios solo de este documento (regla de "solo docs" del `CLAUDE.md`).
