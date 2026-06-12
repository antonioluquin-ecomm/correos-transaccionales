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
    { id: 'venta-deportiva', label: 'Venta Deportiva' },
    { id: 'seller-adidas', label: 'Seller adidas' },
  ];

  const CHANNEL_OPTIONS = [
    { id: 'punto-de-venta', label: 'Punto de Venta' },
    { id: 'b2c', label: 'B2C' },
    { id: 'b2b', label: 'B2B' },
    { id: 'ext', label: 'EXT' },
  ];

  const LOGISTICA_OPTIONS = [
    { id: 'andreani', label: 'Andreani' },
    { id: 'ocasa', label: 'OCASA' },
    { id: 'propia', label: 'Propia' },
    { id: 'retiro', label: 'Retiro' },
    { id: 'producteca-oca', label: 'Producteca · OCA' },
    { id: 'producteca-correo-argentino', label: 'Producteca · Correo Argentino' },
    { id: 'producteca-trf', label: 'Producteca · TRF' },
    { id: 'producteca-urbano', label: 'Producteca · Urbano' },
  ];

  // Logística válida por canal (para hints de UI y validación).
  const CHANNEL_LOGISTICA = {
    'punto-de-venta': ['andreani', 'retiro'],
    'b2c': ['andreani', 'ocasa', 'propia', 'retiro'],
    'b2b': ['propia'],
    'ext': ['producteca-oca', 'producteca-correo-argentino', 'producteca-trf', 'producteca-urbano'],
  };

  // Facetas de escenario: describen el pedido de ejemplo (no la plantilla).
  // Cada escenario lleva un array plano `facetas` con ids de estas opciones.
  // Extensible: agregar grupos/opciones aquí y etiquetar los escenarios.
  const FACET_GROUPS = [
    { id: 'paquetes', label: 'Paquetes', options: [
      { id: 'un-paquete', label: '1 paquete' },
      { id: 'multideposito', label: '2 paq. multidepósito' },
    ] },
    { id: 'promocion', label: 'Promoción', options: [
      { id: 'con-promo', label: 'Con promoción' },
      { id: 'sin-promo', label: 'Sin promoción' },
    ] },
    { id: 'envio', label: 'Envío', options: [
      { id: 'envio-gratis', label: 'Envío gratis' },
      { id: 'envio-pago', label: 'Envío con costo' },
    ] },
    { id: 'entrega', label: 'Entrega', options: [
      { id: 'domicilio', label: 'A domicilio' },
      { id: 'retiro', label: 'Retiro en tienda' },
      { id: 'mixto', label: 'Envío + retiro' },
    ] },
  ];

  const FACET_OPTION_INDEX = FACET_GROUPS.reduce((acc, group) => {
    group.options.forEach((option) => { acc[option.id] = { ...option, group: group.id }; });
    return acc;
  }, {});

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

  function channelLabel(channel) {
    const slug = slugify(channel || 'b2c');
    const known = CHANNEL_OPTIONS.find((option) => option.id === slug);
    if (known) return known.label;
    return String(channel || slug).replace(/(^|-)([a-z])/g, (_, sep, chr) => `${sep ? ' ' : ''}${chr.toUpperCase()}`);
  }

  function logisticaLabel(logistica) {
    const slug = slugify(logistica);
    const known = LOGISTICA_OPTIONS.find((option) => option.id === slug);
    if (known) return known.label;
    return String(logistica || slug).replace(/(^|-)([a-z])/g, (_, sep, chr) => `${sep ? ' ' : ''}${chr.toUpperCase()}`);
  }

  function normalizeList(values) {
    const source = Array.isArray(values) ? values : [values];
    return Array.from(new Set(source.map(slugify).filter(Boolean)));
  }

  function labelsFor(values, labelFn) {
    const list = normalizeList(values);
    return list.length ? list.map(labelFn).join(', ') : 'Sin clasificar';
  }

  function optionListFor(items, resolver, knownOptions, labelFn) {
    const actual = new Set((items || []).flatMap((item) => resolver(item)).filter(Boolean));
    const known = knownOptions.map((option) => option.id);
    const unknown = Array.from(actual).filter((id) => !known.includes(id)).sort();
    return knownOptions.concat(unknown.map((id) => ({ id, label: labelFn(id) })));
  }

  function channelOptionsFor(items, resolver) {
    return optionListFor(items, resolver, CHANNEL_OPTIONS, channelLabel);
  }

  function templateChannels(template) {
    const explicit = normalizeList(template?.canales || template?.canal);
    return explicit.length ? explicit : ['b2c'];
  }

  function scenarioChannels(scenario) {
    const explicit = normalizeList(scenario?.canales || scenario?.canal);
    return explicit.length ? explicit : ['b2c'];
  }

  function templateLogistics(template) {
    return normalizeList(template?.logistica || template?.logisticas);
  }

  function scenarioLogistics(scenario) {
    return normalizeList(scenario?.logistica || scenario?.logisticas);
  }

  function scenarioFacets(scenario) {
    return normalizeList(scenario?.facetas || scenario?.facets);
  }

  function facetLabel(facetId) {
    const slug = slugify(facetId);
    const known = FACET_OPTION_INDEX[slug];
    if (known) return known.label;
    return String(facetId || slug).replace(/(^|-)([a-z])/g, (_, sep, chr) => `${sep ? ' ' : ''}${chr.toUpperCase()}`);
  }

  // filters: { paquetes, promocion, envio, entrega } — cada valor es un id de opción o ''.
  // AND entre grupos: si un grupo tiene valor elegido, el escenario debe incluirlo.
  function matchesFacets(scenario, filters) {
    const facets = scenarioFacets(scenario);
    return FACET_GROUPS.every((group) => {
      const wanted = slugify(filters?.[group.id]);
      return !wanted || facets.length === 0 || facets.includes(wanted);
    });
  }

  function templateStores(template) {
    const explicit = normalizeList(template?.tiendas || template?.tienda || template?.store);
    if (explicit.length) return explicit;
    return normalizeList(storeFromPath(template?.archivoHtml) || storeFromPath(template?.ejemplo) || 'shared');
  }

  function scenarioStores(scenario) {
    const explicit = normalizeList(scenario?.tiendas || scenario?.tienda || scenario?.store);
    if (explicit.length) return explicit;
    return normalizeList(storeFromPath(scenario?.path) || 'shared');
  }

  function templateStore(template) {
    return templateStores(template)[0] || 'shared';
  }

  function scenarioStore(scenario) {
    return scenarioStores(scenario)[0] || 'shared';
  }

  function storeOptionsFor(items, resolver) {
    return optionListFor(items, (item) => normalizeList(resolver(item)), STORE_OPTIONS, storeLabel);
  }

  function logisticaOptionsFor(items, resolver) {
    return optionListFor(items, (item) => normalizeList(resolver(item)), LOGISTICA_OPTIONS, logisticaLabel);
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

  function storeBadges(stores) {
    return normalizeList(stores).map(storeBadge).join('');
  }

  function channelBadge(channel) {
    const slug = slugify(channel || 'b2c');
    return badge(channelLabel(slug), `ct-channel-${slug}`);
  }

  function channelBadges(channels) {
    return normalizeList(channels).map(channelBadge).join('');
  }

  function logisticaBadge(logistica) {
    const slug = slugify(logistica);
    return badge(logisticaLabel(slug), `ct-logistica-${slug}`);
  }

  function logisticaBadges(logisticas) {
    return normalizeList(logisticas).map(logisticaBadge).join('');
  }

  function facetBadge(facetId) {
    const slug = slugify(facetId);
    const group = FACET_OPTION_INDEX[slug]?.group || 'otro';
    return badge(facetLabel(slug), `ct-facet ct-facet-${group}`);
  }

  function facetBadges(facets) {
    return normalizeList(facets).map(facetBadge).join('');
  }

  function matchesChannelStore(item, filters) {
    const channel = slugify(filters?.channel);
    const store = slugify(filters?.store);
    const logistica = slugify(filters?.logistica);
    const isScenario = !!item?.compatibleTemplates;
    const channels = isScenario ? scenarioChannels(item) : templateChannels(item);
    const stores = isScenario ? scenarioStores(item) : templateStores(item);
    const logisticas = isScenario ? scenarioLogistics(item) : templateLogistics(item);
    const matchesChannel = !channel || channels.includes(channel);
    const matchesStore = !store || stores.includes(store) || stores.includes('shared');
    // Si el ítem no declara logística, no lo excluye un filtro de logística (es transversal).
    const matchesLogistica = !logistica || logisticas.length === 0 || logisticas.includes(logistica);
    return matchesChannel && matchesStore && matchesLogistica;
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

  // Recorre un path tipo ".A.B.C" sobre un valor base.
  function traversePimPath(base, path) {
    return String(path || '')
      .replace(/^\./, '')
      .split('.')
      .filter(Boolean)
      .reduce((current, key) => {
        if (current === null || current === undefined) return '';
        return current[key];
      }, base);
  }

  // Resuelve la función Go "index": (index .Array N).Prop  o  index .Array N
  // Devuelve undefined si la expresión no es un index (para que siga el flujo normal).
  function resolvePimIndex(context, expr) {
    const m = expr.match(/^\(\s*index\s+(\.\S+)\s+(\d+)\s*\)(\.[A-Za-z0-9_.]+)?$/)
      || expr.match(/^index\s+(\.\S+)\s+(\d+)$/);
    if (!m) return undefined;
    const arr = getPimValue(context, m[1]);
    if (!Array.isArray(arr)) return '';
    let val = arr[parseInt(m[2], 10)];
    if (val === null || val === undefined) return '';
    if (m[3]) val = traversePimPath(val, m[3]);
    return val === null || val === undefined ? '' : val;
  }

  function getPimValue(context, expression) {
    const expr = normalizePimExpression(expression);
    if (!expr) return '';
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1);
    }
    const indexed = resolvePimIndex(context, expr);
    if (indexed !== undefined) return indexed;
    if (!expr.startsWith('.')) return expr;

    return traversePimPath(context, expr);
  }

  // Tokeniza una expresion PIM respetando comillas y grupos entre parentesis.
  // Ej: 'or (hasPrefix .X "UR") (hasPrefix .X "AD")' -> ['or','(hasPrefix .X "UR")','(hasPrefix .X "AD")']
  function tokenizePimExpr(source) {
    const tokens = [];
    const s = String(source || '');
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') { i += 1; continue; }
      if (ch === '(') {
        let depth = 0; const start = i;
        for (; i < s.length; i += 1) {
          if (s[i] === '(') depth += 1;
          else if (s[i] === ')') { depth -= 1; if (depth === 0) { i += 1; break; } }
        }
        tokens.push(s.slice(start, i));
      } else if (ch === '"' || ch === "'") {
        const start = i; i += 1;
        for (; i < s.length && s[i] !== ch; i += 1) { /* avanzar */ }
        i += 1; tokens.push(s.slice(start, i));
      } else {
        const start = i;
        for (; i < s.length && !' \t\n\r'.includes(s[i]); i += 1) { /* avanzar */ }
        tokens.push(s.slice(start, i));
      }
    }
    return tokens;
  }

  // Resuelve un token a su VALOR (path, literal o funcion de valor como len).
  function evalPimValue(context, token) {
    const expr = normalizePimExpression(token);
    const tokens = tokenizePimExpr(expr);
    if (tokens.length > 1 && tokens[0] === 'len') {
      return String(getPimValue(context, tokens[1]) ?? '').length;
    }
    return getPimValue(context, expr);
  }

  // Evalua una expresion PIM como CONDICION (booleano).
  // Soporta: eq, ne, not, and, or, hasPrefix, hasSuffix, gt, lt, ge, le, len.
  function evalPimCondition(context, expression) {
    const expr = normalizePimExpression(expression);
    const tokens = tokenizePimExpr(expr);
    if (tokens.length === 0) return false;
    const fn = tokens[0];
    const args = tokens.slice(1);
    const num = (t) => Number(evalPimValue(context, t));
    switch (fn) {
      case 'eq': return evalPimValue(context, args[0]) === evalPimValue(context, args[1]);
      case 'ne': return evalPimValue(context, args[0]) !== evalPimValue(context, args[1]);
      case 'not': return !evalPimCondition(context, args[0]);
      case 'and': return args.length > 0 && args.every((a) => evalPimCondition(context, a));
      case 'or': return args.some((a) => evalPimCondition(context, a));
      case 'hasPrefix': return String(evalPimValue(context, args[0]) ?? '').startsWith(String(evalPimValue(context, args[1]) ?? ''));
      case 'hasSuffix': return String(evalPimValue(context, args[0]) ?? '').endsWith(String(evalPimValue(context, args[1]) ?? ''));
      case 'gt': return num(args[0]) > num(args[1]);
      case 'lt': return num(args[0]) < num(args[1]);
      case 'ge': return num(args[0]) >= num(args[1]);
      case 'le': return num(args[0]) <= num(args[1]);
      default: return Boolean(getPimValue(context, expr));
    }
  }

  function findPimBlockEnd(source, startIndex) {
    // if / range / with abren bloque; end lo cierra. Todos cuentan profundidad.
    const tagRegex = /\{\{\s*(?:((?:if|range|with)\b[^}]*)|(end))\s*\}\}/g;
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
    const tagRegex = /\{\{\s*(?:((?:if|range|with)\b[^}]*)|(else if\b[^}]*)|(else)|(end))\s*\}\}/g;
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

  // "Truthiness" estilo Go template: array vacio, '', 0, null/undefined y false son falsy.
  function isTruthyPim(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (value === null || value === undefined) return false;
    if (value === '' || value === 0 || value === false) return false;
    return true;
  }

  // Separa el cuerpo de un bloque {{ with }} o {{ range }} en su parte principal
  // y su rama {{ else }} de nivel superior (si existe).
  function splitPimElse(inner) {
    const tagRegex = /\{\{\s*(?:((?:if|range|with)\b[^}]*)|(else)|(end))\s*\}\}/g;
    let depth = 0;
    let match;
    while ((match = tagRegex.exec(inner))) {
      if (match[1]) { depth += 1; continue; }
      if (match[3]) { depth -= 1; continue; }
      if (match[2] && depth === 0) {
        return { body: inner.slice(0, match.index), elseBody: inner.slice(tagRegex.lastIndex) };
      }
    }
    return { body: inner, elseBody: '' };
  }

  // Resuelve los tags scalar ({{ .Path }}, {{ literal }}) contra el contexto actual.
  function resolvePimScalars(source, context) {
    return source.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (full, expression) => {
      const expr = String(expression || '').trim();
      if (/^(else|end|if|range|with)\b/.test(expr)) return '';
      const value = getPimValue(context, expr);
      return escapeHtml(value === null || value === undefined ? '' : value);
    });
  }

  // Render recursivo que arrastra el contexto. Soporta if/else if/else, with y range.
  function renderPimNodes(source, context) {
    const openRegex = /\{\{\s*(if|range|with)\s+([^}]+?)\s*\}\}/;
    const match = openRegex.exec(source);
    if (!match) return resolvePimScalars(source, context);

    const kind = match[1];
    const arg = match[2];
    const before = source.slice(0, match.index);
    const block = findPimBlockEnd(source, match.index + match[0].length);
    const inner = source.slice(match.index + match[0].length, block.start);
    const after = source.slice(block.end);

    let middle = '';
    if (kind === 'if') {
      const branches = splitPimBranches(arg, inner);
      const selected = branches.find((branch) => branch.condition === null || evalPimCondition(context, branch.condition));
      middle = renderPimNodes(selected ? selected.html : '', context);
    } else if (kind === 'with') {
      const parts = splitPimElse(inner);
      const value = getPimValue(context, arg);
      middle = isTruthyPim(value)
        ? renderPimNodes(parts.body, value)
        : renderPimNodes(parts.elseBody, context);
    } else if (kind === 'range') {
      const parts = splitPimElse(inner);
      const value = getPimValue(context, arg);
      if (Array.isArray(value) && value.length) {
        middle = value.map((item) => renderPimNodes(parts.body, item)).join('');
      } else {
        middle = renderPimNodes(parts.elseBody, context);
      }
    }

    return resolvePimScalars(before, context) + middle + renderPimNodes(after, context);
  }

  function renderPimTemplate(html, data) {
    return renderPimNodes(html, data || {});
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
    CHANNEL_OPTIONS,
    LOGISTICA_OPTIONS,
    CHANNEL_LOGISTICA,
    FACET_GROUPS,
    platformBadge,
    statusBadge,
    channelBadge,
    channelBadges,
    storeBadge,
    storeBadges,
    logisticaBadge,
    logisticaBadges,
    facetBadge,
    facetBadges,
    storeFromPath,
    storeLabel,
    channelLabel,
    logisticaLabel,
    facetLabel,
    labelsFor,
    templateChannels,
    scenarioChannels,
    templateStores,
    scenarioStores,
    templateStore,
    scenarioStore,
    templateLogistics,
    scenarioLogistics,
    scenarioFacets,
    storeOptionsFor,
    channelOptionsFor,
    logisticaOptionsFor,
    matchesChannelStore,
    matchesFacets,
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
