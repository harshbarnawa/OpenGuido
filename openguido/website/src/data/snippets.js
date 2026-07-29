// Snippet data loader
// Fetches data.json from public directory

let snippets = [];

export async function loadSnippets() {
  if (snippets.length > 0) return snippets;

  try {
    // Try window.SNIPPETS first (from data-loader.js)
    if (typeof window !== 'undefined' && window.SNIPPETS && window.SNIPPETS.length > 0) {
      snippets = window.SNIPPETS;
      return snippets;
    }

    // Fallback: fetch data.json
    const base = '/';
    const resp = await fetch(base + 'data.json');
    if (resp.ok) {
      snippets = await resp.json();
      return snippets;
    }

    console.warn('Could not load snippets from any source');
  } catch (e) {
    console.error('Failed to load snippets:', e);
  }

  return snippets;
}

export function getSnippets() {
  return snippets;
}

export function getSnippetsByLanguage(lang) {
  return Array.isArray(snippets) ? snippets.filter(s => s.language === lang) : [];
}

export function getCategories(lang) {
  const cats = {};
  for (const s of snippets) {
    if (s.language === lang && s.category) {
      cats[s.category] = (cats[s.category] || 0) + 1;
    }
  }
  return Object.entries(cats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getSnippetByTitle(title, lang) {
  return snippets.find(s => s.title === title && s.language === lang) || null;
}

export function getStats() {
  const counts = {};
  for (const s of snippets) {
    const l = s.language;
    counts[l] = (counts[l] || 0) + 1;
  }
  return counts;
}
