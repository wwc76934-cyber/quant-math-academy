import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache } from '../src/features/content/loadBook';
import { Book } from '../src/features/content/types';
import { DEFAULT_STORE, saveStoreDirect } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { BookmarksPage } from '../src/routes/BookmarksPage';

const mockBook: Book = {
  schemaVersion: 1,
  title: '量化数学进阶教材',
  subtitle: 'Quant Math Academy',
  parts: [],
  pilotChapterIds: ['c11'],
  chapters: [
    {
      id: 'c11',
      number: 11,
      label: '第11章',
      title: '期望、方差、矩与概率不等式',
      displayTitle: '第11章　期望、方差、矩与概率不等式',
      slug: 'expectation-moments-inequalities',
      pilot: true,
      metaStatus: 'reviewed',
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
      sections: [
        {
          id: 'c11-s01',
          number: '11.1',
          title: '数学期望的严格定义',
          anchor: 'sec-11-1',
          difficulty: null,
          priority: null,
          minutes: 10,
        },
      ],
    },
  ],
};

describe('BookmarksPage (T14c)', () => {
  beforeEach(() => {
    localStorage.clear();
    clearBookCache();
    vi.restoreAllMocks();

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockBook,
        } as Response;
      }
      return {
        ok: false,
        status: 404,
        json: async () => ({}),
      } as Response;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders empty state when no bookmarks exist and contains #main-content', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <BookmarksPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      const mainElement = document.getElementById('main-content');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('page', 'bookmarks-page');
    });

    expect(screen.getByRole('heading', { level: 1, name: '公式收藏' })).toBeInTheDocument();
    expect(screen.getByText('还没有收藏公式')).toBeInTheDocument();

    const syllabusLink = screen.getByRole('link', { name: /浏览教材/i });
    expect(syllabusLink).toHaveAttribute('href', '/syllabus');

    const searchLink = screen.getByRole('link', { name: /搜索内容/i });
    expect(searchLink).toHaveAttribute('href', '/search');
  });

  it('renders chapter, section, LaTeX code and jump link when formulaMeta exists', async () => {
    saveStoreDirect({
      ...DEFAULT_STORE,
      bookmarks: {
        sections: [],
        formulas: ['eq-c11-01'],
        formulaMeta: {
          'eq-c11-01': {
            id: 'eq-c11-01',
            latex: '\\mathbb{E}[X] = \\int x dF(x)',
            tag: '(11.1)',
            chapterId: 'c11',
            sectionId: 'c11-s01',
            bookmarkedAt: '2026-11-10T00:00:00.000Z',
          },
        },
      },
    });

    render(
      <StoreProvider>
        <MemoryRouter>
          <BookmarksPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/^第11章 期望、方差、矩与概率不等式$/)).toBeInTheDocument();
    });

    expect(screen.getByText('(11.1)')).toBeInTheDocument();
    expect(screen.getByText('11.1 数学期望的严格定义')).toBeInTheDocument();
    expect(screen.getByText('\\mathbb{E}[X] = \\int x dF(x)')).toBeInTheDocument();

    const jumpLink = screen.getByRole('link', { name: /跳转公式/i });
    expect(jumpLink).toHaveAttribute('href', '/learn/c11#eq-c11-01');

    expect(screen.getByRole('button', { name: /取消收藏/i })).toBeInTheDocument();
  });

  it('removes item and displays empty state when cancel bookmark button is clicked', async () => {
    saveStoreDirect({
      ...DEFAULT_STORE,
      bookmarks: {
        sections: [],
        formulas: ['eq-c11-01'],
        formulaMeta: {
          'eq-c11-01': {
            id: 'eq-c11-01',
            latex: '\\mathbb{E}[X] = \\int x dF(x)',
            tag: '(11.1)',
            chapterId: 'c11',
            sectionId: 'c11-s01',
            bookmarkedAt: '2026-11-10T00:00:00.000Z',
          },
        },
      },
    });

    render(
      <StoreProvider>
        <MemoryRouter>
          <BookmarksPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/^第11章 /)).toBeInTheDocument();
    });

    const removeBtn = screen.getByRole('button', { name: /取消收藏/i });
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/^第11章 /)).not.toBeInTheDocument();
      expect(screen.getByText('还没有收藏公式')).toBeInTheDocument();
    });
  });

  it('handles legacy bookmark ID without formulaMeta gracefully with fallback and allows cancellation', async () => {
    saveStoreDirect({
      ...DEFAULT_STORE,
      bookmarks: {
        sections: [],
        formulas: ['c11-legacy-eq-99'],
        formulaMeta: {},
      },
    });

    render(
      <StoreProvider>
        <MemoryRouter>
          <BookmarksPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/^第11章 /)).toBeInTheDocument();
    });

    expect(screen.getByText('c11-legacy-eq-99')).toBeInTheDocument();
    expect(screen.getByText('旧收藏，请重新收藏以保存公式')).toBeInTheDocument();

    const jumpLink = screen.getByRole('link', { name: /跳转公式/i });
    expect(jumpLink).toHaveAttribute('href', '/learn/c11#c11-legacy-eq-99');

    const removeBtn = screen.getByRole('button', { name: /取消收藏/i });
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText('c11-legacy-eq-99')).not.toBeInTheDocument();
      expect(screen.getByText('还没有收藏公式')).toBeInTheDocument();
    });
  });
});
