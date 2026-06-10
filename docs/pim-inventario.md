# Inventario PIM

Inventario inicial para estandarizar las plantillas PIM compartidas por Sporting y Woker. Las plantillas actuales viven en `templates/pim/shared` y no se separan por tienda; la marca debe resolverse con variables dinamicas de PIM.

## Criterio de marca y assets

- Marca: dinamica por sitio usando `HeaderURL` y `HeaderImage`.
- Assets actuales: URLs remotas ya presentes en los HTML productivos.
- Pendiente: recibir SVG, PNG u originales de logos/footer y lineamientos especificos para comunicaciones PIM.
- Primera base visual: `nuevo-envio.v2.html`.

## Plantillas

| Plantilla | Prioridad | Estado de trabajo | Variables clave | Recursos graficos actuales | Oportunidades |
| --- | --- | --- | --- | --- | --- |
| `nuevo-envio` | Alta | Base v2 inicial | `Tienda.Datos.NotificacionesConfig.HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.Logistica`, `Pedido.DatosEnvio.Etiqueta.NroSeguimiento`, `Pedido.DatosEnvio.Destinatario.Nombres` | Header dinamico, footer banner, logos footer | Ordenar tracking, CTA por operador, fallback sin seguimiento, tono mas claro |
| `nuevo-pickup` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[0].Deposito` | Header dinamico, footer banner, logos footer | Mejorar instrucciones de retiro, sucursal, horarios y requisitos |
| `despacho-pickup` | Alta | Pendiente | `Pedido.NroPedidoCanal`, `Pedido.FechaPedido`, `Pedido.LineasPedido[]`, `Deposito.DatosDeposito.DatosPickup.*`, `Pedido.TotalLineas` | Header dinamico, iconos check/circle, logos footer | Reusar componentes de resumen, tabla de productos, datos de pickup y progreso |
| `giftcard` | Alta | Pendiente | `Proveedor.GetEmailHeaderURL`, `Proveedor.GetEmailHeaderImage`, `Giftcard.Codigo`, `Giftcard.SaldoInicial`, `Giftcard.Descripcion` | Header dinamico de proveedor, footer banner, logos footer | Hacer visible codigo, monto, instrucciones y politica de uso |
| `recepcion-cambio` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad`, `Estado`, `Historial[0].Observaciones` | Header dinamico, footer banner, logos footer | Separar aceptados/rechazados, explicar proximos pasos |
| `recepcion-devolucion` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad`, `Estado`, `Historial[0].Observaciones` | Header dinamico, footer banner, logos footer | Aclarar estado de revision y plazos de reintegro |
| `recepcion-garantia` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad`, `Estado`, `Historial[0].Observaciones` | Header dinamico, footer banner, logos footer | Diferenciar garantia aprobada/rechazada y condiciones |
| `reembolso` | Alta | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.NroPedidoCanal`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad`, `Estado` | Header dinamico, footer banner, logos footer | Clarificar motivo, productos afectados y tiempos por medio de pago |
| `factura-disponible` | Media | Pendiente | `HeaderURL`, `HeaderImage` | Header dinamico, footer banner, logos footer | Agregar contexto de pedido/factura si PIM lo expone |
| `etiqueta-devolucion` | Media | Pendiente | `HeaderURL`, `HeaderImage`, `Pedido.LineasPedido[]`, `Producto`, `SKU`, `Cantidad` | Header dinamico, footer banner, logos footer | Mejorar instrucciones para imprimir/usar etiqueta y preparar paquete |
| `despacho-b2b` | Media | Pendiente | `Pedido.NroPedidoCanal`, `Pedido.FechaPedido`, `Pedido.DatosEnvio.*`, `Pedido.LineasPedido[]`, `Pedido.TotalLineas` | Header dinamico, iconos check/circle, logos footer | Validar si debe quedar en PIM compartido o en flujo B2B especifico |
| `andreani-alta-automatica` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |
| `andreani-distribucion` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |
| `andreani-entregado` | Revisar | Normalizar alcance | `NroSeguimiento` | Sin header/footer PIM | Confirmar si pertenece al frente Andreani y no al estandar PIM |

## Orden recomendado

1. `nuevo-envio`: fija header, hero, tracking, CTA logistico y footer.
2. `nuevo-pickup`: adapta la base a retiro en sucursal.
3. `giftcard`: valida componentes de codigo/monto para flujo inverso.
4. `recepcion-cambio`, `recepcion-devolucion`, `recepcion-garantia`: migran estados de revision y motivos.
5. `despacho-pickup` y `despacho-b2b`: migran tablas/resumen cuando la base simple ya este validada.
