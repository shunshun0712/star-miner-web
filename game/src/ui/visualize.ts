/** 信息可视化：容量进度条、瓶颈警示、升级收益对比。 */

export function setCapacityBar(fill: HTMLElement, value: number, max: number): void {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  fill.style.width = `${pct}%`;
  fill.classList.toggle('full', pct >= 99.5);
}

export function setBottleneck(row: HTMLElement, arrow: HTMLElement, active: boolean): void {
  row.classList.toggle('bottleneck', active);
  arrow.classList.toggle('on', active);
  arrow.textContent = active ? '→' : '';
}

export function renderUpgradePreview(
  el: HTMLElement,
  current: string,
  next: string,
  delta: string,
): void {
  el.innerHTML = '';
  const cur = document.createElement('span');
  cur.className = 'up-cur';
  cur.textContent = current;
  const arrow = document.createElement('span');
  arrow.className = 'up-arrow';
  arrow.textContent = ' → ';
  const nxt = document.createElement('span');
  nxt.className = 'up-next';
  nxt.textContent = next;
  const del = document.createElement('span');
  del.className = 'up-delta';
  del.textContent = delta;
  el.append(cur, arrow, nxt, del);
}
