import { beforeEach, describe, expect, it } from 'vitest';
import {
  checkStorageAvailability,
  DEFAULT_STORE,
  loadStore,
  saveStoreDirect,
  STORAGE_KEY,
} from '../src/features/store/storage';

describe('Storage foundation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('checks storage availability successfully', () => {
    expect(checkStorageAvailability()).toBe(true);
  });

  it('loads default store when localStorage is empty', () => {
    const { store, corrupted, available } = loadStore();
    expect(available).toBe(true);
    expect(corrupted).toBe(false);
    expect(store.schemaVersion).toBe(1);
    expect(store.settings.theme).toBe('system');
  });

  it('saves and reloads store successfully', () => {
    const customStore = {
      ...DEFAULT_STORE,
      settings: {
        ...DEFAULT_STORE.settings,
        theme: 'dark' as const,
      },
      lastLocation: {
        chapterId: 'c11',
        sectionId: 'c11-s4',
        at: new Date().toISOString(),
      },
    };

    expect(saveStoreDirect(customStore)).toBe(true);

    const { store, corrupted } = loadStore();
    expect(corrupted).toBe(false);
    expect(store.settings.theme).toBe('dark');
    expect(store.lastLocation?.chapterId).toBe('c11');
  });

  it('recovers gracefully from corrupted JSON and backs up corrupt data', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid-json-data');

    const { store, corrupted, available } = loadStore();
    expect(available).toBe(true);
    expect(corrupted).toBe(true);
    expect(store.schemaVersion).toBe(1);

    // Verify backup key was created
    const keys = Object.keys(localStorage);
    const backupKey = keys.find((k) => k.startsWith('qma:store:corrupt:'));
    expect(backupKey).toBeDefined();
    expect(localStorage.getItem(backupKey!)).toBe('{invalid-json-data');
  });
});
