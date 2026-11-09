import { describe, expect, it } from 'vitest';
import { formatDisplayTitle } from '../src/lib/format';

describe('formatDisplayTitle', () => {
  it('converts $\\varepsilon-N$ to ε-N', () => {
    expect(formatDisplayTitle('数列极限与 $\\varepsilon-N$ 语言')).toBe(
      '数列极限与 ε-N 语言'
    );
  });

  it('strips residual dollar signs from formulas in titles', () => {
    expect(formatDisplayTitle('函数极限与 $f(x)$ 连续性')).toBe('函数极限与 f(x) 连续性');
  });

  it('handles Greek letters and accents', () => {
    expect(formatDisplayTitle('$\\varepsilon-\\delta$ 证明与 $\\sigma$-代数')).toBe('ε-δ 证明与 σ-代数');
  });

  it('handles null, undefined and empty strings safely', () => {
    expect(formatDisplayTitle('')).toBe('');
    expect(formatDisplayTitle(null)).toBe('');
    expect(formatDisplayTitle(undefined)).toBe('');
  });
});
