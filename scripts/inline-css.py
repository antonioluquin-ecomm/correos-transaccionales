"""
Agrega estilos inline a elementos con class-only en los templates de correo.
Garantiza que las definiciones de <head> CSS sobrevivan en clientes que las
stripean (Gmail, Yahoo).

Lógica por elemento:
  - Sin style="": agrega style="<full_style>"
  - Con style="existente": antepone propiedades base (sin margin) para no
    pisar overrides intencionales; margin queda controlado por el existente.

Uso: python scripts/inline-css.py templates/vtex/*.html
"""

import re
import sys

# ── Definiciones de clases → inline styles ─────────────────────────────────
# Deben coincidir exactamente con lo que está en el <head> CSS de los templates.
# (sin !important — en inline styles no hace falta)
CLASSES = {
    'h1':             'font-size:26px;line-height:32px;font-weight:bold;color:#111827;margin:0 0 8px 0',
    'h2':             'font-size:15px;line-height:22px;font-weight:bold;color:#111827;margin:0 0 12px 0',
    'text':           'font-size:14px;line-height:22px;color:#374151;margin:0',
    'text-sm':        'font-size:13px;line-height:20px;color:#6b7280;margin:0',
    'label':          'font-size:11px;line-height:16px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:#6b7280;margin:0 0 4px 0',
    'value':          'font-size:15px;line-height:22px;font-weight:bold;color:#111827;margin:0',
    'item-name':      'font-size:14px;line-height:20px;font-weight:bold;color:#111827;margin:0 0 3px 0',
    'item-meta':      'font-size:12px;line-height:18px;color:#6b7280;margin:0',
    'item-price':     'font-size:14px;line-height:20px;font-weight:bold;color:#111827;margin:4px 0 0 0',
    'item-old-price': 'font-size:12px;line-height:18px;color:#9ca3af;text-decoration:line-through;margin:2px 0 0 0',
    'tot-key':        'font-size:14px;line-height:20px;color:#374151',
    'tot-val':        'font-size:14px;line-height:20px;color:#374151',
    'tot-strong':     'font-size:16px;line-height:22px;font-weight:bold;color:#111827',
    'badge':          'display:inline-block;background:#ecfdf3;border:1px solid #bbf7d0;border-radius:999px;padding:5px 12px;font-size:12px;line-height:16px;font-weight:bold;color:#166534',
    'badge-cancel':   'display:inline-block;background:#fee2e2;border:1px solid #fecaca;border-radius:999px;padding:5px 12px;font-size:12px;line-height:16px;font-weight:bold;color:#991b1b',
    'status-strong':  'font-size:14px;line-height:20px;font-weight:bold;color:#111827;margin:0 0 3px 0',
    'step-lbl':       'font-size:11px;font-weight:bold;text-align:center;margin:0',
    'footer-link':    'color:#16a34a;font-weight:bold',
    'cta-primary':    'display:inline-block;background:#16a34a;color:#ffffff;border-radius:10px;font-size:15px;line-height:48px;font-weight:bold;padding:0 32px;text-align:center',
    'cta-dark':       'display:inline-block;background:#111827;color:#ffffff;border-radius:10px;font-size:15px;line-height:48px;font-weight:bold;padding:0 28px;text-align:center',
    'cta-green':      'display:inline-block;background:#16a34a;color:#ffffff;border-radius:10px;font-size:15px;line-height:48px;font-weight:bold;padding:0 28px;text-align:center',
}


def without_margin(style_str):
    """Devuelve las propiedades del estilo sin las de 'margin*'."""
    return ';'.join(p for p in style_str.split(';') if not p.strip().startswith('margin'))


def apply_class(html, cls, full_style):
    base = without_margin(full_style)

    def repl(m):
        tag = m.group(0)
        style_match = re.search(r'\bstyle="([^"]*)"', tag)

        if style_match:
            # Ya tiene style="" → anteponer estilos base (sin margin)
            if not base:
                return tag
            old_val = style_match.group(1)
            new_val = base + ';' + old_val
            return tag.replace(f'style="{old_val}"', f'style="{new_val}"', 1)
        else:
            # Sin style="" → insertar estilo completo junto al class
            return tag.replace(
                f'class="{cls}"',
                f'class="{cls}" style="{full_style}"',
                1,
            )

    # Matchea la etiqueta de apertura completa que contenga la clase exacta.
    # [^>]* no cruza el cierre de otra etiqueta ni el final del tag.
    pattern = rf'<[a-zA-Z][^>]*class="{re.escape(cls)}"[^>]*>'
    return re.sub(pattern, repl, html)


def process_file(path):
    with open(path, encoding='utf-8') as f:
        html = f.read()

    original = html
    for cls, style in CLASSES.items():
        html = apply_class(html, cls, style)

    if html == original:
        print(f'  sin cambios: {path}')
        return

    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(html)

    # Contar cuántas etiquetas se modificaron (aproximado)
    changed = sum(
        1 for a, b in zip(original.splitlines(), html.splitlines()) if a != b
    )
    print(f'  OK {path}  (~{changed} lineas modificadas)')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Uso: python scripts/inline-css.py <archivo.html> [...]')
        sys.exit(1)
    for p in sys.argv[1:]:
        process_file(p)
