import { describe, it, expect } from 'vitest';
import { formatDuration, formatNumber } from '../format';

describe('formatDuration', () => {
  it('秒级', () => {
    expect(formatDuration(0)).toBe('0 秒');
    expect(formatDuration(45_000)).toBe('45 秒');
    expect(formatDuration(59_999)).toBe('59 秒');
  });

  it('分钟级', () => {
    expect(formatDuration(60_000)).toBe('1 分钟');
    expect(formatDuration(120_000)).toBe('2 分钟');
    expect(formatDuration(59 * 60_000)).toBe('59 分钟');
  });

  it('小时级（不足一天）', () => {
    expect(formatDuration(60 * 60_000)).toBe('1 小时');
    expect(formatDuration(90 * 60_000)).toBe('1 小时 30 分');
    expect(formatDuration(23 * 60 * 60_000)).toBe('23 小时');
    expect(formatDuration(23 * 60 * 60_000 + 59 * 60_000)).toBe('23 小时 59 分');
  });

  it('天级（≥24 小时）', () => {
    expect(formatDuration(24 * 60 * 60_000)).toBe('1 天');
    expect(formatDuration(25 * 60 * 60_000)).toBe('1 天 1 小时');
    expect(formatDuration(25 * 60 * 60_000 + 30 * 60_000)).toBe('1 天 1 小时 30 分');
    expect(formatDuration(48 * 60 * 60_000)).toBe('2 天');
    expect(formatDuration(49 * 60 * 60_000 + 5 * 60_000)).toBe('2 天 1 小时 5 分');
    expect(formatDuration(3 * 24 * 60 * 60_000 + 12 * 60 * 60_000)).toBe('3 天 12 小时');
  });
});

describe('formatNumber', () => {
  it('基本数值', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(1234)).toBe('1.23K');
    expect(formatNumber(1_000_000)).toBe('1M');
  });
});
