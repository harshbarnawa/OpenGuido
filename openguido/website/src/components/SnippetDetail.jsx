import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getSnippetByTitle } from '../data/snippets';
import { CopyIcon, CheckIcon } from '../assets/icons';

export default function SnippetDetail() {
  const [params] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const title = params.get('title');
  const lang = params.get('lang');

  const snippet = useMemo(() => getSnippetByTitle(title, lang), [title, lang]);

  useEffect(() => {
    if (!snippet) return;
    document.title = `${snippet.title} — OpenGuido Docs`;
  }, [snippet]);

  const handleCopy = () => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet.code || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!snippet) {
    return (
      <div className="container" style={{ paddingTop: 80 }}>
        <div className="empty-state">Snippet not found. <Link to="/">Go home</Link></div>
      </div>
    );
  }

  return (
    <div className="container snippet-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="bread-sep">/</span>
        <Link to={`/${snippet.language}`}>{snippet.language}</Link>
        {snippet.category && (
          <>
            <span className="bread-sep">/</span>
            <Link to={`/${snippet.language}?category=${encodeURIComponent(snippet.category)}`}>{snippet.category}</Link>
          </>
        )}
        <span className="bread-sep">/</span>
        <span className="bread-current">{snippet.title}</span>
      </div>

      {/* Header */}
      <div className="detail-header">
        <h1>{snippet.title}</h1>
        <div className="detail-meta">
          <span className={`lang-badge badge-${snippet.language}`}>{snippet.language}</span>
          {snippet.category && <span className="meta-cat">{snippet.category}</span>}
          {snippet.difficulty && <span className={`meta-diff diff-${snippet.difficulty}`}>{snippet.difficulty}</span>}
        </div>
      </div>

      {/* Code */}
      <div className="code-box">
        <div className="code-box-header">
          <span className="code-lang-label">{snippet.language}</span>
          <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
            {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
          </button>
        </div>
        <pre className="code-content">{snippet.code}</pre>
      </div>

      {/* Explanation */}
      {snippet.explanation && (
        <div className="explanation-box">
          <h3>Explanation</h3>
          <p>{snippet.explanation}</p>
        </div>
      )}

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="detail-tags">
          {snippet.tags.map((t, i) => <span key={i} className="detail-tag">{t}</span>)}
        </div>
      )}
    </div>
  );
}
