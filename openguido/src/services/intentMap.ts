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
    'copy container':                     ['copy range'],

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
    'list directory':                     ['ls', 'ls -l', 'ls -a'],
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
