# Project Workflow — Correos Transaccionales

| Campo | Detalle |
|-------|---------|
| Versión | v1.0 |
| Actualizado | 2026-06-25 |
| Estado | Activo |
| Documentos relacionados | `../project-standards/ai_rules.md` · `../project-standards/style_guide.md` · `CLAUDE.md` |

> **Nota:** `PROJECT_WORKFLOW.md` en la raíz es el documento institucional histórico de metodología general. Este archivo (`docs/project_workflow.md`) cubre el workflow específico de este proyecto.

---

## 1. Propósito

Workflow operativo del proyecto Correos Transaccionales: biblioteca de plantillas HTML de correos transaccionales (VTEX + PIM) con visualizador, catálogo y mapa de flujo. Las reglas genéricas de proceso viven en `../project-standards/project_workflow_template.md`.

---

## 2. Documentos maestros

| Necesito saber... | Ir a... |
|---|---|
| Reglas de colaboración con IA | `../project-standards/ai_rules.md` |
| Git, convenciones de código | `../project-standards/style_guide.md` |
| Instrucciones específicas para Claude Code | `CLAUDE.md` |
| Modelo de plataforma/canal/tienda/evento | `docs/decisions/2026-06-11-modelo-plataforma-canal-tienda-evento.md` |
| Crear una nueva plantilla paso a paso | `docs/crear-nueva-plantilla.md` |

---

## 3. Tipos de cambios y riesgo

| Tipo | Riesgo | Requiere |
|------|--------|----------|
| Documentación, release notes | Bajo | Commit claro |
| CSS compartido (`assets/css/shared.css`) | Bajo–Medio | Smoke visual de todos los módulos |
| JS de módulo (`modules/`) | Medio | Smoke del módulo afectado + consola |
| `config.js` — esquema de `TEMPLATES` / `TEMPLATE_TAXONOMY` | Alto | Auditoría de todos los módulos que leen el catálogo |
| `templates/` — plantillas HTML de producción | Crítico | Ver §7 |

---

## 4. Flujo de trabajo estándar

```
1. Descubrimiento  → entender cambio, plantilla afectada, plataforma y canales
2. Auditoría       → sin modificar archivos (cuando el alcance no está claro)
3. Implementación  → cambios pequeños, archivos explícitos
4. Validación      → abrir módulo en browser, consola limpia, renderizado correcto
5. Documentación   → bump de versión en config.js si es cambio visible
6. Release         → push a main, verificar GitHub Pages
```

---

## 5. Flujo de release

1. Verificar que el módulo afectado carga sin errores en browser
2. Si se tocó `config.js`: verificar que catálogo, visualizador y flujo siguen cargando
3. Si se tocó una plantilla: verificar renderizado con al menos un fixture real
4. Bump en `config.js`: `VERSION.number` y entrada en `CHANGELOG`
5. Commit con prefijo convencional
6. Push a `main`
7. Verificar GitHub Pages (2–3 min de propagación)

---

## 6. Checklist pre-push

```
[ ] Módulo afectado carga sin errores de consola
[ ] Navegación entre módulos (catálogo → visualizador → flujo) funciona
[ ] Si se tocó config.js: catálogo y filtros funcionan
[ ] Si se tocó una plantilla: renderiza con fixture real y descarga funciona
[ ] Versión bumpeada en config.js (si aplica)
[ ] Entrada en CHANGELOG (si aplica)
```

---

## 7. Freeze zones

### 7.1 Zonas congeladas

| Zona | Razón |
|------|-------|
| `templates/` | Plantillas HTML reales que se envían en producción — no modificar salvo tarea explícita de "actualizar plantilla X" |
| `config.js` — estructura de `TEMPLATES`, `TEMPLATE_TAXONOMY` | Cambio de esquema afecta los tres módulos simultáneamente; revisar auditoría antes |
| `examples/` | Datos reales (anonimizados/de prueba) para previsualización — no reemplazar por datos inventados |
| `assets/js/vendor/handlebars-4.7.8.min.js` | Versión bloqueada; las plantillas dependen de helpers específicos de esta versión |

### 7.2 Protocolo para freeze zones

1. Auditoría del módulo (sin modificar)
2. Para `config.js`: mapear qué campos lee cada módulo antes de cambiar la estructura
3. Para `templates/`: obtener aprobación explícita de que la tarea es "modificar plantilla X"
4. Implementar con archivos explícitos
5. Validar renderizado con fixture antes de commitear
6. Documentar decisiones en `docs/decisions/`

### 7.3 Declaración de freeze en prompts

```
Modificar solo:
- modules/catalogo/index.html
- assets/css/shared.css (sección de tablas)

No modificar:
- templates/
- config.js (estructura de TEMPLATES y TEMPLATE_TAXONOMY)
- examples/
- assets/js/vendor/
```

---

## 8. Smoke visual y QA

```
[ ] modules/catalogo/: plantillas listan correctamente con filtros
[ ] modules/visualizador/: renderiza una plantilla con un fixture
[ ] modules/visualizador/: modo comparación A/B funciona
[ ] modules/flujo/: mapa de flujo carga y es navegable
[ ] Navegación entre módulos: ida y vuelta sin errores
[ ] Descarga de HTML de plantilla funciona
[ ] Consola sin errores críticos en todos los módulos
```

---

## 9. Convenciones del proyecto

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Nombres de archivo | kebab-case, sin espacios ni mayúsculas | `pedido-confirmado.html`, no `Mail - Pedido Confirmado.html` |
| Plantillas | `templates/<plataforma>/<nombre>.html` | `templates/vtex/sporting/pedido-confirmado.html` |
| Ejemplos / fixtures | `examples/<plataforma>/<escenario>.json` | `examples/vtex/sporting/pedido-cancelado.sample.json` |
| Catálogo | en `config.js` — `TEMPLATES[]`, `TEMPLATE_TAXONOMY{}` | |
| Módulos | `modules/<nombre>/index.html` con su propio JS/CSS | |
| CSS compartido | en `assets/css/shared.css` | no duplicar entre módulos |
| Handlebars helpers | versión 4.7.8 (vendor local) | |
| Versionado | bump en `VERSION` + entrada en `CHANGELOG` de `config.js` | |

---

## 10. Aprendizajes — Correos Transaccionales

> Documentar aprendizajes aquí a medida que aparezcan.

### 10.1 Modelo plataforma/canal/tienda/evento

El catálogo de plantillas usa cuatro dimensiones para clasificar cada correo: `plataforma` (vtex | pim), `canales` (b2c | b2b | punto-de-venta | ext), `tiendas` (sporting | woker | venta-deportiva | seller-adidas) y `logistica` cuando aplica. Ver ADR `docs/decisions/2026-06-11-modelo-plataforma-canal-tienda-evento.md`.

### 10.2 Handlebars 4.7.8 bloqueado

El motor de plantillas es Handlebars local (no CDN). Las plantillas pueden usar helpers específicos de esta versión. Antes de actualizar, validar que ningún helper en uso fue deprecado o cambió de firma en versiones posteriores.

### 10.3 El visualizador usa archivos locales de templates/ y examples/

El visualizador carga las plantillas HTML y los fixtures JSON directamente desde el filesystem del repo (rutas relativas). Renombrar o mover archivos en `templates/` o `examples/` sin actualizar las entradas en `config.js` rompe el visualizador silenciosamente.
