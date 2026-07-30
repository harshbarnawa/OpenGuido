# OpenGuido V3 — Intelligent Offline Code & Command Reference

<p align="center">
  <a href="https://openguido.vercel.app"><strong>🌐 openguido.vercel.app</strong></a>
  ·
  <a href="https://marketplace.visualstudio.com/items?itemName=HarshBarnawa.openguido"><strong>⬇️ VS Code Marketplace</strong></a>
  ·
  <a href="https://github.com/harshbarnawa/OpenGuido"><strong>📦 GitHub</strong></a>
</p>

**OpenGuido** is a VS Code extension that provides an intelligent, searchable offline programming knowledge engine for **C++, Python, Git, and Linux commands** — directly inside Visual Studio Code.

> 🚀 **Now with 1150+ snippets** across 4 languages/categories!  
> 📖 **Documentation website**: [openguido.vercel.app](https://openguido.vercel.app)

---

## Features

- **Intelligent fuzzy search** — find snippets even with incomplete queries (`"string to lower"` finds `tolower()`, `transform()`, and more)
- **Intent-based matching** — natural language understanding (`"sort vector"`, `"remove duplicates"`, `"find element"`, `"reverse list"`)
- **Alias & keyword search** — search by any common name, alternative name, or related term
- **Weighted relevance ranking** — title > aliases > tags > keywords > description > explanation
- **Prefix & substring matching** — start typing and results appear immediately
- **1150+ snippets and commands** — fully offline, no internet required
- **Preview snippet**, **Copy to clipboard**, **Insert into editor**
- **Show Statistics** — view snippet counts by language and category

---

## Supported Categories

### 🐍 Python — *194+ snippets* 🆕

| Category | Topics |
|----------|--------|
| **Basics** | Variables, types (int/float/str/bool/None), I/O, operators, conditionals, loops, match/case, comprehensions (list/dict/set/generator) |
| **Strings** | All string methods, f-strings (format spec, debug), `str.format()`, regex (match/search/findall/sub/split), bytes/encoding |
| **Data Structures** | List (stack/queue, sort, copy), tuple (unpacking, `namedtuple`), dict (comprehension, merge `\|`, `defaultdict`, `Counter`, `OrderedDict`, `ChainMap`), set (union/intersection/difference, `frozenset`), `heapq`, `array` |
| **Functions** | `*args`/`**kwargs`, keyword-only args, lambda, decorators (`@wraps`, parameterized), generators (`yield`, `yield from`), closures, type hints, `@property`, `@staticmethod`, `@classmethod`, recursion, `partial`, `singledispatch` |
| **OOP** | Inheritance (`super()`, MRO), magic methods, ABCs, `@dataclass`, `__slots__`, Enum, operator overloading, context managers (`@contextmanager`), descriptors, mixins, metaclasses |
| **Standard Library** | `os`/`sys`/`json`/`datetime`/`math`/`random`/`hashlib`/`pathlib`/`csv`/`copy`/`pprint`/`glob`/`statistics`/`uuid`/`base64`/`textwrap`/`argparse` |
| **Itertools** | `chain`, `product`, `permutations`, `combinations`, `groupby`, `count`/`cycle`/`repeat`, `accumulate`, `compress`, `tee` |
| **Functools** | `partial`, `lru_cache`, `reduce`, `singledispatch`, `wraps` |
| **Logging/Shutil** | Logger setup, handlers, file ops, archive, `tempfile`, `contextlib` |
| **Concurrency** | `threading` (Lock, Event, Queue), `ThreadPoolExecutor`, `asyncio` (`async`/`await`, `gather`), `subprocess` (run, Popen) |
| **Exception Handling** | try/except/else/finally, custom exceptions, assertion, exception hierarchy |
| **File I/O** | `open()` modes, encoding, `with` context manager, chunk reading |
| **Web & Data** | `requests` (GET/POST/sessions), Flask basics, `unittest`/`mock`, NumPy (arrays/operations/broadcasting), Pandas (Series/DataFrame/groupby/merge), pip/venv |

---

### 🇨 **C++ — 674+ snippets, 23 categories**

| Category | Topics |
|----------|--------|
| **Basics** | Variables, I/O, conditionals, loops, functions, arrays, pointers, dynamic memory |
| **STL Containers** | `vector`, `deque`, `list`, `forward_list`, `set`, `multiset`, `map`, `multimap`, `unordered_*`, `stack`, `queue`, `priority_queue`, `bitset`, `array` |
| **STL Algorithms** | `sort`, `find`, `count`, `accumulate`, `binary_search`, `lower_bound`, `upper_bound`, `partition`, `rotate`, `next_permutation`, `merge` |
| **String** | All operations, conversions, search, parsing, `string_view` |
| **OOP** | Classes, inheritance (all types), polymorphism, virtual, RAII, smart pointers (`unique_ptr`, `shared_ptr`, `weak_ptr`), rule of three/five |
| **DSA** | Linked lists, trees (BST, traversal), graphs (DFS/BFS/Dijkstra/Bellman-Ford/Floyd-Warshall), DSU, segment tree, Fenwick, trie, DP (Knapsack/LCS/LIS), backtracking |
| **Modern C++ (C++11/14/17/20/23)** | Lambdas (all forms), `auto`/`decltype`, `nullptr`, `constexpr`/`consteval`/`constinit`, `enum class`, `override`/`final`, structured bindings, `if constexpr`, fold expressions, concepts, ranges, spaceship `<=>`, `optional`, `variant`, `any`, `span`, `string_view`, `format`, coroutines, `source_location`, `expected`, `bit`, `mdspan` |
| **Concurrency** | `thread`, `mutex`, `lock_guard`/`unique_lock`/`scoped_lock`, `async`, `future`/`promise`, `atomic`, `condition_variable`, `thread_local` |
| **Templates** | Function/class templates, specialization, variadic, type traits (`is_same`, `enable_if`, `void_t`), SFINAE, CRTP, fold expressions |
| **Design Patterns** | Factory, Observer, Strategy, Builder (C++ implementations) |
| **CP Patterns** | Sparse Table, Mo's Algorithm, HLD, Matrix Exponentiation, PBDS |
| **Preprocessor** | `#include`, `#define`, macros, `#pragma`, namespaces, storage classes (`static`/`extern`/`mutable`) |
| **Type Casting** | `static_cast`, `dynamic_cast`, `reinterpret_cast`, `const_cast`, `bit_cast` |
| **Utilities** | `move`, `forward`, `exchange`, `clamp`, `midpoint`, `lerp`, `function`, `bind`, `typeid`, `alignas`/`alignof`, placement new, scan algorithms |
| **Libraries** | Chrono, Random (engines/distributions), Regex (search/replace/validate), Filesystem (path/directory/file ops) |

---

### ⎈ **Git — 96 commands**

| Level | Commands |
|-------|----------|
| **Basic** | `init`, `clone`, `add`, `commit`, `push`, `pull`, `status`, `log`, `diff`, `branch`, `merge`, `tag`, `config`, `stash`, `reset`, `revert`, `restore`, `blame`, `cherry-pick` |
| **Advanced** | `rebase -i`, `--onto`, `bisect run`, `submodule`, `worktree`, `format-patch`, `sparse-checkout`, `reflog`, `notes`, `range-diff`, `archive`, `gc`/`prune`, `verify-commit/tag`, `cherry-pick`, `merge --squash` / `--no-ff` |

---

### 🐧 **Linux — 194 commands**

| Category | Topics |
|----------|--------|
| **File System** | `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`, `find`, `locate`, `tree`, `tar`, `gzip`, `zip`, `xz`, `ln`, `stat`, `du`, `df` |
| **Text Processing** 🆕 | `grep` (recursive/invert/context/E), `sed` (replace/delete/print), `awk` (column/sum/pattern), `sort`, `uniq`, `cut`, `tr`, `tee`, `xargs`, `diff` |
| **System** 🆕 | `echo`, `env`/`export`, `source`, `alias`, `history`, `uname`, `lscpu`, `lsusb`, `lspci`, `apt`, `snap`, `useradd`/`usermod`, `groupadd`, `fdisk`, `lsblk`, `time`, `sleep`, `clear`, `shutdown`, `lsof`, `seq`, `sync`, `dd` |
| **Process** | `ps`, `top`, `htop`, `kill`, `killall`, `pkill`, `jobs`, `bg`/`fg`, `nohup`, `nice`/`renice`, `systemctl` (all), `journalctl`, `dmesg`, `uptime`, `free`, `vmstat`, `iostat`, `sar` |
| **Networking** | `ping`, `curl`, `wget`, `ip`, `ss`, `netstat`, `traceroute`, `nslookup`, `dig`, `whois`, `nc`, `telnet`, `ssh`, `scp`, `rsync`, `nmap`, `tcpdump` |
| **Permissions** | `chmod` (all forms), `chown`, `chgrp`, `umask`, `sudo`, `su`, `getfacl`/`setfacl`, `user`/`group` management, `crontab`, `screen`, `tmux` |

---

## Intelligent Search Engine

The V3 search engine understands developer intent using a **multi-stage search pipeline**:

| Stage | What it does |
|-------|-------------|
| **1. Exact Match** | Checks if query matches a snippet title or alias exactly |
| **2. Intent Map** | 300+ natural language mappings (`"sort vector"` → `sort`, `custom comparator`) |
| **3. Fuzzy Search** | Fuse.js-powered fuzzy matching with weighted keys (title×4 > aliases×3 > tags×3 > keywords×2) |
| **4. Prefix/Substring** | Matches prefix and substring patterns for partial queries |

| You type | It finds |
|----------|----------|
| `string to lower` | `tolower()`, `transform()`, `lowercase string` |
| `reverse vector` | `reverse()`, `reverse range`, `reverse array two pointers` |
| `remove duplicates` | `unique()`, `erase-remove idiom`, `set unique elements` |
| `sort pair by second` | `sort pair by second`, `custom comparator sort` |
| `binary search` | `binary_search()`, `lower_bound()`, `upper_bound()` |
| `split string` | `stringstream`, `getline`, `string split by delimiter` |
| `check if key exists` | `find()`, `count()`, `contains key` |
| `fast io` | `fast io`, `competitive programming setup` |
| `dijkstra` | `dijkstra algorithm`, `shortest path` |
| `semaphore` | `threading lock`, `mutex`, `semaphore` |

---

## Installation

### From VS Code Marketplace

1. Open Visual Studio Code
2. Go to Extensions (`Ctrl + Shift + X`)
3. Search for **OpenGuido**
4. Click **Install**
5. Reload VS Code if prompted

> **Direct link**: [marketplace.visualstudio.com/items?itemName=HarshBarnawa.openguido](https://marketplace.visualstudio.com/items?itemName=HarshBarnawa.openguido)

### From Website

Visit [**openguido.vercel.app**](https://openguido.vercel.app) to browse the full documentation, search snippets online, and learn more about OpenGuido before installing.

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
- **Preview Snippet**
- **Copy To Clipboard**
- **Insert Into Editor**

For Commands:
- **Preview Command**
- **Copy To Clipboard**

---

## Example Searches

```text
# Python
dict comprehension
list sort reverse
lambda map filter
async await gather
dataclass frozen
pandas read csv groupby
requests get json

# C++
vector sort
make_shared unique_ptr
lambda capture
unordered_map find
binary search lower_bound
ranges filter transform
co_yield generator
std::format
constexpr if

# Git
git rebase interactive
git stash pop
git bisect run
git submodule update --init

# Linux
grep -r recursive
sed replace in-place
awk print column
chmod 755
systemctl status
```

---

## Dataset Stats

| Language | Snippets | Files |
|----------|----------|-------|
| **C++** | 674+ | 23 |
| **Python** 🆕 | 194+ | 9 |
| **Git** | 96 | 2 |
| **Linux** | 194+ | 6 |
| **Total** | **1158+** | **40** |

---

## Version

Current Version: **3.0.0**

---

## What's New in V3

- **Python dataset** — 194+ snippets covering everything from basics to OOP, standard library, async, NumPy, and Pandas
- **Fuse.js fuzzy search** — intelligent weighted search with title > aliases > tags > keywords ranking
- **Intent map engine** — 300+ natural-language-to-snippet mappings
- **Linux expansion** — text processing (grep/sed/awk/sort) and system commands (apt/user/disk)
- **Git expansion** — 20+ advanced commands added (worktree, bisect run, commit --amend, log --grep)
- **C++ expansion** — templates, type traits, design patterns, CP patterns, C++20/23 features
- **Enhanced snippet metadata** — aliases, keywords, weight scores on every snippet

---

## Roadmap

Planned additions:
- **Java**
- **JavaScript / TypeScript**
- **Docker / Kubernetes**
- **SQL**
- **React**
- **Node.js**
- **Rust**
- **Go**
- **Documentation website** (Next.js / Vite)

---

## Author

**Harsh Barnawa**

---

## License

MIT License — see [LICENSE](LICENSE) for details.
