# Change Log

All notable changes to the "openguido" extension will be documented in this file.

## [1.0.0] - 2026-07-29

### Added
- **Fuzzy search engine** — multi-strategy pipeline using Fuse.js with exact, alias,
  prefix, fuzzy, and intent-based search
- **Intent matching** — natural language queries like "string to lower" return
  tolower(), transform(), ranges::transform() and related utilities
- **200+ new modern C++ snippets** — C++17/20/23 coverage including:
  - Exception handling (try/catch/throw, noexcept, custom exceptions)
  - File I/O (ifstream/ofstream/fstream, binary, stringstream)
  - Concurrency (thread, mutex, lock_guard, async, future, atomic)
  - Modern types (optional, variant, any, string_view)
  - Filesystem operations, chrono, random, regex
  - And more: ranges, concepts, type_traits, format, span
- **Aliases** — every snippet now has aliases for improved search discovery
- **Git advanced snippets** — 35+ entries covering rebase, stash, bisect,
  submodule, worktree, cherry-pick, reflog, and more
- **Statistics command** — `OpenGuido: Show Statistics` shows snippet counts
  by language and category
- **Enhanced QuickPick UI** — match quality icons ($(check) exact, $(lightbulb)
  intent, $(search) fuzzy), category and difficulty indicators

### Changed
- **Snippet type** — extended with optional fields (aliases, keywords,
  relatedSnippets, metadata) maintaining full backward compatibility
- **Container files** — vector.json, set.json, map.json, unordered_map.json,
  unordered_set.json, priority_queue.json now contain unique deep-dive content
  (emplace, extract, merge, C++20 erase_if, etc.) instead of duplicating stl.json
- **Missing metadata** — category, difficulty, explanation fields added to all
  7 simplified container files
- **Duplicate cleanup** — removed 5 sorting algorithm entries from dsa.json
  and 4 STL sort entries from algorithms.json (canonical homes established)

### Fixed
- Fragile title-based snippet lookup replaced with stable index-based lookup
- git/advanced.json was empty — now populated with full content
- TypeScript strict mode compatibility ensured

## [0.1.2] - 2026-07-29

### Added
- More datasets added
- Logo updated
