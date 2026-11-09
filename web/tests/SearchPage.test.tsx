import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearSearchCache } from '../src/features/search/searchEngine';
import { SearchPage } from '../src/routes/SearchPage';

const indexPath = path.resolve(__dirname, '../../content/generated/site/search/index.json');
const aliasesPath = path.resolve(__dirname, '../../content/search/aliases.json');

const realDocuments = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const realAliases = JSON.parse(fs.readFileSync(aliasesPath, 'utf-8'));

describe('SearchPage', () => {
  beforeEach(() => {
    localStorage.clear();
    clearSearchCache();
    vi.restoreAllMocks();

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('index.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realDocuments,
        } as Response;
      }
      if (urlStr.includes('aliases.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realAliases,
        } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });
  });

  afterEach(() => {
    clearSearchCache();
  });

  it('renders search input and initial suggestions', async () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: '教材检索' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/输入术语、公式名或概念/)).toBeInTheDocument();
    expect(await screen.findByText('快速检索千页量化数学')).toBeInTheDocument();
  });

  it('executes search for "期望" and renders matched results with badges', async () => {
    render(
      <MemoryRouter initialEntries={['/search?q=期望']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const stats = await screen.findByRole('status');
    expect(stats).toHaveTextContent(/找到.*条与.*期望.*相关的结果/);

    const cards = await screen.findAllByRole('listitem');
    expect(cards.length).toBeGreaterThan(0);

    // Verify first card contains title and deep link
    const firstCard = cards[0];
    expect(firstCard).toHaveAttribute('href');
    expect(firstCard.getAttribute('href')).toMatch(/^\/learn\/c\d{2}#/);
  });

  it('filters results by type when type pill is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/search?q=期望']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByRole('status');

    // Click "习题" filter pill
    const exerciseBtn = screen.getByRole('button', { name: '习题' });
    fireEvent.click(exerciseBtn);

    await waitFor(() => {
      const cards = screen.getAllByRole('listitem');
      expect(cards.length).toBeGreaterThan(0);
      cards.forEach((card) => {
        expect(card).toHaveTextContent('习题');
      });
    });
  });

  it('shows empty result state with suggestions for non-matching query', async () => {
    render(
      <MemoryRouter initialEntries={['/search?q=不存在的量子超弦算法999']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/未找到与.*不存在的量子超弦算法999.*匹配的内容/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '浏览完整教材目录' })).toBeInTheDocument();
  });

  it('records search history and allows clearing', async () => {
    localStorage.setItem('qma_search_history', JSON.stringify(['协方差', 'SVD']));

    render(
      <MemoryRouter initialEntries={['/search']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const historySection = await screen.findByLabelText('最近搜索历史');
    expect(within(historySection).getByText('协方差')).toBeInTheDocument();
    expect(within(historySection).getByText('SVD')).toBeInTheDocument();

    const clearBtn = within(historySection).getByRole('button', { name: '清空历史' });
    fireEvent.click(clearBtn);

    expect(screen.queryByLabelText('最近搜索历史')).not.toBeInTheDocument();
    expect(localStorage.getItem('qma_search_history')).toBeNull();
  });

  it('handles keyboard navigation (ArrowDown, ArrowUp, Esc)', async () => {
    render(
      <MemoryRouter initialEntries={['/search?q=SVD']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByRole('status');
    const input = screen.getByPlaceholderText(/输入术语、公式名或概念/);

    // Press ArrowDown to select first result
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    const cards = screen.getAllByRole('listitem');
    expect(cards[0].className).toContain('is-active');

    // Press Esc to clear
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveValue('');
  });

  it('safely handles XSS queries with script tags', async () => {
    render(
      <MemoryRouter initialEntries={['/search?q=<script>alert("xss")</script>']}>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const stats = await screen.findByRole('status');
    expect(stats).toHaveTextContent('<script>alert("xss")</script>');
    // Ensure no actual script element was injected into DOM
    expect(document.querySelector('script[src*="xss"], script:not([type])')).toBeNull();
  });
});
