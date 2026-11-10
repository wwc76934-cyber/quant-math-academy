import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ReaderExercises } from '../src/components/reader/ReaderExercises';
import { ToastProvider } from '../src/components/reader/Toast';
import { clearBookCache } from '../src/features/content/loadBook';
import { clearChapterCaches } from '../src/features/content/loadChapter';
import { DEFAULT_STORE, saveStoreDirect } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { PracticePage } from '../src/routes/PracticePage';
import { PracticeSessionPage } from '../src/routes/PracticeSessionPage';
import { ProgressPage } from '../src/routes/ProgressPage';
import { WrongBookPage } from '../src/routes/WrongBookPage';

const siteDir = path.resolve(__dirname, '../../content/generated/site');
const bookJson = JSON.parse(fs.readFileSync(path.join(siteDir, 'book.json'), 'utf-8'));
const c01Exercises = JSON.parse(fs.readFileSync(path.join(siteDir, 'exercises/c01.json'), 'utf-8'));

class MockIntersectionObserver {
  private callback: (entries: IntersectionObserverEntry[]) => void;
  public elements: Element[] = [];

  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    this.callback = callback;
  }

  observe(element: Element) {
    this.elements.push(element);
    // Automatically trigger for mock test environments
    setTimeout(() => {
      this.callback([{ isIntersecting: true, target: element } as unknown as IntersectionObserverEntry]);
    }, 0);
  }

  unobserve() {}
  disconnect() {}
}

describe('T12 Practice & Progress Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    clearBookCache();
    clearChapterCaches();
    vi.restoreAllMocks();

    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => bookJson,
        } as Response;
      }
      if (urlStr.includes('exercises/c01.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => c01Exercises,
        } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });
  });

  afterEach(() => {
    clearBookCache();
    clearChapterCaches();
  });

  describe('PracticePage', () => {
    it('renders 698 total exercises and chapter cards', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/practice']}>
              <Routes>
                <Route path="/practice" element={<PracticePage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: '章节练习' })).toBeInTheDocument();
      });

      // Total exercises 698
      expect(screen.getByText('698')).toBeInTheDocument();
      // Empty state initially: 0 practiced
      expect(screen.getByText('已练习题数')).toBeInTheDocument();
      expect(screen.getByText('(0%)')).toBeInTheDocument();
      // Chapter list contains c01
      expect(screen.getByText(/第 1 章/i)).toBeInTheDocument();
    });
  });

  describe('PracticeSessionPage', () => {
    it('renders questions, toggles solution, marks correct and wrong, and navigates', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/practice/c01']}>
              <Routes>
                <Route path="/practice/:chapterId" element={<PracticeSessionPage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('1 / 20')).toBeInTheDocument();
      });

      // Check question prompt exists
      expect(screen.getByText(/第 1 题/i)).toBeInTheDocument();

      // Solution initially closed
      expect(screen.queryByRole('region', { name: /解析/ })).not.toBeInTheDocument();

      // Toggle solution
      const solutionBtn = screen.getByRole('button', { name: /展开解析/i });
      fireEvent.click(solutionBtn);
      expect(screen.getByRole('region', { name: /解析/ })).toBeInTheDocument();

      // Mark correct
      const correctBtn = screen.getByRole('button', { name: /标记做对/i });
      fireEvent.click(correctBtn);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /✓ 已(标记)?做对/i })).toBeInTheDocument();
      });

      // Navigate to next question
      const nextBtn = screen.getByRole('button', { name: /下一题/i });
      fireEvent.click(nextBtn);

      await waitFor(() => {
        expect(screen.getByText('2 / 20')).toBeInTheDocument();
      });

      // Mark wrong on question 2
      const wrongBtn = screen.getByRole('button', { name: /加入错题/i });
      fireEvent.click(wrongBtn);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /✕ 已在错题本/i })).toBeInTheDocument();
      });
    });
  });

  describe('WrongBookPage', () => {
    it('shows empty state when no wrong exercises', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/practice/wrong']}>
              <Routes>
                <Route path="/practice/wrong" element={<WrongBookPage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: '错题本' })).toBeInTheDocument();
      });

      expect(screen.getByText('还没有错题')).toBeInTheDocument();
    });

    it('renders wrong exercises, allows marking mastered and removing', async () => {
      // Preload 1 wrong exercise into store
      const initialStore = {
        ...DEFAULT_STORE,
        exercises: {
          'c01-ex-2': {
            status: 'wrong' as const,
            chapterId: 'c01',
            number: 2,
            attempts: 1,
            lastAt: new Date().toISOString(),
          },
        },
        review: {
          'c01-ex-2': {
            kind: 'exercise' as const,
            exerciseId: 'c01-ex-2',
            chapterId: 'c01',
            number: 2,
            dueAt: new Date(Date.now() - 3600000).toISOString(), // due in past (due today)
            intervalDays: 1,
            correctStreak: 0,
            lastAt: new Date().toISOString(),
          },
        },
      };
      saveStoreDirect(initialStore);

      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/practice/wrong']}>
              <Routes>
                <Route path="/practice/wrong" element={<WrongBookPage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/第 2 题/i)).toBeInTheDocument();
      });

      expect(screen.getAllByText(/今日待复习/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole('link', { name: /重做此题/i })).toHaveAttribute(
        'href',
        '/practice/c01#c01-ex-2'
      );

      // Click "标记掌握" -> removes item and transitions to empty state
      const masterBtn = screen.getByRole('button', { name: /标记掌握/i });
      fireEvent.click(masterBtn);

      await waitFor(() => {
        expect(screen.getByText('还没有错题')).toBeInTheDocument();
      });
    });
  });

  describe('ProgressPage', () => {
    it('renders zero state with 0 learned and empty review queue', async () => {
      render(
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

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: '学习进度' })).toBeInTheDocument();
      });

      expect(screen.getByTestId('kpi-learned')).toHaveTextContent('0 / 219 节 (0%)');
      expect(screen.getByTestId('kpi-mastered')).toHaveTextContent('0 节');
      expect(screen.getByTestId('kpi-wrong')).toHaveTextContent('0 题');
      expect(screen.getByTestId('kpi-due')).toHaveTextContent('0 题');
      expect(screen.getByTestId('review-queue-empty')).toBeInTheDocument();
    });

    it('renders real stats and due queue when store has progress & mistakes', async () => {
      const activeStore = {
        ...DEFAULT_STORE,
        progress: {
          'c01-s1': { status: 'done' as const },
          'c01-s2': { status: 'master' as const },
        },
        exercises: {
          'c01-ex-1': {
            status: 'correct' as const,
            chapterId: 'c01',
            number: 1,
            attempts: 1,
            lastAt: new Date().toISOString(),
          },
          'c01-ex-2': {
            status: 'wrong' as const,
            chapterId: 'c01',
            number: 2,
            attempts: 1,
            lastAt: new Date().toISOString(),
          },
        },
        review: {
          'c01-ex-2': {
            kind: 'exercise' as const,
            exerciseId: 'c01-ex-2',
            chapterId: 'c01',
            number: 2,
            dueAt: new Date(Date.now() - 1000).toISOString(),
            intervalDays: 1,
            correctStreak: 1,
            lastAt: new Date().toISOString(),
          },
        },
      };
      saveStoreDirect(activeStore);

      render(
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

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: '学习进度' })).toBeInTheDocument();
      });

      // 2 learned sections, 1 master section, 1 wrong, 1 due today
      expect(screen.getByTestId('kpi-learned')).toHaveTextContent('2 / 219 节 (1%)');
      expect(screen.getByTestId('kpi-mastered')).toHaveTextContent('1 节');
      expect(screen.getByTestId('kpi-wrong')).toHaveTextContent('1 题');
      expect(screen.getByTestId('kpi-due')).toHaveTextContent('1 题');

      // Review queue shows item
      expect(screen.getByText(/习题 2/i)).toBeInTheDocument();
      expect(screen.getByText(/1 \/ 3 次/i)).toBeInTheDocument();
      expect(screen.getAllByText(/今日待复习/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('ReaderExercises', () => {
    it('renders exercises and writes marks to store without placeholder toast', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <ReaderExercises chapterId="c01" exerciseCount={20} />
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/第 1 题/i)).toBeInTheDocument();
      });

      // Mark question 1 correct
      const markCorrectButtons = screen.getAllByRole('button', { name: /标记做对/i });
      fireEvent.click(markCorrectButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /✓ 已(标记)?做对/i })).toBeInTheDocument();
      });

      // Mark question 2 wrong
      const markWrongButtons = screen.getAllByRole('button', { name: /加入错题/i });
      fireEvent.click(markWrongButtons[1]);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /✕ 已在错题本/i })).toBeInTheDocument();
      });
    });
  });
});
