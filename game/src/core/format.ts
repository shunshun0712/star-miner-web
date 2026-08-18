export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return '∞';
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${trim(n / 1e9)}B`;
  if (abs >= 1e6) return `${trim(n / 1e6)}M`;
  if (abs >= 1e3) return `${trim(n / 1e3)}K`;
  if (Number.isInteger(n)) return n.toLocaleString('en-US');
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function trim(v: number): string {
  return v.toFixed(2).replace(/\.?0+$/, '');
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (hours < 24) {
    return remMinutes > 0 ? `${hours} 小时 ${remMinutes} 分` : `${hours} 小时`;
  }
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  if (remHours > 0) {
    return remMinutes > 0
      ? `${days} 天 ${remHours} 小时 ${remMinutes} 分`
      : `${days} 天 ${remHours} 小时`;
  }
  return `${days} 天`;
}

export function formatRate(n: number, unit: string): string {
  return `${n.toFixed(2)} ${unit}`;
}
