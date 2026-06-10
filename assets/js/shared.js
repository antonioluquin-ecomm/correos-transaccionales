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
    { href: 'modules/visualizador/index.html', label: 'Visualizador de Plantillas', match: 'visualizador' },
    { href: 'modules/simulador/index.html', label: 'Simulador QA', match: 'simulador' },
  ];

  const STORE_OPTIONS = [
    { id: 'sporting', label: 'Sporting' },
    { id: 'woker', label: 'Woker' },
    { id: 'b2b', label: 'B2B' },
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

  function storeFromPath(path) {
    const normalized = String(path || '').replace(/\\/g, '/').toLowerCase();
    const parts = normalized.split('/').filter(Boolean);
    if (!['templates', 'examples'].includes(parts[0]) || parts.length < 4) return 'shared';
    const store = slugify(parts[2]);
    return store || 'shared';
  }

  function storeLabel(store) {
    const slug = slugify(store || 'shared');
    const known = STORE_OPTIONS.find((option) => option.id === slug);
    if (known) return known.label;
    if (slug === 'shared') return 'Compartido';
    return String(store || slug).replace(/(^|-)([a-z])/g, (_, sep, chr) => `${sep ? ' ' : ''}${chr.toUpperCase()}`);
  }

  function templateStore(template) {
    return slugify(template?.tienda || template?.store || storeFromPath(template?.archivoHtml) || storeFromPath(template?.ejemplo));
  }

  function scenarioStore(scenario) {
    return slugify(scenario?.tienda || scenario?.store || storeFromPath(scenario?.path));
  }

  function storeOptionsFor(items, resolver) {
    const actual = new Set((items || []).map((item) => resolver(item)).filter(Boolean));
    const known = STORE_OPTIONS.map((option) => option.id);
    const unknown = Array.from(actual).filter((id) => !known.includes(id)).sort();
    return STORE_OPTIONS.concat(unknown.map((id) => ({ id, label: storeLabel(id) })));
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

  function storeBadge(store) {
    const slug = slugify(store || 'shared');
    return badge(storeLabel(slug), `ct-store-${slug}`);
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
    const signal = AbortSignal.timeout(8000);
    let response;
    try {
      response = await fetch(path, { signal });
    } catch (err) {
      if (err.name === 'TimeoutError') throw new Error(`Tiempo de espera agotado al cargar ${path}`);
      throw err;
    }
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${path} (HTTP ${response.status})`);
    }
    return response.text();
  }

  // --- Render de plantillas de correo con Handlebars (Visualizador y Simulador) ---
  // Requiere que la página haya cargado Handlebars local antes de llamar a estas funciones.

  let handlebarsHelpersReady = false;

  function ensureEmailHelpers() {
    if (handlebarsHelpersReady) return;
    if (typeof Handlebars === 'undefined') {
      throw new Error('Handlebars no esta cargado.');
    }

    Handlebars.registerHelper('formatCurrency', function (value) {
      const num = Number(value || 0) / 100;
      return num.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    });

    Handlebars.registerHelper('formatDate', function (value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
    });

    Handlebars.registerHelper('eq', function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
    });

    handlebarsHelpersReady = true;
  }

  /**
   * Algunas plantillas esperan el pedido completo en la raíz del contexto
   * ({{orderId}}, {{hostName}}) y otras esperan la estructura VTEX completa
   * ({{orders.0.orderId}}). Algunos JSON de ejemplo además guardan el pedido
   * "desnudo" (sin el wrapper orders[] que usa VTEX). Normalizamos siempre a
   * la forma envuelta y fusionamos el pedido aplanado sobre la raíz, para que
   * cualquier combinación de plantilla y dato resuelva contra el mismo JSON.
   */
  function buildEmailRenderContext(data) {
    const orders = Array.isArray(data.orders) ? data.orders : [data];
    const order = orders[0] || {};
    return Object.assign({}, data, order, { orders, _accountInfo: data._accountInfo || order._accountInfo });
  }

  function resizeEmailFrame(frame) {
    try {
      const doc = frame.contentDocument;
      const body = doc?.body;
      const root = doc?.documentElement;
      if (body) body.style.overflowX = 'hidden';
      if (root) root.style.overflowX = 'hidden';

      const h = Math.max(body?.scrollHeight || 0, root?.scrollHeight || 0);
      if (h && h > 0) frame.style.height = Math.max(h, 400) + 'px';
    } catch (e) {}
  }

  function renderEmailToFrame(frame, html, data) {
    ensureEmailHelpers();
    const compiled = Handlebars.compile(html);
    frame.srcdoc = compiled(buildEmailRenderContext(data));
    frame.addEventListener('load', function onLoad() {
      frame.removeEventListener('load', onLoad);
      resizeEmailFrame(frame);
    });
  }

  function splitPimArgs(source) {
    const args = [];
    const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
    let match;
    while ((match = regex.exec(source))) {
      args.push(match[1] ?? match[2] ?? match[3]);
    }
    return args;
  }

  function normalizePimExpression(expression) {
    let value = String(expression || '').trim();
    while (value.startsWith('(') && value.endsWith(')')) {
      value = value.slice(1, -1).trim();
    }
    return value;
  }

  function getPimValue(context, expression) {
    const expr = normalizePimExpression(expression);
    if (!expr) return '';
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    if (!expr.startsWith('.')) return expr;

    return expr
      .slice(1)
      .split('.')
      .filter(Boolean)
      .reduce((current, key) => {
        if (current === null || current === undefined) return '';
        return current[key];
      }, context);
  }

  function evalPimCondition(context, expression) {
    const expr = normalizePimExpression(expression);
    if (expr.startsWith('eq ')) {
      const args = splitPimArgs(expr.slice(3));
      return getPimValue(context, args[0]) === getPimValue(context, args[1]);
    }
    if (expr.startsWith('ne ')) {
      const args = splitPimArgs(expr.slice(3));
      return getPimValue(context, args[0]) !== getPimValue(context, args[1]);
    }
    return Boolean(getPimValue(context, expr));
  }

  function findPimBlockEnd(source, startIndex) {
    const tagRegex = /\{\{\s*(?:(if\b[^}]*)|(end))\s*\}\}/g;
    tagRegex.lastIndex = startIndex;
    let depth = 1;
    let match;

    while ((match = tagRegex.exec(source))) {
      if (match[1]) depth += 1;
      if (match[2]) depth -= 1;
      if (depth === 0) {
        return { start: match.index, end: tagRegex.lastIndex };
      }
    }
    throw new Error('Bloque PIM sin cierre {{ end }}.');
  }

  function splitPimBranches(firstCondition, inner) {
    const branches = [];
    const tagRegex = /\{\{\s*(?:(if\b[^}]*)|(else if\b[^}]*)|(else)|(end))\s*\}\}/g;
    let depth = 0;
    let cursor = 0;
    let condition = firstCondition;
    let match;

    while ((match = tagRegex.exec(inner))) {
      if (match[1]) {
        depth += 1;
        continue;
      }
      if (match[4]) {
        depth -= 1;
        continue;
      }
      if (depth !== 0 || (!match[2] && !match[3])) continue;

      branches.push({ condition, html: inner.slice(cursor, match.index) });
      condition = match[2] ? match[2].replace(/^else if\s+/, '').trim() : null;
      cursor = tagRegex.lastIndex;
    }

    branches.push({ condition, html: inner.slice(cursor) });
    return branches;
  }

  function renderPimControlBlocks(source, context) {
    const openRegex = /\{\{\s*if\s+([^}]+?)\s*\}\}/;
    const match = openRegex.exec(source);
    if (!match) return source;

    const before = source.slice(0, match.index);
    const block = findPimBlockEnd(source, match.index + match[0].length);
    const inner = source.slice(match.index + match[0].length, block.start);
    const after = source.slice(block.end);
    const branches = splitPimBranches(match[1], inner);
    const selected = branches.find((branch) => branch.condition === null || evalPimCondition(context, branch.condition));

    return before
      + renderPimControlBlocks(selected ? selected.html : '', context)
      + renderPimControlBlocks(after, context);
  }

  function renderPimTemplate(html, data) {
    const withoutBlocks = renderPimControlBlocks(html, data || {});
    return withoutBlocks.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (full, expression) => {
      const expr = String(expression || '').trim();
      if (/^(else|end|if|range|with)\b/.test(expr)) return '';
      const value = getPimValue(data || {}, expr);
      return escapeHtml(value === null || value === undefined ? '' : value);
    });
  }

  function renderPimEmailToFrame(frame, html, data) {
    frame.srcdoc = renderPimTemplate(html, data);
    frame.addEventListener('load', function onLoad() {
      frame.removeEventListener('load', onLoad);
      resizeEmailFrame(frame);
    });
  }

  return {
    escapeHtml,
    slugify,
    STORE_OPTIONS,
    platformBadge,
    statusBadge,
    storeBadge,
    storeFromPath,
    storeLabel,
    templateStore,
    scenarioStore,
    storeOptionsFor,
    renderTopbar,
    downloadFile,
    fetchText,
    buildEmailRenderContext,
    resizeEmailFrame,
    renderEmailToFrame,
    renderPimTemplate,
    renderPimEmailToFrame,
  };
})();
