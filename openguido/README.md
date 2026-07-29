# OpenGuido V3

OpenGuido is a VS Code extension that provides an intelligent, searchable offline programming knowledge engine for C++, Git, and Linux commands — directly inside Visual Studio Code.

---

## Features

* **Intelligent fuzzy search** — find snippets even with incomplete queries ("string to lower" finds `tolower()`, `transform()`, and more)
* **Intent-based matching** — natural language understanding ("sort vector", "remove duplicates", "find element")
* **Alias search** — search by any common name or alternative name
* **700+ snippets and commands** covering modern C++ (C++17/20/23), Git, and Linux
* **C++ syntax and STL reference** — all major STL containers, algorithms, and modern features
* **OOP concepts** — classes, inheritance, polymorphism, RAII, smart pointers
* **DSA and algorithm templates** — trees, graphs, DP, sorting, searching, and more
* **Modern C++** — exceptions, concurrency, optional/variant/any, string_view, filesystem
* **Git command lookup** — basics through advanced (rebase, bisect, submodules)
* **Linux command lookup** — file system, networking, permissions, process management
* **Preview snippet**, **Copy to clipboard**, **Insert into editor**

---

## Supported Categories

### C++ (400+ snippets)
* Basics — variables, I/O, conditionals, loops, functions, arrays, pointers
* STL — vector, set, map, unordered_map, stack, queue, deque, priority_queue, bitset
* OOP — classes, inheritance, polymorphism, encapsulation, RAII, smart pointers
* Data Structures — linked lists, trees, graphs, DSU, segment tree, Fenwick, trie
* Algorithms — sorting, searching, sliding window, two pointers, prefix sums
* String — operations, conversions, search, parsing
* **Modern C++ (NEW)** — exceptions, file I/O, concurrency, optional, variant, any, string_view, ranges, concepts, filesystem, chrono, type_traits

### Git (80+ commands)
* Basic — init, clone, add, commit, push, pull, branch, merge
* **Advanced (NEW)** — rebase (interactive), stash, bisect, submodule, worktree, cherry-pick, reflog, format-patch, sparse-checkout

### Linux (140+ commands)
* File System — ls, cd, mkdir, cp, mv, rm, find, tar, grep
* Process Management — ps, top, kill, systemctl, journalctl
* Networking — ping, curl, ssh, netstat, nmap, dig
* Permissions — chmod, chown, umask, ACL, sudo

---

## Intelligent Search

The V3 search engine understands developer intent:

| You type | It finds |
|---|---|
| `string to lower` | `tolower()`, `transform()`, ranges |
| `reverse vector` | `reverse()`, `reverse()` iterators |
| `remove duplicates` | `unique()`, `erase-remove` idiom |
| `sort pair by second` | custom comparator sort |
| `binary search` | `binary_search()`, `lower_bound()`, `upper_bound()` |
| `split string` | `stringstream`, `getline` |
| `check if key exists` | `find()`, `count()`, `contains()` |
| `fast io` | competitive programming I/O setup |

Gives exact matches first, then intent-based, then fuzzy, then prefix results — all ranked by relevance.

---

## Installation

### From VS Code Marketplace

1. Open Visual Studio Code
2. Go to Extensions (`Ctrl + Shift + X`)
3. Search for **OpenGuido**
4. Click **Install**
5. Reload VS Code if prompted

---

## How To Use

### Command Palette

1. Press `Ctrl + Shift + P`
2. Type:

```text
OpenGuido: Search Snippet
```

3. Press Enter
4. Search for any syntax, command, or snippet

### Show Statistics

1. Press `Ctrl + Shift + P`
2. Type:

```text
OpenGuido: Show Statistics
```

3. View snippet counts by language and category

---

### Available Actions

For Code Snippets:

* Preview Snippet
* Copy To Clipboard
* Insert Into Editor

For Commands:

* Preview Command
* Copy To Clipboard

---

## Example Searches

```text
vector sort
unordered_map
priority queue
binary search
dfs bfs topological
dijkstra shortest path

string to lower
split string
file read line
thread mutex lock
optional value_or

git rebase interactive
git stash pop
git bisect good bad
git submodule update

ping host
ssh login
chmod 755
netstat ports
```

---

## Version

Current Version: **1.0.0**

---

## Roadmap

Planned additions:

* Java
* Python
* Docker
* SQL
* React
* Node.js
* JavaScript
* Rust
* Go

---

## Author

Harsh Barnawa

---

## License

MIT License
