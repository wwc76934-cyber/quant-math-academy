import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_STORE, loadStore, STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider, useStore } from '../src/features/store/store';

function wrapper({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

describe('T13 Notes & Data Store Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.removeProperty('--prose-leading');
  });

  describe('Notes store operations', () => {
    it('sets note with valid text, creates ISO updatedAt, and logs activity', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c01-s1', '柯西不等式在内积空间的经典证明步骤');
      });

      const note = result.current.store.notes['c01-s1'];
      expect(note).toBeDefined();
      expect(note.text).toBe('柯西不等式在内积空间的经典证明步骤');
      expect(typeof note.updatedAt).toBe('string');
      expect(Number.isNaN(Date.parse(note.updatedAt))).toBe(false);

      const lastAct = result.current.store.activity[0];
      expect(lastAct).toBeDefined();
      expect(lastAct.type).toBe('note');
      expect(lastAct.targetId).toBe('c01-s1');
      expect(lastAct.detail).toBe('save');
    });

    it('updates existing note and modifies updatedAt', async () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c01-s1', '初版草稿');
      });
      const firstUpdatedAt = result.current.store.notes['c01-s1'].updatedAt;

      // Small delay to ensure timestamp difference if needed
      await new Promise((r) => setTimeout(r, 20));

      act(() => {
        result.current.setNote('c01-s1', '更新后的推导细节');
      });

      const updated = result.current.store.notes['c01-s1'];
      expect(updated.text).toBe('更新后的推导细节');
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(firstUpdatedAt).getTime()
      );
    });

    it('treats empty text or whitespace-only text as deletion', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c02-s1', '待删除的测试笔记');
      });
      expect(result.current.store.notes['c02-s1']).toBeDefined();

      // Setting empty string
      act(() => {
        result.current.setNote('c02-s1', '');
      });
      expect(result.current.store.notes['c02-s1']).toBeUndefined();

      // Setting whitespace-only
      act(() => {
        result.current.setNote('c02-s2', '有效内容');
      });
      expect(result.current.store.notes['c02-s2']).toBeDefined();

      act(() => {
        result.current.setNote('c02-s2', '   \n  \t  ');
      });
      expect(result.current.store.notes['c02-s2']).toBeUndefined();
    });

    it('deleteNote explicitly removes the note', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c03-s1', '测试显式删除');
      });
      expect(result.current.store.notes['c03-s1']).toBeDefined();

      act(() => {
        result.current.deleteNote('c03-s1');
      });
      expect(result.current.store.notes['c03-s1']).toBeUndefined();

      const lastAct = result.current.store.activity[0];
      expect(lastAct.type).toBe('note');
      expect(lastAct.detail).toBe('delete');
    });
  });

  describe('Line height setting & CSS variable sync', () => {
    it('persists lineHeight setting and updates --prose-leading CSS variable', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      // Default is standard (1.9)
      expect(result.current.store.settings.lineHeight).toBe('standard');
      expect(document.documentElement.style.getPropertyValue('--prose-leading')).toBe('1.9');

      // Switch to compact (1.75)
      act(() => {
        result.current.setLineHeight('compact');
      });
      expect(result.current.store.settings.lineHeight).toBe('compact');
      expect(document.documentElement.style.getPropertyValue('--prose-leading')).toBe('1.75');

      // Switch to loose (2.1)
      act(() => {
        result.current.setLineHeight('loose');
      });
      expect(result.current.store.settings.lineHeight).toBe('loose');
      expect(document.documentElement.style.getPropertyValue('--prose-leading')).toBe('2.1');
    });
  });

  describe('Legacy and bad notes data sanitization (loadStore)', () => {
    it('filters out non-object and corrupted notes entries without throwing', () => {
      const corruptPayload = {
        schemaVersion: 1,
        settings: {
          theme: 'light',
          fontSize: 'md',
          measure: 'standard',
          lineHeight: 'invalid-height', // bad line height
          focus: false,
          proofDefault: 'open',
        },
        progress: {},
        exercises: {},
        review: {},
        notes: {
          'c01-s1': {
            text: '正常的数学笔记',
            updatedAt: '2026-11-09T10:00:00.000Z',
          },
          'corrupt-1': 'string-instead-of-object',
          'corrupt-2': { text: 12345, updatedAt: '2026-11-09T10:00:00.000Z' },
          'corrupt-3': { text: '缺少 updatedAt' },
          'corrupt-4': null,
          'corrupt-5': { text: 'bad date', updatedAt: 'not-a-date' },
        },
        path: { active: 'none' },
        activity: [],
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(corruptPayload));

      const { store, corrupted } = loadStore();
      expect(corrupted).toBe(false);

      // Valid note preserved
      expect(store.notes['c01-s1']).toBeDefined();
      expect(store.notes['c01-s1'].text).toBe('正常的数学笔记');

      // Corrupt notes pruned
      expect(store.notes['corrupt-1']).toBeUndefined();
      expect(store.notes['corrupt-2']).toBeUndefined();
      expect(store.notes['corrupt-3']).toBeUndefined();
      expect(store.notes['corrupt-4']).toBeUndefined();
      expect(store.notes['corrupt-5']).toBeUndefined();

      // Bad lineHeight falls back to standard
      expect(store.settings.lineHeight).toBe('standard');
    });
  });

  describe('importStore & resetStore', () => {
    it('rejects invalid JSON, non-object and wrong schemaVersion without modifying store', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c01-s1', '重要记录勿被覆盖');
      });

      // 1. Primitive string
      act(() => {
        const res = result.current.importStore('invalid string payload');
        expect(res.success).toBe(false);
        expect(res.error).toMatch(/有效.*对象/i);
      });
      expect(result.current.store.notes['c01-s1']).toBeDefined();

      // 2. Wrong schema version (v2)
      act(() => {
        const res = result.current.importStore({ schemaVersion: 2 });
        expect(res.success).toBe(false);
        expect(res.error).toMatch(/schemaVersion/i);
      });
      expect(result.current.store.notes['c01-s1']).toBeDefined();

      // 3. Missing settings
      act(() => {
        const res = result.current.importStore({ schemaVersion: 1 });
        expect(res.success).toBe(false);
        expect(res.error).toMatch(/settings/i);
      });
      expect(result.current.store.notes['c01-s1']).toBeDefined();
    });

    it('successfully imports valid backup with wrapper format and updates state', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      const backupData = {
        schemaVersion: 1,
        exportedAt: '2026-11-09T12:00:00.000Z',
        app: 'quant-math-academy',
        store: {
          schemaVersion: 1,
          settings: {
            theme: 'dark',
            fontSize: 'lg',
            measure: 'wide',
            lineHeight: 'loose',
            focus: true,
            proofDefault: 'closed',
          },
          progress: {
            'c01-s1': { status: 'master' },
            'c01-s2': { status: 'done' },
          },
          exercises: {
            'c01-ex-1': {
              status: 'correct',
              chapterId: 'c01',
              number: 1,
              attempts: 1,
              lastAt: '2026-11-09T12:00:00.000Z',
            },
          },
          review: {
            'c01-ex-2': {
              kind: 'exercise',
              exerciseId: 'c01-ex-2',
              chapterId: 'c01',
              number: 2,
              dueAt: '2026-11-10T12:00:00.000Z',
              intervalDays: 1,
              correctStreak: 0,
              lastAt: '2026-11-09T12:00:00.000Z',
            },
          },
          notes: {
            'c01-s1': {
              text: '导入的备份笔记条目',
              updatedAt: '2026-11-09T12:00:00.000Z',
            },
          },
          path: { active: 'internship' },
          activity: [],
        },
      };

      act(() => {
        const res = result.current.importStore(backupData);
        expect(res.success).toBe(true);
        expect(res.summary).toBeDefined();
        expect(res.summary?.progressCount).toBe(2);
        expect(res.summary?.exerciseCount).toBe(1);
        expect(res.summary?.wrongCount).toBe(1);
        expect(res.summary?.noteCount).toBe(1);
        expect(res.summary?.activePath).toBe('internship');
      });

      // Verify store updated
      expect(result.current.store.settings.lineHeight).toBe('loose');
      expect(result.current.store.settings.theme).toBe('dark');
      expect(result.current.store.notes['c01-s1'].text).toBe('导入的备份笔记条目');
      expect(result.current.store.progress['c01-s1'].status).toBe('master');
      expect(result.current.store.path.active).toBe('internship');
    });

    it('resetStore clears all customizations back to DEFAULT_STORE', () => {
      const { result } = renderHook(() => useStore(), { wrapper });

      act(() => {
        result.current.setNote('c01-s1', '需要重置的笔记');
        result.current.setLineHeight('compact');
      });
      expect(result.current.store.notes['c01-s1']).toBeDefined();
      expect(result.current.store.settings.lineHeight).toBe('compact');

      act(() => {
        result.current.resetStore();
      });

      expect(result.current.store).toEqual(DEFAULT_STORE);
      expect(result.current.store.notes).toEqual({});
      expect(result.current.store.settings.lineHeight).toBe('standard');
    });
  });
});
