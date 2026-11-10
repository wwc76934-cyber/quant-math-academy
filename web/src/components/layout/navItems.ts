import { notesPath, pathsPath, practicePath, progressPath, syllabusPath } from '../../lib/paths';

export interface NavItem {
  to: string;
  label: string;
  /** Returns true when the item should be highlighted for this pathname. */
  match: (pathname: string) => boolean;
}

const myStudyPrefixes = [progressPath(), '/practice/wrong', notesPath(), '/bookmarks'];

export const NAV_ITEMS: NavItem[] = [
  {
    to: syllabusPath(),
    label: '目录',
    match: (p) => p.startsWith(syllabusPath()) || p.startsWith('/learn'),
  },
  { to: pathsPath(), label: '学习路径', match: (p) => p.startsWith(pathsPath()) },
  {
    to: practicePath(),
    label: '练习',
    match: (p) => p.startsWith(practicePath()) && !p.startsWith('/practice/wrong'),
  },
  { to: '/graph', label: '知识图谱', match: (p) => p.startsWith('/graph') },
  {
    to: progressPath(),
    label: '我的学习',
    match: (p) => myStudyPrefixes.some((prefix) => p.startsWith(prefix)),
  },
];
