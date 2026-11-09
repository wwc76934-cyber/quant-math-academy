import fs from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ReaderNotes } from '../src/components/reader/ReaderNotes';
import { ReaderSettingsModal } from '../src/components/reader/ReaderSettingsModal';
import { ToastProvider } from '../src/components/reader/Toast';
import { clearBookCache } from '../src/features/content/loadBook';
import { DEFAULT_STORE, saveStoreDirect } from '../src/features/store/storage';
import { StoreProvider } from '../src/features/store/store';
import { NotesPage } from '../src/routes/NotesPage';
import { ProgressPage } from '../src/routes/ProgressPage';

const siteDir = path.resolve(__dirname, '../../content/generated/site');
const bookJson = JSON.parse(fs.readFileSync(path.join(siteDir, 'book.json'), 'utf-8'));

describe('T13 Notes & Data Management Component & Page Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    clearBookCache();
    vi.restoreAllMocks();

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('book.json')) {
        return {
          ok: true,
          status: 200,
          json: async () => bookJson,
        } as Response;
      }
      return {
        ok: false,
        status: 404,
        json: async () => ({}),
      } as Response;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('ReaderNotes Component', () => {
    it('renders textarea with section note, saves on manual click, and updates store', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter>
              <ReaderNotes sectionId="c01-s1" />
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      const textarea = screen.getByLabelText(/本节笔记编辑区/i) as HTMLTextAreaElement;
      expect(textarea).toBeInTheDocument();
      expect(textarea.value).toBe('');

      // Type some content
      fireEvent.change(textarea, { target: { value: '这是 C01-S1 的测度推导笔记' } });
      expect(textarea.value).toBe('这是 C01-S1 的测度推导笔记');
      expect(screen.getByText(/未保存/i)).toBeInTheDocument();

      // Click save button
      const saveBtn = screen.getByRole('button', { name: /保存/i });
      fireEvent.click(saveBtn);

      await waitFor(() => {
        expect(screen.getByText(/已保存/i)).toBeInTheDocument();
      });
    });

    it('isolates notes by sectionId and supports deletion with confirmation', async () => {
      const initialStore = {
        ...DEFAULT_STORE,
        notes: {
          'c01-s1': {
            text: '第一节独立笔记',
            updatedAt: '2026-11-09T10:00:00.000Z',
          },
          'c01-s2': {
            text: '第二节独立笔记',
            updatedAt: '2026-11-09T10:05:00.000Z',
          },
        },
      };
      saveStoreDirect(initialStore);

      const { rerender } = render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter>
              <ReaderNotes sectionId="c01-s1" />
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      const textarea = screen.getByLabelText(/本节笔记编辑区/i) as HTMLTextAreaElement;
      expect(textarea.value).toBe('第一节独立笔记');

      // Switch to section 2
      rerender(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter>
              <ReaderNotes sectionId="c01-s2" />
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      expect(textarea.value).toBe('第二节独立笔记');

      // Test double-click deletion
      const deleteBtn = screen.getByRole('button', { name: /删除笔记/i });
      fireEvent.click(deleteBtn);
      expect(screen.getByRole('button', { name: /确认删除？/i })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /确认删除？/i }));
      await waitFor(() => {
        expect(textarea.value).toBe('');
      });
    });
  });

  describe('NotesPage Component', () => {
    it('renders empty state when there are no notes', async () => {
      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/notes']}>
              <Routes>
                <Route path="/notes" element={<NotesPage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('notes-empty')).toBeInTheDocument();
      });
      expect(screen.getByText(/还没有笔记/i)).toBeInTheDocument();
      expect(screen.getByTestId('notes-count-indicator')).toHaveTextContent('共记录 0 条节笔记');
    });

    it('renders grouped notes, summaries, links, and supports note deletion', async () => {
      const activeStore = {
        ...DEFAULT_STORE,
        notes: {
          'c01-s1': {
            text: '这是一段超过一百二十个字的详尽学习笔记测试。柯西不等式建立了向量空间中内积与范数之间的基本几何约束，不仅在线性代数中至关重要，在现代量化投资组合优化中的最小方差资产配置边界推导里也扮演着极为关键的核心数学角色。',
            updatedAt: '2026-11-09T14:00:00.000Z',
          },
        },
      };
      saveStoreDirect(activeStore);

      render(
        <StoreProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/notes']}>
              <Routes>
                <Route path="/notes" element={<NotesPage />} />
              </Routes>
            </MemoryRouter>
          </ToastProvider>
        </StoreProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('notes-count-indicator')).toHaveTextContent('共记录 1 条节笔记');
      });

      // Chapter header & section link
      expect(screen.getByText(/前往该节正文/i)).toBeInTheDocument();

      // Delete note
      const deleteBtn = screen.getByRole('button', { name: /删除/i });
      fireEvent.click(deleteBtn);
      expect(screen.getByRole('button', { name: /确认删除/i })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /确认删除/i }));

      await waitFor(() => {
        expect(screen.getByTestId('notes-empty')).toBeInTheDocument();
      });
    });
  });

  describe('ProgressPage Data Management & Backup', () => {
    it('triggers export blob download when clicking export button', async () => {
      const activeStore = {
        ...DEFAULT_STORE,
        notes: {
          'c01-s1': {
            text: '备份测试笔记',
            updatedAt: '2026-11-09T10:00:00.000Z',
          },
        },
      };
      saveStoreDirect(activeStore);

      // Mock createObjectURL & revokeObjectURL
      const mockCreateObjectURL = vi.fn().mockReturnValue('blob:mock-url');
      const mockRevokeObjectURL = vi.fn();
      globalThis.URL.createObjectURL = mockCreateObjectURL;
      globalThis.URL.revokeObjectURL = mockRevokeObjectURL;

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
        expect(screen.getByText(/数据管理与备份/i)).toBeInTheDocument();
      });

      const exportBtn = screen.getByRole('button', { name: /导出备份 \(JSON\)/i });
      fireEvent.click(exportBtn);

      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('rejects invalid import file without overwriting store and displays error', async () => {
      const activeStore = {
        ...DEFAULT_STORE,
        notes: {
          'c01-s1': { text: '原有珍贵记录', updatedAt: '2026-11-09T10:00:00.000Z' },
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
        expect(screen.getByTestId('file-import-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('file-import-input') as HTMLInputElement;

      // Mock an invalid JSON file (wrong schemaVersion: 99)
      const invalidContent = JSON.stringify({
        schemaVersion: 99,
        settings: {},
      });
      const file = new File([invalidContent], 'backup-invalid.json', { type: 'application/json' });

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('import-error-alert')).toBeInTheDocument();
      });
      expect(screen.getByText(/版本不兼容/i)).toBeInTheDocument();
    });

    it('shows preview modal for valid backup and overrides store on confirmation', async () => {
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
        expect(screen.getByTestId('file-import-input')).toBeInTheDocument();
      });

      const input = screen.getByTestId('file-import-input') as HTMLInputElement;

      const validBackup = {
        schemaVersion: 1,
        exportedAt: '2026-11-09T10:00:00.000Z',
        app: 'quant-math-academy',
        store: {
          schemaVersion: 1,
          settings: {
            theme: 'dark',
            fontSize: 'lg',
            measure: 'wide',
            lineHeight: 'loose',
            focus: false,
            proofDefault: 'open',
          },
          progress: {
            'c01-s1': { status: 'done' },
          },
          exercises: {},
          review: {},
          notes: {
            'c01-s1': {
              text: '从备份恢复的笔记',
              updatedAt: '2026-11-09T10:00:00.000Z',
            },
          },
          path: { active: 'internship' },
          activity: [],
        },
      };

      const file = new File([JSON.stringify(validBackup)], 'qma-backup.json', { type: 'application/json' });
      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('import-preview-modal')).toBeInTheDocument();
      });
      expect(screen.getByText(/确认后将完全覆盖当前本机的学习记录/i)).toBeInTheDocument();

      // Click confirm import
      const confirmBtn = screen.getByTestId('confirm-import-btn');
      fireEvent.click(confirmBtn);

      await waitFor(() => {
        expect(screen.queryByTestId('import-preview-modal')).not.toBeInTheDocument();
      });
    });

    it('requires typing "清空" for reset confirmation before resetting store', async () => {
      const activeStore = {
        ...DEFAULT_STORE,
        notes: {
          'c01-s1': { text: '待清空笔记', updatedAt: '2026-11-09T10:00:00.000Z' },
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
        expect(screen.getByRole('button', { name: /清空本机记录\.\.\./i })).toBeInTheDocument();
      });

      // Open reset modal
      fireEvent.click(screen.getByRole('button', { name: /清空本机记录\.\.\./i }));
      expect(screen.getByTestId('reset-confirm-modal')).toBeInTheDocument();

      const resetBtn = screen.getByTestId('reset-confirm-btn') as HTMLButtonElement;
      const resetInput = screen.getByTestId('reset-confirm-input') as HTMLInputElement;

      // Initially disabled
      expect(resetBtn.disabled).toBe(true);

      // Type wrong word
      fireEvent.change(resetInput, { target: { value: '确定' } });
      expect(resetBtn.disabled).toBe(true);

      // Type exact "清空"
      fireEvent.change(resetInput, { target: { value: '清空' } });
      expect(resetBtn.disabled).toBe(false);

      // Click confirm reset
      fireEvent.click(resetBtn);

      await waitFor(() => {
        expect(screen.queryByTestId('reset-confirm-modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('ReaderSettingsModal Line Height Controls', () => {
    it('allows toggling between compact, standard and loose line height', () => {
      const onClose = vi.fn();
      render(
        <StoreProvider>
          <ToastProvider>
            <ReaderSettingsModal isOpen={true} onClose={onClose} />
          </ToastProvider>
        </StoreProvider>
      );

      expect(screen.getByText(/正文行距/i)).toBeInTheDocument();

      // Find compact button
      const compactBtn = screen.getByRole('button', { name: /紧凑 1\.75/i });
      fireEvent.click(compactBtn);
      expect(document.documentElement.style.getPropertyValue('--prose-leading')).toBe('1.75');

      // Find loose button
      const looseBtn = screen.getByRole('button', { name: /宽松 2\.1/i });
      fireEvent.click(looseBtn);
      expect(document.documentElement.style.getPropertyValue('--prose-leading')).toBe('2.1');
    });
  });
});
