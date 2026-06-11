# Inventario PIM

Inventario inicial para estandarizar las plantillas PIM compartidas por Sporting y Woker. Las plantillas actuales viven en `templates/pim/shared` y no se separan por tienda; la marca debe resolverse con variables dinamicas de PIM.

## Criterio de marca y assets

- Marca: dinamica por sitio usando `HeaderURL` y `HeaderImage`.
- Assets actuales: URLs remotas ya presentes en los HTML productivos.
- Pendiente: recibir SVG, PNG u originales de logos/footer y lineamientos especificos para comunicaciones PIM.
- Primera base visual: `nuevo-envio.v2.html`.
- Motor de render del Visualizador (`assets/js/shared.js`): soporta sintaxis Go `{{ if/else if/else }}`, `{{ with }}` y `{{ range }}` (con rama `{{ else }}` para listas vacías), la función `index` (`(index .Historial 0).Observaciones`), además de `eq/ne/not/and/or/hasPrefix/hasSuffix/gt/lt/ge/le/len`. Las tablas de productos (`range .Pedido.LineasPedido`) se renderizan en vivo.

## Plantillas

| Plantilla | Prioridad | Estado de trabajo | Variables clave | Recursos graficos actuales | Oportunidades |
| --- | --- | --- | --- | --- | --- |
| `confirmacion-multideposito` | Alta | Base v2 (nueva) | `Tienda.Nombre`, `HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.FechaPedido`, `Pedido.DatosEnvio.Destinatario.Nombres`, `Pedido.LineasPedido[]` (`Producto`/`SKU`/`Importe`/`Cantidad`/`Subtotal`), `Pedido.TotalLineas` | Header dinamico, footer VTEX, tabla de productos, portal por marca | Confirmar URL del portal de Woker; validar variables reales de PIM para venta en sucursal |
| `nuevo-envio` | Alta | Base v2 inicial | `Tienda.Datos.NotificacionesConfig.HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.Logistica`, `Pedido.DatosEnvio.Etiqueta.NroSeguimiento`, `Pedido.DatosEnvio.Destinatario.Nombres` | Header dinamico, footer banner, logos footer | Ordenar tracking, CTA por operador, fallback sin seguimiento, tono mas claro |
| `despacho-pickup` | Alta | Base v2 (nueva) | `Tienda.Nombre`, `HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.FechaPedido`, `Pedido.DatosEnvio.Destinatario.Nombres`, `Pedido.LineasPedido[]` (`Producto`/`SKU`/`Importe`/`Cantidad`/`Subtotal`), `Pedido.TotalLineas`, `Deposito.DatosDeposito.DatosPickup.*` (`NombrePublico`/`Direccion`/`Localidad`/`Horario`) | Header dinamico, footer VTEX, stepper, tabla de productos, datos de pickup | Validar variables reales de pickup |
| `giftcard` | Alta | Base v2 (lista) | `Proveedor.GetEmailHeaderURL`, `Proveedor.GetEmailHeaderImage`, `Giftcard.Codigo`, `Giftcard.SaldoInicial` (cond.), `Giftcard.Descripcion` (cond.) | Header dinamico de proveedor, footer VTEX, codigo destacado | Flujo sin Tienda.Nombre ni Destinatario.Nombres: saludo y copyright genericos, links sobre Proveedor.GetEmailHeaderURL |
| `recepcion-cambio` | Alta | Base v2 (lista) | `Tienda.Nombre`, `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]` (`Producto`/`SKU`/`Cantidad`/`Estado`), `(index .Historial 0).Observaciones` | Header dinamico, footer VTEX, estados aceptado/rechazado | Estado por linea (O=Aceptado / R=Rechazado + motivo) |
| `recepcion-devolucion` | Alta | Base v2 (lista) | `Tienda.Nombre`, `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]` (`Producto`/`SKU`/`Cantidad`/`Estado`), `(index .Historial 0).Observaciones` | Header dinamico, footer VTEX, estados + plazo reembolso | Igual a cambio, con info de reintegro a 96 h |
| `recepcion-garantia` | Alta | Base v2 (lista) | `Tienda.Nombre`, `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]` (`Producto`/`SKU`/`Cantidad`/`Estado`), `(index .Historial 0).Observaciones` | Header dinamico, footer VTEX, estados + aclaraciones | Igual a cambio, con aclaraciones de reembolso (credito/debito) |
| `reembolso` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad`, `Estado` | Header dinamico, footer banner, logos footer | Clarificar motivo, productos afectados y tiempos por medio de pago |
| `factura-disponible` | Media | Pendiente | `HeaderURL`, `HeaderImage` | Header dinamico, footer banner, logos footer | Agregar contexto de pedido/factura si PIM lo expone |
| `etiqueta-devolucion` | Media | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad` | Header dinamico, footer banner, logos footer | Mejorar instrucciones para imprimir/usar etiqueta y preparar paquete |
| `despacho-b2b` | Media | Pendiente | `Pedido.NroPedidoCanal`, `Pedido.FechaPedido`, `Pedido.DatosEnvio.*`, `Pedido.LineasPedido[]`, `Pedido.TotalLineas` | Header dinamico, iconos check/circle, logos footer | Validar si debe quedar en PIM compartido o en flujo B2B especifico |
| `andreani-alta-automatica` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |
| `andreani-distribucion` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |
| `andreani-entregado` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |

## Orden recomendado

1. `nuevo-envio`: fija header, hero, tracking, CTA logistico y footer. (Listo v2)
2. `confirmacion-multideposito`: confirmacion de compra venta multideposito. (Listo v2)
3. `despacho-pickup`: pedido listo para retirar en sucursal, con datos de pickup. (Listo v2)
4. `giftcard`: codigo de cambio con codigo destacado y condiciones. (Listo v2)
5. `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia`: estados aceptado/rechazado con motivo. (Listo v2)
6. `despacho-b2b`: migra tablas/resumen del flujo B2B.

> Nota: `nuevo-pickup` se eliminó (2026-06-10). Era una version vieja y redundante con `despacho-pickup`, que es la plantilla correcta de retiro en sucursal.
