import fs from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache } from '../src/features/content/loadBook';
import { STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { HomePage } from '../src/routes/HomePage';

const bookJsonPath = path.resolve(__dirname, '../../content/generated/site/book.json');
const realBook = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    clearBookCache();
    vi.restoreAllMocks();
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      if (String(url).includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realBook,
        } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });
  });

  afterEach(() => {
    clearBookCache();
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
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText('章 / 8 篇')).toBeInTheDocument();
    expect(screen.getByText('219')).toBeInTheDocument();
    expect(screen.getByText('个知识点')).toBeInTheDocument();
    expect(screen.getByText('3,276')).toBeInTheDocument();
    expect(screen.getByText('条公式')).toBeInTheDocument();
  });

  it('renders empty start state when no lastLocation exists', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByText(/从知道学什么开始/);

    expect(screen.getByText('从第一篇基础开始')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '从第 1 章开始 →' })).toBeInTheDocument();
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

    await screen.findByText(/从知道学什么开始/);

    // Should display Continue Learning card for C11
    expect(screen.getByText(/第11章/)).toBeInTheDocument();
    expect(screen.getByText(/期望、方差、矩与概率不等式/)).toBeInTheDocument();
    expect(screen.getByText(/11.4 概率不等式/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '继续阅读 →' })).toBeInTheDocument();
  });
});
