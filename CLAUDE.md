# Mails Transaccionales — Instrucciones para Claude Code y Codex

> Las reglas generales y los docs maestros están en `../CLAUDE.md` (nivel Proyectos).
> Este archivo contiene solo lo específico de este proyecto.

---

## Reglas activas — específicas de este proyecto

- **`templates/` es zona de freeze** — son las plantillas HTML reales que se envían en producción. No modificar su contenido salvo que la tarea sea explícitamente "actualizar/rediseñar plantilla X".
- **`config.js` es la fuente de datos del catálogo** (`TEMPLATES`, `EXAMPLE_SCENARIOS`, `TEMPLATE_TAXONOMY`). Cambios de esquema (agregar/quitar campos) afectan a todos los módulos — consultar antes de modificar la estructura.
- **`examples/` son datos reales** (anonimizados/de prueba) usados para previsualización. No reemplazar por datos inventados sin avisar.
- **Versionado obligatorio en `config.js`**: bump en `VERSION.number` y entrada nueva en `CHANGELOG` en cada cambio funcional.
- **Handlebars `4.7.8`** (vendor local en `assets/js/vendor/`). No actualizar ni reemplazar sin consultar — las plantillas dependen de helpers específicos de esta versión.
- **Sin backend, sin credenciales** — sitio estático puro. Toda la lógica corre en el browser.
- **No hacer push** sin confirmación explícita del usuario.

---

## Stack específico

- **Sin framework, sin build step** — cada módulo es un `index.html` bajo `modules/<nombre>/`
- **Motor de plantillas**: Handlebars (vendor local), usado en el Visualizador para renderizar los HTML de `templates/` con los JSON de `examples/`
- **CSS compartido**: `assets/css/shared.css` — no duplicar estilos entre módulos
- **JS compartido**: `assets/js/shared.js` — helpers comunes
- **Sin auth, sin multi-store**

---

## Estructura del repositorio

```
/
├─ config.js              Catálogo central: TEMPLATES, EXAMPLE_SCENARIOS, TEMPLATE_TAXONOMY, VERSION, CHANGELOG
├─ modules/               Módulos de la app (cada uno con su index.html)
│  ├─ catalogo/           Biblioteca de plantillas con filtros y KPIs
│  ├─ visualizador/       Render de plantillas con escenarios JSON (modo simple y comparación A/B)
│  └─ flujo/              Mapa del flujo de correos por canal/plataforma
├─ templates/             HTMLs reales de producción — FREEZE ZONE
│  ├─ vtex/               → sporting/ · woker/ · b2b/
│  └─ pim/shared/         Plantillas PIM compartidas entre marcas
├─ examples/              JSON de datos de ejemplo para previsualización
│  ├─ vtex/               → sporting/ · woker/ · b2b/
│  └─ pim/shared/         Escenarios PIM por operador logístico y marca
├─ assets/
│  ├─ css/shared.css      Estilos compartidos entre módulos
│  ├─ js/shared.js        Helpers JS comunes
│  └─ js/vendor/          Handlebars 4.7.8 (local, no CDN)
└─ docs/                  Documentación viva
```

---

## Modelo de datos de `config.js`

Dos plataformas principales:
- **VTEX**: datos en formato VTEX Order Hook (`orders[]`, `items[]`, `_accountInfo`, etc.)
- **PIM**: datos en formato propio (`Tienda`, `Pedido`, `Pedido.LineasPedido[]`, `Deposito`, etc.)

Cada plantilla tiene `canales` (`b2c` | `b2b` | `punto-de-venta` | `ext`), `tiendas` (`sporting` | `woker` | `venta-deportiva` | `seller-adidas`) y `logistica` cuando aplica.

---

## Validación mínima por cambio

No hay build ni tests automatizados. Verificar:
1. Abrir el módulo afectado en el navegador
2. Consola sin errores
3. Navegación entre módulos funciona
4. Si se tocó el catálogo o una plantilla: confirmar que el HTML renderiza y la descarga funciona

---

## Versionado

`config.js` tiene `VERSION` y `CHANGELOG` integrados. Actualizar ambos en cada cambio funcional visible para el usuario.

| Tipo | Bump |
|------|------|
| Nuevo módulo o feature visible | Minor (`1.21.0` → `1.22.0`) |
| Fix, mejora UX, estilo | Patch (`1.21.0` → `1.21.1`) |
| Solo docs, comentarios | Sin bump |
