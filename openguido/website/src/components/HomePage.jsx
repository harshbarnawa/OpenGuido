import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getSnippets, setSnippets, getStats } from '../data/snippets';
import { SearchIcon, CppIcon, PythonIcon, GitIcon, LinuxIcon, ArrowRight } from '../assets/icons';

let fuseInstance = null;
const langMap = { cpp: 'C++', python: 'Python', git: 'Git', linux: 'Linux' };

const categories = [
  { key: 'cpp', label: 'C++', desc: 'Modern C++ (11/14/17/20/23), STL, templates, DSA, competitive programming.', Icon: CppIcon, count: '674+' },
  { key: 'python', label: 'Python', desc: 'Basics, functions, OOP, standard library, async, NumPy, Pandas, Flask.', Icon: PythonIcon, count: '194+' },
  { key: 'git', label: 'Git', desc: 'Everyday commands through advanced workflows: rebase, bisect, submodules.', Icon: GitIcon, count: '96' },
  { key: 'linux', label: 'Linux', desc: 'File system, text processing (grep/sed/awk), system admin, networking.', Icon: LinuxIcon, count: '194' },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState({});
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const all = getSnippets();
    if (all.length === 0) {
      // Load from global SNIPPETS if available
      if (window.SNIPPETS && window.SNIPPETS.length > 0) {
        setSnippets(window.SNIPPETS);
      }
    }
    setStats(getStats());

    fuseInstance = new Fuse(getSnippets(), {
      keys: [
        { name: 'title', weight: 4 },
        { name: 'tags', weight: 3 },
        { name: 'aliases', weight: 3 },
        { name: 'keywords', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'explanation', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.4,
      distance: 100,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.trim();
    setQuery(q);

    if (q.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    let hits = [];
    if (fuseInstance) {
      hits = fuseInstance.search(q);
    }

    // Fallback substring search
    if (hits.length === 0) {
      const lower = q.toLowerCase();
      hits = getSnippets()
        .filter(s =>
          s.title.toLowerCase().includes(lower) ||
          (s.tags || []).some(t => t.toLowerCase().includes(lower))
        )
        .map(s => ({ item: s, score: 0.5 }));
    }

    setResults(hits.slice(0, 20));
    setShowResults(true);
  };

  const selectResult = (snippet) => {
    setShowResults(false);
    setQuery('');
    navigate(`/snippet?title=${encodeURIComponent(snippet.title)}&lang=${encodeURIComponent(snippet.language)}`);
  };

  // Close search on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">
            Your offline <span className="highlight">code companion</span>
          </h1>
          <p className="hero-subtitle">
            Search {Object.values(stats).reduce((a, b) => a + b, 0) || 1158}+ snippets across C++, Python, Git, and Linux.
          </p>

          {/* Search */}
          <div className="search-wrapper" ref={searchRef}>
            <div className="home-search-box">
              <span className="home-search-icon"><SearchIcon /></span>
              <input
                type="text"
                className="home-search-input"
                placeholder='Try "for loop", "binary search", "pandas", "rebase"...'
                value={query}
                onChange={handleSearch}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {showResults && (
              <div className="home-search-results">
                {results.length === 0 ? (
                  <div className="search-empty">No results found</div>
                ) : (
                  results.map((r, i) => {
                    const s = r.item || r;
                    return (
                      <div key={i} className="search-result-row" onClick={() => selectResult(s)}>
                        <span className={`search-lang lang-${s.language}`}>{s.language}</span>
                        <div className="search-result-body">
                          <div className="search-result-title">{s.title}</div>
                          <div className="search-result-desc">{s.description?.slice(0, 80)}{s.description?.length > 80 ? '...' : ''}</div>
                        </div>
                        {s.difficulty && <span className="search-diff">{s.difficulty}</span>}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className="stats-bar">
          {Object.entries(stats).map(([lang, count]) => (
            <div key={lang} className="stat-item">
              <div className="stat-number">{count}</div>
              <div className="stat-label">{langMap[lang] || lang}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">Browse by language</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div key={cat.key} className={`category-card card-${cat.key}`} onClick={() => navigate(`/${cat.key}`)}>
              <cat.Icon />
              <h3 className="card-heading">{cat.label}</h3>
              <p className="card-desc">{cat.desc}</p>
              <div className="card-count">{cat.count} snippets</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
