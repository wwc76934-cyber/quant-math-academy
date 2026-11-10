import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from '../src/components/reader/Toast';
import { clearBookCache } from '../src/features/content/loadBook';
import { Book } from '../src/features/content/types';
import { DEFAULT_STORE, saveStoreDirect } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { getTodaySuggestion, ProgressPage } from '../src/routes/ProgressPage';

const mockBook: Book = {
  schemaVersion: 1,
  title: '量化数学进阶教材',
  subtitle: 'Quant Math Academy',
  parts: [],
  pilotChapterIds: ['c01'],
  chapters: [
    {
      id: 'c01',
      number: 1,
      label: '第1章',
      title: '数学语言、证明方法与实数完备性',
      displayTitle: '第1章　数学语言、证明方法与实数完备性',
      slug: 'mathematical-language-real-numbers',
      pilot: true,
      metaStatus: 'reviewed',
      sectionCount: 2,
      exerciseCount: 4,
      stats: {
        sections: 2,
        environments: 0,
        displayEquations: 0,
        taggedEquations: 0,
        equations: 0,
        exercises: 4,
        htmlBytes: 100,
      },
      sections: [
        {
          id: 'c01-s1',
          number: '1.1',
          title: '命题、逻辑联结词与量词',
          anchor: 'sec-1-1',
          difficulty: null,
          priority: null,
          minutes: 10,
        },
        {
          id: 'c01-s2',
          number: '1.2',
          title: '集合论基础与映射',
          anchor: 'sec-1-2',
          difficulty: null,
          priority: null,
          minutes: 15,
        },
      ],
    },
  ],
};

function renderProgressPage() {
  return render(
    <StoreProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={['/progress']}>
          <Routes>
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </MemoryRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

describe('T22 /progress 今日建议卡 (ProgressSuggestion)', () => {
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

  it('1. 到期复习分支：dueAt <= now 且未掌握数量 > 0 时优先推荐复习错题', async () => {
    const pastDate = new Date(Date.now() - 3600000).toISOString();
    const store = {
      ...DEFAULT_STORE,
      review: {
        'c01-ex-1': {
          kind: 'exercise' as const,
          exerciseId: 'c01-ex-1',
          chapterId: 'c01',
          number: 1,
          dueAt: pastDate,
          intervalDays: 1,
          correctStreak: 0,
          lastAt: pastDate,
        },
        'c01-ex-2': {
          kind: 'exercise' as const,
          exerciseId: 'c01-ex-2',
          chapterId: 'c01',
          number: 2,
          dueAt: pastDate,
          intervalDays: 1,
          correctStreak: 1,
          lastAt: pastDate,
        },
      },
      exercises: {
        'c01-ex-1': { status: 'wrong' as const, chapterId: 'c01', number: 1, attempts: 1, lastAt: pastDate },
      },
      lastLocation: { chapterId: 'c01', sectionId: 'c01-s1', at: pastDate },
      progress: {
        'c01-s1': { status: 'done' as const },
      },
    };
    saveStoreDirect(store);

    renderProgressPage();

    await waitFor(() => {
      expect(screen.getByTestId('progress-suggestion-card')).toBeInTheDocument();
    });

    const card = screen.getByTestId('progress-suggestion-card');
    expect(card).toHaveAttribute('aria-labelledby', 'progress-suggestion-heading');
    expect(screen.getByText('今天建议先做')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '先复习 2 道到期错题' })).toBeInTheDocument();
    expect(screen.getByText('间隔复习到期')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '开始' });
    expect(link).toHaveAttribute('href', '/practice/wrong');
  });

  it('2. 错题分支（无到期）：无到期复习但有错题时推荐重练错题', async () => {
    const futureDate = new Date(Date.now() + 86400000 * 5).toISOString();
    const store = {
      ...DEFAULT_STORE,
      review: {
        'c01-ex-1': {
          kind: 'exercise' as const,
          exerciseId: 'c01-ex-1',
          chapterId: 'c01',
          number: 1,
          dueAt: futureDate,
          intervalDays: 3,
          correctStreak: 1,
          lastAt: new Date().toISOString(),
        },
      },
      exercises: {
        'c01-ex-1': { status: 'wrong' as const, chapterId: 'c01', number: 1, attempts: 2, lastAt: new Date().toISOString() },
        'c01-ex-2': { status: 'wrong' as const, chapterId: 'c01', number: 2, attempts: 1, lastAt: new Date().toISOString() },
      },
      lastLocation: { chapterId: 'c01', sectionId: 'c01-s2', at: new Date().toISOString() },
    };
    saveStoreDirect(store);

    renderProgressPage();

    await waitFor(() => {
      expect(screen.getByTestId('progress-suggestion-card')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { level: 2, name: '重练 2 道错题' })).toBeInTheDocument();
    expect(screen.getByText('错题优先')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '开始' });
    expect(link).toHaveAttribute('href', '/practice/wrong');
  });

  it('3. lastLocation 分支：无错题且有 lastLocation 时推荐继续上次阅读', async () => {
    const store = {
      ...DEFAULT_STORE,
      review: {},
      exercises: {
        'c01-ex-1': { status: 'correct' as const, chapterId: 'c01', number: 1, attempts: 1, lastAt: new Date().toISOString() },
      },
      lastLocation: {
        chapterId: 'c01',
        sectionId: 'c01-s1',
        at: new Date().toISOString(),
      },
    };
    saveStoreDirect(store);

    renderProgressPage();

    await waitFor(() => {
      expect(screen.getByTestId('progress-suggestion-card')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { level: 2, name: '继续上次位置：命题、逻辑联结词与量词' })).toBeInTheDocument();
    expect(screen.getByText('最近阅读')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '开始' });
    expect(link).toHaveAttribute('href', '/learn/c01#c01-s1');
  });

  it('4. 零进度分支：无错题、无 lastLocation 且已学节数为 0 时推荐从第 1 章开始', async () => {
    const store = {
      ...DEFAULT_STORE,
      review: {},
      exercises: {},
      lastLocation: undefined,
      progress: {},
    };
    saveStoreDirect(store);

    renderProgressPage();

    await waitFor(() => {
      expect(screen.getByTestId('progress-suggestion-card')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { level: 2, name: '从第 1 章开始' })).toBeInTheDocument();
    expect(screen.getByText('建立基础')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '开始' });
    expect(link).toHaveAttribute('href', '/learn/c01');
  });

  it('5. 空/已学分支：无错题、无 lastLocation 且已学 > 0 时推荐继续推进全书', async () => {
    const store = {
      ...DEFAULT_STORE,
      review: {},
      exercises: {},
      lastLocation: undefined,
      progress: {
        'c01-s1': { status: 'done' as const },
      },
    };
    saveStoreDirect(store);

    renderProgressPage();

    await waitFor(() => {
      expect(screen.getByTestId('progress-suggestion-card')).toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { level: 2, name: '继续推进全书' })).toBeInTheDocument();
    expect(screen.getByText('保持节奏')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: '开始' });
    expect(link).toHaveAttribute('href', '/syllabus');
  });

  it('6. 规则函数纯逻辑测试 (getTodaySuggestion) 边界与降级', () => {
    // 降级：lastLocation 中 sectionId 未在 book 中匹配时使用 chapter 标题或 ID
    const storeWithMissingSec = {
      ...DEFAULT_STORE,
      review: {},
      exercises: {},
      lastLocation: { chapterId: 'c01', sectionId: 'c01-s999', at: '2026-11-10' },
      progress: {},
    };
    const res1 = getTodaySuggestion(storeWithMissingSec, mockBook);
    expect(res1).toEqual({
      title: '继续上次位置：数学语言、证明方法与实数完备性',
      reason: '最近阅读',
      link: '/learn/c01#c01-s999',
    });

    // 仅掌握 (master) 的节算作已学，不走从第1章开始
    const storeMastered = {
      ...DEFAULT_STORE,
      review: {},
      exercises: {},
      lastLocation: undefined,
      progress: {
        'c01-s2': { status: 'master' as const },
      },
    };
    const res2 = getTodaySuggestion(storeMastered, mockBook);
    expect(res2).toEqual({
      title: '继续推进全书',
      reason: '保持节奏',
      link: '/syllabus',
    });
  });
});
