/**
 * Learning Paths Data Loader with caching
 */

import { PathsFile, PathData } from './types';

let cachedPaths: PathsFile | null = null;
let inflightPromise: Promise<PathsFile> | null = null;

export function clearPathsCache(): void {
  cachedPaths = null;
  inflightPromise = null;
}

export async function loadPathsData(): Promise<PathsFile> {
  if (cachedPaths) return cachedPaths;
  if (inflightPromise) return inflightPromise;

  inflightPromise = (async () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const url = `${cleanBase}content/paths.json`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`加载学习路径数据失败 (${res.status} ${res.statusText})`);
    }

    const data = (await res.json()) as PathsFile;
    cachedPaths = data;
    inflightPromise = null;
    return data;
  })();

  return inflightPromise;
}

/**
 * Normalizes user legacy path id ('a', 'b', 'c', 'free') to canonical path id.
 */
export function normalizePathId(id?: string): string {
  if (!id) return 'free';
  const lower = id.toLowerCase();
  if (lower === 'a' || lower === 'internship') return 'internship';
  if (lower === 'b' || lower === 'progression') return 'progression';
  if (lower === 'c' || lower === 'research') return 'research';
  if (lower === 'd' || lower === 'free') return 'free';
  return id;
}

/**
 * Maps canonical path id to legacy letter code for backward-compatible storage.
 */
export function canonicalToLegacyPathCode(id: string): 'a' | 'b' | 'c' | 'free' {
  const norm = normalizePathId(id);
  if (norm === 'internship') return 'a';
  if (norm === 'progression') return 'b';
  if (norm === 'research') return 'c';
  return 'free';
}

/**
 * Extracts all section IDs in week-order from a PathData object.
 */
export function getPathSectionIds(path?: PathData | null): string[] {
  if (!path || !path.weeksPlan) return [];
  return path.weeksPlan.flatMap((w) => w.sectionIds);
}
