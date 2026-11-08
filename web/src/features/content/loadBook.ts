import { Book } from './types';

export class ContentError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ContentError';
    this.status = status;
  }
}

let bookCache: Book | null = null;
let bookPromise: Promise<Book> | null = null;

export async function loadBook(): Promise<Book> {
  if (bookCache) {
    return bookCache;
  }
  if (bookPromise) {
    return bookPromise;
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const url = `${baseUrl}content/book.json`;

  bookPromise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new ContentError(`无法获取教材目录 (HTTP ${res.status}): ${url}`, res.status);
      }
      const data = (await res.json()) as Book;
      if (!data || !Array.isArray(data.chapters)) {
        throw new ContentError('教材数据格式异常，无法解析章节列表');
      }
      bookCache = data;
      return data;
    } catch (err) {
      if (err instanceof ContentError) {
        throw err;
      }
      throw new ContentError(
        `加载教材数据失败: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      bookPromise = null;
    }
  })();

  return bookPromise;
}

export function clearBookCache(): void {
  bookCache = null;
  bookPromise = null;
}
