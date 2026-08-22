import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORY_LABELS,
  FACILITIES,
  FACILITY_ORDER,
  TECH_BRANCH_LABELS,
  TECH_BRANCH_ORDER,
  TECH_BY_ID,
  TECH_NODES,
} from '../core/config';
import { achievementPoints, achievementProductionMultiplier } from '../core/achievements';
import { canResearch } from '../core/research';
import { formatDuration, formatNumber } from '../core/format';
import type { OfflineResult } from '../core/offline';
import type { AchievementCategory, EventKind, FacilityId, GameState } from '../core/types';

export interface SaveModalInfo {
  createdAt: number;
  lastSavedAt: number;
}

export interface SaveModalHandlers {
  onExport: () => void;
  onImport: (file: File) => void;
  onExportCsv: () => void;
}

function openModal(
  title: string,
  bodyHtml: string,
  buttons: { label: string; className?: string; onClick: (close: () => void) => void }[],
  onRendered?: () => void,
): void {
  const root = document.getElementById('modal-root');
  if (!root) return;
  // M7：移除旧弹窗前逐个 dispatch modal:close，统一收口到关闭路径，
  // 避免旧弹窗的 modal:closed 回调丢失
  const existingBackdrops = document.querySelectorAll('.modal-backdrop');
  existingBackdrops.forEach(() => {
    document.dispatchEvent(new CustomEvent('modal:close'));
  });
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `<h2>${title}</h2>${bodyHtml}`;
  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const close = (): void => {
    backdrop.remove();
    document.dispatchEvent(new CustomEvent('modal:closed'));
  };

  for (const b of buttons) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn ${b.className ?? ''}`.trim();
    btn.textContent = b.label;
    btn.addEventListener('click', () => b.onClick(close));
    actions.appendChild(btn);
  }
  modal.appendChild(actions);
  backdrop.appendChild(modal);
  root.appendChild(backdrop);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  onRendered?.();
  document.dispatchEvent(new CustomEvent('modal:open'));
}

export function showOfflineModal(result: OfflineResult, onConfirm: () => void): void {
  const body = `
    <p class="muted-text">离开期间（${formatDuration(result.effectiveMs)}）矿站自动运行：</p>
    <div class="offline-list">
      <div class="row"><dt>采掘器产出</dt><dd class="cyan">+${formatNumber(result.summary.producedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>运输线转运</dt><dd class="cyan">+${formatNumber(result.summary.movedStardust)} 星尘矿</dd></div>
      <div class="row"><dt>精炼厂产出</dt><dd class="purple">+${formatNumber(result.summary.refinedCrystal)} 晶体</dd></div>
    </div>
    <p class="muted-text" style="margin-top:10px">离线为福利时段，产出不封顶，与在线容量限制不同。</p>`;
  openModal('离线收益', body, [
    {
      label: '确认领取',
      className: 'primary',
      onClick: (close) => {
        close();
        onConfirm();
      },
    },
  ]);
}

export function showSaveModal(info: SaveModalInfo, handlers: SaveModalHandlers): void {
  const body = `
    <p>当前存档：</p>
    <div class="offline-list">
      <div class="row"><dt>创建时间</dt><dd>${new Date(info.createdAt).toLocaleString('zh-CN')}</dd></div>
      <div class="row"><dt>最近保存</dt><dd>${new Date(info.lastSavedAt).toLocaleString('zh-CN')}</dd></div>
    </div>
    <p class="muted-text">建议定期导出 JSON 备份；浏览器清理数据会丢失存档。</p>
    <input type="file" id="import-file" accept="application/json,.json" hidden />`;
  openModal(
    '存档管理',
    body,
    [
    {
      label: '导出 JSON',
      className: 'primary',
      onClick: (close) => {
        handlers.onExport();
        close();
      },
    },
    {
      label: '导入 JSON',
      onClick: () => {
        const input = document.getElementById('import-file') as HTMLInputElement | null;
        if (input) input.click();
      },
    },
    {
      label: '导出节奏数据',
      onClick: (close) => {
        handlers.onExportCsv();
      },
    },
      { label: '关闭', onClick: (close) => close() },
    ],
    () => {
      const input = document.getElementById('import-file') as HTMLInputElement | null;
      input?.addEventListener('change', () => {
        const file = input.files?.[0];
        if (file) handlers.onImport(file);
        input.value = '';
      });
    },
  );
}

export function showImportPreview(state: GameState, onConfirm: () => void): void {
  const facilityRows = (['excavator', 'transport', 'refinery'] as FacilityId[])
    .map((id) => {
      const f = state.facilities[id];
      return `<div class="row"><dt>${id === 'excavator' ? '采掘器' : id === 'transport' ? '运输线' : '精炼厂'}</dt><dd>${
        f.unlocked ? `Lv.${f.level}` : '未解锁'
      }</dd></div>`;
    })
    .join('');
  const body = `
    <p class="muted-text">导入后当前进度将被覆盖，请确认：</p>
    <div class="offline-list">
      <div class="row"><dt>信用点</dt><dd class="gold">${formatNumber(state.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${formatNumber(state.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${formatNumber(state.crystal)}</dd></div>
      ${facilityRows}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>`;
  openModal('导入预览', body, [
    {
      label: '确认导入',
      className: 'primary',
      onClick: (close) => {
        close();
        onConfirm();
      },
    },
    { label: '取消', onClick: (close) => close() },
  ]);
}

document.addEventListener('modal:close', () => {
  const backdrops = document.querySelectorAll<HTMLElement>('.modal-backdrop');
  const top = backdrops[backdrops.length - 1];
  if (top) {
    top.remove();
    document.dispatchEvent(new CustomEvent('modal:closed'));
  }
});




export function showMilestoneCard(name: string, atMs: number): void {
  openModal(
    '里程碑达成',
    `<p>🎉 ${name}</p><p class="muted-text" style="margin-top:8px">用时 ${formatDuration(atMs)}</p>`,
    [{ label: '继续', className: 'primary', onClick: (close) => close() }],
  );
}

export type EventNotificationKind = Extract<EventKind, 'drone' | 'invest' | 'solar-storm'>;

export function showEventNotification(
  kind: EventNotificationKind,
  opts: {
    onA?: () => void;
    onB?: () => void;
    onResearchCenter?: () => void;
    onInvest?: () => void;
    onIgnore?: () => void;
    onClose?: () => void;
  } = {},
): void {
  const host = document.getElementById('event-host');
  if (!host) return;
  host.querySelectorAll('.event-card').forEach((el) => el.remove());
  const card = document.createElement('div');
  card.className = `event-card${kind === 'solar-storm' ? ' storm' : ''}`;

  if (kind === 'drone') {
    card.innerHTML =
      '<h3>✈ 无人机事件</h3><p>选择奖励：A 立即获得 50 信用点；B 所有设施 30 秒内速度 ×1.5。</p>';
    const actions = document.createElement('div');
    actions.className = 'event-actions';
    const btnA = document.createElement('button');
    btnA.className = 'btn';
    btnA.textContent = 'A · +50 信用点';
    const btnB = document.createElement('button');
    btnB.className = 'btn primary';
    btnB.textContent = 'B · ×1.5 速度 30 秒';
    actions.append(btnA, btnB);
    if (opts.onResearchCenter) {
      const btnC = document.createElement('button');
      btnC.className = 'btn';
      btnC.textContent = 'C · 发现古代数据核心';
      btnC.addEventListener('click', () => {
        card.remove();
        opts.onResearchCenter?.();
      });
      actions.appendChild(btnC);
    }
    card.appendChild(actions);
    btnA.addEventListener('click', () => {
      card.remove();
      opts.onA?.();
    });
    btnB.addEventListener('click', () => {
      card.remove();
      opts.onB?.();
    });
  } else if (kind === 'invest') {
    card.innerHTML = '<h3>◆ 投入型机会</h3><p>消耗 200 信用点，永久提升采掘速度 +5%（仅一次）。</p>';
    const actions = document.createElement('div');
    actions.className = 'event-actions';
    const btnInvest = document.createElement('button');
    btnInvest.className = 'btn primary';
    btnInvest.textContent = '投资（-200 信用点）';
    const btnIgnore = document.createElement('button');
    btnIgnore.className = 'btn';
    btnIgnore.textContent = '忽略';
    actions.append(btnInvest, btnIgnore);
    card.appendChild(actions);
    btnInvest.addEventListener('click', () => {
      card.remove();
      opts.onInvest?.();
    });
    btnIgnore.addEventListener('click', () => {
      card.remove();
      opts.onIgnore?.();
    });
  } else {
    card.innerHTML = '<h3>☀ 太阳风暴</h3><p>全设施速度降低 20%（均衡策略减半），持续 1 分钟。</p>';
    const actions = document.createElement('div');
    actions.className = 'event-actions';
    const ok = document.createElement('button');
    ok.className = 'btn';
    ok.textContent = '知道了';
    actions.appendChild(ok);
    card.appendChild(actions);
    ok.addEventListener('click', () => {
      card.remove();
      opts.onClose?.();
    });
  }

  host.appendChild(card);
  if (kind === 'solar-storm') {
    window.setTimeout(() => {
      if (card.parentElement) card.remove();
    }, 12_000);
  }
}

export interface DebugPanelHandlers {
  onApply: (values: {
    credits: number;
    stardust: number;
    crystal: number;
    levels: Record<FacilityId, number>;
    unlockAll: boolean;
  }) => void;
  onDrone: () => void;
  onStorm: () => void;
  onOffline: (hours: number) => void;
}

export function showDebugPanel(state: GameState, handlers: DebugPanelHandlers): void {
  const levelOptions = (current: number) =>
    [1, 2, 3, 4, 5]
      .map((n) => `<option value="${n}"${n === current ? ' selected' : ''}>Lv.${n}</option>`)
      .join('');
  const facilityRows = FACILITY_ORDER.map((id) => {
    const f = state.facilities[id];
    return `<label>${FACILITIES[id].name}<select id="dbg-lvl-${id}">${levelOptions(f.level)}</select></label>`;
  }).join('');
  const body = `
    <div class="debug-grid">
      <label>信用点<input type="number" id="dbg-credits" value="${Math.round(state.credits)}" /></label>
      <label>星尘矿<input type="number" id="dbg-stardust" value="${Math.round(state.stardust)}" /></label>
      <label>晶体<input type="number" id="dbg-crystal" value="${Math.round(state.crystal)}" /></label>
      ${facilityRows}
    </div>
    <label style="display:flex;gap:6px;align-items:center;margin-top:10px;color:var(--muted);font-size:12px">
      <input type="checkbox" id="dbg-unlock" /> 解锁全部设施（同时可调整等级）
    </label>
    <p class="muted-text" style="margin-top:10px">调试改动不会绕过解锁与等级规则；模拟离线会直接结算离线收益。</p>`;
  openModal('调试面板（~）', body, [
    {
      label: '应用数值',
      className: 'primary',
      onClick: () => {
        const num = (id: string): number => {
          const el = document.getElementById(id) as HTMLInputElement | null;
          const v = Number.parseFloat(el?.value ?? '0');
          return Number.isFinite(v) && v >= 0 ? v : 0;
        };
        const levels = {} as Record<FacilityId, number>;
        for (const id of FACILITY_ORDER) {
          const el = document.getElementById(`dbg-lvl-${id}`) as HTMLSelectElement | null;
          levels[id] = Number.parseInt(el?.value ?? '1', 10) || 1;
        }
        const unlockInput = document.getElementById('dbg-unlock') as HTMLInputElement | null;
        handlers.onApply({
          credits: num('dbg-credits'),
          stardust: num('dbg-stardust'),
          crystal: num('dbg-crystal'),
          levels,
          unlockAll: unlockInput?.checked ?? false,
        });
      },
    },
    { label: '触发无人机事件', onClick: () => handlers.onDrone() },
    { label: '触发太阳风暴', onClick: () => handlers.onStorm() },
    { label: '模拟离线 1 小时', onClick: () => handlers.onOffline(1) },
    { label: '模拟离线 8 小时', onClick: () => handlers.onOffline(8) },
    { label: '关闭', onClick: (close) => close() },
  ]);
}





export function showStarmapModal(state: GameState): void {
  const mines = [
    { name: '第一矿区 · 星尘', unlocked: true, req: '' },
    {
      name: '第二矿区 · 氦-3',
      unlocked: state.facilities.he3Excavator.unlocked,
      req: '解锁：1250 信用点 + 20 晶体',
    },
    {
      name: '第三矿区 · 氘-3',
      unlocked: state.facilities.deuteriumExcavator.unlocked,
      req: '解锁：3000 信用点 + 100 晶体',
    },
  ];
  const mineRows = mines
    .map(
      (m) =>
        `<div class="row"><dt>${m.unlocked ? '●' : '○'} ${m.name}</dt><dd>${m.unlocked ? '已解锁' : m.req}</dd></div>`,
    )
    .join('');
  const body = `
    <svg viewBox="0 0 640 200" style="width:100%;height:auto;display:block">
      <line x1="100" y1="100" x2="270" y2="100" stroke="#1d2f45" stroke-width="2"/>
      <line x1="370" y1="100" x2="540" y2="100" stroke="#1d2f45" stroke-width="2" stroke-dasharray="6 6"/>
      <circle cx="100" cy="100" r="30" fill="#0a1220" stroke="#38d9e8" stroke-width="2"/>
      <text x="100" y="106" text-anchor="middle" fill="#38d9e8" font-size="13">Aurora-1</text>
      <text x="100" y="152" text-anchor="middle" fill="#6f8ba3" font-size="11">当前星区</text>
      <circle cx="270" cy="100" r="20" fill="#0a1220" stroke="#3d4c63" stroke-width="2"/>
      <text x="270" y="106" text-anchor="middle" fill="#6f8ba3" font-size="12">开普勒-7</text>
      <circle cx="470" cy="100" r="16" fill="#0a1220" stroke="#3d4c63" stroke-width="2"/>
      <text x="470" y="106" text-anchor="middle" fill="#6f8ba3" font-size="12">赫利俄斯</text>
      <text x="470" y="140" text-anchor="middle" fill="#3d4c63" font-size="10">后续版本开放</text>
    </svg>
    <div class="offline-list">${mineRows}</div>
    <p class="muted-text">当前坐标：Aurora-1 · 矿站。邻近星系均为未探索区域。</p>`;
  openModal('星图', body, [{ label: '关闭', onClick: (close) => close() }]);
}

export function showResearchModal(state: GameState, handlers: { onResearch: (id: string) => void }): void {
  const body = TECH_BRANCH_ORDER.map((branch) => {
    const nodes = TECH_NODES.filter((n) => n.branch === branch).sort((a, b) => a.tier - b.tier);
    const cards = nodes
      .map((n) => {
        const researched = state.research.includes(n.id);
        const available = n.tier <= 2;
        const check = canResearch(state, n.id);
        const statusCls = researched ? 'done' : available ? (check.ok ? 'ready' : 'locked') : 'future';
        let action: string;
        if (researched) {
          action = '<span class="tech-status done">已研究</span>';
        } else if (!available) {
          action = '<span class="tech-status future">后续开放</span>';
        } else {
          const label = check.ok ? `研究（${n.cost} 晶体）` : (check.reason ?? '');
          action = `<button class="btn tech-btn" data-tech="${n.id}" ${check.ok ? '' : 'disabled'}>${label}</button>`;
        }
        const reqs =
          n.requires.length > 0
            ? `<div class="tech-reqs">前置：${n.requires.map((r) => TECH_BY_ID[r]?.name ?? r).join('、')}</div>`
            : '';
        return `<div class="tech-card ${statusCls}" data-tier="${n.tier}">
          <div class="tech-name">${n.name}</div>
          <div class="tech-desc">${n.description}</div>
          ${reqs}
          <div class="tech-action">${action}</div>
        </div>`;
      })
      .join('');
    return `<div class="tech-branch">
      <h3>${TECH_BRANCH_LABELS[branch]}</h3>
      <div class="tech-cards">${cards}</div>
    </div>`;
  }).join('');
  openModal('研究中心 · 科技树', body, [{ label: '关闭', onClick: (close) => close() }], () => {
    document.querySelectorAll<HTMLButtonElement>('.tech-btn').forEach((btn) => {
      btn.addEventListener('click', () => handlers.onResearch(btn.dataset.tech ?? ''));
    });
  });
}

export function showAchievementsModal(state: GameState): void {
  const points = achievementPoints(state);
  const mult = achievementProductionMultiplier(state);
  // T2-3：转生历史区块（转生等级 / 星核余额 / 历次转生摘要）
  const prestige = state.prestige;
  const historyRows = prestige.history
    .map((h) => {
      const snap = h.baselineSnapshot;
      const facilitySummary = Object.entries(snap.facilityLevels)
        .filter(([, lvl]) => lvl > 1)
        .map(([id, lvl]) => `${FACILITIES[id as FacilityId]?.name ?? id} Lv.${lvl}`)
        .join('、');
      return `<div class="row">
        <dt>第 ${h.sequence} 世</dt>
        <dd>
          <span class="cyan">+${formatNumber(h.stardustEarned)} 星核</span>
          · ${new Date(h.timestamp).toLocaleString('zh-CN')}
          ${snap.researchCount > 0 ? ` · 研究 ${snap.researchCount}` : ''}
          ${snap.achievementCount > 0 ? ` · 成就 ${snap.achievementCount}` : ''}
          ${facilitySummary ? ` · ${facilitySummary}` : ''}
        </dd>
      </div>`;
    })
    .join('');
  const prestigeBlock = `
    <div class="prestige-history-block">
      <h3 class="prestige-history-title">转生进度 · Lv.${prestige.prestigeLevel}</h3>
      <div class="offline-list">
        <div class="row"><dt>星核余额</dt><dd class="gold">${formatNumber(prestige.stardust)}</dd></div>
        <div class="row"><dt>永久加成</dt><dd>${prestige.unlocked.length} 项</dd></div>
      </div>
      ${prestige.history.length > 0 ? `
        <h4 class="prestige-history-subtitle">历次转生（${prestige.history.length}）</h4>
        <div class="offline-list prestige-history-list">${historyRows}</div>
      ` : '<p class="muted-text" style="margin:6px 0 0">尚未转生——积累资源与设施等级后可在「转生」入口重置进度换取永久星核。</p>'}
    </div>`;
  const cats: AchievementCategory[] = ['production', 'construction', 'tech', 'event', 'exploration', 'hidden'];
  const groups = cats
    .map((cat) => {
      const defs = ACHIEVEMENTS.filter((a) => a.category === cat);
      const doneCount = defs.filter((a) => state.achievements.includes(a.id)).length;
      const rows = defs
        .map((a) => {
          const done = state.achievements.includes(a.id);
          return `<div class="ach-row ${done ? 'done' : ''}">
            <span class="ach-mark">${done ? '✓' : '○'}</span>
            <div class="ach-info">
              <div class="ach-name">${a.name}</div>
              <div class="ach-desc">${a.description}</div>
            </div>
            <span class="ach-reward">${formatNumber(a.rewardCredits)} 信用点 + ${a.rewardCrystals} 晶体</span>
          </div>`;
        })
        .join('');
      return `<div class="ach-group">
        <h3>${ACHIEVEMENT_CATEGORY_LABELS[cat]}（${doneCount}/${defs.length}）</h3>
        ${rows}
      </div>`;
    })
    .join('');
  openModal(`成就（${points} 点 · 全局产量 ×${mult.toFixed(2)}）`, prestigeBlock + groups, [
    { label: '关闭', onClick: (close) => close() },
  ]);
}
export function showHelpModal(): void {
  const body = `
    <style>
      .modal { position: relative; }
      .help-list .help-item { flex-wrap: wrap; }
      .help-list details { flex-basis: 100%; margin-top: 6px; }
      .help-list summary { cursor: pointer; color: var(--muted); font-size: 11px; list-style: none; }
      .help-list summary::before { content: '▸ '; letter-spacing: .5px; }
      .help-list details[open] summary { color: var(--cyan); }
      .help-list details[open] summary::before { content: '▾ '; }
      .help-list .help-detail { padding: 6px 0 0; font-size: 11px; line-height: 1.7; color: var(--muted); }
      .help-list .help-detail div { padding-left: 2px; }
      .help-search { width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 4px 8px; background: var(--bg,#0a1220); border: 1px solid var(--panel-border,#1d2f45); color: var(--text,#c8d6e5); font-size: 12px; border-radius: 4px; }
      .help-close-x { position: absolute; top: 8px; right: 12px; cursor: pointer; color: var(--muted); font-size: 18px; line-height: 1; background: none; border: none; padding: 0; }
      .help-close-x:hover { color: var(--text,#c8d6e5); }
      .help-quick, .help-milestone, .help-faq { background: rgba(56,217,232,0.04); border-left: 2px solid var(--cyan); padding: 8px 12px; margin: 10px 0; border-radius: 0 4px 4px 0; }
      .help-quick ol, .help-milestone ol { margin: 4px 0 0; padding-left: 18px; }
      .help-quick li, .help-milestone li { margin: 4px 0; font-size: 12px; line-height: 1.6; }
      .help-sec-title { display: flex; align-items: center; gap: 6px; margin: 14px 0 6px; }
      .help-sec-title .lock { color: var(--muted); font-size: 12px; }
      .help-version { text-align: center; color: var(--muted); font-size: 11px; padding: 10px 0 2px; border-top: 1px solid var(--panel-border,#1d2f45); margin-top: 14px; }
      .help-search-hide { display: none !important; }
    </style>
    <button class="help-close-x" id="help-close-x" title="关闭">×</button>
    <input class="help-search" id="help-search" placeholder="🔍 搜索条目（输入关键字实时过滤）…" />
    <div class="help-quick">
      <b>快速开始</b> · 新手前三步
      <ol>
        <li>点场景里的<b>星尘采掘器</b> → 升级（50 信用点起步），星尘矿越挖越快。</li>
        <li>攒信用点（出售星尘矿获得）解锁<b>磁轨运输线</b>（600 信用点）→ 再建<b>精炼厂</b>（1000 信用点），把矿炼成晶体。</li>
        <li>晶体累计到 <b>50</b>，等无人机送来「古代数据核心」，<b>研究中心</b>解锁科技树。</li>
      </ol>
    </div>
    <div class="help-milestone">
      <b>进度里程碑</b> · 照着走不迷路
      <ol>
        <li>🎯 建第一个精炼厂（需先建运输线 600 → 精炼厂 1000 信用点）</li>
        <li>🎯 累计 50 晶体 → 解锁研究中心，开启科技树</li>
        <li>🎯 完成「稀有矿同位素」研究（100 晶体，前置矿脉探测 25）→ 解锁反应堆</li>
        <li>🎯 积累资源后首次转生 → 换星核买永久加成</li>
      </ol>
    </div>
    <div class="help-sec-title"><h3 class="help-title" style="margin:0">基础系统（开局即可用）</h3></div>
    <div class="help-list">
      <div class="help-item"><b class="gold">信用点</b><span>出售矿石/事件获得的货币，用于解锁与升级。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：出售星尘矿（1/个）、晶体（8/个），事件奖励 +50。</div>
          <div>消耗：解锁设施（运输线 600、精炼厂 1000、能源站 1000+15 晶体）、升级设施、研究科技。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">星尘矿</b><span>采掘器产出的基础矿石，可出售或精炼为晶体。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：采掘器产出（星尘/氦-3/氘 三类，基础 1.2/s）。</div>
          <div>消耗：精炼为晶体（4:1，优化后 3:1）；出售换信用点（1/个）。</div>
          <div>容量 2000，不运走会堆满停产。</div>
        </div></details></div>
      <div class="help-item"><b class="purple">晶体</b><span>精炼厂产出的高级资源，用于研究与高级升级。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：精炼厂消耗 4 星尘产 1 晶体（优化后 3:1）。</div>
          <div>消耗：解锁第二/三矿区（20/100 晶体）、3 级以上设施升级、科技研究（15~100 晶体不等）。</div>
          <div>售价 8 信用点/个；累计 50 解锁研究中心。</div>
        </div></details></div>
      <div class="help-item"><b class="energy-val">能量</b><span>能源站产出，不足时减产；盈余可释放加成。</span>
        <details open><summary>展开</summary><div class="help-detail">
          <div>获取：能源站产出（解锁需 1000 信用点 + 15 晶体）。</div>
          <div>消耗：所有生产设施运行耗能（基础 0.2/s）；不足时全设施 ×0.8（研究过载保护后 ×0.9）。</div>
          <div>释放加成：研究「能源储备」后，点能源站的「释放储备」按钮（消耗 100 储备能量）→ 30 秒全设施 ×1.2，冷却 60 秒。储备池上限 200。</div>
        </div></details></div>
      <div class="help-item"><b>生产链</b><span>采掘器→运输线→精炼厂产晶体→出售/研究；能源站供能。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>不建运输线，星尘矿无法运到精炼厂，就产不出晶体。</div>
          <div>采掘器：挖星尘矿，堆满会停产，得靠运输线运走。</div>
          <div>运输线：把矿从采掘器搬到精炼厂，不建矿就堆在采掘器出不来。</div>
          <div>精炼厂：吃 4 矿吐 1 晶体（优化后 3:1）。</div>
          <div>出售：点顶栏矿图标直接卖（星尘 1、晶体 8）。研究：在研究中心花晶体点科技。</div>
          <div>能源站：供能，不足时全设施减速 ×0.8。</div>
          <div>解锁：运输线 600、精炼厂 1000、第二矿区 1250+20 晶体、第三矿区 3000+100 晶体。</div>
        </div></details></div>
      <div class="help-item"><b>能源策略</b><span>快捷键 1/2/3 切 3 档：采掘/均衡/精炼优先。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>采掘优先（1）：前期缺矿/运输线没建满时用。采掘产量 ×1.35，运输/精炼 ×0.9；采掘耗能 ×0.6，运输/精炼耗能 ×1.3。</div>
          <div>均衡（2）：默认稳定档。全设施产量 ×1、耗能 ×1。</div>
          <div>精炼优先（3）：矿石积压/急需晶体时用。精炼产量 ×1.35，采掘/运输 ×0.9；精炼耗能 ×0.6，采掘/运输耗能 ×1.3。</div>
          <div>切错没硬伤，就是把产量与耗能配比拧偏，改回来即可。第四档「聚变」后续版本开放。</div>
        </div></details></div>
      <div class="help-item"><b>事件</b><span>每 3–5 分钟触发无人机/投入型/太阳风暴。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>无人机（正面·需操作）：弹窗二选一——选 A 拿 50 信用点；选 B 得 30 秒采掘 ×1.5 加成。未处理会阻塞后续事件触发，尽快选。</div>
          <div>投入型（正面·需确认）：花 200 信用点换永久采掘 +5%，仅一次；缺钱可先放着不亏（不确认不扣费）。</div>
          <div>太阳风暴（负面·自动生效）：全设施产量 ×0.8 持续 60 秒；均衡策略可减至 ×0.9。无需操作，结束自动恢复。</div>
          <div>首次事件 2 分钟后触发，之后每 3–5 分钟一桩。</div>
        </div></details></div>
      <div class="help-item"><b>离线收益</b><span>离线自动产出，封顶 8 小时，重进领取。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>离线自动采掘/转运/精炼，产出不封顶；时间封顶 8 小时。</div>
          <div>离线不触发事件、不留临时增益；重新进入时弹窗领取，不领会继续累计。</div>
        </div></details></div>
      <div class="help-item"><b>研究中心</b><span>累计 50 晶体后，无人机事件解锁科技树。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>解锁需累计 50 晶体，再等一次无人机事件（自带「古代数据核心」）；或星核商店「研究补贴」直接解锁。</div>
          <div>4 支科技树，29 个节点，T0–T4 五级。根节点「基础研究」（15 晶体）解锁后开启四大分支。</div>
          <div>采掘科技：强化钻头(20)→稀有矿同位素(100)等 8 节点；能源科技：高效涡轮(20)→能源储备(80)等 7 节点；精炼科技：配方优化(30)→晶体品质(100)等 7 节点；运输科技：磁轨加速(20)→无人机配送(100)等 7 节点。</div>
          <div>每支 T1×2→T2×2→T3×2→T4×1，T3/T4 标注「后续版本开放」，需星核商店「高级研究权限」解锁。节点有前置依赖，按分支树状推进。</div>
        </div></details></div>
      <div class="help-item"><b>成就</b><span>完成获奖励，每 10 点 +1% 全局产量（永久）。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>6 类共 30 条：生产（初出茅庐·100 星尘、晶体学徒·100 晶体、第一桶金·1000 信用点、能源先驱·1000 能量…）、建设（设施齐全·全 6 设施、满级王者·任一 5 级、矿区全开…）、科技（启蒙·基础研究、科技学者·10 科技…）、事件（无人机常客·20 次、投资有道…）、探索（同位素收藏家·10 同位素…）、隐藏（深空静默·离线 500 晶体…）。</div>
          <div>每条给信用点 + 晶体奖励；每 10 条全局产量 +1%（永久）。在成就面板查看全部。</div>
        </div></details></div>
    </div>
    <div class="help-sec-title"><h3 class="help-title" style="margin:0">进阶系统</h3><span class="lock">🔒 需解锁</span></div>
    <div class="help-list">
      <div class="help-item"><b class="cyan">同位素</b><span>稀有资源，需研究解锁；可消耗于反应堆。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：研究「稀有矿同位素」后采掘按 5%/秒期望掉落。</div>
          <div>消耗：反应堆 buff、深空探索派遣、碎片兑换。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">反物质</b><span>T3 稀有资源，反应堆深空探索获得。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：反应堆深空探索（近地小行星带、蛇夫座远征）。</div>
          <div>消耗：兑换暗物质、预留 T3 科技节点。</div>
        </div></details></div>
      <div class="help-item"><b class="cyan">暗物质</b><span>T4 稀有资源，柯伊伯带探索或湮灭兑换。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>获取：柯伊伯带探索；反物质湮灭 3 反物质 → 2 暗物质。</div>
          <div>消耗：预留 T4 科技节点。</div>
        </div></details></div>
      <div class="help-item"><b>同位素反应堆</b><span>需研究解锁。3 类入口：buff / 探索 / 兑换。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>解锁：完成「稀有矿同位素」研究后面板自动出现。</div>
          <div>buff：催化过载 60→采掘×2/10min；晶体共鸣 90→精炼×1.5/5min；同位素熔炉 40→采掘×1.5/20min（叠加封顶 ×8）。</div>
          <div>探索：近地 30/1min→4 反物质；柯伊伯带 80/3min→3 暗物质；蛇夫座 150/6min→10 反物质（每次仅 1 路）。</div>
          <div>兑换：25 同位素→300 信用点；40→8 晶体；3 反物质→2 暗物质。</div>
        </div></details></div>
      <div class="help-item"><b>转生系统</b><span>积累后转生换星核买永久加成；资源清零、转生等级保留。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>积累什么：晶体、同位素、反物质、暗物质、星尘、设施等级、研究数都能换星核。</div>
          <div>星核 = ⌊(晶体/100 + 同位素/20 + 反物质/5 + 暗物质/2 + 星尘/1000 + 2×Σ(设施等级−1) + 5×研究数) × 转生增幅⌋。</div>
          <div>转生前面板会显示预估星核数与「会失去什么」清单，确认后结算。</div>
          <div>仪式：基线回顾 → 星核结算 → 确认。</div>
          <div>重置：资源/设施/研究/成就归零。</div>
          <div>保留：转生等级（每次 +1，影响下次加成）、星核余额、商店购买记录。</div>
        </div></details></div>
      <div class="help-item"><b>星核商店</b><span>用星核买永久加成，5 类 15 件，跨转生保留。</span>
        <details><summary>展开</summary><div class="help-detail">
          <div>5 类（经济/生产/研究/设施/转生）共 15 件，用转生攒的星核买。</div>
          <div>成本：⌊基础成本 × 递增倍率^当前等级⌋，含前置等级与满级限制。</div>
          <div>代表项：信用放大器 +15%/级；超频驱动 +10%/级；转生增幅器 +25%/级。</div>
        </div></details></div>
    </div>
    <h3 class="help-title">快捷操作</h3>
    <div class="help-list">
      <div class="help-item"><b>快捷键</b><span>1/2/3 能源策略 · U 升级 · M 存档 · Esc 关闭弹窗 · ~ 调试</span></div>
      <div class="help-item"><b>提示</b><span>左侧边栏切面板（设施/星图/反应堆/转生/商店）；点顶栏资源看说明；点场景设施上手操作；设施升级 = 产能变强，解锁 = 开新设施入口；存档自动写浏览器本地（M 手动存），换电脑/清缓存会丢。</span></div>
    </div>
    <div class="help-faq">
      <b>常见问题</b>
      <div style="margin-top:6px;font-size:12px;line-height:1.7">
        <div><b>采掘器不工作了？</b> 多半是能量不足——看能源站是否建了、能量够不够，不够就切均衡或建/升能源站。</div>
        <div><b>能量一直不够怎么办？</b> 优先升能源站等级（最直接），其次研究「高效涡轮」降 10% 能耗，实在紧张切均衡策略；研究「过载保护」可把能源不足惩罚从 −20% 降到 −10%。</div>
        <div><b>怎么重置游戏？</b> 转生是部分重置（换星核、留永久加成）；想彻底重开需清浏览器站点数据（IndexedDB + localStorage），无游戏内一键重置。</div>
        <div><b>存档存哪？换电脑还有吗？</b> 存浏览器本地（IndexedDB 为主，localStorage 兜底）。换电脑、清缓存、隐私模式都不保留，需用「存档」面板导出文件迁移。</div>
        <div><b>离线收益最多攒多久？</b> 封顶 8 小时，超过的不计；回来重新进入会弹窗领取。</div>
      </div>
    </div>
    <div class="help-version">帮助版本 v0.5.0 · 最后更新 2026-08</div>`;
  openModal(
    '帮助',
    body,
    [{ label: '关闭', onClick: (close) => close() }],
    () => {
      const x = document.getElementById('help-close-x');
      if (x) x.addEventListener('click', () => {
        document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
        document.dispatchEvent(new CustomEvent('modal:closed'));
      });
      const search = document.getElementById('help-search') as HTMLInputElement | null;
      if (search) {
        search.addEventListener('input', () => {
          const q = search.value.trim().toLowerCase();
          document.querySelectorAll<HTMLDivElement>('.help-modal-body, .help-list, .help-item, .help-quick, .help-milestone, .help-faq, .help-sec-title').forEach((el) => el.classList.remove('help-search-hide'));
          if (!q) return;
          document.querySelectorAll<HTMLDivElement>('.help-item').forEach((it) => {
            const hit = (it.textContent || '').toLowerCase().includes(q);
            it.classList.toggle('help-search-hide', !hit);
          });
          // 隐藏空区块的标题与快速开始/里程碑/FAQ
          document.querySelectorAll<HTMLDivElement>('.help-sec-title, .help-quick, .help-milestone, .help-faq').forEach((el) => {
            el.classList.add('help-search-hide');
          });
        });
      }
    },
  );
}