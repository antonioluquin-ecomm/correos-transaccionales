/**
 * Utilidades compartidas — Correos Transaccionales
 * Cargar después de config.js. No depende de ningún framework.
 */

const CT = (() => {
  // Rutas relativas a la raíz del sitio (sin "/" inicial), para que funcionen
  // tanto en local como en GitHub Pages servido desde un subpath.
  const NAV_LINKS = [
    { href: 'index.html', label: 'Inicio', match: 'inicio' },
    { href: 'modules/catalogo/index.html', label: 'Biblioteca de Plantillas', match: 'catalogo' },
    { href: 'modules/flujo/index.html', label: 'Flujo de Correos', match: 'flujo' },
    { href: 'modules/visualizador/index.html', label: 'Visualizador', match: 'visualizador' },
    { href: 'modules/simulador/index.html', label: 'Simulador de Datos', match: 'simulador' },
  ];

  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const DIACRITICS_REGEX = new RegExp('[\\u0300-\\u036f]', 'g');

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(DIACRITICS_REGEX, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function platformBadgeClass(plataforma) {
    const slug = slugify(plataforma);
    if (slug === 'vtex') return 'ct-platform-vtex';
    if (slug === 'pim') return 'ct-platform-pim';
    return 'ct-platform-otra';
  }

  function statusBadgeClass(estado) {
    const slug = slugify(estado);
    if (slug === 'activo') return 'ct-status-activo';
    if (slug === 'en-revision') return 'ct-status-en-revision';
    if (slug === 'deprecado') return 'ct-status-deprecado';
    return 'ct-status-deprecado';
  }

  function badge(text, extraClass) {
    return `<span class="ct-badge ${extraClass}">${escapeHtml(text)}</span>`;
  }

  function platformBadge(plataforma) {
    return badge(plataforma, platformBadgeClass(plataforma));
  }

  function statusBadge(estado) {
    return badge(estado, statusBadgeClass(estado));
  }

  /**
   * Dibuja la topbar compartida.
   * @param {string} activeMatch - id de la sección activa (ver NAV_LINKS[].match)
   * @param {string} basePath - prefijo relativo hacia la raíz del sitio desde la página actual
   *   (ej. '' en index.html, '../../' en modules/<modulo>/index.html)
   */
  function renderTopbar(activeMatch, basePath) {
    const mount = document.querySelector('[data-ct-topbar]');
    if (!mount) return;

    const prefix = basePath || '';
    const links = NAV_LINKS.map((link) => {
      const cls = link.match === activeMatch ? 'active' : '';
      return `<a href="${escapeHtml(prefix + link.href)}" class="${cls}">${escapeHtml(link.label)}</a>`;
    }).join('');

    mount.innerHTML = `
      <div class="ct-brand">
        <span aria-hidden="true">&#9993;</span>
        Correos Transaccionales
      </div>
      <nav>${links}</nav>
    `;
  }

  function downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function fetchText(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${path} (HTTP ${response.status})`);
    }
    return response.text();
  }

  return {
    escapeHtml,
    slugify,
    platformBadge,
    statusBadge,
    renderTopbar,
    downloadFile,
    fetchText,
  };
})();
