/**
 * Intent-based search mappings.
 *
 * Maps natural-language developer queries to the snippet titles/aliases
 * they are likely looking for. Allows queries like "string to lower" to
 * return tolower(), transform(), and ranges::transform().
 */
const INTENT_MAP: Record<string, string[]> = {
    // ── String case conversion ──────────────────────────────────────────
    'convert string to lowercase':        ['tolower', 'transform', 'lowercase string'],
    'string to lower':                    ['tolower', 'transform', 'lowercase string'],
    'make string lowercase':              ['tolower', 'transform'],
    'lowercase string':                   ['tolower', 'transform'],
    'convert string to uppercase':        ['toupper', 'transform', 'uppercase string'],
    'string to upper':                    ['toupper', 'transform', 'uppercase string'],
    'make string uppercase':              ['toupper', 'transform'],
    'uppercase string':                   ['toupper', 'transform'],

    // ── Searching / finding ─────────────────────────────────────────────
    'find in vector':                     ['find', 'std::find', 'binary search'],
    'find element':                       ['find', 'std::find'],
    'search element':                     ['find', 'binary search'],
    'check if element exists':            ['find', 'binary_search', 'count'],
    'check if key exists':                ['find', 'count', 'contains'],
    'does key exist':                     ['count', 'find', 'contains'],
    'contains value':                     ['count', 'find'],
    'first occurrence':                   ['find first occurrence', 'lower_bound'],
    'last occurrence':                    ['find last occurrence', 'upper_bound'],

    // ── Binary search ───────────────────────────────────────────────────
    'binary search':                      ['binary_search', 'lower_bound', 'upper_bound', 'binary search iterative'],
    'binary search sorted':               ['binary_search', 'lower_bound'],
    'lower bound':                        ['lower bound', 'lower_bound', 'first greater equal'],
    'upper bound':                        ['upper bound', 'upper_bound', 'first greater'],
    'equal range':                        ['equal range', 'equal_range'],

    // ── Sorting ─────────────────────────────────────────────────────────
    'sort array':                         ['sort', 'std::sort', 'sort ascending'],
    'sort vector':                        ['sort', 'std::sort', 'sort ascending'],
    'sort in ascending order':            ['sort ascending', 'std::sort'],
    'sort in descending order':           ['sort descending', 'greater'],
    'sort reverse order':                 ['sort descending', 'reverse'],
    'sort custom':                        ['custom sort comparator', 'custom comparator sort'],
    'custom sort':                        ['custom sort comparator', 'custom comparator sort'],
    'sort pairs by second':               ['sort pair by second', 'custom comparator sort'],
    'sort by value':                      ['sort pair by second', 'custom comparator sort'],

    // ── Reversing ───────────────────────────────────────────────────────
    'reverse string':                     ['reverse string', 'std::reverse', 'reverse range'],
    'reverse array':                      ['reverse range', 'reverse array two pointers'],
    'reverse container':                  ['reverse range', 'std::reverse'],

    // ── Accumulate / sum ───────────────────────────────────────────────
    'sum of elements':                    ['accumulate sum', 'prefix sum build'],
    'sum of vector':                      ['accumulate sum'],
    'calculate sum':                      ['accumulate sum'],
    'total of array':                     ['accumulate sum', 'prefix sum build'],
    'range sum':                          ['range sum using prefix', 'prefix sum build'],
    'cumulative sum':                     ['prefix sum build', 'prefix sum template'],

    // ── Min / Max ───────────────────────────────────────────────────────
    'largest element':                    ['max element', 'max element vector'],
    'maximum element':                    ['max element', 'max element vector'],
    'smallest element':                   ['min element', 'min element vector'],
    'minimum element':                    ['min element', 'min element vector'],
    'find max':                           ['max element', 'max element vector'],
    'find min':                           ['min element', 'min element vector'],

    // ── Unique / duplicates ─────────────────────────────────────────────
    'remove duplicates':                  ['unique elements', 'unique sorted vector', 'erase remove idiom'],
    'unique values':                      ['unique elements', 'set unique elements'],
    'deduplicate':                        ['unique elements', 'unique sorted vector'],
    'count frequency':                    ['frequency map template', 'map frequency count', 'unordered map frequency count'],
    'count occurrences':                  ['count occurrences', 'frequency map template'],

    // ── String manipulation ─────────────────────────────────────────────
    'split string':                       ['string stringstream', 'string getline'],
    'tokenize string':                    ['string stringstream', 'string getline'],
    'concatenate strings':                ['string concatenation', 'string append'],
    'join strings':                       ['string concatenation', 'string append'],
    'check palindrome':                   ['string palindrome check', 'palindrome string check'],
    'string contains':                    ['string find', 'string starts with'],
    'check prefix':                       ['string starts with'],
    'check suffix':                       ['string ends with'],
    'trim string':                        ['string remove spaces'],
    'remove spaces':                      ['string remove spaces', 'erase remove idiom'],
    'string to int':                      ['string stoi'],
    'string to number':                   ['string stoi', 'string stol', 'string stod'],
    'number to string':                   ['string to string'],
    'character count':                    ['string character count', 'count occurrences'],
    'compare strings':                    ['string compare', 'string lexicographical compare'],
    'anagram check':                      ['string anagram check', 'string sort'],
    'extract substring':                  ['string substr'],

    // ── Containers ──────────────────────────────────────────────────────
    'iterate over map':                   ['map traverse', 'range based for loop'],
    'loop over map':                      ['map traverse'],
    'iterate set':                        ['set traverse', 'range based for loop'],
    'iterate vector':                     ['vector range based loop', 'vector index loop'],
    'iterate list':                       ['traverse linked list', 'range based for loop'],
    'vector to set':                      ['set unique elements', 'set insert range'],
    'convert vector to set':              ['set unique elements', 'set insert range'],
    'map keys to list':                   ['map traverse'],
    'first and last element':             ['vector front', 'vector back', 'vector front'],

    // ── Data structures ─────────────────────────────────────────────────
    'linked list':                        ['singly linked list node', 'insert at beginning linked list', 'traverse linked list'],
    'binary tree':                        ['binary tree node', 'preorder traversal', 'inorder traversal', 'level order traversal'],
    'stack':                              ['stack declaration', 'stack push', 'stack top', 'stack pop'],
    'queue':                              ['queue declaration', 'queue push', 'queue front', 'queue pop'],
    'priority queue':                     ['priority queue declaration', 'priority queue push'],
    'min heap':                           ['min heap declaration', 'min heap using priority queue'],
    'max heap':                           ['priority queue declaration', 'heap using priority queue'],
    'hash map':                           ['unordered map declaration', 'unordered map insert'],
    'hash set':                           ['unordered set declaration', 'unordered set insert'],
    'dictionary':                         ['map declaration', 'unordered map declaration'],

    // ── Graph algorithms ────────────────────────────────────────────────
    'graph traversal':                    ['graph dfs', 'graph bfs'],
    'depth first search':                 ['graph dfs'],
    'breadth first search':               ['graph bfs'],
    'shortest path':                      ['dijkstra algorithm', 'bellman ford algorithm'],
    'minimum spanning tree':              ['kruskal algorithm'],
    'union find':                         ['dsu find with path compression', 'dsu union by rank'],
    'topological sort':                   ['topological sort dfs'],
    'cycle detection':                    ['detect cycle floyd algorithm', 'cycle detection undirected graph'],

    // ── Dynamic programming ─────────────────────────────────────────────
    'dynamic programming':                ['0 1 knapsack dp', 'longest common subsequence', 'longest increasing subsequence dp'],
    'knapsack':                           ['0 1 knapsack dp'],
    'longest common subsequence':         ['longest common subsequence'],
    'lis':                                ['longest increasing subsequence dp', 'lis binary search'],
    'coin change':                        ['coin change dp'],
    'fibonacci':                          ['fibonacci dp'],
    'subset sum':                         ['subset sum dp'],

    // ── Number theory ───────────────────────────────────────────────────
    'prime numbers':                      ['sieve of eratosthenes', 'prime check'],
    'check prime':                        ['prime check'],
    'greatest common divisor':            ['gcd euclidean algorithm', '__gcd'],
    'least common multiple':              ['lcm formula'],
    'power':                              ['fast power binary exponentiation'],
    'modular exponentiation':             ['modular exponentiation', 'mod power'],
    'binary exponentiation':              ['fast power binary exponentiation'],
    'mod power':                          ['modular exponentiation'],

    // ── Bit manipulation ────────────────────────────────────────────────
    'count set bits':                     ['count set bits', '__builtin_popcount'],
    'check bit':                          ['check kth bit'],
    'set bit':                            ['set kth bit'],
    'clear bit':                          ['clear kth bit'],
    'toggle bit':                         ['toggle kth bit'],

    // ── I/O ─────────────────────────────────────────────────────────────
    'fast input output':                  ['fast io'],
    'fast io':                            ['fast io'],
    'competitive programming setup':      ['fast io'],
    'read input fast':                    ['fast io'],
    'formatted output':                   ['formatted output', 'fixed setprecision'],

    // ── Algorithms meta ─────────────────────────────────────────────────
    'two pointer':                        ['two pointer technique', 'two sum sorted'],
    'sliding window':                     ['fixed size window sum', 'variable size window', 'sliding window maximum deque'],
    'kadane algorithm':                   ['kadane algorithm'],
    'maximum subarray':                   ['kadane algorithm'],
    'next permutation':                   ['next permutation'],
    'merge sort':                         ['merge sort', 'merge sorted ranges'],
    'quick sort':                         ['quick sort'],
    'counting sort':                      ['counting sort'],
    'sieve':                              ['sieve of eratosthenes'],
    'flood fill':                         ['flood fill dfs'],
    'number of islands':                  ['number of islands'],
    'permutation generation':             ['permutation backtracking', 'next permutation'],
    'combination generation':             ['combination backtracking'],
    'n queens':                           ['n queens backtracking'],

    // ── Segment tree / Fenwick ──────────────────────────────────────────
    'segment tree':                       ['segment tree build', 'segment tree query', 'segment tree update'],
    'range query':                        ['segment tree query', 'fenwick tree query'],
    'fenwick tree':                       ['fenwick tree update', 'fenwick tree query'],
    'binary indexed tree':                ['fenwick tree update', 'fenwick tree query'],

    // ── C++ STL specific ────────────────────────────────────────────────
    'erase remove idiom':                 ['erase remove idiom', 'unique elements'],
    'sort and remove duplicates':         ['unique sorted vector', 'unique elements'],
    'prefix sum':                         ['prefix sum build', 'prefix sum template', 'prefix sum array'],
    'difference array':                   ['difference array template', 'difference array range update'],
    'coordinate compression':             ['coordinate compression'],
    'merge two sorted':                   ['merge two sorted arrays', 'merge sorted ranges'],
    'rotate array':                       ['rotate range'],
    'partial sort':                       ['partial sort'],
    'nth element':                        ['nth element'],
    'is sorted check':                    ['is sorted'],
    'partition array':                    ['partition'],
    'fill with values':                   ['iota initialization', 'vector assign'],

    // ── Templates & Metaprogramming ───────────────────────────────────────
    'template function':                  ['function template', 'template function'],
    'generic function':                   ['function template', 'auto keyword'],
    'class template':                     ['class template', 'template class'],
    'generic class':                      ['class template', 'template class'],
    'templates for beginners':            ['function template', 'class template', 'template argument deduction'],
    'variadic template':                  ['variadic template function', 'sizeof variadic pack', 'variadic class template'],
    'variadic function':                  ['variadic template function', 'fold expression unary'],
    'parameter pack':                     ['variadic template function', 'sizeof variadic pack'],
    'template specialization':            ['function template specialization', 'class template specialization', 'partial template specialization'],
    'type traits':                        ['type traits is same', 'type traits categories', 'type traits type modifications'],
    'check type at compile time':         ['type traits is same', 'type traits categories'],
    'SFINAE':                             ['enable if sfinae', 'void t detection idiom'],
    'enable if':                          ['enable if sfinae'],
    'detect member function':             ['void t detection idiom'],
    'has member':                         ['void t detection idiom', 'decltype'],
    'CRTP':                               ['crtp pattern', 'template template crtp mixin'],
    'static polymorphism':                ['crtp pattern', 'template template crtp mixin'],
    'compile time polymorphism':          ['crtp pattern'],
    'constexpr if':                       ['if constexpr'],
    'common type':                        ['common type', 'common_type'],
    'conditional type':                   ['conditional type selector', 'conditional_t'],
    'template alias':                     ['alias template', 'template using'],
    'template deduction':                 ['template argument deduction', 'auto keyword'],
    'CTAD':                               ['template argument deduction', 'class template'],
    'class template argument deduction':  ['template argument deduction'],
    'non-type template':                  ['non type template parameter'],
    'template template':                  ['template template parameter', 'template template function', 'template template variadic'],
    'integer sequence':                   ['integer sequence', 'index_sequence'],
    'compile time sequence':              ['integer sequence'],
    'static assert':                      ['static assert with templates', 'assert macro', 'static_assert'],
    'compile time assert':                ['static assert with templates', 'assert macro'],
    'deducing this':                      ['mutable template lambda'],
    'mixin pattern':                      ['template template crtp mixin'],
    'type transformations':               ['type traits type modifications', 'remove_const', 'decay'],
    'underlying type':                    ['underlying type', 'to_underlying'],
    'detection idiom':                    ['void t detection idiom', 'has value type'],

    // ── Preprocessor ──────────────────────────────────────────────────────
    'include header':                     ['hash include directive', '#include'],
    'what is #include':                   ['hash include directive'],
    'define constant':                    ['hash define macro', '#define macro'],
    'macro definition':                   ['hash define macro', 'function like macro'],
    'function macro':                     ['function like macro', 'varargs macro'],
    'include guard':                      ['include guards', 'pragma once'],
    'header guard':                       ['include guards'],
    'pragma once':                        ['include guards'],
    'conditional compilation':            ['ifdef else endif conditional compilation', 'hash if preprocessor expression'],
    'platform detection':                 ['ifdef else endif conditional compilation'],
    'compiler detection':                 ['ifdef else endif conditional compilation'],
    'predefined macros':                  ['predefined macros', '__LINE__', '__FILE__'],
    'stringify':                          ['hash and hash hash operators', '# operator'],
    'token pasting':                      ['hash and hash hash operators', '## operator'],
    'concatenate tokens':                 ['hash and hash hash operators'],
    'pragma':                             ['pragma directive', '#pragma'],
    'pack struct':                        ['pragma directive', '#pragma pack'],
    '#error directive':                   ['line and error directives', '#error'],

    // ── Namespaces ────────────────────────────────────────────────────────
    'namespace cpp':                      ['namespace declaration', 'using declaration'],
    'create namespace':                   ['namespace declaration'],
    'using namespace':                    ['using declaration', 'namespace declaration'],
    'nested namespace':                   ['nested namespaces', 'namespace hierarchy'],
    'anonymous namespace':                ['anonymous namespace', 'unnamed namespace'],
    'unnamed namespace':                  ['anonymous namespace'],
    'inline namespace':                   ['inline namespace'],
    'namespace alias':                    ['using declaration', 'nested namespaces'],

    // ── Storage classes ───────────────────────────────────────────────────
    'static variable':                    ['static storage class'],
    'static keyword':                     ['static storage class'],
    'static local variable':              ['static storage class'],
    'extern keyword':                     ['extern storage class'],
    'external linkage':                   ['extern storage class'],
    'global variable':                    ['extern storage class'],
    'mutable keyword':                    ['mutable storage class'],
    'thread local storage':               ['thread local storage class', 'thread_local'],
    'TLS':                                ['thread local storage class'],

    // ── Type casting ──────────────────────────────────────────────────────
    'static_cast':                        ['static cast', 'type conversion'],
    'dynamic_cast':                       ['dynamic cast', 'runtime type cast'],
    'RTTI':                               ['dynamic cast', 'typeid'],
    'reinterpret_cast':                   ['reinterpret cast', 'bitwise cast'],
    'const_cast':                         ['const cast', 'remove const'],
    'remove constness':                   ['const cast'],
    'C-style cast':                       ['c style cast'],
    'bit_cast':                           ['bit cast'],
    'type punning':                       ['bit cast', 'reinterpret cast'],
    'safe type punning':                  ['bit cast'],

    // ── Enums ─────────────────────────────────────────────────────────────
    'enum cpp':                           ['enum declaration plain', 'enum class scoped enum'],
    'plain enum':                         ['enum declaration plain'],
    'unscoped enum':                      ['enum declaration plain'],

    // ── Chrono / time ────────────────────────────────────────────────────
    'measure time':                       ['chrono measure elapsed time', 'chrono duration', 'chrono time point'],
    'benchmark code':                     ['chrono measure elapsed time'],
    'execution time':                     ['chrono measure elapsed time'],
    'timer cpp':                          ['chrono measure elapsed time'],
    'current time':                       ['chrono time point'],
    'time point':                         ['chrono time point'],
    'date arithmetic':                    ['chrono date'],

    // ── Random numbers ───────────────────────────────────────────────────
    'random number':                      ['random number generator', 'random weighted distribution'],
    'random int':                         ['random number generator'],
    'mt19937':                            ['random number generator'],
    'mersenne twister':                   ['random number generator'],
    'generate random':                    ['random number generator'],
    'shuffle vector':                     ['random shuffle vector'],
    'weighted random':                    ['random weighted distribution'],

    // ── Regex ────────────────────────────────────────────────────────────
    'regex cpp':                          ['regex search', 'regex match all', 'regex replace'],
    'regular expression':                 ['regex search', 'regex match all'],
    'regex search':                       ['regex search'],
    'replace with regex':                 ['regex replace'],
    'regex validate':                     ['regex validation'],
    'validate email':                     ['regex validation'],

    // ── Filesystem ───────────────────────────────────────────────────────
    'filesystem cpp':                     ['filesystem path', 'filesystem directory iteration', 'filesystem file operations'],
    'list directory':                     ['filesystem directory iteration', 'ls', 'ls -l', 'ls -a'],
    'create directory':                   ['filesystem file operations'],
    'file size':                          ['filesystem file info'],
    'file exists':                        ['filesystem file info', 'check if file exists c++17'],
    'symlink':                            ['filesystem symlink'],
    'disk space':                         ['filesystem disk space'],
    'temp directory':                     ['filesystem disk space'],

    // ── Advanced containers ──────────────────────────────────────────────
    'std::array':                         ['array declaration', 'array iterators and algorithms'],
    'fixed size array':                   ['array declaration'],
    'std::list':                          ['list declaration and operations'],
    'forward list':                       ['forward list'],
    'singly linked list':                 ['forward list', 'singly linked list node'],
    'multiset':                           ['multiset declaration'],
    'multimap':                           ['multimap declaration'],
    'unordered multiset':                 ['unordered multiset'],
    'unordered multimap':                 ['unordered multimap'],
    'deque':                              ['deque operations', 'deque sliding window max'],
    'emplace_back':                       ['emplace vs insert'],
    'try_emplace':                        ['emplace vs insert'],
    'initializer list':                   ['initializer list'],
    'braced initialization':              ['initializer list'],
    'priority queue custom comparator':   ['priority queue custom comparator full'],

    // ── Utilities / Numeric ──────────────────────────────────────────────
    'move semantics':                     ['std move', 'move constructor', 'move assignment operator'],
    'std::move':                          ['std move'],
    'perfect forwarding':                 ['std forward'],
    'std::forward':                       ['std forward'],
    'std::exchange':                      ['std exchange'],
    'std::clamp':                         ['std clamp'],
    'constrain value':                    ['std clamp'],
    'clamp between':                      ['std clamp'],
    'std::midpoint':                      ['std midpoint'],
    'safe midpoint':                      ['std midpoint'],
    'std::lerp':                          ['std lerp'],
    'linear interpolation':               ['std lerp'],
    'std::function':                      ['std function type erasure'],
    'function wrapper':                   ['std function type erasure'],
    'store lambda':                       ['std function type erasure'],
    'callback':                           ['std function type erasure'],
    'std::bind':                          ['std bind and placeholders'],
    'partial function':                   ['std bind and placeholders'],
    'std::ref':                           ['std ref and creff'],
    'reference_wrapper':                  ['std ref and creff'],
    'typeid':                             ['typeid operator', 'dynamic cast'],
    'get type info':                      ['typeid operator'],
    'alignas':                            ['alignas and alignof'],
    'alignment':                          ['alignas and alignof'],
    'placement new':                      ['placement new'],
    'construct in buffer':                ['placement new'],
    'std::reduce':                        ['std reduce'],
    'parallel reduce':                    ['std reduce'],
    'transform_reduce':                   ['transform reduce'],
    'inclusive_scan':                     ['partial sum and scan'],
    'exclusive_scan':                     ['partial sum and scan'],
    'adjacent_difference':                ['adjacent difference'],
    'inner_product':                      ['inner product'],
    'dot product':                        ['inner product'],
    'std::iota':                          ['iota', 'iota initialization'],
    'fill sequence':                      ['iota', 'iota initialization'],
    'output formatting':                  ['iomanip advanced formatting'],
    'iomanip':                            ['iomanip advanced formatting'],
    'setw setfill':                       ['iomanip advanced formatting'],

    // ── Git commands ────────────────────────────────────────────────────
    'initialize repo':                    ['git init'],
    'clone repository':                   ['git clone'],
    'check status':                       ['git status'],
    'stage changes':                      ['git add file', 'git add all'],
    'commit':                             ['git commit', 'git commit with message'],
    'view history':                       ['git log', 'git log one line'],
    'create branch':                      ['git create branch', 'git checkout branch'],
    'switch branch':                      ['git switch branch', 'git checkout branch'],
    'merge':                              ['git merge branch'],
    'push to remote':                     ['git push', 'git push new branch'],
    'pull from remote':                   ['git pull'],
    'discard changes':                    ['git restore file'],
    'unstage file':                       ['git restore staged'],
    'undo commit':                        ['git reset soft', 'git reset hard', 'git revert commit'],
    'delete branch':                      ['git branch delete'],
    'rename branch':                      ['git branch rename'],
    'view changes':                       ['git diff'],
    'stash changes':                      ['git stash'],
    'rebase':                             ['git rebase'],
    'cherry pick':                        ['git cherry pick'],

    // ── Linux commands ─────────────────────────────────────────────────
    'current directory':                  ['pwd'],
    'change folder':                      ['cd', 'cd ..'],
    'create folder':                      ['mkdir', 'mkdir -p'],
    'delete file':                        ['rm', 'rm -r'],
    'copy file':                          ['cp', 'cp -r'],
    'move file':                          ['mv'],
    'rename file':                        ['mv rename file'],
    'find file':                          ['find file', 'locate file'],
    'view file contents':                 ['cat file', 'less file', 'more file'],
    'file permissions':                   ['chmod 755', 'chmod 777', 'chown'],
    'disk usage':                         ['du', 'df'],
    'compress archive':                   ['tar', 'gzip', 'zip'],
    'network connectivity':               ['ping host', 'curl request'],
    'dns lookup':                         ['nslookup', 'dig dns query'],
    'ssh login':                          ['ssh login'],
    'process list':                       ['ps', 'ps aux', 'top', 'htop'],
    'kill process':                       ['kill', 'killall', 'pkill'],
    'manage service':                     ['systemctl start', 'systemctl stop', 'systemctl status'],
};

/**
 * Normalize a user query: lowercase, trim, collapse whitespace.
 */
export function normalizeQuery(query: string): string {
    return query.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Attempt to resolve a natural-language query to snippet titles/aliases
 * via the intent map.
 *
 * Returns an array of matched titles/aliases, or an empty array if no
 * intent match is found.
 */
export function matchIntent(query: string): string[] {
    const normalized = normalizeQuery(query);

    // Try full query first
    if (INTENT_MAP[normalized]) {
        return INTENT_MAP[normalized];
    }

    // Try stripping common prefixes
    const prefixes = ['how to ', 'how do i ', 'how can i ', 'what is ', 'whats ',
        'show me ', 'find ', 'search ', 'get ', 'syntax for ',
        'syntax of ', 'example of ', 'example for '];

    for (const prefix of prefixes) {
        if (normalized.startsWith(prefix)) {
            const stripped = normalized.slice(prefix.length);
            if (INTENT_MAP[stripped]) {
                return INTENT_MAP[stripped];
            }
        }
    }

    return [];
}

export default INTENT_MAP;
