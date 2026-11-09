/**
 * Learning Paths Types (T11)
 */

export interface WeekPlanItem {
  week: number;
  theme: string;
  outcome: string;
  estimatedMinutes: number;
  sectionIds: string[];
}

export interface CheckpointItem {
  afterWeek: number;
  title: string;
  description: string;
  sectionIds: string[];
}

export interface PathData {
  id: string; // 'internship' | 'progression' | 'research' | 'free'
  code: 'A' | 'B' | 'C' | 'D';
  title: string;
  weeks: number;
  audience: string;
  description: string;
  principles: string[];
  totalSections: number;
  totalEstimatedMinutes: number;
  weeksPlan: WeekPlanItem[];
  checkpoints?: CheckpointItem[];
}

export interface PathsFile {
  schemaVersion: number;
  paths: PathData[];
}
