import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from '../src/components/reader/Toast';
import { clearBookCache } from '../src/features/content/loadBook';
import { clearPathsCache } from '../src/features/paths/loadPaths';
import { STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { PathDetailPage } from '../src/routes/PathDetailPage';

const bookJsonPath = path.resolve(__dirname, '../../content/generated/site/book.json');
const realBook = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));
const pathsJsonPath = path.resolve(__dirname, '../../content/generated/site/paths.json');
const realPaths = JSON.parse(fs.readFileSync(pathsJsonPath, 'utf-8'));

function renderWithRouter(initialRoute: string) {
  return render(
    <StoreProvider>
      <ToastProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/paths/:mode" element={<PathDetailPage />} />
          </Routes>
        </MemoryRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

describe('PathDetailPage', () => {
  beforeEach(() => {
    localStorage.clear();
    clearBookCache();
    clearPathsCache();
    vi.restoreAllMocks();
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realBook,
        } as Response;
      }
      if (urlStr.includes('paths.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realPaths,
        } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });
  });

  afterEach(() => {
    clearBookCache();
    clearPathsCache();
  });

  it('renders internship path detail, stats, next section and checkpoints', async () => {
    renderWithRouter('/paths/internship');

    expect(await screen.findByText('量化实习冲刺')).toBeInTheDocument();
    expect(screen.getByText('8 周')).toBeInTheDocument();
    expect(screen.getAllByText(/56 节/).length).toBeGreaterThan(0);
    expect(screen.getByText('约 44 小时')).toBeInTheDocument();

    // Checkpoints
    expect(screen.getByText('阶段性复盘与里程碑检查点')).toBeInTheDocument();
    expect(screen.getByText(/第 4 周后/)).toBeInTheDocument();
    expect(screen.getByText(/第 8 周后/)).toBeInTheDocument();

    // Next recommended section
    expect(screen.getByText(/推荐下一节/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /开始学习/ })).toBeInTheDocument();

    // Weeks
    expect(await screen.findByText('WEEK 01')).toBeInTheDocument();
    expect(
      await screen.findByText('离散概率、古典概型与 Bayes 推断')
    ).toBeInTheDocument();
  });

  it('preserves progress when switching active path', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        settings: { theme: 'system', fontSize: 'md', measure: 'standard', focus: false, proofDefault: 'open' },
        progress: {
          'c02-s1': { status: 'done' },
          'c02-s2': { status: 'master' },
        },
        lastLocation: null,
        bookmarks: { sections: [], formulas: [] },
        path: { active: 'free' },
        activity: [],
      })
    );

    renderWithRouter('/paths/internship');
    await screen.findByText('量化实习冲刺');

    // Click to switch active path to internship
    const switchBtn = screen.getByRole('button', { name: /设为当前主路径/i });
    fireEvent.click(switchBtn);

    // Verify localStorage retains the done/master items via waitFor
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(saved.path?.active).toBe('internship');
      expect(saved.progress['c02-s1']?.status).toBe('done');
      expect(saved.progress['c02-s2']?.status).toBe('master');
    });
  });

  it('shows no "标注完善中" badges after all 34 chapters are annotated', async () => {
    renderWithRouter('/paths/progression');

    expect(await screen.findByText('系统数学进阶')).toBeInTheDocument();
    expect(screen.getByText('20 周')).toBeInTheDocument();
    expect(screen.getAllByText(/219 节/).length).toBeGreaterThan(0);

    // Expand all weeks so all sections are rendered
    fireEvent.click(screen.getByRole('button', { name: '展开全部周' }));

    // All chapters are annotated now: no honest-unannotated badge should remain
    expect(screen.queryAllByText('标注完善中').length).toBe(0);
  });

  it('renders not found error state for non-existent path mode', async () => {
    renderWithRouter('/paths/non-existent-mode');

    expect(await screen.findByText(/未找到指定学习路径/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /查看所有学习路径/ })).toBeInTheDocument();
  });
});
