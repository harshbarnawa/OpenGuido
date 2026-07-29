/**
 * generate-data.js — reads all JSON snippet files from src/data/
 * and produces website/js/data.js (a single JS array).
 *
 * Usage: node js/generate-data.js
 * Run from the website/ directory or adjust paths.
 */

const fs = require('fs');
const path = require('path');

// Paths relative to this script
const DATA_ROOT = path.resolve(__dirname, '../../src/data');
const OUTPUT = path.resolve(__dirname, 'data.js');

const languages = ['cpp', 'python', 'git', 'linux'];

let allSnippets = [];

for (const lang of languages) {
  const langDir = path.join(DATA_ROOT, lang);
  if (!fs.existsSync(langDir)) continue;

  // Walk directory recursively (for nested dirs like cpp/modern/)
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const snippets = JSON.parse(content);
          if (Array.isArray(snippets)) {
            // Ensure every snippet has a language field
            for (const s of snippets) {
              if (!s.language) s.language = lang;
            }
            allSnippets.push(...snippets);
          }
        } catch (err) {
          console.error(`Error reading ${fullPath}: ${err.message}`);
        }
      }
    }
  }

  walk(langDir);
}

// Sort: C++ first, then Python, then Git, then Linux
const langOrder = { cpp: 0, python: 1, git: 2, linux: 3 };
allSnippets.sort((a, b) => {
  const la = langOrder[a.language] ?? 99;
  const lb = langOrder[b.language] ?? 99;
  return la - lb;
});

// Write output
const jsContent = `// OpenGuido Docs — Snippet Dataset (auto-generated)
// Total: ${allSnippets.length} snippets across ${languages.filter(l => fs.existsSync(path.join(DATA_ROOT, l))).length} languages
// Generated: ${new Date().toISOString()}

const SNIPPETS = ${JSON.stringify(allSnippets)};
`;

fs.writeFileSync(OUTPUT, jsContent, 'utf8');
console.log(`✅ Generated data.js — ${allSnippets.length} snippets written`);
