import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getSnippets, loadSnippets, getCategories } from '../data/snippets';
import { SearchIcon } from '../assets/icons';

const langNames = { cpp: 'C++', python: 'Python', git: 'Git', linux: 'Linux' };

export default function CategoryPage({ lang }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const currentCat = searchParams.get('category') || null;

  useEffect(() => {
    async function init() {
      await loadSnippets();
      setReady(true);
    }
    init();
  }, []);

  const snippets = useMemo(() => ready ? getSnippets().filter(s => s.language === lang) : [], [lang, ready]);
  const categories = useMemo(() => ready ? getCategories(lang) : [], [lang, ready]);
  const totalCount = categories.reduce((a, c) => a + c.count, 0);

  useEffect(() => {
    if (!ready) return;
    let result = snippets;
    if (currentCat) result = result.filter(s => s.category === currentCat);

    if (query.length >= 2) {
      const q = query.toLowerCase();
      const fuse = new Fuse(result, {
        keys: [{ name: 'title', weight: 4 }, { name: 'tags', weight: 3 }, { name: 'description', weight: 2 }],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      });
      result = fuse.search(q).map(r => r.item);
      if (result.length === 0) {
        result = snippets.filter(s =>
          s.title.toLowerCase().includes(q) ||
          (s.tags || []).some(t => t.toLowerCase().includes(q))
        );
        if (currentCat) result = result.filter(s => s.category === currentCat);
      }
    }
    setFiltered(result);
  }, [lang, currentCat, query, snippets, ready]);

  return (
    <div className="container page-layout">
      <aside className="sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="sidebar-list">
          <li>
            <button className={`sidebar-link ${!currentCat ? 'active' : ''}`}
              onClick={() => { setSearchParams({}); setQuery(''); }}>
              <span>All</span>
              <span className="sidebar-count">{totalCount}</span>
            </button>
          </li>
          {categories.map(cat => (
            <li key={cat.name}>
              <button className={`sidebar-link ${currentCat === cat.name ? 'active' : ''}`}
                onClick={() => { setSearchParams({ category: cat.name }); setQuery(''); }}>
                <span className="sidebar-cat-name">{cat.name.replace(/_/g, ' ')}</span>
                <span className="sidebar-count">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-area">
        <div className="page-title">
          <h1>{langNames[lang] || lang}</h1>
          <p>{currentCat ? `${currentCat.replace(/_/g, ' ')} · ` : ''}{ready ? filtered.length : '...'} snippets</p>
        </div>

        <div className="cat-search-box">
          <span className="cat-search-icon"><SearchIcon /></span>
          <input type="text" className="cat-search-input"
            placeholder={`Search ${lang} snippets...`}
            value={query} onChange={e => setQuery(e.target.value)}
            autoComplete="off" spellCheck="false" />
        </div>

        {!ready ? (
          <div className="empty-state">Loading snippets...</div>
        ) : (
          <div className="snippet-grid">
            {filtered.map((s, i) => (
              <div key={i} className="snippet-card"
                onClick={() => navigate(`/snippet?title=${encodeURIComponent(s.title)}&lang=${encodeURIComponent(s.language)}`)}>
                <div className="snippet-card-title">
                  {s.title}
                  {s.difficulty && <span className={`diff-badge diff-${s.difficulty}`}>{s.difficulty}</span>}
                </div>
                <div className="snippet-card-desc">{s.description?.slice(0, 100)}{s.description?.length > 100 ? '...' : ''}</div>
                <div className="snippet-card-tags">
                  {(s.tags || []).slice(0, 4).map((t, ti) => <span key={ti} className="snippet-tag">{t}</span>)}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="empty-state">No snippets found for this selection.</div>}
          </div>
        )}
      </main>
    </div>
  );
}
