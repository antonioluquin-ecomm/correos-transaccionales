/**
 * Catálogo de plantillas de Correos Transaccionales.
 *
 * Esquema de cada entrada (Módulo 2 — Biblioteca de Plantillas):
 *   id            -> identificador único, kebab-case, igual al nombre de archivo sin extensión
 *   nombre        -> nombre visible de la plantilla
 *   plataforma    -> "VTEX" | "PIM" | otra plataforma futura
 *   categoria     -> etapa del flujo (ver modules/flujo): "Logística de Entrega",
 *                    "Logística inversa - Cambio", "Logística inversa - Devolución",
 *                    "Logística inversa - Garantía"
 *   estado        -> "activo" | "en revisión" | "deprecado"
 *   actualizado   -> fecha de última actualización (YYYY-MM-DD)
 *   responsable   -> dueño/a funcional de la plantilla
 *   descripcion   -> qué dispara el envío y a quién
 *   archivoHtml   -> ruta relativa al HTML real dentro de templates/
 *   ejemplo       -> ruta relativa al JSON de datos de ejemplo dentro de examples/ (puede ser null si aún no hay)
 *   variables     -> lista de variables/datos clave que usa la plantilla (para consulta rápida,
 *                    no es la lista exhaustiva de helpers Handlebars del HTML)
 *
 * EXAMPLE_SCENARIOS centraliza los JSON disponibles para previsualización.
 *   id                  -> identificador estable del escenario
 *   path                -> ruta relativa al JSON dentro de examples/
 *   label               -> nombre visible del escenario
 *   tipo                -> familia funcional del JSON
 *   descripcion         -> variante que representa
 *   compatibleTemplates -> ids de plantillas que pueden renderizarse con ese JSON
 */

const TEMPLATES = [
  {
    id: 'pedido-confirmado',
    nombre: 'Pedido realizado con éxito',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'activo',
    actualizado: '2026-06-06',
    responsable: 'Por definir',
    descripcion: 'Confirma al cliente que su pedido fue registrado correctamente, con resumen de productos, totales, dirección y forma de pago.',
    archivoHtml: 'templates/vtex/sporting/pedido-confirmado/pedido-confirmado.v2.html',
    ejemplo: 'examples/vtex/sporting/pedido-estandar.sample.json',
    variables: [
      'hostName',
      '_accountInfo.TradingName',
      'orders.0.orderId',
      'orders.0.creationDate',
      'orders.0.clientProfileData.firstName',
      'orders.0.value (formatCurrency)',
      'orders.0.items[] (skuName, quantity, listPrice, sellingPrice, imageUrl)',
      'orders.0.totals[] (Items, Discounts, Shipping, Tax, GiftCards)',
      'orders.0.shippingData.selectedAddresses[0] (street, number, complement, city, state, postalCode)',
      'orders.0.shippingData.logisticsInfo[0].deliveryIds[0].courierName',
      'orders.0.paymentData.transactions[].payments[] (paymentSystemName, installments, lastDigits, connectorResponses.authId)',
      'orders.0.ratesAndBenefitsData.rateAndBenefitsIdentifiers[] (name, description)',
      'orders.0.items[] (imageUrl, detailUrl — usados en links de producto)',
    ],
  },
  {
    id: 'pedido-cancelado',
    nombre: 'Pedido cancelado',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'activo',
    actualizado: '2026-06-08',
    responsable: 'Por definir',
    descripcion: 'Notifica al cliente que su pedido fue cancelado e informa el proceso de reintegro según el medio de pago.',
    archivoHtml: 'templates/vtex/sporting/pedido-cancelado/pedido-cancelado.v2.html',
    ejemplo: 'examples/vtex/sporting/pedido-cancelado.sample.json',
    variables: [
      'hostName',
      '_accountInfo.TradingName',
      'orders.0.orderId',
      'orders.0.creationDate',
      'orders.0.clientProfileData.firstName',
      'orders.0.value (formatCurrency)',
      'orders.0.cancellationData.cancellationDate',
      'orders.0.cancellationData.reason',
      'orders.0.items[] (name, skuName, brandName, quantity, listPrice, sellingPrice, imageUrl, priceDefinition.total)',
      'orders.0.totals[] (Items, Discounts, Shipping, Tax, GiftCards)',
      'orders.0.shippingData.selectedAddresses[0] (receiverName, street, number, city, state, postalCode)',
      'orders.0.shippingData.logisticsInfo[0].selectedDeliveryChannel',
      'orders.0.paymentData.transactions[].payments[] (paymentSystemName, value, installments, lastDigits, group, connectorResponses.authId)',
      'orders.0.ratesAndBenefitsData.rateAndBenefitsIdentifiers[] (name, description)',
    ],
  },
  {
    id: 'pago-aprobado',
    nombre: 'Pago aprobado',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'activo',
    actualizado: '2026-06-06',
    responsable: 'Por definir',
    descripcion: 'Notifica al cliente que el pago de su pedido fue aprobado, con resumen de productos, totales, envío/retiro y forma de pago.',
    archivoHtml: 'templates/vtex/sporting/pago-aprobado/pago-aprobado.v2.html',
    ejemplo: 'examples/vtex/sporting/pedido-estandar.sample.json',
    variables: [
      'hostName',
      '_accountInfo.TradingName',
      'orderId',
      'creationDate',
      'clientProfileData.firstName',
      'items[] (skuName, quantity, listPrice, sellingPrice, imageUrl, detailUrl)',
      'totals[] / alternativeTotals[] (Items, Discounts, Shipping, Tax, GiftCards)',
      'shippingData.selectedAddresses[0] (street, number, complement, city, state, postalCode)',
      'shippingData.logisticsInfo[] (selectedDeliveryChannel, shippingEstimateDate, deliveryIds[0].courierName)',
      'paymentData.transactions[].payments[] (paymentSystemName, installments, lastDigits, connectorResponses.authId)',
      'ratesAndBenefitsData.rateAndBenefitsIdentifiers[] (name, description)',
    ],
  },
  {
    id: 'access-key',
    nombre: 'Código de acceso a cuenta',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'en revisión',
    actualizado: '2026-06-09',
    responsable: 'Por definir',
    descripcion: 'Envía un código de verificación al cliente cuando solicita ingresar o recuperar acceso a su cuenta.',
    archivoHtml: 'templates/vtex/sporting/access-key/access-key.v2.html',
    ejemplo: 'examples/vtex/sporting/access-key.sample.json',
    variables: [
      'to[0].name',
      'aditionalData.accessKey',
      '_accountInfo.TradingName',
      '_accountInfo.AccountName',
      '_accountInfo.HostName',
    ],
  },
  {
    id: 'back-in-stock',
    nombre: 'Volvió a stock',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'en revisión',
    actualizado: '2026-06-09',
    responsable: 'Por definir',
    descripcion: 'Notifica al cliente suscrito que un SKU sin stock volvió a estar disponible para comprar.',
    archivoHtml: 'templates/vtex/sporting/back-in-stock/back-in-stock.v2.html',
    ejemplo: 'examples/vtex/sporting/back-in-stock.sample.json',
    variables: [
      'NotifyRequest.name',
      'NotifyRequest.locale',
      'NotifyRequest.seller.addToCartLink',
      'SkuContext.NameComplete',
      'SkuContext.ProductName',
      'SkuContext.SkuName',
      'SkuContext.ImageUrl',
      'SkuContext.DetailUrl',
      '_accountInfo.TradingName',
    ],
  },
  {
    id: 'order-invoiced',
    nombre: 'Pedido facturado',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'en revisión',
    actualizado: '2026-06-09',
    responsable: 'Por definir',
    descripcion: 'Notifica al cliente que su pedido fue facturado, con acceso a las facturas y datos de seguimiento del despacho.',
    archivoHtml: 'templates/vtex/sporting/order-invoiced/order-invoiced.v2.html',
    ejemplo: 'examples/vtex/sporting/order-invoiced.sample.json',
    variables: [
      'orderId',
      'clientProfileData.firstName',
      'hostName / _accountInfo.HostName',
      '_accountInfo.TradingName',
      'packages[] (invoiceNumber, invoiceValue, invoiceUrl, issuanceDate, courier, trackingNumber, trackingUrl)',
      'package.* (fallback cuando no hay packages[])',
      'shippingData.address (street, number, city, state, country)',
      'paymentData.transactions[].payments[] (paymentSystemName, installments)',
    ],
  },
  {
    id: 'b2b-orden-generada',
    nombre: 'Orden generada B2B',
    plataforma: 'VTEX',
    categoria: 'Logística de Entrega',
    estado: 'en revisión',
    actualizado: '2026-06-08',
    responsable: 'Por definir',
    descripcion: 'Confirma a un comprador B2B que la orden fue generada y queda pendiente de validación comercial antes de avanzar al resto del flujo.',
    archivoHtml: 'templates/vtex/b2b/orden-generada/orden-generada.v2.html',
    ejemplo: 'examples/vtex/b2b/orden-generada.sample.json',
    variables: [
      '_accountInfo.TradingName',
      'ordersUrl',
      'orderId',
      'creationDate',
      'clientProfileData.firstName / lastName / email / document',
      'value (formatCurrency)',
      'items[] (name, skuName, quantity, sellingPrice, priceDefinition.total, imageUrl, detailUrl)',
      'subjectItemAttachment.totalItems',
      'totals[] (Items, Discounts, Shipping, Tax)',
      'shippingData.selectedAddresses[0] / shippingData.address',
      'shippingData.logisticsInfo[0] (selectedDeliveryChannel, shippingEstimateDate)',
      'paymentData.transactions[].payments[] (paymentSystemName, group, value, installments)',
    ],
  },
];

const EXAMPLE_SCENARIOS = [
  {
    id: 'pedido-estandar-domicilio',
    path: 'examples/vtex/sporting/pedido-estandar.sample.json',
    label: 'Pedido estándar - envío a domicilio',
    tipo: 'Pedido',
    descripcion: 'Pedido confirmado con varios productos, totales, dirección de entrega y pago registrado.',
    compatibleTemplates: ['pedido-confirmado', 'pago-aprobado'],
  },
  {
    id: 'pedido-realizado-exito',
    path: 'examples/vtex/sporting/pedido-realizado.sample.json',
    label: 'Pedido realizado - 1 producto',
    tipo: 'Pedido',
    descripcion: 'Pedido confirmado simple para validar la rama base de compra realizada.',
    compatibleTemplates: ['pedido-confirmado', 'pago-aprobado'],
  },
  {
    id: 'pago-aprobado-base',
    path: 'examples/vtex/sporting/pago-aprobado.sample.json',
    label: 'Pago aprobado - pedido base',
    tipo: 'Pedido',
    descripcion: 'Pedido con pago aprobado, datos de medio de pago y logística de entrega.',
    compatibleTemplates: ['pago-aprobado', 'pedido-confirmado'],
  },
  {
    id: 'pedido-cancelado-un-producto',
    path: 'examples/vtex/sporting/pedido-cancelado.sample.json',
    label: 'Cancelación - 1 producto',
    tipo: 'Cancelación',
    descripcion: 'Pedido cancelado con reintegro y un producto en el resumen.',
    compatibleTemplates: ['pedido-cancelado'],
  },
  {
    id: 'pedido-cancelado-envio-gratis',
    path: 'examples/vtex/sporting/pedido-cancelado-2.sample.json',
    label: 'Cancelación - 2 productos, envío gratis',
    tipo: 'Cancelación',
    descripcion: 'Pedido cancelado con más de un producto y condición de envío bonificado.',
    compatibleTemplates: ['pedido-cancelado'],
  },
  {
    id: 'access-key-login',
    path: 'examples/vtex/sporting/access-key.sample.json',
    label: 'Acceso a cuenta - código de ingreso',
    tipo: 'Cuenta',
    descripcion: 'Evento de login o recuperación con código de verificación.',
    compatibleTemplates: ['access-key'],
  },
  {
    id: 'back-in-stock-disponible',
    path: 'examples/vtex/sporting/back-in-stock.sample.json',
    label: 'Stock - SKU disponible',
    tipo: 'Stock',
    descripcion: 'Aviso a cliente suscrito cuando un SKU vuelve a estar disponible.',
    compatibleTemplates: ['back-in-stock'],
  },
  {
    id: 'order-invoiced-seguimiento',
    path: 'examples/vtex/sporting/order-invoiced.sample.json',
    label: 'Facturación - con seguimiento',
    tipo: 'Facturación',
    descripcion: 'Pedido facturado con paquete, factura y datos de tracking.',
    compatibleTemplates: ['order-invoiced'],
  },
  {
    id: 'b2b-orden-generada-base',
    path: 'examples/vtex/b2b/orden-generada.sample.json',
    label: 'B2B - orden generada',
    tipo: 'B2B',
    descripcion: 'Orden B2B recibida con pago a validar, varios productos y entrega a domicilio.',
    compatibleTemplates: ['b2b-orden-generada'],
  },
];

const VERSION = {
  number: '1.3.0',
  date: '2026-06-08',
  summary: 'Se suma la nueva plantilla VTEX B2B de orden generada con escenario de datos propio.',
};

const CHANGELOG = [
  { version: '1.3.0', date: '2026-06-08', summary: 'Nueva plantilla orden generada B2B y escenario específico para previsualización.' },
  { version: '0.7.0', date: '2026-06-07', summary: 'Flujo de Correos suma estados por nodo, ficha operativa, acciones para previsualización/creación y soporte de query params en Visualizador.' },
  { version: '0.6.0', date: '2026-06-06', summary: 'Módulo Flujo de Correos con mapa por pestañas para entrega, cambio, devolución y garantía, organizado por plataforma.' },
  { version: '0.5.0', date: '2026-06-06', summary: 'Se priorizan Biblioteca y Visualizador como flujo principal; Simulador queda rotulado como QA interno y se documenta el flujo para crear nuevas plantillas con JSON representativo.' },
  { version: '0.4.0', date: '2026-06-06', summary: 'Datos de ejemplo sanitizados, Handlebars local, escenarios centralizados, simulador coherente en multipaquete y docs de validación/roadmap.' },
  { version: '0.3.0', date: '2026-06-06', summary: 'Simulador de Datos (Módulo 4) con escenarios combinables; fix: normalización de pedidos "desnudos" en el render compartido.' },
  { version: '0.2.0', date: '2026-06-06', summary: 'Visualizador de Plantillas (Módulo 3) con selector de plantilla y escenario, render con Handlebars.' },
  { version: '0.1.0', date: '2026-06-06', summary: 'Estructura inicial y catálogo con pedido-confirmado y pago-aprobado.' },
];
