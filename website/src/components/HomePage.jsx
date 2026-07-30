import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { getSnippets, loadSnippets, getStats } from '../data/snippets';
import { SearchIcon, CppIcon, PythonIcon, GitIcon, LinuxIcon, DownloadIcon, VSCodeIcon, ExternalIcon } from '../assets/icons';

const VSCODE_MARKETPLACE = 'https://marketplace.visualstudio.com/items?itemName=HarshBarnawa.openguido';

let fuseInstance = null;
const langMap = { cpp: 'C++', python: 'Python', git: 'Git', linux: 'Linux' };

const categories = [
  { key: 'cpp', label: 'C++', desc: 'Modern C++ (11/14/17/20/23), STL, templates, DSA, algorithms, and competitive programming patterns.', Icon: CppIcon, count: '674+' },
  { key: 'python', label: 'Python', desc: 'Basics, functions, OOP, standard library, async/await, NumPy, Pandas, Flask, and testing.', Icon: PythonIcon, count: '194+' },
  { key: 'git', label: 'Git', desc: 'Everyday commands through advanced workflows: rebase, bisect, submodules, worktrees, and reflog.', Icon: GitIcon, count: '96' },
  { key: 'linux', label: 'Linux', desc: 'File system, text processing (grep/sed/awk), system administration, networking, and permissions.', Icon: LinuxIcon, count: '194' },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      await loadSnippets();
      const s = getStats();
      setStats(s);
      setLoading(false);

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
    }
    init();
  }, []);

  const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1158;

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

    if (hits.length === 0) {
      const lower = q.toLowerCase();
      hits = getSnippets()
        .filter(s =>
          s.title.toLowerCase().includes(lower) ||
          (s.tags || []).some(t => t.toLowerCase().includes(lower))
        )
        .slice(0, 20)
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
      <section className="hero">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">
            Your offline <span className="highlight">code companion</span>
          </h1>
          <p className="hero-subtitle">
            Search {total} snippets across C++, Python, Git, and Linux — from syntax fundamentals to competitive programming patterns, all fully offline.
          </p>

          <div className="search-wrapper" ref={searchRef}>
            <div className="home-search-box">
              <span className="home-search-icon"><SearchIcon /></span>
              <input
                type="text"
                className="home-search-input"
                placeholder='Try "for loop", "binary search", "pandas", "rebase", "dijkstra"...'
                value={query}
                onChange={handleSearch}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {showResults && (
              <div className="home-search-results">
                {loading ? (
                  <div className="search-empty">Loading snippets...</div>
                ) : results.length === 0 ? (
                  <div className="search-empty">No results found. Try a different search term.</div>
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

      <section className="container">
        <div className="stats-bar">
          {loading ? (
            <div className="stat-item"><div className="stat-number">—</div><div className="stat-label">Loading...</div></div>
          ) : (
            Object.entries(stats).map(([lang, count]) => (
              <div key={lang} className="stat-item">
                <div className="stat-number">{count}</div>
                <div className="stat-label">{langMap[lang] || lang}</div>
              </div>
            ))
          )}
        </div>
      </section>

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

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <div className="cta-badge">VS Code Extension</div>
              <h2 className="cta-title">Get it directly in your editor</h2>
              <p className="cta-desc">
                Install OpenGuido from the VS Code Marketplace and access 1158+ snippets
                without leaving your editor. Fully offline, zero setup.
              </p>
              <div className="cta-features">
                <div className="cta-feature">
                  <span className="cta-check">✓</span>
                  <span>Instant search from Command Palette</span>
                </div>
                <div className="cta-feature">
                  <span className="cta-check">✓</span>
                  <span>Copy to clipboard or insert directly</span>
                </div>
                <div className="cta-feature">
                  <span className="cta-check">✓</span>
                  <span>Works offline — no internet needed</span>
                </div>
              </div>
              <a href={VSCODE_MARKETPLACE} target="_blank" rel="noopener noreferrer" className="btn-download">
                <DownloadIcon />
                <span>Download from Marketplace</span>
                <ExternalIcon />
              </a>
            </div>
            <div className="cta-visual">
              <VSCodeIcon />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
