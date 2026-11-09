import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ReaderSectionInfo } from '../src/components/reader/ReaderSectionInfo';
import { clearGraphCache } from '../src/features/graph/loadGraph';
import { SectionData } from '../src/features/content/types';
import { StoreProvider } from '../src/features/store/store';

const graphPath = path.resolve(__dirname, '../../content/generated/site/graph.json');
const realGraph = JSON.parse(fs.readFileSync(graphPath, 'utf-8'));

describe('ReaderSectionInfo 知识关系增强', () => {
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

  const mockAnnotatedSection: SectionData = {
    id: 'c11-s4',
    number: '11.4',
    title: '概率不等式',
    anchor: 'c11-s4',
    htmlPath: 'sections/c11-s4.html',
    htmlBytes: 1024,
    subsections: [],
    exerciseIds: ['c11-ex-1'],
    meta: {
      difficulty: 'D3',
      priority: 'P0',
      minutes: 45,
      examFrequency: 'high',
      prerequisites: [
        { id: 'c11-s1', strength: 'required' },
        { id: 'c11-s2', strength: 'helpful' },
      ],
      related: ['c11-s6'],
      learningObjective: '掌握马尔可夫不等式与切比雪夫不等式',
    },
  };

  const mockUnannotatedSection: SectionData = {
    id: 'c16-s1',
    number: '16.1',
    title: '拉格朗日对偶性',
    anchor: 'c16-s1',
    htmlPath: 'sections/c16-s1.html',
    htmlBytes: 1024,
    subsections: [],
    exerciseIds: [],
    meta: null,
  };

  const sectionLookup = {
    'c11-s1': { number: '11.1', title: '期望的定义与性质' },
    'c11-s2': { number: '11.2', title: '方差与协方差' },
    'c11-s4': { number: '11.4', title: '概率不等式' },
    'c11-s6': { number: '11.6', title: '多元随机变量' },
    'c09-s2': { number: '9.2', title: '随机变量及其分布' },
    'c10-s2': { number: '10.2', title: '常用连续分布' },
  };

  it('renders transitive prerequisite chain with depth labels for annotated section', async () => {
    const handleOpenSection = vi.fn();

    render(
      <StoreProvider>
        <MemoryRouter>
          <ReaderSectionInfo
            section={mockAnnotatedSection}
            chapterTitle="第11章 期望、方差、矩与概率不等式"
            sectionLookup={sectionLookup}
            onOpenStatusModal={vi.fn()}
            onScrollToSection={vi.fn()}
            onOpenSection={handleOpenSection}
          />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(screen.getByText('先修知识链')).toBeInTheDocument();

    await waitFor(() => {
      // Direct prerequisites (depth 1)
      expect(screen.getByText(/11.1 期望的定义与性质/i)).toBeInTheDocument();
      // Transitive prerequisites (depth 2)
      expect(screen.getByText(/9.2 随机变量及其分布/i)).toBeInTheDocument();
    });

    // Clicking a prerequisite navigates to it
    const preLink = screen.getByText(/11.1 期望的定义与性质/i);
    fireEvent.click(preLink);
    expect(handleOpenSection).toHaveBeenCalledWith('c11-s1');
  });

  it('renders incoming citations and view full graph entry', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <ReaderSectionInfo
            section={mockAnnotatedSection}
            chapterTitle="第11章 期望、方差、矩与概率不等式"
            sectionLookup={sectionLookup}
            onOpenStatusModal={vi.fn()}
            onScrollToSection={vi.fn()}
          />
        </MemoryRouter>
      </StoreProvider>
    );

    expect(screen.getByText('被引用情况')).toBeInTheDocument();

    await waitFor(() => {
      // In graph.json, c11-s6 cites c11-s4 as prerequisite and is also related
      expect(screen.getByText(/作为先修被引用/i)).toBeInTheDocument();
      expect(screen.getAllByText(/11.6 多元随机变量/i).length).toBeGreaterThan(0);
    });

    // Link to full graph
    const fullGraphLink = screen.getByText('查看完整知识关系');
    expect(fullGraphLink).toBeInTheDocument();
    expect(fullGraphLink.closest('a')).toHaveAttribute('href', '/graph?section=c11-s4');
  });

  it('does not render fake prerequisite chains or fake citations for unannotated section', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <ReaderSectionInfo
            section={mockUnannotatedSection}
            chapterTitle="第16章 对偶理论与 KKT 条件"
            sectionLookup={sectionLookup}
            onOpenStatusModal={vi.fn()}
            onScrollToSection={vi.fn()}
          />
        </MemoryRouter>
      </StoreProvider>
    );

    // Unannotated section should show honest notice
    expect(screen.getByText('标注完善中')).toBeInTheDocument();

    // Should NOT show prerequisite chain or citations block
    expect(screen.queryByTestId('reader-prereq-chain')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reader-incoming-citations')).not.toBeInTheDocument();

    // Still provides entry to graph
    const graphLink = screen.getByText('查看完整知识关系');
    expect(graphLink).toBeInTheDocument();
    expect(graphLink.closest('a')).toHaveAttribute('href', '/graph?section=c16-s1');
  });
});
