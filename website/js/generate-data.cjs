/**
 * generate-data.js — reads all JSON files from ../../src/data/
 * produces public/data.json AND public/data-loader.js
 *
 * Usage: node js/generate-data.js
 * Run from the website/ directory
 */

const fs = require('fs');
const path = require('path');

const DATA_ROOT = path.resolve(__dirname, '../../src/data');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

const languages = ['cpp', 'python', 'git', 'linux'];
let allSnippets = [];

for (const lang of languages) {
  const langDir = path.join(DATA_ROOT, lang);
  if (!fs.existsSync(langDir)) continue;

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.json')) {
        try {
          const snippets = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (Array.isArray(snippets)) {
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

// Ensure public dir exists
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// Write data.json
const jsonPath = path.join(PUBLIC_DIR, 'data.json');
fs.writeFileSync(jsonPath, JSON.stringify(allSnippets), 'utf8');
console.log(`✅ data.json — ${allSnippets.length} snippets`);

// Write data-loader.js (injects into window.SNIPPETS)
const loaderPath = path.join(PUBLIC_DIR, 'data-loader.js');
const loaderContent = `// OpenGuido Docs — ${allSnippets.length} snippets (auto-generated)
window.SNIPPETS = ${JSON.stringify(allSnippets)};
`;
fs.writeFileSync(loaderPath, loaderContent, 'utf8');
console.log(`✅ data-loader.js — ${allSnippets.length} snippets`);
