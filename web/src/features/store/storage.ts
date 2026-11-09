import { ExerciseRecord, ReviewRecord, StoreV1 } from './types';

export const STORAGE_KEY = 'qma:store:v1';
export const CORRUPT_KEY_PREFIX = 'qma:store:corrupt:';

export const DEFAULT_STORE: StoreV1 = {
  schemaVersion: 1,
  settings: {
    theme: 'system',
    fontSize: 'lg',
    measure: 'standard',
    focus: false,
    proofDefault: 'open',
  },
  progress: {},
  lastLocation: undefined,
  exercises: {},
  notes: {},
  bookmarks: {
    sections: [],
    formulas: [],
  },
  review: {},
  path: {
    active: 'free',
  },
  activity: [],
};

export function checkStorageAvailability(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__qma_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadStore(): { store: StoreV1; corrupted: boolean; available: boolean } {
  const available = checkStorageAvailability();
  if (!available) {
    return { store: DEFAULT_STORE, corrupted: false, available: false };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { store: DEFAULT_STORE, corrupted: false, available: true };
    }

    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.schemaVersion !== 1 ||
      !parsed.settings
    ) {
      throw new Error('Invalid store structure or unsupported schemaVersion');
    }

    // Sanitize exercises safely (fault-tolerant against malformed records)
    const safeExercises: Record<string, ExerciseRecord> = {};
    if (parsed.exercises && typeof parsed.exercises === 'object') {
      for (const [key, val] of Object.entries(parsed.exercises)) {
        if (
          val &&
          typeof val === 'object' &&
          'status' in val &&
          typeof (val as ExerciseRecord).chapterId === 'string'
        ) {
          safeExercises[key] = val as ExerciseRecord;
        }
      }
    }

    // Sanitize review records safely
    const safeReview: Record<string, ReviewRecord> = {};
    if (parsed.review && typeof parsed.review === 'object') {
      for (const [key, val] of Object.entries(parsed.review)) {
        if (
          val &&
          typeof val === 'object' &&
          (val as ReviewRecord).kind === 'exercise' &&
          typeof (val as ReviewRecord).dueAt === 'string'
        ) {
          safeReview[key] = val as ReviewRecord;
        }
      }
    }

    // Merge with defaults to ensure all fields are present
    const store: StoreV1 = {
      ...DEFAULT_STORE,
      ...parsed,
      settings: {
        ...DEFAULT_STORE.settings,
        ...(parsed.settings || {}),
      },
      progress: parsed.progress || {},
      exercises: safeExercises,
      review: safeReview,
      bookmarks: {
        ...DEFAULT_STORE.bookmarks,
        ...(parsed.bookmarks || {}),
      },
      path: {
        ...DEFAULT_STORE.path,
        ...(parsed.path || {}),
      },
    };

    return { store, corrupted: false, available: true };
  } catch (err) {
    // Attempt to backup corrupted data
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        window.localStorage.setItem(`${CORRUPT_KEY_PREFIX}${Date.now()}`, raw);
      }
    } catch {
      // Ignore backup error
    }

    return { store: DEFAULT_STORE, corrupted: true, available: true };
  }
}

export function saveStoreDirect(store: StoreV1): boolean {
  if (!checkStorageAvailability()) {
    return false;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch (err) {
    console.warn('[Store] Failed to write to localStorage:', err);
    return false;
  }
}
