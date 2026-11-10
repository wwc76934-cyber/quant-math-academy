import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearGraphCache } from '../src/features/graph/loadGraph';
import { GraphPage } from '../src/routes/GraphPage';

const graphPath = path.resolve(__dirname, '../../content/generated/site/graph.json');
const realGraph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

describe('GraphPage', () => {
  beforeEach(() => {
    clearGraphCache();
    vi.restoreAllMocks();

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('graph.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => realGraph,
        } as Response;
      }
      return { ok: false, status: 404 } as Response;
    });
  });

  afterEach(() => {
    clearGraphCache();
  });

  it('renders header, description, and stats banner with 219 nodes and 0 cycles', async () => {
    render(
      <MemoryRouter initialEntries={['/graph']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('知识关系')).toBeInTheDocument();
    expect(
      screen.getByText(/先修是学习的必要前提，相关是横向思维关联/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('219').length).toBeGreaterThan(0);
      expect(screen.getByText('0 环严格 DAG')).toBeInTheDocument();
      // Dynamic annotated nodes count on filter chip
      expect(
        screen.getByRole('button', {
          name: `只看已标注 (${realGraph.stats.annotatedNodes} 节)`,
        })
      ).toBeInTheDocument();
      expect(screen.queryByText(/只看已标注 \(25 节\)/)).not.toBeInTheDocument();
    });
  });

  it('renders chapter grouping, table column headers and honest notices on unannotated chapters', async () => {
    render(
      <MemoryRouter initialEntries={['/graph']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('C11')).toBeInTheDocument();
      expect(screen.getByText('期望、方差、矩与概率不等式')).toBeInTheDocument();
    });

    // Check visible 4-column headers
    expect(screen.getAllByText('本节').length).toBeGreaterThan(0);
    expect(screen.getAllByText('先修').length).toBeGreaterThan(0);
    expect(screen.getAllByText('横向相关').length).toBeGreaterThan(0);
    expect(screen.getAllByText('引用').length).toBeGreaterThan(0);

    // C01 1.5 formatDisplayTitle check: no raw \varepsilon
    expect(screen.getAllByText(/数列极限与 ε-N 语言/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/\\varepsilon-N/)).not.toBeInTheDocument();

    // C11, C01, C08 have annotated badge
    const badges = screen.getAllByText(/已标注 6 \/ 6 节/i);
    expect(badges.length).toBeGreaterThan(0);

    // Unannotated chapters have honest notice (34 - 34 = 0, all 34 chapters are annotated)
    const unannotatedNotices = screen.queryAllByText(
      /本章还没有整理先修与关联关系/i
    );
    expect(unannotatedNotices.length).toBe(0);
  });

  it('filters by scope: clicking "只看已标注" displays all chapters since all are annotated', async () => {
    render(
      <MemoryRouter initialEntries={['/graph']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('C16')).toBeInTheDocument();
    });

    const annotatedChip = screen.getByRole('button', {
      name: `只看已标注 (${realGraph.stats.annotatedNodes} 节)`,
    });
    fireEvent.click(annotatedChip);

    await waitFor(() => {
      // C34 is annotated and should still be displayed in the list
      expect(screen.getByText('C34')).toBeInTheDocument();
      // C11 is annotated and should still be displayed
      expect(screen.getByText('C11')).toBeInTheDocument();
    });
  });

  it('filters by priority: selecting P0 displays only P0 sections', async () => {
    render(
      <MemoryRouter initialEntries={['/graph']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('C11')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('按优先级筛选');
    fireEvent.change(select, { target: { value: 'P0' } });

    await waitFor(() => {
      // 11.1 is P0, should be in document
      expect(screen.getByText('11.1')).toBeInTheDocument();
    });
  });

  it('highlights target section row when ?section=c11-s4 is in URL', async () => {
    render(
      <MemoryRouter initialEntries={['/graph?section=c11-s4']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const row = document.getElementById('c11-s4');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('is-highlighted');
    });
  });

  it('renders prerequisite chips, citations and reader links', async () => {
    render(
      <MemoryRouter initialEntries={['/graph?chapter=c11']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // c11-s4 has prerequisites
      expect(screen.getByText('概率不等式')).toBeInTheDocument();
      // Prerequisite chip linking to c11-s1
      expect(screen.getAllByText(/期望的定义与性质/i).length).toBeGreaterThan(0);
      // Citations badge
      expect(screen.getAllByText(/被引 \d+ 次/i).length).toBeGreaterThan(0);
    });
  });

  it('renders error state and allows retry on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    render(
      <MemoryRouter initialEntries={['/graph']}>
        <Routes>
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/加载知识关系图失败/i)).toBeInTheDocument();
    });

    // Mock success for retry
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => realGraph,
    } as Response);

    const retryBtn = screen.getByRole('button', { name: /重试加载/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getAllByText('219').length).toBeGreaterThan(0);
    });
  });
});
