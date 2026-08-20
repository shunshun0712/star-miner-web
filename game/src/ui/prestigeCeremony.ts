/**
 * T2-3: 转生仪式弹窗——三步引导流程。
 *
 * 不复用 modals.ts 的 openModal（其按钮在构造时固定，无法做步骤切换），
 * 自建 backdrop + 动态步骤体，但沿用同款 CSS 类（.modal-backdrop / .modal / .modal-actions）
 * 与 modal:open / modal:closed 事件约定，保证 scene.setPaused 仍随弹窗开合。
 *
 * 三步：
 * 1. 成就回顾——本世进度摘要（资源/设施数/研究数/成就数/游戏时长）
 * 2. 星核结算——computeStardustBreakdown 公式拆解 + 总点数 → 星核
 * 3. 确认转生——永久加成预览 + 将失去的摘要 + 确认/取消
 *
 * 数据全部由调用方传入（来自 previewPrestigeReset / computeStardustBreakdown），
 * 本组件只负责展示与步骤导航；确认前零写操作（取消 = 丢弃预览）。
 */
import { FACILITIES, FACILITY_ORDER } from '../core/config';
import { formatDuration, formatNumber } from '../core/format';
import type { PrestigeResetPreview } from '../core/prestige';
import type {
  BaselineReviewSummary,
  CeremonyStep,
  PrestigeBonusView,
  StardustBreakdown,
} from '../core/prestigeCeremony';
import { CEREMONY_STEPS, CEREMONY_STEP_LABELS } from '../core/prestigeCeremony';

export interface PrestigeCeremonyHandlers {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface PrestigeCeremonyOptions {
  preview: PrestigeResetPreview;
  breakdown: StardustBreakdown;
  review: BaselineReviewSummary;
  bonuses: PrestigeBonusView[];
  /** 当前时间戳（用于游戏时长计算） */
  now: number;
  handlers: PrestigeCeremonyHandlers;
}

function stepIndicator(current: CeremonyStep): string {
  return CEREMONY_STEPS.map((s, i) => {
    const idx = CEREMONY_STEPS.indexOf(current);
    const cls = i < idx ? 'done' : i === idx ? 'current' : 'pending';
    const mark = i < idx ? '✓' : String(i + 1);
    return `<li class="ceremony-step-mark ${cls}"><span class="mark">${mark}</span><span class="step-name">${CEREMONY_STEP_LABELS[s]}</span></li>`;
  }).join('');
}

function reviewBody(review: BaselineReviewSummary, now: number): string {
  const duration = Math.max(0, now - review.createdAt);
  const facilityRows = FACILITY_ORDER.map((id) => {
    const lvl = review.facilityLevels[id];
    return `<div class="row"><dt>${FACILITIES[id].name}</dt><dd>Lv.${lvl}</dd></div>`;
  }).join('');
  return `
    <p class="muted-text">回顾本轮（第 ${review.achievementCount > 0 ? '一世' : '一世'}）的星际开拓历程：</p>
    <div class="offline-list">
      <div class="row"><dt>游戏时长</dt><dd>${formatDuration(duration)}</dd></div>
      <div class="row"><dt>信用点</dt><dd class="gold">${formatNumber(review.credits)}</dd></div>
      <div class="row"><dt>星尘矿</dt><dd class="cyan">${formatNumber(review.stardust)}</dd></div>
      <div class="row"><dt>晶体</dt><dd class="purple">${formatNumber(review.crystal)}</dd></div>
      <div class="row"><dt>同位素</dt><dd class="cyan">${formatNumber(review.isotope)}</dd></div>
      <div class="row"><dt>反物质</dt><dd class="cyan">${formatNumber(review.antimatter)}</dd></div>
      <div class="row"><dt>暗物质</dt><dd class="cyan">${formatNumber(review.darkmatter)}</dd></div>
    </div>
    <div class="offline-list ceremony-sub">
      <div class="row"><dt>已解锁设施</dt><dd>${review.facilityCount} / ${FACILITY_ORDER.length}</dd></div>
      ${facilityRows}
      <div class="row"><dt>完成研究</dt><dd>${review.researchCount} 项</dd></div>
      <div class="row"><dt>达成成就</dt><dd>${review.achievementCount} 项</dd></div>
    </div>
    <p class="muted-text">转生将重置以上全部进度，换取永久星核加成。</p>`;
}

function settlementBody(breakdown: StardustBreakdown, preview: PrestigeResetPreview): string {
  const resourceRows = breakdown.resourceItems
    .map(
      (i) =>
        `<div class="row"><dt>${i.label} ×${formatNumber(i.amount)}</dt><dd>× ${i.rate.toFixed(i.rate < 0.01 ? 4 : 3)} → <b class="gold">${i.points.toFixed(2)}</b></dd></div>`,
    )
    .join('');
  return `
    <p class="muted-text">星核按本轮资源、设施等级、研究进度综合结算：</p>
    <div class="offline-list">
      ${resourceRows}
      <div class="row"><dt>设施等级 Σ(Lv-1) = ${breakdown.facility.totalLevelsAboveOne}</dt><dd>× ${breakdown.facility.rate} → <b class="gold">${breakdown.facility.points}</b></dd></div>
      <div class="row"><dt>研究 ×${breakdown.research.count}</dt><dd>× ${breakdown.research.rate} → <b class="gold">${breakdown.research.points}</b></dd></div>
    </div>
    <div class="ceremony-total">
      <span>总点数</span><b>${breakdown.totalPoints.toFixed(2)}</b>
      <span>星核（向下取整）</span><b class="gold big">+${formatNumber(breakdown.stardustEarned)}</b>
    </div>
    <p class="muted-text">转生后等级 Lv.${preview.newPrestigeLevel}，星核余额 ${formatNumber(preview.newStardustBalance)}。</p>`;
}

function confirmBody(preview: PrestigeResetPreview, bonuses: PrestigeBonusView[]): string {
  const bonusRows =
    bonuses.length > 0
      ? bonuses
          .map(
            (b) =>
              `<div class="row"><dt>${b.name}</dt><dd>${b.description}</dd></div>`,
          )
          .join('')
      : '<div class="row"><dt>暂无永久加成</dt><dd>转生后可在星核商店解锁永久 buff</dd></div>';
  return `
    <p class="muted-text">转生后 Lv.${preview.newPrestigeLevel}，以下永久加成将生效：</p>
    <div class="offline-list">
      ${bonusRows}
    </div>
    <p class="muted-text" style="margin-top:10px">同时将失去：</p>
    <div class="offline-list ceremony-loss">
      <div class="row"><dt>资源归零</dt><dd>${preview.resets.resourceIds.length} 项（信用点/星尘/晶体/能量/同位素/反物质/暗物质等）</dd></div>
      <div class="row"><dt>设施重置</dt><dd>${preview.resets.facilityCount} 项（等级回到 1）</dd></div>
      <div class="row"><dt>研究清空</dt><dd>${preview.resets.researchCount} 项</dd></div>
      <div class="row"><dt>成就清空</dt><dd>${preview.resets.achievementCount} 项</dd></div>
    </div>
    <p class="ceremony-warn">此操作不可撤销，确认后将播放转生仪式并进入新的一世。</p>`;
}

export function showPrestigeCeremony(opts: PrestigeCeremonyOptions): void {
  const root = document.getElementById('modal-root');
  if (!root) return;
  // 关闭已有弹窗（沿用 modals.ts 的收口约定）
  document.dispatchEvent(new CustomEvent('modal:close'));

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop ceremony-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal ceremony-modal';

  let step: CeremonyStep = 'review';
  let closed = false;

  const render = (): void => {
    const idx = CEREMONY_STEPS.indexOf(step);
    const bodyHtml =
      step === 'review'
        ? reviewBody(opts.review, opts.now)
        : step === 'settlement'
          ? settlementBody(opts.breakdown, opts.preview)
          : confirmBody(opts.preview, opts.bonuses);
    modal.innerHTML = `
      <h2>转生仪式</h2>
      <ol class="ceremony-steps">${stepIndicator(step)}</ol>
      <div class="ceremony-body">${bodyHtml}</div>`;
  };

  const footer = document.createElement('div');
  footer.className = 'modal-actions';
  backdrop.append(modal, footer);
  root.appendChild(backdrop);

  const close = (): void => {
    if (closed) return;
    closed = true;
    backdrop.remove();
    document.dispatchEvent(new CustomEvent('modal:closed'));
  };

  const renderFooter = (): void => {
    footer.innerHTML = '';
    const idx = CEREMONY_STEPS.indexOf(step);

    if (idx > 0) {
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'btn';
      prev.textContent = '上一步';
      prev.addEventListener('click', () => {
        step = CEREMONY_STEPS[idx - 1];
        render();
        renderFooter();
      });
      footer.appendChild(prev);
    }

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'btn ghost';
    cancel.textContent = '取消';
    cancel.addEventListener('click', () => {
      close();
      opts.handlers.onCancel();
    });
    footer.appendChild(cancel);

    if (idx < CEREMONY_STEPS.length - 1) {
      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'btn primary';
      next.textContent = '下一步';
      next.addEventListener('click', () => {
        step = CEREMONY_STEPS[idx + 1];
        render();
        renderFooter();
      });
      footer.appendChild(next);
    } else {
      const confirm = document.createElement('button');
      confirm.type = 'button';
      confirm.className = 'btn primary';
      confirm.textContent = '确认转生';
      confirm.addEventListener('click', () => {
        // 先关闭弹窗（释放 scene.setPaused），再交回调用方播放动画 + 落盘
        close();
        opts.handlers.onConfirm();
      });
      footer.appendChild(confirm);
    }
  };

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      close();
      opts.handlers.onCancel();
    }
  });

  render();
  renderFooter();
  document.dispatchEvent(new CustomEvent('modal:open'));
}
