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
    archivoHtml: 'templates/vtex/pedido-confirmado.html',
    ejemplo: 'examples/vtex/pedido-estandar.json',
    variables: [
      '_accountInfo.TradingName',
      'orders.0.orderId',
      'orders.0.creationDate',
      'orders.0.clientProfileData.firstName',
      'orders.0.value (formatCurrency)',
      'orders.0.items[] (skuName, quantity, listPrice, sellingPrice, imageUrl)',
      'orders.0.totals[] (Items, Discounts, Shipping, Tax, GiftCards)',
      'orders.0.shippingData.selectedAddresses[0] (street, number, city, state, postalCode)',
      'orders.0.paymentData.transactions[].payments[] (paymentSystemName, installments, lastDigits, connectorResponses.authId)',
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
    archivoHtml: 'templates/vtex/pago-aprobado.html',
    ejemplo: 'examples/vtex/pedido-estandar.json',
    variables: [
      '_accountInfo.TradingName',
      'orderId',
      'creationDate',
      'clientProfileData.firstName',
      'items[] (skuName, quantity, listPrice, sellingPrice, imageUrl)',
      'totals[] / alternativeTotals[] (Items, Discounts, Shipping, Tax, GiftCards)',
      'shippingData.selectedAddresses[0] (street, number, city, state, postalCode)',
      'shippingData.logisticsInfo[] (selectedDeliveryChannel, shippingEstimateDate, warehouseId)',
      'paymentData.transactions[].payments[] (paymentSystemName, installments, lastDigits, connectorResponses.authId)',
      'ratesAndBenefitsData.rateAndBenefitsIdentifiers[] (name, description)',
    ],
  },
];

const EXAMPLE_SCENARIOS = [
  { path: 'examples/vtex/pedido-estandar.json', label: 'Pedido estandar (envio a domicilio)' },
  { path: 'examples/vtex/pedido-realizado.json', label: 'Pedido realizado con exito' },
  { path: 'examples/vtex/pago-aprobado.json', label: 'Pago aprobado' },
  { path: 'examples/vtex/pedido-cancelado.json', label: 'Pedido cancelado' },
];

const VERSION = {
  number: '0.6.0',
  date: '2026-06-06',
  summary: 'Mapa operativo de flujo de correos por logística y plataforma.',
};

const CHANGELOG = [
  { version: '0.6.0', date: '2026-06-06', summary: 'Modulo Flujo de Correos con mapa por pestanas para entrega, cambio, devolucion y garantia, organizado por plataforma.' },
  { version: '0.5.0', date: '2026-06-06', summary: 'Se priorizan Biblioteca y Visualizador como flujo principal; Simulador queda rotulado como QA interno y se documenta el flujo para crear nuevas plantillas con JSON representativo.' },
  { version: '0.4.0', date: '2026-06-06', summary: 'Datos de ejemplo sanitizados, Handlebars local, escenarios centralizados, simulador coherente en multipaquete y docs de validacion/roadmap.' },
  { version: '0.3.0', date: '2026-06-06', summary: 'Simulador de Datos (Módulo 4) con escenarios combinables; fix: normalización de pedidos "desnudos" en el render compartido.' },
  { version: '0.2.0', date: '2026-06-06', summary: 'Visualizador de Plantillas (Módulo 3) con selector de plantilla y escenario, render con Handlebars.' },
  { version: '0.1.0', date: '2026-06-06', summary: 'Estructura inicial y catálogo con pedido-confirmado y pago-aprobado.' },
];
