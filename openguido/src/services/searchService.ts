import Fuse from 'fuse.js';

import cppBasics from '../data/cpp/basics.json';
import cppStl from '../data/cpp/stl.json';
import cppOop from '../data/cpp/oop.json';
import cppDsa from '../data/cpp/dsa.json';
import cppAlgorithms from '../data/cpp/algorithms.json';

import cppString from '../data/cpp/string.json';
import cppVector from '../data/cpp/vector.json';
import cppMap from '../data/cpp/map.json';
import cppSet from '../data/cpp/set.json';
import cppUnorderedMap from '../data/cpp/unordered_map.json';
import cppUnorderedSet from '../data/cpp/unordered_set.json';
import cppPriorityQueue from '../data/cpp/priority_queue.json';
import cppModern from '../data/cpp/modern_cpp.json';
import cppTemplates from '../data/cpp/templates.json';
import cppPreprocessor from '../data/cpp/preprocessor.json';

// Modern C++ topics
import cppExceptions from '../data/cpp/modern/exceptions.json';
import cppFileIo from '../data/cpp/modern/file-io.json';
import cppConcurrency from '../data/cpp/modern/concurrency.json';
import cppOptionalVariantAny from '../data/cpp/modern/optional-variant-any.json';

import gitBasic from '../data/git/basic.json';
import gitAdvanced from '../data/git/advanced.json';

import linuxFileSystem from '../data/linux/file-system.json';
import linuxProcess from '../data/linux/process.json';
import linuxNetworking from '../data/linux/networking.json';
import linuxPermissions from '../data/linux/permissions.json';

import { Snippet, SnippetSearchResult } from '../types/snippet';
import { normalizeQuery, matchIntent } from './intentMap';

// ── Snippet registry ─────────────────────────────────────────────────────

const snippets: Snippet[] = [
    ...cppBasics,
    ...cppStl,
    ...cppOop,
    ...cppDsa,
    ...cppAlgorithms,

    ...cppString,
    ...cppVector,
    ...cppMap,
    ...cppSet,
    ...cppUnorderedMap,
    ...cppUnorderedSet,
    ...cppPriorityQueue,
    ...cppModern,
    ...cppTemplates,
    ...cppPreprocessor,

    // Modern C++
    ...cppExceptions,
    ...cppFileIo,
    ...cppConcurrency,
    ...cppOptionalVariantAny,

    ...gitBasic,
    ...gitAdvanced,

    ...linuxFileSystem,
    ...linuxProcess,
    ...linuxNetworking,
    ...linuxPermissions,
];

// ── Lazy-loaded indices ─────────────────────────────────────────────────

let fuseInstance: Fuse<Snippet> | null = null;
let exactTitleMap: Map<string, Snippet[]> = new Map();
let exactAliasMap: Map<string, Snippet[]> = new Map();

/** Fuse.js configuration – weighted towards title, aliases, and tags. */
const FUSE_OPTIONS: Fuse.IFuseOptions<Snippet> = {
    keys: [
        { name: 'title', weight: 4 },
        { name: 'aliases', weight: 3 },
        { name: 'tags', weight: 3 },
        { name: 'keywords', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'explanation', weight: 1 },
        { name: 'category', weight: 0.5 },
        { name: 'code', weight: 0.3 },
    ],
    threshold: 0.4,
    distance: 100,
    includeScore: true,
    minMatchCharLength: 2,
    useExtendedSearch: true,
};

/**
 * Build all in-memory indices. Called lazily on first search, then cached.
 */
function ensureIndices(): void {
    if (fuseInstance) { return; }

    fuseInstance = new Fuse(snippets, FUSE_OPTIONS);

    for (const snippet of snippets) {
        // Title index
        const titleKey = snippet.title.toLowerCase();
        if (!exactTitleMap.has(titleKey)) {
            exactTitleMap.set(titleKey, []);
        }
        exactTitleMap.get(titleKey)!.push(snippet);

        // Alias index
        if (snippet.aliases) {
            for (const alias of snippet.aliases) {
                const aliasKey = alias.toLowerCase();
                if (!exactAliasMap.has(aliasKey)) {
                    exactAliasMap.set(aliasKey, []);
                }
                exactAliasMap.get(aliasKey)!.push(snippet);
            }
        }
    }
}

// ── Search helpers ──────────────────────────────────────────────────────

/** Step 1: Exact match on title or aliases. */
function searchExact(normalized: string): SnippetSearchResult[] {
    const results: SnippetSearchResult[] = [];

    // Title exact match
    if (exactTitleMap.has(normalized)) {
        for (const s of exactTitleMap.get(normalized)!) {
            results.push({
                snippet: s,
                score: 1.0,
                matchedOn: 'title',
                matchType: 'exact',
            });
        }
    }

    // Alias exact match
    if (exactAliasMap.has(normalized)) {
        for (const s of exactAliasMap.get(normalized)!) {
            // Avoid duplicates when alias == title
            if (s.title.toLowerCase() !== normalized) {
                results.push({
                    snippet: s,
                    score: 1.0,
                    matchedOn: 'aliases',
                    matchType: 'alias',
                });
            }
        }
    }

    return results;
}

/** Step 2: Intent-based match via the intent map. */
function searchIntent(normalized: string): SnippetSearchResult[] {
    const resolved = matchIntent(normalized);
    if (resolved.length === 0) { return []; }

    const seen = new Set<string>();
    const results: SnippetSearchResult[] = [];

    for (const target of resolved) {
        const targetLower = target.toLowerCase();
        // Try title match first, then alias match
        const titleHit = exactTitleMap.get(targetLower);
        if (titleHit) {
            for (const s of titleHit) {
                if (!seen.has(s.title)) {
                    seen.add(s.title);
                    results.push({
                        snippet: s,
                        score: 0.85,
                        matchedOn: 'title',
                        matchType: 'intent',
                    });
                }
            }
        }
        const aliasHit = exactAliasMap.get(targetLower);
        if (aliasHit) {
            for (const s of aliasHit) {
                if (!seen.has(s.title)) {
                    seen.add(s.title);
                    results.push({
                        snippet: s,
                        score: 0.85,
                        matchedOn: 'aliases',
                        matchType: 'intent',
                    });
                }
            }
        }
    }

    return results;
}

/** Step 3: Fuse.js fuzzy search. */
function searchFuzzy(query: string): SnippetSearchResult[] {
    if (!fuseInstance) { return []; }
    const raw = fuseInstance.search(query);
    return raw.map(result => ({
        snippet: result.item,
        score: result.score !== undefined ? 1 - result.score : 0.5,
        matchedOn: 'title' as const,
        matchType: 'fuzzy' as const,
    }));
}

/** Step 4: Prefix/substring search against title + aliases. */
function searchPrefix(normalized: string): SnippetSearchResult[] {
    const seen = new Set<string>();
    const results: SnippetSearchResult[] = [];

    for (const snippet of snippets) {
        if (seen.has(snippet.title)) { continue; }

        // Prefix match on title
        if (snippet.title.toLowerCase().startsWith(normalized)
            && snippet.title.toLowerCase() !== normalized) {
            seen.add(snippet.title);
            results.push({
                snippet,
                score: 0.6,
                matchedOn: 'title',
                matchType: 'prefix',
            });
            continue;
        }

        // Prefix match on aliases
        if (snippet.aliases) {
            for (const alias of snippet.aliases) {
                if (alias.toLowerCase().startsWith(normalized)) {
                    seen.add(snippet.title);
                    results.push({
                        snippet,
                        score: 0.55,
                        matchedOn: 'aliases',
                        matchType: 'prefix',
                    });
                    break;
                }
            }
        }
    }

    return results;
}

/** Merge & deduplicate results, keeping the highest score per snippet. */
function rankResults(...batches: SnippetSearchResult[][]): SnippetSearchResult[] {
    const best = new Map<string, SnippetSearchResult>();

    for (const batch of batches) {
        for (const result of batch) {
            const existing = best.get(result.snippet.title);
            if (!existing || result.score > existing.score) {
                best.set(result.snippet.title, result);
            }
        }
    }

    return Array.from(best.values()).sort((a, b) => b.score - a.score);
}

/**
 * Access the full snippet registry (for stats / external use).
 */
export function getAllSnippets(): Snippet[] {
    return snippets;
}

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Legacy search function — maintained for backward compatibility.
 * Internally delegates to the enhanced pipeline.
 *
 * Returns snippets whose title, description, or tags contain the query
 * string (case-insensitive).
 */
export function searchSnippets(query: string): Snippet[] {
    const normalized = normalizeQuery(query);
    if (!normalized) { return []; }

    return snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(normalized) ||
        snippet.description.toLowerCase().includes(normalized) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(normalized))
    );
}

/**
 * Enhanced V3 search — multi-strategy pipeline.
 *
 * Chains exact → intent → fuzzy → prefix, then ranks by score.
 */
export function searchSnippetsEnhanced(
    query: string,
    options?: { maxResults?: number }
): SnippetSearchResult[] {
    const normalized = normalizeQuery(query);
    if (!normalized) { return []; }

    ensureIndices();

    const maxResults = options?.maxResults ?? 30;

    const exact = searchExact(normalized);
    if (exact.length > 0) {
        // If we have exact matches, still run intent + fuzzy for enrichment
        const intent = searchIntent(normalized);
        const fuzzy = searchFuzzy(query);
        const ranked = rankResults(exact, intent, fuzzy);
        return ranked.slice(0, maxResults);
    }

    const intent = searchIntent(normalized);
    const fuzzy = searchFuzzy(query);
    const prefix = searchPrefix(normalized);

    const ranked = rankResults(intent, fuzzy, prefix);
    return ranked.slice(0, maxResults);
}
