import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  loadStore,
  saveStoreDirect,
} from './storage';
import {
  FontSizeSetting,
  MeasureSetting,
  ProofDefaultSetting,
  SectionProgressItem,
  StoreContextValue,
  StoreV1,
  ThemeSetting,
} from './types';

const StoreContext = createContext<StoreContextValue | null>(null);

const FONT_SIZE_MAP: Record<FontSizeSetting, string> = {
  sm: '16px',
  md: '17px',
  lg: '18px',
  xl: '20px',
};

const MEASURE_MAP: Record<MeasureSetting, string> = {
  narrow: '34em',
  standard: '38em',
  wide: '40em',
};

function applyThemeToDocument(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  if (resolved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initResult] = useState(() => loadStore());
  const [store, setStore] = useState<StoreV1>(initResult.store);
  const [storageAvailable] = useState<boolean>(initResult.available);
  const [storageCorrupted, setStorageCorrupted] = useState<boolean>(
    initResult.corrupted
  );

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const resolvedTheme: 'light' | 'dark' = useMemo(() => {
    if (store.settings.theme === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return store.settings.theme;
  }, [store.settings.theme, systemIsDark]);

  // Synchronize document attribute
  useEffect(() => {
    applyThemeToDocument(resolvedTheme);
  }, [resolvedTheme]);

  // Synchronize prose size and measure CSS variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--prose-size',
        FONT_SIZE_MAP[store.settings.fontSize] || '18px'
      );
    }
  }, [store.settings.fontSize]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--measure',
        MEASURE_MAP[store.settings.measure] || '34em'
      );
    }
  }, [store.settings.measure]);

  // Listen to system dark mode preference change
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Debounced write
  const pendingSaveRef = useRef<StoreV1 | null>(null);
  const timerRef = useRef<number | null>(null);

  const flushSave = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (pendingSaveRef.current) {
      saveStoreDirect(pendingSaveRef.current);
      pendingSaveRef.current = null;
    }
  }, []);

  const queueSave = useCallback(
    (nextStore: StoreV1) => {
      pendingSaveRef.current = nextStore;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        flushSave();
      }, 400);
    },
    [flushSave]
  );

  // Flush on page unload or visibility change
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushSave();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushSave();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      flushSave();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [flushSave]);

  const updateStore = useCallback(
    (updater: (prev: StoreV1) => StoreV1) => {
      setStore((prev) => {
        const next = updater(prev);
        queueSave(next);
        return next;
      });
    },
    [queueSave]
  );

  const setTheme = useCallback(
    (theme: ThemeSetting) => {
      updateStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          theme,
        },
      }));
    },
    [updateStore]
  );

  const setFontSize = useCallback(
    (fontSize: FontSizeSetting) => {
      updateStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          fontSize,
        },
      }));
    },
    [updateStore]
  );

  const setMeasure = useCallback(
    (measure: MeasureSetting) => {
      updateStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          measure,
        },
      }));
    },
    [updateStore]
  );

  const setFocus = useCallback(
    (focus: boolean) => {
      updateStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          focus,
        },
      }));
    },
    [updateStore]
  );

  const setProofDefault = useCallback(
    (proofDefault: ProofDefaultSetting) => {
      updateStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          proofDefault,
        },
      }));
    },
    [updateStore]
  );

  const updateSectionProgress = useCallback(
    (sectionKey: string, update: Partial<SectionProgressItem>) => {
      updateStore((prev) => {
        const existing = prev.progress[sectionKey] || { status: 'empty' };
        const now = new Date().toISOString();
        const statusChanged = update.status && update.status !== existing.status;
        const nextItem: SectionProgressItem = {
          ...existing,
          ...update,
          statusChangedAt: statusChanged ? now : existing.statusChangedAt,
        };
        const nextActivity = statusChanged && update.status
          ? [
              {
                at: now,
                type: 'status',
                targetId: sectionKey,
                detail: update.status,
              },
              ...prev.activity,
            ].slice(0, 200)
          : prev.activity;

        return {
          ...prev,
          progress: {
            ...prev.progress,
            [sectionKey]: nextItem,
          },
          activity: nextActivity,
        };
      });
    },
    [updateStore]
  );

  const setLastLocation = useCallback(
    (location: { chapterId: string; sectionId: string; scrollOffset?: number }) => {
      updateStore((prev) => ({
        ...prev,
        lastLocation: {
          chapterId: location.chapterId,
          sectionId: location.sectionId,
          at: new Date().toISOString(),
        },
        progress:
          location.scrollOffset !== undefined
            ? {
                ...prev.progress,
                [location.sectionId]: {
                  ...(prev.progress[location.sectionId] || { status: 'empty' }),
                  lastReadAt: new Date().toISOString(),
                  scrollOffset: location.scrollOffset,
                },
              }
            : prev.progress,
      }));
    },
    [updateStore]
  );

  const logActivity = useCallback(
    (act: { type: 'status' | 'read' | 'copy'; targetId: string; detail?: string }) => {
      updateStore((prev) => ({
        ...prev,
        activity: [
          {
            at: new Date().toISOString(),
            ...act,
          },
          ...prev.activity,
        ].slice(0, 200),
      }));
    },
    [updateStore]
  );

  const clearCorruptedNotice = useCallback(() => {
    setStorageCorrupted(false);
  }, []);

  const value: StoreContextValue = useMemo(
    () => ({
      store,
      storageAvailable,
      storageCorrupted,
      setTheme,
      setFontSize,
      setMeasure,
      setFocus,
      setProofDefault,
      updateSectionProgress,
      setLastLocation,
      logActivity,
      clearCorruptedNotice,
      resolvedTheme,
    }),
    [
      store,
      storageAvailable,
      storageCorrupted,
      setTheme,
      setFontSize,
      setMeasure,
      setFocus,
      setProofDefault,
      updateSectionProgress,
      setLastLocation,
      logActivity,
      clearCorruptedNotice,
      resolvedTheme,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
