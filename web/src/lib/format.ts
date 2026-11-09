/**
 * Text and number formatting utilities
 */

export function formatNumber(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) {
    return '—';
  }
  return n.toLocaleString('zh-CN');
}

export function formatMinutes(m: number | null | undefined): string {
  if (m === null || m === undefined || Number.isNaN(m) || m <= 0) {
    return '—';
  }
  return `${m} 分钟`;
}

export function formatPercentage(pct: number): string {
  if (Number.isNaN(pct)) return '0%';
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  return `${clamped}%`;
}

export function formatPartNumber(order: number): string {
  return order.toString().padStart(2, '0');
}

export function formatChapterNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

const CHINESE_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export function formatChinesePartLabel(order: number): string {
  if (order >= 1 && order <= 10) {
    return `第${CHINESE_NUMERALS[order - 1]}篇`;
  }
  return `第 ${order} 篇`;
}

export function formatCurrentDate(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${month} 月 ${day} 日`;
}

/**
 * Formats section/chapter display titles by normalizing LaTeX math expressions
 * (e.g., "$\\varepsilon-N$" -> "ε-N", "\\varepsilon" -> "ε", "\\delta" -> "δ", etc.)
 * and stripping leftover wrapping dollar signs.
 */
export function formatDisplayTitle(title: string | null | undefined): string {
  if (!title) return '';

  return title
    .replace(/\$\\varepsilon-N\$/g, 'ε-N')
    .replace(/\\varepsilon-N/g, 'ε-N')
    .replace(/\$\\varepsilon\$/g, 'ε')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\$\\delta\$/g, 'δ')
    .replace(/\\delta/g, 'δ')
    .replace(/\$\\alpha\$/g, 'α')
    .replace(/\\beta\$/g, 'β')
    .replace(/\$\\sigma\$/g, 'σ')
    .replace(/\$\\mu\$/g, 'μ')
    .replace(/\$\\lambda\$/g, 'λ')
    .replace(/\$([^$]+)\$/g, '$1') // remove remaining wrapping $math$
    .replace(/\$/g, '') // remove any stray $
    .trim();
}
