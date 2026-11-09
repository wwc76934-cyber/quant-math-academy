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
  active: string; // 'internship' | 'progression' | 'research' | 'free' (or legacy 'a' | 'b' | 'c')
  startedAt?: string;
  mode?: string;
}

export interface UserActivityItem {
  at: string;
  type: string;
  targetId: string;
  detail?: string;
}

export type ExerciseStatus = 'unseen' | 'correct' | 'wrong';

export interface ExerciseRecord {
  status: ExerciseStatus;
  chapterId: string;
  number: number;
  attempts: number;
  lastAt: string;
}

export interface ReviewRecord {
  kind: 'exercise';
  exerciseId: string;
  chapterId: string;
  number: number;
  dueAt: string;
  intervalDays: number;
  correctStreak: number;
  lastAt: string;
}

export interface StoreV1 {
  schemaVersion: 1;
  settings: UserSettings;
  progress: Record<string, SectionProgressItem>;
  lastLocation?: LastLocation;
  exercises: Record<string, ExerciseRecord>;
  notes: Record<string, unknown>;
  bookmarks: UserBookmarks;
  review: Record<string, ReviewRecord>;
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
  setActivePath: (pathId: string) => void;
  markExercise: (
    exerciseId: string,
    info: { chapterId: string; number: number; correct: boolean }
  ) => void;
  removeWrongExercise: (exerciseId: string) => void;
  markExerciseMastered: (exerciseId: string) => void;
  reviewWrongExercise: (exerciseId: string, correct: boolean) => void;
  logActivity: (activity: { type: 'status' | 'read' | 'copy' | 'exercise'; targetId: string; detail?: string }) => void;
  clearCorruptedNotice: () => void;
  resolvedTheme: 'light' | 'dark';
}
