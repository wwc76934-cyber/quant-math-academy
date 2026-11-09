/**
 * Content Types for Quant Math Academy
 * Aligned with T03 content generation schema.
 */

export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';
export type DifficultyLevel = 'D1' | 'D2' | 'D3' | 'D4' | 'D5';

export interface BookSectionItem {
  id: string;
  number: string;
  title: string;
  anchor: string;
  difficulty: DifficultyLevel | null;
  priority: PriorityLevel | null;
  minutes: number | null;
}

export interface ChapterStats {
  sections: number;
  environments: number;
  displayEquations: number;
  taggedEquations: number;
  equations: number;
  exercises: number;
  htmlBytes: number;
}

export interface BookChapter {
  id: string;
  number: number;
  label: string;
  title: string;
  displayTitle: string;
  slug: string;
  pilot: boolean;
  metaStatus: string;
  sectionCount: number;
  exerciseCount: number;
  stats: ChapterStats;
  sections: BookSectionItem[];
}

export interface BookPart {
  id: string;
  order: number;
  title: string;
  chapterIds: string[];
}

export interface Book {
  schemaVersion: number;
  title: string;
  subtitle: string;
  parts: BookPart[];
  chapters: BookChapter[];
  pilotChapterIds: string[];
}

export interface SubsectionItem {
  id: string;
  number: string;
  title: string;
  anchor: string;
}

export interface SectionMeta {
  difficulty?: DifficultyLevel | number | null;
  priority?: PriorityLevel | null;
  minutes?: number | null;
  examFrequency?: 'high' | 'medium' | 'low' | 'none' | null;
  prerequisites?: Array<string | { id: string; strength?: 'required' | 'helpful' }>;
  coreConcepts?: string[];
  related?: string[];
  applications?: string[];
  rationale?: string;
  learningObjective?: string;
}

export interface SectionData {
  id: string;
  number: string;
  title: string;
  anchor: string;
  htmlPath: string;
  htmlBytes: number;
  subsections: SubsectionItem[];
  meta: SectionMeta | null;
  exerciseIds: string[];
}

export interface EnvironmentItem {
  id: string;
  kind: string;
  number: string;
  title?: string;
  sectionId: string;
  anchor: string;
}

export interface EquationItem {
  id: string;
  tag?: string;
  number?: string;
  sectionId: string;
  latex?: string;
  anchor?: string;
}

export interface ChapterData {
  schemaVersion: number;
  chapterId: string;
  number: number;
  label: string;
  title: string;
  displayTitle: string;
  pilot: boolean;
  metaStatus: string;
  introHtml: string;
  summaryHtml: string;
  sections: SectionData[];
  exerciseCount: number;
  exercisesPath: string;
  environmentIndex: EnvironmentItem[];
  equationIndex: EquationItem[];
  stats: ChapterStats;
}

export interface ExerciseItem {
  id: string;
  number: number;
  sectionId: string | null;
  questionHtml: string;
  solutionHtml: string;
}

export interface ExerciseData {
  schemaVersion: number;
  chapterId: string;
  exerciseCount: number;
  exercises: ExerciseItem[];
}
