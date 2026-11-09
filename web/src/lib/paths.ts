/**
 * Application route and path helpers
 */

export function homePath(): string {
  return '/';
}

export function syllabusPath(): string {
  return '/syllabus';
}

export function learnPath(chapterId: string, sectionAnchor?: string): string {
  const base = `/learn/${chapterId}`;
  if (sectionAnchor) {
    return `${base}#${sectionAnchor}`;
  }
  return base;
}

export function pathsPath(mode?: string): string {
  return mode ? `/paths/${mode}` : '/paths';
}

export function practicePath(chapterId?: string): string {
  return chapterId ? `/practice/${chapterId}` : '/practice';
}

export function progressPath(): string {
  return '/progress';
}

export function notesPath(): string {
  return '/notes';
}

export function searchPath(query?: string): string {
  return query ? `/search?q=${encodeURIComponent(query)}` : '/search';
}
