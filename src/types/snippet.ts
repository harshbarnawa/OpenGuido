export interface Snippet {
    // Original required fields
    title: string;
    type: string;
    tags: string[];
    description: string;
    language: string;
    code: string;

    // V3 additions — all optional for backward compatibility
    category?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    explanation?: string;

    // Search enhancements
    aliases?: string[];
    keywords?: string[];
    relatedSnippets?: { title: string; relationship: string }[];

    // Metadata
    metadata?: {
        searchCount?: number;
        lastUsed?: string;     // ISO date string
        dateAdded?: string;
        dateModified?: string;
        version?: string;
    };
}

/**
 * Wrapper returned by the enhanced search engine.
 * Carries match quality information alongside the snippet.
 */
export interface SnippetSearchResult {
    snippet: Snippet;
    score: number;
    matchedOn: 'title' | 'description' | 'tags' | 'aliases' | 'keywords' | 'code' | 'explanation';
    matchType: 'exact' | 'fuzzy' | 'alias' | 'prefix' | 'intent';
}

/**
 * Type guard: checks whether a snippet carries the full metadata
 * (category, difficulty, explanation).
 */
export function hasFullMetadata(snippet: Snippet): snippet is Required<Pick<Snippet, 'category' | 'difficulty' | 'explanation'>> & Snippet {
    return snippet.category !== undefined
        && snippet.difficulty !== undefined
        && snippet.explanation !== undefined;
}
