import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { loadStore, STORAGE_KEY } from '../src/features/store/storage';
import { StoreProvider, useStore } from '../src/features/store/store';

function wrapper({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

describe('Practice Store & Review Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('marks exercise correct: sets status, attempts, lastAt, logs activity, not in review', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.markExercise('c01-ex-1', {
        chapterId: 'c01',
        number: 1,
        correct: true,
      });
    });

    const ex = result.current.store.exercises['c01-ex-1'];
    expect(ex).toBeDefined();
    expect(ex.status).toBe('correct');
    expect(ex.attempts).toBe(1);
    expect(ex.chapterId).toBe('c01');
    expect(ex.number).toBe(1);
    expect(typeof ex.lastAt).toBe('string');

    // Should NOT be in review queue
    expect(result.current.store.review['c01-ex-1']).toBeUndefined();

    // Activity log contains exercise item
    const lastAct = result.current.store.activity[0];
    expect(lastAct).toBeDefined();
    expect(lastAct.type).toBe('exercise');
    expect(lastAct.targetId).toBe('c01-ex-1');
    expect(lastAct.detail).toBe('correct');
  });

  it('marks exercise wrong: enters review queue with dueAt ~+1 day and correctStreak 0', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    const before = Date.now();
    act(() => {
      result.current.markExercise('c01-ex-2', {
        chapterId: 'c01',
        number: 2,
        correct: false,
      });
    });
    const after = Date.now();

    const ex = result.current.store.exercises['c01-ex-2'];
    expect(ex.status).toBe('wrong');
    expect(ex.attempts).toBe(1);

    const rev = result.current.store.review['c01-ex-2'];
    expect(rev).toBeDefined();
    expect(rev.kind).toBe('exercise');
    expect(rev.chapterId).toBe('c01');
    expect(rev.number).toBe(2);
    expect(rev.intervalDays).toBe(1);
    expect(rev.correctStreak).toBe(0);

    const dueTime = new Date(rev.dueAt).getTime();
    expect(dueTime).toBeGreaterThanOrEqual(before + 86400000);
    expect(dueTime).toBeLessThanOrEqual(after + 86400000 + 1000);
  });

  it('increments attempts on repeated marks', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.markExercise('c01-ex-3', { chapterId: 'c01', number: 3, correct: false });
    });
    expect(result.current.store.exercises['c01-ex-3'].attempts).toBe(1);

    act(() => {
      result.current.markExercise('c01-ex-3', { chapterId: 'c01', number: 3, correct: true });
    });
    expect(result.current.store.exercises['c01-ex-3'].attempts).toBe(2);
    expect(result.current.store.exercises['c01-ex-3'].status).toBe('correct');
  });

  it('handles review schedule: 1 day -> 3 days -> 7 days -> removed on 3rd correct', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    // 1. Initial mistake -> interval: 1 day, streak: 0
    act(() => {
      result.current.markExercise('c02-ex-1', { chapterId: 'c02', number: 1, correct: false });
    });
    expect(result.current.store.review['c02-ex-1'].correctStreak).toBe(0);
    expect(result.current.store.review['c02-ex-1'].intervalDays).toBe(1);

    // 2. First review correct -> interval: 3 days (streak 1)
    act(() => {
      result.current.reviewWrongExercise('c02-ex-1', true);
    });
    expect(result.current.store.review['c02-ex-1'].correctStreak).toBe(1);
    expect(result.current.store.review['c02-ex-1'].intervalDays).toBe(3);

    // 3. Second review correct -> interval: 7 days (streak 2)
    act(() => {
      result.current.reviewWrongExercise('c02-ex-1', true);
    });
    expect(result.current.store.review['c02-ex-1'].correctStreak).toBe(2);
    expect(result.current.store.review['c02-ex-1'].intervalDays).toBe(7);

    // 4. Third review correct -> removed completely from review queue
    act(() => {
      result.current.reviewWrongExercise('c02-ex-1', true);
    });
    expect(result.current.store.review['c02-ex-1']).toBeUndefined();
    expect(result.current.store.exercises['c02-ex-1'].status).toBe('correct');
    expect(result.current.store.exercises['c02-ex-1'].attempts).toBe(4);
  });

  it('resets streak to 0 and interval to 1 on review mistake', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.markExercise('c03-ex-1', { chapterId: 'c03', number: 1, correct: false });
      result.current.reviewWrongExercise('c03-ex-1', true);
      result.current.reviewWrongExercise('c03-ex-1', true);
    });
    expect(result.current.store.review['c03-ex-1'].correctStreak).toBe(2);

    // Now fail review
    act(() => {
      result.current.reviewWrongExercise('c03-ex-1', false);
    });
    expect(result.current.store.review['c03-ex-1'].correctStreak).toBe(0);
    expect(result.current.store.review['c03-ex-1'].intervalDays).toBe(1);
    expect(result.current.store.exercises['c03-ex-1'].status).toBe('wrong');
  });

  it('markExerciseMastered removes from review and marks status correct', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.markExercise('c04-ex-1', { chapterId: 'c04', number: 1, correct: false });
    });
    expect(result.current.store.review['c04-ex-1']).toBeDefined();

    act(() => {
      result.current.markExerciseMastered('c04-ex-1');
    });
    expect(result.current.store.review['c04-ex-1']).toBeUndefined();
    expect(result.current.store.exercises['c04-ex-1'].status).toBe('correct');

    const lastAct = result.current.store.activity[0];
    expect(lastAct.detail).toBe('mastered');
  });

  it('removeWrongExercise sets status unseen and removes from review', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current.markExercise('c05-ex-1', { chapterId: 'c05', number: 1, correct: false });
    });
    expect(result.current.store.review['c05-ex-1']).toBeDefined();

    act(() => {
      result.current.removeWrongExercise('c05-ex-1');
    });
    expect(result.current.store.review['c05-ex-1']).toBeUndefined();
    expect(result.current.store.exercises['c05-ex-1'].status).toBe('unseen');
  });

  it('cleans up legacy and corrupted exercise/review records safely on load', () => {
    const legacyPayload = {
      schemaVersion: 1,
      settings: {
        theme: 'light',
        fontSize: 'md',
        measure: 'standard',
        focus: false,
        proofDefault: 'open',
      },
      progress: {},
      exercises: {
        'valid-1': {
          status: 'correct',
          chapterId: 'c01',
          number: 1,
          attempts: 2,
          lastAt: new Date().toISOString(),
        },
        'invalid-1': 'not-an-object',
        'invalid-2': { status: 'unknown-status', attempts: 'bad' },
        'invalid-3': null,
      },
      review: {
        'valid-rev': {
          kind: 'exercise',
          exerciseId: 'valid-1',
          chapterId: 'c01',
          number: 1,
          dueAt: new Date().toISOString(),
          intervalDays: 1,
          correctStreak: 0,
          lastAt: new Date().toISOString(),
        },
        'invalid-rev-1': { kind: 'wrong-kind' },
        'invalid-rev-2': null,
      },
      path: { active: 'internship' },
      activity: [],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyPayload));

    const { store, corrupted } = loadStore();
    expect(corrupted).toBe(false);
    // Valid exercise kept
    expect(store.exercises['valid-1']).toBeDefined();
    expect(store.exercises['valid-1'].status).toBe('correct');
    // Invalid exercises filtered
    expect(store.exercises['invalid-1']).toBeUndefined();
    expect(store.exercises['invalid-2']).toBeUndefined();
    expect(store.exercises['invalid-3']).toBeUndefined();

    // Valid review kept
    expect(store.review['valid-rev']).toBeDefined();
    // Invalid reviews filtered
    expect(store.review['invalid-rev-1']).toBeUndefined();
    expect(store.review['invalid-rev-2']).toBeUndefined();

    // Other fields intact
    expect(store.settings.theme).toBe('light');
    expect(store.path.active).toBe('internship');
  });
});
