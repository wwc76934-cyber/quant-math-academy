import { ContentError } from './loadBook';
import { ChapterData, ExerciseData } from './types';

const chapterCache = new Map<string, ChapterData>();
const chapterPromises = new Map<string, Promise<ChapterData>>();

const sectionCache = new Map<string, string>();
const sectionPromises = new Map<string, Promise<string>>();

const exerciseCache = new Map<string, ExerciseData>();
const exercisePromises = new Map<string, Promise<ExerciseData>>();

function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}

export async function loadChapter(
  chapterId: string,
  signal?: AbortSignal
): Promise<ChapterData> {
  if (chapterCache.has(chapterId)) {
    return chapterCache.get(chapterId)!;
  }
  if (chapterPromises.has(chapterId)) {
    return chapterPromises.get(chapterId)!;
  }

  const url = `${getBaseUrl()}content/chapters/${chapterId}.json`;
  const promise = (async () => {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new ContentError(`章节数据不存在 (HTTP ${res.status}): ${chapterId}`, res.status);
      }
      const data = (await res.json()) as ChapterData;
      if (!data || !data.chapterId) {
        throw new ContentError(`章节数据格式异常: ${chapterId}`);
      }
      chapterCache.set(chapterId, data);
      return data;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      if (err instanceof ContentError) {
        throw err;
      }
      throw new ContentError(
        `加载章节 ${chapterId} 失败: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      chapterPromises.delete(chapterId);
    }
  })();

  chapterPromises.set(chapterId, promise);
  return promise;
}

export async function loadSection(
  chapterId: string,
  sectionId: string,
  signal?: AbortSignal
): Promise<string> {
  const key = `${chapterId}-${sectionId}`;
  if (sectionCache.has(key)) {
    return sectionCache.get(key)!;
  }
  if (sectionPromises.has(key)) {
    return sectionPromises.get(key)!;
  }

  const cleanSectionId = sectionId.startsWith(`${chapterId}-`)
    ? sectionId
    : `${chapterId}-${sectionId}`;
  const url = `${getBaseUrl()}content/sections/${cleanSectionId}.html`;

  const promise = (async () => {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new ContentError(`节正文未找到 (HTTP ${res.status}): ${cleanSectionId}`, res.status);
      }
      const text = await res.text();
      sectionCache.set(key, text);
      return text;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      if (err instanceof ContentError) {
        throw err;
      }
      throw new ContentError(
        `加载节内容失败: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      sectionPromises.delete(key);
    }
  })();

  sectionPromises.set(key, promise);
  return promise;
}

export async function loadExercises(
  chapterId: string,
  signal?: AbortSignal
): Promise<ExerciseData> {
  if (exerciseCache.has(chapterId)) {
    return exerciseCache.get(chapterId)!;
  }
  if (exercisePromises.has(chapterId)) {
    return exercisePromises.get(chapterId)!;
  }

  const url = `${getBaseUrl()}content/exercises/${chapterId}.json`;
  const promise = (async () => {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new ContentError(`练习数据未找到 (HTTP ${res.status}): ${chapterId}`, res.status);
      }
      const data = (await res.json()) as ExerciseData;
      if (!data || !Array.isArray(data.exercises)) {
        throw new ContentError(`练习数据格式异常: ${chapterId}`);
      }
      exerciseCache.set(chapterId, data);
      return data;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      if (err instanceof ContentError) {
        throw err;
      }
      throw new ContentError(
        `加载章节 ${chapterId} 练习失败: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      exercisePromises.delete(chapterId);
    }
  })();

  exercisePromises.set(chapterId, promise);
  return promise;
}

export function clearChapterCaches(): void {
  chapterCache.clear();
  chapterPromises.clear();
  sectionCache.clear();
  sectionPromises.clear();
  exerciseCache.clear();
  exercisePromises.clear();
}

export const clearChapterCache = clearChapterCaches;

