# Auditoria de Escenarios

Fecha: 2026-06-11

Esta auditoria resume la cobertura real disponible en `EXAMPLE_SCENARIOS`. No se crean escenarios ficticios: cuando falta una variante, debe incorporarse solo con un JSON real o representativo y sanitizado.

## Resumen

- Todas las plantillas catalogadas tienen al menos un escenario compatible.
- La mejor cobertura esta en `pim-nuevo-envio`, con variantes por operador logistico y fallback sin tracking.
- Las plantillas VTEX Woker tienen cobertura minima, generalmente un escenario por evento.
- Las plantillas PIM compartidas suelen tener un escenario Sporting; solo Multideposito cubre Sporting y Woker.
- Andreani y OCASA se mantienen como referencia documental en Flujo, no como plantillas gestionables.

## Cobertura por plantilla

| Plantilla | Plataforma | Canal | Tienda | Etapa | Escenarios | Observacion |
| --- | --- | --- | --- | --- | ---: | --- |
| Pedido realizado Sporting | VTEX | ecommerce | Sporting | Compra / Pedido | 3 | Buena base; revisar si `Pago aprobado - pedido base` debe seguir compatible con pedido realizado. |
| Pedido realizado Woker | VTEX | ecommerce | Woker | Compra / Pedido | 1 | Cobertura minima. |
| Pedido cancelado Sporting | VTEX | ecommerce | Sporting | Cancelacion / Reembolso | 2 | Falta distinguir motivo: cliente, stock u operativa. |
| Pedido cancelado Woker | VTEX | ecommerce | Woker | Cancelacion / Reembolso | 1 | Falta cobertura por motivo. |
| Pago aprobado Sporting | VTEX | ecommerce | Sporting | Pago | 3 | Buena base, pero depende de escenarios compartidos con pedido realizado. |
| Pago aprobado Woker | VTEX | ecommerce | Woker | Pago | 1 | Cobertura minima. |
| Acceso Sporting | VTEX | ecommerce | Sporting | Cuenta / Acceso | 1 | Suficiente para login/codigo. |
| Acceso B2B | VTEX | ecommerce | B2B | Cuenta / Acceso | 1 | Comparte JSON con Sporting; validar si B2B expone diferencias reales. |
| Acceso Woker | VTEX | ecommerce | Woker | Cuenta / Acceso | 1 | Suficiente para login/codigo. |
| Volvio a stock Sporting | VTEX | ecommerce | Sporting | Cuenta / Acceso | 1 | Suficiente para evento simple. |
| Volvio a stock Woker | VTEX | ecommerce | Woker | Cuenta / Acceso | 1 | Suficiente para evento simple. |
| Pedido facturado Sporting | VTEX | ecommerce | Sporting | Facturacion | 1 | Falta variante sin tracking o con multiples facturas si existe en VTEX. |
| Orden generada B2B | VTEX | ecommerce | B2B | Compra / Pedido | 1 | Suficiente como base B2B. |
| Pedido despachado PIM | PIM | ecommerce, PV | Sporting, Woker | Despacho / Retiro | 8 | Cobertura fuerte por operador logistico. |
| Confirmacion Multideposito | PIM | PV | Sporting, Woker | Compra / Pedido | 2 | Correcto: cubre ambas marcas PV actuales. |
| Pedido listo para retirar | PIM | ecommerce, PV | Sporting, Woker | Despacho / Retiro | 1 | Falta Woker si el flujo real difiere. |
| Despacho B2B | PIM | ecommerce | B2B | Preparacion | 1 | Suficiente como base mayorista. |
| Giftcard | PIM | ecommerce, PV | Sporting, Woker | Inversa | 1 | Falta validar variantes sin saldo u observaciones si existen. |
| Recepcion de cambio | PIM | ecommerce, PV | Sporting, Woker | Inversa | 1 | Cubre aceptado + rechazado. |
| Recepcion de devolucion | PIM | ecommerce, PV | Sporting, Woker | Inversa | 1 | Cubre aceptado + rechazado. |
| Recepcion de garantia | PIM | ecommerce, PV | Sporting, Woker | Inversa | 1 | Cubre aceptado + rechazado. |
| Reembolso | PIM | ecommerce, PV | Sporting, Woker | Cancelacion / Reembolso | 1 | Falta validar variantes por medio de pago si PIM las expone. |
| Factura disponible | PIM | ecommerce, PV | Sporting, Woker | Facturacion | 1 | Cubre Nro de pedido condicional. |
| Etiqueta de devolucion | PIM | ecommerce, PV | Sporting, Woker | Inversa | 1 | Suficiente como base si la etiqueta siempre viaja adjunta. |

## Prioridades recomendadas

1. Completar motivos de cancelacion VTEX con JSON reales: cliente, stock y operativa.
2. Sumar Woker para `pim-despacho-pickup` solo si el payload real o copy difiere de Sporting.
3. Validar si `order-invoiced` necesita variantes sin tracking o multiples facturas.
4. Revisar si B2B access-key debe tener JSON propio o puede seguir compartiendo estructura.
5. Mantener `pim-nuevo-envio` como referencia de cobertura: operador real, fallback y caso sin tracking.
