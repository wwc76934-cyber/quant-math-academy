import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from '../src/components/reader/Toast';
import { clearBookCache } from '../src/features/content/loadBook';
import { clearChapterCaches } from '../src/features/content/loadChapter';
import { STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { ReaderPage } from '../src/routes/ReaderPage';

const siteDir = path.resolve(__dirname, '../../content/generated/site');
const bookJson = JSON.parse(fs.readFileSync(path.join(siteDir, 'book.json'), 'utf-8'));
const c11Json = JSON.parse(fs.readFileSync(path.join(siteDir, 'chapters/c11.json'), 'utf-8'));
const c11Exercises = JSON.parse(fs.readFileSync(path.join(siteDir, 'exercises/c11.json'), 'utf-8'));
const c02Json = JSON.parse(fs.readFileSync(path.join(siteDir, 'chapters/c02.json'), 'utf-8'));
const c34Json = JSON.parse(fs.readFileSync(path.join(siteDir, 'chapters/c34.json'), 'utf-8'));

// IntersectionObserver mock that allows manual triggering
let observerCallbacks: Array<(entries: IntersectionObserverEntry[]) => void> = [];

class MockIntersectionObserver {
  private callback: (entries: IntersectionObserverEntry[]) => void;
  public elements: Element[] = [];

  constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
    this.callback = callback;
    observerCallbacks.push(callback);
  }

  observe(element: Element) {
    this.elements.push(element);
  }

  unobserve(element: Element) {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect() {
    this.elements = [];
    observerCallbacks = observerCallbacks.filter((cb) => cb !== this.callback);
  }
}

describe('ReaderPage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    clearBookCache();
    clearChapterCaches();
    observerCallbacks = [];
    vi.restoreAllMocks();

    // Mock IntersectionObserver
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    // Mock window.scrollTo and scrollIntoView
    window.scrollTo = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    // Mock fetch for local site data
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => bookJson,
        } as Response;
      }
      if (urlStr.includes('chapters/c11.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => c11Json,
        } as Response;
      }
      if (urlStr.includes('chapters/c02.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => c02Json,
        } as Response;
      }
      if (urlStr.includes('chapters/c34.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => c34Json,
        } as Response;
      }
      if (urlStr.includes('exercises/c11.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => c11Exercises,
        } as Response;
      }
      const sectionMatch = urlStr.match(/sections\/(c\d+-s\d+)\.html/);
      if (sectionMatch) {
        const secFile = path.join(siteDir, 'sections', `${sectionMatch[1]}.html`);
        if (fs.existsSync(secFile)) {
          const content = fs.readFileSync(secFile, 'utf-8');
          return {
            ok: true,
            status: 200,
            text: async () => content,
          } as Response;
        }
      }
      return { ok: false, status: 404, text: async () => 'Not found' } as Response;
    });
  });

  afterEach(() => {
    clearBookCache();
    clearChapterCaches();
  });

  it('renders pilot chapter (C11) with chapter header and immediately loads first section', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    // Chapter display title
    expect(
      await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ })
    ).toBeInTheDocument();

    // First section title loaded and rendered
    expect(
      await screen.findByRole('heading', { level: 2, name: '期望的定义与性质' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('11.1').length).toBeGreaterThan(0);

    // Section info displays metadata (D2, P0, 45 分钟)
    expect(screen.getByText('D2')).toBeInTheDocument();
    expect(screen.getByText('P0')).toBeInTheDocument();
    expect(screen.getByText('45 分钟')).toBeInTheDocument();

    // Learning objective rendered
    expect(screen.getByText(/能陈述数学期望的公理化积分定义/)).toBeInTheDocument();
  });

  it('progressively streams and renders remaining sections in C11', async () => {
    const { container } = render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    // Wait for first section
    await screen.findByRole('heading', { level: 2, name: '期望的定义与性质' });

    // Progressively all 6 section blocks exist and load
    await waitFor(
      () => {
        expect(container.querySelectorAll('.section-block').length).toBe(6);
        expect(container.querySelectorAll('.article-content').length).toBeGreaterThanOrEqual(2);
      },
      { timeout: 8000 }
    );
  });

  it('renders newly annotated chapter (C02) without pilot gating', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c02']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /一元微积分、Taylor 公式与级数/,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: '函数极限、连续与闭区间性质',
      })
    ).toBeInTheDocument();
    expect(screen.queryByText('内容接入中')).not.toBeInTheDocument();
  });

  it('renders C34 with full metadata and no unannotated badge', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c34']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /量化策略的数学评估与回测/,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: '收益序列与绩效指标',
      })
    ).toBeInTheDocument();
    expect(screen.queryByText('内容接入中')).not.toBeInTheDocument();
    expect(screen.queryAllByText('标注完善中').length).toBe(0);
  });

  it('shows the error state when a chapter manifest is missing', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c99']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    expect(await screen.findByText(/加载章节失败|404|Not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /返回目录/ })).toBeInTheDocument();
  });

  it('updates learning status and persists in store with toast feedback', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ });

    // Find status buttons
    const statusBtns = await screen.findAllByRole('button', { name: /修改学习状态/ });
    expect(statusBtns.length).toBeGreaterThan(0);
    fireEvent.click(statusBtns[0]);

    // Status modal should appear
    expect(screen.getByRole('dialog', { name: '选择学习状态' })).toBeInTheDocument();

    // Select "已学习"
    const doneChoice = screen.getByRole('button', { name: /已学习/ });
    fireEvent.click(doneChoice);

    // Toast feedback appears
    expect(await screen.findByText(/标记为：已学习/)).toBeInTheDocument();

    // Check store in localStorage via waitFor with STORAGE_KEY
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(saved.progress?.['c11-s1']?.status).toBe('done');
    });
  });

  it('lazy loads exercises when sentinel intersects viewport', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ });

    // Exercises heading is in the document
    expect(screen.getAllByText(/本章习题/).length).toBeGreaterThan(0);

    // Trigger intersection observers
    observerCallbacks.forEach((cb) => {
      cb([
        {
          isIntersecting: true,
          target: document.querySelector('#exercises') || document.body,
        } as unknown as IntersectionObserverEntry,
      ]);
    });

    // Exercises should load and display exercises count / title
    expect(await screen.findByText('第 1 题')).toBeInTheDocument();

    // Toggle solution
    const toggleSolBtn = screen.getAllByRole('button', { name: '展开解析' })[0];
    fireEvent.click(toggleSolBtn);
    expect(screen.getByText('收起解析')).toBeInTheDocument();
  });

  it('toggles focus mode via keyboard shortcut "f" and Esc', async () => {
    const { container } = render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ });

    const wrapper = container.querySelector('.reader-wrapper');
    expect(wrapper).not.toHaveClass('reader--focus');

    // Press 'f'
    fireEvent.keyDown(window, { key: 'f' });
    expect(wrapper).toHaveClass('reader--focus');

    // Press 'Escape'
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(wrapper).not.toHaveClass('reader--focus');
  });

  it('opens shortcuts modal via "?" shortcut and closes with Esc', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ });

    // Press '?'
    fireEvent.keyDown(window, { key: '?' });
    expect(screen.getByRole('dialog', { name: '键盘快捷键' })).toBeInTheDocument();

    // Press 'Escape'
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: '键盘快捷键' })).not.toBeInTheDocument();
    });
  });

  it('opens settings modal via Aa button and allows updating font size', async () => {
    render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: /期望、方差、矩与概率不等式/ });

    const aaBtn = screen.getByRole('button', { name: '字号与版式设置' });
    fireEvent.click(aaBtn);

    expect(screen.getByRole('dialog', { name: '阅读偏好设置' })).toBeInTheDocument();

    // Click '适中' (17px)
    const mdSizeBtn = screen.getByRole('button', { name: /适中/ });
    fireEvent.click(mdSizeBtn);

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(saved.settings?.fontSize).toBe('md');
    });
  });

  it('supports copying LaTeX from formula and deep anchor link from environment', async () => {
    const { container } = render(
      <StoreProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={['/learn/c11']}>
            <Routes>
              <Route path="/learn/:chapterId" element={<ReaderPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 2, name: '期望的定义与性质' });

    // Wait until section 1 content is injected
    await waitFor(() => {
      expect(container.querySelector('.equation .equation__number')).not.toBeNull();
      expect(container.querySelector('.env__anchor')).not.toBeNull();
    });

    // Check click on equation number
    const eqNum = container.querySelector('.equation .equation__number');
    if (eqNum) {
      fireEvent.click(eqNum);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(await screen.findByText(/已复制公式 LaTeX 源码/)).toBeInTheDocument();
    }

    // Check click on environment anchor
    const envAnchor = container.querySelector('.env__anchor');
    if (envAnchor) {
      fireEvent.click(envAnchor);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(await screen.findByText(/已复制环境直达链接/)).toBeInTheDocument();
    }
  });
});
