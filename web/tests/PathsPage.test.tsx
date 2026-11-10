import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearBookCache } from '../src/features/content/loadBook';
import { clearPathsCache } from '../src/features/paths/loadPaths';
import { STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { PathsPage } from '../src/routes/PathsPage';

const bookJsonPath = path.resolve(__dirname, '../../content/generated/site/book.json');
const realBook = JSON.parse(fs.readFileSync(bookJsonPath, 'utf-8'));
const pathsJsonPath = path.resolve(__dirname, '../../content/generated/site/paths.json');
const realPaths = JSON.parse(fs.readFileSync(pathsJsonPath, 'utf-8'));

describe('PathsPage', () => {
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

  it('renders all 4 learning paths with academic list-style layout', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <PathsPage />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await screen.findByText('量化实习冲刺')).toBeInTheDocument();
    expect(screen.getByText('系统数学进阶')).toBeInTheDocument();
    expect(screen.getByText('量化研究应用')).toBeInTheDocument();
    expect(screen.getByText('自由学习模式')).toBeInTheDocument();

    // Stats
    expect(screen.getByText('8 周')).toBeInTheDocument();
    expect(screen.getByText('20 周')).toBeInTheDocument();
    expect(screen.getByText('14 周')).toBeInTheDocument();
    expect(screen.getAllByText(/219 节/).length).toBeGreaterThan(0);

    // Principle reminder
    expect(
      screen.getByText(/学习路径只给出推荐顺序/)
    ).toBeInTheDocument();
  });

  it('allows user to switch the active path', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <PathsPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByText('量化实习冲刺');

    // Default path in store is 'free' or 'internship' depending on init; find the '设为主路径' button for internship
    const setInternshipBtns = screen.getAllByRole('button', { name: /设为主路径/i });
    expect(setInternshipBtns.length).toBeGreaterThan(0);

    // Click to set internship as main path
    fireEvent.click(setInternshipBtns[0]);

    // Check localStorage via waitFor
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(saved.path?.active).toBe('internship');
    });
  });

  it('displays accurate progress when sections are marked completed', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        settings: { theme: 'system', fontSize: 'md', measure: 'standard', focus: false, proofDefault: 'open' },
        progress: {
          'c01-s1': { status: 'done' },
          'c01-s2': { status: 'done' },
          'c01-s3': { status: 'master' },
        },
        lastLocation: null,
        bookmarks: { sections: [], formulas: [] },
        path: { active: 'internship' },
        activity: [],
      })
    );

    render(
      <StoreProvider>
        <MemoryRouter>
          <PathsPage />
        </MemoryRouter>
      </StoreProvider>
    );

    await screen.findByText('量化实习冲刺');

    // There should be progress reported
    expect(screen.getAllByText(/3 \/ 219 节/).length).toBeGreaterThan(0);
  });
});
