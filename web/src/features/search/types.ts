export interface SearchDocument {
  id: string;
  type: string;
  chapterId: string;
  sectionId: string | null;
  title: string;
  text: string;
  tags: string[];
  terms?: string[];
  difficulty: string | null;
  priority: string | null;
  anchor: string;
}

export interface SearchResult extends SearchDocument {
  score: number;
  snippet?: string;
  matchedTerms?: string[];
}

export type SearchTypeFilter =
  | 'all'
  | 'section'
  | 'theorem'
  | 'example'
  | 'exercise'
  | 'solution';

export interface SearchFilters {
  type: SearchTypeFilter;
  chapterId: string;
  priority: string;
  difficulty: string;
}

export type AliasMap = Record<string, string[]>;
