/**
 * OpenGuido Docs — Search Engine & UI Logic
 * Uses Fuse.js for fuzzy search across 1158+ snippets
 */

/* ── Globals ──────────────────────────────────────────────── */
let fuseInstance = null;
let currentResults = [];

/* ── Initialize Search ────────────────────────────────────── */
function initSearch() {
  if (!window.SNIPPETS || !window.Fuse) {
    console.warn('OpenGuido: SNIPPETS or Fuse not loaded yet');
    setTimeout(initSearch, 100);
    return;
  }

  fuseInstance = new Fuse(SNIPPETS, {
    keys: [
      { name: 'title', weight: 4 },
      { name: 'tags', weight: 3 },
      { name: 'aliases', weight: 3 },
      { name: 'keywords', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'explanation', weight: 1 },
      { name: 'category', weight: 0.5 },
      { name: 'code', weight: 0.3 },
    ],
    threshold: 0.4,
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2,
    useExtendedSearch: false,
  });

  // Set up search listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    // Focus on load
    setTimeout(() => searchInput.focus(), 300);
  }
}

/* ── Handle Search Input ──────────────────────────────────── */
function handleSearch() {
  const query = this.value.trim();
  const resultsContainer = document.getElementById('search-results');

  if (!resultsContainer) return;

  if (!query || query.length < 2) {
    resultsContainer.classList.remove('active');
    resultsContainer.innerHTML = '';
    return;
  }

  // Try fuzzy search
  let results = [];
  if (fuseInstance) {
    results = fuseInstance.search(query);
  }

  // Filter by current language if on a category page
  const langFilter = document.body.dataset.language;
  if (langFilter && results.length > 0) {
    results = results.filter(r => r.item.language === langFilter);
  }

  // Take top 25
  const topResults = results.slice(0, 25);

  if (topResults.length === 0) {
    // Fallback: simple substring search
    const q = query.toLowerCase();
    const fallback = SNIPPETS.filter(s =>
      s.title.toLowerCase().includes(q) ||
      (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
      (s.keywords && s.keywords.some(k => k.toLowerCase().includes(q)))
    );
    if (langFilter) {
      topResults.push(...fallback.filter(s => s.language === langFilter).slice(0, 25));
    } else {
      topResults.push(...fallback.slice(0, 25));
    }
  }

  resultsContainer.classList.add('active');
  renderSearchResults(topResults, resultsContainer);
}

/* ── Render Search Results ────────────────────────────────── */
function renderSearchResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = '<div class="search-result-item" style="color:var(--text-muted);cursor:default;"><div>No results found</div></div>';
    return;
  }

  container.innerHTML = results.map((r, i) => {
    const s = r.item || r;  // r may be Fuse result object or raw snippet
    const score = r.score !== undefined ? Math.round((1 - r.score) * 100) + '%' : '';

    return `<a class="search-result-item" href="snippet.html?title=${encodeURIComponent(s.title)}&lang=${encodeURIComponent(s.language)}" onclick="closeSearch()">
      <span class="lang-badge ${s.language}">${s.language}</span>
      <div style="flex:1;min-width:0;">
        <div class="result-title">${escapeHtml(s.title)}</div>
        <div class="result-desc">${escapeHtml(truncate(s.description, 80))}</div>
        <div class="result-meta">
          ${s.category ? `<span class="cat">${escapeHtml(s.category)}</span>` : ''}
          ${s.difficulty ? `<span class="diff">${escapeHtml(s.difficulty)}</span>` : ''}
          ${score ? `<span class="cat">${score}</span>` : ''}
        </div>
      </div>
    </a>`;
  }).join('');
}

/* ── Close Search ─────────────────────────────────────────── */
function closeSearch() {
  const container = document.getElementById('search-results');
  if (container) {
    container.classList.remove('active');
    container.innerHTML = '';
  }
}

// Close search on click outside
document.addEventListener('click', function(e) {
  const container = document.getElementById('search-results');
  const input = document.getElementById('search-input');
  if (container && input && !container.contains(e.target) && e.target !== input) {
    container.classList.remove('active');
  }
});

/* ── Render Snippet Grid (for category pages) ─────────────── */
function renderSnippets(language, category = null, difficulty = null) {
  const container = document.getElementById('snippet-grid');
  if (!container) return;

  let filtered = SNIPPETS.filter(s => s.language === language);

  if (category) {
    filtered = filtered.filter(s => s.category === category);
  }
  if (difficulty) {
    filtered = filtered.filter(s => s.difficulty === difficulty);
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No snippets found in this category.</p></div>';
    return;
  }

  container.innerHTML = filtered.map(s => `
    <a class="snippet-card" href="snippet.html?title=${encodeURIComponent(s.title)}&lang=${encodeURIComponent(s.language)}">
      <div class="card-title">
        ${escapeHtml(s.title)}
        ${s.difficulty ? `<span class="difficulty ${s.difficulty}">${s.difficulty}</span>` : ''}
      </div>
      <div class="card-desc">${escapeHtml(truncate(s.description, 100))}</div>
      <div class="card-tags">
        ${(s.tags || []).slice(0, 4).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </a>
  `).join('');
}

/* ── Build Sidebar Categories ─────────────────────────────── */
function buildSidebar(language) {
  const sidebar = document.getElementById('sidebar-cats');
  if (!sidebar) return;

  // Count snippets per category
  const counts = {};
  for (const s of SNIPPETS) {
    if (s.language === language && s.category) {
      counts[s.category] = (counts[s.category] || 0) + 1;
    }
  }

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  // Get current category from URL
  const params = new URLSearchParams(window.location.search);
  const currentCat = params.get('category');

  sidebar.innerHTML = `
    <li><a href="${language}.html" class="${!currentCat ? 'active' : ''}"><span>All</span><span class="count">${entries.reduce((a, [,c]) => a + c, 0)}</span></a></li>
    ${entries.map(([cat, count]) => `
      <li><a href="${language}.html?category=${encodeURIComponent(cat)}" class="${currentCat === cat ? 'active' : ''}"><span>${escapeHtml(cat)}</span><span class="count">${count}</span></a></li>
    `).join('')}
  `;
}

/* ── Load Snippet Detail ──────────────────────────────────── */
function loadSnippetDetail() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const lang = params.get('lang');

  if (!title || !lang) return;

  const snippet = SNIPPETS.find(s => s.title === title && s.language === lang);
  if (!snippet) {
    document.getElementById('detail-content').innerHTML = '<div class="empty-state"><p>Snippet not found.</p></div>';
    return;
  }

  // Update breadcrumb
  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a> / <a href="${lang}.html">${escapeHtml(lang)}</a> / <a href="${lang}.html?category=${encodeURIComponent(snippet.category || '')}">${escapeHtml(snippet.category || '')}</a> / ${escapeHtml(snippet.title)}
    `;
  }

  // Header
  document.getElementById('detail-header').innerHTML = `
    <h1>${escapeHtml(snippet.title)}</h1>
    <div class="meta-line">
      <span class="lang-badge ${snippet.language}">${snippet.language}</span>
      ${snippet.category ? `<span style="color:var(--text-muted);font-size:0.85rem;text-transform:capitalize;">${escapeHtml(snippet.category)}</span>` : ''}
      ${snippet.difficulty ? `<span style="color:var(--text-muted);font-size:0.85rem;">${escapeHtml(snippet.difficulty)}</span>` : ''}
    </div>
  `;

  // Code block
  let codeContent = snippet.code || '';
  // Simple syntax highlighting
  codeContent = highlightCode(codeContent);

  document.getElementById('code-block').innerHTML = `
    <div class="code-block">
      <div class="code-header">
        <span class="lang-label">${snippet.language}</span>
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
      </div>
      <pre>${codeContent}</pre>
    </div>
  `;

  // Explanation
  if (snippet.explanation) {
    document.getElementById('explanation').innerHTML = `
      <div class="explanation-box">
        <h3>Explanation</h3>
        <p>${escapeHtml(snippet.explanation)}</p>
      </div>
    `;
  }

  // Tags
  if (snippet.tags && snippet.tags.length > 0) {
    document.getElementById('tags-section').innerHTML = `
      <div class="tags-section">
        ${snippet.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    `;
  }
}

/* ── Copy to Clipboard ────────────────────────────────────── */
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.textContent || pre.innerText;

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
}

/* ── Utility Functions ─────────────────────────────────────── */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '...' : str;
}

function highlightCode(code) {
  // Simple keyword-based highlighting
  // C++/Python keywords
  const keywords = ['\\bif\\b', '\\belse\\b', '\\bfor\\b', '\\bwhile\\b', '\\bdo\\b', '\\bswitch\\b',
    '\\bcase\\b', '\\bbreak\\b', '\\bcontinue\\b', '\\breturn\\b', '\\bauto\\b', '\\bconst\\b',
    '\\bconstexpr\\b', '\\bvirtual\\b', '\\boverride\\b', '\\bfinal\\b', '\\bclass\\b', '\\bstruct\\b',
    '\\bpublic\\b', '\\bprivate\\b', '\\bprotected\\b', '\\bnamespace\\b', '\\busing\\b',
    '\\btemplate\\b', '\\btypename\\b', '\\bdef\\b', '\\bimport\\b', '\\bfrom\\b', '\\bclass\\b',
    '\\basync\\b', '\\bawait\\b', '\\byield\\b', '\\blambda\\b', '\\bint\\b', '\\bfloat\\b',
    '\\bdouble\\b', '\\bchar\\b', '\\bstring\\b', '\\bvoid\\b', '\\bbool\\b', '\\bTrue\\b',
    '\\bFalse\\b', '\\bNone\\b', '\\band\\b', '\\bor\\b', '\\bnot\\b', '\\bin\\b', '\\bis\\b',
    '\\btry\\b', '\\bexcept\\b', '\\bfinally\\b', '\\braise\\b', '\\bwith\\b', '\\bpass\\b',
    '\\bdel\\b', '\\bprint\\b', '\\blen\\b', '\\brange\\b', '\\benumerate\\b', '\\bzip\\b',
    '\\bmap\\b', '\\bfilter\\b', '\\breduce\\b', '\\blambda\\b', '\\bnew\\b', '\\bdelete\\b',
    '\\bthrow\\b', '\\bcatch\\b', '\\binclude\\b', '\\bdefine\\b'];

  // Replace strings first (to avoid highlighting inside strings)
  code = code.replace(/(&lt;|<)/g, '&lt;').replace(/(&gt;|>)/g, '&gt;');

  // Highlight strings
  code = code.replace(/(["'`].*?["'`])/g, '<span class="string">$1</span>');

  // Highlight comments
  code = code.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
  code = code.replace(/(#.*)/g, '<span class="comment">$1</span>');

  // Highlight keywords
  for (const kw of keywords) {
    const regex = new RegExp(kw, 'g');
    code = code.replace(regex, '<span class="keyword">$1</span>');
  }

  // Highlight numbers
  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

  return code;
}

/* ── Update Stats on Homepage ──────────────────────────────── */
function updateStats() {
  const counts = {};
  const catCounts = {};
  for (const s of SNIPPETS) {
    counts[s.language] = (counts[s.language] || 0) + 1;
    if (s.category) catCounts[s.language] = (catCounts[s.language] || new Set()).add(s.category);
  }

  const langMap = { cpp: 'C++', python: 'Python', git: 'Git', linux: 'Linux' };

  for (const [lang, count] of Object.entries(counts)) {
    const langName = langMap[lang] || lang;
    const cats = catCounts[lang]?.size || 0;
    const statEl = document.getElementById(`stat-${lang}`);
    if (statEl) {
      statEl.innerHTML = `<div class="stat-item"><div class="number">${count}</div><div class="label">${langName} · ${cats} categories</div></div>`;
    }
  }
}

/* ── Init on Load ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/openguido/website/')) {
    updateStats();
  }
  initSearch();

  // Category page — build sidebar + render
  const lang = document.body.dataset.language;
  if (lang) {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const diff = params.get('difficulty');
    buildSidebar(lang);
    renderSnippets(lang, cat, diff);
  }

  // Detail page
  if (window.location.pathname.endsWith('snippet.html')) {
    loadSnippetDetail();
  }
});
