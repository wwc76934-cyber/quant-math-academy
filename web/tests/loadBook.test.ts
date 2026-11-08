import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache, ContentError, loadBook } from '../src/features/content/loadBook';

describe('loadBook', () => {
  beforeEach(() => {
    clearBookCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearBookCache();
  });

  it('loads book.json successfully and caches the result', async () => {
    const mockBook = {
      schemaVersion: 1,
      title: '量化数学进阶教材',
      subtitle: 'Quant Math Academy',
      parts: [],
      chapters: [
        {
          id: 'c01',
          number: 1,
          label: '第1章',
          title: '数学语言',
          displayTitle: '第1章 数学语言',
          slug: 'math-lang',
          pilot: true,
          metaStatus: 'pending',
          sectionCount: 1,
          exerciseCount: 0,
          stats: {
            sections: 1,
            environments: 0,
            displayEquations: 0,
            taggedEquations: 0,
            equations: 0,
            exercises: 0,
            htmlBytes: 100,
          },
          sections: [],
        },
      ],
      pilotChapterIds: ['c01'],
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockBook,
    } as Response);

    const book1 = await loadBook();
    expect(book1.title).toBe('量化数学进阶教材');
    expect(book1.chapters.length).toBe(1);

    // Second call should return cached object without second fetch
    const book2 = await loadBook();
    expect(book2).toBe(book1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('throws ContentError on 404 response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(loadBook()).rejects.toThrow(ContentError);
  });

  it('throws ContentError on corrupted or invalid JSON', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error('Unexpected token < in JSON');
      },
    } as unknown as Response);

    await expect(loadBook()).rejects.toThrow(ContentError);
  });

  it('throws ContentError when chapters array is missing', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        schemaVersion: 1,
        title: 'Broken',
      }),
    } as Response);

    await expect(loadBook()).rejects.toThrow('教材数据格式异常');
  });
});
