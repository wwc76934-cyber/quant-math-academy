/**
 * Application Store Types (v1)
 */

export type ThemeSetting = 'light' | 'dark' | 'system';
export type FontSizeSetting = 'sm' | 'md' | 'lg' | 'xl';
export type MeasureSetting = 'narrow' | 'standard' | 'wide';
export type ProofDefaultSetting = 'open' | 'closed';

export interface UserSettings {
  theme: ThemeSetting;
  fontSize: FontSizeSetting;
  measure: MeasureSetting;
  focus: boolean;
  proofDefault: ProofDefaultSetting;
}

export type SectionProgressStatus = 'empty' | 'learn' | 'done' | 'master' | 'review';

export interface SectionProgressItem {
  status: SectionProgressStatus;
  lastReadAt?: string;
  scrollOffset?: number;
  statusChangedAt?: string;
}

export interface LastLocation {
  chapterId: string;
  sectionId: string;
  at: string;
}

export interface UserBookmarks {
  sections: string[];
  formulas: string[];
}

export interface PathSetting {
  active: 'a' | 'b' | 'c' | 'free';
  startedAt?: string;
}

export interface UserActivityItem {
  at: string;
  type: string;
  targetId: string;
  detail?: string;
}

export interface StoreV1 {
  schemaVersion: 1;
  settings: UserSettings;
  progress: Record<string, SectionProgressItem>;
  lastLocation?: LastLocation;
  exercises: Record<string, unknown>;
  notes: Record<string, unknown>;
  bookmarks: UserBookmarks;
  review: Record<string, unknown>;
  path: PathSetting;
  activity: UserActivityItem[];
}

export interface StoreContextValue {
  store: StoreV1;
  storageAvailable: boolean;
  storageCorrupted: boolean;
  setTheme: (theme: ThemeSetting) => void;
  setFontSize: (fontSize: FontSizeSetting) => void;
  setMeasure: (measure: MeasureSetting) => void;
  setFocus: (focus: boolean) => void;
  setProofDefault: (proofDefault: ProofDefaultSetting) => void;
  updateSectionProgress: (
    sectionKey: string,
    update: Partial<SectionProgressItem>
  ) => void;
  setLastLocation: (location: { chapterId: string; sectionId: string; scrollOffset?: number }) => void;
  logActivity: (activity: { type: 'status' | 'read' | 'copy'; targetId: string; detail?: string }) => void;
  clearCorruptedNotice: () => void;
  resolvedTheme: 'light' | 'dark';
}
