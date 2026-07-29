// Snippet data loader
// Falls back to empty array if data.js not available

let snippets = [];

try {
  // data.js will be loaded as a separate script in index.html
  // This loader checks for the global SNIPPETS variable
  if (typeof window !== 'undefined' && window.SNIPPETS) {
    snippets = window.SNIPPETS;
  }
} catch (e) {
  console.warn('Failed to load snippets:', e);
}

// For development, we also support dynamic import
export async function loadSnippets() {
  if (snippets.length > 0) return snippets;

  try {
    // Try loading from the generated data.js
    const resp = await fetch('/openguido/data/data.json');
    if (resp.ok) {
      snippets = await resp.json();
    }
  } catch (e) {
    console.warn('Could not load snippets from JSON, using bundled data');
  }

  return snippets;
}

export function getSnippets() {
  return snippets;
}

export function setSnippets(data) {
  snippets = data;
}

export function getSnippetsByLanguage(lang) {
  return snippets.filter(s => s.language === lang);
}

export function getCategories(lang) {
  const cats = new Map();
  for (const s of snippets) {
    if (s.language === lang && s.category) {
      cats.set(s.category, (cats.get(s.category) || 0) + 1);
    }
  }
  return Array.from(cats.entries())
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
