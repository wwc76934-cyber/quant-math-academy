import fs from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache } from '../src/features/content/loadBook';
import { clearPathsCache } from '../src/features/paths/loadPaths';
import { STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { HomePage } from '../src/routes/HomePage';

const bookJsonPath = path.resolve(__dirname, '../../content/generated/site/book.json');
const realBook = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));
const pathsJsonPath = path.resolve(__dirname, '../../content/generated/site/paths.json');
const realPaths = JSON.parse(fs.readFileSync(pathsJsonPath, 'utf-8'));

describe('HomePage', () => {
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

  it('renders stats derived directly from book.json', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </StoreProvider>
    );

    // Masthead title
    expect(await screen.findByText(/量化数学/)).toBeInTheDocument();

    // Scale stats from real book.json
    expect(screen.getByText('8 / 34')).toBeInTheDocument();
    expect(screen.getByText('篇 / 章')).toBeInTheDocument();
    expect(screen.getByText('219')).toBeInTheDocument();
    expect(screen.getByText('小节')).toBeInTheDocument();
    expect(screen.getByText('3,276')).toBeInTheDocument();
    expect(screen.getByText('独立公式')).toBeInTheDocument();
  });

  it('renders empty start state when no lastLocation exists', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: '量化数学进阶教材' });

    expect(screen.getByText('从第 1 章读起，或先选一条路径')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '从第 1 章开始' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '查看完整目录' })).toBeInTheDocument();
  });

  it('renders continue reading card when lastLocation points to a pilot chapter', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        settings: {
          theme: 'system',
          fontSize: 'md',
          measure: 'standard',
          focus: false,
          proofDefault: 'open',
        },
        progress: {
          'c11-s1': { status: 'done' },
        },
        lastLocation: {
          chapterId: 'c11',
          sectionId: 'c11-s4',
          at: new Date().toISOString(),
        },
        bookmarks: { sections: [], formulas: [] },
        path: { active: 'free' },
        activity: [],
      })
    );

    render(
      <StoreProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: '量化数学进阶教材' });

    // Should display Continue Learning card for C11
    expect(screen.getByText(/第11章/)).toBeInTheDocument();
    expect(screen.getByText(/期望、方差、矩与概率不等式/)).toBeInTheDocument();
    expect(screen.getByText(/11.4 概率不等式/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '继续阅读' })).toBeInTheDocument();
  });

  it('renders all 4 real learning paths with active indicator and links', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        settings: { theme: 'system', fontSize: 'md', measure: 'standard', focus: false, proofDefault: 'open' },
        progress: {},
        lastLocation: null,
        bookmarks: { sections: [], formulas: [] },
        path: { active: 'internship' },
        activity: [],
      })
    );

    render(
      <StoreProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await screen.findByText('量化实习冲刺')).toBeInTheDocument();
    expect(screen.getByText('系统数学进阶')).toBeInTheDocument();
    expect(screen.getByText('量化研究应用')).toBeInTheDocument();
    expect(screen.getByText('自由学习模式')).toBeInTheDocument();

    // Active path badge
    expect(screen.getByText('正在进行')).toBeInTheDocument();

    // Link to all paths
    expect(screen.getByRole('link', { name: '查看周计划' })).toHaveAttribute(
      'href',
      '/paths'
    );
  });
});
