import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import SnippetDetail from './components/SnippetDetail';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cpp" element={<CategoryPage lang="cpp" />} />
          <Route path="/python" element={<CategoryPage lang="python" />} />
          <Route path="/git" element={<CategoryPage lang="git" />} />
          <Route path="/linux" element={<CategoryPage lang="linux" />} />
          <Route path="/snippet" element={<SnippetDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          <p>OpenGuido by <a href="https://github.com/harshbarnawa">Harsh Barnawa</a> · MIT License · <a href="https://github.com/harshbarnawa/OpenGuido">GitHub</a></p>
        </div>
      </footer>
    </div>
  );
}
