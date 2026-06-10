# Reglas de alineación entre marcas (Sporting / Woker / futuras)

Fecha: 2026-06-10

## Contexto

Al crear las plantillas v2 de Woker a partir de Sporting, una auditoría cruzada detectó dos desvíos de diseño y tres errores de metadata. Este documento formaliza las reglas que deben respetarse cada vez que se adapta una plantilla a una nueva marca, para evitar que vuelvan a aparecer.

---

## Reglas de diseño

### 1. Botón CTA en correos de cancelación: neutro oscuro

El botón principal de `pedido-cancelado` **debe ser `#111827`** (gris muy oscuro/negro), nunca el color de marca.

**Por qué**: un CTA con el color corporativo (verde, naranja, etc.) crea una señal visual positiva que contradice el tono del mensaje. La cancelación es una noticia negativa; el botón debe existir para facilitar la gestión del pedido, no para celebrar una acción.

El hero y los acentos internos sí pueden usar rojo semántico (`#7f1d1d` / `#dc2626`). Los colores de marca en este correo quedan solo en el footer y en detalles del resumen de artículos.

---

### 2. Footer de tres logos: media query obligatorio

Todas las plantillas tienen un footer compartido con tres logos corporativos (Sporting · Woker · Antonio Luquin). Ese bloque usa las clases `.brand-logo-sporting`, `.brand-logo-woker` y `.brand-logo-luquin`.

El `@media (max-width: 600px)` de cada plantilla **debe incluir las cuatro reglas siguientes**, siempre juntas:

```css
.header-logo        { width: 128px !important; }
.brand-logo-sporting { width: 88px !important; }
.brand-logo-woker    { width: 64px !important; }
.brand-logo-luquin   { width: 78px !important; }
```

Si se agrega `.header-logo` con un ancho diferente para ajustar el logo de cabecera de una marca concreta, **no reemplazar** las otras tres reglas — agregar la nueva debajo de la primera o ajustar el valor de `.header-logo` en esa línea.

**Por qué**: al rebrandear Woker se reemplazó el bloque de cuatro reglas por un `.header-logo` duplicado, dejando los logos del footer sin escala mobile.

---

## Reglas de metadata (`config.js`)

### 3. Categoría de `access-key`

La plantilla de código de acceso pertenece a la categoría **`'Cuenta'`**, no a `'Logística de Entrega'`. Aplica a todas las marcas.

### 4. Variables de `access-key`

La variable `aditionalData.userAgent` (con typo intencional de VTEX: `aditional`, no `additional`) **debe estar en la lista** de variables de todas las versiones de `access-key`. El HTML la usa para mostrar el dispositivo desde donde se solicitó el código.

### 5. Variables de `pedido-cancelado`

VTEX entrega las variables de cancelación como objeto plano (sin prefijo `orders.0`). Documentar como `orderId`, `clientProfileData.firstName`, etc. — no como `orders.0.orderId`.

---

## Checklist de auditoría inter-marca

Antes de marcar una variante de marca como lista, verificar:

- [ ] `pedido-cancelado`: botón CTA en `#111827`, no en color de marca.
- [ ] Todas las plantillas: media query incluye las 4 reglas de logos (`.header-logo` + 3 `.brand-logo-*`), sin duplicados.
- [ ] `config.js`: categoría de `access-key` = `'Cuenta'`.
- [ ] `config.js`: variables de `access-key` incluyen `aditionalData.userAgent`.
- [ ] `config.js`: variables de `pedido-cancelado` sin prefijo `orders.0.*`.
- [ ] Búsqueda de colores de la marca base residuales en los archivos v2 (ej. verde `#1a7a0a` en Woker, naranja en futura marca verde).
- [ ] El selector de clase renombrado en el CSS coincide con el que usa el HTML (ej. `.badge-green` → `.badge-orange`).
