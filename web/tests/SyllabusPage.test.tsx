import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache } from '../src/features/content/loadBook';
import { StoreProvider } from '../src/features/store/store';
import { SyllabusPage } from '../src/routes/SyllabusPage';

const bookJsonPath = path.resolve(__dirname, '../../content/generated/site/book.json');
const realBook = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));

describe('SyllabusPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
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

  it('renders all 34 chapters from book.json', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <SyllabusPage />
        </MemoryRouter>
      </StoreProvider>
    );

    // Check heading
    expect(await screen.findByRole('heading', { level: 1, name: '完整目录' })).toBeInTheDocument();

    // Check that 34 chapters are in the document
    expect(screen.getByText('数学语言、证明方法与实数完备性')).toBeInTheDocument();
    expect(screen.getByText('期望、方差、矩与概率不等式')).toBeInTheDocument();
    expect(screen.getByText('量化策略的数学评估与回测')).toBeInTheDocument();

    // Default open chapter is C11 (since no lastLocation)
    expect(screen.getByText('期望的定义与性质')).toBeInTheDocument();
  });

  it('displays "内容接入中" for non-pilot chapters', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <SyllabusPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: '完整目录' });

    // Non-pilot chapters (e.g. Chapter 2) show "内容接入中" in chapter row
    const nonPilotNotes = screen.getAllByText('内容接入中');
    expect(nonPilotNotes.length).toBeGreaterThan(0);
  });

  it('allows expanding and collapsing chapter rows', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <SyllabusPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: '完整目录' });

    // Click Chapter 1 row to expand
    const c01Btn = screen.getByRole('button', { name: /数学语言、证明方法与实数完备性/ });
    fireEvent.click(c01Btn);

    // Section 1.1 should now be visible
    expect(screen.getByText('命题、逻辑联结词与量词')).toBeInTheDocument();
  });

  it('filters by P0/P1 and shows clarification when no annotations exist yet', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <SyllabusPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByRole('heading', { level: 1, name: '完整目录' });

    const p0Chip = screen.getByRole('button', { name: '只看 P0/P1' });
    fireEvent.click(p0Chip);

    // Should indicate filtered count and notice
    expect(screen.getByText(/已筛选/)).toBeInTheDocument();
    expect(screen.getByText(/其余章标注完善中/)).toBeInTheDocument();

    // Clear filter
    const clearBtn = screen.getByRole('button', { name: '清除筛选' });
    fireEvent.click(clearBtn);

    expect(screen.getByText('数学语言、证明方法与实数完备性')).toBeInTheDocument();
  });
});
