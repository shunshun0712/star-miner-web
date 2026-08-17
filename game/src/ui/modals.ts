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
  document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
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
    </div>`;
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
  openModal(`成就（${points} 点 · 全局产量 ×${mult.toFixed(2)}）`, groups, [
    { label: '关闭', onClick: (close) => close() },
  ]);
}
export function showHelpModal(): void {
  const body = `
    <h3 class="help-title">资源说明</h3>
    <div class="help-list">
      <div class="help-item"><b class="gold">信用点</b><span>货币：出售矿石、事件奖励获得。用于解锁设施、升级设施、研究科技。</span></div>
      <div class="help-item"><b class="cyan">星尘矿</b><span>基础矿石：采掘器产出。可出售（1 信用点/个），也是精炼晶体的原料。</span></div>
      <div class="help-item"><b class="purple">晶体</b><span>高级资源：精炼厂把 4 星尘矿（配方优化后 3 个）变成 1 晶体。用于科技研究与 3 级以上升级，也可出售（8 信用点/个）。</span></div>
      <div class="help-item"><b class="energy-val">能量</b><span>能源站产出，保证设施运转；不足时全设施减产 20%（过载保护后 10%）。研究「能源储备」后，盈余存入储备池（200），可用「释放储备」获得 30 秒全设施 ×1.2 加成。</span></div>
      <div class="help-item"><b class="cyan">同位素</b><span>稀有资源：采掘时概率获得。当前用于成就收集，后续版本开放合成用途。</span></div>
    </div>
    <h3 class="help-title">玩法速览</h3>
    <div class="help-list">
      <div class="help-item"><b>生产链</b><span>采掘器产出星尘矿 → 运输线转运 → 精炼厂产出晶体 → 出售换信用点或研究科技。</span></div>
      <div class="help-item"><b>能源策略</b><span>快捷键 1 / 2 / 3 切换采掘优先、均衡、精炼优先；影响产量倍率与能量消耗。</span></div>
      <div class="help-item"><b>研究中心</b><span>累计产出 50 晶体 + 解锁第二矿区后，等无人机事件出现「发现古代数据核心」即可解锁科技树。</span></div>
      <div class="help-item"><b>成就</b><span>完成成就获得信用点与晶体，每 10 点成就 +1% 全局产量（永久）。</span></div>
    </div>
    <h3 class="help-title">快捷操作</h3>
    <div class="help-list">
      <div class="help-item"><b>快捷键</b><span>1/2/3 能源策略 · U 升级/解锁 · M 存档 · Esc 关闭弹窗 · ~ 调试面板</span></div>
      <div class="help-item"><b>提示</b><span>把鼠标悬停在顶栏资源上可查看说明；点击场景中的设施可切换查看与操作。</span></div>
    </div>`;
  openModal('帮助', body, [{ label: '关闭', onClick: (close) => close() }]);
}